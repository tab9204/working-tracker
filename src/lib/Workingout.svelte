<script>
    import {fade} from 'svelte/transition';
    import {pb} from './pocketbase';
    import {startWorkout, workoutId, workoutSets} from "./workoutstores";
    import Icon from './Icon.svelte';

    let set = 0;
    let showPopup = false;

    const incrementSetReps = ()=>{
        $workoutSets[set].reps += 1;
        const updatedSetData = {"sets": $workoutSets};
        pb.collection('workouts').update($workoutId, updatedSetData);
        set = set += 1;
        showPopup = false;
    }

    const incrementSetWeight= ()=>{
        $workoutSets[set].weight += 2.5;
        const updatedSetData = {"sets": $workoutSets};
        pb.collection('workouts').update($workoutId, updatedSetData);
        set = set += 1;
        showPopup = false;
    }

</script>

<div class="workout">
    <button class="exit" on:click={()=>{startWorkout.set(false);}}><Icon icon={"cross"}/></button>
    {#if set < $workoutSets.length}
        {#if showPopup}
            <div class="incrementPopup">
                <button on:click={incrementSetReps}>Increase Reps</button>
                <button on:click={incrementSetWeight}>Increase Weight</button>
            </div>
        {/if}
        {#key set}
        <div class="details" in:fade>
            <div class="setName">
                {$workoutSets[set].name}
            </div>
            <div class="weightAndReps">
                <div>Weight: {$workoutSets[set].weight}</div>
                <div>Reps: {$workoutSets[set].reps}</div>
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
        gap: 13px;
        margin: 0px auto;
    }
    .passFail button{
        height: 45px;
        border: 1px solid;
    }
    .setName{
        font-size: 2.2rem;
        margin: 10px 0;
    }
    .weightAndReps{
        font-size: 1.5rem;
        text-align: center;
    }
    .incrementPopup{
        position: absolute;
        background: var(--white);
        height: 100%;
        width: 100%;
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