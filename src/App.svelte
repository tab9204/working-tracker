<script>
  import {user, pb, beginWorkout} from './lib/stores.js';
  import Login from "./lib/Login.svelte";
  import Workout from './lib/Workout.svelte';
  import Begin_Workout from './lib/Begin_Workout.svelte';
  import Loading from "./lib/Loading.svelte";

  let loading = true;
  let allWorkouts;


  const init = async ()=>{
    await serviceWorkerRegistration();
    allWorkouts = await getAllWorkouts();
    setTimeout(()=>{
        loading = false;
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

  const getAllWorkouts = async ()=>{
    let workouts = [];
    const request = await pb.collection('workouts').getFullList(200, {sort: '-name'});
    request.forEach((workout)=>{
      const data = {
          name: workout.name,
          id: workout.id,
          sets: workout.sets,
          breakdown: []
      }
      //a workout breakdown lists out every type of set in the workout
      workout.sets.forEach(set => {
          if(!data.breakdown.includes(set.name)){
            data.breakdown.push(set.name);
          }
      });
      workouts.push(data);
    });
    return workouts;
  }


</script>

<svelte:window on:load="{()=>init()}"/>
<div class="headerBar"></div>
<div id="pageContent">
  {#if $user}
    {#if loading}
      <Loading/>
    {:else if $beginWorkout}
      <Begin_Workout/>
    {:else}
      {#each allWorkouts as workout}
        <Workout {workout}/>
      {/each}
    {/if}
  {:else}
    <Login/>
  {/if}
</div>


<style>
  .headerBar{
    height: 45px;
    background: var(--blue);
  }
  #pageContent{
    height: 100%;
    overflow-y: auto;
    width: calc(100% - 10px);
    max-width: 640px;
    background: var(--white); 
    padding:5px;
    margin: 0px auto;
  }
</style>
