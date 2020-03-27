class Shoes {
  constructor(_size) {
    this.size = _size;
  }
}


class Fitting {
  constructor(_shoes) {
    this.Cm = [23.6, 24.3, 25, 25.7, 26.4, 27, 27.7, 26.4, 29, 29.7];
    this.Ua = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
    this.Uk = [4, 5, 6, 6.5, 7.5, 8, 9, 9.5, 10.5, 11.5];

    this.shoes = _shoes;
    if (
      this.Cm.find(a => {
        return a == this.shoes.size;
      })
    )
      this.sizeType = "CM";
    if (
      this.Ua.find(a => {
        return a == this.shoes.size;
      })
    )
      this.sizeType = "UA";
    if (
      this.Uk.find(a => {
        return a == this.shoes.size;
      })
    )
      this.sizeType = "UK";
  }

  getInfo() {
    console.log(
      "This is " + this.sizeType + " shoes in " + this.shoes.size + " size!"
    );
  }

  toUa() {
    if (this.sizeType == "UA") this.getInfo();
    if (this.sizeType == "CM") {
      let i = this.Cm.findIndex(a => {
        return a == this.shoes.size;
      });
      console.log("This size in UA will be " + this.Ua[i]);
    }
    if (this.sizeType == "UK")
      console.log("UK to UA error, cronovirus quarantine");
  }

  toUk() {
    if (this.sizeType == "UK") this.getInfo();
    if (this.sizeType == "CM") {
      let i = this.Cm.findIndex(a => {
        return a == this.shoes.size;
      });
      console.log("This size in UK will be " + this.Uk[i]);
    }
    if (this.sizeType == "UA")
      console.log("UA to UK error, cronovirus quarantine");
  }
}
class ShoesAdapter {
  constructor(_fit) {
    this.fit = _fit;
    console.log("\nAdapting...\n")
  }
  toUa() {
    if(this.fit.sizeType != "UK")
    this.fit.toUa();
    else {
        let i = this.fit.Uk.findIndex(a => {
            return a == this.fit.shoes.size;
          });
          console.log("This size in UA will be " + this.fit.Ua[i]);
    }
  }

  toUk() {
    if(this.fit.sizeType != "UA")
    this.fit.toUk();
    else {
        let i = this.fit.Ua.findIndex(a => {
            return a == this.fit.shoes.size;
          });
          console.log("This size in UK will be " + this.fit.Uk[i]);
    }
  }
}

let shoes = new Shoes(25);
shoes = new Fitting(shoes);
shoes.getInfo();
shoes.toUk();
shoes.toUa();

console.log("\n");

shoes = new Shoes(37);
shoes = new Fitting(shoes);
shoes.getInfo();
shoes.toUk();

shoes = new ShoesAdapter(shoes);
shoes.toUk();
