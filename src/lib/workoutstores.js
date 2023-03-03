import {writable} from 'svelte/store';

export const startWorkout = writable(false);

export const workoutId = writable(null);

export const workoutSets = writable(null);
