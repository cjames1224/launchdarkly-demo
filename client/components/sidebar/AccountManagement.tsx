import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export const AccountManagement = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <header className="flex justify-normal items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
    </div>
  );
};
