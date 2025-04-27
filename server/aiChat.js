require('dotenv').config();
const FirebaseClient = require('./services/firebase');
const prompt = require('prompt-sync')({ sigint: true });
const { init } = require('@launchdarkly/node-server-sdk');
const { initAi } = require('@launchdarkly/server-sdk-ai');
const { OpenAI } = require('openai');
const { inspect } = require('util');

const MODEL = 'gpt-3.5-turbo';
const dashboardAccountId = '1';

(async () => {
  // Retrieve dashboard metrics
  const dashboardResults = await FirebaseClient.instance().readData(
    dashboardAccountId
  );

  // set up params for gatherinf info from the bot
  let hasExited = false;
  let userInfo = {
    name: '',
    email: '',
    key: '',
  };

  // OpenAI - set up chat history and fallback context
  let openAi = new OpenAI({
    apiKey: process.env.CHATGPT_KEY,
  });
  let chatHistory = [];
  let fallbackConfig = {
    model: {
      name: 'openai-chat-gpt-4o',
      parameters: {},
    },
    messages: [{ role: 'system', content: '' }],
    provider: { name: 'my-default-provider' },
    enabled: true,
  };

  // set up the launch darkly client and ai client
  let ldClient = init(process.env.LAUNCHDARKLY_SDK_KEY);
  try {
    await ldClient.waitForInitialization({ timeout: 10 });
    // initialization complete
  } catch (error) {
    // timeout or SDK failed to initialize
  }
  let aiClient = initAi(ldClient);

  // gather information about the user
  userInfo.name = prompt(
    "Hi there! 👋 Welcome to the LaunchDarkly ChatGPT demo with AI Config! ✨ What's your full name? > "
  );
  userInfo.email = prompt('🔥 Next, please tell me your email address. > ');
  userInfo.key = `${userInfo.name}_${userInfo.email}`;

  // set up the context object based on the gathered information
  const context = {
    kind: 'user',
    key: `${userInfo.name}_${userInfo.email}`,
    firstName: userInfo.name.split(' ')[0],
    lastName: userInfo.name.split(' ').pop(),
    email: userInfo.email,
    groups: ['LaunchDarkly'],
  };

  // set up the AI Config. Use the dashboard metrics here.
  let aiConfig = await aiClient.config(
    'report-summarizer',
    context,
    fallbackConfig,
    {
      dashboardMetrics: dashboardResults,
    }
  );

  if (!aiConfig.enabled) {
    throw new Error('AI Config is disabled');
  }

  // present an initial message for the user to respond to starting out
  console.log(
    `Hi there! This is the Dashboard Helper. I will provide you insights into your dashboard and give you more ways to optimize your IAP and integrations program. Ask me a few questions and I'll do my best to help you! (say "exit" to quit)`
  );

  // push all the AI config messages to the top of the chat history
  chatHistory.push(...aiConfig.messages);

  // loop gathering input while you chat with chatgpt
  while (!hasExited) {
    let lastMessage = prompt('You > ');

    // exit the conversation flow if you say "exit"
    if (lastMessage.toLowerCase() == 'exit') {
      hasExited = true;
      break;
    }

    try {
      chatHistory.push({
        role: 'user',
        content: lastMessage,
      });

      console.log(inspect(chatHistory));

      // send the chat completion message while tracking via LD
      const chatCompletion = await aiConfig.tracker.trackOpenAIMetrics(
        async () =>
          await openAi.chat.completions.create({
            messages: chatHistory || [],
            model: aiConfig.model?.name || MODEL,
          })
      );

      // handle the response
      const aiResponse = chatCompletion.choices[0].message.content.trim();

      // Add AI response to history
      chatHistory.push({ role: 'assistant', content: aiResponse });

      // present response to the user
      console.log(`ChatGPT: ${aiResponse}\n`);
    } catch (error) {
      console.error('Error talking to OpenAI:', error.message);
    }
  }
  console.log('\nThank you for chatting, good bye! 🙇‍♂️👋');
  process.exit(0);
})();
