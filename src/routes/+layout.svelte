<!-- src/routes/+layout.svelte -->
<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import '../app.scss';
  import '$lib/styles/bootstrap.css'; 
</script>

<!-- App-wide wrapper with dark theme and light text -->
<div class="text-light min-vh-100">

  <Navbar />

  <!-- Global layout structure -->
  <main class="container mt-4">
    <slot />
  </main>
  
</div>
