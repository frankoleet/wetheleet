<script>
  const t = {
    market: '\u041c\u0430\u0440\u043a\u0435\u0442',
    articles: '\u0421\u0442\u0430\u0442\u044c\u0438',
    guarantor: '\u0413\u0430\u0440\u0430\u043d\u0442',
    socials: '\u0421\u043e\u0446. \u0441\u0435\u0442\u0438',
    other: '\u0414\u0440\u0443\u0433\u043e\u0435',
    home: '\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e',
    channels: '\u041a\u0430\u043d\u0430\u043b\u044b \u0438 \u0447\u0430\u0442\u044b',
    chat: '\u0427\u0430\u0442',
    tgChannel: 'Telegram \u043a\u0430\u043d\u0430\u043b',
    vkGroup: '\u0413\u0440\u0443\u043f\u043f\u0430 \u0412\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0435',
    ytChannel: 'YouTube \u043a\u0430\u043d\u0430\u043b',
    tgChat: 'LOLZTEAM TG \u0447\u0430\u0442',
    discord: 'Discord \u0441\u0435\u0440\u0432\u0435\u0440',
    chronicles: '\u0425\u0420\u041e\u041d\u0418\u041a\u0418 LOLZ',
    users: '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438',
    banned: '\u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435',
    rules: '\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u0444\u043e\u0440\u0443\u043c\u0430',
    money: '\u041d\u0435 \u043f\u0440\u0438\u0448\u043b\u0438 \u0434\u0435\u043d\u044c\u0433\u0438?',
    changes: '\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430 \u0441\u0430\u0439\u0442\u0435',
    ads: '\u0420\u0435\u043a\u043b\u0430\u043c\u0430',
    tournaments: '\u0422\u0443\u0440\u043d\u0438\u0440\u044b',
    charity: '\u0411\u043b\u0430\u0433\u043e\u0442\u0432\u043e\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c',
    about: '\u041e \u043d\u0430\u0441',
    help: '\u041d\u0443\u0436\u043d\u0430 \u043f\u043e\u043c\u043e\u0449\u044c',
    openMenu: '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e',
    closeMenu: '\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e',
    mainNav: '\u041e\u0441\u043d\u043e\u0432\u043d\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f',
    goHome: '\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e',
    siteSearch: '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0441\u0430\u0439\u0442\u0443',
    searchPlaceholder: '\u041f\u043e\u0438\u0441\u043a...',
    messages: '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f',
    alerts: '\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f',
    profile: '\u041f\u0440\u043e\u0444\u0438\u043b\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f',
  };

  const desktopNavItems = [
    { label: t.market, href: '/', dot: false, caret: false },
    { label: t.articles, href: '/', dot: true, caret: false },
    { label: t.guarantor, href: '/', dot: false, caret: false },
    { label: t.socials, href: '/', dot: false, caret: true },
    { label: t.other, href: '/', dot: false, caret: true },
  ];

  const mobileMenuGroups = [
    {
      title: '',
      items: [
        { label: t.home, href: '/', icon: 'home' },
        { label: t.articles, href: '/', icon: 'article' },
        { label: t.market, href: '/', icon: 'cart' },
        { label: t.guarantor, href: '/', icon: 'shield' },
      ],
    },
    {
      title: t.channels,
      items: [
        { label: t.chat, href: '/', icon: 'chat' },
        { label: t.tgChannel, href: '/', icon: 'telegram' },
        { label: 'LOLZTEAM LEGAL', href: '/', icon: 'telegram' },
        { label: 'LOLZTEAM DEV BLOG', href: '/', icon: 'telegram' },
        { label: t.vkGroup, href: '/', icon: 'vk' },
        { label: t.ytChannel, href: '/', icon: 'youtube', active: true },
        { label: t.tgChat, href: '/', icon: 'chat' },
        { label: t.discord, href: '/', icon: 'discord' },
        { label: 'LOLZ NEWS', href: '/', icon: 'telegram' },
        { label: t.chronicles, href: '/', icon: 'telegram' },
      ],
    },
    {
      title: t.other,
      items: [
        { label: t.users, href: '/', icon: 'users' },
        { label: t.banned, href: '/', icon: 'ban' },
        { label: t.rules, href: '/', icon: 'rules' },
        { label: t.money, href: '/', icon: 'help' },
        { label: 'FAQ', href: '/', icon: 'faq' },
        { label: t.changes, href: '/', icon: 'info' },
        { label: t.ads, href: '/', icon: 'ads' },
        { label: t.tournaments, href: '/', icon: 'trophy' },
        { label: t.charity, href: '/', icon: 'heart' },
        { label: t.about, href: '/', icon: 'eye' },
        { label: t.help, href: '/', icon: 'support' },
        { label: 'Switch to English', href: '/', icon: 'translate' },
      ],
    },
  ];

  const avatarSrc = 'https://nztcdn.com/avatar/s/1767039519/8809641.webp';

  let mobileMenuOpen = $state(false);

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function getMenuIcon(icon) {
    const icons = {
      home: `<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 8.4 10 4l5.5 4.4v6.1a1 1 0 0 1-1 1h-2.8V11H8.3v4.5H5.5a1 1 0 0 1-1-1V8.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
      article: `<svg viewBox="0 0 20 20" fill="none"><path d="M5 3.8h6l4 4v8.4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.8a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M11 3.8V8h4M7 11h6M7 14h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      cart: `<svg viewBox="0 0 20 20" fill="none"><path d="M3.5 4.6h1.8l1.4 6.4h7.3l1.4-4.9H7.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.3" cy="14.6" r="1.1" fill="currentColor"/><circle cx="13.9" cy="14.6" r="1.1" fill="currentColor"/></svg>`,
      shield: `<svg viewBox="0 0 20 20" fill="none"><path d="M10 3.2 15.4 5v4.5c0 3.2-2.1 5.6-5.4 7.2-3.3-1.6-5.4-4-5.4-7.2V5L10 3.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
      chat: `<svg viewBox="0 0 20 20" fill="none"><path d="M5.7 4.4h8.6a2 2 0 0 1 2 2v4.3a2 2 0 0 1-2 2H10l-3.4 2.7v-2.7H5.7a2 2 0 0 1-2-2V6.4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
      telegram: `<svg viewBox="0 0 20 20" fill="none"><path d="m16.4 4.3-2 10.2c-.1.7-.6.8-1.1.5l-3.3-2.4-1.6 1.5c-.2.2-.4.4-.8.4l.3-3.4 6.2-5.6c.3-.3-.1-.4-.4-.2L6 10 2.7 9c-.7-.2-.7-.7.2-1l12.8-4.9c.6-.2.9.1.7 1.2Z" fill="currentColor"/></svg>`,
      vk: `<svg viewBox="0 0 20 20" fill="none"><path d="M4.1 6.4c.1 3.9 2.1 6.3 5.6 6.3h.2V10c1.5 0 2.6.8 3 2.7h2.2c-.5-1.8-1.6-2.8-2.3-3.2.7-.5 1.7-1.6 1.9-3.1h-2c-.3 1.2-1.2 2.3-2.8 2.4V6.4H8V10C6.5 9.6 5.5 8.4 5.3 6.4H4.1Z" fill="currentColor"/></svg>`,
      youtube: `<svg viewBox="0 0 20 20" fill="none"><path d="M16.2 6.4c-.2-.8-.8-1.4-1.6-1.6C13.2 4.4 10 4.4 10 4.4s-3.2 0-4.6.4c-.8.2-1.4.8-1.6 1.6C3.4 7.8 3.4 10 3.4 10s0 2.2.4 3.6c.2.8.8 1.4 1.6 1.6 1.4.4 4.6.4 4.6.4s3.2 0 4.6-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-3.6.4-3.6s0-2.2-.4-3.6Z" fill="currentColor"/><path d="m8.7 12.6 4-2.6-4-2.6v5.2Z" fill="#1a1a1a"/></svg>`,
      discord: `<svg viewBox="0 0 20 20" fill="none"><path d="M13.9 5.4A11.3 11.3 0 0 0 11.4 4l-.3.7a7 7 0 0 1 2.1 1c-2-.9-4.4-.9-6.4 0a7 7 0 0 1 2.1-1L8.6 4c-.9.3-1.8.8-2.5 1.4-1.6 2.4-2 4.7-1.8 6.9A10 10 0 0 0 7.5 14l.8-1.1c-.4-.2-.8-.4-1.1-.7l.3-.2c2 .9 4.3.9 6.3 0l.3.2c-.3.3-.7.5-1.1.7l.8 1.1a10 10 0 0 0 3.2-1.7c.3-2.5-.4-4.8-1.8-6.9ZM8.2 11.5c-.6 0-1-.5-1-1.1 0-.6.4-1.1 1-1.1s1 .5 1 1.1c0 .6-.4 1.1-1 1.1Zm3.6 0c-.6 0-1-.5-1-1.1 0-.6.4-1.1 1-1.1s1 .5 1 1.1c0 .6-.4 1.1-1 1.1Z" fill="currentColor"/></svg>`,
      users: `<svg viewBox="0 0 20 20" fill="none"><path d="M7.4 8.1a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Zm5.2 1a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.8 15a3.8 3.8 0 0 1 7.2 0M11.2 15a3 3 0 0 1 5 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
      ban: `<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.7"/><path d="m5.8 14.2 8.4-8.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      rules: `<svg viewBox="0 0 20 20" fill="none"><path d="m10 4.2 6 10.5H4L10 4.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 7.7v3.5M10 13.2h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      help: `<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.7"/><path d="M8.2 8.1a2 2 0 1 1 3.2 1.6c-.9.6-1.4 1-1.4 1.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="10" cy="13.8" r=".8" fill="currentColor"/></svg>`,
      faq: `<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="3.7" width="12" height="12.6" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 8h4M8 11h4M8 14h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      info: `<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.7"/><path d="M10 8.7v4M10 6.3h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      ads: `<svg viewBox="0 0 20 20" fill="none"><path d="M9 4.2a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 5.8-5.8H9V4.2Z" stroke="currentColor" stroke-width="1.7"/><path d="M11.1 4.4a5.7 5.7 0 0 1 4.5 4.5h-4.5V4.4Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
      trophy: `<svg viewBox="0 0 20 20" fill="none"><path d="M6 4.2h8v2.4a4 4 0 0 1-8 0V4.2Z" stroke="currentColor" stroke-width="1.7"/><path d="M7.4 15.8h5.2M10 10.6v5.2M4.4 5h1.6v1.2A2.8 2.8 0 0 1 3.2 9H2.8V6.6A1.6 1.6 0 0 1 4.4 5Zm11.2 0h-1.6v1.2A2.8 2.8 0 0 0 16.8 9h.4V6.6A1.6 1.6 0 0 0 15.6 5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      heart: `<svg viewBox="0 0 20 20" fill="none"><path d="M10 15.9 4.9 11a3.4 3.4 0 1 1 4.8-4.8L10 6.5l.3-.3A3.4 3.4 0 1 1 15.1 11L10 15.9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
      eye: `<svg viewBox="0 0 20 20" fill="none"><path d="M2.7 10s2.6-4.5 7.3-4.5 7.3 4.5 7.3 4.5-2.6 4.5-7.3 4.5S2.7 10 2.7 10Z" stroke="currentColor" stroke-width="1.7"/><circle cx="10" cy="10" r="2.1" stroke="currentColor" stroke-width="1.7"/></svg>`,
      support: `<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 11V9.7a5.5 5.5 0 0 1 11 0V11M4.9 12.8h1.5c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1H4.9c-.6 0-1 .4-1 1v1.8c0 .6.4 1 1 1Zm8.7 0h1.5c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1h-1.5c-.6 0-1 .4-1 1v1.8c0 .6.4 1 1 1Zm-3.6 3h1.7a2 2 0 0 0 2-2v-.3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
      translate: `<svg viewBox="0 0 20 20" fill="none"><path d="M3.8 5.5h8.4v8.8H3.8z" stroke="currentColor" stroke-width="1.7"/><path d="M7 7.6h2M8 7.6c0 2.2-1.3 4-3 4.9M6.3 9.8c.4.9 1.1 1.8 1.9 2.4M12.2 8.3h4M14.2 6.3v6.9M12.9 11.2h2.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    };

    return icons[icon] ?? icons.info;
  }
</script>

<header id="header" class="topbar">
  <div id="navigation" class="pageWidth withSearch">
    <div class="pageContent">
      <button
        class="mobileBurger"
        class:mobileBurger--hidden={mobileMenuOpen}
        type="button"
        aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
        aria-expanded={mobileMenuOpen}
        onclick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="navTabs" aria-label={t.mainNav}>
        <div class="publicTabs">
          <a id="lzt-logo" href="/" aria-label={t.goHome}></a>

          <ul class="blockLinksList">
            {#each desktopNavItems as item}
              <li>
                <a class="navLink" href={item.href}>
                  <span>{item.label}</span>
                  {#if item.dot}
                    <span class="hasUnreadArticles" aria-hidden="true"></span>
                  {/if}
                  {#if item.caret}
                    <span class="arrowWidget" aria-hidden="true"></span>
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div class="account-links-wrapper">
          <div id="searchBar">
            <label class="QuickSearch" aria-label={t.siteSearch}>
              <svg class="QuickSearchIcon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="5.4" stroke="currentColor" stroke-width="1.8" />
                <path d="m13.1 13.1 3.9 3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
              <input class="QuickSearchQuery" type="search" placeholder={t.searchPlaceholder} />
            </label>
          </div>

          <div class="visitorTabs">
          <button class="headerIcon" type="button" aria-label={t.messages}>
            <span class="headerIcon__message" aria-hidden="true"></span>
          </button>

          <button class="headerIcon headerIcon--badge" type="button" aria-label={t.alerts}>
            <span class="headerIcon__alert" aria-hidden="true"></span>
            <span class="headerIcon__badge">2</span>
          </button>

          <button class="accountUsername" type="button" aria-label={t.profile}>
            <span class="accountUsername__name">nevergonnadie</span>
            <span class="accountUsername__avatar">
              <img src={avatarSrc} alt="" loading="lazy" />
            </span>
          </button>
        </div>
        </div>
      </nav>
    </div>
  </div>

  <div class="mobileDrawer" class:mobileDrawer--open={mobileMenuOpen}>
    <aside class="mobileDrawer__panel" aria-hidden={!mobileMenuOpen}>
      <div class="mobileDrawer__search">
        <label class="mobileDrawer__searchField" aria-label={t.siteSearch}>
          <input type="search" placeholder={t.searchPlaceholder} />
        </label>
      </div>

      {#each mobileMenuGroups as group}
        <section class="mobileDrawer__group">
          {#if group.title}
            <div class="mobileDrawer__groupTitle">
              <span>{group.title}</span>
            </div>
          {/if}

          <div class="mobileDrawer__items">
            {#each group.items as item}
              <a
                class="mobileDrawer__item"
                class:mobileDrawer__item--active={item.active}
                href={item.href}
                onclick={closeMobileMenu}
              >
                <span class="mobileDrawer__icon" aria-hidden="true">
                  {@html getMenuIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </a>
            {/each}
          </div>
        </section>
      {/each}
    </aside>

    <button
      class="mobileDrawer__backdrop"
      type="button"
      tabindex={mobileMenuOpen ? 0 : -1}
      aria-label={t.closeMenu}
      onclick={closeMobileMenu}
    ></button>
  </div>
</header>

<style>
  #header {
    position: fixed;
    inset: 0 0 auto;
    height: 44px;
    z-index: 5700;
    background-color: rgba(20, 20, 20, 0.62);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  #navigation {
    width: 100%;
    height: 44px;
  }

  .pageContent {
    position: relative;
    width: min(var(--page-width), calc(100% - 24px));
    height: 44px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .mobileBurger {
    display: none;
    width: 28px;
    height: 21px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #949494;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: opacity 0.2s ease;
    z-index: 5700;
  }

  .mobileBurger--hidden {
    opacity: 0;
    pointer-events: none;
  }

  .mobileBurger span {
    display: block;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: currentColor;
    position: relative;
  }

  .navTabs,
  .publicTabs,
  .blockLinksList,
  .blockLinksList li,
  .account-links-wrapper,
  .visitorTabs {
    display: flex;
    align-items: center;
  }

  .navTabs {
    flex: 1;
    justify-content: space-between;
  }

  .account-links-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .publicTabs,
  .blockLinksList,
  .blockLinksList li {
    height: 44px;
  }

  #lzt-logo {
    width: 36px;
    height: 36px;
    margin-right: 14px;
    flex: 0 0 auto;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256' fill='none'%3E%3Cg clip-path='url(%23clip0_123_378)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M70.1504 207.392C91.8146 224.992 116.842 235.022 143.533 235.022C183.225 235.022 219.257 212.775 245.995 176.542C234.706 161.247 221.764 148.436 207.575 138.751L184.794 150.124C189.69 157.741 192.542 166.809 192.542 176.542C192.542 203.577 170.604 225.491 143.533 225.491C122.499 225.491 104.566 212.252 97.6139 193.666L70.1504 207.38V207.392ZM126.67 179.168C127.216 182.721 128.88 186.025 131.459 188.604C134.656 191.8 139.005 193.595 143.533 193.583C152.957 193.583 160.598 185.953 160.598 176.542C160.598 171.919 158.756 167.724 155.761 164.646L126.682 179.168H126.67Z' fill='%232BAD72'/%3E%3Cpath d='M76.3528 176.16L242.405 96.3367L205.91 20.4229L187.062 87.507L164.412 40.3758L145.552 107.46L122.902 60.3287L104.042 127.413L81.3916 80.2816L62.5319 147.366L39.8814 100.235L9.4707 208.318L50.9809 188.365L76.3528 176.172V176.16Z' fill='%232BAD72'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_123_378'%3E%3Crect width='236.512' height='214.598' fill='white' transform='translate(9.4707 20.4229)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
  }

  .blockLinksList {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .navLink {
    min-height: 44px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #d6d6d6;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;
  }

  .navLink:hover,
  .navLink:focus-visible {
    color: #ffffff;
    outline: none;
  }

  .hasUnreadArticles {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ba78;
  }

  .arrowWidget {
    width: 10px;
    height: 10px;
    position: relative;
  }

  .arrowWidget::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 1px;
    width: 6px;
    height: 6px;
    border-right: 1.5px solid #8b8b8b;
    border-bottom: 1.5px solid #8b8b8b;
    transform: rotate(45deg);
  }

  .QuickSearch {
    width: 200px;
    height: 30px;
    padding: 0 10px 0 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 5px;
    background: #242424;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  }

  .QuickSearchIcon {
    width: 18px;
    height: 18px;
    margin-left: 0;
    flex: 0 0 auto;
    color: #00ba78;
  }

  .QuickSearchQuery {
    width: 100%;
    min-width: 0;
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
    color: #d6d6d6;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.28;
  }

  .QuickSearchQuery::placeholder {
    color: #8b8b8b;
  }

  .QuickSearchQuery::-webkit-search-cancel-button,
  .QuickSearchQuery::-webkit-search-decoration {
    display: none;
    appearance: none;
    -webkit-appearance: none;
  }

  .visitorTabs {
    gap: 16px;
    height: 44px;
  }

  .headerIcon,
  .accountUsername {
    border: 0;
    background: transparent;
    color: #d6d6d6;
  }

  .headerIcon {
    width: 22px;
    height: 22px;
    position: relative;
    display: inline-grid;
    place-items: center;
    padding: 0;
  }

  .headerIcon:hover,
  .headerIcon:focus-visible,
  .accountUsername:hover,
  .accountUsername:focus-visible,
  .mobileBurger:hover,
  .mobileBurger:focus-visible {
    color: #ffffff;
    outline: none;
  }

  .headerIcon__message,
  .headerIcon__alert {
    width: 22px;
    height: 22px;
    display: inline-block;
    position: relative;
  }

  .headerIcon__message::before,
  .headerIcon__alert::before {
    content: '';
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    opacity: 0.95;
  }

  .headerIcon__message::before {
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cpath opacity='.4' d='M0 0h20v20H0z'%3E%3C/path%3E%3Cpath d='M6.83 15.75c.2-.23.53-.31.82-.2.81.3 1.7.45 2.6.45 3.77 0 6.75-2.7 6.75-6s-2.98-6-6.75-6S3.5 6.7 3.5 10c0 1.21.4 2.37 1.14 3.35.1.14.16.31.15.49-.04.76-.4 1.78-1.08 3.13 1.48-.11 2.5-.53 3.12-1.22ZM3.24 18.5a1.2 1.2 0 0 1-1.1-1.77A10.77 10.77 0 0 0 3.26 14 7 7 0 0 1 2 10c0-4.17 3.68-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.68 7.5-8.25 7.5c-.92 0-1.81-.13-2.66-.4-1 .89-2.46 1.34-4.35 1.4Z' fill='%23D6D6D6' fill-rule='nonzero'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  }

  .headerIcon__alert::before {
    background-image: url("data:image/svg+xml,%3Csvg fill='none' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2.1c4.02 0 6.9 3.28 6.9 7.53v1.6c0 .23.2.53.72 1.08l.27.27c1.08 1.1 1.51 1.73 1.51 2.75 0 .44-.05.79-.27 1.2-.45.88-1.42 1.37-2.87 1.37h-1.9c-.64 2.33-2.14 3.6-4.36 3.6-2.25 0-3.75-1.3-4.37-3.67l.02.07H5.74c-1.5 0-2.47-.5-2.9-1.41-.2-.4-.24-.72-.24-1.16 0-1.02.43-1.65 1.51-2.75l.27-.27c.53-.55.72-.85.72-1.08v-1.6C5.1 5.38 7.99 2.1 12 2.1zm2.47 15.8H9.53c.46 1.25 1.25 1.8 2.47 1.8s2.01-.55 2.47-1.8zM12 3.9c-2.96 0-5.1 2.43-5.1 5.73v1.6c0 .85-.39 1.46-1.23 2.33l-.28.29c-.75.75-.99 1.11-.99 1.48 0 .19.01.29.06.38.1.22.43.39 1.28.39h12.52c.82 0 1.16-.17 1.28-.4.05-.1.06-.2.06-.37 0-.37-.24-.73-.99-1.48l-.28-.29c-.84-.87-1.23-1.48-1.23-2.33v-1.6c0-3.3-2.13-5.73-5.1-5.73z' fill='%23D6D6D6'%3E%3C/path%3E%3C/svg%3E");
  }

  .headerIcon__badge {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 14px;
    height: 14px;
    padding: 0 4px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: #00ba78;
    color: #0c1d16;
    font-size: 10px;
    font-weight: 700;
    box-shadow: 0 0 0 2px rgba(20, 20, 20, 0.9);
  }

  .accountUsername {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 0;
  }

  .accountUsername__name {
    color: #949494;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    padding-right: 5px;
  }

  .accountUsername__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .accountUsername__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mobileDrawer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 5699;
  }

  .mobileDrawer--open {
    pointer-events: auto;
  }

  .mobileDrawer__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.22);
    opacity: 0;
    transition: opacity 0.18s ease;
    cursor: pointer;
    z-index: 1;
  }

  .mobileDrawer--open .mobileDrawer__backdrop {
    opacity: 1;
  }

  .mobileDrawer__panel {
    position: absolute;
    top: 0;
    left: 0;
    width: min(348px, calc(100vw - 42px));
    height: 100dvh;
    padding: 12px 0 16px;
    background: #1f1f1f;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 20px 0 40px rgba(0, 0, 0, 0.35);
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    z-index: 10;
    pointer-events: auto;
  }

  .mobileDrawer--open .mobileDrawer__panel {
    transform: translateX(0);
  }

  .mobileDrawer__search {
    padding: 0 14px 10px;
  }

  .mobileDrawer__searchField {
    display: block;
    height: 34px;
    border-radius: 6px;
    background: #292929;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  }

  .mobileDrawer__searchField input {
    width: 100%;
    height: 100%;
    padding: 0 12px;
    border: 0;
    outline: none;
    background: transparent;
    color: #d6d6d6;
    font-size: 14px;
  }

  .mobileDrawer__searchField input::placeholder {
    color: #8d8d8d;
  }

  .mobileDrawer__group + .mobileDrawer__group {
    margin-top: 6px;
  }

  .mobileDrawer__groupTitle {
    margin: 10px 0 7px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #7e7e7e;
    font-size: 12px;
    line-height: 1.2;
  }

  .mobileDrawer__groupTitle::after {
    content: '';
    flex: 1 1 auto;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }

  .mobileDrawer__items {
    display: grid;
  }

  .mobileDrawer__item {
    min-height: 42px;
    padding: 0 14px;
    color: #f2f2f2;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .mobileDrawer__item:hover,
  .mobileDrawer__item:focus-visible {
    background: #333333;
    outline: none;
  }

  .mobileDrawer__item--active {
    background: #3b3939;
  }

  .mobileDrawer__icon {
    width: 18px;
    height: 18px;
    color: #757575;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
  }

  .mobileDrawer__icon :global(svg) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 980px) {
    .blockLinksList {
      display: none;
    }

    #searchBar {
      margin-right: 12px;
    }
  }

  @media (max-width: 760px) {
    .pageContent {
      width: calc(100% - 12px);
      gap: 8px;
    }

    .mobileBurger {
      display: flex;
      margin-right: 4px;
    }

    .navTabs {
      margin-right: auto;
    }

    #lzt-logo {
      display: none;
    }

    #searchBar {
      display: none;
    }

    .visitorTabs {
      gap: 20px;
    }

    .headerIcon {
      width: 24px;
      height: 24px;
    }

    .headerIcon__message,
    .headerIcon__alert {
      width: 24px;
      height: 24px;
    }

    .accountUsername__name {
      display: none;
    }

    .accountUsername__avatar {
      width: 32px;
      height: 32px;
    }
  }

  @media (min-width: 761px) {
    .mobileDrawer {
      display: none;
    }
  }
</style>
