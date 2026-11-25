const artworks = [
  {
    title: "Golden Thoughts",
    style: "Paintings",
    image: "images/painting1.jpg",
  },

  {
    title: " Dreams",
    style: "Paintings",
    image: "images/painting4.jpg",
  },

  {
    title: "Golden ",
    style: "Paintings",
    image: "images/painting5.jpg",
  },

  {
    title: "Whispers of Colour",
    style: "Paintings",
    image: "images/painting2.jpg",
  },

  {
    title: "The Quiet Landscape",
    style: "Paintings",
    image: "images/painting 3.jpg",
  },

  {
    title: "Nature",
    style: "Paintings",
    image: "images/painting6.jpg",
  },

  {
    title: "Lines of Imagination",
    style: "Drawings",
    image: "images/drawing1.jpg",
  },

  {
    title: "Light",
    style: "Drawings",
    image: "images/drawing3.jpg",
  },

  {
    title: "Pets",
    style: "Drawings",
    image: "images/drawing6.jpg",
  },

  {
    title: "Deep Inside",
    style: "Drawings",
    image: "images/drawing4.jpg",
  },

  {
    title: "Realistic",
    style: "Drawings",
    image: "images/drawing5.jpg",
  },

  {
    title: "The Human Form",
    style: "Drawings",
    image: "images/drawing2.jpg",
  },

  {
    title: "Fragments of Colour",
    style: "Mosaic",
    image: "images/mosaic1.jpg",
  },

  {
    title: "Buildings",
    style: "Mosaic",
    image: "images/mosaic6.jpg",
  },

  {
    title: "Mythical creatures",
    style: "Mosaic",
    image: "images/mosaic3.jpg",
  },

  {
    title: "Roses",
    style: "Mosaic",
    image: "images/mosaic4.jpg",
  },

  {
    title: "Pieces of a Story",
    style: "Mosaic",
    image: "images/mosaic2.jpg",
  },

  {
    title: "Horse",
    style: "Mosaic",
    image: "images/mosaic5.jpg",
  },

  {
    title: "The Silent Figure",
    style: "Sculpture",
    image: "images/sculpt1.jpg",
  },

  {
    title: " Ballet",
    style: "Sculpture",
    image: "images/sculpt3.jpg",
  },

  {
    title: " Birds",
    style: "Sculpture",
    image: "images/sculpt6.jpg",
  },

  {
    title: "Ancient Times",
    style: "Sculpture",
    image: "images/sculpt4.jpg",
  },

  {
    title: "Grace",
    style: "Sculpture",
    image: "images/sculpt5.jpg",
  },

  {
    title: "Form and Movement",
    style: "Sculpture",
    image: "images/sculpt2.jpg",
  },

  {
    title: "A New Perspective",
    style: "Modern Art",
    image: "images/art4.jpg",
  },

  {
    title: "Abstract Art",
    style: "Modern Art",
    image: "images/art6.jpg",
  },

  {
    title: "Beyond the Ordinary",
    style: "Modern Art",
    image: "images/art5.jpg",
  },

  {
    title: "Colour in Motion",
    style: "Modern Art",
    image: "images/art3.jpg",
  },

  {
    title: "Different Perspectives",
    style: "Modern Art",
    image: "images/art2.jpg",
  },

  {
    title: "Uniqueness",
    style: "Modern Art",
    image: "images/art1.jpg",
  },
];

const gallery = document.getElementById("gallery");

const selectedStylesText = document.getElementById("selectedStyles");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxStyle = document.getElementById("lightboxStyle");

const closeLightbox = document.getElementById("closeLightbox");

let selectedStyles = JSON.parse(localStorage.getItem("selectedStyles")) || [];

if (selectedStyles.length === 0) {
  selectedStylesText.textContent =
    "Showing a collection of different art styles.";
} else {
  selectedStylesText.textContent = "Your styles: " + selectedStyles.join(" • ");
}

function getGalleryArt() {
  if (selectedStyles.length === 0) {
    return artworks;
  }
  let chosenArt = artworks.filter(function (artwork) {
    return selectedStyles.includes(artwork.style);
  });
  return chosenArt;
}

function displayGallery() {
  gallery.innerHTML = "";

  const chosenArt = getGalleryArt();

  chosenArt.forEach(function (artwork, index) {
    const card = document.createElement("div");

    card.classList.add("art-card");

    if (index % 6 === 0) {
      card.classList.add("tall");
    } else if (index % 6 === 1) {
      card.classList.add("wide");
    } else if (index % 6 === 2) {
      card.classList.add("circle");
    } else if (index % 6 === 3) {
      card.classList.add("arch");
    } else if (index % 6 === 4) {
      card.classList.add("rounded");
    } else {
      card.classList.add("soft");
    }

    const image = document.createElement("img");

    image.src = artwork.image;

    image.alt = artwork.title + " - " + artwork.style;

    const information = document.createElement("div");

    information.classList.add("art-info");

    const title = document.createElement("h3");

    title.textContent = artwork.title;

    const style = document.createElement("p");

    style.textContent = artwork.style;

    information.appendChild(title);

    information.appendChild(style);

    card.appendChild(image);

    card.appendChild(information);

    card.addEventListener("dblclick", function () {
      openLightbox(artwork);
    });

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        openLightbox(artwork);
      }
    });

    gallery.appendChild(card);
  });
}

function openLightbox(artwork) {
  lightboxImage.src = artwork.image;

  lightboxImage.alt = artwork.title + " - " + artwork.style;

  lightboxTitle.textContent = artwork.title;

  lightboxStyle.textContent = artwork.style;

  lightbox.classList.remove("hidden");
}

function closeGalleryImage() {
  lightbox.classList.add("hidden");
}

closeLightbox.addEventListener("click", closeGalleryImage);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeGalleryImage();
  }
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeGalleryImage();
  }
});

displayGallery();
