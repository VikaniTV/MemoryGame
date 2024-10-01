function hideImages() {
  const numberOfImages = document.querySelectorAll(".button-card").length;
  for (i = 0; i < numberOfImages; i++) {
    document.getElementById(`img-${i}`).classList.add("hidden");
  }
}

function unhideImages() {
  const numberOfImages = document.querySelectorAll(".button-card").length;
  for (i = 0; i < numberOfImages; i++) {
    document.getElementById(`img-${i}`).classList.remove("hidden");
  }
}
  document.querySelector(".ready").addEventListener("click", hideImages);


const imageIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

// Used like so
shuffle(imageIndex);

function assignImagesToIndex() {
  for (i = 0; i < imageIndex.length; i++) {
    document
      .querySelector(`#img-${i}`)
      .setAttribute("src", `assets/${imageIndex[i] % 6}.jpeg`);
  }
}
assignImagesToIndex();
function comparingImages(clickedImage1, currentImage) {
  const clickedImageSrc = clickedImage1.getAttribute("src");
  const currentImageSrc = currentImage.getAttribute("src");
  if (clickedImageSrc === currentImageSrc) {
    return true;
  } else {
    return false;
  }
}
let clickedImage1 = null;

for (let i = 0; i < imageIndex.length; i++) {
  document
    .querySelectorAll(`.button-card`)
    [i].addEventListener("click", function () {
      let currentImage = document.querySelector(`.img${i}`);
      currentImage.classList.remove("hidden");
      if (clickedImage1 === null) {
        clickedImage1 = currentImage;
      } else {
        if (comparingImages(clickedImage1, currentImage)) {
          let score = Number(document.querySelector(".score").textContent);
          let currentScore = score + 1;
          document.querySelector(".score").textContent = currentScore;
        } else {
          const copyClickedImage1 = clickedImage1;
          const copyCurrentImage = currentImage;

          const addHiddenClickedImage = function () {
            copyClickedImage1.classList.add("hidden");
            copyCurrentImage.classList.add("hidden");
          };
          setTimeout(addHiddenClickedImage, 1000);
        }

        currentImage = null;
        clickedImage1 = null;
      }
    });
}

document.querySelector(".new--game").addEventListener("click", function () {
  document.querySelector(".score").textContent = 0;
  shuffle(imageIndex);
  assignImagesToIndex();
  unhideImages()
});
