<script>
  import LevelUpModal from '$lib/components/LevelUpModal.svelte';
  import { onMount } from 'svelte';

  let level = 1;
  let xp = 0;
  let xpToNextLevel = 100;
  let showModal = false;

  const maxLevel = 10;

  const baseQuestTemplates = [
    { category: 'Intelligence', baseXP: 20 },
    { category: 'Strength', baseXP: 30 },
    { category: 'Endurance', baseXP: 15 },
    { category: 'Creativity', baseXP: 25 }
  ];

  let dailyQuests = [];
  let levelQuests = [];

  function generateQuestsForLevel(level) {
    return baseQuestTemplates.map((template, index) => {
      const increment = (level - 1) * 10;
      const adjustedXP = template.baseXP + increment;

      let title = '';
      switch (template.category) {
        case 'Intelligence': title = `Read ${10 + level * 2} pages`; break;
        case 'Strength': title = `Do ${10 + level * 5} pushups`; break;
        case 'Endurance': title = `Meditate for ${5 + level} minutes`; break;
        case 'Creativity': title = `Create something creative or write`; break;
      }

      return {
        id: `daily-${level}-${index}`,
        title,
        category: template.category,
        xp: adjustedXP,
        done: false
      };
    });
  }

  function generateLevelQuests(level) {
    return baseQuestTemplates.map((template, index) => {
      const multiplier = 1.5;
      const adjustedXP = Math.floor(template.baseXP * level * multiplier);

      let title = '';
      switch (template.category) {
        case 'Intelligence': title = `Finish a chapter in a technical book`; break;
        case 'Strength': title = `Complete a workout with ${level * 10} reps`; break;
        case 'Endurance': title = `Stay focused for ${15 + level * 5} minutes`; break;
        case 'Creativity': title = `Build or design something ambitious`; break;
      }

      return {
        id: `level-${level}-${index}`,
        title,
        category: template.category,
        xp: adjustedXP,
        done: false
      };
    });
  }

  function toggleQuest(id) {
    // Toggle for both arrays
    const allQuests = [...dailyQuests, ...levelQuests];

    allQuests.forEach((quest) => {
      if (quest.id === id && !quest.done) {
        xp += quest.xp;
        quest.done = true;

        // Handle level-up
        while (xp >= xpToNextLevel && level < maxLevel) {
          xp -= xpToNextLevel;
          level += 1;
          xpToNextLevel += 50;
          showModal = true;

          dailyQuests = generateQuestsForLevel(level);
          levelQuests = generateLevelQuests(level);
        }

        // Cap handling
        if (level >= maxLevel) {
          level = maxLevel;
          xp = Math.min(xp, xpToNextLevel);
        }
      }
    });
  }

  onMount(() => {
    dailyQuests = generateQuestsForLevel(level);
    levelQuests = generateLevelQuests(level);
  });
</script>


<h1 class="display-5 mb-4">🎯 Daily Quests</h1>

<!-- Daily Quests -->
<div class="quest-card menu-card mb-5">
  <h4 class="quest-header">📝 Daily Tasks</h4>
  <ul class="quest-list">
    {#each dailyQuests as quest}
      <li class="quest-item d-flex justify-content-between align-items-center">
        <span>{quest.title}</span>
        <input type="checkbox" checked={quest.done} on:change={() => toggleQuest(quest.id)} />
      </li>
    {/each}
  </ul>
</div>

<!-- Level Quests -->
<h2 class="display-6 mb-3">🗡️ Level {level} Quests</h2>
<div class="quest-card menu-card">
  <h4 class="quest-header">🔓 Challenges</h4>
  <ul class="quest-list">
    {#each levelQuests as quest}
      <li class="quest-item d-flex justify-content-between align-items-center">
        <span>{quest.title}</span>
        <input type="checkbox" checked={quest.done} on:change={() => toggleQuest(quest.id)} />
      </li>
    {/each}
  </ul>
</div>

{#if showModal}
  <LevelUpModal {level} on:close={() => (showModal = false)} />
{/if}

<style>
  h1, h2 {
    font-family: 'Orbitron', sans-serif;
    color: #FBEDFE;
  }

  .quest-card {
    position: relative;
    background: linear-gradient(to bottom right, #431379, #111328);
    border: 2px solid #1a133e;
    color: #FBEDFE;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(117, 109, 128, 0.2);
    overflow: hidden;
    z-index: 0;
    margin-bottom: 5rem;
  }

  .quest-card:hover {
    /* transform: scale(1.01); */
    box-shadow: 0 0 30px rgba(118, 0, 253, 0.6);
  }

  .quest-header {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #FBEDFE;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }

  .quest-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .quest-item {
    font-size: 1.1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #e0dff0;
  }

  .quest-item:last-child {
    border-bottom: none;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: #00ffff;
  }
</style>