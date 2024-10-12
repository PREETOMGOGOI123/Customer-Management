<script>
    import {theme} from '../../lib/stores/theme'
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let menuItems = [];
    export let activeMenuItem = "";
    export let enquiries;


    $: totalBikesOnRent = enquiries.reduce((total, enquiry) => {
        if (enquiry.enquiryStatus === 'On Rent') {
            return total + enquiry.bikeQuantity;
        } else {
            return total;
        }
    }, 0);


    function toggleTheme() {
        $theme = $theme === 'lofi' ? 'business' : 'lofi';
    }

</script>

<header>
    <nav class="w-full navbar bg-primary rounded-t-lg flex justify-around items-center">
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="btn btn-ghost text-xl text-primary-content rounded-md" on:click={() => dispatch('menuItemChange', 'New Enquiry')}>
                SPOKEHUB RENTALS
            </div>
        </div>
        <div class="toggle-button form-control">
            <label class="label cursor-pointer flex gap-4 items-center">
                <span class="text-sm">🌓</span>
                <input type="checkbox" class="toggle" checked={$theme === 'dark'} on:change={toggleTheme} />
              </label>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                {#each menuItems as item}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <li class="btn btn-ghost text-primary-content hover:scale-105 transition-all duration-300" on:click={() => dispatch('menuItemChange', item)}>
                        <div class:active={item === activeMenuItem}>
                            {item}
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
    <div class="bg-base-200 p-4">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
            <div class="flex-1 mr-4">
                <div class="relative">
                    <input 
                        type="text" 
                        placeholder="Search enquiries..." 
                        class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    />
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <span class="font-bold text-lg">Total Bikes on Rent: </span>
                <span class="ml-2 text-xl font-bold">{totalBikesOnRent}</span>
            </div>
        </div>
    </div>
</header>
