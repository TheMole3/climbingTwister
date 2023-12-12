

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a573f2ce.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/index.a8bdf9d3.js","_app/immutable/chunks/singletons.3d7c2b0d.js","_app/immutable/chunks/index.dd3692a7.js"];
export const stylesheets = [];
export const fonts = [];
