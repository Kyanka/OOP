class Puller {

    pull(turnip) {
        //this.pullers.push(this.role)
      if (this.canPull(turnip)) {
        console.log(`Turnip in ${turnip} kg was pulled by ${this.role}`);
      } else if (this.next) {
        console.log(`Turnip is too heavy to ${this.role}`);
        console.log(`${this.next.role}, where a you?`);
        this.next.pull(turnip);
      } else {
        console.log("Unfortunately, too heavy for this family");
      }
    }
  
    canPull(turnip) {
      return this.power >= turnip;
    }
  
    callNext(puller) {
      this.next = puller;
      this.next.power+=this.power 
    }
  }
  
  class Grandpa extends Puller {
    constructor() {
      super();
      this.role = "Grandpa";
      this.power = 60;
    }
  }
  
  class Grandma extends Puller {
    constructor() {
      super();
      this.role = "Gandma";
      this.power = 50;
    }
  }
  
  class Granddaughter extends Puller {
    constructor() {
      super();
      this.role = "Granddaughter";
      this.power = 40;
    }
  }
  class Dog extends Puller {
    constructor() {
      super();
      this.role = "Dog";
      this.power = 30;
    }
  }
  class Cat extends Puller {
    constructor() {
      super();
      this.role = "Cat";
      this.power = 20;
    }
  }
  class Mouse extends Puller {
    constructor() {
      super();
      this.role = "Mouse";
      this.power = 20;
    }
  }
  
  let grandpa = new Grandpa;
  let grandma = new Grandma;
  let granddaughter = new Granddaughter;
  let dog = new Dog;
  let cat = new Cat;
  let mouse = new Mouse;
  
  grandpa.callNext(grandma);
  grandma.callNext(granddaughter);
  granddaughter.callNext(dog);
  dog.callNext(cat);
  cat.callNext(mouse);
  
  let turnip=220
  grandpa.pull(turnip);