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

  /* ---------------- Module F — sticky parallax ----------------
     Design Kit(modules.js)의 exit/pass 계산을 그대로 사용:
     - exit: 트랙 하단이 뷰포트를 빠져나가는 마지막 1vh 구간에서만
       이미지 scale/dim이 진행된다 (트랙 진입 직후엔 원본 유지).
     - pass: 트랙이 뷰포트를 통과하는 전체 구간(0~1)에 걸쳐 카피가
       +250px → -250px로 흐르며, 구간 중앙(0.25~0.75)에서만 보인다.
  */
  var pxlTracks = Array.prototype.slice.call(document.querySelectorAll(".pxl__track"))
    .map(function(el){
      return {
        track: el,
        img: el.querySelector(".pxl__sticky"),
        dim: el.querySelector(".pxl__dim"),
        copy: el.querySelector(".pxl__copy")
      };
    })
    .filter(function(t){ return t.img && t.dim && t.copy; });

  if (pxlTracks.length && !reduceMotion) {
    var clamp = function(v, a, b){
      a = a === undefined ? 0 : a;
      b = b === undefined ? 1 : b;
      return Math.min(b, Math.max(a, v));
    };
    var lerp = function(a, b, t){ return a + (b - a) * t; };
    var pxlTicking = false;

    function pxlFrame(){
      var vh = window.innerHeight;
      pxlTracks.forEach(function(t){
        var r = t.track.getBoundingClientRect();

        var exit = clamp((vh - r.bottom) / vh);
        t.img.style.setProperty("--s", lerp(1, 0.85, exit).toFixed(4));
        t.dim.style.setProperty("--d", lerp(0.7, 0, exit).toFixed(3));

        var pass = clamp((vh - r.top) / (vh + r.height));
        t.copy.style.setProperty("--y", lerp(250, -250, pass).toFixed(1) + "px");
        t.copy.style.setProperty("--o",
          (pass < 0.5 ? clamp((pass - 0.25) / 0.25) : clamp((0.75 - pass) / 0.25)).toFixed(3));
      });
    }

    function pxlOnScroll(){
      if (pxlTicking) return;
      pxlTicking = true;
      window.requestAnimationFrame(function(){ pxlFrame(); pxlTicking = false; });
    }

    window.addEventListener("scroll", pxlOnScroll, { passive: true });
    window.addEventListener("resize", pxlFrame);
    pxlFrame();
  }

})();
