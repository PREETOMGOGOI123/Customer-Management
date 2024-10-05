<script>
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';

    onMount((window)=>{
        goto('/enquiry-lists');
    });
</script>

