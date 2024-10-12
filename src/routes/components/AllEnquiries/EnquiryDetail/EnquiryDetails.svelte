<script>
    export let activeEnquiry;
</script>

        {#if activeEnquiry}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-2xl mb-4">
                        {activeEnquiry.customerName}
                    </h2>
                    <div class="grid grid-cols-2 gap-4">
                        <p>
                            <span class="font-bold">Bike Type:</span>
                            {activeEnquiry.bikeType}
                        </p>
                        <p>
                            <span class="font-bold">Quantity:</span>
                            {activeEnquiry.bikeQuantity}
                        </p>
                        <p>
                            <span class="font-bold">Start Date:</span>
                            {activeEnquiry.startDate}
                        </p>
                        <p>
                            <span class="font-bold">End Date:</span>
                            {activeEnquiry.endDate}
                        </p>
                        <p>
                            <span class="font-bold">Address:</span>
                            {activeEnquiry.customerAddress}
                        </p>
                        <p>
                            <span class="font-bold">Contact:</span>
                            {activeEnquiry.customerContact}
                        </p>
                        <p>
                            <span class="font-bold">Number of Days:</span>
                            {activeEnquiry.noOfDays}
                        </p>
                        <p>
                            <span class="font-bold">Status:</span>
                            <span
                                class="badge badge-primary"
                                class:bg-green-500={activeEnquiry.enquiryStatus ===
                                    "On Rent"}
                                class:bg-yellow-500={activeEnquiry.enquiryStatus ===
                                    "On Enquiry"}
                                >{activeEnquiry.enquiryStatus}</span
                            >
                        </p>
                    </div>
                    <div class="w-full flex gap-5 justify-center pt-10">
                        <button class="btn btn-warning w-28 rounded-md"
                            >Edit</button
                        >
                        {#if activeEnquiry.enquiryStatus !== "On Rent"}
                            <button
                                class="btn btn-error btn-outline w-28 rounded-sm"
                                >Delete</button
                            >
                        {/if}
                    </div>
                </div>
            </div>
        {:else}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <p class="text-center text-gray-500">
                        No enquiry selected
                    </p>
                </div>
            </div>
        {/if}