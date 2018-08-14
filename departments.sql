USE bamazon;

CREATE TABLE departments (
  department_id INTEGER NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs decimal(12,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 2499.82);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cellular", 1500.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Automotive", 975.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Health", 475.50);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 778.85);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Household", 1115.25);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports & Fitness", 888.88);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Kitchen", 551.10);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Office Supplies", 933.66);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoor & Patio", 804.82);
