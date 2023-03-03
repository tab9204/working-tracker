import PocketBase from 'pocketbase';
import {writable} from 'svelte/store';

export const pb = new PocketBase('https://www.chilionrap.com');

export const user = writable(pb.authStore.model);