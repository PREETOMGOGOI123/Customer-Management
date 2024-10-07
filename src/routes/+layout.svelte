<script>
    import "../app.css";
    import Header from "$lib/Components/Header/Header.svelte";
</script>

<div class="container mx-auto relative mb-6"> 
    <Header />
    <slot />
</div>