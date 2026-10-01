const categoriesGrid = document.querySelector(".categories__grid");

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
  .catch((error) => {
    console.log(error);
  });

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

const popularProducts = document.querySelector(".popular__grid");

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Error!");
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
  for (i = 0; i < 4; i++) {
    console.log(products[i]);

    const card = document.createElement("article");
    card.classList.add("product-card");

    card.innerHTML = `
            <div class="product-card__image">
    <img src="${products[i].image}" alt="${products[i].name}">
</div>

<div class="product-card__content">
    <h3>${products[i].name}</h3>

    <div class="product-card__bottom">
        <span class="product-card__price">${products[i].price}</span>

        <button class="product-card__add">
            ADD
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
</div>
        `;

    popularProducts.appendChild(card);
  }
}
