"use strict";
let kitten = document.getElementById('kitten');
let tapCount = document.getElementById('tapCount');
let tapNum = 0;
kitten.addEventListener('click', function() {
  tapNum += 1;
  tapCount.textContent = tapNum;
});
