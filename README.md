# Forum Section Selector — Svelte

Компонент выбора раздела форума при создании темы.

## Структура проекта

```
forum-section-selector/
├── index.html                  # HTML точка входа для Vite
├── package.json
├── vite.config.js
├── svelte.config.js
└── src/
    ├── main.js                 # Точка входа JS
    ├── App.svelte              # Корневой компонент
    └── lib/
        ├── SectionSelector.svelte  # Главный компонент страницы
        ├── Card.svelte             # Компонент карточки раздела
        ├── SubPanel.svelte         # Компонент панели подразделов
        └── data/
            └── sections.js         # Все данные разделов и иконок
```

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать для продакшена
npm run build
```

## Использование компонента

```svelte
<script>
  import SectionSelector from './lib/SectionSelector.svelte';
</script>

<SectionSelector />
```

## Технологии

- **Svelte 5** — реактивный UI фреймворк
- **Vite 6** — сборщик
- **Manrope** — шрифт (Google Fonts)
