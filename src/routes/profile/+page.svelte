<script>
  import { onMount } from "svelte";

  export let level = 1;
  export let xp = 0;
  export let xpToNextLevel = 100;

  let showModal = false;
  let selectedClass = "Unassigned";

  const classOptions = [
    "Warrior",
    "Mage",
    "Rogue",
    "Ranger",
    "Paladin",
    "Necromancer",
    "Unassigned"
  ];
  const classEmojis = {
  Mage: '🧙‍♂️',
  Warrior: '🛡️',
  Rogue: '🗡️',
  Ranger: '🏹',
  Paladin: '🧝‍♀️',
  Unassigned: '🧑',
  Necromancer: '💀'
};


  const categories = [
    { name: 'Intelligence', xp: 30, xpToLevel: 100 },
    { name: 'Strength', xp: 60, xpToLevel: 100 },
    { name: 'Endurance', xp: 80, xpToLevel: 100 },
    { name: 'Perception', xp: 20, xpToLevel: 100 }
  ];

  function chooseClass(cls) {
    selectedClass = cls;
    showModal = false;
  }
</script>

<h1 class="display-5 mb-1">Your Profile</h1>
<p class="lead mb-2">Level {level} — {xp} XP / {xpToNextLevel} XP</p>
<p class="class-label mb-4">
  Class: <strong>{selectedClass}</strong>
  <button class="btn btn-sm btn-outline-light ms-3" on:click={() => (showModal = true)}>
    Choose Class
  </button>
</p>
<!-- Emoji Avatar -->
<div class="emoji-avatar text-center mb-4">
  <div class="emoji">{classEmojis[selectedClass]}</div>
  <h4 class="mt-2">{selectedClass}</h4>
</div>

<!-- XP Progress Bar -->
<div class="progress mb-5" style="height: 20px;">
  <div
    class="progress-bar bg-success"
    role="progressbar"
    style="width: {Math.min((xp / xpToNextLevel) * 100, 100)}%"
  >
    {Math.floor((xp / xpToNextLevel) * 100)}%
  </div>
</div>

<!-- Stat Cards -->
<div class="category-cards-container d-flex flex-wrap justify-content-center gap-4 
            mx-auto" style="max-width: 900px;">
  {#each categories as cat}
    <div class="stat-card menu-card flex-grow-1" style="min-width: 220px; max-width: 260px;">
      <h5>{cat.name}</h5>
      <div class="category-xp">XP: {cat.xp} / {cat.xpToLevel}</div>
      <div class="progress mt-2" style="height: 14px;">
        <div
          class="progress-bar bg-info"
          role="progressbar"
          style="width: {Math.min((cat.xp / cat.xpToLevel) * 100, 100)}%"
        >
          {Math.floor((cat.xp / cat.xpToLevel) * 100)}%
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Class Selection Modal -->
{#if showModal}
  <div class="modal-overlay" on:click={() => (showModal = false)}>
    <div class="class-modal" on:click|stopPropagation>
      <h4>Choose Your Class</h4>
      <div class="class-options">
        {#each classOptions as cls}
          <button class="btn btn-outline-light class-btn" on:click={() => chooseClass(cls)}>
            {cls}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
    :global(body) {
    background-color: #0a0615 !important; /* deep dark purple */
    margin: 0;
    padding: 0;
  }
  h1 {
    font-family: 'Orbitron', sans-serif;
  }

  .class-label {
    font-size: 1.1rem;
    color: #ccc;
  }

  .category-xp {
    font-size: 1rem;
    color: #ccc;
  }

  .progress-bar {
    transition: width 0.5s ease;
  }

  /* Reuse dashboard card style */
  .menu-card {
    position: relative;
    background: linear-gradient(to bottom right, #431379, #111328);
    border: 2px solid #1a133e;
    color: #FBEDFE;
    padding: 2rem 1.5rem;
    border-radius: 16px;
    text-decoration: none;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 20px rgba(117, 109, 128, 0.2);
    overflow: hidden;
    z-index: 0;
  }

  .menu-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(118, 0, 253, 0.6);
  }

  .stat-card h5 {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    color: #FBEDFE;
    margin-bottom: 0.5rem;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .class-modal {
    background: #1a133e;
    border: 2px solid #431379;
    border-radius: 12px;
    padding: 2rem;
    color: #FBEDFE;
    min-width: 300px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 0 20px rgba(118, 0, 253, 0.4);
  }

  .class-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .class-btn {
    font-family: 'Orbitron', sans-serif;
    border-color: #FBEDFE;
    color: #FBEDFE;
  }

  .class-btn:hover {
    background-color: #431379;
    border-color: #FBEDFE;
  }

    .emoji-avatar .emoji {
    font-size: 5rem;
    background: radial-gradient(circle, #431379 0%, #111328 100%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #FBEDFE;
    box-shadow: 0 0 15px rgba(118, 0, 253, 0.5);
    margin: 0 auto;
  }

  .emoji-avatar h4 {
    font-family: 'Orbitron', sans-serif;
    color: #FBEDFE;
  }
</style>
