const categoriesGrid = document.querySelector(".categories__grid");

const categoryIcons = {
  Salads: "fa-solid fa-leaf",
  Soups: "fa-solid fa-bowl-food",
  "Chicken-Dishes": "fa-solid fa-drumstick-bite",
  "Beef-Dishes": "fa-solid fa-burger",
  "Seafood-Dishes": "fa-solid fa-fish",
  "Vegetable-Dishes": "fa-solid fa-carrot",
  "Bits&Bites": "fa-solid fa-cookie-bite",
  "On-The-Side": "fa-solid fa-bowl-rice",
};

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get categories");
    }

    return res.json();
  })
  .then((data) => {
    renderCategories(data);
  })
  .catch((error) => {
    console.log(error);
  });

function renderCategories(categories) {
  categories.forEach((category) => {
    const card = document.createElement("article");

    card.classList.add("category-card");

    card.innerHTML = `
      <div class="category-card__icon">
        <i class="${categoryIcons[category.name]}"></i>
      </div>

      <h3>${category.name}</h3>

      <span class="category-card__explore">
        EXPLORE
        <i class="fa-solid fa-arrow-right"></i>
      </span>
    `;

    categoriesGrid.appendChild(card);
  });
}

// POPULAR PRODUCTS

const popularProducts = document.querySelector(".popular__grid");

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get products");
    }

    return res.json();
  })
  .then((data) => {
    renderProducts(data);
  })
  .catch((error) => {
    console.log(error);
  });

function renderProducts(products) {
  const firstFourProducts = products.slice(0, 4);

  firstFourProducts.forEach((product) => {
    const card = document.createElement("article");

    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-card__content">
        <h3>${product.name}</h3>

        <div class="product-card__bottom">
          <span class="product-card__price">
            ${product.price.toFixed(2)}$
          </span>

          <button class="product-card__add">
            ADD
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;

    popularProducts.appendChild(card);
  });
}

// MOBILE MENU

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

// CART COUNT

function updateCartCount() {
  const cartCount = document.querySelector(".header__cart-count");

  if (!cartCount) {
    return;
  }

  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to get basket");
      }

      return res.json();
    })
    .then((data) => {
      let totalQuantity = 0;

      data.forEach((item) => {
        totalQuantity += item.quantity;
      });

      cartCount.textContent = totalQuantity;
    })
    .catch((error) => {
      console.log(error);
    });
}

updateCartCount();
