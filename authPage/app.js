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

const passwordToggleBtns = document.querySelectorAll(".password-toggle");

passwordToggleBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const icon = button.querySelector("i");

    if (input.type === "password") {
      input.type = "text";

      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";

      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

const loginForm = document.querySelector(".auth__form--login");
const registerForm = document.querySelector(".auth__form--register");

const showRegisterBtn = document.querySelector(".show-register");
const showLoginBtn = document.querySelector(".show-login");

showRegisterBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

showLoginBtn.addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    firstName: document.querySelector("#first-name").value.trim(),
    lastName: document.querySelector("#last-name").value.trim(),
    age: Number(document.querySelector("#age").value),
    email: document.querySelector("#register-email").value.trim(),
    password: document.querySelector("#register-password").value,
    address: document.querySelector("#address").value.trim(),
    phone: document.querySelector("#phone").value.trim(),
    zipcode: document.querySelector("#zipcode").value.trim(),
    avatar: document.querySelector("#avatar").value.trim(),
    gender: document.querySelector("#gender").value,
  };

  fetch("https://api.everrest.educata.dev/auth/sign_up", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Registration Failed!");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      document.querySelector(".register-form").reset();

      document.querySelector(".auth__form--register").classList.add("hidden");

      document.querySelector(".auth__form--login").classList.remove("hidden");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    email: document.querySelector("#login-email").value.trim(),
    password: document.querySelector("#login-password").value,
  };

  console.log(user);

  fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.message);
        });
      }

      return res.json();
    })
    .then((data) => {
      console.log(data);

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error(error);
    });
});


const loginButtons = document.querySelectorAll(".header__login");
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  loginButtons.forEach((button) => {
    button.textContent = "PROFILE";
  });
}
