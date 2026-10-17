const { test, expect } = require("@playwright/test");
const { API_URL } = require("./urls");

// From backend/shueznbuez-seed.sql: $121, sizes 8-12.5
const SHOE = "Wild Rider Layers Unisex Sneakers";

const newUser = () => {
  const username = `e2e_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return { username, email: `${username}@example.com`, password: "e2e-password" };
};

const openShoe = async page => {
  await page.goto("/shuez");
  await page.getByText(SHOE, { exact: true }).click();
  await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
};

const addToCart = async (page, { size, quantity }) => {
  await page.getByTestId("size-select").selectOption(size);
  await page.getByTestId("quantity-select").selectOption(String(quantity));
  await page.getByRole("button", { name: "Add to cart" }).click();
};

test("cart keeps one line per size and adds the selected quantity", async ({ page }) => {
  await openShoe(page);
  await addToCart(page, { size: "9", quantity: 2 });
  await addToCart(page, { size: "10", quantity: 1 });
  await addToCart(page, { size: "9", quantity: 1 });
  await expect(page.getByTestId("cart-link")).toHaveText("4");

  await page.getByTestId("cart-link").click();
  await expect(page).toHaveURL(/\/checkout$/);

  const size9 = page.getByTestId(/^cart-item-.*-9$/);
  const size10 = page.getByTestId(/^cart-item-.*-10$/);
  await expect(page.getByTestId(/^cart-item-/)).toHaveCount(2);
  await expect(size9.getByTestId("quantity")).toHaveText("3");
  await expect(size10.getByTestId("quantity")).toHaveText("1");
  await expect(page.getByTestId("subtotal")).toHaveText("$484.00");

  await size10.getByTestId("increment").click();
  await expect(size10.getByTestId("quantity")).toHaveText("2");
  await expect(page.getByTestId("subtotal")).toHaveText("$605.00");

  await size9.getByTestId("remove").click();
  await expect(page.getByTestId(/^cart-item-/)).toHaveCount(1);
  await expect(page.getByTestId("subtotal")).toHaveText("$242.00");
});

test("register, then check out the same shoe in two sizes", async ({ page }) => {
  const user = newUser();
  await openShoe(page);
  await addToCart(page, { size: "9", quantity: 1 });
  await addToCart(page, { size: "10", quantity: 1 });
  await page.getByTestId("cart-link").click();

  // Logged out, so Checkout sends you to log in first
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("link", { name: "Register" }).first().click();
  await page.getByPlaceholder("username").fill(user.username);
  await page.getByPlaceholder("email").fill(user.email);
  await page.getByPlaceholder("password").fill(user.password);
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.getByText(`Logout ${user.username}`)).toBeVisible();
  await expect(page.getByTestId(/^cart-item-/)).toHaveCount(2);

  // Stop at the redirect: Stripe's hosted page is not ours to test
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForURL(/^https:\/\/checkout\.stripe\.com\//);
});

test("log in and log out", async ({ page, request }) => {
  const user = newUser();
  const res = await request.post(`${API_URL}/auth/register`, { data: user });
  expect(res.status()).toBe(201);

  await page.goto("/login");
  await page.getByPlaceholder("username").fill(user.username);
  await page.getByPlaceholder("password").fill(user.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText(`Logout ${user.username}`)).toBeVisible();
  await page.getByText(`Logout ${user.username}`).click();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});

test("wrong password does not log you in", async ({ page, request }) => {
  const user = newUser();
  await request.post(`${API_URL}/auth/register`, { data: user });

  await page.goto("/login");
  await page.getByPlaceholder("username").fill(user.username);
  await page.getByPlaceholder("password").fill("not-the-password");
  const response = page.waitForResponse(r => r.url().endsWith("/auth/login"));
  await page.getByRole("button", { name: "Login" }).click();

  expect((await response).status()).toBe(401);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
