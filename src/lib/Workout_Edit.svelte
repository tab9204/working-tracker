<script>
    import {onMount} from 'svelte';
    import {getWorkoutDetails, updateWorkout} from './pocketbase.js';
    import {editWorkout, selectedWorkoutId} from "./stores.js";
    import Icon from './Icon.svelte';
    import Loading from "./Loading.svelte";

    let loading = true;
    let workout;

    onMount(async ()=>{
        workout = await getWorkoutDetails($selectedWorkoutId);
       setTimeout(()=>{
        loading = false;
       },1000);
    })

    const saveWorkoutDetails = async ()=>{
        loading = true;
        const data = {sets: workout.sets} 
        await updateWorkout(workout.id, data);
    }

</script>

{#if loading}
    <Loading/>
{:else}
    <h3>{workout.name}</h3>
    <div style="margin-bottom: 80px;">
        {#each workout.sets as set}
            <section>
                <h5>{set.name}</h5>
                <h7>Reps</h7>
                <div class="input">
                    <Icon icon={"remove"} click={()=>{
                        set.reps = set.reps - 1 < 0 ? 0 : set.reps -= 1;
                    }}/>
                    <div class="number">{set.reps}</div>
                    <Icon icon={"add"} click={()=>{
                        set.reps++;
                    }}/>
                </div>
                <h7>Weight</h7>
                <div class="input">
                    <Icon icon={"remove"} click={()=>{
                        set.weight = set.weight - 2.5 < 0 ? 0 : set.weight -= 2.5;
                    }}/>
                    <div class="number">{set.weight}</div>
                    <Icon icon={"add"} click={()=>{
                        set.weight += 2.5;
                    }}/>
                </div>
            </section>
        {/each}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="save" on:click={async ()=>{
       await saveWorkoutDetails();
            setTimeout(()=>{
                editWorkout.set(false);
            },1000); 
        }}>
        <Icon icon={"check"}/>
    </div>
{/if}

<style>
    .input{
        display: flex;
        margin: 10px 0;
    }
    .number{
        width: 50%;
        text-align: center;
    }
    #save{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding: 10px;
        background: var(--smoke);  
    }
</style>