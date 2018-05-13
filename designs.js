"use strict";

var Cat = function() {
  this.score = 0;
}

Cat.prototype.updateScore = function() {
    this.score += 1;
    this.board.textContent = this.score;
};

Cat.prototype.printName = function() {
  let nameHeader = "<h1 class=\"name\">" + this.name + "</h1>";
  this.container.insertAdjacentHTML('afterbegin', nameHeader);
}

let kitten1 = new Cat();
kitten1.name = "Ashy";
kitten1.board = document.getElementById('tapCount1');
kitten1.container = document.getElementById('kitten1-container');
kitten1.printName();

let kitten2 = new Cat();
kitten2.name = "Luna";
kitten2.board = document.getElementById('tapCount2');
kitten2.container = document.getElementById('kitten2-container');
kitten2.printName();

kitten1.container.addEventListener("click", function() {
  kitten1.updateScore();
});

kitten2.container.addEventListener("click", function() {
  kitten2.updateScore();
});
