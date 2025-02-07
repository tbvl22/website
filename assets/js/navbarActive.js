window.addEventListener("DOMContentLoaded", () => {
    // Get the current page's file name from the URL.
    const currentPage = window.location.pathname.split("/").pop() || "home.html";
    // Select all nav links inside your navbar
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    // Loop through each nav link and add the 'active' class to the one matching currentPage.
    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
  