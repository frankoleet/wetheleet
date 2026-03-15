function normalizeIconContent(value) {
  return `${value ?? ''}`.trim();
}

function makeGlyphSpan(content, variant) {
  return `<span class="lt-forum-icon__glyph lt-forum-icon__glyph--${variant}">${content}</span>`;
}

export function resolveForumIcon(iconContent, activeIconContent) {
  const base = normalizeIconContent(iconContent) || '&#xE000;';
  const active = normalizeIconContent(activeIconContent);

  if (active && active !== base) {
    return `
      <span class="lt-forum-icon lt-forum-icon--has-active" aria-hidden="true">
        ${makeGlyphSpan(base, 'base')}
        ${makeGlyphSpan(active, 'active')}
      </span>
    `;
  }

  return `
    <span class="lt-forum-icon" aria-hidden="true">
      ${makeGlyphSpan(base, 'base')}
    </span>
  `;
}

const themeMap = {
  default: {
    id: 'default',
    accent: '#2fd48a',
    accentBg: '#17382a',
    pathBg: 'rgba(47, 212, 138, 0.12)',
    hoverBg: '#242a27',
    hoverBorder: 'rgba(47, 212, 138, 0.24)',
    iconSurface: 'rgba(47, 212, 138, 0.12)',
  },
  games: {
    id: 'games',
    accent: '#6cb8ff',
    accentBg: '#1a2f49',
    pathBg: 'rgba(108, 184, 255, 0.13)',
    hoverBg: '#212b38',
    hoverBorder: 'rgba(108, 184, 255, 0.28)',
    iconSurface: 'rgba(108, 184, 255, 0.14)',
  },
};

for (const theme of Object.values(themeMap)) {
  theme.vars = [
    `--node-accent:${theme.accent}`,
    `--node-accent-bg:${theme.accentBg}`,
    `--node-path-bg:${theme.pathBg}`,
    `--node-hover-bg:${theme.hoverBg}`,
    `--node-hover-border:${theme.hoverBorder}`,
    `--node-icon-surface:${theme.iconSurface}`,
  ].join(';');
}

export function getForumTheme(rootCategoryId) {
  return Number(rootCategoryId) === 670 ? themeMap.games : themeMap.default;
}
