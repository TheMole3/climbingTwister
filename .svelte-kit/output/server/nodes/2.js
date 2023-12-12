

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.c74bcf59.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/index.a8bdf9d3.js","_app/immutable/chunks/index.dd3692a7.js"];
export const stylesheets = [];
export const fonts = [];
