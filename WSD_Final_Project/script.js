(() => {
  const body = document.body;

  // ---------- THEME TOGGLE ----------
  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(mode) {
    // mode: "light" or "dark"
    if (mode === "light") {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.checked = true;
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      if (themeToggle) themeToggle.checked = false;
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("almarTheme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const mode = themeToggle.checked ? "light" : "dark";
      localStorage.setItem("almarTheme", mode);
      applyTheme(mode);
    });
  }

  // ---------- CLOSE NAVBAR ON CLICK (MOBILE) ----------
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const navCollapse = document.getElementById("navbarNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!navCollapse) return;
      const isShown = navCollapse.classList.contains("show");
      if (isShown && window.bootstrap) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });

  // ---------- BACK TO TOP ----------
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- CONTACT FORM (FAKE SUBMIT) ----------
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMessage");

  function showMessage(type, text) {
    if (!formMsg) return;
    formMsg.style.display = "block";
    formMsg.className = `alert mt-3 ${type === "success" ? "alert-success" : "alert-danger"}`;
    formMsg.textContent = text;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const subject = document.getElementById("contactSubject")?.value.trim();
      const message = document.getElementById("contactMessage")?.value.trim();

      // Simple validation
      if (!name || !email || !subject || !message) {
        showMessage("error", "Please fill in all fields.");
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        showMessage("error", "Please enter a valid email address.");
        return;
      }

      // Demo success (no backend)
      showMessage("success", "Thanks! Your message has been sent (demo).");
      form.reset();
    });
  }
})();
