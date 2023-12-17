const readline = require('readline');

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Net Salary Calculator Function
function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates
    const TAX_RATE = 0.3;
    const NHIF_RATE = 0.05;
    const NSSF_RATE = 0.12;

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate deductions
    const tax = grossSalary * TAX_RATE;
    const nhifDeductions = grossSalary * NHIF_RATE;
    const nssfDeductions = grossSalary * NSSF_RATE;

    // Calculate net salary
    const netSalary = grossSalary - tax - nhifDeductions - nssfDeductions;

    // Return results
    return {
        grossSalary,
        tax,
        nhifDeductions,
        nssfDeductions,
        netSalary
    };
}

// Get user input using readline
rl.question("Enter basic salary: ", (basicSalary) => {
    rl.question("Enter benefits: ", (benefits) => {
        // Convert input to numbers
        basicSalary = parseFloat(basicSalary);
        benefits = parseFloat(benefits);

        const result = calculateNetSalary(basicSalary, benefits);
        console.log("Results:", result);

        // Close the readline interface
        rl.close();
    });
});
