-- Create a MySQL Database called bamazon.

drop database if exists bamazon;

create database bamazon;

-- Then create a Table inside of that database called products.

-- The products table should have each of the following columns:

-- item_id (unique id for each product)

-- product_name (Name of product)

-- department_name

-- price (cost to customer)

-- stock_quantity (how much of the product is available in stores)

use bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name varchar(255) not null,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity integer(10) not null,
  PRIMARY KEY (item_id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

insert into products
(product_name, department_name, price, stock_quantity)
values
("Super Smash Bros. Ultimate", "Video Games", 49.99, 100),
("New Super Mario Bros. U", "Video Games", 54.99, 125),
("Pokemon: Let's Go Pikachu", "Video Games", 44.99, 200),
("Super Mario Oddysey", "Video Games", 49.99, 85),
("Super Mario Party", "Video Games", 59.99, 50),
("The Legend of Zelda: Breath of the Wild", "Video Games", 51.97, 25),
("Minecraft", "Video Games", 27.98, 300),
("Donkey Kong Country: Tropical Freeze", "Video Games", 42.99, 75),
("Mortal Kombat 11", "Video Games", 49.95, 150),
("Octopath Traveler", "Video Games", 59.99, 225);

select * from products; 