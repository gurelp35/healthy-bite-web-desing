/* Healthy Bite shared interactions: accessible mobile menu and contact email draft. */
(function () {
  "use strict";

  function setMenuOpen(open) {
    const list = document.querySelector(".nav ul");
    const button = document.querySelector(".menu-toggle");
    if (!list || !button) return;
    list.classList.toggle("show", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  // The existing HTML uses onclick="toggleMenu()".
  window.toggleMenu = function toggleMenu() {
    const list = document.querySelector(".nav ul");
    if (list) setMenuOpen(!list.classList.contains("show"));
  };

  document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector(".nav ul");
    if (list) {
      list.addEventListener("click", function (event) {
        if (event.target.closest("a")) setMenuOpen(false);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenuOpen(false);
    });

    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // No backend exists: prepare a draft in the visitor's email application.
      if (!form.reportValidity()) return;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const status = document.getElementById("contactFeedback");

      if (!name || !email || !message) {
        if (status) status.textContent = "Please complete all fields before continuing.";
        return;
      }

      const subject = encodeURIComponent("Healthy Bite enquiry from " + name);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );

      if (status) {
        status.textContent =
          "Your email application should open with a draft. Please press Send there; your message has not been sent automatically.";
      }
      window.location.href = "mailto:pakizegurel@hotmail.com?subject=" + subject + "&body=" + body;
    });
  });
})();
