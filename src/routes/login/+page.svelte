<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isLoggedIn } from '$lib/stores/auth.ts';

  let loading = true;
  let currentLineIndex = 0;
  let displayedLines = [];
  let showAcceptButton = false;
  let showLoginForm = false;
  let lineBuffer = '';
  let i = 0;

  let username = '';
  let password = '';
  let fadeOut = false; // 🔥 animation state

  const lines = [
    "Initializing login protocol...",
    "Verifying neural sync...",
    "Welcome, gamer..."
  ];

  onMount(() => {
    setTimeout(() => {
      loading = false;
      typeWriterLine();
    }, 3000);
  });

  function typeWriterLine() {
    const currentLine = lines[currentLineIndex];
    if (i < currentLine.length) {
      lineBuffer += currentLine.charAt(i);
      i++;
      setTimeout(typeWriterLine, 60);
    } else {
      displayedLines = [...displayedLines, lineBuffer];
      lineBuffer = '';
      i = 0;
      currentLineIndex++;
      if (currentLineIndex < lines.length) {
        setTimeout(typeWriterLine, 800);
      } else {
        setTimeout(() => (showAcceptButton = true), 1000);
      }
    }
  }

   function handleAccept() {
    showAcceptButton = false;
    showLoginForm = true;
  }

  function handleLogin(e) {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      fadeOut = true;
      isLoggedIn.set(true);

      // Delay to allow animation to play
      setTimeout(() => {
        goto('/');
      }, 1200); // matches CSS duration
    } else {
      alert('Please enter a username and password.');
    }
  }
</script>

<!-- LOADING SCREEN -->
{#if loading}
  <div class="loading-screen">
    <div class="spinner"></div>
    <p>Loading game assets...</p>
  </div>

<!-- TYPEWRITER TERMINAL -->
{:else if !showLoginForm}
  <div class="typewriter-screen">
    <div class="terminal">
      {#if lineBuffer}
        <!-- While typing a line -->
        {#each displayedLines as line}
          <p>{line}</p>
        {/each}
        <p>{lineBuffer}<span class="cursor">|</span></p>

      {:else}
        <!-- When all lines are finished typing -->
        {#each displayedLines as line, index}
          {#if index === displayedLines.length - 1}
            <p>{line}<span class="cursor">|</span></p>
          {:else}
            <p>{line}</p>
          {/if}
        {/each}
      {/if}

      {#if showAcceptButton}
        <button class="accept-btn" on:click={handleAccept}>Accept</button>
      {/if}
    </div>
  </div>

<!-- LOGIN FORM -->
{:else}
  <div class="login-form">
    <h2>Log In</h2>
<form on:submit={handleLogin}>
  <input type="text" bind:value={username} placeholder="Username" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Enter</button>
</form>
  </div>
{/if}

<style>
  :global(body) {
    background-color: #0a0615;
    font-family: 'Orbitron', sans-serif;
    color: #FBEDFE;
    margin: 0;
    padding: 0;
  }

  .loading-screen,
  .typewriter-screen,
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #431379;
    border-top: 6px solid #FBEDFE;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .terminal {
    font-size: 1.4rem;
    width: 100%;
    max-width: 600px;
    text-align: center;
    padding: 2rem;
    background: #120920;
    border: 2px solid #431379;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(118, 0, 253, 0.3);
    min-height: 200px;
  }

  .cursor {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .accept-btn {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-family: 'Orbitron', sans-serif;
    color: #FBEDFE;
    background: #431379;
    border: 2px solid #FBEDFE;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .accept-btn:hover {
    background: #6d3acb;
    box-shadow: 0 0 10px #FBEDFE;
  }

  .login-form h2 {
    margin-bottom: 1.5rem;
  }

  .login-form form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
  }

  .login-form input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 2px solid #431379;
    background: #1a133e;
    color: #FBEDFE;
    font-size: 1rem;
  }

  .login-form button {
    background: #431379;
    color: #FBEDFE;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
  }

  .login-form button:hover {
    background: #6d3acb;
  }
</style>
