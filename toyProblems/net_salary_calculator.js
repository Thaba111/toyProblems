// Function to calculate PAYE
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to calculate PAYE
function calculatePAYE(annualTaxablePay) {
    if (annualTaxablePay <= 288000) {
        return 0.1 * annualTaxablePay / 12;
    } else if (annualTaxablePay <= 6000000) {
        return 0.25 * annualTaxablePay / 12;
    } else if (annualTaxablePay <= 9600000) {
        return 0.3 * annualTaxablePay / 12;
    } else if (annualTaxablePay <= 999999999) {
        return 0.325 * annualTaxablePay / 12;
    } else {
        return 0.35 * annualTaxablePay / 12;
    }
}

// Function to calculate NHIF
function calculateNHIF(grossPay) {
    // NHIF rates
    const nhifRates = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: 44999, deduction: 1000 },
        { min: 45000, max: 49999, deduction: 1100 },
        { min: 50000, max: 59999, deduction: 1200 },
        { min: 60000, max: 69999, deduction: 1300 },
        { min: 70000, max: 79999, deduction: 1400 },
        { min: 80000, max: 89999, deduction: 1500 },
        { min: 90000, max: 99999, deduction: 1600 },
        { min: 100000, max: 999999999, deduction: 1700 }
    ];

    // Find the applicable NHIF rate
    const rate = nhifRates.find((range) => grossPay >= range.min && grossPay <= range.max);

    return rate ? rate.deduction : 0;
}

// Function to calculate NSSF
function calculateNSSF(pensionablePay) {
    // NSSF rates
    const nssfRate = 0.06; // 6%
    const nssfLimitTier1 = 6000;
    const nssfLimitTier2 = 18000;

    // Calculate NSSF contribution based on tier
    if (pensionablePay <= nssfLimitTier1) {
        return nssfRate * pensionablePay;
    } else if (pensionablePay <= nssfLimitTier2) {
        return nssfRate * nssfLimitTier1 + nssfRate * (pensionablePay - nssfLimitTier1);
    } else {
        // For simplicity, assuming contributions are capped at the Tier 2 limit
        return nssfRate * (nssfLimitTier1 + nssfLimitTier2);
    }
}

// Function to calculate Net Salary
function calculateNetSalary(basicSalary, benefits) {
    const annualTaxablePay = basicSalary * 12 + benefits;
    const paye = calculatePAYE(annualTaxablePay);
    const nhif = calculateNHIF(basicSalary);
    const nssf = calculateNSSF(basicSalary);
    
    // Calculate gross and net salary
    const grossSalary = basicSalary + benefits;
    const netSalary = grossSalary - (paye + nhif + nssf);

    return {
        grossSalary: grossSalary,
        paye: paye,
        nhif: nhif,
        nssf: nssf,
        netSalary: netSalary
    };
}

// Prompt user to input salary and benefits
rl.question("Enter your basic salary: ", (basicSalary) => {
    rl.question("Enter your benefits: ", (benefits) => {
        // Validate input
        basicSalary = parseFloat(basicSalary);
        benefits = parseFloat(benefits);

        if (isNaN(basicSalary) || isNaN(benefits)) {
            console.log("Invalid input. Please enter valid numeric values for salary and benefits.");
        } else {
            // Calculate and output the result
            const result = calculateNetSalary(basicSalary, benefits);
            console.log("Gross Salary:", result.grossSalary);
            console.log("PAYE:", result.paye);
            console.log("NHIF:", result.nhif);
            console.log("NSSF:", result.nssf);
            console.log("Net Salary:", result.netSalary);
        }

        // Close the readline interface
        rl.close();
    });
});