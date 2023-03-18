import PocketBase from 'pocketbase';
import {writable} from 'svelte/store';

export const pb = new PocketBase('https://www.chilionrap.com');

console.log(pb.authStore.isValid);

/*
if(!pb.authStore.isValid){
    pb.authStore.clear();
}*/

export const user = writable(pb.authStore.model);


export const beginWorkout = writable(false);

export const currentWorkoutId = writable(null);

//export let allWorkouts = writable([]);