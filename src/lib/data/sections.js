// Forum sections data
export const sections = [
  {
    label: 'Основная категория',
    cards: [
      {
        name: 'Халява', icon: '🎁',
        subs: [
          { name: 'Розыгрыши', children: ['Розыгрыши', 'Завершённые розыгрыши'] },
          { name: 'Раздачи баз' },
          { name: 'Раздачи аккаунтов, ключей' },
          { name: 'Раздачи игровых предметов' },
          { name: 'Раздачи прокси' },
          { name: 'Раздачи логов' },
          { name: 'Раздачи дедиков' },
          { name: 'Подарки в соц. сетях' },
          { name: 'Бесплатная накрутка' },
          { name: 'Промокоды' },
        ]
      },
      {
        name: 'Торговля', icon: '🛒',
        subs: [
          { name: 'Игры', children: ['Battle.net','miHoYo','Escape from Tarkov','Fortnite, Epic Games','Minecraft','Origin (EA)','PSN','SAMP','Social Club','Steam','Roblox','Supercell','Uplay','Valorant','Warface','World of Tanks','Другие игры'] },
          { name: 'Соц. сети' },
          { name: 'YouTube, Twitch' },
          { name: 'Discord' },
          { name: 'Кошельки, верификация' },
          { name: 'Почты' },
          { name: 'Акки с балансом, бонусами' },
          { name: 'Промокоды' },
          { name: 'Скрипты, боты' },
          { name: 'Приватный софт', children: ['Вторичка софта'] },
          { name: 'Приватные читы', children: ['Читы PUBG','Читы CS2','Читы Apex Legends','Читы Dota 2','Читы Rust','Читы Call of Duty','Читы Valorant','Вторичка читов'] },
          { name: 'Серверы, хостинги, AntiDDoS', children: ['Вторичка дедиков, хостингов'] },
          { name: 'Базы, запросы с почт' },
          { name: 'Логи' },
          { name: 'Вещи, техника' },
          { name: 'Прокси-серверы' },
          { name: 'Готовый бизнес' },
          { name: 'Оценка товара' },
          { name: 'Другое' },
        ]
      },
      {
        name: 'Работа и услуги', icon: '💼',
        subs: [
          { name: 'Фишинг' },
          { name: 'Траферы' },
          { name: 'Программирование', children: ['Поиск исполнителей'] },
          { name: 'Накрутка в соц. сетях', children: ['Поиск исполнителей'] },
          { name: 'Инсталлы, крипт' },
          { name: 'Хостинг, аренда магазина' },
          { name: 'Чек криптовалюты' },
          { name: 'Чек игрового инвентаря' },
          { name: 'Чек логов, баз', children: ['Поиск отработчиков'] },
          { name: 'Вязка каналов' },
          { name: 'Дизайн', children: ['Поиск исполнителей'] },
          { name: 'Сигны' },
          { name: 'Обмен средств', children: ['P2P обмены'] },
          { name: 'Буст аккаунтов' },
          { name: 'Пополнение баланса' },
          { name: 'Шип, рефанд' },
          { name: 'Учёба', children: ['Поиск исполнителей'] },
          { name: 'Озвучка' },
          { name: 'Приём смс' },
          { name: 'Задания за деньги' },
          { name: 'Реклама' },
          { name: 'Ищу работу' },
        ]
      },
      {
        name: 'Арбитраж', icon: '⚖️',
        subs: [
          { name: 'Решённые претензии' },
          { name: 'Неоплаченные претензии' },
        ]
      },
    ]
  },
  {
    label: 'Тематическая категория',
    cards: [
      { name: 'Тематические вопросы', icon: '❓' },
      { name: 'Спроси у ChatGPT', icon: '🤖' },
      {
        name: 'Статьи', icon: '📄',
        subs: [
          { name: 'Способы заработка' },
          { name: 'Авторские курсы' },
          { name: 'Криптовалюты' },
          { name: 'Социальная инженерия' },
          { name: 'Безопасность' },
          { name: 'SMM', children: ['SMM ВКонтакте', 'SMM Instagram'] },
          { name: 'Wi-Fi' },
          { name: 'Вирусология' },
          { name: 'Социальные сети' },
          { name: 'Работа с хэшами' },
          { name: 'Анонимность', children: ['Работа с дедиками'] },
          { name: 'Веб уязвимости' },
        ]
      },
      {
        name: 'Софт', icon: '🔧',
        subs: [
          { name: 'Ищу софт' },
          { name: 'Брут, чекеры' },
          { name: 'Private Keeper, BAS, OB' },
          { name: 'Прокси чекеры' },
          { name: 'Работа с базами' },
          { name: 'Работа с логами' },
          { name: 'Парсеры' },
          { name: 'Спамеры, бомберы' },
          { name: 'Авторегеры' },
          { name: 'Malware' },
          { name: 'Крипторы' },
        ]
      },
    ]
  },
  {
    label: 'Игровая категория',
    cards: [
      {
        name: 'PUBG', icon: null, gameColor: '#F5A623',
        subs: [
          { name: 'Читы PUBG', children: ['Приватные читы PUBG'] },
          { name: 'Гайды PUBG' },
        ]
      },
      {
        name: 'Counter-Strike 2', icon: null, gameColor: '#E8802A',
        subs: [
          { name: 'Читы CS2', children: ['Приватные читы CS2'] },
          { name: 'Гайды CS2' },
          { name: 'Конфиги CS2' },
        ]
      },
      {
        name: 'Dota 2', icon: null, gameColor: '#C23B22',
        subs: [
          { name: 'Баги, скрипты для Dota 2' },
          { name: 'Гайды, тактики по Dota 2' },
        ]
      },
      {
        name: 'Overwatch', icon: null, gameColor: '#FA9C1E',
        subs: [{ name: 'Гайды Overwatch' }]
      },
      {
        name: 'Fortnite', icon: null, gameColor: '#6BDFFF',
        subs: [
          { name: 'Читы Fortnite' },
          { name: 'Гайды Fortnite' },
          { name: 'Проблемы с игрой Fortnite' },
        ]
      },
      {
        name: 'Valorant', icon: null, gameColor: '#FF4655',
        subs: [
          { name: 'Читы Valorant', children: ['Приватные читы Valorant'] },
          { name: 'Гайды Valorant' },
          { name: 'Видео Valorant' },
          { name: 'Проблемы с игрой Valorant' },
        ]
      },
      {
        name: 'GTA', icon: null, gameColor: '#009A44',
        subs: [
          { name: 'GTA SAMP', children: ['Моды SAMP','Читы SAMP','Гайды SAMP','Видео SAMP','Проблемы с игрой SAMP'] },
          { name: 'GTA V', children: ['Читы, баги для GTA V','GTA V Моды','Видео GTA V','Гайды, тактики по GTA V','Проблемы с игрой GTA V'] },
        ]
      },
      {
        name: 'World of Tanks', icon: null, gameColor: '#FFB800',
        subs: [
          { name: 'Модификации World of Tanks' },
          { name: 'Гайды World of Tanks' },
          { name: 'Видео World of Tanks' },
        ]
      },
      {
        name: 'miHoYo', icon: null, gameColor: '#4A9EFF',
        subs: [
          { name: 'Genshin Impact', children: ['Гайды Genshin Impact','Проблемы с игрой Genshin Impact'] },
          { name: 'Honkai Star Rail', children: ['Гайды Honkai Star Rail','Проблемы с игрой Honkai Star Rail'] },
          { name: 'Zenless Zone Zero', children: ['Гайды Zenless Zone Zero','Проблемы с игрой Zenless Zone Zero'] },
          { name: 'Читы для игр miHoYo' },
        ]
      },
      {
        name: 'Deadlock', icon: null, gameColor: '#57A8D6',
        subs: [
          { name: 'Видео DeadLock' },
          { name: 'Гайды DeadLock' },
        ]
      },
      {
        name: 'Survival игры', icon: null, gameColor: '#7CB95A',
        subs: [
          { name: 'Rust', children: ['Приватные читы Rust','Проблемы с игрой Rust','Гайды Rust'] },
          { name: 'DayZ', children: ['Читы DayZ','Проблемы с игрой DayZ','Гайды DayZ'] },
          { name: 'Escape from Tarkov', children: ['Читы Escape from Tarkov','EFT: Arena','Гайды Escape from Tarkov','Проблемы с игрой Escape from Tarkov'] },
        ]
      },
      {
        name: 'Остальные игры', icon: null, gameColor: '#888888',
        subs: [
          { name: 'ARC Raiders' },
          { name: 'osu!', children: ['Гайды osu!','Карты и скины osu!','Проблемы с игрой osu!'] },
          { name: 'Supercell', children: ['Гайды Supercell'] },
          { name: 'FIFA', children: ['Гайды FIFA','Проблемы с игрой FIFA'] },
          { name: 'Team Fortress 2' },
          { name: 'Warface', children: ['Читы Warface','Баги Warface','Гайды Warface','Видео Warface','Проблемы с игрой Warface'] },
          { name: 'Apex Legends', children: ['Гайды Apex Legends','Читы Apex Legends','Проблемы с игрой Apex Legends','Баги, скрипты Apex Legends'] },
          { name: 'Dead by Daylight' },
          { name: 'Battlefield', children: ['Гайды Battlefield 2042','Видео Battlefield 2042','Гайды Battlefield 6','Видео Battlefield 6','Гайды Battlefield 1','Видео Battlefield 1'] },
          { name: 'The Finals' },
          { name: 'Call of Duty', children: ['Гайды Call of Duty','Читы Call of Duty','Проблемы с игрой Call of Duty'] },
          { name: 'League of Legends', children: ['Читы, баги для League of Legends','Гайды, тактики по LoL','Видео League of Legends','Проблемы с игрой League of Legends'] },
          { name: 'Minecraft', children: ['Читы, баги Minecraft','Гайды, рецепты Minecraft','Моды, текстуры для Minecraft','Серверы Minecraft','Видео Minecraft','Проблемы с игрой Minecraft'] },
          { name: 'S.T.A.L.K.E.R.', children: ['Сталкер: Тень Чернобыля','Сталкер: Чистое Небо','Сталкер: Зов Припяти','S.T.A.L.K.E.R. 2'] },
          { name: 'Rocket League', children: ['Гайды Rocket League','Видео Rocket League'] },
          { name: 'Roblox', children: ['Roblox Studio'] },
          { name: 'War Thunder' },
          { name: 'Rainbow Six Siege' },
          { name: 'VR игры', children: ['Гайды по VR играм','Проблемы с VR играми'] },
        ]
      },
    ]
  },
  {
    label: 'Общая категория',
    cards: [
      {
        name: 'Мигранты из Telegram', icon: '✈️',
        subs: [
          { name: 'Аниме' },{ name: 'Кино и мультфильмы' },{ name: 'Юмор' },
          { name: 'Учёба' },{ name: 'Нейросети' },{ name: 'Ваши истории' },
          { name: 'Спорт' },{ name: 'Авто, мото' },{ name: 'Кулинария' },
          { name: 'Слив фотографий 18+' },{ name: 'Ваше творчество' },
          { name: 'Ответы ЕГЭ и ОГЭ, ЗНО 2026' },{ name: 'Психология' },
          { name: 'Музыкальные утечки' },{ name: 'Конкурсы' },
        ]
      },
      {
        name: 'Компьютеры', icon: '🖥️',
        subs: [{ name: 'Девайсы' },{ name: 'Windows' },{ name: 'macOS' },{ name: 'Linux' }]
      },
      {
        name: 'Телефоны', icon: '📱',
        subs: [
          { name: 'iOS', children: ['Полезное ПО'] },
          { name: 'Android', children: ['Полезное ПО','Прошивки','Читы для Android игр'] },
        ]
      },
      {
        name: 'Веб-разработка', icon: '⚙️',
        subs: [
          { name: 'Frontend', children: ['Уроки','HTML шаблоны, лендинги'] },
          { name: 'Backend', children: ['Движки, фреймворки','Скрипты сайтов'] },
          { name: 'Ваши сайты' },
          { name: 'SEO, продвижение' },
        ]
      },
      {
        name: 'Программирование', icon: '⌨️',
        subs: [
          { name: 'Бесплатная разработка' },
          { name: 'Private Keeper, BAS, OB' },
          { name: 'Реверсинг / Assembler', children: ['CrackME / UnpackME','Уроки реверсинга'] },
          { name: 'Софт' },{ name: 'Python' },{ name: 'JS/TS' },
          { name: 'C/C++' },{ name: 'Rust' },{ name: 'C#' },
          { name: 'Go' },{ name: '1C' },{ name: 'Ваши работы' },
        ]
      },
      {
        name: 'Графика', icon: '🎨',
        subs: [
          { name: 'Бесплатная графика' },
          { name: 'Уроки', children: ['Работа с текстом','Уроки по анимациям'] },
          { name: 'Ресурсы', children: ['Исходники','Шрифты','Кисти, текстуры, градиенты'] },
          { name: 'Ваши работы' },{ name: 'Софт для графики' },{ name: 'Дизайн' },
        ]
      },
      {
        name: 'Жизнь форума', icon: '❤️',
        subs: [
          { name: 'Жалобы', children: ['Платные обжалования','Решённые жалобы'] },
          { name: 'Недочёты', children: ['Мобильное приложение','Рассмотренные недочёты мобильного приложения','Проблемы с загрузкой аккаунтов','Рассмотренные недочёты'] },
          { name: 'Предложения', children: ['Рассмотренные предложения'] },
          { name: 'Турниры' },
          { name: 'Гайды по форуму' },
          { name: 'Вопрос — Ответ', children: ['Рассмотренные вопросы'] },
          { name: 'Новости сайта' },{ name: 'Дополнения' },{ name: 'Интервью' },
        ]
      },
      { name: 'Тестовый раздел', icon: '🔌' },
    ]
  },
  {
    label: 'Пользовательские разделы',
    cards: [
      {
        name: 'Нора Хомяка', icon: '🐹',
        subs: [
          { name: 'Клуб Анонимных Хомяков' },{ name: 'Халява-Раздачи' },
          { name: 'Реклама в Профиле Пользователей' },{ name: 'Нестандартные вопросы' },
          { name: 'Эротика' },
        ]
      },
      { name: 'babybong вещает', icon: '💬' },
      {
        name: 'Раздел БИЛЛИ', icon: '📢',
        subs: [{ name: 'Telegram' }]
      },
      { name: 'Анонимные темы', icon: '👻' },
      { name: 'Бункер Roblox', icon: '🎮' },
      { name: 'HCP', icon: '🧪' },
    ]
  },
];

// Game SVG icons map
export const gameIcons = {
  'PUBG': `<svg viewBox="0 0 32 20" fill="currentColor"><text x="0" y="16" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" letter-spacing="1">PUBG</text></svg>`,
  'Counter-Strike 2': `<svg viewBox="0 0 24 24" fill="none"><path d="M5 3v18M5 12l9-9M5 12l9 9" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 3l5 4.5-5 4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Dota 2': `<svg viewBox="0 0 24 24" fill="none"><path d="M6 4h5c4.4 0 7 2.7 7 8s-2.6 8-7 8H6V4z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  'Overwatch': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="3" fill="currentColor"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  'Fortnite': `<svg viewBox="0 0 24 24" fill="none"><path d="M15 3H7l-2 9h6l-2 9 10-12h-6l2-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  'Valorant': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 4l9 16 9-16" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 4h6M15 4h6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>`,
  'GTA': `<svg viewBox="0 0 24 24" fill="none"><path d="M2 18h20M2 18V10l3-3v3l2-4v4l2-3v4l2-5v5l2-3v3l3-4v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'World of Tanks': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="16" height="7" rx="2" stroke="currentColor" stroke-width="2"/><rect x="6" y="8" width="10" height="4" rx="1" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="6" cy="18" r="1.5" fill="currentColor"/><circle cx="18" cy="18" r="1.5" fill="currentColor"/></svg>`,
  'miHoYo': `<svg viewBox="0 0 32 18" fill="currentColor"><text x="0" y="15" font-family="Arial,sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">mi</text></svg>`,
  'Deadlock': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="2"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>`,
  'Survival игры': `<svg viewBox="0 0 24 24" fill="none"><line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M19 5l-5 1 4 4 1-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 11c-2 2-3 4-2 5s3 0 5-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  'Остальные игры': `<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg>`,
};
