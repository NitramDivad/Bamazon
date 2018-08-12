DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price decimal(10,2),
  stock_quantity INTEGER,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Plus", "Electronics", 99.99, 375);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Show", "Electronics", 249.99, 625);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPhone X", "Cellular", 999.99, 415);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FRAM CF10134 Air Filter", "Automotive", 14.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Emergenc-C Immune+ (30 Count Super Orange)", "Health", 8.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gold Toe Men's 6-Pack Cotton Crew Athletic Socks", "Clothing", 14.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Mountain Spring HE Turbo Powder Laundry Detergent", "Household", 15.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oakley Flight Deck XML Snow Goggles", "Sports & Fitness", 159.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple MMEF2AM/A Airpods", "Electronics", 144.98, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Holmes HAPF600 HEPA Filter", "Home & Kitchen", 22.49, 88);