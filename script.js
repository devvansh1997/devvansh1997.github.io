// Navbar background solidifies on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.style.background = 'rgba(13, 17, 23, 0.98)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.85)';
    }
});
