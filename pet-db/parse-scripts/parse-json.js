const fs = require("fs");

//Get all json files in json_data folder, store in an array json_files
let inputdirectory = "../json_data";
let json_files = fs.readdirSync("../json_data");

//Clear insert-data file
fs.writeFileSync("../scripts/02-insert-data.sql", "");

//Start code to append
let codetoappend = "\n    ";

json_files.forEach((inputfile) => {
  //Get parsed data for current json doc
  inputfile = inputdirectory.concat("/", inputfile);
  let parseddata = "";
  parseddata = fs.readFileSync(inputfile);
  parseddata = JSON.parse(parseddata);

  console.log(parseddata[0].companyName + ":");
  console.log(parseddata.length + " Employees\n...");

  codetoappend = codetoappend.concat("\n    ");

  // Add current company to database
  codetoappend = codetoappend.concat(
    `INSERT INTO companies (companyId, name) VALUES (${parseddata[0].companyId}, '${parseddata[0].companyName}');\n    `
  );

  // Add the CEO, who has no manager Id
  //codetoappend = codetoappend.concat(`INSERT INTO users (userId, firstName, lastName, email, password, companyId, startDate) VALUES (${current.employeeId}, ${current.firstName}, ${current.lastName}, ${current.email}, ${current.password}, ${current.companyId}, ${current.startDate});\n    )`);

  // Loop through every single entry
  for (let i = 0; i < parseddata.length; i++) {
    let current = parseddata[i];

    // Check if CEO (doesn't have a manager and will return undefined)
    if (typeof current.managerId == "undefined") {
      // Create query without managerId field
      codetoappend = codetoappend.concat(
        `INSERT INTO users (companyUserId, firstName, lastName, email, password, companyId, startDate) VALUES (${current.employeeId}, '${current.firstName}', '${current.lastName}', '${current.email}', '${current.password}', ${current.companyId}, '${current.startDate}');\n    `
      );
    } else {
      // Create query
      codetoappend = codetoappend.concat(
        `INSERT INTO users (userId, firstName, lastName, email, password, managerId, companyId, startDate) VALUES (${current.employeeId}, '${current.firstName}', '${current.lastName}', '${current.email}', '${current.password}', ${current.managerId}, ${current.companyId}, '${current.startDate}');\n    `
      );
    }
  }
});
// write to file
fs.appendFile("../scripts/02-insert-data.sql", codetoappend, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log("Added to file!");
});
