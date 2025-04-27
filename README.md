## Launch Darkly Demo

A two-fold demo set up to show Feature Flags, Guarded Rollouts for Feature Release, and AI Configs. The following components are in this repo:

- Dashboard Front End with React LaunchDarkly SDK integration (./client)
- Backend Firebase Realtime DB API integration pulling live data to the dashboard (./server)
- AI Config script with ChatGPT interaction via CLI, and tracking metrics back to LaunchDarkly via the LDAI SDK (./server/aiChat.js)

### Try the demo

[Link to app hosted]

### How to Run

Please generate server and client side .env files based on the examples.

#### ./server/.env

```
PORT=3001
FIREBASE_API_KEY=[Your Firebase API KEY (https://firebase.google.com/docs/projects/api-keys)]
FIREBASE_APP_ID=[Your Firebase App Id]
FIREBASE_MESSAGE_SENDER_ID=[Your Firebase Message Sender ID]
LAUNCHDARKLY_SDK_KEY=[The Launch Darkly SDK Key]
CHATGPT_KEY=[Your CHATGPT API KEY]
CLAUDE_KEY=[Your Claude API KEY (Currently not in use)]
```

#### ./client/.env

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[Your Clerk Publishable Key (https://clerk.com/glossary/publishable-key)]
CLERK_SECRET_KEY=[Your Clerk Secret Key]
NEXT_PUBLIC_LD_CLIENT_SIDE_ID=[Your Launch Darkly Client Side ID]
```

Install dependencies on both server and client side

```
cd server
npm install
cd ../client
npm install
```

Run the front and back end services usin gthe below commands.

### Front End

`cd client`\
`npm run dev` - `next dev --turbopack`

- React
- NextJS
- TailwindCSS

### Back End

`cd server`\
`npm run dev` - `nodemon index.js`

- NodeJS
- ChatGPT API
- Firebase Realtime DB API

### AI Config

`node ./server/aiChat.js`

You will be initially prompted to enter your name and email address - this is simply used in the context set back to LDClient. From there the conversation is piped to ChatGPT while sending tracking back to LD. Initial context is set from the AI Configs dashboard.
