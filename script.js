document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // GALERIE ZDJĘĆ
  // ==========================================

  const galleries =
    document.querySelectorAll(".gallery");


  galleries.forEach(function (gallery) {

    const mainImage =
      gallery.querySelector(".gallery-main");

    const thumbnails =
      gallery.querySelectorAll(".thumbnail");


    thumbnails.forEach(function (thumbnail) {

      thumbnail.addEventListener("click", function () {

        const image =
          thumbnail.dataset.image;

        const alt =
          thumbnail.dataset.alt || "Zdjęcie z podróży";


        if (!mainImage || !image) {
          return;
        }


        // Zmieniamy duże zdjęcie

        mainImage.src = image;
        mainImage.alt = alt;


        // Usuwamy aktywne zaznaczenie

        thumbnails.forEach(function (item) {

          item.classList.remove("active");

        });


        // Zaznaczamy klikniętą miniaturę

        thumbnail.classList.add("active");

      });

    });

  });



  // ==========================================
  // FILTROWANIE PODRÓŻY
  // ==========================================

  const filterButtons =
    document.querySelectorAll(".filter-button");

  const tripCards =
    document.querySelectorAll(".trip-card");


  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const selectedFilter =
        button.dataset.filter;


      // Aktywny przycisk filtra

      filterButtons.forEach(function (item) {

        item.classList.remove("active");

      });


      button.classList.add("active");


      // Pokazywanie odpowiednich kart

      tripCards.forEach(function (card) {

        const category =
          card.dataset.category;


        const shouldShow =
          selectedFilter === "all" ||
          selectedFilter === category;


        card.classList.toggle(
          "hidden-card",
          !shouldShow
        );

      });

    });

  });



  // ==========================================
  // MODAL — ELEMENTY
  // ==========================================

  const modal =
    document.getElementById("travelModal");

  const modalTitle =
    modal.querySelector(".modal-title");

  const modalText =
    modal.querySelector(".modal-text");

  const modalClose =
    modal.querySelector(".modal-close");

  const readButtons =
    document.querySelectorAll(".read-more");



  // ==========================================
  // OTWIERANIE MODALA
  // ==========================================

  readButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card =
        button.closest(".trip-card");


      if (!card) {
        return;
      }


      const titleElement =
        card.querySelector("h3");

      const descriptionElement =
        card.querySelector(".trip-description");


      if (!titleElement || !descriptionElement) {
        return;
      }


      // Pobieramy tytuł

      const title =
        titleElement.textContent.trim();


      // Kopiujemy HTML pełnego opisu.
      // Dzięki temu zachowujemy akapity <p>.

      const description =
        descriptionElement.innerHTML;


      // Wstawiamy dane do okna

      modalTitle.textContent = title;

      modalText.innerHTML = description;


      // Pokazujemy modal

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      // Blokujemy przewijanie strony w tle

      document.body.classList.add(
        "modal-open"
      );

    });

  });



  // ==========================================
  // FUNKCJA ZAMYKANIA MODALA
  // ==========================================

  function closeModal() {

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }



  // ==========================================
  // KRZYŻYK MODALA
  // ==========================================

  modalClose.addEventListener(
    "click",
    closeModal
  );



  // ==========================================
  // KLIKNIĘCIE W TŁO MODALA
  // ==========================================

  modal.addEventListener(
    "click",
    function (event) {

      if (event.target === modal) {

        closeModal();

      }

    }
  );



  // ==========================================
  // ESC — MODAL
  // ==========================================

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal.classList.contains("open")
      ) {

        closeModal();

      }

    }
  );



  // ==========================================
  // LIGHTBOX — PEŁNOEKRANOWA GALERIA
  // ==========================================

  const lightbox =
    document.getElementById("imageLightbox");

  const lightboxImage =
    lightbox.querySelector(".lightbox-image");

  const lightboxClose =
    lightbox.querySelector(".lightbox-close");

  const lightboxPrev =
    lightbox.querySelector(".lightbox-prev");

  const lightboxNext =
    lightbox.querySelector(".lightbox-next");

  const lightboxCounter =
    lightbox.querySelector(".lightbox-counter");

  const largeImages =
    document.querySelectorAll(".gallery-main");


  let currentGalleryImages = [];

  let currentImageIndex = 0;

  let currentGallery = null;



  // ==========================================
  // WYŚWIETLANIE AKTUALNEGO ZDJĘCIA
  // ==========================================

  function showLightboxImage() {

    if (currentGalleryImages.length === 0) {
      return;
    }


    const currentImage =
      currentGalleryImages[currentImageIndex];


    lightboxImage.src =
      currentImage.src;

    lightboxImage.alt =
      currentImage.alt;


    lightboxCounter.textContent =
      (currentImageIndex + 1) +
      " / " +
      currentGalleryImages.length;

  }



  // ==========================================
  // OTWIERANIE LIGHTBOXA
  // ==========================================

  largeImages.forEach(function (image) {

    image.addEventListener("click", function () {

      currentGallery =
        image.closest(".gallery");


      if (!currentGallery) {
        return;
      }


      const thumbnails =
        Array.from(
          currentGallery.querySelectorAll(".thumbnail")
        );


      currentGalleryImages =
        thumbnails.map(function (thumbnail) {

          return {

            src: thumbnail.dataset.image,

            alt:
              thumbnail.dataset.alt ||
              "Zdjęcie z podróży"

          };

        });


      const activeIndex =
        thumbnails.findIndex(function (thumbnail) {

          return thumbnail.classList.contains("active");

        });


      currentImageIndex =
        activeIndex >= 0
          ? activeIndex
          : 0;


      showLightboxImage();


      lightbox.classList.add("open");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.classList.add(
        "modal-open"
      );

    });

  });



  // ==========================================
  // NASTĘPNE ZDJĘCIE
  // ==========================================

  function nextLightboxImage() {

    if (currentGalleryImages.length === 0) {
      return;
    }


    currentImageIndex++;


    if (
      currentImageIndex >=
      currentGalleryImages.length
    ) {

      currentImageIndex = 0;

    }


    showLightboxImage();

  }



  // ==========================================
  // POPRZEDNIE ZDJĘCIE
  // ==========================================

  function previousLightboxImage() {

    if (currentGalleryImages.length === 0) {
      return;
    }


    currentImageIndex--;


    if (currentImageIndex < 0) {

      currentImageIndex =
        currentGalleryImages.length - 1;

    }


    showLightboxImage();

  }



  // ==========================================
  // STRZAŁKI NA EKRANIE
  // ==========================================

  lightboxNext.addEventListener(
    "click",
    nextLightboxImage
  );


  lightboxPrev.addEventListener(
    "click",
    previousLightboxImage
  );



  // ==========================================
  // ZAMYKANIE LIGHTBOXA
  // ==========================================

  function closeLightbox() {

    // Po zamknięciu ustawiamy ostatnio oglądane
    // zdjęcie jako główne zdjęcie galerii.

    if (
      currentGallery &&
      currentGalleryImages.length > 0
    ) {

      const mainImage =
        currentGallery.querySelector(
          ".gallery-main"
        );

      const thumbnails =
        Array.from(
          currentGallery.querySelectorAll(
            ".thumbnail"
          )
        );


      const selectedImage =
        currentGalleryImages[currentImageIndex];


      mainImage.src =
        selectedImage.src;

      mainImage.alt =
        selectedImage.alt;


      // Zmieniamy aktywną miniaturę

      thumbnails.forEach(
        function (thumbnail, index) {

          thumbnail.classList.toggle(
            "active",
            index === currentImageIndex
          );

        }
      );


      // Przesuwamy pasek miniaturek tak,
      // żeby aktywna miniatura była widoczna.

      if (thumbnails[currentImageIndex]) {

        thumbnails[currentImageIndex]
          .scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });

      }

    }


    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "modal-open"
    );


    lightboxImage.src = "";

  }



  // ==========================================
  // KRZYŻYK LIGHTBOXA
  // ==========================================

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );



  // ==========================================
  // KLIKNIĘCIE W TŁO LIGHTBOXA
  // ==========================================

  lightbox.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {

        closeLightbox();

      }

    }
  );



  // ==========================================
  // KLAWIATURA — LIGHTBOX
  // ==========================================

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        !lightbox.classList.contains("open")
      ) {

        return;

      }


      if (event.key === "Escape") {

        closeLightbox();

      }


      if (event.key === "ArrowRight") {

        nextLightboxImage();

      }


      if (event.key === "ArrowLeft") {

        previousLightboxImage();

      }

    }
  );

});