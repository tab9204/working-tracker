<script>
  import {user} from './lib/pocketbase.js';
  import {startWorkout} from "./lib/workoutstores";
  import Login from "./lib/Login.svelte";
  import Workout_List from './lib/Workout_List.svelte';
  import Workingout from './lib/Workingout.svelte';


</script>

<div class="headerBar"></div>
<div id="pageContent">
  {#if $user}
    {#if $startWorkout}
      <Workingout/>
    {:else}
      <Workout_List />
    {/if}
  {:else}
    <Login/>
  {/if}
</div>


<style>
  .headerBar{
    height: 35px;
    background: var(--blue);
  }
  #pageContent{
    height: 100%;
    width: 100%; 
    overflow-y: auto;
    max-width: 640px;
    margin: 0px auto; 
    background: var(--white); 
    padding:5px;
    }
</style>
