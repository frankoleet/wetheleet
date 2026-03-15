<script>
  let { subs = [], onselect } = $props();

  let openChildId = $state(null);
  let selectedSub = $state(null);

  function selectSub(sub) {
    openChildId = openChildId === sub.name ? null : (sub.children ? sub.name : null);
    selectedSub = sub.name;
    onselect(sub.name);
  }

  function selectChild(child) {
    selectedSub = child;
    onselect(child);
  }
</script>

<div class="sub-tags-wrap">
  {#each subs as sub}
    <button
      class="sub-tag"
      class:has-children={sub.children}
      class:child-open={openChildId === sub.name}
      class:selected-sub={selectedSub === sub.name}
      onclick={() => selectSub(sub)}
    >
      {sub.name}{#if sub.children}<span class="arrow">▾</span>{/if}
    </button>
  {/each}
</div>

{#if openChildId}
  {#each subs as sub}
    {#if sub.name === openChildId && sub.children}
      <div class="sub-children-wrap">
        <div class="sub-children-inner">
          <div class="sub-children-label">{sub.name}</div>
          <div class="sub-children-grid">
            {#each sub.children as child}
              <button
                class="sub-child-tag"
                class:selected-child={selectedSub === child}
                onclick={() => selectChild(child)}
              >{child}</button>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  {/each}
{/if}

<style>
.sub-tags-wrap { display: flex; flex-wrap: wrap; gap: 7px; }
.sub-tag {
  flex: 0 0 auto; background: #2a2a2a; border: 1px solid #383838;
  color: #a0a0a0; border-radius: 9px; padding: 11px 18px;
  font-size: 13px; font-weight: 600; font-family: 'Manrope', sans-serif;
  cursor: pointer; transition: background .15s, border-color .15s, color .15s; white-space: nowrap;
}
.sub-tag:hover { background: #505050; border-color: #2BAD72; color: #2BAD72; }
.sub-tag.selected-sub, .sub-tag.child-open { background: #1e3329; border-color: #2BAD72; color: #2BAD72; }
.arrow { margin-left: 4px; font-size: 10px; opacity: .6; }

.sub-children-wrap { margin-top: 8px; animation: fadeIn .2s ease; }
.sub-children-inner { background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 9px; padding: 12px 14px; }
.sub-children-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #606060; margin-bottom: 10px; }
.sub-children-grid { display: flex; flex-wrap: wrap; gap: 6px; }

.sub-child-tag {
  flex: 0 0 auto; background: #252525; border: 1px solid #363636;
  color: #a0a0a0; border-radius: 8px; padding: 10px 16px;
  font-size: 12px; font-weight: 600; font-family: 'Manrope', sans-serif;
  cursor: pointer; transition: background .15s, border-color .15s, color .15s; white-space: nowrap;
}
.sub-child-tag:hover, .sub-child-tag.selected-child { background: #1e3329; border-color: #2BAD72; color: #2BAD72; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
</style>
