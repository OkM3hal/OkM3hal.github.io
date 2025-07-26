// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    return []; // Returning an empty array for now as a placeholder
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
}

// TODO: REMOVE THIS
// Call the stubs to demonstrate the workflow
const gradeData = fetchGradeData();
populateGradebook(gradeData);
// END REMOVE

function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");

    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades"; // You might need to adjust this if your server uses a different path

    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function() {
        // Let results;
        // Check if we're done
        if (xhr.readyState === xhr.DONE) {
            // Check if we're successful
            if (xhr.status === 200) {
                // And then call the function to update the HTML with our data
                populateGradebook(JSON.parse(xhr.responseText));
            } else {
                console.error("Could not get grades.");
                status: `${xhr.status}`; // This line seems to be a label, not an executable statement in its current form.
                                         // It might be intended as part of a logging object or a simple string for display.
                                         // If it causes a syntax error, you might want to change it to:
                                         // console.error(`Status: ${xhr.status}`);
            }
        }
    }.bind(this); // .bind(this) ensures 'this' context is maintained, though it might not be strictly necessary for this specific XHR callback unless 'this' is used inside.

    xhr.open("GET", apiRoute, true);
    xhr.send();
}


function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);

    let tableElm = document.getElementById("gradebook"); // Get the gradebook table element

    data.forEach(function(assignment) { // For each row of data we're passed in
        let row = document.createElement("tr"); // Create a table row element
        let columns = []; // Handy place to stick the columns of information

        // The first column's table data will be the name
        columns.name = document.createElement('td');
        // Concatenate the full name: "last_name, first_name"
        columns.name.appendChild(
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );

        columns.grade = document.createElement('td'); // Second column will be the grade
        columns.grade.appendChild(
            // Just put the name in text, you could be fancy and figure out the letter grade here
            // with either a bunch of conditions, or a javascript "switch" statement
            document.createTextNode(assignment.total_grade)
        );

        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        // Add the row to the table itself to make the data visible
        tableElm.appendChild(row);
    });
}
