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
        menuOptions();
});


function menuOptions() {

	inquirer.prompt([
		{
			name: "choice",
			type: "list",
			choices: ["View Product Sales By Department", "Create New Department", "Quit Program"],
			message: "Which Function would you like to access?"
		}
	])
	.then(function(answer) {

		if (answer.choice === "View Product Sales By Department")
			viewDeptSales();

		if (answer.choice === "Create New Department") 
			createNewDept();
        
        if (answer.choice === "Quit Program")
            quitProgram();
	});
};


function quitProgram() {

    console.log("\n\nExiting Program...");
    connection.end();
};


function createNewDept() {

    console.log("\n");

	inquirer.prompt([
		{
			name: "deptname",
			type: "input",
			message: "What is the new department name?"
		},
		{
			name: "overheadcosts",
			type: "input",
			message: "What is the cost of overhead for this department? (Decimal entry only ##.##)",
			validate: function(val) {
				if (isNaN(val) === false) {
					return true;
                }
                
				return false;
			}
		}
	])
	.then(function(answer) {
		connection.query(
			"INSERT INTO departments (department_name, over_head_costs) VALUES ('" + answer.deptname + "', '" + answer.overheadcosts + "')",
			function(err) {
				if (err)
					throw err;
                else {
    				console.log("\nThe " + answer.deptname + " department was added with an overhead cost of $" + answer.overheadcosts + ".\n");
                    menuOptions();
                }
			}
		);
	});
};


function viewDeptSales() {
    var sql = "SELECT departments.department_id AS 'Dept. ID', "
            + "departments.department_name AS 'Dept Name', "
            + "departments.over_head_costs AS 'Overhead Costs', "
            + "SUM(products.product_sales) AS 'Total Sales', "
            + "(SUM(products.product_sales) - departments.over_head_costs) AS 'Profit' "
            + "FROM departments LEFT JOIN products ON departments.department_name = products.department_name "
            + "GROUP BY departments.department_name ORDER BY 'Dept. ID' ASC";
    
    connection.query(sql, function(err, results) {
        
        if (err)
            throw err;
        else {
            console.log("\n");
            console.table(results);
        }

        menuOptions();
    });
};