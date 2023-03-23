<script>
  import '@picocss/pico';
  import {user, beginWorkout, allWorkouts} from './lib/stores.js';
  import {pb, getAllWorkouts} from "./lib/pocketbase";
  import Login from "./lib/Login.svelte";
  import Workout from './lib/Workout.svelte';
  import Begin_Workout from './lib/Begin_Workout.svelte';
  import Loading from "./lib/Loading.svelte";


  const init = async ()=>{
    await serviceWorkerRegistration();
    const workouts = await getAllWorkouts();
    setTimeout(()=>{
        allWorkouts.set(workouts);
    },1000);
  }

  const serviceWorkerRegistration = async ()=>{
    //register service worker
    if ('serviceWorker' in navigator) {
      try{
        var registration = await navigator.serviceWorker.register('./service-worker.js');
        console.log("service worker registered");
        //if the registration has been changed update it
        registration.update();
      }
      catch(e){
        console.log(e);
      }
    }
    else{
      console.log("Service Workers not supported");
    } 
  }


</script>

<svelte:window on:load="{()=>init()}"/>
<header>
  <img alt="just a little guy" src="./gymtime.gif">
</header>
<main class="container">
  {#if $user}
    {#if $allWorkouts.length <= 0}
      <Loading/>
    {:else if $beginWorkout}
      <Begin_Workout/>
    {:else}
      {#each $allWorkouts as workout}
        <Workout {workout}/>
      {/each}      
    {/if}
  {:else}
    <Login/>
  {/if}
</main>


<style>
  header{
    height: 45px;
    background: var(--blue);
    display: flex;
    justify-content: center;
  }
  main{
    height: 100%;
    overflow-y: auto;
  }
</style>
