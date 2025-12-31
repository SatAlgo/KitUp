const mongoose = require('mongoose');
const User = require('./src/models/User');

// Mock Mongoose to test logic without DB connection if possible, 
// but User model depends on mongoose. 
// We will just instantiate a User and check the pre-save hook logic if we can mock save,
// or just copy the logic here for verification.

// Actually, let's just test the logic in isolation.
const calculateYear = (email) => {
    const emailRegex = /^(\d{4})/;
    const match = email.match(emailRegex);

    if (match && match[1]) {
        const admissionYear = parseInt(match[1], 10);
        const currentYear = new Date().getFullYear();
        let calculatedYear = (currentYear + 1) - admissionYear;

        if (calculatedYear < 1) calculatedYear = 1;
        if (calculatedYear > 4) calculatedYear = 4;

        return calculatedYear;
    }
    return 0;
};

console.log('Testing Year Calculation Logic:');
console.log('Current Year:', new Date().getFullYear());

const testCases = [
    { email: '202301040001@mitaoe.ac.in', expected: (new Date().getFullYear() + 1) - 2023 },
    { email: '202401040001@mitaoe.ac.in', expected: (new Date().getFullYear() + 1) - 2024 },
    { email: '202201040001@mitaoe.ac.in', expected: (new Date().getFullYear() + 1) - 2022 },
    { email: 'admin@mitaoe.ac.in', expected: 0 }
];

testCases.forEach(test => {
    const result = calculateYear(test.email);
    console.log(`Email: ${test.email} -> Year: ${result} (Expected: ${test.expected}) - ${result === test.expected ? 'PASS' : 'FAIL'}`);
});
