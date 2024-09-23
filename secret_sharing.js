const fs = require('fs');

// Function to decode a number from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to find the constant term c
function lagrangeInterpolation(points) {
    let c = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += li * yi;
    }
    return c;
}

// Main function to read JSON and calculate c
function main() {
    // Read JSON input file
    const inputData = JSON.parse(fs.readFileSync('input2.json', 'utf8'));
    
    const n = inputData.keys.n;
    const k = inputData.keys.k;

    let points = [];

    // Decode each point using the correct key format
    for (let i = 1; i <= n; i++) {
        const key = i.toString(); // Convert i to string to match JSON keys
        if (inputData[key]) { // Check if the key exists
            const base = inputData[key].base;
            const value = inputData[key].value;
            const decodedValue = decodeValue(base, value);
            points.push([parseInt(key), decodedValue]); // Push (x, y) pairs
        } else {
            console.error(`Key ${key} not found in input data`);
        }
    }

    // Calculate constant term c using Lagrange interpolation
    const constantTermC = lagrangeInterpolation(points.slice(0, k)); // Use first k points

    console.log(`The constant term c is: ${constantTermC}`);
}

main();