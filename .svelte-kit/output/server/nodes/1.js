

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d228f1b0.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/index.a8bdf9d3.js","_app/immutable/chunks/singletons.841f2d35.js","_app/immutable/chunks/index.dd3692a7.js"];
export const stylesheets = [];
export const fonts = [];
