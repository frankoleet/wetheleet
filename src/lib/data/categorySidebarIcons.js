const iconMap = {
  'Основная категория': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M4.5 6.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7Z" stroke="currentColor" stroke-width="1.6"/>
      <path d="M7.2 8.1h5.6M7.2 10.2h5.6M7.2 12.3h3.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  `,
  'Тематическая категория': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="m10 3.9 1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L4.2 8.1l4-.6L10 3.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `,
  'Игровая категория': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M6.4 7.2h7.2a3 3 0 0 1 2.9 3.5l-.5 2.3a2.2 2.2 0 0 1-3.5 1.3L10.9 13a1.5 1.5 0 0 0-1.8 0l-1.6 1.3A2.2 2.2 0 0 1 4 13l-.5-2.3a3 3 0 0 1 2.9-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M7.1 10h2.4M8.3 8.8v2.4M12.8 9.2h.01M14.5 10.8h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </svg>
  `,
  'Общая категория': `
    <svg viewBox="0 0 20 20" fill="none">
      <rect x="4" y="4" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
      <rect x="11" y="4" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
      <rect x="4" y="11" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
      <rect x="11" y="11" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `,
  'Пользовательские разделы': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M7.2 9a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor" stroke-width="1.5"/>
      <path d="M12.9 8.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" stroke="currentColor" stroke-width="1.5"/>
      <path d="M4.5 15a3.3 3.3 0 0 1 5.4-2.6M10.6 15a2.6 2.6 0 0 1 4.3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  'Жизнь форума': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M10 15.8 5.2 11.2a3 3 0 0 1 4.2-4.3l.6.6.6-.6a3 3 0 1 1 4.2 4.3L10 15.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `,
  'Арбитраж': `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M10 4v10.8M6 5.5h8M7 14.8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="m6.2 7.2-2 3.2h4l-2-3.2Zm7.6 0-2 3.2h4l-2-3.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `,
  __default: `
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M5 6.2A2.2 2.2 0 0 1 7.2 4h5.6A2.2 2.2 0 0 1 15 6.2v7.6a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 13.8V6.2Z" stroke="currentColor" stroke-width="1.5"/>
      <path d="M7.7 8h4.6M7.7 10.4h4.6M7.7 12.8h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
};

export function getCategorySidebarIcon(title) {
  return iconMap[title] ?? iconMap.__default;
}
