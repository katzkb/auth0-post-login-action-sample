<script lang="ts">
  import { browser } from '$app/environment'
  if (browser) {
    localStorage.removeItem('name')
    window.location.href = '/'
  }
</script>
