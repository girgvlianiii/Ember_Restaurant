const menuButton = document.querySelector(".header__menu");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = menuButton.querySelector("i");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

const cart = document.querySelector(".cart__items");
let subTotal = document.querySelector(".cart-summary__subtotal");
let total = document.querySelector(".cart-summary__total-price");

function renderBasket() {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }

      return res.json();
    })
    .then((data) => {
      let productTotal = 0;
      let deliveryPrice = 5;

      data.forEach((item) => {
        const productCard = document.createElement("article");
        productCard.classList.add("cart-item");

        productCard.innerHTML = `
          <div class="cart-item__image">
            <img src="${item.product.image}" alt="${item.product.name}" />
          </div>

          <div class="cart-item__content">
            <h3>${item.product.name}</h3>

            <span class="cart-item__price">
              ${item.product.price.toFixed(2)}$
            </span>

            <div class="cart-item__actions">
              <div class="cart-item__quantity">
                <button class="quantity-minus">
                  <i class="fa-solid fa-minus"></i>
                </button>

                <span>${item.quantity}</span>

                <button class="quantity-plus">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>

              <button class="cart-item__remove">
                <i class="fa-solid fa-trash"></i>
                REMOVE
              </button>
            </div>
          </div>
        `;

        productTotal += item.quantity * item.product.price;

        cart.appendChild(productCard);
      });

      subTotal.textContent = `${productTotal.toFixed(2)}$`;
      total.textContent = `${(productTotal + deliveryPrice).toFixed(2)}$`;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

renderBasket();


