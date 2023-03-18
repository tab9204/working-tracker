import {writable} from 'svelte/store';
import {pb} from './pocketbase.js';

console.log(pb.authStore.isValid);

if(!pb.authStore.isValid){
    pb.authStore.clear();
}

export const user = writable(pb.authStore.model);


export const beginWorkout = writable(false);

export const currentWorkoutId = writable(null);

export let allWorkouts = writable([]);