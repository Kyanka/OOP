class Figure {
  constructor(position, color, name) {
    this.position = position;
    this.color = color;
    this.name = name;
  }
  produce() {
    return new Figure(this.position, this.color, this.name);
  }
}

//CREATE PROTOTYPES
let figures = ["rook", "knight", "bishop", "king", "queen", "pawn"];
let figPrototypes = new Array();

for (let i = 0; i < figures.length; i++) {
  let proto = new Figure("none", "none", figures[i]);
  figPrototypes.push(proto);
}
//FILL BOARD
let cells = ["A", "B", "C", "D", "E", "F", "G", "H"];
let board= new Array();

for (let b = 1; b <= 8; b++) {
  let row = new Array();
  for (let i = 1; i <= cells.length; i++) {
    let figure;

    if (i >= 1 && i <= 5 && (b == 1 || b == 8)) {
      figure = figPrototypes[i - 1].produce();
      figure.position = cells[i - 1] + b;
    }
    if (i > 5 && (b == 1 || b == 8)) {
      figure = figPrototypes[8 - i].produce();
      figure.position = cells[i - 1] + b;
    }
    if (b == 2 || b == 7) {
      figure = figPrototypes[5].produce();
      figure.position = cells[i - 1] + b;
    }
    if (b >= 1 && b <= 2) {
      figure.color = "white";
    }
    if (b >= 7 && b <= 8) {
      figure.color = "black";
    }
    if(b>2 && b<7){
        figure = "empty";
    }
    row.push(figure);
  }
board.push(row);
}
console.log(board);


