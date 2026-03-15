<script>
  import { onMount } from 'svelte';
  import ForumTopbar from './ForumTopbar.svelte';
  import ForumTreeNode from './ForumTreeNode.svelte';
  import MobileDrilldown from './MobileDrilldown.svelte';
  import {
    forumTree,
    forumMap,
    getNode,
    getPathNodes,
    searchForums,
    getForumCreateUrl,
    getForumUrl,
  } from './data/forumTree.js';

  const storageKey = 'forum-selector-recent';

  let isReady = $state(false);
  let searchQuery = $state('');
  let selectedId = $state(null);
  let activeCategoryId = $state(null);
  let expandedIds = $state([]);
  let recentIds = $state([]);
  let mobileCursorId = $state(null);

  function filterNodeForSearch(node, matchIds) {
    const visibleChildren = node.children
      .map((child) => filterNodeForSearch(child, matchIds))
      .filter(Boolean);

    if (!matchIds.has(node.id) && !visibleChildren.length) {
      return null;
    }

    return {
      ...node,
      children: visibleChildren,
      hasChildren: visibleChildren.length > 0,
    };
  }

  function collectVisibleBranchIds(nodes) {
    const ids = [];

    function visit(node) {
      if (!node?.hasChildren) return;
      ids.push(node.id);
      node.children.forEach(visit);
    }

    nodes.forEach(visit);
    return ids;
  }

  function syncUrl(forumId = selectedId) {
    const url = new URL(window.location.href);
    if (forumId) {
      url.searchParams.set('forum', `${forumId}`);
    } else {
      url.searchParams.delete('forum');
    }

    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function ensureExpanded(ids) {
    expandedIds = [...new Set([...expandedIds, ...ids.filter(Boolean)])];
  }

  function loadRecentIds() {
    try {
      recentIds = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    } catch {
      recentIds = [];
    }
  }

  function saveRecentId(id) {
    if (!id) return;
    recentIds = [id, ...recentIds.filter((entry) => entry !== id)].slice(0, 5);
    window.localStorage.setItem(storageKey, JSON.stringify(recentIds));
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const forumId = Number(params.get('forum'));
    const target = getNode(forumId);
    if (!target) return;

    const path = getPathNodes(target.id);
    selectedId = target.id;
    activeCategoryId = path[0]?.id ?? activeCategoryId;
    ensureExpanded(path.map((item) => item.id));
    mobileCursorId = target.hasChildren ? target.id : (path[0]?.id ?? null);
  }

  onMount(() => {
    loadRecentIds();
    hydrateFromUrl();

    const timer = window.setTimeout(() => {
      isReady = true;
    }, 140);

    return () => {
      window.clearTimeout(timer);
    };
  });

  const selectedNode = $derived(selectedId ? getNode(selectedId) : null);
  const selectedPath = $derived(selectedId ? getPathNodes(selectedId) : []);
  const selectedPathIds = $derived(selectedPath.map((item) => item.id));
  const selectedCreateHref = $derived(selectedNode?.canCreateThread ? getForumCreateUrl(selectedNode) : '');
  const selectedForumHref = $derived(selectedNode ? getForumUrl(selectedNode) : '');
  const selectedPathLabel = $derived(selectedPath.map((item) => item.title).join(' / '));
  const activeCategory = $derived(activeCategoryId ? getNode(activeCategoryId) : null);
  const breadcrumbTrail = $derived(selectedPath);
  const activeNodes = $derived(activeCategory?.children ?? []);
  const searchResults = $derived(searchForums(searchQuery, 14));
  const fullSearchResults = $derived(searchForums(searchQuery, forumMap.size));
  const searchMatchIds = $derived(new Set(fullSearchResults.map((node) => node.id)));
  const searchTreeNodes = $derived.by(() => {
    if (!searchQuery.trim()) return [];
    return forumTree.map((node) => filterNodeForSearch(node, searchMatchIds)).filter(Boolean);
  });
  const searchExpandedIds = $derived(collectVisibleBranchIds(searchTreeNodes));
  const visibleNodes = $derived(searchQuery.trim() ? searchTreeNodes : activeNodes);
  const effectiveExpandedIds = $derived(searchQuery.trim() ? searchExpandedIds : expandedIds);
  const recentForums = $derived(recentIds.map((id) => getNode(id)).filter(Boolean));
  const adminForums = $derived(
    ['Жизнь форума', 'Арбитраж']
      .map((title) => [...forumMap.values()].find((node) => node.title === title))
      .filter(Boolean)
  );
  const mobileNodes = $derived.by(() => {
    if (!mobileCursorId) return forumTree;
    return getNode(mobileCursorId)?.children ?? [];
  });
  const mobileHeading = $derived.by(() => {
    if (!mobileCursorId) return 'Выберите категорию';
    const current = getNode(mobileCursorId);
    if (!current) return 'Выберите раздел';
    return current.depth === 0 ? 'Выберите раздел' : 'Выберите подраздел';
  });
  const selectionHint = $derived.by(() => {
    if (!selectedNode) return 'Выберите раздел в дереве слева.';
    if (selectedNode.canCreateThread) return 'Раздел подходит. Кнопка откроет оригинальную страницу создания темы.';
    if (selectedNode.hasChildren) return 'В этом узле тему создавать нельзя. Выберите один из дочерних подразделов.';
    return 'В этом узле создание темы недоступно.';
  });
  const selectedDescription = $derived(selectedNode?.description || selectionHint);

  function selectNode(id, options = {}) {
    const node = getNode(id);
    if (!node) return;

    const path = getPathNodes(node.id);
    const ancestorIds = path.slice(0, -1).map((item) => item.id);
    selectedId = node.id;
    activeCategoryId = path[0]?.id ?? activeCategoryId;
    ensureExpanded(ancestorIds);

    if (options.expand && node.hasChildren) {
      ensureExpanded([node.id]);
    }

    if (node.hasChildren) {
      mobileCursorId = node.id;
    } else {
      mobileCursorId = path[0]?.id ?? null;
    }

    syncUrl(node.id);
  }

  function collectDescendantIds(node) {
    if (!node?.children?.length) return [];
    const ids = [];

    for (const child of node.children) {
      ids.push(child.id, ...collectDescendantIds(child));
    }

    return ids;
  }

  function collapseNode(id) {
    const node = getNode(id);
    if (!node) return;

    const relatedIds = [id, ...collectDescendantIds(node)];
    expandedIds = expandedIds.filter((entry) => !relatedIds.includes(entry));
  }

  function expandNode(id) {
    const node = getNode(id);
    if (!node) return;

    const siblingIds = (getNode(node.parentId)?.children ?? [])
      .map((child) => child.id)
      .filter((childId) => childId !== id);

    const siblingDescendants = siblingIds.flatMap((siblingId) => {
      const siblingNode = getNode(siblingId);
      return siblingNode ? [siblingId, ...collectDescendantIds(siblingNode)] : [];
    });

    expandedIds = [
      ...expandedIds.filter((entry) => !siblingDescendants.includes(entry)),
      id,
    ];
  }

  function handleNodeSelect(id) {
    const node = getNode(id);
    if (!node) return;

    const path = getPathNodes(node.id);
    const ancestorIds = path.slice(0, -1).map((item) => item.id);
    const isSelected = selectedId === id;

    activeCategoryId = path[0]?.id ?? activeCategoryId;

    if (node.hasChildren) {
      const isExpanded = expandedIds.includes(id);

      if (isSelected && isExpanded) {
        collapseNode(id);
        selectedId = null;
        mobileCursorId = path[0]?.id ?? null;
        syncUrl(null);
        return;
      }

      selectedId = id;
      ensureExpanded(ancestorIds);
      expandNode(id);
      mobileCursorId = node.id;
      syncUrl(node.id);
      return;
    }

    if (isSelected) {
      selectedId = null;
      syncUrl(null);
      return;
    }

    selectedId = node.id;
    ensureExpanded(ancestorIds);
    mobileCursorId = path[0]?.id ?? null;
    syncUrl(node.id);
  }

  function pickCategory(id) {
    const node = getNode(id);
    if (!node) return;

    activeCategoryId = node.id;
    selectedId = node.id;
    mobileCursorId = node.id;
    ensureExpanded([node.id]);
    syncUrl(node.id);
  }

  function clearSearch() {
    searchQuery = '';
  }

  function handleMobileBack() {
    if (!mobileCursorId) return;
    const current = getNode(mobileCursorId);
    if (!current) {
      mobileCursorId = null;
      return;
    }

    mobileCursorId = current.parentId ?? null;
  }

  function rememberSelection() {
    if (selectedNode?.canCreateThread) {
      saveRecentId(selectedNode.id);
    }
  }

</script>

<svelte:head>
  <title>Выберите раздел для новой темы</title>
</svelte:head>

<div class="shell">
  <ForumTopbar />

  <main class="page">
    <div class="page-head">
      <div class="breadcrumbs">
        <a href="/">Форум</a>
        <span>/</span>
        {#each breadcrumbTrail as item, index (item.id)}
          {#if index === breadcrumbTrail.length - 1}
            <strong>{item.title}</strong>
          {:else}
            <span>{item.title}</span>
            <span>/</span>
          {/if}
        {/each}
      </div>

      <div class="page-head__main">
        <div class="page-head__topic">
          <h1>Выберите тему</h1>
          <p class="page-head__topic-meta">
            Тема будет создана в разделе
            <strong>{selectedPathLabel || 'Выберите раздел'}</strong>
          </p>
        </div>
      </div>
    </div>

    <section class="control-bar">
      <label class="selector-search" aria-label="Поиск по разделам">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="5.4" stroke="currentColor" stroke-width="1.8" />
          <path d="m13.1 13.1 3.9 3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        <input type="search" bind:value={searchQuery} placeholder="Поиск по категориям, разделам и подразделам..." />
        {#if searchQuery}
          <button class="selector-search__clear" type="button" onclick={clearSearch} aria-label="Очистить поиск">×</button>
        {/if}
      </label>

      <div class="control-bar__meta">
        <span>Страница выбора раздела</span>
        <strong>{selectedNode?.canCreateThread ? 'Можно продолжать' : 'Нужно выбрать конечный раздел'}</strong>
      </div>
    </section>

    <section class="workspace">
        <aside class="category-panel">
          <div class="panel-head">
            <div>
              <div class="panel-head__eyebrow">Категории</div>
              <h2>Разделы форума</h2>
            </div>
            <span>{forumTree.length}</span>
          </div>

          <div class="category-list">
            {#each forumTree as category (category.id)}
              <button
                class="category-item"
                class:category-item--active={!searchQuery.trim() && Boolean(selectedId) && activeCategoryId === category.id}
                type="button"
                onclick={() => pickCategory(category.id)}
              >
                <span class="category-item__copy">
                  <strong>{category.title}</strong>
                  <span>{category.children.length} разделов</span>
                </span>
              </button>
            {/each}
          </div>

          {#if adminForums.length}
            <div class="category-extra">
              <div class="category-extra__title">Администрация форума</div>
              <div class="category-list category-list--extra">
                {#each adminForums as category (category.id)}
                  <button
                    class="category-item"
                    class:category-item--active={!searchQuery.trim() && (selectedId === category.id || (Boolean(selectedId) && activeCategoryId === category.id))}
                    type="button"
                    onclick={() => selectNode(category.id, { expand: true })}
                  >
                    <span class="category-item__copy">
                      <strong>{category.title}</strong>
                    </span>
                  </button>
                {/each}
              </div>
            </div>
          {/if}

        </aside>

        <section class="tree-panel">
          <div class="panel-head">
            <div>
              <h2>{searchQuery.trim() ? `Поиск: ${searchQuery.trim()}` : activeCategory?.title ?? 'Разделы'}</h2>
            </div>
            {#if searchQuery.trim()}
              <span>{fullSearchResults.length}</span>
            {/if}
          </div>

          <p class="tree-panel__lead">
            {#if searchQuery.trim()}
              Найденные категории, разделы и подразделы раскрыты прямо в дереве.
            {:else}
              Выберите нужный раздел или уточните дочерний подраздел. Если в узле нельзя создавать тему,
              справа появится подсказка, что нужно спуститься ниже.
            {/if}
          </p>

          {#if !isReady}
            <div class="tree-skeleton">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          {:else if searchQuery.trim() && !visibleNodes.length}
            <div class="search-empty">
              <strong>Ничего не найдено</strong>
              <span>Попробуйте изменить запрос или очистить поиск.</span>
            </div>
          {:else}
            <ul class="tree-list">
              {#each visibleNodes as node (node.id)}
                <ForumTreeNode
                  {node}
                  {selectedId}
                  expandedIds={effectiveExpandedIds}
                  {selectedPathIds}
                  searchQuery={searchQuery}
                  onSelect={handleNodeSelect}
                />
              {/each}
            </ul>
          {/if}
        </section>

        <aside class="action-panel">
          <div class="panel-head">
            <div>
              <h2>Создание темы</h2>
            </div>
          </div>

          <div class="action-panel__box">
            <strong>{selectedNode?.title ?? 'Сначала выберите раздел'}</strong>
            <p>{selectedDescription}</p>
          </div>

          <div class="action-panel__path">
            {#if selectedPath.length}
              {#each selectedPath as item, index (item.id)}
                <span>{item.title}</span>
                {#if index < selectedPath.length - 1}
                  <span class="action-panel__slash" aria-hidden="true">/</span>
                {/if}
              {/each}
            {:else}
              <span class="action-panel__path-empty">Категория / Раздел / Подраздел</span>
            {/if}
          </div>

          <div class="action-panel__meta">
            <div>
              <span>Тип</span>
              <strong>{selectedNode?.type ?? '—'}</strong>
            </div>
            <div>
              <span>Тем</span>
              <strong>{selectedNode ? new Intl.NumberFormat('ru-RU').format(selectedNode.threadCount) : '—'}</strong>
            </div>
          </div>

          {#if selectedCreateHref}
            <a class="action-panel__cta action-panel__cta--active" href={selectedCreateHref} onclick={rememberSelection}>
              Создать тему в «{selectedNode.title}»
            </a>
          {:else}
            <button class="action-panel__cta" type="button" disabled>Выберите конечный раздел</button>
          {/if}

          {#if selectedForumHref}
            <a class="action-panel__cta action-panel__cta--secondary" href={selectedForumHref}>
              Перейти в раздел
            </a>
          {/if}
        </aside>
    </section>

    <section class="mobile-selector">
      <div class="mobile-selector__head">
        <div class="breadcrumbs breadcrumbs--mobile">
          <a href="/">Форум</a>
          <span>/</span>
          <strong>Выбор раздела</strong>
        </div>

        <label class="selector-search" aria-label="Поиск по разделам">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="5.4" stroke="currentColor" stroke-width="1.8" />
            <path d="m13.1 13.1 3.9 3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <input type="search" bind:value={searchQuery} placeholder="Поиск..." />
        </label>
      </div>

      {#if searchQuery}
        <div class="search-results search-results--mobile">
          {#each searchResults as node (node.id)}
            <button class="search-result" type="button" onclick={() => selectNode(node.id, { expand: true })}>
              <span class="search-result__title">{node.title}</span>
              <span class="search-result__path">{node.pathLabel}</span>
            </button>
          {/each}
        </div>
      {:else if !mobileCursorId}
        <div class="mobile-categories">
          {#each forumTree as category (category.id)}
            <button type="button" onclick={() => pickCategory(category.id)}>
              <strong>{category.title}</strong>
              <span>{category.children.length} разделов</span>
            </button>
          {/each}
        </div>
      {:else}
        <MobileDrilldown
          heading={mobileHeading}
          nodes={mobileNodes}
          selectedPath={selectedPath}
          {selectedId}
          onSelect={(id) => selectNode(id, { expand: true })}
          onBack={handleMobileBack}
          formatCount={(value) => new Intl.NumberFormat('ru-RU').format(Number(value ?? 0))}
        />
      {/if}
    </section>
  </main>

  <div class="mobile-cta">
    <div class="mobile-cta__copy">
      <strong>{selectedNode?.title ?? 'Выберите раздел'}</strong>
      <span>{selectedPathLabel || 'Категория / Раздел / Подраздел'}</span>
    </div>

    {#if selectedCreateHref}
      <a href={selectedCreateHref} onclick={rememberSelection}>Создать тему</a>
    {:else}
      <button type="button" disabled>Выберите</button>
    {/if}
  </div>
</div>

<style>
  .shell {
    min-height: 100vh;
    background: var(--surface-app);
  }

  .page {
    width: min(var(--page-width), calc(100% - 24px));
    margin: 0 auto;
    padding: 62px 0 96px;
  }

  .page-head,
  .control-bar,
  .category-panel,
  .tree-panel,
  .action-panel,
  .mobile-selector {
    border: 0;
    background: var(--surface-panel);
    border-radius: 10px;
  }

  .page-head {
    margin-bottom: 12px;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .breadcrumbs {
    margin-bottom: 13px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.231;
    align-items: center;
  }

  .breadcrumbs a {
    color: #f0f0f0;
    text-decoration: none;
  }

  .breadcrumbs span {
    color: #f0f0f0;
  }

  .breadcrumbs strong {
    color: var(--accent);
    font-weight: 400;
  }

  .page-head__main {
    display: block;
  }

  .panel-head__eyebrow {
    margin-bottom: 6px;
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.15;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  .page-head__topic {
    padding: 18px 18px 17px;
    border-radius: 10px;
    background: var(--surface-panel);
  }

  .page-head__topic h1 {
    color: var(--text-primary);
    font-size: 18px;
    line-height: 1.2;
    font-weight: 700;
  }

  .page-head__topic-meta {
    margin-top: 8px;
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.45;
  }

  .page-head__topic-meta strong {
    color: var(--accent);
    font-weight: 400;
  }

  .control-bar {
    margin-bottom: 12px;
    background: transparent;
  }

  .selector-search {
    min-width: 0;
    height: 42px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #303030;
    border-radius: 10px;
    background: #242424;
    color: var(--accent);
  }

  .selector-search svg,
  .selector-search__clear {
    flex: 0 0 auto;
  }

  .selector-search svg {
    width: 16px;
    height: 16px;
  }

  .selector-search input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.2;
  }

  .selector-search input::placeholder {
    color: #8d8d8d;
  }

  .selector-search input::-webkit-search-cancel-button,
  .selector-search input::-webkit-search-decoration {
    appearance: none;
    -webkit-appearance: none;
    display: none;
  }

  .selector-search input::-ms-clear {
    display: none;
  }

  .selector-search__clear {
    width: 18px;
    height: 18px;
    border: 0;
    background: transparent;
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1;
  }

  .control-bar__meta {
    display: none;
  }

  .panel-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .panel-head h2 {
    color: var(--text-secondary);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
  }

  .panel-head > span {
    min-width: 24px;
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  .search-results {
    display: grid;
    gap: 8px;
  }

  .search-result {
    padding: 12px 14px;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    background: #282828;
    color: #fff;
    display: grid;
    gap: 4px;
    text-align: left;
  }

  .search-result:hover,
  .search-result:focus-visible {
    outline: none;
    border-color: rgba(43, 173, 114, 0.28);
    background: #2d2d2d;
  }

  .search-result__title {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.25;
  }

  .search-result__path {
    color: #8a8a8a;
    font-size: 12px;
    line-height: 1.35;
  }

  .search-empty {
    padding: 18px;
    border-radius: 10px;
    background: #282828;
    display: grid;
    gap: 5px;
  }

  .search-empty span {
    color: #898989;
    font-size: 12px;
    line-height: 1.4;
  }

  .workspace {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr) 300px;
    gap: 14px;
  }

  .category-panel,
  .tree-panel,
  .action-panel {
    padding: 15px 16px 16px;
  }

  .category-panel,
  .action-panel {
    position: sticky;
    top: 62px;
    align-self: start;
  }

  .category-panel .panel-head {
    margin-bottom: 14px;
  }

  .category-panel .panel-head > div {
    width: 100%;
  }

  .category-panel .panel-head h2 {
    color: #949494;
  }

  .category-panel .panel-head__eyebrow {
    display: none;
  }

  .category-panel .panel-head > span {
    display: none;
  }

  .category-list {
    display: grid;
    gap: 6px;
  }

  .category-extra {
    margin-top: 16px;
  }

  .category-extra__title {
    margin: 0 0 8px;
    color: #949494;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
  }

  .category-item {
    min-height: 40px;
    padding: 8px 14px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #ffffff;
    display: grid;
    place-items: center start;
    text-align: center;
  }

  .category-item:hover,
  .category-item:focus-visible {
    outline: none;
    background: #242424;
  }

  .category-item--active {
    background: #17382a;
    color: #2fd48a;
  }

  .category-item__copy strong,
  .category-item__copy span {
    display: block;
  }

  .category-item__copy {
    width: 100%;
    display: grid;
    place-items: center start;
  }

  .category-item__copy strong {
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.2;
    font-weight: 600;
    color: inherit;
    text-wrap: balance;
    transition: color 0.16s ease, text-shadow 0.16s ease;
    text-align: left;
    white-space: normal;
  }

  .category-item__copy span {
    display: none;
  }

  .category-item:hover .category-item__copy strong,
  .category-item:focus-visible .category-item__copy strong {
    color: #2fd48a;
  }

  .category-item--active .category-item__copy strong {
    color: #2fd48a;
  }

  .tree-panel .panel-head {
    margin-bottom: 8px;
  }

  .tree-panel__lead {
    margin: -2px 0 14px;
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.45;
  }

  .tree-list {
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .tree-skeleton {
    display: grid;
    gap: 7px;
  }

  .tree-skeleton div {
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(90deg, #242424, #303030, #242424);
    background-size: 220% 100%;
    animation: shimmer 1.2s linear infinite;
  }

  .action-panel__box {
    padding: 14px 15px;
    border-radius: 10px;
    background: #242424;
    display: grid;
    gap: 8px;
  }

  .action-panel__box strong {
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
  }

  .action-panel__box p {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.45;
  }

  .action-panel__path {
    margin: 12px 0 14px;
    padding: 12px 14px;
    border-radius: 10px;
    background: #242424;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 7px;
    color: #d6d6d6;
    font-size: 14px;
    line-height: 1.35;
  }

  .action-panel__slash {
    color: var(--text-muted);
  }

  .action-panel__path-empty {
    color: var(--text-muted);
  }

  .action-panel__meta {
    display: none;
  }

  .action-panel__cta {
    width: 100%;
    min-height: 36px;
    padding: 8px 14px;
    border: 0;
    border-radius: 8px;
    background: #303030;
    color: #d6d6d6;
    display: grid;
    place-items: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    overflow-wrap: anywhere;
    text-wrap: balance;
  }

  .action-panel__cta--secondary {
    margin-top: 8px;
    background: #303030;
    color: #d6d6d6;
  }

  .action-panel__cta--secondary:hover,
  .action-panel__cta--secondary:focus-visible {
    outline: none;
    background: #242424;
  }

  .action-panel__cta--active {
    color: #f5f5f5;
    background: linear-gradient(88deg, #1c6946 0.29%, #329c6c 51.58%, #1d8254 100%);
  }

  .action-panel__cta--active:hover,
  .action-panel__cta--active:focus-visible {
    outline: none;
    background: linear-gradient(88deg, #00ba78, #00ba78);
  }

  .mobile-selector,
  .mobile-cta {
    display: none;
  }

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }

  @media (max-width: 1080px) {
    .workspace {
      grid-template-columns: 240px minmax(0, 1fr);
    }

    .action-panel {
      position: static;
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 760px) {
    .page {
      width: calc(100% - 12px);
      padding-bottom: 116px;
      padding-top: 56px;
    }

    .workspace,
    .control-bar,
    .page-head {
      display: none;
    }

    .mobile-selector {
      display: grid;
      gap: 12px;
      padding: 14px;
    }

    .mobile-selector__head {
      display: grid;
      gap: 10px;
    }

    .breadcrumbs--mobile {
      font-size: 14px;
      line-height: 1.25;
    }

    .mobile-categories {
      display: grid;
      gap: 10px;
    }

    .mobile-categories button {
      min-height: 42px;
      padding: 0 14px;
      border: 0;
      border-radius: 10px;
      background: #242424;
      color: var(--text-secondary);
      display: grid;
      place-items: center start;
      text-align: left;
    }

    .mobile-categories span {
      display: none;
    }

    .search-results--mobile {
      display: grid;
      gap: 8px;
    }

    .mobile-cta {
      position: fixed;
      left: 10px;
      right: 10px;
      bottom: 10px;
      z-index: 50;
      padding: 12px;
      border-radius: 12px;
      background: rgba(20, 20, 20, 0.96);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(10px);
      display: grid;
      gap: 10px;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 10px;
      align-items: center;
    }

    .mobile-cta__copy {
      min-width: 0;
      display: grid;
      gap: 3px;
    }

    .mobile-cta__copy strong,
    .mobile-cta__copy span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mobile-cta__copy span {
      color: #848484;
      font-size: 12px;
      line-height: 1.25;
    }

    .mobile-cta a,
    .mobile-cta button {
      min-height: 38px;
      padding: 0 14px;
      border: 0;
      border-radius: 8px;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }

    .mobile-cta a {
      background: linear-gradient(88deg, #1c6946 0.29%, #329c6c 51.58%, #1d8254 100%);
    }

    .mobile-cta button:disabled {
      background: #303030;
      color: #d6d6d6bd;
    }
  }
</style>


