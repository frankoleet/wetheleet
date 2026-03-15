<script>
  import { createEventDispatcher } from 'svelte';
  import { gameIcons } from './data/sections.js';

  export let card;
  export let selected = false;
  export let expanded = false;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', card);
  }
</script>

<button
  class="card"
  class:game-card={card.gameColor}
  class:selected
  class:expanded
  style={card.gameColor ? `--game-color:${card.gameColor};--game-glow:${card.gameColor}29` : ''}
  on:click={handleClick}
  aria-pressed={selected}
>
  <span class="card-check">
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <path d="M2 6l3 3 5-5"/>
    </svg>
  </span>

  <span class="card-icon" class:game-icon={card.gameColor}>
    {#if card.gameColor && gameIcons[card.name]}
      {@html gameIcons[card.name]}
    {:else}
      {card.icon}
    {/if}
  </span>

  <span class="card-name">{card.name}</span>

  {#if card.subs?.length}
    <svg class="card-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M2 4l4 4 4-4"/>
    </svg>
  {/if}
</button>

<style>
.card {
  background: #2a2a2a;
  border: 1px solid #333333;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background .15s, border-color .15s, transform .12s;
  position: relative;
  overflow: hidden;
  user-select: none;
  text-align: left;
  width: 100%;
  font-family: 'Manrope', sans-serif;
}
.card:hover { background: #313131; border-color: #505050; transform: translateY(-1px); }
.card.selected { background: #1e3329; border-color: #2BAD72; }

.card-check {
  position: absolute; top: 10px; right: 10px;
  width: 18px; height: 18px;
  background: #2BAD72; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: scale(0.5);
  transition: opacity .2s, transform .2s;
}
.card.selected .card-check { opacity: 1; transform: scale(1); }
.card-check svg { width: 10px; height: 10px; color: #fff; }

.card-icon { font-size: 18px; display: block; margin-bottom: 8px; line-height: 1; }
.card-name { display: block; font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3; }
.card.selected .card-name { color: #2BAD72; }

.card-arrow {
  position: absolute; bottom: 10px; right: 10px;
  width: 14px; height: 14px; color: #606060;
  transition: transform .25s, color .2s;
}
.card.selected .card-arrow { color: #2BAD72; }
.card.expanded .card-arrow { transform: rotate(180deg); color: #2BAD72; }

.game-icon {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  color: #606060; transition: color .2s, filter .2s;
}
.game-card:hover .game-icon { color: var(--game-color); filter: drop-shadow(0 0 6px var(--game-glow)); }
.game-card.selected .game-icon { color: var(--game-color); }
.game-card:hover { border-color: var(--game-color); }
.game-card.selected { border-color: var(--game-color); }
.game-card.selected .card-name { color: var(--game-color); }
</style>
