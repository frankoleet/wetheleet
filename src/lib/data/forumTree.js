import forumSource from './forums.json';
import { getForumTheme, resolveForumIcon } from './forumIcons.js';

const scenarioDefinitions = [
  {
    id: 'sell',
    label: 'Хочу продать',
    hint: 'Торговые разделы, аккаунты, цифровые товары и сопутствующие витрины.',
    keywords: ['торгов', 'продаж', 'аккаунт', 'товар', 'маркет', 'магазин', 'ключ', 'промокод'],
  },
  {
    id: 'buy',
    label: 'Хочу купить',
    hint: 'Покупка, обмен и запросы на цифровые товары и игровые активы.',
    keywords: ['куп', 'обмен', 'оценка', 'товар', 'игры', 'кошел', 'промокод'],
  },
  {
    id: 'service',
    label: 'Нужна услуга',
    hint: 'Поиск исполнителей, дизайн, программирование, реклама и другие услуги.',
    keywords: ['услуг', 'работ', 'исполнитель', 'дизайн', 'реклама', 'программирован', 'озвучк', 'задания'],
  },
  {
    id: 'question',
    label: 'Хочу задать вопрос',
    hint: 'Вопросы сообществу, помощь, жалобы, обратная связь и обсуждения.',
    keywords: ['вопрос', 'спроси', 'помощ', 'жалоб', 'ответ', 'предлож', 'недочет', 'проблем'],
  },
  {
    id: 'article',
    label: 'Публикую статью',
    hint: 'Статьи, гайды, курсы и обучающие материалы.',
    keywords: ['стать', 'гайд', 'курс', 'урок', 'материал', 'обуч', 'ресурс'],
  },
  {
    id: 'software',
    label: 'Софт / программирование',
    hint: 'Софт, веб-разработка, языки программирования и технические ветки.',
    keywords: ['софт', 'программирован', 'python', 'js', 'typescript', 'frontend', 'backend', 'c#', 'go', 'rust', 'веб'],
  },
  {
    id: 'games',
    label: 'Игры',
    hint: 'Игровые разделы, гайды, проблемы, моды и контент по играм.',
    keywords: ['игр', 'pubg', 'cs2', 'dota', 'valorant', 'fortnite', 'gta', 'warface', 'minecraft'],
  },
  {
    id: 'other',
    label: 'Другое',
    hint: 'Пользовательские, общие и нишевые ветки, не попавшие в быстрые сценарии выше.',
    keywords: ['аноним', 'тест', 'жизнь форума', 'telegram', 'user', 'пользователь'],
  },
];

export function normalizeText(value) {
  return `${value ?? ''}`.trim().toLowerCase();
}

function compactNumber(value) {
  const number = Number(value ?? 0);
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(number >= 10_000_000 ? 0 : 1).replace('.0', '')}M`;
  }

  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(number >= 100_000 ? 0 : 1).replace('.0', '')}K`;
  }

  return `${number}`;
}

function makeReason(node) {
  if (node.permissions?.create_thread) {
    return 'Можно создавать тему прямо здесь.';
  }

  if (node.children.length) {
    return 'В этом разделе нельзя создать тему напрямую. Выберите дочерний подраздел.';
  }

  if (node.type === 'LinkForum') {
    return 'Это link-узел. Для публикации выберите связанный форум или соседний подраздел.';
  }

  return 'Создание темы здесь отключено. Выберите другой раздел.';
}

const sourceNodes = (forumSource?.data ?? []).flat();
const forumMap = new Map();
const forumTreeRoots = [];

sourceNodes.forEach((item, index) => {
  forumMap.set(item.forum_id, {
    id: item.forum_id,
    title: item.forum_title,
    description: item.forum_description?.trim() || '',
    parentId: item.parent_node_id || null,
    type: item.node_type_id,
    iconContent: item.icon_content,
    activeIconContent: item.active_icon_content,
    permissions: item.permissions ?? {},
    links: item.links ?? {},
    tabs: item.tabs ?? [],
    threadCount: item.forum_thread_count ?? 0,
    postCount: item.forum_post_count ?? 0,
    children: [],
    rawIndex: index,
  });
});

forumMap.forEach((node) => {
  if (node.parentId && forumMap.has(node.parentId)) {
    forumMap.get(node.parentId).children.push(node);
    return;
  }

  forumTreeRoots.push(node);
});

function finalizeNode(node, path = []) {
  node.children.sort((left, right) => left.rawIndex - right.rawIndex);
  node.depth = path.length;
  node.path = [...path, node.id];
  node.pathTitles = node.path.map((id) => forumMap.get(id)?.title).filter(Boolean);
  node.pathLabel = node.pathTitles.join(' → ');
  node.searchText = normalizeText([
    node.title,
    node.description,
    node.type,
    ...node.pathTitles,
  ].join(' '));
  node.canCreateThread = Boolean(node.permissions?.create_thread);
  node.hasChildren = node.children.length > 0;
  node.isCategory = node.type === 'Category';
  node.isLinkForum = node.type === 'LinkForum';
  node.rootCategoryId = node.path[0] ?? node.id;
  node.themeConfig = getForumTheme(node.rootCategoryId);
  node.theme = node.themeConfig.id;
  node.themeVars = node.themeConfig.vars;
  node.shortStats = `${compactNumber(node.threadCount)} тем`;
  node.reason = makeReason(node);
  node.icon = resolveForumIcon(node.iconContent, node.activeIconContent);
  node.children.forEach((child) => finalizeNode(child, node.path));
}

forumTreeRoots.sort((left, right) => left.rawIndex - right.rawIndex);
forumTreeRoots.forEach((root) => finalizeNode(root));

const createThreadNodes = [...forumMap.values()].filter((node) => node.canCreateThread);

function scoreMatch(node, tokens) {
  let score = 0;
  const title = normalizeText(node.title);
  const titleParts = title.split(/[\s.,/()[\]{}\-]+/).filter(Boolean);

  for (const token of tokens) {
    let matched = false;

    if (title.startsWith(token)) {
      score += 24;
      matched = true;
    }

    if (!matched && titleParts.some((part) => part.startsWith(token))) {
      score += 12;
      matched = true;
    }

    if (!matched) {
      return 0;
    }
  }

  if (node.canCreateThread) score += 4;
  if (!node.hasChildren) score += 2;

  return score;
}

function matchScenarioNodes(keywords) {
  const matches = createThreadNodes
    .map((node) => ({
      node,
      score: keywords.reduce((total, keyword) => total + (node.searchText.includes(keyword) ? 1 : 0), 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return right.node.threadCount - left.node.threadCount;
    })
    .slice(0, 8)
    .map((entry) => entry.node);

  const categoryIds = [...new Set(matches.map((node) => node.path[0]).filter(Boolean))];

  return {
    matches,
    categoryIds,
  };
}

export const quickScenarios = scenarioDefinitions.map((scenario) => {
  const result = matchScenarioNodes(scenario.keywords);
  return {
    ...scenario,
    forumIds: result.matches.map((node) => node.id),
    categoryIds: result.categoryIds,
    count: result.matches.length,
  };
});

export const forumTree = forumTreeRoots;
export { forumMap };

export function getNode(id) {
  return forumMap.get(Number(id)) ?? null;
}

export function getRootCategories() {
  return forumTreeRoots;
}

export function getPathNodes(id) {
  const node = getNode(id);
  if (!node) return [];
  return node.path.map((pathId) => getNode(pathId)).filter(Boolean);
}

export function searchForums(query, limit = 12) {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  const tokens = [...new Set(normalized.split(/\s+/).filter(Boolean))];
  if (!tokens.length) return [];

  return [...forumMap.values()]
    .map((node) => ({
      node,
      score: scoreMatch(node, tokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (right.node.canCreateThread !== left.node.canCreateThread) {
        return Number(right.node.canCreateThread) - Number(left.node.canCreateThread);
      }
      return right.node.threadCount - left.node.threadCount;
    })
    .slice(0, limit)
    .map((entry) => entry.node);
}

export function getPopularForums(limit = 6) {
  return [...createThreadNodes]
    .sort((left, right) => right.threadCount - left.threadCount)
    .slice(0, limit);
}

export function getRecommendedForums({ activeCategoryId = null, scenarioId = null, selectedId = null } = {}) {
  const selected = getNode(selectedId);
  const scenario = quickScenarios.find((item) => item.id === scenarioId);

  if (scenario?.forumIds?.length) {
    return scenario.forumIds.map((id) => getNode(id)).filter(Boolean).slice(0, 6);
  }

  if (selected?.hasChildren) {
    return selected.children.filter((node) => node.canCreateThread || node.hasChildren).slice(0, 6);
  }

  if (selected?.parentId) {
    const parent = getNode(selected.parentId);
    if (parent) {
      return parent.children.filter((node) => node.id !== selected.id).slice(0, 6);
    }
  }

  if (activeCategoryId) {
    const root = getNode(activeCategoryId);
    if (root) {
      return root.children.slice(0, 6);
    }
  }

  return getPopularForums(6);
}

export function getForumCreateUrl(node) {
  if (!node) return '';
  const permalink = node.links?.permalink;
  if (permalink) {
    return new URL('create-thread', permalink).toString();
  }

  return `/forums/${node.id}/create-thread`;
}

export function getForumUrl(node) {
  if (!node) return '';
  return node.links?.permalink || `/forums/${node.id}`;
}
