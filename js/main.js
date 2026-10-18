(function () {
  'use strict';
  var cfg = window.PORTFOLIO_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Links from config ---------- */
  function validUrl(u) { return /^https?:\/\/[^\s]+$/i.test(u || ''); }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || ''); }

  $$('[data-linkedin]').forEach(function (a) { if (validUrl(cfg.linkedin)) a.href = cfg.linkedin; });
  $$('[data-credly]').forEach(function (a) { if (validUrl(cfg.credly)) a.href = cfg.credly; });

  if (validUrl(cfg.github)) {
    $$('[data-github]').forEach(function (el) {
      if (el.tagName === 'A') el.href = cfg.github;
      el.hidden = false;
    });
    var gl = $('[data-github-link]'); if (gl) gl.href = cfg.github;
    var gt = $('#ghText'); if (gt) gt.textContent = cfg.github.replace(/^https?:\/\/(www\.)?/, '');
  }
  if (validEmail(cfg.email)) {
    $$('[data-email]').forEach(function (el) { el.href = 'mailto:' + cfg.email; el.hidden = false; });
    var et = $('#emailText'); if (et) et.textContent = cfg.email;
  }

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (!saved && window.matchMedia('(prefers-color-scheme: light)').matches) saved = 'light';
  if (saved) root.setAttribute('data-theme', saved);
  $('#themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    var m = $('meta[name="theme-color"]'); if (m) m.content = next === 'dark' ? '#0b1220' : '#f6f8fc';
    bgColors();
  });

  /* ---------- Mobile menu ---------- */
  var burger = $('#burger'), links = $('#links');
  function closeMenu() { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); });

  /* ---------- Scroll: progress, nav state, to-top ---------- */
  var nav = $('#nav'), prog = $('#progress'), toTop = $('#toTop');
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ---------- Active nav link ---------- */
  var navLinks = $$('a', links);
  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$('.reveal');
  revealEls.forEach(function (el, i) {
    var sibs = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.08 + 's');
  });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Typed roles (all taken from the resume) ---------- */
  var roles = ['DevOps & Cloud Engineer', 'AWS Infrastructure Builder', 'CI/CD Pipeline Automator', 'Linux & Python Enthusiast'];
  var typed = $('#typed'), ri = 0, ci = 0, del = false;
  function type() {
    var word = roles[ri];
    typed.textContent = word.slice(0, ci);
    if (!del && ci === word.length) { del = true; return setTimeout(type, 1600); }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    ci += del ? -1 : 1;
    setTimeout(type, del ? 35 : 75);
  }
  if (reduce) { typed.textContent = roles[0]; } else { type(); }

  /* ---------- Counters ---------- */
  function runCount(el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || '0', 10);
    var suf = el.dataset.suffix || '', t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = parseFloat(c.dataset.count).toFixed(parseInt(c.dataset.decimals || '0', 10)) + (c.dataset.suffix || ''); });
  }

  /* ---------- Skills (only items listed in the resume) ---------- */
  var SKILLS = {
    aws: ['EC2', 'S3', 'VPC', 'IAM', 'RDS', 'RDS Aurora', 'Lambda', 'ALB/ELB', 'Auto Scaling', 'Route 53', 'CloudWatch', 'CloudTrail', 'NAT Gateway', 'Multi-AZ', 'EKS', 'Cost Optimization'],
    cicd: ['Jenkins', 'GitLab CI/CD', 'AWS CodePipeline', 'Deployment Automation', 'Release Management', 'GitHub Actions'],
    script: ['Python', 'Shell/Bash', 'Linux Administration', 'Configuration Management', 'Performance Tuning'],
    net: ['VPC Design', 'Subnetting', 'Route Tables', 'VPC Peering', 'Load Balancers', 'IAM', 'Security Groups', 'Least-Privilege Access'],
    mon: ['AWS CloudWatch', 'Log Analysis', 'Incident Management', 'RCA'],
    db: ['MS SQL Server', 'PostgreSQL', 'MySQL', 'T-SQL', 'PL/SQL', 'Stored Procedures', 'Query Optimization'],
    tools: ['AWS Console', 'JIRA', 'Credly', 'Postman', 'UNIT / UAT & Regression Testing', 'Technical Documentation', 'VSCode']
  };
  var LABEL = { aws: 'AWS', cicd: 'CI/CD', script: 'Scripting & OS', net: 'Network & Security', mon: 'Monitoring', db: 'Database', tools: 'Tools' };
  var cloud = $('#skillCloud');
  function renderSkills(filter) {
    cloud.innerHTML = '';
    var i = 0;
    Object.keys(SKILLS).forEach(function (k) {
      if (filter !== 'all' && filter !== k) return;
      SKILLS[k].forEach(function (name) {
        var s = document.createElement('span');
        s.className = 'skill';
        s.style.animationDelay = (i++ * 0.02) + 's';
        s.appendChild(document.createTextNode(name));
        if (filter === 'all') { var sm = document.createElement('small'); sm.textContent = LABEL[k]; s.appendChild(sm); }
        cloud.appendChild(s);
      });
    });
  }
  renderSkills('all');
  var tabs = $$('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
      t.classList.add('active'); t.setAttribute('aria-selected', 'true');
      renderSkills(t.dataset.filter);
    });
  });

  /* ---------- Card tilt + spotlight ---------- */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  $$('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
      if (fine && !reduce) {
        var rx = ((y / r.height) - 0.5) * -5, ry = ((x / r.width) - 0.5) * 5;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      }
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  /* ---------- Animated background (network nodes) ---------- */
  var cv = $('#bg'), ctx = cv.getContext('2d'), pts = [], W, H, dpr, col = '255,153,0', col2 = '56,189,248';
  function bgColors() {
    var light = root.getAttribute('data-theme') === 'light';
    col = light ? '224,123,0' : '255,153,0'; col2 = light ? '2,132,199' : '56,189,248';
  }
  bgColors();
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = window.innerWidth * dpr; H = cv.height = window.innerHeight * dpr;
    var n = Math.min(70, Math.floor(window.innerWidth / 22));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35 * dpr, vy: (Math.random() - .5) * .35 * dpr });
  }
  var running = true;
  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var maxD = 150 * dpr;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * dpr, 0, 6.283);
      ctx.fillStyle = 'rgba(' + col + ',.8)'; ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.strokeStyle = 'rgba(' + col2 + ',' + (0.22 * (1 - d / maxD)) + ')';
          ctx.lineWidth = dpr * .8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  if (!reduce && ctx) {
    size(); draw();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden; if (running) draw();
    });
  } else { cv.style.display = 'none'; }
})();
