<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let enquiries;
    export let activeEnquiryItem = "";

    import { employees } from "$lib/data/employees";
    const employeeNames = employees.map((employee) => employee.name);
    /*function dateDifference(startDate, endDate) {
        let dateRange = `${startDate.split('-').reverse().join('/')} to ${endDate.split('-').reverse().join('/')}`;
        return dateRange;
    }*/

    function extractNameFromId(id) {
        const dashIndex = id.indexOf('-');
        if (dashIndex !== -1) {
            return id.substring(0, dashIndex);
        }
        return id;
    }

    $: filteredEmployees = enquiries.map(enquiry => extractNameFromId(enquiry.enquiryId));

</script>

<aside class="h-full w-[30%] flex flex-col gap-5 overflow-y-auto px-5 py-2">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <select class="border-2 py-2 w-full max-w-xs font-bold text-center rounded-md">
        <option selected disabled class="font-bold">Filter By Team Member</option>
        <option class="font-bold">All</option>
        {#each employeeNames as employee}
            <option class="font-bold uppercase">{employee}</option>
        {/each}
    </select>
    {#if enquiries.length}
        {#each enquiries as enquiry}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="h-fit btn rounded-md p-5 flex flex-col gap-5 items-start"
                class:border-2={enquiry.enquiryId !== activeEnquiryItem}
                class:btn-base={enquiry.enquiryId !== activeEnquiryItem}
                class:shadow-md={enquiry.enquiryId === activeEnquiryItem}
                class:scale-105={enquiry.enquiryId == activeEnquiryItem}
                class:shadow-indigo-600={enquiry.enquiryId ===
                    activeEnquiryItem}
                on:click={() => {
                    dispatch("registeredEnquiryClicked", enquiry.enquiryId);
                }}
            >
                <div class="w-full flex justify-between">
                    <p class="text-orange-600">{enquiry.enquiryId}</p>
                </div>
                <div class="w-full flex justify-between">
                    <p class="">{enquiry.customerName}</p>
                    <p class="">{enquiry.bikeType}</p>
                </div>
                <div class="w-full flex justify-between items-center">
                    <p class="">
                        status: {enquiry.enquiryStatus}
                    </p>
                    {#if enquiry.enquiryStatus === "On Enquiry"}
                        <div class="w-2 h-2 p-2 bg-yellow-500"></div>
                    {:else if enquiry.enquiryStatus === "On Rent"}
                        <div class="w-2 h-2 p-2 bg-green-500"></div>
                    {:else if enquiry.enquiryStatus === "Returned"}
                        <div class="w-2 h-2 p-2 bg-red-500"></div>
                    {/if}
                </div>
                <div class="w-full flex justify-between items-center">
                    <p>{enquiry.startDate} to {enquiry.endDate}</p>
                    <p>
                        {enquiry.noOfDays === 1
                            ? enquiry.totalHours === "24"
                                ? "1 day"
                                : `${enquiry.totalHours} hrs`
                            : `${enquiry.noOfDays} days`}
                    </p>
                </div>
            </div>
        {/each}
    {:else}
        <div>No enquiries found</div>
    {/if}
</aside>
