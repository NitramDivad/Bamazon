var mysql = require("mysql"),
    inquirer = require("inquirer"),
    consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "1234",
    database: "bamazon"
});


connection.connect(function(err) {

    if (err)
        throw err;
    else
        displayProducts();
});


function displayProducts() {
    var sql = "SELECT item_id AS 'Product Item', product_name AS 'Product Name', LPAD(CONCAT('$',price), 13, ' ') AS 'Product Price' FROM products WHERE stock_quantity > 0";
	connection.query(sql, function(err, results) {

        if (err)
            throw err;
		else {
			console.table(results);
			startSale();
		}
	})
};


function startSale() {

    inquirer
        .prompt([
        {
            name: "itemID",
            type: "input",
            message: "What Product Item would you like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What quantity would you like to purchase?"
        }
        ])
        .then(function(responses) {
            fulfillOrder(responses);
        });
};


function fulfillOrder(item) {
    var id = parseInt(item.itemID),
        itemQuantity = parseInt(item.quantity),
        dbQuantity = 0,
        price = 0.00,
        product = "",
        productSales = 0.00;
        
    connection.query("SELECT product_name, stock_quantity, price, product_sales FROM products WHERE ?",
        [{ item_id: id }], function(err, result) {

            if (err)
                throw err;
            else {
                product = result[0].product_name;
                dbQuantity = parseInt(result[0].stock_quantity);
                if (itemQuantity <= dbQuantity) {
                    price = parseFloat(result[0].price);
                    productSales = (parseFloat(result[0].product_sales) + (itemQuantity * price)).toFixed(2);
                    dbQuantity -= itemQuantity;
                    connection.query("UPDATE products SET ? WHERE ?",
                        [{ stock_quantity: dbQuantity,
                           product_sales: productSales
                         },
                         { item_id: id }
                        ], function(err, results) {

                            if (err)
                                throw err;
                            else {
                                console.log("\nPurchase Complete.  Your total is: $" + ((itemQuantity * price).toFixed(2)).toString() + "\n");
                                continueToShop();
                            }
                    });
                }
                else {
                    console.log("\nThere is not enough stock to fulfill your order for " + product + "\n");
                    continueToShop();
                };
            };
    });
};


function continueToShop() {
	inquirer
		.prompt([
		{
			name: "continue",
			type: "confirm",
			message: "Continue shopping for more items?\n"
		}
	])
	.then(function(answer) {
		if (answer.continue)
			displayProducts();
		else {
			console.log("Thanks for Shopping with Bamazon!\n");
			connection.end();
		}
	});	
};