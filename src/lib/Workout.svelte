<script>
    import {beginWorkout, currentWorkoutId} from "./stores.js";
    import Icon from './Icon.svelte';

    export let workout;

    let expandSection = false;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="section">
    <div class="header">
        {workout.name}
        <div class="startIcon" on:click={()=>{
            currentWorkoutId.set(workout.id);
            beginWorkout.set(true);
        }}>
            <Icon icon="start"></Icon>
        </div>
    </div> 
    <div class="content">
        <div class="breakdown">
            {#each workout.breakdown as set}
                <div>{set}</div>
            {/each}
        </div>
    </div>
</div>


<style>
    .section{
        width: 90%;
        margin: 0px auto; 
        border-radius: 5px;
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        padding: 0px 5px;
        border-bottom: 1px solid;
        font-size: 1.2rem;
    }
    .startIcon{
        width: 40px;
        height: 40px;
    }
    .content{
        padding: 5px;
    }
    .breakdown{
        display: flex;
        flex-direction: column;
    }
</style>