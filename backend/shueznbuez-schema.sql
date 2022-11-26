CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE products (
  refId SERIAL PRIMARY KEY,
  id TEXT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT NOT NULL,
  size TEXT,
  description TEXT NOT NULL
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  product_id INTEGER REFERENCES products,
  quantity INTEGER
);

CREATE TABLE "order" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  product_id INTEGER REFERENCES products,
  quantity INTEGER,
  amount INTEGER,
  address TEXT,
  status TEXT
);



