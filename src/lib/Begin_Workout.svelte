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
    <div class="workout">
        <button class="exit" on:click={()=>{beginWorkout.set(false);}}><Icon icon={"cross"}/></button>
        {#if set < workout.sets.length}
            {#if showPopup}
                <div class="incrementPopup">
                    <button on:click={incrementSetReps}>Increase Reps</button>
                    <button on:click={incrementSetWeight}>Increase Weight</button>
                </div>
            {/if}
            {#key set}
            <div class="details" in:fade>
                <div class="setName">
                    {workout.sets[set].name}
                </div>
                <div class="weightAndReps">
                    <div>{workout.sets[set].weight} lbs x {workout.sets[set].reps}</div>
                </div>
            </div>
            {/key}
            <div class="passFail">
                <button style="background: var(--green);" on:click={()=>{showPopup = true;}}><Icon icon={"check"}/></button>
                <button style="background: var(--red);" on:click={()=>{set = set += 1;}}><Icon icon={"cross"}/></button>
            </div>
        {:else}
            <div>You're all done. Good jorb!</div>
        {/if}
    </div>
{/if}



<style>
    .workout{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 20px;
    }
    .exit{
        width: 40px;
        height: 40px;
        border:none;
    }
    .details{
        flex-grow: 2;
        align-self: center;
    }
    .passFail{
        display: flex;
        flex-direction: column;
        width: 90%;
        gap: 15px;
        margin: 0px auto;
    }
    .passFail button{
        height: 55px;
        border: 1px solid;
        border-radius: 5px;
    }
    .setName{
        font-size: 2.5rem;
        margin: 10px 0;
        text-align: center;
    }
    .weightAndReps{
        font-size: 2rem;
        text-align: center;
    }
    .incrementPopup{
        position: absolute;
        background: var(--white);
        height: 100%;
        width: calc(100% - 20px);
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .incrementPopup button{
        width: 90%;
        height: 45%;
        align-self: center;
        font-size: 1.5rem;
        border: 1px solid;
        border-radius: 5px;
        background: var(--smoke);
    }
</style>