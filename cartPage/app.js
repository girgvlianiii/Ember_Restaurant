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

const searchButton = document.querySelector(".header__icon");

searchButton.addEventListener("click", () => {
  window.location.href = "../menuPage/index.html";
});

const cartCount = document.querySelector(".header__cart-count");

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
      let totalQuantity = 0;
      cart.innerHTML = "";

      let productTotal = 0;
      let deliveryPrice = 5;

      data.forEach((item) => {
        totalQuantity += item.quantity;
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

                <button
                  class="quantity-minus"
                  data-id="${item.product.id}"
                  data-quantity="${item.quantity}"
                  data-price="${item.product.price}"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>

                <span>${item.quantity}</span>

                <button
                  class="quantity-plus"
                  data-id="${item.product.id}"
                  data-quantity="${item.quantity}"
                  data-price="${item.product.price}"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>

              </div>

              <button
                class="cart-item__remove"
                data-id="${item.product.id}"
              >
                <i class="fa-solid fa-trash"></i>
                REMOVE
              </button>
            </div>
          </div>
        `;

        const plusButton = productCard.querySelector(".quantity-plus");
        const minusButton = productCard.querySelector(".quantity-minus");
        const removeButton = productCard.querySelector(".cart-item__remove");

        plusButton.addEventListener("click", () => {
          const id = Number(plusButton.dataset.id);
          const quantity = Number(plusButton.dataset.quantity);
          const price = Number(plusButton.dataset.price);

          updateBasket(id, quantity + 1, price);
        });

        minusButton.addEventListener("click", () => {
          const id = Number(minusButton.dataset.id);
          const quantity = Number(minusButton.dataset.quantity);
          const price = Number(minusButton.dataset.price);

          if (quantity <= 1) {
            return;
          }

          updateBasket(id, quantity - 1, price);
        });

        removeButton.addEventListener("click", () => {
          const id = Number(removeButton.dataset.id);

          deleteProduct(id);
        });

        productTotal += item.quantity * item.product.price;

        cart.appendChild(productCard);
      });

      cartCount.textContent = totalQuantity;
      subTotal.textContent = `${productTotal.toFixed(2)}$`;
      total.textContent = `${(productTotal + deliveryPrice).toFixed(2)}$`;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

renderBasket();

function updateBasket(id, quantity, price) {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
      quantity: quantity,
      price: price,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not update basket");
      }
      renderBasket();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteProduct(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not delete product");
      }

      renderBasket();
    })
    .catch((error) => {
      console.error(error);
    });
}
