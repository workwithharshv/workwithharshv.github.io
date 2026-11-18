/* Renders the site from projects.js. You normally don't need to edit this file. */
(() => {
  const P = window.PROJECTS;

  const S = window.SITE;
  const app = document.getElementById("app");
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const imgSrc = (p, f) => (/[./]/.test(f) ? f : `assets/${p.slug}/${f}.webp`);
  // images: ["01", "Caption"] or ["01", "Caption", "phone"] for a phone screenshot. Phone screens are listed first.
  const images = (p) => {
    const all = (p.images || []).map((i) => (Array.isArray(i) ? { src: imgSrc(p, i[0]), caption: i[1] || "", phone: i[2] === "phone" } : { ...i, src: imgSrc(p, i.src) }));
    return [...all.filter((i) => i.phone), ...all.filter((i) => !i.phone)];
  };

  const wa = (msg = "Hi Harsh, I saw your portfolio and I'd like to discuss a project.") =>
    S.whatsapp ? `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}` : "";

  const ICON = {
    wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c3 1.2 3 .8 3.6.8a3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8m8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.4"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm-1 1 9 7 9-7"/></svg>`,
    upwork: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.6 13.3c-1 0-2-.4-2.8-1.1l.2-1v-.1c.2-1 .8-2.7 2.6-2.7a2.4 2.4 0 0 1 0 4.9m0-7.3a4.9 4.9 0 0 0-5 3.8c-.8-1.2-1.4-2.6-1.8-3.8H9.4v5.1a2.2 2.2 0 1 1-4.4 0V6H2.6v5.1a4.6 4.6 0 0 0 9.2 0v-.8c.4.9 1 1.8 1.6 2.6l-1.4 6.7h2.4l1-4.9a5.8 5.8 0 0 0 3.2 1 4.9 4.9 0 0 0 0-9.7"/></svg>`,
    gh: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5"/></svg>`,
    star: `<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>`,
    check: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8.5l2.5 2.5L12 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  // Reading progress bar
  const bar = document.createElement("div"); bar.className = "progress"; document.body.appendChild(bar);
  const onScroll = () => { const h = document.documentElement; bar.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; };
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = S.name));
  document.getElementById("year").textContent = new Date().getFullYear();

  // Floating WhatsApp button
  if (!S.whatsapp && S.upwork) {
    const f = document.createElement("a");
    f.className = "wa-float up-float"; f.href = S.upwork; f.target = "_blank"; f.rel = "noopener";
    f.setAttribute("aria-label", "Message me on Upwork");
    f.innerHTML = `${ICON.upwork}<span>Message me on Upwork</span>`;
    document.body.appendChild(f);
  }
  if (S.whatsapp) {
    const f = document.createElement("a");
    f.className = "wa-float"; f.href = wa(); f.target = "_blank"; f.rel = "noopener";
    f.setAttribute("aria-label", "Chat on WhatsApp");
    f.innerHTML = `${ICON.wa}<span>Chat on WhatsApp</span>`;
    document.body.appendChild(f);
  }
  // Footer contact links
  document.getElementById("footer-links").innerHTML = [
    S.email && `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,
    S.whatsapp && `<a href="${wa()}" target="_blank" rel="noopener">WhatsApp ${esc(S.whatsappDisplay || "")}</a>`,
    S.phone && `<a href="tel:${esc(S.phone)}">Call ${esc(S.whatsappDisplay || S.phone)}</a>`,
    S.github && `<a href="${esc(S.github)}" target="_blank" rel="noopener">GitHub</a>`,
    S.upwork && `<a href="${esc(S.upwork)}" target="_blank" rel="noopener">Upwork profile</a>`,
    S.linkedin && `<a href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
  ].filter(Boolean).join("");

  const allTags = ["All", ...new Set(P.flatMap((p) => p.tags))];
  const allStack = ["Flutter", "Dart", "Laravel", "PHP 8", "Livewire", "Vue 3", "React.js", "Inertia.js", "Filament", "Stripe", "OpenAI GPT-4o", "Google Maps", "Firebase", "MySQL", "Tailwind"];
  let filter = "All";

  const contactButtons = (msg) =>
    [
      S.whatsapp && `<a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener">${ICON.wa}WhatsApp</a>`,
      S.email && `<a class="btn btn-primary" href="mailto:${esc(S.email)}?subject=${encodeURIComponent("Project inquiry")}">${ICON.mail}Email me</a>`,
      S.github && `<a class="btn" href="${esc(S.github)}" target="_blank" rel="noopener">${ICON.gh}GitHub</a>`,
      S.upwork && `<a class="btn btn-up" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}Message me on Upwork</a>`,
      S.linkedin && `<a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    ].filter(Boolean).join("");

  const card = (p, i) => `
    <a class="card reveal" href="#/p/${p.slug}" data-tags="${esc(p.tags.join(","))}" style="--d:${(i % 2) * 80}ms">
      <div class="card-media">
        <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="${i < 2 ? "eager" : "lazy"}" />
        ${p.videos?.length ? `<span class="badge">▶ ${p.videos.length > 1 ? p.videos.length + " videos" : "Video demo"}</span>` : ""}
        ${p.links?.length ? `<span class="badge badge-live">● Live product</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-top"><span class="card-num">${String(i + 1).padStart(2, "0")}</span><span class="card-tags">${p.tags.join(" · ")}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
        <div class="chips">${p.stack.slice(0, 4).map((s) => `<span>${esc(s)}</span>`).join("")}${p.stack.length > 4 ? `<span>+${p.stack.length - 4}</span>` : ""}</div>
        <span class="card-cta">View project <i>→</i></span>
      </div>
    </a>`;

  const bySlug = (slug) => P.find((p) => p.slug === slug);
  const mini = (p) => p ? `
    <a class="mini" href="#/p/${p.slug}">
      <img src="${esc(p.cover)}" alt="" loading="lazy" />
      <span><strong>${esc(p.title)}</strong><small>${esc(p.subtitle)}</small></span>
      <i>→</i>
    </a>` : "";

  const spotlight = (p, i) => `
    <article class="spot ${i % 2 ? "flip" : ""} reveal">
      <a class="spot-media" href="#/p/${p.slug}">
        <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="${i < 1 ? "eager" : "lazy"}" />
        ${p.videos?.length ? `<span class="badge">▶ ${p.videos.length > 1 ? p.videos.length + " videos" : "Video demo"}</span>` : ""}
      </a>
      <div class="spot-body">
        <p class="kicker"><span class="spot-num">${String(i + 1).padStart(2, "0")}</span> ${esc(p.subtitle)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="spot-tag">${esc(p.tagline)}</p>
        <ul class="ticks">${(p.highlights || []).slice(0, 3).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="chips">${p.stack.slice(0, 5).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <a class="btn btn-primary" href="#/p/${p.slug}">View project →</a>
      </div>
    </article>`;

  const first = S.name.split(" ")[0];
  const pad = (n) => String(n).padStart(2, "0");
  const ctaBtn = (msg, label, extra = "") =>
    S.whatsapp ? `<a class="btn btn-wa ${extra}" href="${wa(msg)}" target="_blank" rel="noopener">${ICON.wa}${label}</a>`
    : S.upwork ? `<a class="btn btn-up ${extra}" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}${label}</a>` : "";

  function home(section) {
    document.title = `${S.name} · ${S.role}`;
    const showcase = (S.heroShowcase || []).map((x) => ({ ...x, p: bySlug(x.slug) })).filter((x) => x.p);
    const featured = (S.featured || []).map(bySlug).filter(Boolean);
    const rest = P.filter((p) => !featured.includes(p));
    const restTags = ["All", ...new Set(rest.flatMap((p) => p.tags))];
    const svc = S.services || [];
    const all = [...featured, ...rest];
    app.innerHTML = `
      <section class="hero hero3">
        <div class="hero3-text">
          <p class="eyebrow reveal"><span class="dot"></span>Open to new projects</p>
          <h1 class="reveal">${esc(S.heroTitle[0])}<span class="hl">${esc(S.heroTitle[1])}</span>${esc(S.heroTitle[2])}</h1>
          <p class="lead reveal">${esc(S.heroIntro)}</p>
          <div class="hero-actions reveal">
            <a class="btn btn-primary btn-lg" href="#/work">View projects →</a>
            ${S.whatsapp ? `<a class="btn btn-wa btn-lg" href="${wa()}" target="_blank" rel="noopener">${ICON.wa}WhatsApp me</a>` : S.upwork ? `<a class="btn btn-up btn-lg" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}Message me on Upwork</a>` : ""}
          </div>
          ${S.heroPills?.length ? `<ul class="hero-pills reveal">${S.heroPills.map(([i, t]) => `<li><span>${i}</span>${esc(t)}</li>`).join("")}</ul>` : ""}
        </div>
        ${(S.heroPhones || []).length ? `
        <div class="phone-row reveal">
          ${S.heroPhones.map((x, k) => { const pr = bySlug(x.slug); return pr ? `
            <a class="pr pr-${k}" href="#/p/${pr.slug}">
              <span class="pr-frame"><img src="${esc(x.img)}" alt="${esc(pr.title)}" loading="${k < 2 ? "eager" : "lazy"}" /></span>
              <span class="pr-label">${esc(pr.title)}</span>
            </a>` : ""; }).join("")}
        </div>` : ""}
        <p class="hero-by reveal">${esc(S.name)} · ${esc(S.role)} · ${esc((S.location || "").split("·")[0].trim())}</p>
      </section>

      <section class="band" aria-hidden="true">
        <div class="band-row"><div>${[...allStack, ...allStack].map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
        <div class="band-row rev"><div>${[...(S.industries || []), ...(S.industries || []), ...(S.industries || []), ...(S.industries || [])].map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
      </section>

      <section id="services" class="section">
        <div class="sec-head reveal">
          <p class="kicker">Services</p>
          <h2>How can I help?</h2>
          <p class="sub">Three ways I usually work with clients, each backed by projects you can open.</p>
        </div>
        <div class="svc3">
          ${svc.map((x, i) => `
          <article class="svc reveal" style="--d:${i * 80}ms">
            <div class="svc-top"><span class="svc-ico">${x.icon || ""}</span><span class="svc-n">${pad(i + 1)}</span></div>
            <h3>${esc(x.tab || x.title)}</h3>
            <p>${esc(x.text)}</p>
            <ul class="ticks">${x.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            ${(x.projects || []).length ? `
            <div class="svc-proof"><span>Related work</span>
              <div class="svc-thumbs">${x.projects.map((slug) => { const pr = bySlug(slug); return pr ? `<a href="#/p/${pr.slug}"><img src="${esc(pr.cover)}" alt="" loading="lazy" /><em>${esc(pr.title)}</em></a>` : ""; }).join("")}</div>
            </div>` : ""}
            <div class="svc-cta">${ctaBtn(`Hi ${first}, I need help with: ${x.tab || x.title}.`, "Talk about this")}</div>
          </article>`).join("")}
        </div>
      </section>

      <section id="work" class="section">
        <div class="sec-head reveal">
          <p class="kicker">Selected projects</p>
          <h2>Apps I've shipped</h2>
          <p class="sub">Hover a project to preview it. Open it for screens, the stack and links.</p>
        </div>
        <div class="wk reveal">
          <ol class="wk-list">
            ${all.map((pr, k) => `
            <li><a href="#/p/${pr.slug}" data-k="${k}" class="${k === 0 ? "on" : ""}">
              <span class="wk-n">${pad(k + 1)}</span>
              <img class="wk-thumb" src="${esc(pr.cover)}" alt="" loading="lazy" />
              <span class="wk-t"><strong>${esc(pr.title)}</strong><small>${esc(pr.subtitle)}</small></span>
              ${pr.links?.length ? `<span class="wk-live">Live</span>` : ""}
              <i>→</i>
            </a></li>`).join("")}
          </ol>
          <div class="wk-stage">
            ${all.map((pr, k) => `
            <a class="wk-card ${k === 0 ? "on" : ""}" data-k="${k}" href="#/p/${pr.slug}" tabindex="-1">
              <span class="wk-img"><img src="${esc(pr.cover)}" alt="${esc(pr.title)}" loading="${k < 2 ? "eager" : "lazy"}" />${pr.videos?.length ? `<span class="badge">▶ Video demo</span>` : ""}</span>
              <span class="wk-info">
                <span class="wk-tags">${esc(pr.tags.join(" · "))}</span>
                <strong>${esc(pr.tagline)}</strong>
                <span class="chips">${pr.stack.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
                <span class="wk-go">View project →</span>
              </span>
            </a>`).join("")}
          </div>
        </div>
        <div class="next-cta reveal">
          <div><p class="kicker">Your project</p><h3>Your app could be next.</h3><p>Tell me what you're building. I'll reply with a short plan, timeline and estimate.</p></div>
          ${ctaBtn(`Hi ${first}, I'd like to discuss a new project.`, "Start a conversation", "btn-lg")}
        </div>
      </section>

      ${S.process?.length ? `
      <section id="process" class="section">
        <div class="split">
          <div class="split-l reveal">
            <p class="kicker">Process</p>
            <h2>From first call to launch</h2>
            <p class="sub">Clear steps, a working build every week, and code that's yours at the end.</p>
          </div>
          <ol class="tl">
            ${S.process.map(([h, t, g], i) => `
            <li class="reveal"><span class="tl-dot">${i + 1}</span>
              <div class="tl-card"><h3>${esc(h)}</h3><p>${esc(t)}</p>${g ? `<span class="tl-get">You get · ${esc(g)}</span>` : ""}</div>
            </li>`).join("")}
          </ol>
        </div>
      </section>` : ""}

      ${S.faq?.length ? `
      <section id="faq" class="section">
        <div class="split">
          <div class="split-l reveal">
            <p class="kicker">FAQ</p>
            <h2>Before you ask</h2>
            <p class="sub">Short answers to what clients usually want to know. Anything else, just ask.</p>
            ${ctaBtn(`Hi ${first}, I have a question about a project.`, "Ask a question")}
          </div>
          <div class="faq">
            ${S.faq.map(([q, ans], i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary>${esc(q)}<i aria-hidden="true">+</i></summary><p>${esc(ans)}</p></details>`).join("")}
          </div>
        </div>
      </section>` : ""}

      <section id="contact" class="section">
        <div class="contact2 reveal">
          <div class="c2-l">
            <p class="kicker">Get in touch</p>
            <h2>Let's build your app.</h2>
            <p class="lead">Tell me what you're building or what's broken${S.whatsapp ? "" : ", in a message on Upwork"}. I'll reply with a short technical plan.</p>
            <div class="hero-actions">${contactButtons()}</div>
          </div>
          <div class="c2-r">
            ${S.email ? `<a class="tile" href="mailto:${esc(S.email)}"><span class="tile-ico">${ICON.mail}</span><span><small>Email</small><strong>${esc(S.email)}</strong></span></a>` : ""}
            ${S.whatsapp ? `<a class="tile" href="${wa()}" target="_blank" rel="noopener"><span class="tile-ico">${ICON.wa}</span><span><small>WhatsApp</small><strong>${esc(S.whatsappDisplay)}</strong></span></a>` : ""}
            ${S.phone ? `<a class="tile" href="tel:${esc(S.phone)}"><span class="tile-ico">📞</span><span><small>Call</small><strong>${esc(S.whatsappDisplay || S.phone)}</strong></span></a>` : ""}
            ${S.github ? `<a class="tile" href="${esc(S.github)}" target="_blank" rel="noopener"><span class="tile-ico">${ICON.gh}</span><span><small>GitHub</small><strong>${esc(S.github.replace(/^https?:\/\//, ""))}</strong></span></a>` : ""}
            ${S.upwork && !S.whatsapp ? `<a class="tile" href="${esc(S.upwork)}" target="_blank" rel="noopener"><span class="tile-ico">${ICON.upwork}</span><span><small>Upwork</small><strong>Message me on Upwork</strong></span></a>` : ""}
            ${S.location ? `<div class="tile"><span class="tile-ico">📍</span><span><small>Based in</small><strong>${esc(S.location)}</strong></span></div>` : ""}
          </div>
        </div>
      </section>`;
    startShowcase(showcase);
    bindFilters();
    const wkItems = app.querySelectorAll(".wk-list a"), wkCards = app.querySelectorAll(".wk-card");
    wkItems.forEach((it) => { const on = () => { wkItems.forEach((y) => y.classList.toggle("on", y === it)); wkCards.forEach((c) => c.classList.toggle("on", c.dataset.k === it.dataset.k)); }; it.addEventListener("mouseenter", on); it.addEventListener("focus", on); });
    app.querySelectorAll(".need-tabs button").forEach((b) => b.addEventListener("click", () => {
      app.querySelectorAll(".need-tabs button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
      app.querySelectorAll(".need-panel").forEach((p) => { p.hidden = p.dataset.p !== b.dataset.t; if (!p.hidden) p.classList.add("in"); });
    }));
    observe();
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }

  // Hero showcase: cycles through projects every few seconds (pauses on hover)
  let scTimer;
  function startShowcase(list) {
    clearInterval(scTimer);
    const root = app.querySelector(".showcase");
    if (!root || list.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shots = root.querySelectorAll(".browser-screen img"), dots = root.querySelectorAll(".sc-dots i");
    const phone = root.querySelector(".phone-mock");
    let k = 0, paused = false;
    const show = (n) => {
      k = (n + list.length) % list.length;
      const x = list[k];
      shots.forEach((im, i) => im.classList.toggle("on", i === k));
      dots.forEach((d, i) => d.classList.toggle("on", i === k));
      phone.classList.toggle("on", !!x.phone);
      phone.querySelectorAll("img").forEach((im) => im.classList.toggle("on", +im.dataset.k === k));
      root.querySelectorAll("[data-sc-title]").forEach((el) => (el.textContent = x.p.title));
      root.querySelector("[data-sc-sub]").textContent = x.p.subtitle;
      root.querySelectorAll("[data-sc-link]").forEach((el) => (el.href = `#/p/${x.p.slug}`));
    };
    root.addEventListener("mouseenter", () => (paused = true));
    root.addEventListener("mouseleave", () => (paused = false));
    dots.forEach((d, i) => d.addEventListener("click", (e) => { e.preventDefault(); show(i); }));
    scTimer = setInterval(() => !paused && !document.hidden && show(k + 1), 3600);
  }

  function bindFilters() {
    app.querySelectorAll(".filters button").forEach((b) =>
      b.addEventListener("click", () => {
        filter = b.dataset.f;
        app.querySelectorAll(".filters button").forEach((x) => x.classList.toggle("on", x === b));
        app.querySelectorAll(".card").forEach((c) => (c.hidden = filter !== "All" && !c.dataset.tags.split(",").includes(filter)));
      })
    );
    if (filter !== "All") app.querySelector(`.filters button[data-f="${filter}"]`)?.click();
  }

  function project(slug) {
    clearInterval(scTimer);
    const i = P.findIndex((p) => p.slug === slug);
    if (i < 0) return home();
    const p = P[i], imgs = images(p);
    const others = [...P.slice(i + 1), ...P.slice(0, i)];
    const related = [...others.filter((o) => o.tags.some((t) => p.tags.includes(t))), ...others].filter((o, k, arr) => arr.indexOf(o) === k).slice(0, 3);
    const phoneVids = p.videos?.every((v) => v.phone);
    document.title = `${p.title} · ${S.name}`;
    app.innerHTML = `
      <article class="case case2">
        <a href="#/work" class="back">← Back to projects</a>
        <header class="c2-head">
          <div>
            <p class="kicker">${esc(p.subtitle)}</p>
            <h1>${esc(p.title)}</h1>
            <p class="lead">${esc(p.tagline)}</p>
          </div>
          <div class="c2-actions">
            ${(p.links || []).map(([l, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}
            ${ctaBtn(`Hi ${first}, I saw your ${p.title} project and need something similar.`, "Build something similar")}
          </div>
        </header>

        <dl class="facts reveal">
          <div><dt>My role</dt><dd>${esc(p.role)}</dd></div>
          <div><dt>Platforms</dt><dd>${esc(p.tags.join(", "))}</dd></div>
          <div class="wide"><dt>Built with</dt><dd class="chips">${p.stack.map((t) => `<span>${esc(t)}</span>`).join("")}</dd></div>
        </dl>

        ${p.videos?.length && !phoneVids ? "" : `<div class="case-cover reveal"><img src="${esc(p.cover)}" alt="${esc(p.title)} cover" /></div>`}

        ${p.videos?.length ? `
        <section class="case-section case-videos ${phoneVids ? "" : "lead-video"}">
          ${phoneVids ? `<h2 class="reveal">Demo</h2>` : ""}
          <div class="videos ${phoneVids ? "phones" : ""}">
            ${p.videos.map((v) => `
              <figure class="video reveal ${v.phone ? "phone" : ""}">
                <video controls playsinline preload="none" poster="${esc(v.poster || "")}" src="${esc(v.src)}"></video>
                <figcaption>${esc(v.label || "")}</figcaption>
              </figure>`).join("")}
          </div>
        </section>` : ""}

        <section class="case-section c2-body">
          <div class="c2-about reveal"><h2>The project</h2><p>${esc(p.summary)}</p></div>
          ${p.highlights?.length ? `
          <div class="c2-built">
            <h2 class="reveal">What I built</h2>
            <ol class="feat">${p.highlights.map((h, k) => `<li class="reveal" style="--d:${(k % 2) * 60}ms"><span>${pad(k + 1)}</span><p>${esc(h)}</p></li>`).join("")}</ol>
          </div>` : ""}
        </section>

        ${imgs.length ? `
        <section class="case-section">
          <h2 class="reveal">Gallery <sup>${imgs.length}</sup></h2>
          ${[true, false].map((ph) => imgs.some((im) => !!im.phone === ph) ? `
          <div class="${ph ? "phone-gallery" : "gallery"}">
            ${imgs.map((im, k) => !!im.phone !== ph ? "" : `
              <figure class="shot reveal ${ph ? "phone-shot" : ""}" data-k="${k}" tabindex="0">
                <img src="${esc(im.src)}" alt="${esc(im.caption)}" loading="lazy" />
                <figcaption>${esc(im.caption)}</figcaption>
              </figure>`).join("")}
          </div>` : "").join("")}
        </section>` : ""}

        <section class="next-cta reveal">
          <div><p class="kicker">Like what you see?</p><h3>Want an app like ${esc(p.title)}?</h3><p>Send me a message. I'll reply with a short plan, timeline and estimate.</p></div>
          <div class="hero-actions">${contactButtons(`Hi ${first}, I saw your ${p.title} project and need something similar.`)}</div>
        </section>

        <section class="case-section">
          <h2 class="reveal">More projects</h2>
          <div class="mrows">${related.map((r) => `<a class="mrow reveal" href="#/p/${r.slug}"><img src="${esc(r.cover)}" alt="" loading="lazy" /><span><strong>${esc(r.title)}</strong><small>${esc(r.subtitle)}</small></span><i>→</i></a>`).join("")}</div>
        </section>
      </article>`;
    window.scrollTo(0, 0);
    app.querySelectorAll(".shot").forEach((f) => {
      const open = () => lightbox.open(imgs, +f.dataset.k);
      f.addEventListener("click", open);
      f.addEventListener("keydown", (e) => e.key === "Enter" && open());
    });
    app.querySelectorAll("video").forEach((v) => v.addEventListener("play", () => app.querySelectorAll("video").forEach((o) => o !== v && o.pause())));
    observe();
  }

  /* Lightbox */
  const lightbox = (() => {
    const el = document.getElementById("lightbox"), img = el.querySelector("img"), cap = el.querySelector("figcaption");
    let list = [], k = 0;
    const show = () => { img.src = list[k].src; img.alt = list[k].caption; cap.textContent = `${k + 1} / ${list.length}  ·  ${list[k].caption}`; };
    const go = (d) => { k = (k + d + list.length) % list.length; show(); };
    const close = () => { el.hidden = true; document.body.style.overflow = ""; };
    el.querySelector(".lb-close").onclick = close;
    el.querySelector(".lb-prev").onclick = (e) => { e.stopPropagation(); go(-1); };
    el.querySelector(".lb-next").onclick = (e) => { e.stopPropagation(); go(1); };
    el.addEventListener("click", (e) => e.target === el && close());
    document.addEventListener("keydown", (e) => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
    let x0 = null;
    el.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    el.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); x0 = null; });
    return { open(l, i) { list = l; k = i; show(); el.hidden = false; document.body.style.overflow = "hidden"; } };
  })();

  /* Scroll reveal */
  let io;
  function observe() {
    io?.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { rootMargin: "0px 0px -6% 0px" });
    app.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* Router: #/  #/work  #/services  #/faq  #/contact  #/p/<slug> */
  function route() {
    const [, a, b] = location.hash.split("?")[0].split("/");
    if (a === "p" && b) project(b);
    else if (app.querySelector(".hero") && a) document.getElementById(a)?.scrollIntoView({ behavior: "smooth" });
    else home(a);
  }
  window.addEventListener("hashchange", route);
  route();
})();
