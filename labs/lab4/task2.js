const readlinesync = require("readline-sync");
class BuyModel{
    constructor(){
        this.prod;
        this.cost;
    }
    purchase(products){
        this.selection(products)
        this.estimation()
        this.payment()
    }
    estimation(){
        this.cost = this.prod.ram *2000 + this.prod.core *3000 + this.prod.memory*10
        console.log("The cost of " + this.prod.name + " is " + this.cost)
    }
    payment(){
        readlinesync.question("Push ENTER to pay "+this.cost + " for your " + this.prod.name);
        console.log("PURCHASE DONE")
    }
}
class ByRam extends BuyModel{
    selection(products){
        let prod = products[0];
        for(let i = 0; i < products.length-1; i++){
            if(prod.ram<products[i+1].ram)
            prod = products[i+1]
        }
        this.prod = prod;
        console.log("Your best choice is " + prod.name)
    }
}
class ByCore extends BuyModel{
    selection(products){
        let prod = products[0];
        for(let i = 0; i < products.length-1; i++){
            if(prod.core<products[i+1].core)
            prod = products[i+1]
        }
        this.prod = prod;
        console.log("Your best choice is " + prod.name)
    }
}
class ByMemory extends BuyModel{
    selection(products){
        let prod = products[0];
        for(let i = 0; i < products.length-1; i++){
            if(prod.memory<products[i+1].memory)
            prod = products[i+1]
        }
        this.prod = prod;
        console.log("Your best choice is " + prod.name)
    }
}

let products = [{name:"Lenovo",ram:8,core:4,memory:512},{name:"HP",ram:4,core:4,memory:1024},{name:"Asus",ram:4,core:8,memory:512}]

let shop;
console.log("Hello! Please choose main characteristic for notebook:");
console.log("1.Ram\n2.Core\n3.Memory");
let ch = readlinesync.question("Enter number:");

if(ch == 1)
shop = new ByRam;
if(ch == 2)
shop = new ByCore;
if(ch == 3)
shop = new ByMemory;

shop.purchase(products);
