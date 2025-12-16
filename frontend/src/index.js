import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
  api_host: process.env.REACT_APP_POSTHOG_HOST, // https://eu.i.posthog.com
  capture_pageview: true,
  capture_pageleave: true,
  debug: true, // TEMP: helps in console
});

// TEMP: prove ingestion
posthog.capture("netlify_test_event");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <PostHogProvider client={posthog}>
            <App />
          </PostHogProvider>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
