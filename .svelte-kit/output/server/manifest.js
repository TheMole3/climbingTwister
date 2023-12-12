export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["audio/air.mp3","audio/blue.mp3","audio/green.mp3","audio/leftfoot.mp3","audio/lefthand.mp3","audio/red.mp3","audio/rightfoot.mp3","audio/righthand.mp3","audio/whoosh.mp3","audio/yellow.mp3","favicon.png"]),
	mimeTypes: {".mp3":"audio/mpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.f9dd7648.js","app":"_app/immutable/entry/app.911cfcba.js","imports":["_app/immutable/entry/start.f9dd7648.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/singletons.841f2d35.js","_app/immutable/chunks/index.dd3692a7.js","_app/immutable/entry/app.911cfcba.js","_app/immutable/chunks/scheduler.933cbe4a.js","_app/immutable/chunks/index.a8bdf9d3.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
