const db = require("../db");
const { ExpressError } = require("../expressError");

class Product {
  /** List all products */
  static async getAll() {
    const results = await db.query(
      `SELECT id, name, type, price, image, description FROM products`
    );
    const products = results.rows;
    if (!products) throw new ExpressError("Items cannot be retrieved.", 401);
    return products;
  }

  /** Retrieve products by type (shoes/booze) */
  static async getAllType(type) {
    const results = await db.query(
      `SELECT id, name, type, price, image, description FROM products WHERE type = $1`,
      [ type ]
    );
    const products = results.rows;
    if (products.length === 0) throw new ExpressError("No such type.", 401);
    return products;
  }

  /** Retrieve single product */
  static async getProduct(id) {
    const results = await db.query(
      `SELECT id, name, type, price, image, description FROM products WHERE id = $1`,
      [ id ]
    );
    if (!results) throw new ExpressError("Item not found.", 401);
    const product = results.rows[0];
    return product;
  }

  // TODO: Add Product

  // TODO: Delete Product

  // TODO: Edit Product
}

module.exports = Product;
