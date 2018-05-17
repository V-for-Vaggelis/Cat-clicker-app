/* This js script uses MVO code-organisation techniques, it basically seperates the code into 3 objects
1) The model that holds everything that can be represented as js advantage
2) The view, that holds everything that is displayed to the user
3) The octopus that connects the two above, it basically contains all the code that handles interactions */
document.addEventListener('DOMContentLoaded', e => {
  // This event listener is a vanilla js way to ensure js executes after DOM load
  let catContainer = document.getElementById("cat-info");
  // A constructor that creates a cat object when called
  class Cat {
    constructor(name, alt, img) {
      this.score = 0;
      this.name = name;
      this.alt = alt;
      this.link = img;
    }
  }

  // Let's instantiate all our cat objects
  let ashie = new Cat('Ashie', 'A grey kitty', 'ashie.png');
  let cleo = new Cat('Cleo', 'A beautiful white-grey cat with blue eyes', 'cleo.png');
  let luna = new Cat('Luna', 'A white-orange cat with a mark on it\'s nose', 'luna.jpeg');
  let grouchy = new Cat('Grouchy', 'A grouchy little blonde kitten', 'grouchy.jpg');
  let grumpy = new Cat('Grumpy', 'A grumpy little kitten spitting it\'s food', 'grumpy.jpg');

  // The model is just an array holding the cat objects
  let model = [ashie, cleo, luna, grouchy, grumpy];

  // The octopus object contains all the code that connects the DOM with our js data. Or our view with the mode. It basically handles all interactions
  let octopus = {
    createCatList: function() {
      /* This is a way to immediately create elements and add event listeners on them, taking advantage of iife's explained
      on part 4 lesson 1 "closures paragraph", we basically ensure the handler gets immediately executed before the loop continues looping through*/
      for (let cat of model) {
        // Create the buttons and event listeners for each cat, and call the view object to project it
        let nameListItem = document.createElement("LI");
        let nameButton = document.createElement("BUTTON");
        nameListItem.appendChild(nameButton);
        nameButton.setAttribute("id", cat.name);
        nameButton.textContent = cat.name;
        // This is an immediately invoked function expression iife
        nameButton.addEventListener('click', (function(catCopy) {
          return function() {
            view2.renderCat(catCopy);
            view2.catAddStyles();
          };
        })(cat));
        view1.createListItem(nameListItem);
      }

      // Now let's listen for the taps and count them
      catContainer.addEventListener("click", function(evt) {
        let target = evt.target;
        // This creates event delegation, it means target the cat container for image elements
        if (target.nodeName === "IMG") {
          // Let's find which object's image was clicked by looping through all objects and comparing the image source
          let targetImage = target.getAttribute("src");
          for (let cat of model) {
            if (targetImage === cat.link) {
              cat.score += 1;
              // count the tap, and call the view object to increment the number on screen
              view2.countTap(cat);
            }
          }
        }
      });
    }
  };

  // An object to display the clickable list of cats on-screen
  let view1 = {
    createListItem: function(item) {
      let nameList = document.getElementById("catList");
      nameList.appendChild(item);
    }
  };

  // An object to display the clicked cat
  let view2 = {
    renderCat: function(catObject) {
      // Clear the container of any previous "cats"
      catContainer.innerHTML = "";
      // This renders the name
      let nameHtml = document.createElement("H1");
      nameHtml.classList.add("name");
      nameHtml.textContent = catObject.name;
      catContainer.appendChild(nameHtml);
      // This renders the targetImage
      let picHtml = document.createElement("IMG");
      picHtml.classList.add("cat");
      picHtml.setAttribute("alt", catObject.alt);
      picHtml.setAttribute("src", catObject.link);
      catContainer.appendChild(picHtml);
      // This renders the score
      let scoreHtml = document.createElement("H1");
      scoreHtml.classList.add("count");
      let scoreId = catObject.name + "-score";
      scoreHtml.setAttribute("id", scoreId);
      scoreHtml.textContent = catObject.score;
      catContainer.appendChild(scoreHtml);
    },
    catAddStyles: function() {
      catContainer.classList.add("container-style");
    },
    countTap: function(displayedCat) {
      let countId = displayedCat.name + "-score";
      let scoreCount = document.getElementById(countId);
      scoreCount.textContent = displayedCat.score;
    }
  };
  // Call the createCatList function to initially show the list to hte user
  octopus.createCatList();
});
