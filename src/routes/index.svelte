<script lang="ts">
    import { authStore } from "../stores";
    authStore.subscribe((user) => {
      if (user.user) {
        console.log(user);
      } else {
        console.log("NO USER");
      }
    })

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
