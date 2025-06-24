<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isLoggedIn } from '$lib/stores/auth.js';
  onMount(() => {
  $: if (!$isLoggedIn) {
    goto('/login');
  }
});
  const menuOptions = [
    { title: 'Profile', icon: '👤', href: '/profile' },
    { title: 'Quests', icon: '📝', href: '/quests' },
    { title: 'Inventory', icon: '🎒', href: '/inventory' },
    { title: 'Skills', icon: '💡', href: '/skills' }
  ];
</script>

<div class="energy-core-background">
  <div class="orb-wrapper">
  <img src="/assets/particle3-1.png" alt="Glowing Orb" class="glowing-orb" />
</div>
</div>

<div class="dashboard-wrapper">
  <header class="title-glitch">Solo Leveling</header>

  <section class="menu-grid">
    {#each menuOptions as option}
      <a class="menu-card" href={option.href}>
        <div class="menu-icon">{option.icon}</div>
        <div class="menu-title">{option.title}</div>
      </a>
    {/each}
  </section>

  <footer class="footer-text">v0.1 – Rise and grind, adventurer.</footer>
</div>

<style>
  .energy-core-background {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, #0d0d1a 0%, #050511 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* .core-svg {
    width: 400px;
    height: 400px;
    opacity: 0.6;
    filter: drop-shadow(0 0 20px #00ffff80);
  } */

  .dashboard-wrapper {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    min-width: 75vw;
    color: #e6e6e6;
    font-family: 'Orbitron', sans-serif;
    padding: 2rem;
    margin-left: -4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title-glitch {
    font-size: 3.5rem;
    font-weight: 700;
    color: #FBEDFE;
    text-align: center;
    margin-bottom: 8rem;
    text-shadow:
      1px 1px 0 #431379,
      -1px -1px 0 #111328;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 2.5rem;
    width: max-content;
    align-self: flex-start;
    margin-left: 2rem;
  }

  .menu-card {
    position: relative;
    background: linear-gradient(to bottom right, #431379, #111328);
    border: 2px solid #1a133e;
    color: #FBEDFE;
    padding: 3rem 2rem;
    border-radius: 16px;
    text-decoration: none;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 20px rgba(117, 109, 128, 0.2);
    overflow: hidden;
    z-index: 0;
  }

  .menu-card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 10%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
    transform: scale(0.8);
  }

  .menu-card:hover::before {
    opacity: 1;
    animation: pulse-glow 1.5s infinite;
  }

  .menu-card:hover {
    transform: scale(1.1) rotateZ(0.5deg);
    box-shadow: 0 0 30px rgba(118, 0, 253, 0.6);
  }

  @keyframes pulse-glow {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.3;
    }
    50% {
      transform: scale(1);
      opacity: 0.6;
    }
  }

  .menu-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  .menu-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .footer-text {
    text-align: center;
    opacity: 0.4;
    font-size: 0.9rem;
    margin-top: 5rem;
  }
  .orb-wrapper {
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

.glowing-orb {
  width: 1750px;
  height: auto;
  opacity: 0.6;
  mix-blend-mode: screen; /* Or 'lighten', 'color-dodge', etc */
  animation: pulse-orb 15s ease-in-out infinite;
  /* filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))
          drop-shadow(0 0 40px rgba(0, 255, 255, 0.4)); */
  clip-path: circle(90%);
          
}

@keyframes pulse-orb {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
}
</style>
