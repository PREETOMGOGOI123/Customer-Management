<script>
    import { createEventDispatcher } from "svelte";
    import Button from "../../Shared/Button.svelte";
    import ConfirmChangesModal from "../../Shared/confirmChangesModal.svelte";
    import EnquiryForm from "../../Shared/EnquiryForm.svelte";
    export let activeEnquiry;
    export let currentEmployee;

    export let edit = false;

    let showModal = false;

    $: activeEnquiryCreator = activeEnquiry.enquiryId.split("-")[0] || "";

    const dispatch = createEventDispatcher();

    function handleDelete() {
        if (activeEnquiryCreator !== currentEmployee[0]) {
            alert(
                "You are not authorized to perform this action. You can only make changes to enquiries that you have created.",
            );
        } else {
            showModal = true;
        }
    }

    function confirmDeleteAction(confirmed) {
        showModal = false;
        if (confirmed) {
            dispatch("deleteEnquiry", activeEnquiry.enquiryId);
        }
    }

    function handleInitiateEdit() {
        dispatch("initiateEdit");
    }

    function handleCancelEdit() {
        dispatch("cancelEdit");
    }
</script>

{#if activeEnquiry}
    {#if edit}
        <div
            class="w-[100vw] h-[100vh] bg-black absolute top-0 left-0 bg-opacity-70"
        >
            <div class="mt-24 w-fit m-auto p-10 rounded-lg bg-neutral">
                <EnquiryForm
                    enquiryData={activeEnquiry}
                    allowEdit={edit}
                    on:submitEnquiryData
                    on:click={handleCancelEdit}
                />
            </div>
        </div>
    {:else}
        <div class="card text-base shadow-xl">
            <div class="mx-auto card-body">
                <div class="w-fit mb-2">
                    <p class="card-title text-indigo-500 text-[15px] mb-2">
                        {activeEnquiry.enquiryId}
                    </p>
                    <p
                        class="drop-shadow-md mb-6 badge badge-primary text-base py-4 text-white"
                        class:bg-green-500={activeEnquiry.enquiryStatus ===
                            "On Rent"}
                        class:bg-yellow-500={activeEnquiry.enquiryStatus ===
                            "On Enquiry"}
                        class:bg-red-500={activeEnquiry.enquiryStatus ===
                            "Returned"}
                    >
                        {activeEnquiry.enquiryStatus}
                    </p>
                </div>
                <div class="flex flex-wrap gap-4 gap-x-24 text-lg">
                    <div class="flex flex-col gap-y-8">
                        <h2 class="card-title drop-shadow-md">
                            {activeEnquiry.customerName}
                        </h2>
                        <p class="drop-shadow-md">
                            <span class="font-bold">Bike Type:</span>
                            {activeEnquiry.bikeType}
                        </p>
                        <p class="drop-shadow-md">
                            <span class="font-bold">Quantity:</span>
                            {activeEnquiry.bikeQuantity}
                        </p>
                    </div>
                    <div class="flex flex-col gap-y-8">
                        <p class="drop-shadow-md">
                            <span class="font-bold">Start Date:</span>
                            {activeEnquiry.formatedStartDate}
                        </p>
                        <p class="drop-shadow-md">
                            <span class="font-bold">End Date:</span>
                            {activeEnquiry.formatedEndDate}
                        </p>
                        {#if activeEnquiry.totalHours == 0}
                            <p class="drop-shadow-md">
                                <span class="font-bold">Number of Days:</span>
                                {activeEnquiry.noOfDays}
                            </p>
                        {:else if activeEnquiry.totalHours === "24"}
                            <p class="drop-shadow-md">
                                <span class="font-bold">Number of Days:</span>
                                1 day
                            </p>
                        {:else}
                            <p class="drop-shadow-md">
                                <span class="font-bold">Total Hours:</span>
                                {activeEnquiry.totalHours}
                            </p>
                        {/if}
                    </div>
                    <div class="flex flex-col gap-y-8">
                        <p class="drop-shadow-md w-[10rem]">
                            <span class="font-bold">Address:</span>
                            {activeEnquiry.customerAddress}
                        </p>
                        <p class="drop-shadow-md">
                            <span class="font-bold">Contact:</span>
                            {activeEnquiry.customerContact}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex gap-5 flex-wrap">
            <Button on:click={handleInitiateEdit}>Edit</Button>
            {#if activeEnquiry.enquiryStatus !== "On Rent"}
                <Button on:click={handleDelete}>Delete</Button>
            {/if}
        </div>
        <div>
            {#if showModal}
                <ConfirmChangesModal
                    on:confirmDelete={() => confirmDeleteAction(true)}
                    on:cancelDelete={() => confirmDeleteAction(false)}
                >
                    Are you sure you want to delete this enquiry?
                </ConfirmChangesModal>
            {/if}
        </div>
    {/if}
{:else}
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <p class="text-center text-gray-500 text-xl drop-shadow-md">
                No enquiry selected
            </p>
        </div>
    </div>
{/if}
