const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const {
  BadRequestError,
  ExpressError,
  UnauthorizedError,
  NotFoundError,
} = require("../expressError");

// User Model for registering and logging in
class User {
  /** Register new user and return token. */
  static async register({ username, email, password }) {
    // Prohibit duplicate usernames
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [ username ]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Username already exists!");
    }
    if (!username || !password || !email) {
      throw new ExpressError("Credentials required", 400);
    }
    const hashedPw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const registration = await db.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email, id`,
      [ username, email, hashedPw ]
    );
    const newUser = registration.rows[0];
    return newUser;
  }
  /** Log user in and return token. */
  static async login({ username, password }) {
    if (!username || !password)
      throw new UnauthorizedError("Username/password required", 401);
    // Attempt to locate user first
    const findUser = await db.query(
      `SELECT id, username, password, is_admin FROM users WHERE username = $1`,
      [ username ]
    );
    const user = findUser.rows[0];
    if (user) {
      const validPw = await bcrypt.compare(password, user.password);
      if (validPw) return user;
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /** Admin Access - Retrieve all users */
  static async getAll() {
    let allUsers = await db.query(`SELECT id, username, is_admin FROM users`);
    let users = allUsers.rows;
    if (!users) throw new NotFoundError(`No such users`);
    return users;
  }

  /** Retrieve single user */
  static async getUser(id) {
    let user = await db.query(
      `SELECT id, username, is_admin FROM users WHERE id = $1`,
      [ id ]
    );
    if (user.rows.length === 0) throw new NotFoundError(`User does not exist.`);
    return user.rows[0];
  }

  // TODO: Admin - Action DELETE USER

  /** Update/Edit user info */
  static async update(userId, data) {
    let { username, password } = data;
    if (password) {
      password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    const user = await db.query(
      `UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING id, username, is_admin AS "isAdmin"`,
      [ username, password, userId ]
    );
    if (!user) throw new NotFoundError(`No such user: {username}.`);
    let updatedUser = user.rows[0];
    return updatedUser;
  }
}

module.exports = User;
