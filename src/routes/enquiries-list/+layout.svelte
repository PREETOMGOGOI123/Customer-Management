<script>
    import Sidebar from '$lib/Components/Sidebar/Sidebar.svelte';
    import {onMount} from 'svelte';

    $: enquiries = [];

    onMount(async () => {
        await loadEnquiries();
    });
 
    async function loadEnquiries() {
        const response = await fetch("../../api/enquiries");
        enquiries = await response.json();
    }
</script>
 
<main
    class="container w-[100%] bg-base-300 grid grid-cols-[40%_1fr] rounded-b-lg"
>
    <Sidebar enquiries={enquiries}/>
    <slot />
</main>