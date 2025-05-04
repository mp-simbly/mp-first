"use client"

import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"
import { UploadButton } from "~/utils/uploadthing"

export function TopNav() {
    return (
      <nav className="flex justify-between items-center p-4 text-xl font-semibold border-b border-white/20">
        <div >Gallery</div>
  
        <div className ="flex flex-row">
          <SignedOut> 
              <SignInButton/>   
          </SignedOut>
          <SignedIn>
            <UploadButton endpoint="imageUploader"/>
            <UserButton/>
          </SignedIn>
        </div>
      </nav>
    )
  }