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

// Main function to read JSON files and calculate c
function main() {
    try {
        // Read input1.json
        const inputData1 = JSON.parse(fs.readFileSync('input1.json', 'utf8'));
        const n1 = inputData1.keys.n;
        const k1 = inputData1.keys.k;

        let points1 = [];
        // Decode each point for input1
        for (let i = 1; i <= n1; i++) {
            const key = i.toString();
            if (inputData1[key]) {
                const base = inputData1[key].base;
                const value = inputData1[key].value;
                const decodedValue = decodeValue(base, value);
                points1.push([parseInt(key), decodedValue]);
            } else {
                console.error(`Key ${key} not found in input1 data`);
            }
        }

        // Calculate constant term c for input1
        const constantTermC1 = lagrangeInterpolation(points1.slice(0, k1));
        console.log(`The constant term c for input1 is: ${constantTermC1}`);

        // Read input2.json
        const inputData2 = JSON.parse(fs.readFileSync('input2.json', 'utf8'));
        const n2 = inputData2.keys.n;
        const k2 = inputData2.keys.k;

        let points2 = [];
        // Decode each point for input2
        for (let i = 1; i <= n2; i++) {
            const key = i.toString();
            if (inputData2[key]) {
                const base = inputData2[key].base;
                const value = inputData2[key].value;
                const decodedValue = decodeValue(base, value);
                points2.push([parseInt(key), decodedValue]);
            } else {
                console.error(`Key ${key} not found in input2 data`);
            }
        }

        // Calculate constant term c for input2
        const constantTermC2 = lagrangeInterpolation(points2.slice(0, k2));
        console.log(`The constant term c for input2 is: ${constantTermC2}`);

    } catch (error) {
        console.error('Error reading or parsing input files:', error.message);
    }
}

main();
