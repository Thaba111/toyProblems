// Question 2

// Human statements
// •	If you're driving below 70 km/h, it's all good—just a friendly "Ok."
// •	Going a bit faster? It'll tell you how many points you've earned.
// •	Watch out! If you accumulate more than 12 points, your license takes a break


const readline = require('readline');

// Create interface for reading input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Speed Detector Function
function speedDetector(carSpeed) {
    const speedLimit = 70;
    const demeritPointsPerExcessSpeed = 5;
    const pointsThresholdForSuspension = 12;

    // Calculate demerit points
    const demeritPoints = Math.floor((carSpeed - speedLimit) / demeritPointsPerExcessSpeed);

    // Output result based on demerit points
    if (carSpeed <= speedLimit) {
        console.log("Ok");
    } else if (demeritPoints <= pointsThresholdForSuspension) {
        console.log(`Points: ${demeritPoints}`);
    } else {
        console.log("License suspended");
    }

    // Close the interface
    rl.close();
}

// Prompt the user for car speed input
rl.question("Enter car speed (in km/h): ", function (input) {
    const carSpeed = parseFloat(input);

    // Validating the input
    if (isNaN(carSpeed) || carSpeed < 0) {
        console.log("Invalid input. Speed should be a positive number.");
        rl.close();
    } else {
        // Call the function with user input
        speedDetector(carSpeed);
    }
});

