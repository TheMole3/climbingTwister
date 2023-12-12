export const ssr = false;

import { writable } from "svelte/store"
import { browser } from "$app/environment"


let airEnabledPersisted = browser && localStorage.getItem('airEnabled') || false
export let airEnabled = writable(airEnabledPersisted ? JSON.parse(airEnabledPersisted) : '')

if (browser) {
    airEnabled.subscribe(u => localStorage.airEnabled = u)
}


let swooshEnabledPersisted = browser && localStorage.getItem('swooshEnabled') || true
export let swooshEnabled = writable(swooshEnabledPersisted ? JSON.parse(swooshEnabledPersisted) : '')

if (browser) {
    swooshEnabled.subscribe(u => localStorage.swooshEnabled = u)
}


let persistedmuted = browser && localStorage.getItem('muted') || true
export let muted = writable(persistedmuted ? JSON.parse(persistedmuted) : '')

if (browser) {
    muted.subscribe(u => localStorage.muted = u)
}