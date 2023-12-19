const readline = require('readline');

function calculateGrade(marks) {
    if (marks > 79) {
        return 'A';
    } else if (marks >= 60 && marks <= 79) {
        return 'B';
    } else if (marks >= 50 && marks <= 59) {
        return 'C';
    } else if (marks >= 40 && marks <= 49) {
        return 'D';
    } else {
        return 'E';
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter student marks (0-100): ', (studentMarks) => {
    const grade = calculateGrade(parseInt(studentMarks));
    console.log('Grade:', grade);

    // Close the interface
    rl.close();
});
