const loader = document.getElementById("loader");
const imgConatiner = document.getElementById("image-container");

let ready = false;
let imageCount = 0;
let totalImages = 0;

let count = 10;
// const apiKey="v0I99mOF0DuISGRxP2t3ZG6NidLl43l3YTCeJeHZw2g";
const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(elemnt, attributes) {
  for (const key in attributes) {
    elemnt.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imageCount++;
  if (imageCount === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

function displayPhotos(photos) {
  imageCount = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.alt_description,
      alt: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imgConatiner.appendChild(item);
  });
}

async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    displayPhotos(photos);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhoto();
  }
});

getPhoto();
