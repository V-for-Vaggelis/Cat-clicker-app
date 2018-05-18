/* This js script uses MVO code-organisation techniques, it basically seperates the code into 3 objects
1) The model that holds everything that can be represented as js advantage
2) The view, that holds everything that is displayed to the user
3) The octopus that connects the two above, it basically contains all the code that handles interactions */
document.addEventListener('DOMContentLoaded', e => {
  // This event listener is a vanilla js way to ensure js executes after DOM load
  let catContainer = document.getElementById("cat-info");
  // A constructor that creates a cat object when called
  class Cat {
    constructor(name, alt = "A cat", img) {
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
        nameButton.classList.add("cat-button");
        nameListItem.appendChild(nameButton);
        nameButton.setAttribute("id", cat.name);
        nameButton.textContent = cat.name;

        /* This is an event listener with an immediately invoked function expression (iife) as handler
        It's the only way to listen for events in elements while looping through them*/
        nameButton.addEventListener('click', (function(catCopy) {
          return function() {
            // Create the selected cat
            view2.renderCat(catCopy);
            view2.catAddStyles();
            // If the admin  form is displayed show it's info there
            if (!view1.form.classList.contains("hide")) {
              view1.displayCurrentCatInfo(catCopy);
            }
          };
        })(cat));

        view1.createListItem(nameListItem);
      }
    },

    tapListener: function() {
      // Now let's listen for the taps and count them
      catContainer.addEventListener("click", function(evt) {
        let target = evt.target;
        // This creates event delegation, it means target the cat container for image elements
        if (target.nodeName === "IMG") {
          // Let's find which object's image was clicked by looping through all objects and comparing the image source
          let targetImage = target.getAttribute("src");
          // Loop through the cats to find which one of them was taped
          for (let cat of model) {
            if (targetImage === cat.link) {
              cat.score += 1;
              // count the tap, and call the view object to increment the number on screen
              view2.countTap(cat);
              // Show the number changing on the form as well
              view1.displayCurrentCatInfo(cat);
            }
          }
        }
      });
    },

    formListener: function() {
      // When admin button gets clicked show the form
      view1.adminButton.addEventListener('click', function() {
        view1.toggleForm();
        let catOnScreenName = view2.getDisplayedCat();
        if (!(catOnScreenName === undefined)) {
          let catOnScreen;
          // Loop through the cats to find which one of them is on screen
          for (let cat of model) {
            if (cat.name === catOnScreenName) {
              catOnScreen = cat;
            }
          }
          view1.displayCurrentCatInfo(catOnScreen);
        }
      });

      // On cancel clicked hide the form
      view1.cancelButton.addEventListener('click', function() {
        view1.toggleForm();
      });

      // We listen for a submit event, lots of if's in there to alert on unwanted inputs
      view1.form.addEventListener('submit', function(evt) {
        // Prevent the page from reloading on submit
        evt.preventDefault();
        let adminName = view1.newName.value;
        let adminImg = view1.newImg.value;
        let adminCount = Number(view1.newCount.value);

        if (adminName.length > 0 && adminImg.length > 0) {
          for (let cat of model) {
            if (cat.name === adminName && cat.link === adminImg) {
              alert("Cat already exists");
              return false;
            }
          }
          let currentCatName = view2.getDisplayedCat();
          if (currentCatName === undefined ) {
            alert("You must first choose a cat\n to be replaced with your cat!");
            return false;
          }
          for (let cat of model) {
            if (cat.name === currentCatName) {
              cat.name = adminName;
              cat.link = adminImg;
              cat.score = adminCount;
              cat.alt = "Your cat";
              // Load the input cat on screen
              view2.renderCat(cat);
              view1.displayCurrentCatInfo(cat);
            }
          }
          view1.clearList();
          // Delete any previous lists, hide the form and reload the list to contain the inputed cat
          view1.toggleForm();
          octopus.createCatList();
          return false;
        }
        else {
          alert("All fields must be completed before submitting");
          return false;
        }
      });
    }
  };

  // An object to display and access all buttons
  let view1 = {
    // The list of cats
    nameList: document.getElementById("catList"),

    createListItem: function(item) {
      this.nameList.appendChild(item);
    },

    clearList: function() {
      this.nameList.innerHTML = "";
    },

    // Let's access the form's buttons
    adminButton: document.getElementById("admin"),
    cancelButton: document.getElementById("cancel-admin"),
    form: document.getElementById("admin-form"),

    toggleForm: function() {
      this.adminButton.classList.toggle("hide");
      this.form.classList.toggle("hide");
    },

    // Let's access the form's input fields
    newName: document.getElementById("change-name"),
    newImg: document.getElementById("change-pic"),
    newCount: document.getElementById("change-clicks"),

    // Display info on form
    displayCurrentCatInfo: function(thisCat) {
      this.newName.value = thisCat.name;
      this.newImg.value = thisCat.link;
      this.newCount.value = thisCat.score;
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
    },

    // A function that returns the displayed cat's name
    getDisplayedCat: function() {
      let selectedNameDom = catContainer.getElementsByClassName("name");
      let selectedNameEl = [...selectedNameDom];
      if (selectedNameEl[0] === undefined) {
        return ;
      }
      else {
        let selectedName = selectedNameEl[0].textContent;
        return selectedName;
      }
    }
  };

  // Call the createCatList function to initially show the list to the user
  octopus.createCatList();
  // Listen for taps in cats
  octopus.tapListener();
  // Listen for submits in the admin form
  octopus.formListener();
});
