# Forum Section Selector

Страница выбора разделов форума на Svelte 5 и Vite.

## Структура проекта

```text
forum-section-selector/
|-- index.html
|-- package.json
|-- package-lock.json
|-- svelte.config.js
|-- vite.config.js
|-- vercel.json
`-- src/
    |-- App.svelte
    |-- global.css
    |-- main.js
    `-- lib/
        |-- ForumTopbar.svelte
        |-- ForumTreeNode.svelte
        |-- MobileDrilldown.svelte
        |-- SectionSelector.svelte
        `-- data/
            |-- forumTree.js
            `-- forums.json
```

## Команды

```bash
npm install
npm run dev
npm run build
```

## Деплой

Для Vercel уже добавлен `vercel.json`, а production-сборка создается в папке `dist/`.
