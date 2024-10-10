// <!-- navbar transparent to solid -->
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-solid');
      navbar.classList.remove('navbar-transparent');
      console.log('Navbar solid');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('navbar-solid');
      console.log('Navbar transparent');
    }
  });
});

// section active
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 50; // Penyesuaian offset jika navbar fixed
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
});


(function ($) {
  "use strict";

  // Initiate the wowjs
  new WOW().init();

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
  // Mengambil elemen yang diperlukan
  const formItems = document.querySelectorAll('#cari-mobil input, #cari-mobil select');
  const overlay = document.getElementById('overlay');
  const formContainer = document.getElementById('form-container');

  // Fungsi untuk menampilkan overlay dan highlight card
  function showOverlay() {
    overlay.classList.add('active');
    formContainer.classList.add('focused');
  }

  // Fungsi untuk menyembunyikan overlay dan menghilangkan highlight
  function hideOverlay() {
    overlay.classList.remove('active');
    formContainer.classList.remove('focused');
  }

  // Event listener untuk menampilkan overlay
  formItems.forEach((item) => {
    item.addEventListener('mousedown', showOverlay);
    item.addEventListener('focusout', hideOverlay);
  });

  // Klik di luar form akan menutup overlay
  overlay.addEventListener('click', hideOverlay);
});
