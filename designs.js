"use strict";
document.addEventListener('DOMContentLoaded', e => {
  // This event listener is a vanilla js way to ensure js executes after DOM load
  let catContainer = document.getElementById("cat-info");
  let nameList = document.getElementById("catList");
  var Cat = function() {
    this.score = 0;
  }

  Cat.prototype.createScore = function() {
    let scoreHtml = document.createElement("H1");
    scoreHtml.classList.add("count");
    let scoreId = this.name + "-score";
    scoreHtml.setAttribute("id", scoreId);
    scoreHtml.textContent = this.score;
    catContainer.appendChild(scoreHtml);
  };

  Cat.prototype.printName = function() {
    let nameHtml = document.createElement("H1");
    nameHtml.classList.add("name");
    nameHtml.textContent = this.name;
    catContainer.appendChild(nameHtml);
  };

  Cat.prototype.printPicture = function() {
    let picHtml = document.createElement("IMG");
    picHtml.classList.add("cat");
    picHtml.setAttribute("alt", this.alt);
    picHtml.setAttribute("src", this.link);
    catContainer.appendChild(picHtml);
  };

  Cat.prototype.changeCat = function() {
    // The order here is really important!
    catContainer.innerHTML = "";
    this.printName();
    this.printPicture();
    this.createScore();
  };

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
  /* This is a way to immediately create elements and add event listeners on them, taking advantage of iife's explained
  on part 4 lesson 1 "closures paragraph", we basically ensure the handler gets immediately executed before the loop continues looping through*/
  for (let cat of allCats) {
    let nameCode = document.createElement("LI");
    nameCode.setAttribute("id", cat.name);
    nameCode.textContent = cat.name;
    // This is an immediately invoked function expression iife
    nameCode.addEventListener('click', (function(catCopy) {
      return function() {
        catContainer.style.display = "auto";
        catCopy.changeCat();
      };
    })(cat));
    nameList.appendChild(nameCode);
  }

  // Now let's listen for the taps and count them
  catContainer.addEventListener("click", function(evt) {
    let target = evt.target;
    // This creates event delegation, it means target container for image elements
    if (target.nodeName === "IMG") {
      // Let's find which object's image was clicked by looping through all objects and comparing the image source
      let targetImage = target.getAttribute("src");
      for (let cat of allCats) {
        if (targetImage === cat.link) {
          cat.score += 1;
          let countId = cat.name + "-score";
          let scoreCount = document.getElementById(countId);
          scoreCount.textContent = cat.score;
        }
      }
    }
  });
});
