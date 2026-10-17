const { defineConfig, devices } = require("@playwright/test");
const { CLIENT_URL, API_URL } = require("./e2e/urls");

module.exports = defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [ [ "list" ], [ "html", { open: "never" } ] ],
  use: {
    baseURL: CLIENT_URL,
    trace: "retain-on-failure",
  },
  projects: [ { name: "chromium", use: { ...devices["Desktop Chrome"] } } ],
  webServer: [
    {
      // NODE_ENV=test points db.js at the shueznbuez_test database
      command: "node app.js",
      cwd: "../backend",
      url: `${API_URL}/products`,
      env: { NODE_ENV: "test", PORT: "8801", CLIENT_URL },
      reuseExistingServer: false,
    },
    {
      command: "npm start",
      url: CLIENT_URL,
      env: { PORT: "3001", BROWSER: "none", REACT_APP_API_URL: API_URL },
      timeout: 120000,
      reuseExistingServer: false,
    },
  ],
});
