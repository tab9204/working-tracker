<script>
    import {startWorkout, selectedWorkoutId, editWorkout} from "./stores.js";
    import Icon from './Icon.svelte';

    export let workout;

</script>

<article>
    <header>
        {workout.name}
    </header>
    <div class="icons">
        <Icon icon={"edit"} click={()=>{
            selectedWorkoutId.set(workout.id);
            editWorkout.set(true);
        }} />
        <Icon icon={"start"} click={()=>{
            selectedWorkoutId.set(workout.id);
            startWorkout.set(true);
        }}/>
    </div>
</article>



<style>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center; 
    }

    .icons{
        display: flex;
        gap: 15px;
    }
</style>