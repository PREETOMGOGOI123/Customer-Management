<script>
    import { createEventDispatcher } from "svelte";
    import {employees} from '$lib/data/employees.js'

    $: employeeId = "";
    const dispatch = createEventDispatcher();

    function handleSubmit(){
        const employee = employees.find(person => person.id.toUpperCase() === employeeId.toUpperCase());
        if(employee){
            dispatch('handleEmployees', employee.name);
        } else {
            alert("Invalid Employee Id");
        }
    }

</script>

<div class="w-[100%] h-[100%] bg-neutral text-neutral-content">
    <form
        class="w-full text-center m-auto pt-[15%] flex flex-col gap-5 items-center"
        items-end
        on:submit|preventDefault={handleSubmit}
    >
        <h1 class="text-xl capitalize tracking-widest">
            Enter Your <strong>Employee Id</strong>
        </h1>
        <input
            type="password"
            class="input input-bordered text-primary text-center w-[20rem] focus:outline-none uppercase"
            bind:value={employeeId}
        />
        <button class="btn btn-outline btn-info">Login</button>
    </form>
</div>
