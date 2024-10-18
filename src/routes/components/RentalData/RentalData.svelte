<script>
    export let enquiries;
    console.log(enquiries);
    $: completedRentals = enquiries.filter(
        (enquiry) => enquiry.enquiryStatus === "Returned",
    );
    console.log("Completed Rentals:", completedRentals);

    $: totalBikesRented = completedRentals.reduce((total, enquiry) => {
        return total + enquiry.bikeQuantity;
    }, 0);
</script>

<div class="container mx-auto text-center">
    <h1 class="mb-14 mt-10 font-bold text-lg text-error">
        Rent Completed: {totalBikesRented}
    </h1>

    {#if completedRentals && completedRentals.length > 0}
        <ul class="w-[80%] mx-auto flex gap-5 flex-wrap list-none p-0 items-center">
            {#each completedRentals as rental}
                <li class="w-full mb-4 p-4 bg-base-300 text-base-content rounded-lg shadow flex flex-wrap justify-around gap-10">
                    <div>
                        <p class="font-bold">{rental.customerName}</p>
                        <p>Ph: {rental.customerContact}</p>
                    </div>
                    <div>
                        <p>Bike Type: {rental.bikeType}</p>
                        <p>Quantity: {rental.bikeQuantity}</p>
                    </div>
                    <div>
                        <p>Duration: {rental.noOfDays} days</p>
                        <p>
                            From: {rental.formatedStartDate} To: {rental.formatedEndDate}
                        </p>
                    </div>
                    <div>
                        <p><strong>Address: {rental.customerAddress}</strong></p>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-lg">No completed rentals found.</p>
    {/if}
</div>
