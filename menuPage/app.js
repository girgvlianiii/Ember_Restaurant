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

const filtersContainer = document.querySelector(".menu__filters");

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Error!");
    }
    return res.json();
  })
  .then((data) => {
    renderCategories(data);
  })
  .catch((err) => {
    console.log(err);
  });

function renderCategories(categories) {
  const allButton = document.createElement("button");

  allButton.classList.add("menu-filter", "active");
  allButton.textContent = "ALL";
  allButton.dataset.categoryId = "all";

  filtersContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement("button");

    button.classList.add("menu-filter");
    button.textContent = category.name;
    button.dataset.categoryId = category.id;

    filtersContainer.appendChild(button);
  });
}

const menuGrid = document.querySelector(".menu__grid");

function renderProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
  <div class="product-card__image">
    <img src="${product.image}" alt="${product.name}" />
  </div>

  <div class="product-card__content">
    <h3>${product.name}</h3>

    <div class="product-card__bottom">
      <span class="product-card__price">${product.price.toFixed(2)}$</span>

      <button class="product-card__add" data-id="${product.id}" data-price="${product.price}">
        ADD
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
`;
    menuGrid.appendChild(productCard);
  });
}

function getProductsByCategory(categoryId) {
  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=${categoryId}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }

      return res.json();
    })
    .then((data) => {
      menuGrid.innerHTML = "";
      renderProducts(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

filtersContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".menu-filter");

  if (!button) return;

  document.querySelectorAll(".menu-filter").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  const categoryId = button.dataset.categoryId;

  if (categoryId === "all") {
    renderEveryProduct();
    return;
  }

  getProductsByCategory(categoryId);
});

function renderEveryProduct() {
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }
      return res.json();
    })
    .then((data) => {
      menuGrid.innerHTML = "";
      renderProducts(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

renderEveryProduct();

menuGrid.addEventListener("click", (e) => {
  const addButton = e.target.closest(".product-card__add");

  if (!addButton) return;

  const productId = Number(addButton.dataset.id);
  const productPrice = Number(addButton.dataset.price);

  addToCart(productId, productPrice);
});

function addToCart(productId, productPrice) {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }
      return res.json();
    })
    .then((basket) => {
      const existingProduct = basket.find(
        (item) => item.product.id === productId,
      );

      if (existingProduct) {
        fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
          method: "PUT",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: existingProduct.quantity + 1,
            price: existingProduct.product.price,
            productId: productId,
          }),
        });
      } else {
        fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
          method: "POST",
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
            price: productPrice,
            productId: productId,
          }),
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}


function updateCartCount() {
  const cartCount = document.querySelector(".header__cart-count");

  if (!cartCount) {
    return;
  }

  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((res) => res.json())
    .then((data) => {
      let totalQuantity = 0;

      data.forEach((item) => {
        totalQuantity += item.quantity;
      });

      cartCount.textContent = totalQuantity;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

updateCartCount();


const loginButtons = document.querySelectorAll(".header__login");
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  loginButtons.forEach((button) => {
    button.textContent = "LOGOUT";
  });
}
