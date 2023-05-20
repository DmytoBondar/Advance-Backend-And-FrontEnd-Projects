// Convert the following JavaScript array into a TypeScript tuple
//     const userInfo = [101, "Ema", "John", true,  , "2023"];

const userInfo: [number, string, string, boolean, undefined, string] = [101, "Ema", "John", true, , "2023"];

// Write a TypeScript function that takes in two arrays of numbers as parameters. The function should compare the elements in both arrays and return a new array that contains only the elements that are present in both arrays.

// For example, if the first array is [1, 2, 3, 4, 5] and the second array is [2, 4, 6, 8], the function should return a new array with the elements 2 and 4 because they are present in both arrays.

type MyArrY = number [];

const compareFunction = (array1:MyArrY, array2:MyArrY): number[] => {
    let num:number[] = [];
    for (let i = 0; i < array1.length; i++) {
        if(array2.indexOf(array1[i]) !== -1){
            num.push(array1[i])
        }
    }
    return num;
}
const array1:MyArrY = [1, 2, 3, 4, 5];
const array2:MyArrY = [2, 4, 6, 8,3];
const getValue = compareFunction(array1, array2);


// 3. You have an interface for Product, containing the product's id, name, price, and category. You want to filter an array of Products based on a specific criterion and value.

interface IProduct{
    id: number;
    name: string;
    price: number;
    category: string;
}
const filterArray = [
    {
        id: 1,
        name: 'Colmi c62',
        price: 3000,
        category: 'watch',
    },
    {
        id: 1,
        name: 'maxbor',
        price: 500,
        category: 'sun-glass',
    },
    {
        id: 1,
        name: 'Hi speed',
        price: 2000,
        category: 'fan',
    },
    {
        id: 1,
        name: 'Hp pavilon',
        price: 456,
        category: 'leptop',
    }
]

const filterProduct = filterArray.filter((data:IProduct) => data.category === 'leptop');

// 4. Suppose you have an array of tuples, where each tuple represents a product and contains the product name, price, and quantity. Write a TypeScript function that calculates the total cost of all the products in the array, using a generic type for the tuple and a type alias for the array.
// stragey 1
type ArrayTuple = {name:string,price:number, quantity: number}[];
const myArray: ArrayTuple = [
    {name: "HP Pavilion",price: 2568, quantity:5},
    {name: "Del Pavilion",price: 2000, quantity:5},
    {name: "Toshiba Pavilion",price: 8000, quantity:5},
]
const totalCost = (array:ArrayTuple):number => {
    return array.reduce((acc, prev) => acc + prev.quantity, 0)
}
const getTotal = totalCost(myArray);

// Stragey 2
type ProductTuple = [string, number, number];
type ArraYTuple = ProductTuple[];

const getTotalPrice = (array: ArraYTuple):void =>{
    array.reduce((acc, [_, price, quantity]) => acc + price * quantity, 0)
} 


// 5. Suppose you have an array of numbers in TypeScript, and you want to find the sum of all the even numbers in the array. How would you approach this problem and write code to solve it?

const arrayNum : number[] = [1,2,3,4];

const sumEven = (array:number[]):number =>{
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] % 2 === 0){
            sum += array[i];
        }
    }
    return sum;
}



// 6. Create an interface called Person that includes properties for name (string), age (number), and email (string). Then create an array of Person objects and write a function that takes the array and a string email as parameters, and returns the Person object that matches the email or null if no match is found.

interface Person{
    name: string; age: number; email: string;
}

const personArray: Person[] = [
    {name: 'John whick',age: 50, email: 'john@gmail.com'},
    {name: 'tom whick',age: 50, email: 'tom@gmail.com'},
    {name: 'hon whick',age: 50, email: 'hon@gmail.com'},
]

const getUserExistByEmail = (users:Person[], email:string):Person | undefined => {
    const user = users.find((user:Person) => user.email === email);
    return user;
}
const data = getUserExistByEmail(personArray, 'john@gmail.com');

// 7. Create a TypeScript program that declares an array of numbers. Use the spread  operator to pass the elements of the array as arguments to a function that finds the minimum and maximum values of the array. Use destructuring to assign the minimum and maximum values to separate variables, and log them to the console.

const arrayNumber: number[] = [1,5,78,487,84,7,5,8,5,8]; 

const findMinMax = (...arrayNumber:number[]): [number, number] => {
    const max = Math.max(...arrayNumber)
    const min = Math.min(...arrayNumber)
    return [min, max]
}
const [min, max] = findMinMax(...arrayNumber);



// 8. Create a TypeScript program that declares a function that takes a string parameter with a literal type of "red", "green", or "blue", and an optional boolean parameter. If the boolean parameter is true, log the string parameter in uppercase. If the boolean parameter is false or not provided, log the string parameter in lowercase.


type Colors = 'red' | 'green' | 'blue' ;
const getColors = (value:Colors, uppercase?:boolean):void => {
    if(uppercase){
        console.log(value.toUpperCase());
    }else{
        console.log(value.toLowerCase());
    }
}
getColors('green', true);
