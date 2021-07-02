import React from "react";
import MyComponent from "./Components/Component/Myapp";

import { CurrentUserProvider } from "./Components/CurrentUser";

export default function App() {
  return (
    <CurrentUserProvider>
      <MyComponent />
    </CurrentUserProvider>
  );
}
