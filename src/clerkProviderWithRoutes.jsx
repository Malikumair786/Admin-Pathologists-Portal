
import React from "react";
import {   
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  } from "@clerk/clerk-react";


import {  Route, Routes, useNavigate } from "react-router-dom";

// import App from "./protected/ProtectedApp";
// import LandingPage from "LandingPage";
import App from "App";


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
 
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/*"
          element={
          <>
            <SignedIn>
              <App />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default ClerkProviderWithRoutes;