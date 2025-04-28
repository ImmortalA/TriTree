// Load navbar dynamically
document.addEventListener('DOMContentLoaded', () => {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;

      // After navbar is loaded, re-bind navigation toggle
      const navToggle = document.getElementById('navToggle');
      const navLinks = document.getElementById('navLinks');

      if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
          });
        });
      }
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});