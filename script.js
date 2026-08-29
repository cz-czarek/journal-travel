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
  // FUNKCJA ZAMYKANIA
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
  // KRZYŻYK
  // ==========================================

  modalClose.addEventListener(
    "click",
    closeModal
  );



  // ==========================================
  // KLIKNIĘCIE W CIEMNE TŁO
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
  // ESC
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

});