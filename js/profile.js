(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("accessToken");
    const profileButtons = document.querySelectorAll(".header__login");

    // CREATE MODALS

    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="profile-modal hidden">
          <div class="profile-modal__overlay"></div>

          <div class="profile-modal__content">
            <button class="profile-modal__close" type="button">
              <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="profile-modal__avatar">
              <i class="fa-solid fa-user"></i>

              <img
                class="profile-modal__avatar-img hidden"
                alt="Profile avatar"
              />
            </div>

            <h2 class="profile-modal__name">USER</h2>
            <p class="profile-modal__email"></p>

            <div class="profile-modal__actions">
              <button class="profile-edit" type="button">
                EDIT PROFILE
              </button>

              <button class="profile-password" type="button">
                CHANGE PASSWORD
              </button>

              <button class="profile-logout" type="button">
                LOGOUT
              </button>
            </div>
          </div>
        </div>

        <div class="logout-modal hidden">
          <div class="logout-modal__overlay"></div>

          <div class="logout-modal__content">
            <div class="logout-modal__icon">
              <i class="fa-solid fa-right-from-bracket"></i>
            </div>

            <h2>LOG OUT?</h2>

            <p>
              Are you sure you want to leave your Ember account?
            </p>

            <div class="logout-modal__actions">
              <button class="logout-cancel" type="button">
                CANCEL
              </button>

              <button class="logout-confirm" type="button">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      `,
    );

    // SELECT MODAL ELEMENTS

    const profileModal = document.querySelector(".profile-modal");
    const profileClose = document.querySelector(".profile-modal__close");
    const profileOverlay = document.querySelector(".profile-modal__overlay");

    const profileName = document.querySelector(".profile-modal__name");
    const profileEmail = document.querySelector(".profile-modal__email");

    const profileAvatar = document.querySelector(".profile-modal__avatar-img");

    const profileAvatarIcon = document.querySelector(
      ".profile-modal__avatar i",
    );

    const profileLogout = document.querySelector(".profile-logout");

    const logoutModal = document.querySelector(".logout-modal");
    const logoutOverlay = document.querySelector(".logout-modal__overlay");

    const logoutCancel = document.querySelector(".logout-cancel");
    const logoutConfirm = document.querySelector(".logout-confirm");

    // LOGGED-IN USER

    if (accessToken) {
      profileButtons.forEach((button) => {
        button.textContent = "PROFILE";
      });

      fetch("https://api.everrest.educata.dev/auth", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to get user");
          }

          return res.json();
        })
        .then((user) => {
          profileName.textContent = `${user.firstName} ${user.lastName}`;

          profileEmail.textContent = user.email;

          if (user.avatar) {
            profileAvatar.src = user.avatar;

            profileAvatar.classList.remove("hidden");
            profileAvatarIcon.classList.add("hidden");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // OPEN PROFILE

    profileButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          return;
        }

        e.preventDefault();

        profileModal.classList.remove("hidden");
      });
    });

    // CLOSE PROFILE

    profileClose.addEventListener("click", () => {
      profileModal.classList.add("hidden");
    });

    profileOverlay.addEventListener("click", () => {
      profileModal.classList.add("hidden");
    });

    // OPEN LOGOUT MODAL

    profileLogout.addEventListener("click", () => {
      profileModal.classList.add("hidden");
      logoutModal.classList.remove("hidden");
    });

    // CANCEL LOGOUT

    logoutCancel.addEventListener("click", () => {
      logoutModal.classList.add("hidden");
    });

    logoutOverlay.addEventListener("click", () => {
      logoutModal.classList.add("hidden");
    });

    // CONFIRM LOGOUT

    logoutConfirm.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.reload();
    });
  });
})();
