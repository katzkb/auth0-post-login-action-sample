<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  if (browser) {
    localStorage.setItem('name', $page.data.userinfo.name)
    window.location.href = '/my'
  }
</script>