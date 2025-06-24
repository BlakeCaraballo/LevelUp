<script>
  export let level;
  export let onClose;
</script>

<div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.75);">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark text-white border-light">
      <div class="modal-header">
        <h5 class="modal-title">🎉 Level Up!</h5>
        <button type="button" class="btn-close btn-close-white" on:click={onClose}></button>
      </div>
      <div class="modal-body">
        <p>Congratulations, you reached <strong>Level {level}</strong>!</p>
      </div>
    </div>
  </div>
</div>