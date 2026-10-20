(function () {
  // Nav border once the page scrolls
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section in view
  var links = {};
  document.querySelectorAll(".nav-links a[href^='#']").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.values(links).forEach(function (a) { a.classList.remove("active"); });
        if (links[e.target.id]) links[e.target.id].classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // Sections that clear the highlight (hero, education) are observed too
    ["top", "background"].concat(Object.keys(links)).forEach(function (id) {
      var s = document.getElementById(id); if (s) io.observe(s);
    });
  }

  // Figure lightbox
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var img = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    document.querySelectorAll(".zoom").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var thumb = btn.querySelector("img");
        img.src = btn.getAttribute("data-full");
        img.alt = thumb.alt;
        cap.textContent = thumb.alt;
        box.showModal();
      });
    });
    box.querySelector(".close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
