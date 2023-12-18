// Function to calculate PAYE
function calculatePAYE(annualIncome) {
    if (annualIncome <= 288000) {
        return annualIncome * 0.1 / 12; // Up to 24,000 monthly
    } else if (annualIncome <= 388000) {
        return (24000 * 0.1 + (annualIncome - 288000) * 0.25) / 12; // 24,001 - 32,333 monthly
    } else if (annualIncome <= 6000000) {
        return (24000 * 0.1 + 104000 * 0.25 + (annualIncome - 388000) * 0.3) / 12; // 32,334 - 500,000 monthly
    } else if (annualIncome <= 9600000) {
        return (24000 * 0.1 + 104000 * 0.25 + 5616000 * 0.3 + (annualIncome - 6000000) * 0.325) / 12; // 500,001 - 800,000 monthly
    } else {
        return (24000 * 0.1 + 104000 * 0.25 + 5616000 * 0.3 + 2400000 * 0.325 + (annualIncome - 9600000) * 0.35) / 12; // Above 800,000 monthly
    }
}

// Function to calculate NHIF deduction
function calculateNHIF(grossPay) {
    // NHIF rates
    const nhifRanges = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: Infinity, deduction: 1000 }
    ];

    // Find the applicable range
    const range = nhifRanges.find(r => grossPay >= r.min && grossPay <= r.max);

    return range ? range.deduction : 0;
}

// Function to calculate NSSF deduction
function calculateNSSF(pensionablePay) {
    const tierIRate = 0.06; // Tier I contribution rate
    const tierIILowerLimit = 6001; // Tier II lower limit

    // Calculate NSSF contribution based on tiers
    const nssfContribution = pensionablePay <= tierIILowerLimit
        ? pensionablePay * tierIRate
        : tierIILowerLimit * tierIRate;

    return nssfContribution;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    const annualIncome = grossSalary * 12;
    const paye = calculatePAYE(annualIncome);

    // NHIF deduction calculations
    const nhifDeduction = calculateNHIF(grossSalary);

    // Calculations for NSSF deduction
    const nssfDeduction = calculateNSSF(basicSalary);

    // Calculations for net salary
    const netSalary = grossSalary - paye - nhifDeduction - nssfDeduction;

    // Return results
    return {
        grossSalary: grossSalary,
        paye: paye,
        nhif: nhifDeduction,
        nssf: nssfDeduction,
        netSalary: netSalary
    };
}

//How to use: Replace the basic salary and benefits with your actual amounts.
const basicSalary = 0; // Replace with actual basic salary
const benefits = 0; // Replace with actual benefits
const result = calculateNetSalary(basicSalary, benefits);
console.log(result);
