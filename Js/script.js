'use strict';
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');

const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const btnAddToCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.products-in-cart');

const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');

// const overlay = document.querySelector('.overlay');
// const lightbox = document.querySelector('.lightBox');

// let lightboxGallery;
// let lightboxHero;

// Numerical Variables
let productCounterValue = 1;
let productsInCart = 0;
let price = 250.0;
let discount = 0.5;

//***Functions***
//function to add and decrease the product
const setProductCounter = (value) => {
  if (productCounterValue + value > 0) {
    productCounterValue += value;
    productCounter.innerHTML = productCounterValue;
  }
  console.log(value);
};
//function to add
const productCounterPlus = () => {
  setProductCounter(1);
  console.log(productCounterValue);
};
//function to delete
const productCounterMinus = () => setProductCounter(-1);

const onThumbClick = (e) => {
  //clear active states for all thumbnails
  gallery.forEach((img) => {
    img.classList.remove('.active');
  });
  //set active thumbnail
  e.target.parentElement.classList.add('.active');
  //update hero image
  heroImg.src = e.target.src.replace('-thumbnail', '');
};
//function to get the current num of the img
const getCurrentImageIndex = () => {
  const imageIndex = parseInt(
    heroImg.src
      .split('\\')
      .pop()
      .split('/')
      .pop()
      .replace('.jpg', '')
      .replace('image-product-', '')
  );
  return imageIndex;
};
//function to display the image
const setHeroImage = (imageIndex) => {
  heroImg.src = `./images/image-product-${imageIndex}.jpg`;
  //images are not sync
  gallery.forEach((img) => {
    img.classList.remove('active');
  });
  //set active thumbnail
  gallery[imageIndex - 1].classList.add('active');
};

const handleBtnClickNext = () => {
  let imageIndex = getCurrentImageIndex();
  imageIndex++;
  if (imageIndex > 4) {
    imageIndex = 1;
  }
  setHeroImage(imageIndex);
};

const handleBtnClickPrevious = () => {
  let imageIndex = getCurrentImageIndex();
  imageIndex--;
  if (imageIndex < 1) {
    imageIndex = 4;
  }
  setHeroImage(imageIndex);
};
//function to add to cart
function addToCart() {
  productsInCart += productCounterValue;

  const productHTMLElement = `
    <div class="item">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="product-name">Autumn Limited Edition...</div>
            <div class="price-group">
                <div class="price">$${(price * discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="total-amount">$${(
                  price *
                  discount *
                  productsInCart
                ).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
    </div>
    `;

  productInShoppingCart.innerHTML = productHTMLElement;

  updateCart();

  const btnDelete = document.querySelector('#btnDelete');
  btnDelete.addEventListener('click', onBtnDeleteClick);
  //console.log(productsInCart);
}
const updateCartIcon = () => {
  cartCount.textContent = productsInCart;
  if (productsInCart === 0) {
    if (!cartCount.classList.contains('hidden')) {
      cartCount.classList.add('hidden');
    }
  } else {
    cartCount.classList.remove('hidden');
  }
};

function updateMsgEmpty() {
  if (productsInCart == 0) {
    if (msgEmpty.classList.contains('hidden')) {
      msgEmpty.classList.remove('hidden');
    }
  } else {
    if (!msgEmpty.classList.contains('hidden')) {
      msgEmpty.classList.add('hidden');
    }
  }
}

function updateCheckoutButton() {
  if (productsInCart == 0) {
    if (!checkout.classList.contains('hidden')) {
      checkout.classList.add('hidden');
    }
  } else {
    checkout.classList.remove('hidden');
  }
}

//function to update cart
function updateCart() {
  updateCartIcon();
  updateMsgEmpty();
  updateCheckoutButton();
}
function onBtnDeleteClick() {
  productsInCart--;
  updateCart();

  const el = document.querySelector('.count');
  const totalAmount = document.querySelector('.total-amount');
  el.innerHTML = productsInCart;
  totalAmount.innerHTML = `$${(price * discount * productsInCart).toFixed(2)}`;

  if (productsInCart == 0) {
    productInShoppingCart.innerHTML = '';
  }
}
//function to set the overlay
// function onHeroImgClick() {
//   if (window.innerWidth >= 1020) {
//     if (overlay.childElementCount == 1) {
//       const newNode = lightbox.cloneNode(true);
//       overlay.appendChild(newNode);

//       const btnOverlayClose = document.querySelector('#btnOverlayClose');
//       btnOverlayClose.addEventListener('click', onBtnOverlayClose);

//       lightboxGallery = overlay.querySelectorAll('.pic');
//       lightboxHero = overlay.querySelector('.product-hero');
//       lightboxGallery.forEach((img) => {
//         img.addEventListener('click', onThumbClickLightbox);
//       });

//       const btnOverlayNext = overlay.querySelector('.next');
//       const btnOverlayPrevious = overlay.querySelector('.previous');
//       btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
//       btnOverlayPrevious.addEventListener(
//         'click',
//         handleBtnClickPreviousOverlay
//       );
//     }
//     overlay.classList.remove('hidden');
//   }
// }

// function onBtnOverlayClose() {
//   overlay.classList.add('hidden');
// }

// function onThumbClickLightbox(event) {
//   //clear active state for all thumbnails
//   lightboxGallery.forEach((img) => {
//     img.classList.remove('active');
//   });
//   //set active thumbnail
//   event.target.parentElement.classList.add('active');
//   //update hero image
//   lightboxHero.src = event.target.src.replace('-thumbnail', '');
// }

// function handleBtnClickNextOverlay() {
//   let imageIndex = getOverlayCurrentImageIndex();
//   imageIndex++;
//   if (imageIndex > 4) {
//     imageIndex = 1;
//   }
//   setOverlayHeroImage(imageIndex);
// }

// function handleBtnClickPreviousOverlay() {
//   let imageIndex = getOverlayCurrentImageIndex();
//   imageIndex--;
//   if (imageIndex < 1) {
//     imageIndex = 4;
//   }
//   setOverlayHeroImage(imageIndex);
// }

// function getOverlayCurrentImageIndex() {
//   const imageIndex = parseInt(
//     lightboxHero.src
//       .split('\\')
//       .pop()
//       .split('/')
//       .pop()
//       .replace('.jpg', '')
//       .replace('image-product-', '')
//   );
//   return imageIndex;
// }

// function setOverlayHeroImage(imageIndex) {
//   lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
//   //images are not sync
//   lightboxGallery.forEach((img) => {
//     img.classList.remove('active');
//   });
//   //set active thumbnail
//   lightboxGallery[imageIndex - 1].classList.add('active');
// }

// Add eventlisteners

// functionality to open and close the hamburger menu
hamburger.addEventListener('click', () => menu.classList.remove('hidden'));
close.addEventListener('click', () => menu.classList.add('hidden'));

//functionality to open and close the cart logo
btnCart.addEventListener('click', () => cart.classList.toggle('hidden'));

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);

gallery.forEach((img) => {
  img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

btnAddToCard.addEventListener('click', addToCart);

// heroImg.addEventListener('click', onHeroImgClick);
