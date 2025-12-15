import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { PostHogProvider } from "posthog-js/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <PostHogProvider
            apiKey={process.env.REACT_APP_POSTHOG_KEY}
            options={{
              api_host: process.env.REACT_APP_POSTHOG_HOST,
              defaults: '2025-05-24',
              capture_exceptions: true,
              debug: process.env.NODE_ENV === "development",
            }}
          >
            <App />
          </PostHogProvider>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
