<script>
    import {pb} from './pocketbase.js';
    import {onMount} from 'svelte';
    import Workout from './Workout.svelte';

    let workouts = [];
    let loading = true;

    onMount(async () => {
        const allWorkouts = await pb.collection('workouts').getFullList(200, {sort: '-name'});
        allWorkouts.forEach((workout)=>{
            const workoutData = {
                name: workout.name,
                id: workout.id,
                sets: workout.sets,
                breakdown: []
            }
            //create a breakdown of the sets in the workout by getting one of each exerscise 
            workout.sets.forEach(set => {
                if(!workoutData.breakdown.includes(set.name)){
                    workoutData.breakdown.push(set.name);
                }
            });
            workouts.push(workoutData);
        });
        //to avoid a jarring load screen show the load icon for at least 1 second 
        setTimeout(()=>{
            loading = false;
        },1000)
	});
</script>

{#if loading}
    <div>Loading</div>
{:else}
    {#each workouts as workout}
        <Workout {workout} />
    {/each}
{/if}