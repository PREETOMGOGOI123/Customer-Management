<script>
    import {goto} from '$app/navigation';
    export let enquiries = [];
    let customerName;
    function navigateToCustomer(customerName) {
        customerName = customerName;
    goto(`/enquiry-lists/${customerName}`, { replaceState: true });
  }
</script>

<aside class="h-[80vh] overflow-y-auto bg-base p-5 rounded-lg mb-5">
    {#each enquiries as enquiry}
    {#key customerName}

    
        <div on:click={() => navigateToCustomer(enquiry.customerName)} class="active:border-b-warning" > 
            <div
                class="bg-base-100 p-3 rounded-lg mb-4 cursor-pointer border-t-2 border-primary hover:shadow-success hover:shadow-sm transition-all duration-100 ease-linear hover:scale-[1.01]"
            >
                <div class="flex flex-col gap-0 items-center">
                    <div class="flex gap-2">
                        <input  
                            type="text"
                            name="enquiryId"
                            class="input input-xs max-h-fit min-w-fit cursor-pointer"
                            value={enquiry.id}
                            readonly
                        />
                        <input
                            type="text"
                            name="customerName"
                            class="input input-xs max-h-fit min-w-fit cursor-pointer"
                            value={enquiry.customerName}
                            readonly
                        />
                    </div>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            name="bikeType"
                            class="input input-xs max-h-fit min-w-fit cursor-pointer"
                            value={enquiry.typeOfBike}
                            readonly
                        />
                        <input
                            type="text"
                            name="rentalStatus"
                            class="input input-xs max-h-fit min-w-fit cursor-pointer"
                            value="Status: {!enquiry['rentalStatus'] &&
                            enquiry['isReturned']
                                ? 'Returned'
                                : !enquiry['rentalStatus'] &&
                                    !enquiry['isReturned']
                                  ? 'On Enquiry'
                                  : 'On Rent'}"
                            readonly
                        />
                    </div>
                    <div class="w-full flex justify-around items-center">
                        <input
                            type="text"
                            name="returnDate"
                            class="input input-xs max-h-fit max-w-fit cursor-pointer"
                            value="Return Date: {enquiry[
                                'Rental Return Date'
                            ] || 'N/A'}"
                            readonly
                        />
                        <label
                            class="h-3 w-36 label {!enquiry.rentalStatus &&
                            enquiry.isRented
                                ? 'bg-red-700'
                                : !enquiry.rentalStatus && !enquiry.isReturned
                                  ? 'bg-yellow-500'
                                  : 'bg-green-700'}"
                        ></label>
                    </div>
                </div>
            </div>
        </div>
    {/key}
    {/each}
</aside>
