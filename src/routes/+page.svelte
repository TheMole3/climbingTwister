<script>
    import { fly, fade } from 'svelte/transition'
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    /*
        Settings
    */
    import { airEnabled, muted, swooshEnabled} from '$lib/store.js'

    let settingsOpen = false;




    /* Audio map
        0: Right hand
        1: Left hand
        2: Right foot
        3: Left foot
        4: Red
        5: Blue
        6: Green
        7: Yellow
        8: air
    */
    let whooshAudio;
    let audioMap = ["./audio/righthand.mp3","./audio/lefthand.mp3", "./audio/rightfoot.mp3", "./audio/leftfoot.mp3", "./audio/red.mp3", "./audio/blue.mp3", "./audio/green.mp3", "./audio/yellow.mp3", "./audio/air.mp3"]
    let audioElements = []

    // Create all audio elements
    onMount(() => {
        whooshAudio.volume = 0.2

        for(let src of audioMap) {
            let a = document.createElement("audio");
            a.src = src;
            let adelm = document.body.appendChild(a)
            audioElements.push(adelm)
        }
    })

    let playSound = async (handfeetI, colorI) => {
        if($swooshEnabled) whooshAudio.play();
        if($muted) return;

        setTimeout(() => {
            let audioHandFeet = audioElements[handfeetI];
            audioHandFeet.play()
            audioHandFeet.addEventListener("pause", (event) => {
                setTimeout(() => {
                    let audioColor = audioElements[colorI + 4];
                    audioColor.play()
                , 300})
                
            }, { once: true });
        }, 400)

    }

    // Timer

    let timerActive = false;
    let maxTime = 20;
    let time = 20;
    let timerInterval;

    let countdown = () => {
        time--
        if(time == 0) {
            randomize();
        }
    }

    let addToCountdown = () => {
        maxTime += 5
    }
    let subtractFromCountdown = () => {
        if(maxTime <= 5) return;
        maxTime -= 5
    }

    $: {
        if(timerActive) {
            time = maxTime
            clearInterval(timerInterval);
            timerInterval = setInterval(countdown, 1000)
        } else {
            clearInterval(timerInterval);
        }
    }

    /* Color map
        0: red
        1: blue
        2: green
        3: yellow
        4: air
    */
    let currentColorI = 0
    let colorMap = ["red-500", "blue-500", "green-500", "yellow-500", "teal-300"]
    let colorNameMap= ["RED", "BLUE", "GREEN", "YELLOW", "AIR"]

    let handfeetnameMap = ["RIGHT HAND", "LEFT HAND", "RIGHT FOOT", "LEFT FOOT"]

    let currentHandfeetI = 0
    let randomUpdated = false;

    let previousColors = [];
    let previousHandfeet = [];

    let randomizeByKey = (e) => {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
        ) {
            randomize();
        }
    }
    onMount(() => {
        document.addEventListener("keypress", (event) => {randomizeByKey(event)});
    })

    let randomize = () => {
        time = maxTime;

        // Generate color
        let newColorI = Math.floor(Math.random()*5);
        // Prevent to much repetition
        if(previousColors[0] == previousColors[1] == newColorI) return randomize();
        previousColors.unshift(newColorI)
        previousColors = previousColors.slice(0,2)

        // Generate hand feet
        let newHandFeetI = Math.floor(Math.random()*4);
         // Prevent to much repetition
        if(previousHandfeet[0] == previousHandfeet[1] == newHandFeetI) return randomize();
        previousHandfeet.unshift(newHandFeetI)
        previousHandfeet = previousHandfeet.slice(0,2)

        // If air is deactivated and it picked air, reroll
        if(!$airEnabled && newColorI == 4) return randomize();

        // If it is the same, pick a new combo
        if(newColorI == currentColorI && newHandFeetI == currentHandfeetI) return randomize();

        currentColorI = newColorI;
        currentHandfeetI = newHandFeetI;

        randomUpdated = !randomUpdated
        playSound(currentHandfeetI, currentColorI)
    }

    
</script>


{#if settingsOpen}
    
    <div class="absolute w-screen h-screen backdrop-blur-sm backdrop-brightness-[85%] z-30 flex flex-col items-center" transition:fade={{ delay: 0, duration: 200 }}>
        <div class="h-1/6"></div>
        <div class="w-11/12 max-w-md h-96 bg-base-200 rounded-2xl drop-shadow-lg">
            <button on:click={() => {settingsOpen = !settingsOpen}} class="btn btn-square btn-secondary absolute right-0 m-2 rounded-lg rounded-tr-2xl drop-shadow-sm">
                <!-- Close icon -->
                <svg class="w-6 h-6"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="w-[22rem] h-full p-4 pl-7 text-lg font-thin flex flex-col justify-between">
                <div>
                    <span class="text-3xl">Twister!</span><br>
                    A Twister Spinner that you can use both in normal Twister and in climbing Twister
                </div>

                <div>
                    Settings:
                    <label class="label justify-start gap-4 cursor-pointer">
                        <input bind:checked={$airEnabled}  type="checkbox" class="checkbox" />
                        <span class="label-text text-left text-base">Air - The player must put a hand or foot in the air</span> 
                    </label> 
                    <label class="label justify-start gap-4 cursor-pointer">
                        <input bind:checked={$swooshEnabled} type="checkbox" class="checkbox" />
                        <span class="label-text text-left text-base">Swoosh - Play swoosh sound when spinning</span> 
                    </label>
                </div>

                <span >
                    Developed by Hugo Arnlund<br>
                    <a href="https://melo.se">Melo.se</a>
                </span>
            </div>
        </div>
    </div>

{/if}

<div class="w-screen h-screen select-none">
    <audio src="./audio/whoosh.mp3" bind:this={whooshAudio}></audio>

    <div class="z-20 absolute flex w-full bottom-0 p-8 pb-8 justify-between items-end pointer-events-none">

        <!-- MUTING -->
        <label class="btn btn-circle swap swap-rotate drop-shadow-sm border-none lg:hover:btn-active pointer-events-auto">
            <!-- this hidden checkbox controls the state -->
            <input bind:checked={$muted} type="checkbox" />
            
            <!-- volume on icon -->
            <svg class="swap-off w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
                          
            <!-- volume off icon -->
            <svg class="swap-on w-6 h-6"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
              
        </label>

        <!-- TIMER -->

        <div class="flex flex-col items-center w-1/4 pointer-events-auto">

            {#if timerActive}
                <div class="flex flex-row justify-between gap-1 mb-4 items-center btn-base-300" transition:fade={{ delay: 0, duration: 100 }}>

                    <button on:click={addToCountdown} class="btn btn-circle w-12 h-12 drop-shadow-sm btn-ghost lg:hover:btn-active">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

                    <div class="btn cursor-auto w-16 h-16 text-4xl btn-circle drop-shadow-sm btn-ghost">
                        {time}
                    </div>

                    <button on:click={subtractFromCountdown} class="w-12 h-12 btn btn-circle drop-shadow-sm btn-ghost lg:hover:btn-active">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </button>
                </div>
            {/if}

            <label class="btn btn-circle swap swap-rotate drop-shadow-sm border-none lg:hover:btn-active ">
                <!-- this hidden checkbox controls the state -->
                <input bind:checked={timerActive} type="checkbox" />
                
                <!-- Timer icon -->
                <svg class="swap-off w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                              
                <!-- Close icon -->
                <svg class="swap-on w-6 h-6"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                  
            </label>
        </div>



        <button on:click={() => {settingsOpen = !settingsOpen}} class="btn btn-circle drop-shadow-sm lg:hover:btn-active pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>              
        </button>
    </div>


    <button on:click={randomize} on:keypress={randomizeByKey} class="w-full h-full flex bg-base-200 flex-col cursor-auto">
        <section id="curved" class="flex flex-col items-center w-full h-3/6 bg-base-200 after:duration-300 after:transition-colors after:bg-{colorMap[currentColorI]}">
            <div class="flex flex-col w-full p-10 text-center">
                <span class="text-5xl font-light mb-2">TWISTER</span>
                <span>- The only version with tts and timer -</span>
            </div>

            <div class="mt-auto mb-24">
                {#key randomUpdated} 
                    <h1 transition:fly={{ delay: 0, duration: 500, x: 0, y: 200, opacity: 0.5, easing: quintOut }} class=" absolute -translate-y-1/2 -translate-x-1/2 drop-shadow-sm text-primary-content font-semibold text-center text-4xl">{handfeetnameMap[currentHandfeetI]}</h1>
                {/key}
            </div>
            <h1 class="z-20 text-base-200 drop-shadow-sm font-semibold text-center text-5xl">{colorNameMap[currentColorI]}</h1>
            
        </section>
        <!-- Color part -->
        <section  class="z-10 w-full h-3/6 bottom duration-300 transition-colors bg-{colorMap[currentColorI]}"> 
        </section>
    </button>

</div>