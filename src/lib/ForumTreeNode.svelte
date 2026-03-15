<script>
  import ForumTreeNode from './ForumTreeNode.svelte';

  let {
    node,
    selectedId = null,
    expandedIds = [],
    selectedPathIds = [],
    searchQuery = '',
    onSelect,
    level = 0,
  } = $props();

  function escapeHtml(value) {
    return `${value ?? ''}`
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function highlight(value, query) {
    const text = `${value ?? ''}`;
    const normalized = query.trim();
    if (!normalized) return escapeHtml(text);
    const tokens = [...new Set(normalized.split(/\s+/).filter(Boolean))];
    if (!tokens.length) return escapeHtml(text);
    const pattern = tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    return escapeHtml(text).replace(new RegExp(`(${pattern})`, 'giu'), '<mark>$1</mark>');
  }

  const expanded = $derived(expandedIds.includes(node.id));
  const selected = $derived(selectedId === node.id);
  const inPath = $derived(selectedPathIds.includes(node.id));
  const showChildren = $derived(node.hasChildren && expanded);
  const isLeaf = $derived(node.canCreateThread);
  const nested = $derived(level > 0);
  const topLevel = $derived(level === 0);

  function handleClick() {
    onSelect?.(node.id);
  }
</script>

<li class="tree-node" class:tree-node--nested={nested} class:tree-node--top={topLevel}>
  <button
    class="tree-node__button"
    class:tree-node__button--selected={selected}
    class:tree-node__button--path={inPath && !selected}
    class:tree-node__button--leaf={isLeaf}
    class:tree-node__button--branch={node.hasChildren}
    class:tree-node__button--nested={nested}
    class:tree-node__button--top={topLevel}
    type="button"
    style={node.themeVars}
    onclick={handleClick}
    aria-current={selected ? 'true' : undefined}
    aria-expanded={node.hasChildren ? showChildren : undefined}
  >
    <span class="tree-node__start">
      {#if nested}
        <span class="tree-node__marker" aria-hidden="true"></span>
      {:else}
        <span class="tree-node__icon" aria-hidden="true">
          {@html node.icon}
        </span>
      {/if}

      <span class="tree-node__title" class:tree-node__title--leaf={isLeaf}>
        {@html highlight(node.title, searchQuery)}
      </span>
    </span>

    {#if node.hasChildren}
      <span class="tree-node__end" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none">
          <path d="m2 4 4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    {/if}
  </button>

  {#if showChildren}
    <div class="tree-node__inset" class:tree-node__inset--top={topLevel}>
      <ul class="tree-node__children">
        {#each node.children as child (child.id)}
          <ForumTreeNode
            node={child}
            {selectedId}
            {expandedIds}
            {selectedPathIds}
            {searchQuery}
            {onSelect}
            level={level + 1}
          />
        {/each}
      </ul>
    </div>
  {/if}
</li>

<style>
  .tree-node {
    list-style: none;
  }

  .tree-node__button {
    width: 100%;
    min-height: 42px;
    padding: 0 14px;
    border: 0;
    border-radius: 10px;
    background: #242424;
    color: #d6d6d6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    text-align: left;
    transition: background 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;
  }

  .tree-node__button:hover,
  .tree-node__button:focus-visible {
    background: var(--node-hover-bg, #303030);
    box-shadow: inset 0 0 0 1px var(--node-hover-border, transparent);
    outline: none;
  }

  .tree-node__button--selected {
    background: var(--node-accent-bg, #17382a);
    color: var(--node-accent, #2fd48a);
  }

  .tree-node__button--path {
    background: var(--node-path-bg, #2b2b2b);
    color: var(--node-accent, #2fd48a);
  }

  .tree-node__button--leaf {
    background: #242424;
  }

  .tree-node__button--top {
    min-height: 48px;
    padding: 0 15px;
    border-radius: 10px;
    background: #242424;
  }

  .tree-node__button--nested {
    min-height: 36px;
    padding: 0 12px;
    border-radius: 8px;
    background: #242424;
  }

  .tree-node__button--nested.tree-node__button--leaf {
    background: #242424;
  }

  .tree-node__button--nested.tree-node__button--selected {
    background: var(--node-accent-bg, #17382a);
  }

  .tree-node__start {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .tree-node__icon {
    width: 20px;
    height: 20px;
    background: transparent;
    display: grid;
    place-items: center;
    color: #949494;
    flex: 0 0 auto;
    overflow: hidden;
    transition: color 0.16s ease;
  }

  .tree-node__icon :global(svg) {
    width: 15px;
    height: 15px;
  }

  .tree-node__icon :global(.lt-forum-icon) {
    width: 15px;
    height: 15px;
    font-size: 15px;
  }

  .tree-node__marker {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #707070;
    flex: 0 0 auto;
    transition: background 0.16s ease;
  }

  .tree-node__title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 1.25;
    font-weight: 600;
    color: inherit;
    transition: color 0.16s ease;
  }

  .tree-node__button--nested .tree-node__title {
    font-size: 14px;
    font-weight: 600;
  }

  .tree-node__button--top .tree-node__title {
    font-size: 14px;
    font-weight: 700;
  }

  .tree-node__title--leaf {
    color: inherit;
  }

  .tree-node__button--path .tree-node__title {
    color: var(--node-accent, #2fd48a);
  }

  .tree-node__button--path .tree-node__marker {
    background: var(--node-accent, #31d98d);
  }

  .tree-node__button:hover .tree-node__title,
  .tree-node__button:focus-visible .tree-node__title {
    color: var(--node-accent, #31d98d);
  }

  .tree-node__button:hover .tree-node__marker,
  .tree-node__button:focus-visible .tree-node__marker,
  .tree-node__button--selected .tree-node__marker {
    background: var(--node-accent, #31d98d);
  }

  .tree-node__button:hover .tree-node__icon,
  .tree-node__button:focus-visible .tree-node__icon {
    color: var(--node-accent, #31d98d);
  }

  .tree-node__button--selected .tree-node__title {
    color: var(--node-accent, #2fd48a);
  }

  .tree-node__button--selected .tree-node__icon {
    color: var(--node-accent, #2fd48a);
  }

  .tree-node__button:hover .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base),
  .tree-node__button:focus-visible .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base),
  .tree-node__button--selected .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--base) {
    opacity: 0;
  }

  .tree-node__button:hover .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active),
  .tree-node__button:focus-visible .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active),
  .tree-node__button--selected .tree-node__icon :global(.lt-forum-icon--has-active .lt-forum-icon__glyph--active) {
    opacity: 1;
  }

  .tree-node__end {
    width: 28px;
    height: 28px;
    margin-left: auto;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    color: #8d8d8d;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
  }

  .tree-node__end svg {
    width: 11px;
    height: 11px;
    transition: transform 0.16s ease, color 0.16s ease;
  }

  .tree-node__button[aria-expanded='true'] .tree-node__end svg {
    transform: rotate(180deg);
  }

  .tree-node__button:hover .tree-node__end,
  .tree-node__button:focus-visible .tree-node__end {
    color: #b8b8b8;
  }

  .tree-node__children {
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .tree-node__inset {
    margin-top: 8px;
    margin-left: 14px;
    padding: 10px;
    border-radius: 10px;
    background: #1f1f1f;
  }

  .tree-node__inset--top {
    margin-left: 0;
    padding: 10px;
  }

  :global(mark) {
    background: rgba(47, 212, 138, 0.18);
    color: inherit;
    padding: 0 0.14em;
    border-radius: 0.2em;
  }
</style>
