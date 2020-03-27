class Canvas {
  setLength(_length) {
    this.length = _length;
  }
  setHigh(_high) {
    this.high = _high;
  }
  getLength() {
    return this.length;
  }
  getHigh() {
    return this.high;
  }
}

class Composite extends Canvas {
  constructor() {
    super();
    this.matrix = [];
  }
  add(string) {
    this.matrix.push(string);
    if (this.getLength() < string.length) this.setLength(string.length);
    this.setHigh(this.matrix.length);
  }
  write() {
    for (let str of this.matrix) {
      console.log(str);
    }
    console.log("length: " + matrix.getLength());
    console.log("high: " + matrix.getHigh());
  }
}

class Matrix extends Composite {
  constructor() {
    super();
    this.setHigh(0);
    this.setLength(0);
  }
}

// class String {
//   constructor(_string) {
//     this.string = _string;
//     this.length = _string.length;
//   }
// }

let matrix = new Matrix();

matrix.add("+   +     ++++    ");
matrix.add("+  +    ++    ++  ");
matrix.add("+ +    +        + ");
matrix.add("++    +          +");
matrix.add("+ +    +        + ");
matrix.add("+  +    ++    ++  ");
matrix.add("+   +     ++++    ");

matrix.write();
