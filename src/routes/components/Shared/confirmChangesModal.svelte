<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    import Button from "./Button.svelte";
</script>

<div class="parent w-[100vw] h-[100vh] absolute left-0 top-0 flex items-center justify-center bg-black bg-opacity-80">
    <div class="child modal-box bg-secondary">
        <h3 class="text-secondary-content text-center text-xl mb-0 tracking-wider"><slot></slot></h3>
        <div class="w-full flex justify-around">
            <Button on:click={()=>{dispatch('confirmDelete')}}>Yes</Button>
            <Button on:click={()=>{dispatch('cancelDelete')}}>No</Button>
        </div>
    </div>
</div>
