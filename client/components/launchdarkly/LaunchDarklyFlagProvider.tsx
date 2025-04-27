'use client'

import { asyncWithLDProvider, useLDClient, useFlags } from 'launchdarkly-react-client-sdk';
import { useEffect, useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';

const anonymousContext = { 
  kind: 'user', 
  anonymous: true,
  key: 'DEFAULT_KEY'
};

console.log('[LaunchDarkly] Awaiting async provider');

const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '',
    context: anonymousContext,
    options: {
        streaming: true,
        sendEvents: true,
        fetchGoals: true
    },
});

console.log('[LaunchDarkly] Async provider done');

const LDIdentifier = ({ children }:{children:any}) => {
    const ldClient = useLDClient();
    const { user } = useUser();
    const flags = useFlags();

    // Some updating reference to a value that influences the LD context
    const currentUser = user;

    const context = useMemo(
        () =>{
          if(currentUser?.id){
            return { 
                kind: 'user', 
                key: `${currentUser.id}`, 
                firstName: currentUser.firstName, 
                lastName: currentUser.lastName, 
                email: currentUser.primaryEmailAddress?.emailAddress 
              };
          }else{
            return anonymousContext;
          }
        },
        [currentUser]
    );

    useEffect(() => {
        if (!ldClient) return;
        console.log('Set context for user session: ', JSON.stringify(context));
        ldClient.identify(context);
    }, [ldClient, context]);

    useEffect(() => {
        console.log('Retrieve Flags', JSON.stringify(flags));
    }, [flags]);

    return children;
};

// Rendered as a provider for the app
export function LaunchDarklyFlagProvider({ children }:{children:any}) {
    return (
        <LDProvider>
            <LDIdentifier>{children}</LDIdentifier>
        </LDProvider>
    );
}