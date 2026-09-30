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

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Error!");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
