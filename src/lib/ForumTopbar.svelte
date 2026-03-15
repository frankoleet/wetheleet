<script>
  const navItems = [
    { label: 'Маркет', href: '/', dot: false, caret: false },
    { label: 'Статьи', href: '/', dot: true, caret: false },
    { label: 'Гарант', href: '/', dot: false, caret: false },
    { label: 'Соц. сети', href: '/', dot: false, caret: true },
    { label: 'Другое', href: '/', dot: false, caret: true },
  ];

  const avatarSrc = 'https://nztcdn.com/avatar/s/1767039519/8809641.webp';
</script>

<header id="header" class="topbar">
  <div id="navigation" class="pageWidth withSearch">
    <div class="pageContent">
      <nav class="navTabs" aria-label="Основная навигация">
        <div class="publicTabs">
          <a id="lzt-logo" href="/" aria-label="На главную"></a>

          <ul class="blockLinksList">
            {#each navItems as item}
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
      </nav>

      <div class="account-links">
        <div id="searchBar">
          <label class="QuickSearch" aria-label="Поиск по сайту">
            <span class="QuickSearchIcon" aria-hidden="true"></span>
            <input class="QuickSearchQuery" type="search" placeholder="Поиск..." />
          </label>
        </div>

        <div class="visitorTabs">
          <button class="headerIcon" type="button" aria-label="Сообщения">
            <span class="headerIcon__message" aria-hidden="true"></span>
          </button>

          <button class="headerIcon headerIcon--badge" type="button" aria-label="Уведомления">
            <span class="headerIcon__alert" aria-hidden="true"></span>
            <span class="headerIcon__badge">2</span>
          </button>

          <button class="accountUsername" type="button" aria-label="Профиль пользователя">
            <span class="accountUsername__name">nevergonnadie</span>
            <span class="accountUsername__avatar">
              <img src={avatarSrc} alt="" loading="lazy" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  #header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 5700;
    background-color: rgba(20, 20, 20, 0.62);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  #navigation {
    width: 100%;
    height: 44px;
  }

  .pageContent {
    position: relative;
    width: min(var(--page-width), calc(100% - 20px));
    height: 44px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    zoom: 1;
  }

  .navTabs {
    padding-left: 10px;
    padding-right: 10px;
  }

  .publicTabs {
    float: left;
    height: 44px;
    display: flex;
    align-items: flex-start;
  }

  #lzt-logo {
    width: 36px;
    height: 36px;
    margin: 4px 10px 0 0;
    flex: 0 0 auto;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256' fill='none'%3E%3Cg clip-path='url(%23clip0_123_378)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M70.1504 207.392C91.8146 224.992 116.842 235.022 143.533 235.022C183.225 235.022 219.257 212.775 245.995 176.542C234.706 161.247 221.764 148.436 207.575 138.751L184.794 150.124C189.69 157.741 192.542 166.809 192.542 176.542C192.542 203.577 170.604 225.491 143.533 225.491C122.499 225.491 104.566 212.252 97.6139 193.666L70.1504 207.38V207.392ZM126.67 179.168C127.216 182.721 128.88 186.025 131.459 188.604C134.656 191.8 139.005 193.595 143.533 193.583C152.957 193.583 160.598 185.953 160.598 176.542C160.598 171.919 158.756 167.724 155.761 164.646L126.682 179.168H126.67Z' fill='%232BAD72'/%3E%3Cpath d='M76.3528 176.16L242.405 96.3367L205.91 20.4229L187.062 87.507L164.412 40.3758L145.552 107.46L122.902 60.3287L104.042 127.413L81.3916 80.2816L62.5319 147.366L39.8814 100.235L9.4707 208.318L50.9809 188.365L76.3528 176.172V176.16Z' fill='%232BAD72'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_123_378'%3E%3Crect width='236.512' height='214.598' fill='white' transform='translate(9.4707 20.4229)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
  }

  .blockLinksList {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0;
    height: 44px;
  }

  .blockLinksList li {
    display: flex;
    align-items: center;
    height: 44px;
  }

  .navLink {
    min-height: 36px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #d6d6d6;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
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
    display: inline-block;
  }

  .arrowWidget {
    width: 10px;
    height: 10px;
    position: relative;
    display: inline-block;
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

  .account-links {
    overflow: hidden;
    float: right;
    display: flex;
    align-items: center;
    height: 44px;
  }

  #searchBar {
    margin: 7px 20px 2px 0;
    float: left;
    position: relative;
    zoom: 1;
    font-weight: 400;
    z-index: 52;
  }

  .QuickSearch {
    width: 210px;
    height: 30px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    background: #242424;
    position: relative;
  }

  .QuickSearchIcon {
    width: 16px;
    height: 16px;
    position: relative;
    flex: 0 0 auto;
  }

  .QuickSearchIcon::before,
  .QuickSearchIcon::after {
    content: '';
    position: absolute;
    display: block;
  }

  .QuickSearchIcon::before {
    top: 1px;
    left: 1px;
    width: 9px;
    height: 9px;
    border: 2px solid #00ba78;
    border-radius: 50%;
  }

  .QuickSearchIcon::after {
    width: 6px;
    height: 2px;
    right: 0;
    bottom: 1px;
    background: #00ba78;
    border-radius: 999px;
    transform: rotate(45deg);
    transform-origin: center;
  }

  .QuickSearchQuery {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    color: #d6d6d6;
    font-size: 14px;
    line-height: 1;
    padding-right: 0;
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
    display: flex;
    align-items: center;
    gap: 14px;
    height: 44px;
  }

  .headerIcon,
  .accountUsername {
    border: 0;
    background: transparent;
    color: #d6d6d6;
  }

  .headerIcon {
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-grid;
    place-items: center;
    padding: 0;
  }

  .headerIcon:hover,
  .headerIcon:focus-visible,
  .accountUsername:hover,
  .accountUsername:focus-visible {
    color: #ffffff;
    outline: none;
  }

  .headerIcon__message,
  .headerIcon__alert {
    width: 18px;
    height: 18px;
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
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.7588 2H16.2414C17.0464 1.99999 17.7107 1.99998 18.2519 2.04419C18.814 2.09012 19.3307 2.18868 19.8161 2.43598C20.5687 2.81947 21.1806 3.43139 21.5641 4.18404C21.8114 4.66937 21.91 5.18608 21.9559 5.74818C22.0001 6.28936 22.0001 6.95372 22.0001 7.75868V13.2413C22.0001 14.0463 22.0001 14.7106 21.9559 15.2518C21.91 15.8139 21.8114 16.3306 21.5641 16.816C21.1806 17.5686 20.5687 18.1805 19.8161 18.564C19.3307 18.8113 18.814 18.9099 18.2519 18.9558C17.7107 19 17.0464 19 16.2414 19H13.6838C13.0197 19 12.8263 19.0047 12.6504 19.0408C12.4738 19.0771 12.303 19.137 12.1425 19.219C11.9826 19.3007 11.8286 19.4178 11.31 19.8327L8.89688 21.7632C8.7132 21.9102 8.52597 22.06 8.36137 22.1689C8.20394 22.273 7.8987 22.4593 7.50172 22.4597C7.0449 22.4602 6.61276 22.2525 6.32778 21.8955C6.08012 21.5852 6.03492 21.2305 6.01785 21.0425C6 20.846 6.00005 20.6062 6.00009 20.371L6.0001 18.9918C5.60829 18.9789 5.27229 18.9461 4.96482 18.8637C3.58445 18.4938 2.50626 17.4156 2.13639 16.0353C1.9993 15.5236 1.99962 14.933 2.00005 14.1376L2.0001 7.7587C2.00008 6.95373 2.00007 6.28937 2.04429 5.74818C2.09022 5.18608 2.18878 4.66937 2.43607 4.18404C2.81956 3.43139 3.43149 2.81947 4.18413 2.43598C4.66947 2.18868 5.18617 2.09012 5.74827 2.04419C6.28946 1.99998 6.95383 1.99999 7.7588 2Z' fill='%23D6D6D6'/%3E%3C/svg%3E");
  }

  .headerIcon__alert::before {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2.1c4.02 0 6.9 3.28 6.9 7.53v1.6c0 .23.2.53.72 1.08l.27.27c1.08 1.1 1.51 1.73 1.51 2.75 0 .44-.05.79-.27 1.2-.45.88-1.42 1.37-2.87 1.37h-1.9c-.64 2.33-2.14 3.6-4.36 3.6-2.25 0-3.75-1.3-4.37-3.67l.02.07H5.74c-1.5 0-2.47-.5-2.9-1.41-.2-.4-.24-.72-.24-1.16 0-1.02.43-1.65 1.51-2.75l.27-.27c.53-.55.72-.85.72-1.08v-1.6C5.1 5.38 7.99 2.1 12 2.1Z' fill='%23D6D6D6'/%3E%3C/svg%3E");
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
    gap: 10px;
    padding: 0;
  }

  .accountUsername__name {
    color: #d6d6d6;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
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

  @media (max-width: 980px) {
    .blockLinksList {
      display: none;
    }

    #searchBar {
      margin-right: 12px;
    }
  }

  @media (max-width: 720px) {
    .pageContent {
      width: calc(100% - 12px);
    }

    .visitorTabs {
      gap: 10px;
    }

    .accountUsername__name {
      display: none;
    }
  }

  @media (max-width: 560px) {
    #searchBar {
      display: none;
    }
  }
</style>
