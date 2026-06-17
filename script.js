const app = document.querySelector("#app");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector(".modal-close");

const routes = {
  front: renderFrontPage,
  menu: renderMenuPage,
  message: renderMessagePage,
  openWhen: renderOpenWhenPage,
  vouchers: renderVoucherPage
};

const openWhenCards = [
  {
    title: "Open when... you miss me",
    type: "video",
    src: "video-photobooth.mp4",
    message: "This experience still feels surreal to me. I'm just so glad we hung out again. I miss you."
  },
  {
    title: "Open when... you need courage",
    type: "text",
    message: "I'm always very proud of what you have become, I hope we do more things together."
  },
  {
    title: "Open when... you cannot sleep",
    type: "image",
    src: "photo-photobooth.jpg",
    message: "Our first photobooth ever! You are still beautiful as ever especially when beside me."
  },
  {
    title: "Open when... you want a laugh",
    type: "video",
    src: "video-2ndtimewemet.mp4",
    message: "This is the second time we met, and seeing us having fun will never not complete me."
  },
  {
    title: "Open when... you don't feel pretty enough",
    type: "image",
    src: "my-beautiful-love.jpg",
    message: "The moment when I saw you through your mask on, I already knew how beautiful you are and I will never get tired of saying it."
  },
  {
    title: "Open when... you miss my voice",
    type: "audio",
    src: "first-song.mp3",
    message: "This audio recording is the first recording I sent you. Because I want to sing you a song, for there's nothing like doing doing nothing, with you."
  },
  {
    title: "Open when... you feel loved",
    type: "text",
    message: "Remember that the love that we have now will last for the rest of our lifetime, and beyond."
  }
];

const vouchers = [
  {
    title: "The Free-date Pass",
    text: "Use for a guaranteed free date experience with me without spending a single cent."
  },
  {
    title: "The Virtual Movie-date Pass",
    text: "Full control over our next virtual movie date night hehe."
  },
  {
    title: "The Soothing Massive Hug",
    text: "Redeemable for one massive hug when the LDR map is finally cleared."
  },
  {
    title: "The Snack Quest Token",
    text: "Pick the next comfort snack combo you want and I will happily buy it for you."
  }
];

function setRoute(route) {
  const renderer = routes[route] || routes.front;
  app.className = "app-shell";
  renderer();
  window.location.hash = route === "front" ? "" : route;
}

function renderFrontPage() {
  app.innerHTML = `
    <section class="page center-page">
      <div class="front-stack">
        <button class="heart-button" type="button" aria-label="Open hidden love note">
          <span class="pixel-heart" aria-hidden="true"></span>
        </button>
        <h1 class="title">HAPPY BIRTHDAY, YSONE!</h1>
        <p class="subtitle">June 18, 2026</p>
        <button class="pixel-button start-button" type="button">PRESS START</button>
        <p class="subtitle credit">by the hubby - Harvey Tooth</p>
      </div>
    </section>
  `;

  app.querySelector(".start-button").addEventListener("click", () => setRoute("menu"));
  app.querySelector(".heart-button").addEventListener("click", () => {
    openModal(`
      <h2 class="modal-title">Hidden Heart Message</h2>
      <p class="modal-copy">I apologize my love for this what I can do for now. I promise to make it up to you someday for "There's nothing like you and me... and I'm happy doing nothing with you."</p>
    `);
  });
}

function renderMenuPage() {
  app.innerHTML = `
    <section class="page center-page">
      <div class="menu-grid" aria-label="Main menu">
        <button class="menu-card" type="button" data-route="message">THE MESSAGE</button>
        <button class="menu-card" type="button" data-route="openWhen">OPEN WHEN... LETTERS</button>
        <button class="menu-card" type="button" data-route="vouchers">CUSTOM VOUCHER BOOK</button>
      </div>
    </section>
  `;

  app.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.route));
  });
}

function renderMessagePage() {
  app.innerHTML = `
    <section class="page route-page">
      ${pageHeader("MAIN MESSAGE")}
      <div class="message-wrap">
        <article class="message-box scroll-area" tabindex="0">
          <h2>Dear Ysone,</h2>
          <p>Happy birthday, my love. This little retro world is only a tiny version of what I wish I could hand you today, but every pixel is here because I wanted you to feel celebrated, chosen, and remembered.</p>
          <p>You make ordinary days feel like secret bonus levels. Even when the distance is annoying and the screen is the only bridge we get, you still make me feel like I am standing close enough to laugh with you.</p>
          <p>I hope this year gives you gentleness when you need rest, courage when the path gets loud, and joy that finds you in the middle of normal days. I hope you never forget how deeply you are loved.</p>
          <p>Thank you for being my favorite teammate, my favorite story, and my favorite person to do absolutely nothing with. I am cheering for you in every quest, every chapter, every tomorrow.</p>
          <p>For now, please accept this scrollable message box as a placeholder for a longer letter. It is ready for all the real words, memories, promises, and tiny jokes you want to add later.</p>
        </article>
      </div>
    </section>
  `;
  bindBackButton();
}

function renderOpenWhenPage() {
  app.innerHTML = `
    <section class="page route-page">
      ${pageHeader("OPEN WHEN...")}
      <div class="grid-scroll scroll-area">
        <div class="letter-grid">
          ${openWhenCards.map((card, index) => letterCardTemplate(card, index)).join("")}
        </div>
      </div>
    </section>
  `;

  bindBackButton();
  app.querySelectorAll(".letter-card").forEach((card) => {
    card.addEventListener("click", () => {
      const item = openWhenCards[Number(card.dataset.index)];
      openModal(`
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-media">${mediaTemplate(item.type)}</div>
        <p class="modal-copy">${item.message}</p>
      `);
    });
  });
}

function renderVoucherPage() {
  app.innerHTML = `
    <section class="page route-page">
      ${pageHeader("VOUCHER BOOK")}
      <div class="voucher-feed scroll-area">
        <div class="voucher-stack">
          ${vouchers.map((voucher) => `
            <button class="voucher-card" type="button">
              <h2>${voucher.title}</h2>
              <p>${voucher.text}</p>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
  bindBackButton();
}

function pageHeader(title) {
  return `
    <header class="page-header">
      <button class="pixel-button back-button" type="button">BACK</button>
      <h1 class="page-title">${title}</h1>
      <span aria-hidden="true"></span>
    </header>
  `;
}

function bindBackButton() {
  app.querySelector(".back-button").addEventListener("click", () => setRoute("menu"));
}

function letterCardTemplate(card, index) {
  return `
    <button class="letter-card" type="button" data-index="${index}">
      <div class="media-frame">${mediaTemplate(card.type)}</div>
      <p class="card-label">${card.title}</p>
    </button>
  `;
}

function mediaTemplate(type) {
  if (type === "image") {
    return `<div class="pixel-preview" role="img" aria-label="Pixel art image placeholder"></div>`;
  }

  if (type === "video") {
    return `<div class="video-preview" role="img" aria-label="Video placeholder"></div>`;
  }

  if (type === "audio") {
    return `<div class="audio-preview" role="img" aria-label="Audio placeholder"></div>`;
  }

  return `<p class="text-preview">A tiny letter waits inside this box.</p>`;
}

function openModal(html) {
  modalBody.innerHTML = html;
  modal.classList.remove("is-hidden");
  modalClose.focus();
}

function closeModal() {
  modal.classList.add("is-hidden");
  modalBody.innerHTML = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
    closeModal();
  }
});

window.addEventListener("hashchange", () => {
  setRoute(window.location.hash.replace("#", "") || "front");
});

setRoute(window.location.hash.replace("#", "") || "front");
