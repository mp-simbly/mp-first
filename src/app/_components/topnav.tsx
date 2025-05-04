import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"

export function TopNav() {
    return (
      <nav className="flex justify-between items-center p-4 text-xl font-semibold border-b border-white/20">
        <div >Gallery</div>
  
        <div>
          <SignedOut> 
              <SignInButton/>   
          </SignedOut>
          <SignedIn>
              <UserButton/>
          </SignedIn>
        </div>
      </nav>
    )
  }