export function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    return n * factorial(n - 1);
}

export function isPrime(n) {
    let m = Math.sqrt(n);
    for (let i = 2; i < m; i++)
        if (n % i === 0)
            return false;

    return n > 1;
}

export function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber))
            primeNumber++;
    }

    return primeNumber;
}