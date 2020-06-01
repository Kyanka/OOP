const readlinesync = require("readline-sync");
class Dealer {
  constructor() {
    this.cores = ["Core I5", "Core I7", "Core I8"];
    this.video = ["2GB", "4GB", "8GB"];
    this.ram = ["2GB", "4GB", "8GB"];
    this.memory = ["256GB", "512GB", "1024GB"];
  }
}
class Computer {
  constructor(core,video,ram,memory) {
    this.core=core;
    this.video=video;
    this.ram=ram;
    this.memory = memory;
  }
  info() {
    console.log(
      `Core:${this.core}\nVideo:${this.video}\nRam:${this.ram}\nMemory:${this.memory}\n`
    );
  }
}

class Mediator {
  constructor(dealer) {
    this.customers = [];
    this.dealer = dealer;
  }
  orderComputer(customer) {
    let comp = this.selectComputer()
    let name = customer.getName();
    console.log(`Order name: ${name}. Order computer is`);
    comp.info();
    this.addToCustomersList(name);
  }
  selectComputer() {
    let core = readlinesync.question(`Please choose core:${this.dealer.cores}\n`);
    let video = readlinesync.question(`Please choose video:${this.dealer.video}\n`);
    let ram = readlinesync.question(`Please choose core:${this.dealer.ram}\n`);
    let memory = readlinesync.question(`Please choose core:${this.dealer.memory}\n`);
    return new Computer(core,video,ram,memory);
  }
  addToCustomersList(name) {
    this.customers.push(name);
  }
  getCustomerList() {
    return this.customers;
  }
}

class Customer {
  constructor(name, dealerMediator) {
    this.name = name;
    this.dealerMediator = dealerMediator;
  }
  getName() {
    return this.name;
  }
  makeOrder() {
    this.dealerMediator.orderComputer(this);
  }
}
let dealer = new Dealer();
let mediator = new Mediator(dealer);
let olya = new Customer("Olya", mediator);

olya.makeOrder();
