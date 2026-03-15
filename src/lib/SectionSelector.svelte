<script>
  import { onMount } from 'svelte';
  import ForumTopbar from './ForumTopbar.svelte';
  import ForumTreeNode from './ForumTreeNode.svelte';
  import MobileSelector from './MobileSelector.svelte';
  import {
    forumTree,
    getNode,
    getPathNodes,
    searchForums,
    getForumCreateUrl,
    getForumUrl,
  } from './data/forumTree.js';

  const t = {
    life: '\u0416\u0438\u0437\u043d\u044c \u0444\u043e\u0440\u0443\u043c\u0430',
    arbitration: '\u0410\u0440\u0431\u0438\u0442\u0440\u0430\u0436',
    pageTitle: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043b \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0439 \u0442\u0435\u043c\u044b',
    forum: '\u0424\u043e\u0440\u0443\u043c',
    selectTopic: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043c\u0443',
    topicInSection: '\u0422\u0435\u043c\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435',
    chooseSection: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043b',
    searchAria: '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0440\u0430\u0437\u0434\u0435\u043b\u0430\u043c',
    searchPlaceholder: '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f\u043c, \u0440\u0430\u0437\u0434\u0435\u043b\u0430\u043c \u0438 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b\u0430\u043c...',
    mobileSearchPlaceholder: '\u041f\u043e\u0438\u0441\u043a...',
    clearSearch: '\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a',
    selectorPage: '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0432\u044b\u0431\u043e\u0440\u0430 \u0440\u0430\u0437\u0434\u0435\u043b\u0430',
    canContinue: '\u041c\u043e\u0436\u043d\u043e \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0442\u044c',
    needFinal: '\u041d\u0443\u0436\u043d\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043a\u043e\u043d\u0435\u0447\u043d\u044b\u0439 \u0440\u0430\u0437\u0434\u0435\u043b',
    forumSections: '\u0420\u0430\u0437\u0434\u0435\u043b\u044b \u0444\u043e\u0440\u0443\u043c\u0430',
    forumAdmin: '\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0444\u043e\u0440\u0443\u043c\u0430',
    sections: '\u0420\u0430\u0437\u0434\u0435\u043b\u044b',
    search: '\u041f\u043e\u0438\u0441\u043a',
    searchLead: '\u041d\u0430\u0439\u0434\u0435\u043d\u043d\u044b\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438, \u0440\u0430\u0437\u0434\u0435\u043b\u044b \u0438 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b\u044b \u0440\u0430\u0441\u043a\u0440\u044b\u0442\u044b \u043f\u0440\u044f\u043c\u043e \u0432 \u0434\u0435\u0440\u0435\u0432\u0435.',
    treeLead: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043d\u0443\u0436\u043d\u044b\u0439 \u0440\u0430\u0437\u0434\u0435\u043b \u0438\u043b\u0438 \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u0435 \u0434\u043e\u0447\u0435\u0440\u043d\u0438\u0439 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b. \u0415\u0441\u043b\u0438 \u0432 \u0443\u0437\u043b\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u0442\u0435\u043c\u0443, \u0441\u043f\u0440\u0430\u0432\u0430 \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u043f\u043e\u0434\u0441\u043a\u0430\u0437\u043a\u0430.',
    nothingFound: '\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e',
    changeQuery: '\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 \u0438\u043b\u0438 \u043e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a.',
    createTopic: '\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0442\u0435\u043c\u044b',
    chooseFirst: '\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043b',
    pathEmpty: '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f / \u0420\u0430\u0437\u0434\u0435\u043b / \u041f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b',
    createInSection: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0435\u043c\u0443 \u0432',
    chooseFinal: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043d\u0435\u0447\u043d\u044b\u0439 \u0440\u0430\u0437\u0434\u0435\u043b',
    goToSection: '\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b',
    sectionChoice: '\u0412\u044b\u0431\u043e\u0440 \u0440\u0430\u0437\u0434\u0435\u043b\u0430',
    mobileSummary: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0435\u043c\u0443 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435:',
    createTopicShort: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0435\u043c\u0443',
    chooseShort: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435',
    hintChooseLeft: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043b \u0432 \u0434\u0435\u0440\u0435\u0432\u0435 \u0441\u043b\u0435\u0432\u0430.',
    hintOk: '\u0420\u0430\u0437\u0434\u0435\u043b \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442. \u041a\u043d\u043e\u043f\u043a\u0430 \u043e\u0442\u043a\u0440\u043e\u0435\u0442 \u043e\u0440\u0438\u0433\u0438\u043d\u0430\u043b\u044c\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0442\u0435\u043c\u044b.',
    hintChild: '\u0412 \u044d\u0442\u043e\u043c \u0443\u0437\u043b\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0435\u043c\u0443 \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u0438\u043d \u0438\u0437 \u0434\u043e\u0447\u0435\u0440\u043d\u0438\u0445 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b\u043e\u0432.',
    hintBlocked: '\u0412 \u044d\u0442\u043e\u043c \u0443\u0437\u043b\u0435 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0442\u0435\u043c\u044b \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e.',
  };

  const storageKey = 'forum-selector-recent';
  const adminTitles = [t.life, t.arbitration];

  let isReady = $state(false);
  let searchQuery = $state('');
  let selectedId = $state(null);
  let activeCategoryId = $state(null);
  let expandedIds = $state([]);
  let recentIds = $state([]);

  function filterNodeForSearch(node, matchIds) {
    const visibleChildren = node.children
      .map((child) => filterNodeForSearch(child, matchIds))
      .filter(Boolean);

    if (!matchIds.has(node.id) && !visibleChildren.length) return null;

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
  }

  onMount(() => {
    loadRecentIds();
    hydrateFromUrl();

    const timer = window.setTimeout(() => {
      isReady = true;
    }, 140);

    return () => window.clearTimeout(timer);
  });

  const selectedNode = $derived(selectedId ? getNode(selectedId) : null);
  const selectedPath = $derived(selectedId ? getPathNodes(selectedId) : []);
  const selectedPathIds = $derived(selectedPath.map((item) => item.id));
  const selectedCreateHref = $derived(selectedNode?.canCreateThread ? getForumCreateUrl(selectedNode) : '');
  const selectedForumHref = $derived(selectedNode ? getForumUrl(selectedNode) : '');
  const selectedPathLabel = $derived(selectedPath.map((item) => item.title).join(' / '));
  const activeCategory = $derived(activeCategoryId ? getNode(activeCategoryId) : null);
  const activeNodes = $derived(activeCategory?.children ?? []);
  const breadcrumbTrail = $derived(selectedPath);
  const fullSearchResults = $derived(searchForums(searchQuery, 2000));
  const searchMatchIds = $derived(new Set(fullSearchResults.map((node) => node.id)));
  const searchTreeNodes = $derived.by(() => {
    if (!searchQuery.trim()) return [];
    return forumTree.map((node) => filterNodeForSearch(node, searchMatchIds)).filter(Boolean);
  });
  const searchExpandedIds = $derived(collectVisibleBranchIds(searchTreeNodes));
  const visibleNodes = $derived(searchQuery.trim() ? searchTreeNodes : activeNodes);
  const effectiveExpandedIds = $derived(searchQuery.trim() ? searchExpandedIds : expandedIds);
  const adminForums = $derived(
    adminTitles
      .map((title) => [...forumTree.flatMap((root) => [root, ...root.children])].find((node) => node.title === title))
      .filter(Boolean)
  );

  const selectionHint = $derived.by(() => {
    if (!selectedNode) return t.hintChooseLeft;
    if (selectedNode.canCreateThread) return t.hintOk;
    if (selectedNode.hasChildren) return t.hintChild;
    return t.hintBlocked;
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

    syncUrl(node.id);
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
        syncUrl(null);
        return;
      }

      selectedId = id;
      ensureExpanded(ancestorIds);
      expandNode(id);
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
    syncUrl(node.id);
  }

  function pickCategory(id) {
    const node = getNode(id);
    if (!node) return;

    activeCategoryId = node.id;
    selectedId = node.id;
    ensureExpanded([node.id]);
    syncUrl(node.id);
  }

  function clearSearch() {
    searchQuery = '';
  }

  function rememberSelection() {
    if (selectedNode?.canCreateThread) {
      saveRecentId(selectedNode.id);
    }
  }
</script>

<svelte:head>
  <title>{t.pageTitle}</title>
</svelte:head>

<div class="shell">
  <ForumTopbar />

  <main class="page">
    <div class="page-head">
      <div class="breadcrumbs">
        <a href="/">{t.forum}</a>
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

      <div class="page-head__topic">
        <h1>{t.selectTopic}</h1>
        <p class="page-head__topic-meta">
          {t.topicInSection}
          <strong>{selectedPathLabel || t.chooseSection}</strong>
        </p>
      </div>
    </div>

    <section class="control-bar">
      <label class="selector-search" aria-label={t.searchAria}>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="5.4" stroke="currentColor" stroke-width="1.8" />
          <path d="m13.1 13.1 3.9 3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        <input type="search" bind:value={searchQuery} placeholder={t.searchPlaceholder} />
        {#if searchQuery}
          <button class="selector-search__clear" type="button" onclick={clearSearch} aria-label={t.clearSearch}>×</button>
        {/if}
      </label>

      <div class="control-bar__meta">
        <span>{t.selectorPage}</span>
        <strong>{selectedNode?.canCreateThread ? t.canContinue : t.needFinal}</strong>
      </div>
    </section>

    <section class="workspace">
      <aside class="category-panel">
        <div class="panel-head">
          <div>
            <h2>{t.forumSections}</h2>
          </div>
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
              </span>
            </button>
          {/each}
        </div>

        {#if adminForums.length}
          <div class="category-extra">
            <div class="category-extra__title">{t.forumAdmin}</div>
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
            <h2>{searchQuery.trim() ? `${t.search}: ${searchQuery.trim()}` : activeCategory?.title ?? t.sections}</h2>
          </div>
          {#if searchQuery.trim()}
            <span>{fullSearchResults.length}</span>
          {/if}
        </div>

        <p class="tree-panel__lead">
          {#if searchQuery.trim()}
            {t.searchLead}
          {:else}
            {t.treeLead}
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
            <strong>{t.nothingFound}</strong>
            <span>{t.changeQuery}</span>
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
            <h2>{t.createTopic}</h2>
          </div>
        </div>

        <div class="action-panel__box">
          <strong>{selectedNode?.title ?? t.chooseFirst}</strong>
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
            <span class="action-panel__path-empty">{t.pathEmpty}</span>
          {/if}
        </div>

        {#if selectedCreateHref}
          <a class="action-panel__cta action-panel__cta--active" href={selectedCreateHref} onclick={rememberSelection}>
            {t.createInSection} "{selectedNode.title}"
          </a>
        {:else}
          <button class="action-panel__cta" type="button" disabled>{t.chooseFinal}</button>
        {/if}

        {#if selectedForumHref}
          <a class="action-panel__cta action-panel__cta--secondary" href={selectedForumHref}>
            {t.goToSection}
          </a>
        {/if}
      </aside>
    </section>

    <section class="mobile-page">
      <div class="breadcrumbs breadcrumbs--mobile">
        <a href="/">{t.forum}</a>
        <span>/</span>
        {#if selectedPath.length}
          {#each selectedPath as item, index (item.id)}
            {#if index === selectedPath.length - 1}
              <strong>{item.title}</strong>
            {:else}
              <span>{item.title}</span>
              <span>/</span>
            {/if}
          {/each}
        {:else}
          <strong>{activeCategory?.title ?? t.sectionChoice}</strong>
        {/if}
      </div>

      <div class="mobile-page__summary">
        <strong>{t.mobileSummary} {selectedNode?.title ?? t.chooseSection}</strong>
      </div>

      <div class="mobile-selector">
        <MobileSelector
          {forumTree}
          {activeCategory}
          {activeCategoryId}
          {selectedId}
          {selectedPathIds}
          {searchQuery}
          {visibleNodes}
          effectiveExpandedIds={effectiveExpandedIds}
          fullSearchResultsCount={fullSearchResults.length}
          {isReady}
          onPickCategory={pickCategory}
          onSelectNode={handleNodeSelect}
        />
      </div>
    </section>
  </main>

  <div class="mobile-cta">
    <div class="mobile-cta__copy">
      <strong>{selectedNode?.title ?? t.chooseSection}</strong>
      <span>{selectedPathLabel || t.pathEmpty}</span>
    </div>

    {#if selectedCreateHref}
      <a href={selectedCreateHref} onclick={rememberSelection}>{t.createTopicShort}</a>
    {:else}
      <button type="button" disabled>{t.chooseShort}</button>
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
  .mobile-page__summary,
  .mobile-selector {
    border: 0;
    background: var(--surface-panel);
    border-radius: 10px;
  }

  .page-head {
    margin-bottom: 12px;
    background: transparent;
  }

  .breadcrumbs {
    margin-bottom: 13px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.23;
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

  h1,
  h2,
  p {
    margin: 0;
  }

  .page-head__topic {
    padding: 18px;
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

  .selector-search__clear {
    width: 18px;
    height: 18px;
    border: 0;
    background: transparent;
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1;
  }

  .control-bar__meta {
    display: none;
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

  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
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
    text-align: left;
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

  .category-item__copy strong {
    font-size: 14px;
    line-height: 1.2;
    font-weight: 600;
    color: inherit;
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

  .search-empty {
    padding: 18px;
    border-radius: 10px;
    background: #282828;
    display: grid;
    gap: 5px;
  }

  .search-empty strong {
    color: #ffffff;
  }

  .search-empty span {
    color: #898989;
    font-size: 12px;
    line-height: 1.4;
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
    gap: 7px;
    align-items: center;
    color: #d6d6d6;
    font-size: 14px;
    line-height: 1.35;
  }

  .action-panel__slash,
  .action-panel__path-empty {
    color: var(--text-muted);
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
  }

  .action-panel__cta--secondary {
    margin-top: 8px;
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
    background: #00ba78;
  }

  .mobile-page,
  .mobile-cta {
    display: none;
  }

  .mobile-page {
    gap: 10px;
  }

  .mobile-page__summary {
    padding: 18px 16px;
    color: #f1f1f1;
    font-size: 15px;
    line-height: 1.32;
    font-weight: 700;
    border-radius: 8px;
    background: #1f1f1f;
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
      width: calc(100% - 16px);
      padding-top: 58px;
      padding-bottom: 116px;
    }

    .page-head,
    .control-bar,
    .workspace {
      display: none;
    }

    .mobile-page {
      display: grid;
      gap: 12px;
    }

    .breadcrumbs--mobile {
      margin-bottom: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.3;
    }

    .mobile-selector {
      padding: 14px;
      border-radius: 8px;
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
