<script>
  let {
    heading = 'Выберите раздел',
    nodes = [],
    selectedPath = [],
    selectedId = null,
    onSelect,
    onBack,
    formatCount,
  } = $props();
</script>

<section class="mobile-drilldown">
  <div class="mobile-drilldown__head">
    <div>
      <h2>{heading}</h2>
      <div class="mobile-drilldown__path">
        {#if selectedPath.length}
          {#each selectedPath as item, index (item.id)}
            <span class:mobile-drilldown__path-active={selectedId === item.id}>{item.title}</span>
            {#if index < selectedPath.length - 1}
              <span>/</span>
            {/if}
          {/each}
        {:else}
          <span>Категория / Раздел</span>
        {/if}
      </div>
    </div>

    {#if selectedPath.length > 1}
      <button type="button" onclick={onBack}>Назад</button>
    {/if}
  </div>

  <div class="mobile-drilldown__list">
    {#each nodes as node (node.id)}
      <button
        class="mobile-drilldown__item"
        class:mobile-drilldown__item--selected={selectedId === node.id}
        type="button"
        style={node.themeVars}
        onclick={() => onSelect?.(node.id)}
      >
        {#if node.depth === 1}
          <span class="mobile-drilldown__item-icon" aria-hidden="true">
            {@html node.icon}
          </span>
        {/if}
        <span class="mobile-drilldown__item-copy">
          <span class="mobile-drilldown__item-title">{node.title}</span>
          <span class="mobile-drilldown__item-meta">
            {node.canCreateThread ? 'Можно создать тему' : node.hasChildren ? 'Есть подразделы' : 'Недоступно'}
            · {formatCount(node.threadCount)} тем
          </span>
        </span>
      </button>
    {/each}
  </div>
</section>

<style>
  .mobile-drilldown {
    padding: 14px;
    border-radius: 10px;
    background: #1c1c1c;
    display: grid;
    gap: 12px;
  }

  .mobile-drilldown__head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: start;
  }

  .mobile-drilldown__head h2 {
    margin: 0 0 6px;
    font-size: 16px;
    line-height: 1.2;
  }

  .mobile-drilldown__path {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    color: #7f7f7f;
    font-size: 12px;
    line-height: 1.35;
  }

  .mobile-drilldown__path-active {
    color: var(--accent);
  }

  .mobile-drilldown__head button {
    min-height: 34px;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: #303030;
    color: #d9d9d9;
    font-size: 13px;
    font-weight: 600;
  }

  .mobile-drilldown__list {
    display: grid;
    gap: 8px;
  }

  .mobile-drilldown__item {
    min-height: 44px;
    padding: 10px 14px;
    border: 0;
    border-radius: 10px;
    background: #242424;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    transition: background 0.16s ease, box-shadow 0.16s ease;
  }

  .mobile-drilldown__item:hover,
  .mobile-drilldown__item:focus-visible {
    outline: none;
    background: var(--node-hover-bg, #2c2c2c);
    box-shadow: inset 0 0 0 1px var(--node-hover-border, transparent);
  }

  .mobile-drilldown__item--selected {
    background: var(--node-accent-bg, #303030);
  }

  .mobile-drilldown__item-icon {
    width: 18px;
    height: 18px;
    background: transparent;
    color: #9a9a9a;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    overflow: hidden;
    transition: color 0.16s ease;
  }

  .mobile-drilldown__item-icon :global(svg) {
    width: 13px;
    height: 13px;
  }

  .mobile-drilldown__item-icon :global(.lt-forum-icon) {
    width: 13px;
    height: 13px;
    font-size: 13px;
  }

  .mobile-drilldown__item-copy {
    min-width: 0;
    display: grid;
    gap: 5px;
  }

  .mobile-drilldown__item-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
    color: inherit;
  }

  .mobile-drilldown__item-meta {
    color: #8a8a8a;
    font-size: 12px;
    line-height: 1.35;
  }

  .mobile-drilldown__item:hover .mobile-drilldown__item-title,
  .mobile-drilldown__item:focus-visible .mobile-drilldown__item-title,
  .mobile-drilldown__item--selected .mobile-drilldown__item-title,
  .mobile-drilldown__item:hover .mobile-drilldown__item-icon,
  .mobile-drilldown__item:focus-visible .mobile-drilldown__item-icon,
  .mobile-drilldown__item--selected .mobile-drilldown__item-icon {
    color: var(--node-accent, #35d78d);
  }

  .mobile-drilldown__item:hover .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base),
  .mobile-drilldown__item:focus-visible .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base),
  .mobile-drilldown__item--selected .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base) {
    opacity: 0;
  }

  .mobile-drilldown__item:hover .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active),
  .mobile-drilldown__item:focus-visible .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active),
  .mobile-drilldown__item--selected .mobile-drilldown__item-icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active) {
    opacity: 1;
  }
</style>
