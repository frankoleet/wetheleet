<script>
  import ForumTreeNode from './ForumTreeNode.svelte';
  import { getCategorySidebarIcon } from './data/categorySidebarIcons.js';

  const t = {
    sections: '\u0420\u0430\u0437\u0434\u0435\u043b\u044b',
    search: '\u041f\u043e\u0438\u0441\u043a',
    searchLead: '\u041d\u0430\u0439\u0434\u0435\u043d\u043d\u044b\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438, \u0440\u0430\u0437\u0434\u0435\u043b\u044b \u0438 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b\u044b \u0440\u0430\u0441\u043a\u0440\u044b\u0442\u044b \u043f\u0440\u044f\u043c\u043e \u0432 \u0434\u0435\u0440\u0435\u0432\u0435.',
    treeLead: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043d\u0443\u0436\u043d\u044b\u0439 \u0440\u0430\u0437\u0434\u0435\u043b \u0438\u043b\u0438 \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u0435 \u0434\u043e\u0447\u0435\u0440\u043d\u0438\u0439 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b.',
    chooseCategory: '\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e \u0432\u044b\u0448\u0435.',
    emptyTitle: '\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e',
    emptyText: '\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 \u0438\u043b\u0438 \u043e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a.',
    categoryTitle: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
    categoryText: '\u041f\u043e\u0441\u043b\u0435 \u044d\u0442\u043e\u0433\u043e \u043d\u0438\u0436\u0435 \u043e\u0442\u043a\u0440\u043e\u0435\u0442\u0441\u044f \u0442\u043e \u0436\u0435 \u0434\u0435\u0440\u0435\u0432\u043e \u0432\u044b\u0431\u043e\u0440\u0430, \u0447\u0442\u043e \u0438 \u043d\u0430 \u041f\u041a.',
  };

  let {
    forumTree = [],
    activeCategory = null,
    activeCategoryId = null,
    selectedId = null,
    selectedPathIds = [],
    searchQuery = '',
    visibleNodes = [],
    effectiveExpandedIds = [],
    fullSearchResultsCount = 0,
    isReady = false,
    onPickCategory,
    onSelectNode,
  } = $props();
</script>

<section class="mobile-selector-shell">
  <div class="mobile-categories">
    {#each forumTree as category (category.id)}
      <button
        type="button"
        class:mobile-categories__button--active={!searchQuery.trim() && Boolean(selectedId) && activeCategoryId === category.id}
        onclick={() => onPickCategory?.(category.id)}
      >
        <span class="mobile-categories__icon" aria-hidden="true">
          {@html getCategorySidebarIcon(category.title)}
        </span>
        <strong>{category.title}</strong>
      </button>
    {/each}
  </div>

  <section class="mobile-tree-panel">
    <div class="panel-head">
      <div>
        <h2>{searchQuery.trim() ? `${t.search}: ${searchQuery.trim()}` : activeCategory?.title ?? t.sections}</h2>
      </div>
      {#if searchQuery.trim()}
        <span>{fullSearchResultsCount}</span>
      {/if}
    </div>

    <p class="mobile-tree-panel__lead">
      {#if searchQuery.trim()}
        {t.searchLead}
      {:else if activeCategory}
        {t.treeLead}
      {:else}
        {t.chooseCategory}
      {/if}
    </p>

    {#if !isReady}
      <div class="tree-skeleton">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    {:else if searchQuery.trim() && !visibleNodes.length}
      <div class="search-empty">
        <strong>{t.emptyTitle}</strong>
        <span>{t.emptyText}</span>
      </div>
    {:else if !searchQuery.trim() && !activeCategory}
      <div class="search-empty">
        <strong>{t.categoryTitle}</strong>
        <span>{t.categoryText}</span>
      </div>
    {:else}
      <ul class="tree-list tree-list--mobile">
        {#each visibleNodes as node (node.id)}
          <ForumTreeNode
            {node}
            {selectedId}
            expandedIds={effectiveExpandedIds}
            {selectedPathIds}
            {searchQuery}
            onSelect={onSelectNode}
          />
        {/each}
      </ul>
    {/if}
  </section>
</section>

<style>
  .mobile-selector-shell {
    display: grid;
    gap: 10px;
  }

  .mobile-categories {
    display: grid;
    gap: 8px;
  }

  .mobile-categories button {
    min-height: 38px;
    padding: 0 14px;
    border: 0;
    border-radius: 8px;
    background: #242424;
    background-position: center;
    color: #d6d6d6;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    transition: background 0.8s;
    cursor: pointer;
    user-select: none;
    -webkit-appearance: none;
  }

  .mobile-categories button:active {
    background: #323232 radial-gradient(circle, transparent 1%, #323232 1%) center/15000%;
  }

  .mobile-categories button:active {
    background-color: #3a3a3a;
    background-size: 100%;
    transition: background 0s;
  }

  .mobile-categories button:hover,
  .mobile-categories button:focus-visible {
    outline: none;
    background: #303030;
  }

  .mobile-categories__button--active {
    background: #17382a;
    color: #2fd48a;
  }

  .mobile-categories strong {
    font-size: 14px;
    line-height: 1.2;
    font-weight: 600;
    min-width: 0;
    flex: 1 1 auto;
  }

  .mobile-categories__icon {
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
    color: #6f7b74;
    transition: color 0.16s ease, transform 0.16s ease;
  }

  .mobile-categories__icon :global(svg) {
    width: 24px;
    height: 24px;
    display: block;
  }

  .mobile-categories button:hover .mobile-categories__icon,
  .mobile-categories button:focus-visible .mobile-categories__icon,
  .mobile-categories__button--active .mobile-categories__icon {
    color: currentColor;
    transform: translateX(1px);
  }

  .mobile-tree-panel {
    padding: 14px;
    border-radius: 10px;
    background: #1c1c1c;
    display: grid;
    gap: 12px;
  }

  .mobile-tree-panel .panel-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    margin-bottom: 0;
  }

  .mobile-tree-panel .panel-head h2 {
    margin: 0;
    color: #d6d6d6;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
  }

  .mobile-tree-panel .panel-head > span {
    min-width: 24px;
    color: #949494;
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  .mobile-tree-panel__lead {
    margin: 0;
    color: #949494;
    font-size: 14px;
    line-height: 1.45;
  }

  .tree-list--mobile {
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
    color: #d6d6d6;
  }

  .search-empty span {
    color: #898989;
    font-size: 12px;
    line-height: 1.4;
  }

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }
</style>
