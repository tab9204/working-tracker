<script>
    import {beginWorkout, currentWorkoutId} from "./stores.js";
    import Icon from './Icon.svelte';

    export let workout;

    let expandSection = false;
</script>

<article>
    <header>
        {workout.name}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="startIcon" on:click={()=>{
                currentWorkoutId.set(workout.id);
                beginWorkout.set(true);
            }}>
                <Icon icon={"start"} click={()=>{
                    currentWorkoutId.set(workout.id);
                    beginWorkout.set(true);
                }}/>
            </div>
    </header>
    {#each workout.breakdown as set}
        <div>{set}</div>
    {/each}
</article>



<style>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center; 
    }
</style>