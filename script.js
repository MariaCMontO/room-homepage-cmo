// Abrir menu
const buttons = Array.from(
  document.querySelectorAll('#menu-button, #close-button'),
);
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    menuDisplayed();
  });
});

function menuDisplayed() {
  const container = document.querySelector('.nav__menu-container');
  const overlay = document.getElementById('overlay');
  const items = Array.from(document.querySelectorAll('.nav__menu-item'));
  const isDisplayed = container.classList.contains(
    'nav__menu-container--displayed',
  );

  container.classList.toggle('nav__menu-container--displayed', !isDisplayed);
  overlay.classList.toggle('overlay', !isDisplayed);
  items.forEach((item) =>
    item.classList.toggle('nav__menu-item--displayed', !isDisplayed),
  );
}

//Cambiar fotos y textos
const buttonsSlider = Array.from(
  document.querySelectorAll('#previous-button, #next-button'),
);
buttonsSlider.forEach((button) => {
  button.addEventListener('click', () => {
    changeInfo(button.value);
  });
});

const sliderInfo = [
  {
    title: 'Discover innovative ways to decorate',
    description:
      'We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and whatyou love.',
    image: 'http://127.0.0.1:5500/images/mobile-image-hero-1.jpg',
    imagesDesktop: '/images/desktop-image-hero-1.jpg',
  },
  {
    title: 'We are available all across the globe',
    description:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    image: 'http://127.0.0.1:5500/images/mobile-image-hero-2.jpg',
    imagesDesktop: '/images/desktop-image-hero-2.jpg',
  },
  {
    title: 'Shop now Manufactured with the best materials',
    description:
      'Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.',
    image: 'http://127.0.0.1:5500/images/mobile-image-hero-3.jpg',
    imagesDesktop: '/images/desktop-image-hero-3.jpg',
  },
];

function changeInfo(value) {
  const image = document.querySelector('.slicer__image');
  const source = document.getElementById('source-img');
  const title = document.getElementById('slicer-title');
  const description = document.getElementById('slicer-description');
  const imageValue = image.src;
  const sourceValue = source.srcset;
  const operation = value === '+' ? 1 : -1;
  const isDesktop = window.innerWidth >= 768;

  //Hallamos los valores presentes
  const index = currentIndex(imageValue, sourceValue, isDesktop);

  //Hallamos el nuevo indice
  const newIndex = accurateIndex(index + operation);

  //Setteamos los nuevos valores a los elementos
  title.textContent = sliderInfo[newIndex].title;
  description.textContent = sliderInfo[newIndex].description;
  if (isDesktop) {
    source.srcset = sliderInfo[newIndex].imagesDesktop;
  } else {
    image.src = sliderInfo[newIndex].image;
  }
}

function currentIndex(imageValue, sourceValue, isDesktop) {
  return sliderInfo.findIndex((indice) =>
    isDesktop
      ? indice.imagesDesktop === sourceValue
      : indice.image === imageValue,
  );
}

function accurateIndex(index) {
  let newIndex;
  if (index < 0) {
    newIndex = sliderInfo.length - 1;
  } else if (index > sliderInfo.length - 1) {
    newIndex = 0;
  } else {
    newIndex = index;
  }
  return newIndex;
}
