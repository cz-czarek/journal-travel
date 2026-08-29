document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // GALERIE
  // ==========================================

  const galleries = document.querySelectorAll(".gallery");

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


        if (!image || !mainImage) {
          return;
        }


        mainImage.src = image;
        mainImage.alt = alt;


        thumbnails.forEach(function (item) {

          item.classList.remove("active");

        });


        thumbnail.classList.add("active");

      });

    });

  });



  // ==========================================
  // FILTRY
  // ==========================================

  const filterButtons =
    document.querySelectorAll(".filter-button");

  const tripCards =
    document.querySelectorAll(".trip-card");


  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const filter =
        button.dataset.filter;


      filterButtons.forEach(function (item) {

        item.classList.remove("active");

      });


      button.classList.add("active");


      tripCards.forEach(function (card) {

        const shouldShow =
          filter === "all" ||
          card.dataset.category === filter;


        card.classList.toggle(
          "hidden-card",
          !shouldShow
        );

      });

    });

  });



  // ==========================================
  // CZYTAJ / ZWIŃ
  // ==========================================

  const readButtons =
    document.querySelectorAll(".read-more");


  readButtons.forEach(function (button) {

    const card =
      button.closest(".trip-card");


    if (!card) {
      return;
    }


    const description =
      card.querySelector(".trip-description");


    if (!description) {
      return;
    }


    button.addEventListener("click", function () {

      const isClosed =
        description.hasAttribute("hidden");


      if (isClosed) {

        description.removeAttribute("hidden");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

        button.innerHTML =
          'Zwiń <span aria-hidden="true">↑</span>';

      } else {

        description.setAttribute(
          "hidden",
          ""
        );

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        button.innerHTML =
          'Czytaj <span aria-hidden="true">↗</span>';

      }

    });

  });

});