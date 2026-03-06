import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo/client.ts";  
import { theme } from "./shared/themes.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./app/store.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CssBaseline>
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
