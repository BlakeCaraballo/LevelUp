<script>
  let selectedItem = null;

  const inventoryItems = [
    {
      name: 'Health Potion',
      description: 'Restores 50 HP',
      quantity: 3,
      icon: '🧪',
      rarity: 'common',
      weight: 0.5
    },
    {
      name: 'Mana Potion',
      description: 'Restores 30 MP',
      quantity: 2,
      icon: '🔮',
      rarity: 'common',
      weight: 0.5
    },
    {
      name: 'Iron Sword',
      description: 'Basic melee weapon',
      quantity: 1,
      icon: '🗡️',
      rarity: 'common',
      weight: 4,
      damage: 15,
      durability: 80
    },
    {
      name: 'Hunter’s Cloak',
      description: 'Increases stealth',
      quantity: 1,
      icon: '🧥',
      rarity: 'epic',
      weight: 2
    },
    {
      name: 'Teleport Scroll',
      description: 'Instant travel to known locations',
      quantity: 1,
      icon: '📜',
      rarity: 'rare',
      weight: 0.2
    },
    {
      name: 'Elven Bow',
      description: 'Legolas?',
      quantity: 1,
      icon: '🏹',
      rarity: 'epic',
      weight: 3,
      damage: 12,
      durability: 100
    },
    {
      name: 'Torch',
      description: 'It fire',
      quantity: 3,
      icon: '🔥',
      rarity: 'common',
      weight: 1
    },
    {
      name: 'Mystic Orb',
      description: 'Orb do magic',
      quantity: 1,
      icon: '🔮',
      rarity: 'rare',
      weight: 2
    }
  ];

  function openModal(item) {
    selectedItem = item;
  }

  function closeModal() {
    selectedItem = null;
  }

  function rarityClass(rarity) {
    return {
      common: 'rarity-common',
      rare: 'rarity-rare',
      epic: 'rarity-epic'
    }[rarity] || '';
  }
</script>

<h1 class="display-5 mb-4">🎒 Inventory</h1>

<div class="inventory-grid">
  {#each inventoryItems as item}
    <div
      class="inventory-slot {rarityClass(item.rarity)}"
      on:click={() => openModal(item)}
      title={item.name}
    >
      {item.icon}
    </div>
  {/each}

  {#each Array(12 - inventoryItems.length) as _}
    <div class="inventory-slot empty"></div>
  {/each}
</div>
{#if selectedItem}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <div class="modal-header">
        <span class="modal-icon">{selectedItem.icon}</span>
        <h2>{selectedItem.name}</h2>
      </div>

      <p class="description">{selectedItem.description}</p>

      <ul class="stats-list">
        <li><strong>Quantity:</strong> {selectedItem.quantity}</li>
        {#if selectedItem.damage}
          <li><strong>Damage:</strong> {selectedItem.damage}</li>
        {/if}
        {#if selectedItem.durability}
          <li><strong>Durability:</strong> {selectedItem.durability}</li>
        {/if}
        <li><strong>Weight:</strong> {selectedItem.weight}</li>
        <li><strong>Rarity:</strong> {selectedItem.rarity}</li>
      </ul>

      <button class="btn btn-outline-light mt-3" on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}

<style>
  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .inventory-slot {
    border: 2px solid;
    border-radius: 12px;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #FBEDFE;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(118, 0, 253, 0.2);
    transition: 0.2s ease;
    background: linear-gradient(to bottom right, #1a133e, #0e0a20);
  }

  .inventory-slot:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(118, 0, 253, 0.5);
  }

  .inventory-slot.empty {
    opacity: 0.1;
    border: 2px dashed #431379;
    cursor: default;
  }

  .rarity-common {
    border-color: gray;
  }

  .rarity-rare {
    border-color: #2e86de;
    box-shadow: 0 0 10px rgba(46, 134, 222, 0.5);
  }

  .rarity-epic {
    border-color: #9b59b6;
    box-shadow: 0 0 10px rgba(155, 89, 182, 0.6);
  }

  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal-content {
    background: #1a133e;
    border: 2px solid #431379;
    border-radius: 12px;
    padding: 2rem;
    color: #FBEDFE;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0 0 20px rgba(118, 0, 253, 0.4);
    font-family: 'Orbitron', sans-serif;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .modal-icon {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
    color: #ccc;
    margin-top: 1rem;
  }

  .stats-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  .stats-list li {
    margin-bottom: 0.5rem;
    color: #eee;
  }
</style>