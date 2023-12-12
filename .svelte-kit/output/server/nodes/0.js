import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.9514b6b2.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/index.a8bdf9d3.js"];
export const stylesheets = ["_app/immutable/assets/0.532cfe79.css"];
export const fonts = [];
