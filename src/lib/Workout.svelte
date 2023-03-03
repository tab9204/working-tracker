<script>
    import {startWorkout, workoutId, workoutSets} from "./workoutstores";
    import Icon from './Icon.svelte';

    export let workout;

    let expandSection = false;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="section">
    <div class="header collapsed" class:collapsed={!expandSection} on:click={(e)=>{expandSection = !expandSection}}>
        {workout.name}
        <div class="expandIcon">
            <Icon icon="expand"></Icon>
        </div>
    </div> 
    {#if expandSection}
        <div class="content">
            <div class="breakdown">
                {#each workout.breakdown as set}
                    <div>{set}</div>
                {/each}
            </div>
            <button on:click={()=>{
                workoutId.set(workout.id);
                workoutSets.set(workout.sets);
                startWorkout.set(true);
            }}>Start workout</button>
        </div>
    {/if}
</div>


<style>
    .section{
        width: 90%;
        margin: 0px auto; 
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--smoke);
        margin: 10px 0;
        padding: 0px 5px;
        border: 1px solid;
        border-radius: 5px;
    }
    .header.collapsed .expandIcon{
        transform: rotate(-90deg);  
    }
    .expandIcon{
        width: 40px;
        height: 40px;
        transition: .3s;
    }
    .content{
        padding: 5px;
    }
    .breakdown{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button{
        width: 100%;
        height: 40px;
        border: 1px solid;
        border-radius: 5px;
        margin-top: 20px;
        background: var(--blue);
        }
</style>