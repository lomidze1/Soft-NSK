// Hamburger Mobile Menu

document.addEventListener('DOMContentLoaded', function () {
  // const navLinks = document.querySelectorAll('.nav__link');
  const mobileMenu = document.querySelector('.nav__list');
  const hamburgers = document.querySelectorAll('.hamburger');

  // navLinks.forEach((link) => {
  //   link.addEventListener('click', function () {
  //     closeMobileMenu();
  //     navLinks.forEach((link) => {
  //       link.classList.remove('nav__link--is-active');
  //     });
  //     this.classList.add('nav__link--is-active');
  //   });
  // });

  if (hamburgers.length > 0) {
    hamburgers.forEach((hamburger) => {
      hamburger.addEventListener(
        'click',
        function () {
          this.classList.toggle('is-active');
          mobileMenu.classList.toggle('nav__list--is-active');
        },
        false
      );
    });
  }

  document.addEventListener('click', function (event) {
    const hamburgersArray = Array.from(hamburgers);

    const isClickInsideNav = mobileMenu.contains(event.target);
    const isClickInsideHamburger = hamburgersArray.some((hamburger) =>
      hamburger.contains(event.target)
    );

    if (!isClickInsideNav && !isClickInsideHamburger) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    hamburgers.forEach((hamburger) => {
      hamburger.classList.remove('is-active');
    });
    mobileMenu.classList.remove('nav__list--is-active');
  }
});

// Slider
function handleSplide() {
  var windowWidth = window.innerWidth;
  var splideElement = document.querySelector('.splide');

  if (windowWidth <= 580) {
    if (!splideElement.classList.contains('splide-initialized')) {
      var splide = new Splide('.splide');
      splide.mount();
      splideElement.classList.add('splide-initialized');
    }
  } else {
    if (splideElement.classList.contains('splide-initialized')) {
      var splideInstance = Splide.splides[0];
      if (splideInstance) {
        splideInstance.destroy();
      }
      splideElement.classList.remove('splide-initialized');
    }
  }
}

document.addEventListener('DOMContentLoaded', handleSplide);
window.addEventListener('resize', handleSplide);

// Drop Down
function toggleDropdown() {
  var dropdownContent = document.querySelector(
    '.ordering-form__dropdown-content'
  );
  dropdownContent.style.display =
    dropdownContent.style.display === 'flex' ? 'none' : 'flex';
}

function selectItem(item) {
  var dropdownButton = document.querySelector(
    '.ordering-form__dropdown-button'
  );
  dropdownButton.textContent = item.textContent;
  toggleDropdown();
  updateProgressBar();
}

document.addEventListener('click', function (event) {
  var dropdown = document.querySelector('.ordering-form__dropdown');
  if (!dropdown.contains(event.target)) {
    var dropdownContent = document.querySelector(
      '.ordering-form__dropdown-content'
    );
    dropdownContent.style.display = 'none';
  }
});

// Email Input
var emailInput = document.getElementById('emailInput'); // Access the email input by id
var emailError = document.querySelector('.email-error');

emailInput.addEventListener('input', function () {
  var isValidEmail = validateEmail(emailInput.value);
  if (isValidEmail) {
    emailError.style.display = 'none';
    updateProgressBar();
  } else {
    emailError.style.display = 'block';
  }
});

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Name Input
var nameInput = document.querySelector('.ordering-form__name-input');
nameInput.addEventListener('input', function () {
  updateProgressBar();
});

// Progress Bar

function updateProgressBar() {
  var progressBar = document.querySelector('.progress-line');
  var iconContainer = document.querySelector('.icon-container');
  var progressBarPercent = document.querySelector('.progress-percent');

  var dropdownSelected =
    document
      .querySelector('.ordering-form__dropdown-button')
      .textContent.trim() !== 'Выберите тип системы';
  var emailValid = validateEmail(emailInput.value);
  var nameEntered = nameInput.value.trim() !== '';

  var percentage = 0;

  if (dropdownSelected) {
    percentage += 25;
  }

  if (emailValid) {
    percentage += 25;
  }

  if (nameEntered) {
    percentage += 25;
  }

  progressBar.style.width = percentage + '%';
  iconContainer.style.left = percentage + '%';
  progressBarPercent.textContent = percentage + '%';

  if (percentage === 100) {
    progressBar.style.backgroundColor = '#4CAF50';
  } else {
    progressBar.style.backgroundColor = '#42A9ED';
  }

  document
    .querySelector('.ordering-form__progress-bar')
    .classList.remove('initial-state');
}

// Email Input
var emailInput = document.getElementById('emailInput');
var emailError = document.querySelector('.email-error');

emailInput.addEventListener('input', function () {
  var isValidEmail = validateEmail(emailInput.value);
  if (isValidEmail) {
    emailError.style.display = 'none';
  } else {
    emailError.style.display = 'block';
    updateProgressBar(false);
  }

  updateProgressBar();
});

// Upload File

document
  .querySelector('.ordering-form__upload-file')
  .addEventListener('change', function () {
    updateProgressBar(100);
  });
