// Toggle mobile navigation menu
function toggleNav() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks.style.display === "block") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "block";
    }
  }
  
  // Dynamically set the current year in the footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  