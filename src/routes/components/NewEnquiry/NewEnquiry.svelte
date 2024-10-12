<script>
    import { createEventDispatcher } from 'svelte'
    import Button from '../Shared/Button.svelte';
    export let currentEmployee;
    const dispatch = createEventDispatcher();

    let enquiryData = {
        enquiryId: '',
        bikeQuantity: 0,
        bikeType: '',
        startDate: '',
        endDate: '',
        customerName: '',
        customerAddress: '',
        customerContact: '',
        noOfDays: 0,
        enquiryStatus: '',
    }

    const headlines = [
        `Yippee-ki-yay, ${currentEmployee}! That's how you close a deal!`,
    `${currentEmployee} just terminated the competition. Hasta la vista!`,
    `Great shot, ${currentEmployee}! That was one in a million!`,
    `${currentEmployee}, you're king of the world with this new customer!`,
    `That'll do, ${currentEmployee}. That'll do.`,
    `${currentEmployee} doesn't get new customers. ${currentEmployee} makes new customers.`,
    `${currentEmployee}, we're gonna need a bigger commission check!`,
    `Mama says ${currentEmployee} is like a box of chocolates. Always full of sweet deals!`,
    `${currentEmployee}, you had me at 'new customer'.`,
    `I love the smell of new customers in the morning. Way to go, ${currentEmployee}!`
    ];

    $: noOfDays = calculateDays(enquiryData.startDate, enquiryData.endDate)
    $: enquiryData.enquiryId = `${currentEmployee}-${new Date().getDate()}${new Date().getMonth() + 1}|${new Date().toLocaleTimeString('en-US', { hour12: false })}`

    function calculateDays(start, end) {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both start and end dates
    }

    function handleSubmit() { 
        enquiryData.noOfDays = noOfDays;
        dispatch('submitEnquiryData', enquiryData);
    }
</script>
<form class="w-fit mx-auto my-5 flex flex-col gap-10 items-center" on:submit|preventDefault={handleSubmit}>
    <h1 class="text-lg font-light text-center mb-5 drop-shadow-lg drop-shadow-accent">
        {headlines[Math.floor(Math.random() * 10)]}
    </h1>
    <fieldset
        class="bike-details w-fit mx-auto flex flex-wrap justify-evenly gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="bike-type" class="w-32">Bike Quantity</label>
            <input
                type="number"
                min="1"
                class="input input-bordered min-w-[20rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
                bind:value={enquiryData.bikeQuantity}
            />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="bike-type" class="w-32">Bike Type:</label>
            <select
                class="select select-bordered min-w-[20rem] focus:outline-none"
                bind:value={enquiryData.bikeType}
            >
                <option disabled selected>None</option>
                <option>Road</option>
                <option>Mountain</option>
                <option>Hybrid</option>
                <option>Mix</option>
            </select>
        </div>
    </fieldset>

    <fieldset
        class="bike-details w-fit mx-auto flex flex-wrap justify-evenly gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="start-date" class="w-32">Start Date:</label>
            <input
                type="date"
                id="start-date"
                name="start-date"
                required
                class="input input-bordered min-w-[20rem] focus:outline-none"
                bind:value={enquiryData.startDate}
            />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="end-date" class="w-32">End Date:</label>
            <input
                type="date"
                id="end-date"
                name="end-date"
                required
                class="input input-bordered min-w-[20rem] focus:outline-none"
                bind:value={enquiryData.endDate}
            />
        </div>
    </fieldset>

    <div class="w-[30rem]">
        <p class="text-neutral-content w-fit mx-auto px-4 py-2 border-2 bg-neutral rounded-md text-center shadow-xl">Total Days:  {noOfDays}</p>
    </div>

    <fieldset
        class="bike-details w-full m-auto flex flex-wrap justify-evenly items-center gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-name" class="w-32">Customer Name:</label>
            <input type="text" class="input input-bordered min-w-[20rem] focus:outline-none" bind:value={enquiryData.customerName} />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-address" class="w-32">Customer Address:</label>
            <input type="text" class="input input-bordered min-w-[20rem] focus:outline-none" bind:value={enquiryData.customerAddress} />
        </div>
    </fieldset>

    <fieldset
        class="bike-details w-full m-auto flex flex-wrap justify-evenly items-center gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-name" class="w-32">Customer Contact:</label>
            <input
                type="number"
                min="6000000000"
                max="9999999999"
                class="input input-bordered min-w-[20rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
                bind:value={enquiryData.customerContact}
            />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="enquiry-status" class="w-32">Enquiry Status:</label>
            <select
                class="select select-bordered min-w-[20rem] focus:outline-none"
                bind:value={enquiryData.enquiryStatus}
            >
                <option selected>On Enquiry</option>
                <option>On Rent</option>
            </select>
        </div>
    </fieldset>
    <Button btnClass="mt-14 bg-gray-200 text-black w-36 px-10 py-2 text-lg rounded-md hover:bg-gray-900 hover:text-white transition-all duration-[2sec] ease-in-out">Submit</Button>
</form>
