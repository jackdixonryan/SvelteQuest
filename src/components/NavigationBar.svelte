
<script lang="ts"> 
  import supabase from "$lib/supabase";
  import { goto } from "$app/navigation";
  const { auth } = supabase;

  // after the user signs out, send them home.
  async function signOut() {
    await auth.signOut();
    goto('/');
  }
</script>

<style>

  #navbar-top {
    width: 6rem;
    /* padding: 1rem; */
    border-right: 2px black solid;
    float: left;
    position: absolute;
    top: 0px;
    bottom: 0px;
  }

  .navbar-icon {
    color: white;
    padding: 1.5rem;
    cursor: pointer;
    text-align: center;
  }

  a {
    text-decoration: none;
  }

/*     color: #61892F;
 */

  .navbar-icon:hover { 
    color: #86C232;
    background-color: #474b4f;
    -moz-box-shadow:    inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow:         inset 0 0 10px #000000;
  }

  i {
    font-size: 2rem;
  }

  .caption {
    font-size: 0.6rem;
    margin-top: 0.5rem;
  }

</style>

<div id="navbar-top">
  <div class="icons">
    <a href="/characters">
      <div class="navbar-icon">
        <i class="fas fa-users"></i>
        <p class="caption">Characters</p>
      </div>
    </a>
    <a href="/combat">
      <div class="navbar-icon">
        <i class="fas fa-fist-raised"></i>
        <p class="caption">Combat</p>
      </div>
    </a>
    <a href="/spells">
      <div class="navbar-icon">
        <i class="fas fa-magic"></i>
        <p class="caption">Spells</p>
      </div>
    </a>
    <a href="/skills">
      <div class="navbar-icon">
        <i class="fas fa-book-open"></i>
        <p class="caption">Skill Trees</p>
      </div>
    </a>
    <a href="/user">
      <div class="navbar-icon">
        <i class="fas fa-user"></i>
        <p class="caption">Account</p>
      </div>
    </a>
    <div class="navbar-icon" on:click={signOut}>
      <i class="fas fa-sign-out-alt"></i>
      <p class="caption">Logout</p>
    </div>
  </div>
</div>