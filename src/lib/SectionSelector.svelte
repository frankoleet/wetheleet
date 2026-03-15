<script>
  import { sections } from './data/sections.js';
  import Card from './Card.svelte';
  import SubPanel from './SubPanel.svelte';

  let searchQuery = $state('');
  let selectedCard = $state(null);
  let expandedCard = $state(null);
  let selectedSub = $state(null);

  let q = $derived(searchQuery.trim().toLowerCase());

  let filteredSections = $derived(
    sections.map(section => ({
      ...section,
      cards: section.cards.filter(card =>
        !q || card.name.toLowerCase().includes(q)
      )
    })).filter(s => s.cards.length > 0)
  );

  let displayLabel = $derived(
    selectedSub
      ? `${selectedCard?.cardName} → ${selectedSub}`
      : (selectedCard?.cardName ?? null)
  );

  function handleCardClick(card) {
    const isExpanded = expandedCard === card.name;
    const hasSubs = card.subs?.length > 0;

    if (hasSubs) {
      if (isExpanded) {
        expandedCard = null;
        selectedCard = null;
        selectedSub = null;
      } else {
        expandedCard = card.name;
        selectedCard = { cardName: card.name };
        selectedSub = null;
      }
    } else {
      expandedCard = null;
      const alreadySelected = selectedCard?.cardName === card.name;
      selectedCard = alreadySelected ? null : { cardName: card.name };
      selectedSub = null;
    }
  }

  function handleSubSelect(subName) {
    selectedSub = subName;
  }

  function confirmSelection() {
    if (!displayLabel) return;
    alert('✅ ' + displayLabel);
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <header class="header">
    <div class="header-left">
      <div class="logo-mark">
        <svg viewBox="0 0 28 22" fill="none">
          <path d="M5 10 L5 4 L9 8 L14 2 L19 8 L23 4 L23 10" fill="white"/>
          <path d="M2 14 C6 8 22 8 26 14 C22 20 6 20 2 14 Z" fill="white"/>
          <circle cx="14" cy="14" r="3.5" fill="#2BAD72"/>
          <circle cx="14" cy="14" r="1.5" fill="#1a7a4f"/>
        </svg>
      </div>
      <div>
        <div class="page-title">Выберите раздел</div>
        <div class="page-sub">Выберите тематику для новой темы</div>
      </div>
    </div>

    <div class="search-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        class="search-input"
        type="text"
        placeholder="Поиск разделов..."
        bind:value={searchQuery}
      />
    </div>

    {#if displayLabel}
      <button class="cta-btn cta-desktop" onclick={confirmSelection}>
        <span class="cta-section-name">{displayLabel}</span>
        <span class="cta-action">Создать тему в этом разделе →</span>
      </button>
    {/if}
  </header>

  <div class="content">
    {#if filteredSections.length === 0}
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>Ничего не найдено</span>
      </div>
    {/if}

    {#each filteredSections as section, si (section.label)}
      <div class="section-group" style="animation-delay:{si * 0.05}s">
        <div class="section-label">{section.label}</div>

        <div class="cards-grid">
          {#each section.cards as card (card.name)}
            <Card
              {card}
              selected={selectedCard?.cardName === card.name}
              expanded={expandedCard === card.name}
              onselect={handleCardClick}
            />
          {/each}
        </div>

        {#each section.cards as card (card.name + '-panel')}
          {#if card.subs?.length && expandedCard === card.name}
            <div class="sub-panel">
              <div class="sub-panel-inner">
                <div class="sub-panel-title">Выберите подраздел — {card.name}</div>
                <SubPanel subs={card.subs} onselect={handleSubSelect} />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/each}

    {#if displayLabel}
      <div class="cta-bar">
        <button class="cta-btn cta-mobile" onclick={confirmSelection}>
          <span class="cta-section-name">{displayLabel}</span>
          <span class="cta-action">Создать тему в этом разделе →</span>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(body) { background: #303030; font-family: 'Manrope', sans-serif; color: #fff; min-height: 100vh; padding: 32px 16px; }

  .page { position: relative; max-width: 1100px; margin: 0 auto; background: #272727; border-radius: 14px; padding: 36px 32px 48px; }

  .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; gap: 16px; flex-wrap: wrap; }
  .header-left { display: flex; align-items: center; gap: 14px; }
  .logo-mark { width: 40px; height: 40px; background: #2BAD72; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .logo-mark svg { width: 26px; height: 22px; }
  .page-title { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
  .page-sub { font-size: 13px; color: #a0a0a0; margin-top: 2px; font-weight: 500; }

  .search-wrap { position: relative; flex: 1; max-width: 360px; min-width: 200px; }
  .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #606060; pointer-events: none; }
  .search-input { width: 100%; background: #2D2D2D; border: 1px solid #363636; border-radius: 8px; padding: 10px 14px 10px 40px; font-size: 14px; font-family: 'Manrope', sans-serif; color: #fff; outline: none; transition: border-color .2s, box-shadow .2s; }
  .search-input::placeholder { color: #606060; }
  .search-input:focus { border-color: #2BAD72; box-shadow: 0 0 0 3px rgba(43,173,114,0.08); }

  .cta-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; background: #1e3329; border: 1px solid #2BAD72; color: #2BAD72; border-radius: 10px; cursor: pointer; font-family: 'Manrope', sans-serif; text-align: center; transition: background .15s, box-shadow .2s, transform .15s; }
  .cta-btn:hover { background: #24402f; box-shadow: 0 0 0 1px #2BAD72; transform: translateY(-1px); }
  .cta-section-name { font-size: 11px; font-weight: 600; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .cta-action { font-size: 13px; font-weight: 700; white-space: nowrap; }
  .cta-desktop { padding: 8px 16px 9px; max-width: 280px; flex-shrink: 0; }
  .cta-mobile { display: none; }

  .section-group { background: #232323; border-radius: 12px; padding: 18px 18px 14px; margin-bottom: 7px; border: 1px solid #2e2e2e; animation: fadeIn .3s ease both; }
  .section-label { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #2BAD72; margin-bottom: 12px; }
  .section-label::after { content: ''; flex: 1; height: 1px; background: #363636; }
  .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }

  .sub-panel { margin-top: 8px; background: #1c1c1c; border: 1px solid #2e2e2e; border-radius: 10px; animation: fadeIn .2s ease; }
  .sub-panel-inner { padding: 16px 18px; }
  .sub-panel-title { font-size: 10px; font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase; color: #606060; margin-bottom: 12px; }

  .cta-bar { display: none; }
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 60px 20px; color: #606060; font-size: 14px; }
  .empty-state svg { width: 40px; height: 40px; opacity: .3; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 700px) {
    .cards-grid { grid-template-columns: repeat(2, 1fr); }
    .header { gap: 12px; }
    .search-wrap { max-width: 100%; min-width: 0; flex: 1 1 100%; order: 3; }
    .cta-desktop { display: none; }
    .cta-bar { display: flex; position: sticky; bottom: 16px; justify-content: center; padding: 0 0 4px; margin-top: 16px; pointer-events: none; }
    .cta-mobile { display: flex; pointer-events: all; background: #2BAD72; border: none; color: #fff; border-radius: 14px; padding: 14px 24px 13px; width: calc(100vw - 56px); max-width: 420px; box-shadow: 0 4px 24px rgba(43,173,114,0.32); }
    .cta-mobile .cta-section-name { opacity: .85; color: #fff; }
    .cta-mobile .cta-action { font-size: 14px; font-weight: 800; color: #fff; }
  }
  @media (max-width: 420px) { .cards-grid { grid-template-columns: 1fr 1fr; gap: 8px; } .page { padding: 24px 14px; } }
</style>
