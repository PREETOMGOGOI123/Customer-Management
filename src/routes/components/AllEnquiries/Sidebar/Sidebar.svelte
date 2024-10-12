<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let enquiries;
    export let activeEnquiryItem = "";
</script>

<aside class="h-full w-[30%] flex flex-col gap-5 overflow-y-auto px-5 py-2">
    {#if enquiries.length}
        {#each enquiries as enquiry}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="h-fit btn rounded-md p-5 flex flex-col gap-5 items-start"
                class:border-2={enquiry.customerName !== activeEnquiryItem}
                class:btn-base={enquiry.customerName !== activeEnquiryItem}
                class:shadow-md={enquiry.customerName === activeEnquiryItem}
                class:shadow-indigo-600={enquiry.customerName ===
                    activeEnquiryItem}
                on:click={() => {
                    dispatch("registeredEnquiryClicked", enquiry.customerName);
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
                    {/if}
                </div>
                <div class="w-full flex justify-between items-center">
                    <p>{enquiry.startDate} to {enquiry.endDate}</p>
                    <p>{enquiry.noOfDays} days</p>
                </div>
            </div>
        {/each}
    {:else}
        <div>No enquiries found</div>
    {/if}
</aside>
