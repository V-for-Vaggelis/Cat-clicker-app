"use strict";
document.addEventListener('DOMContentLoaded', e => {
  // This event listener is a vanilla js way to ensure js executes after DOM load
  let catContainer = document.getElementById("cat-info");
  let nameList = document.getElementById("catList");
  var Cat = function() {
    this.score = 0;
  }

  Cat.prototype.updateScore = function() {
    this.score += 1;
    let scoreHtml = "<h1 class=\"count\">" + this.score + "</h1>";
    catContainer.insertAdjacentHTML("beforeend", scoreHtml);
  };

  Cat.prototype.printName = function() {
    let nameHtml = "<h1 class=\"name\">" + this.name + "</h1>";
    catContainer.insertAdjacentHTML("beforeend", nameHtml);
  };

  Cat.prototype.printPicture = function() {
    let picHtml = "<img alt=" + this.alt + "class=\"cat\" src=" + this.link + "></img>";
    catContainer.insertAdjacentHTML("beforeend", picHtml);
  };

  Cat.prototype.changeCat = function() {
    // The order here is really important!
    catContainer.innerHTML = "";
    this.printName();
    this.printPicture();
    this.updateScore();
  }

// Let's instantiate all the cat objects and store them in an array
  let ashie = new Cat();
  ashie.name = "Ashie";
  ashie.alt = "A grey kitty";
  ashie.link = "ashie.png"

  let luna = new Cat();
  luna.name = "Luna";
  luna.alt = "A white-orange cat with a mark on it's nose";
  luna.link = "luna.jpeg";

  let cleo = new Cat();
  cleo.name = "Cleo";
  cleo.alt = "A beautiful white-grey cat with blue eyes";
  cleo.link = "cleo.png";

  let grouchy = new Cat();
  grouchy.name = "Grouchy";
  grouchy.alt = "A grouchy little blonde kitten";
  grouchy.link = "grouchy.jpg";

  let grumpy = new Cat();
  grumpy.name = "Grumpy";
  grumpy.alt = "A grumpy little kitten spitting it's food";
  grumpy.link = "grumpy.jpg";

  let allCats = [ashie, luna, cleo, grouchy, grumpy];
  for (let cat of allCats) {
    let nameCode = "<li id=" + cat.name +">" + cat.name + "</li>";
    nameList.insertAdjacentHTML("beforeend", nameCode);
  }
});
