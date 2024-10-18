<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    export let currentEmployee = [];
    export let allowEdit;
    let formValid = true;

    const dispatch = createEventDispatcher();

    //Object to store the new enquiry details when form submitted

    export let enquiryData = {
        enquiryId: "",
        bikeQuantity: 0,
        bikeType: "",
        startDate: "",
        endDate: "",
        customerName: "",
        customerAddress: "",
        customerContact: "",
        noOfDays: 0,
        totalHours: 0,
        enquiryStatus: "",
        formatedStartDate: "",
        formatedEndDate: "",
    };

    // Creating Enquiry ID:
    $: if (!allowEdit) {
        enquiryData.enquiryId = `${currentEmployee[0]}-${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear().toString().slice(-2)}|${new Date().toLocaleTimeString("en-US", { hour12: false })}`;
    }

    // Handling Dates and no of days on rent

    let noOfDays;

    // Format Time
    $: {
        enquiryData.formatedStartDate = enquiryData.startDate
            .split("-")
            .reverse()
            .join("-");
        enquiryData.formatedEndDate = enquiryData.endDate
            .split("-")
            .reverse()
            .join("-");

        noOfDays = calculateDays(enquiryData.startDate, enquiryData.endDate);
        enquiryData.noOfDays = noOfDays;
    }

    // Function to calculate the total no of days on rent
    function calculateDays(start, end) {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both start and end dates
    }

    // validate Date Entry
    $: {
        let startDate = new Date(enquiryData.startDate);
        let endDate = new Date(enquiryData.endDate);
        let currentDate = new Date();

        if (!allowEdit) {
            if (enquiryData.startDate !== "") {
                if (endDate < startDate) {
                    alert(
                        `The End Date cannot be before the Start Date. Please choose an End Date on or after ${enquiryData.startDate}`,
                    );
                    enquiryData.endDate = "";
                }
            }
            if (startDate < currentDate) {
                alert(
                    `The Start Date cannot be in the past. Please select a date on or after ${currentDate.toLocaleDateString()}`,
                );
                enquiryData.startDate = "";
                enquiryData.endDate = "";
            }
        }
    }

    // Vlidate Customer Name
    $: {
        if (enquiryData.customerName) {
            const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (specialCharRegex.test(enquiryData.customerName)) {
                alert(
                    "Customer name should not contain any special characters.",
                );
                enquiryData.customerName = "";
            } else {
                enquiryData.customerName =
                    enquiryData.customerName.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            }
        }
    }

    // Validate Customer Address
    $: if (enquiryData.customerAddress) {
        enquiryData.customerAddress = enquiryData.customerAddress.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    //Validate Customer Phone Number
    function validatePhone(phoneNumber) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    // Function to handle submit button
    function handleSubmit() {
        if (!validatePhone(enquiryData.customerContact)) {
            alert("Please enter a valid 10 digit phone number.");
            formValid = false;
        } else {
            formValid = true;
        }

        if (formValid) {
            dispatch("submitEnquiryData", enquiryData);
            console.log(enquiryData);
        }
    }

    //
</script>

<form
    class="w-fit mx-auto my-5 flex flex-col gap-10 items-center"
    on:submit|preventDefault={handleSubmit}
>
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
        {#if enquiryData.noOfDays === 1}
            <div class="w-[30rem] flex gap-2 items-center" items-end>
                <label for="total-hours" class="w-32">Total Hours:</label>
                <select
                    id="total-hours"
                    class="select select-bordered min-w-[20rem] focus:outline-none"
                    bind:value={enquiryData.totalHours}
                >
                    <option disabled selected>0</option>
                    <option>3</option>
                    <option>6</option>
                    <option>8</option>
                    <option>12</option>
                    <option>24</option>
                </select>
            </div>
        {/if}
    </fieldset>

    <div class="mx-auto">
        <p
            class="btn btn-outline w-fit px-4 py-2 rounded-sm cursor-default"
            class:text-white={allowEdit}
        >
            Total Days: {enquiryData.noOfDays}
        </p>
    </div>

    <fieldset
        class="bike-details w-full m-auto flex flex-wrap justify-evenly items-center gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-name" class="w-32">Customer Name:</label>
            <input
                type="text"
                class="input input-bordered min-w-[20rem] focus:outline-none capitalize"
                bind:value={enquiryData.customerName}
            />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-address" class="w-32">Customer Address:</label>
            <input
                type="text"
                class="input input-bordered min-w-[20rem] focus:outline-none capitalize"
                bind:value={enquiryData.customerAddress}
                required
            />
        </div>
    </fieldset>

    <fieldset
        class="bike-details w-full m-auto flex flex-wrap justify-evenly items-center gap-10"
    >
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="customer-contact" class="w-32">Customer Contact:</label>
            <input
                type="tel"
                class="input input-bordered min-w-[20rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
                bind:value={enquiryData.customerContact}
                required
            />
        </div>
        <div class="w-[30rem] flex gap-2 items-center" items-end>
            <label for="enquiry-status" class="w-32">Enquiry Status:</label>
            <select
                class="select select-bordered min-w-[20rem] focus:outline-none"
                bind:value={enquiryData.enquiryStatus}
                required
            >
                <option selected>On Enquiry</option>
                <option>On Rent</option>
                {#if allowEdit}
                    <option>Returned</option>
                {/if}
            </select>
        </div>
    </fieldset>
    {#if allowEdit}
        <div class="w-full flex items-center justify-around">
            <Button>Save</Button>
            <Button on:click>Cancel</Button>
        </div>
    {:else}
        <Button>Submit</Button>
    {/if}
</form>
