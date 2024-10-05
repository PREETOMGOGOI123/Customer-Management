<script>
    import { page } from '$app/stores';
    import {onMount} from 'svelte';
    let customerName;
    onMount(()=>{
    customerName = $page.params;
    console.log($page.params);
    console.log("Hwllo")
    console.log(customerName);
    });
  
  </script>

<h1>Hello world</h1>
