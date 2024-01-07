import React from "react";

import { BrowserRouter } from "react-router-dom";
import ClerkProviderWithRoutes from "./clerkProviderWithRoutes";


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
 
function InitialApp() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default InitialApp;
