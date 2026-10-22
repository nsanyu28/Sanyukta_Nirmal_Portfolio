(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme */
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("#themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    meta();
  });
  function meta() {
    var m = $('meta[name="theme-color"]');
    if (m) m.content = root.getAttribute("data-theme") === "dark" ? "#0a0e17" : "#f6f7fb";
  }
  meta();

  /* GitHub links: shown only when a URL is configured */
  if (cfg.githubUrl && /^https?:\/\//.test(cfg.githubUrl)) {
    $$("[data-github]").forEach(function (a) { a.href = cfg.githubUrl; a.hidden = false; });
    $$("[data-github-note]").forEach(function (n) { n.hidden = false; });
    $$("[data-github-text]").forEach(function (n) { n.textContent = cfg.githubUrl.replace(/^https?:\/\//, ""); });
  }

  $("#year").textContent = new Date().getFullYear();

  /* Mobile menu */
  var burger = $("#burger"), links = $("#links");
  function closeMenu() { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* Scroll: progress, nav state, back-to-top */
  var nav = $("#nav"), prog = $("#progress"), toTop = $("#toTop");
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", y > 10);
    toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  /* Active nav link */
  var secs = $$("main section[id]");
  var navLinks = $$("a", links);
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { so.observe(s); });

    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          setTimeout(function () { en.target.classList.add("in"); }, (i % 4) * 70);
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { ro.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* Typing effect */
  var phrases = ["Linux & Python Enthusiast", "DevOps & Cloud Engineer", "AWS Infrastructure Builder", "CI/CD Automation Enthusiast"];
  var typed = $("#typed");
  if (reduceMotion) { typed.textContent = phrases[0]; }
  else {
    var pi = 0, ci = 0, del = false;
    (function tick() {
      var p = phrases[pi];
      typed.textContent = p.slice(0, ci);
      var d = del ? 35 : 75;
      if (!del && ci === p.length) { del = true; d = 1600; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; d = 350; }
      else ci += del ? -1 : 1;
      setTimeout(tick, d);
    })();
  }

  /* Terminal */
  var term = $("#term");
  var lines = [
    ['$ ', 'whoami', 'p'], ['', 'Sanyukta Nirmal', ''],
    ['$ ', 'cat role.txt', 'p'], ['', 'DevOps & Cloud Engineer', ''],
    ['$ ', 'cat stack.txt', 'p'], ['', 'AWS | CI/CD | GIT | LINUX', ''], ['', 'Python | Shell/Bash', ''],
    ['$ ', 'cat uptime.txt', 'p'], ['', '99.9% via Multi-AZ', '']
  ];
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function renderLine(l) { return (l[0] ? '<span class="p">' + l[0] + '</span><span class="o">' + esc(l[1]) + '</span>' : esc(l[1])); }
  if (reduceMotion) { term.innerHTML = lines.map(renderLine).join("\n"); }
  else {
    var li = 0, out = [];
    (function next() {
      if (li >= lines.length) return;
      var l = lines[li], i = 0;
      (function type() {
        var partial = l[0] ? ['$ ', l[1].slice(0, i), 'p'] : ['', l[1].slice(0, i), ''];
        term.innerHTML = out.concat([renderLine(partial)]).join("\n") + '<span class="cursor">▍</span>';
        if (i < l[1].length) { i++; setTimeout(type, l[0] ? 45 : 12); }
        else { out.push(renderLine(l)); li++; setTimeout(next, l[0] ? 250 : 120); }
      })();
    })();
  }

  /* Count-up stats */
  $$("[data-count]").forEach(function (el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10), suf = el.dataset.suffix || "";
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    el.textContent = (0).toFixed(dec) + suf;
    var io = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      io.disconnect();
      var t0 = performance.now(), dur = 1400;
      (function step(t) {
        var k = Math.min((t - t0) / dur, 1), v = target * (1 - Math.pow(1 - k, 3));
        el.textContent = v.toFixed(dec) + suf;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* Skill filter */
  $$("#skillFilter button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#skillFilter button").forEach(function (x) { x.classList.toggle("on", x === b); });
      var f = b.dataset.f;
      $$("#skillGrid .skill").forEach(function (c) {
        var show = f === "all" || c.dataset.cat.split(" ").indexOf(f) > -1;
        c.classList.toggle("hide", !show);
        if (show) c.classList.add("in");
      });
    });
  });

  /* Project card glow follows pointer */
  $$(".proj").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* Contact form -> mailto */
  var form = $("#contactForm"), note = $("#formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ["name", "email", "message"].forEach(function (n) {
      var el = f[n], v = el.value.trim();
      var bad = !v || (n === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
      el.classList.toggle("err", bad);
      if (bad) ok = false;
    });
    if (!ok) { note.className = "form-note bad"; note.textContent = "Please fill in all fields with a valid email."; return; }
    var to = cfg.email || "nsanyu28@gmail.com";
    var subject = "Portfolio enquiry from " + f.name.value.trim();
    var body = f.message.value.trim() + "\n\n— " + f.name.value.trim() + " (" + f.email.value.trim() + ")";
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    note.className = "form-note ok";
    note.textContent = "Opening your email app… if nothing happens, email " + to + " directly.";
  });

  /* Background particles */
  var cv = $("#bg"), ctx = cv.getContext("2d"), pts = [], W, H;
  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    pts = []; var n = Math.min(70, Math.floor(innerWidth / 18));
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.3 + .4) * dpr, vx: (Math.random() - .5) * .18 * dpr, vy: (Math.random() - .5) * .18 * dpr });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var light = root.getAttribute("data-theme") === "light";
    ctx.fillStyle = light ? "rgba(124,58,237,.35)" : "rgba(160,175,210,.55)";
    pts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  size(); draw();
  window.addEventListener("resize", size);
})();
