const express = require("express");
const { STRIPE_KEY, CLIENT_URL } = require("../config");
const { BadRequestError } = require("../expressError");
const Stripe = require("stripe");
const stripe = Stripe(STRIPE_KEY);
const router = new express.Router();

router.post("/", async (req, res, next) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestError("Cart is empty.");
    }
    // Same product in different sizes shares a price, so combine quantities
    const quantities = new Map();
    items.forEach(item => {
      const validItem =
        item &&
        typeof item.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0;
      if (!validItem) throw new BadRequestError("Invalid cart item.");
      quantities.set(item.id, (quantities.get(item.id) || 0) + item.quantity);
    });
    let lineItems = [];
    quantities.forEach((quantity, price) => {
      lineItems.push({ price, quantity });
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/cancel`,
    });
    return res.json({ url: session.url });
  } catch (err) {
    if (err.type === "StripeInvalidRequestError") {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
});

module.exports = router;
