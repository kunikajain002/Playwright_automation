let message1 :string = "hello";
// message1 = 3; we cannot assign this again, because it is a static typing
message1 = "bye";
console.log(message1);

let age1 : number = 20;
console.log(age1);

let isActive : boolean = false;

let numbers1 : number[] = [1,2,3];

let data : any = "this could be anything";
data = 42;

function add(a:number,b:number):number
{
    return a+b;
}

add(3,4)


let user: {name:string, age: number} = {name: "bob", age: 34};
// user.location = "Gwalior"; this will give error in TS but you can converti it in js and it won't create problem
// cmd tsc demo.js
