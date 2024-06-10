import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CharactersProvider } from "./contexts/CharactersContext.tsx";

import "./index.css";
import "./lib/i18n/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CharactersProvider>
      <App />
    </CharactersProvider>
  </React.StrictMode>
);
