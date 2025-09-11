const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numbers = [];
let count = 0;

function add(numbers) {
    let sum = 0;
    for (let n of numbers) sum += n;
    return sum;
}

function evenNumbers(numbers) {
    console.log("Even numbers:");
    for (let n of numbers) if (n % 2 === 0) console.log(n);
}

function oddNumbers(numbers) {
    console.log("Odd numbers:");
    for (let n of numbers) if (n % 2 !== 0) console.log(n);
}

function askNumber() {
    if (count >= 3) {
        console.log("Numbers:", numbers);
        console.log("Sum:", add(numbers));
        evenNumbers(numbers);
        oddNumbers(numbers);
        rl.close();
        return;
    }

    rl.question(`Enter number ${count + 1}: `, input => {
        const num = parseInt(input);
        if (!isNaN(num)) numbers.push(num);
        else console.log("Not a number, skipped");
        count++;
        askNumber();
    });
}

askNumber();
