document.addEventListener('DOMContentLoaded', () => {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  let navbarPath = 'partials/navbar.html'; // default in new structure

  if (navbarPlaceholder && navbarPlaceholder.dataset.navbar) {
    navbarPath = navbarPlaceholder.dataset.navbar; // override if specified
  }

  if (navbarPlaceholder) {
    fetch(navbarPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load navbar: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        navbarPlaceholder.innerHTML = data;

        // Re-bind nav toggle and accessibility states
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (navToggle && navLinks) {
          const setExpanded = (isExpanded) => {
            navToggle.setAttribute('aria-expanded', String(isExpanded));
            if (isExpanded) {
              navLinks.classList.add('active');
            } else {
              navLinks.classList.remove('active');
            }
          };

          navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            setExpanded(!isExpanded);
          });

          // Close on link click (mobile) and on Escape
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => setExpanded(false));
          });
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setExpanded(false);
          });
        }

        // Highlight active link based on current page
        try {
          const currentPathname = window.location.pathname;
          const currentFile = currentPathname.endsWith('/') ? 'index.html' : currentPathname.split('/').pop();
          document.querySelectorAll('.nav-links a').forEach(a => {
            const url = new URL(a.getAttribute('href'), window.location.href);
            const linkFile = url.pathname.endsWith('/') ? 'index.html' : url.pathname.split('/').pop();
            if (linkFile === currentFile) {
              a.classList.add('active');
            }
          });
        } catch (err) {
          // Non-fatal if URL parsing fails
          console.warn('Active link highlight failed:', err);
        }
      })
      .catch(err => {
        console.error(err);
        navbarPlaceholder.innerHTML = '<header><nav class="navbar"><div class="logo">TriTree Research Center</div></nav></header>';
      });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Copy BibTeX buttons
  const copyButtons = document.querySelectorAll('.copy-bibtex');
  if (copyButtons && copyButtons.length > 0) {
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const originalText = btn.textContent;
        const url = btn.getAttribute('data-bib-url');
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error('Failed to fetch BibTeX');
          const text = await res.text();
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied!';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        } catch (err) {
          console.error(err);
          btn.textContent = 'Copy failed';
          setTimeout(() => (btn.textContent = originalText), 1500);
        }
      });
    });
  }
});


