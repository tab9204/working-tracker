<script>
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import {pb, beginWorkout, currentWorkoutId} from "./stores.js";
    import Icon from './Icon.svelte';
    import Loading from "./Loading.svelte";


    let set = 0;
    let showPopup = false;
    let loading = true;
    let workout;

    onMount(async ()=>{
       await getWorkoutDetails();
       setTimeout(()=>{
        loading = false;
       },1000);
    })

    const getWorkoutDetails = async ()=>{
        const details = await pb.collection('workouts').getOne($currentWorkoutId);
        workout = {
            id: details.id,
            sets: details.sets
        }
    }

    const incrementSetReps = ()=>{
        workout.sets[set].reps += 1;
        const updatedSetData = {"sets": workout.sets};
        pb.collection('workouts').update(workout.id, updatedSetData);
        set = set += 1;
        showPopup = false;
    }

    const incrementSetWeight= ()=>{
        workout.sets[set].weight += 2.5;
        const updatedSetData = {"sets": workout.sets};
        pb.collection('workouts').update(workout.id, updatedSetData);
        set = set += 1;
        showPopup = false;
    }

</script>

{#if loading}
    <Loading/>
{:else}
    <div id="workout">
       <div id="exit">
            <Icon icon={"cross"} click={()=>{beginWorkout.set(false);}}/>
        </div>
        {#if set < workout.sets.length}
            {#if showPopup}
                <div class="popup">
                    <button on:click={incrementSetReps}>Increase Reps</button>
                    <button on:click={incrementSetWeight}>Increase Weight</button>
                </div>
            {/if}
            {#key set}
            <div class="details" in:fade>
                <hgroup style="text-align:center;">
                    <h1>{workout.sets[set].name}</h1>
                    <h2 style="font-size:1.5rem;">{workout.sets[set].weight} lbs x {workout.sets[set].reps}</h2>
                </hgroup>
            </div>
            {/key}
            <button style="background: var(--green);" on:click={()=>{showPopup = true;}}><Icon icon={"check"}/></button>
            <button style="background: var(--red);" on:click={()=>{set = set += 1;}}><Icon icon={"cross"}/></button>
        {:else}
            <div>You're all done. Good jorb!</div>
        {/if}
    </div>
{/if}



<style>
    #workout {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 20px;
    }
    #exit{
        width: 40px;
        height: 40px;
    }
    .details{
        flex-grow: 2;
    }
    button{
        border: 1px solid;
    }
    .popup{
        position: absolute;
        background: var(--white);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        gap: 10px;
    }
    .popup button{
        height: 45%;
        font-size: 1.5rem;
        background: var(--smoke);
    }
</style>