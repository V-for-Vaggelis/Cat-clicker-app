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

let ashie = new Cat();
ashie.name = "Ashie";
ashie.board = document.getElementById('tapCountAshie');
ashie.container = document.getElementById('ashie-container');
ashie.printName();

let luna = new Cat();
luna.name = "Luna";
luna.board = document.getElementById('tapCountLuna');
luna.container = document.getElementById('luna-container');
luna.printName();

ashie.container.addEventListener("click", function() {
  ashie.updateScore();
});

luna.container.addEventListener("click", function() {
  luna.updateScore();
});
