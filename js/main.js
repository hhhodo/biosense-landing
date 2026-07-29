(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  }

  /* ---------------- Module F — sticky parallax ---------------- */
  var track = document.querySelector(".pxl__track");
  if (track && !reduceMotion) {
    var img = track.querySelector("[data-pxl-img]");
    var dim = track.querySelector("[data-pxl-dim]");
    var copy = track.querySelector("[data-pxl-copy]");
    var root = document.documentElement;

    var scaleEnd = parseFloat(getComputedStyle(root).getPropertyValue("--pxl-scale-end")) || 0.85;
    var dimMax = parseFloat(getComputedStyle(root).getPropertyValue("--pxl-dim")) || 0.7;
    var travel = parseFloat(getComputedStyle(root).getPropertyValue("--pxl-travel")) || 250;

    var ticking = false;

    function copyOpacity(p){
      if (p <= 0.25 || p >= 0.75) return 0;
      if (p < 0.5) return (p - 0.25) / 0.25;
      return 1 - (p - 0.5) / 0.25;
    }

    function update(){
      ticking = false;
      var rect = track.getBoundingClientRect();
      var vh = window.innerHeight;
      var scrollable = rect.height - vh;
      var progress = scrollable > 0 ? (-rect.top) / scrollable : 0;
      progress = Math.min(1, Math.max(0, progress));

      var scale = 1 - (1 - scaleEnd) * progress;
      var dimOpacity = dimMax * progress;
      var copyY = travel - travel * 2 * progress;
      var opacity = copyOpacity(progress);

      root.style.setProperty("--s", scale.toFixed(4));
      root.style.setProperty("--o", dimOpacity.toFixed(4));
      root.style.setProperty("--y", copyY.toFixed(2) + "px");
      root.style.setProperty("--co", opacity.toFixed(4));

      img.style.transform = "scale(var(--s))";
      dim.style.opacity = "var(--o)";
      copy.style.transform = "translateY(var(--y))";
      copy.style.opacity = "var(--co)";
    }

    function onScroll(){
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

})();
