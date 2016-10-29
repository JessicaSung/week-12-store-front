-- Step 2 - execute the line below in MySQL workbench to create database
CREATE DATABASE Bamazon;

-- Step 3 - use database create a table
USE Bamazon;

CREATE TABLE `Products` (
	`ItemId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`ProductName` VARCHAR(100) NULL,
	`DepartmentName` VARCHAR(100) NULL,
	`Price` DECIMAL(10,2) NULL,
	`StockQuantity` INT NULL
);


-- Step 4 - insert data into the table created in step 3
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Butter', 'Dairy', 3.48, 5);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Milk', 'Dairy', 3.18, 10);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Cookie', 'Bakery', 1.29, 15);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Donut', 'Bakery', 1.79, 7);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Coke', 'Beverage', 1.34, 20);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Pepsi', 'Beverage', 1.34, 15);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Ham', 'Meat', 1.49, 25);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Turkey', 'Meat', 1.19, 30);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Orange', 'Produce', 0.69, 40);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ('Lemon', 'Produce', 0.39, 45);