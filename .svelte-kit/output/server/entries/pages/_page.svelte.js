import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
let airEnabled = writable("");
let swooshEnabledPersisted = true;
let swooshEnabled = writable(JSON.parse(swooshEnabledPersisted));
let persistedmuted = true;
let muted = writable(JSON.parse(persistedmuted));
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_airEnabled;
  let $muted, $$unsubscribe_muted;
  let $$unsubscribe_swooshEnabled;
  $$unsubscribe_airEnabled = subscribe(airEnabled, (value) => value);
  $$unsubscribe_muted = subscribe(muted, (value) => $muted = value);
  $$unsubscribe_swooshEnabled = subscribe(swooshEnabled, (value) => value);
  let whooshAudio;
  let timerActive = false;
  let timerInterval;
  let currentColorI = 0;
  let colorMap = ["red-500", "blue-500", "green-500", "yellow-500", "teal-300"];
  let colorNameMap = ["RED", "BLUE", "GREEN", "YELLOW", "AIR"];
  let handfeetnameMap = ["RIGHT HAND", "LEFT HAND", "RIGHT FOOT", "LEFT FOOT"];
  let currentHandfeetI = 0;
  {
    {
      {
        clearInterval(timerInterval);
      }
    }
  }
  $$unsubscribe_airEnabled();
  $$unsubscribe_muted();
  $$unsubscribe_swooshEnabled();
  return `${``} <div class="w-screen h-screen select-none"><audio src="./audio/whoosh.mp3"${add_attribute("this", whooshAudio, 0)}></audio> <div class="z-20 absolute flex w-full bottom-0 p-8 pb-8 justify-between items-end pointer-events-none"> <label class="btn btn-circle swap swap-rotate drop-shadow-sm border-none lg:hover:btn-active pointer-events-auto"> <input type="checkbox"${add_attribute("checked", $muted, 1)}>  <svg class="swap-off w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path></svg>  <svg class="swap-on w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"></path></svg></label>  <div class="flex flex-col items-center w-1/4 pointer-events-auto">${``} <label class="btn btn-circle swap swap-rotate drop-shadow-sm border-none lg:hover:btn-active "> <input type="checkbox"${add_attribute("checked", timerActive, 1)}>  <svg class="swap-off w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>  <svg class="swap-on w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></label></div> <button class="btn btn-circle drop-shadow-sm lg:hover:btn-active pointer-events-auto" data-svelte-h="svelte-erxapo"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button></div> <button class="w-full h-full flex bg-base-200 flex-col cursor-auto"><section id="curved" class="${"flex flex-col items-center w-full h-3/6 bg-base-200 after:duration-300 after:transition-colors after:bg-" + escape(colorMap[currentColorI], true)}"><div class="flex flex-col w-full p-10 text-center" data-svelte-h="svelte-1klq7mc"><span class="text-5xl font-light mb-2">TWISTER</span> <span>- The only version with tts and timer -</span></div> <div class="mt-auto mb-24"><h1 class="absolute -translate-y-1/2 -translate-x-1/2 drop-shadow-sm text-primary-content font-semibold text-center text-4xl">${escape(handfeetnameMap[currentHandfeetI])}</h1></div> <h1 class="z-20 text-base-200 drop-shadow-sm font-semibold text-center text-5xl">${escape(colorNameMap[currentColorI])}</h1></section>  <section class="${"z-10 w-full h-3/6 bottom duration-300 transition-colors bg-" + escape(colorMap[currentColorI], true)}"></section></button></div>`;
});
export {
  Page as default
};
