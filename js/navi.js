// Navicon toggle
const navicon = document.getElementById('navicon');
const nav = document.querySelector('nav');

if (navicon) {
  navicon.addEventListener('click', () => {
    nav.classList.toggle('active');
    navicon.classList.toggle('active');
  });

  // Close menu when a nav item is clicked
  document.querySelectorAll('.nav-item a, .contact-btn').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      navicon.classList.remove('active');
    });
  });
}