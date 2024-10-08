import Controller from './Controller.js';
import * as MathUtilities from '../mathUtilities.js';
import { handleStaticResourceRequest } from '../staticResourcesServer.js'

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, null);
    }

    get(id) {
        if (this.HttpContext.path.params === null) {
            //No query string, so we should return the documentation page
            return this.HttpContext.response.redirect(this.HttpContext.host + '/maths');
        }
        let paramKeys = Object.keys(this.HttpContext.path.params);
        if (paramKeys.length == 0) {
            //No query string, so we should return the documentation page
            return this.HttpContext.response.redirect(this.HttpContext.host + '/maths');
        }

        //We put every query parameter into the result
        let result = {};
        paramKeys.forEach(key => {
            result[key] = this.HttpContext.path.params[key];
        });

        if (!paramKeys.includes('op')) {
            result.error = "'op' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        switch (this.HttpContext.path.params.op) {
            case ' ':
            case '+':
                return this.addition(this.HttpContext.path.params, paramKeys, result);
            case '-':
                return this.substraction(this.HttpContext.path.params, paramKeys, result);
            case '*':
                return this.multiplication(this.HttpContext.path.params, paramKeys, result);
            case '/':
                return this.division(this.HttpContext.path.params, paramKeys, result);
            case '%':
                return this.modulo(this.HttpContext.path.params, paramKeys, result);
            case '!':
                return this.factorial(this.HttpContext.path.params, paramKeys, result);
            case 'p':
                return this.prime(this.HttpContext.path.params, paramKeys, result);
            case 'np':
                return this.nprime(this.HttpContext.path.params, paramKeys, result);
            default: {
                result.error = `'op' parameter '${this.HttpContext.path.params.op}' is invalid`;
                return this.HttpContext.response.JSON(result);
            }
        }
    }

    addition(params, paramKeys, result) {
        if (paramKeys.length > 3) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('x')) {
            result.error = "'x' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('y')) {
            result.error = "'y' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        if (isNaN(x)) {
            result.error = "'x' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (isNaN(y)) {
            result.error = "'y' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }

        result.value = x + y;
        return this.HttpContext.response.JSON(result);
    }
    substraction(params, paramKeys, result) {
        if (paramKeys.length > 3) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('x')) {
            result.error = "'x' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('y')) {
            result.error = "'y' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        if (isNaN(x)) {
            result.error = "'x' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (isNaN(y)) {
            result.error = "'y' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }

        result.value = x - y;
        console.log(result.value);
        return this.HttpContext.response.JSON(result);
    }
    multiplication(params, paramKeys, result) {
        if (paramKeys.length > 3) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('x')) {
            result.error = "'x' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('y')) {
            result.error = "'y' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        if (isNaN(x)) {
            result.error = "'x' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (isNaN(y)) {
            result.error = "'y' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }

        result.value = x * y;
        return this.HttpContext.response.JSON(result);
    }
    division(params, paramKeys, result) {
        if (paramKeys.length > 3) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('x')) {
            result.error = "'x' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('y')) {
            result.error = "'y' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        if (isNaN(x)) {
            result.error = "'x' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (isNaN(y)) {
            result.error = "'y' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (x == 0 && y == 0)
            result.value = 'NaN';
        else if (y == 0)
            result.value = 'infinity';
        else 
            result.value = x / y;

        return this.HttpContext.response.JSON(result);
    }
    modulo(params, paramKeys, result) {
        if (paramKeys.length > 3) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('x')) {
            result.error = "'x' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('y')) {
            result.error = "'y' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        if (isNaN(x)) {
            result.error = "'x' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (isNaN(y)) {
            result.error = "'y' parameter is not a number";
            return this.HttpContext.response.JSON(result);
        }
        if (y == 0)
            result.value = 'NaN';
        else 
            result.value = x % y;

        return this.HttpContext.response.JSON(result);
    }
    factorial(params, paramKeys, result) {
        if (paramKeys.length > 2) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('n')) {
            result.error = "'n' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let n = parseFloat(params.n);
        if (isNaN(n) || n <= 0 || n % 1 !== 0) {
            result.error = "'n' parameter must be an integer > 0";
            return this.HttpContext.response.JSON(result);
        }

        result.value = MathUtilities.factorial(n);
        return this.HttpContext.response.JSON(result);
    }
    prime(params, paramKeys, result) {
        if (paramKeys.length > 2) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('n')) {
            result.error = "'n' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let n = parseFloat(params.n);
        if (isNaN(n) || n <= 0 || n % 1 !== 0) {
            result.error = "'n' parameter must be an integer > 0";
            return this.HttpContext.response.JSON(result);
        }

        result.value = MathUtilities.isPrime(n);
        return this.HttpContext.response.JSON(result);
    }
    nprime(params, paramKeys, result) {
        if (paramKeys.length > 2) {
            result.error = "too many parameters";
            return this.HttpContext.response.JSON(result);
        }
        if (!paramKeys.includes('n')) {
            result.error = "'n' parameter is missing";
            return this.HttpContext.response.JSON(result);
        }
        let n = parseFloat(params.n);
        if (isNaN(n) || n <= 0 || n % 1 !== 0) {
            result.error = "'n' parameter must be an integer > 0";
            return this.HttpContext.response.JSON(result);
        }

        result.value = MathUtilities.findPrime(n);
        return this.HttpContext.response.JSON(result);
    }

    post(data) {
        this.HttpContext.response.notImplemented();
    }
    put(data) {
        this.HttpContext.response.notImplemented();
    }
    remove(id) {
        this.HttpContext.response.notImplemented();
    }
}