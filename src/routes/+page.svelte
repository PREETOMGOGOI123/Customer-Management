<script>
    import "../app.css";
    import Login from "./components/Login/Login.svelte";
    import Header from "./components/Header.svelte";
    import NewEnquiry from "./components/NewEnquiry/NewEnquiry.svelte";
    import AllEnquriries from "./components/AllEnquiries/AllEnquriries.svelte";
    import RentalData from "./components/RentalData/RentalData.svelte"

    import { onMount } from "svelte";

    let menuItems = ["New Enquiry", "All Enquiries", "Rental Data", "Logout"];
    let activeMenuItem = "New Enquiry";
    let activeEnquiryItem;
    let currentEmployee = [];
    
    $: edit = false

    $: enquiries = [];

    function handleInitiateEdit() {
        edit = true;
        console.log('Edit initiated:', edit);
    }

    function handleCancelEdit() {
        edit = false;
        console.log('Edit cancelled:', edit);
    }

    function handleMenuItemChange(e) {
        activeMenuItem = e.detail;
        if (activeMenuItem === "Logout") {
            currentEmployee = [];
            activeMenuItem = "New Enquiry";
        }
    }

    function handleSelectedEnquiry(e) {
        activeEnquiryItem = e.detail;
        allowEdit = false;
    }

    function handleEnterEmployeeId(e) {
        currentEmployee = [e.detail];
        console.log(currentEmployee);
    }

    onMount(async () => {
        await loadEnquiries();
    });
    async function loadEnquiries() {
        const response = await fetch("./api/enquiries");
        enquiries = await response.json();
    }

    async function handleEnquirySubmit(event) {
        let enquiryData = event.detail;

        console.log("Submitting enquiry:", enquiryData); // Log the data being sent

        try {
            const response = await fetch("./api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    `Failed to submit enquiry: ${errorData.error || response.statusText}`,
                );
            }

            const createdEnquiry = await response.json();
            console.log("Received response:", createdEnquiry); // Log the server response

            enquiries = [createdEnquiry, ...enquiries];
            activeMenuItem = "All Enquiries";
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            // Handle error (e.g., show an error message to the user)
            alert(`Failed to submit enquiry: ${error.message}`);
        }
        activeEnquiryItem = enquiries[0].enquiryId
    }

    /* function handleEnquirySubmit(event) {
        let enquiryData = event.detail;
        enquiries = [enquiryData, ...enquiries];
        activeMenuItem = "All Enquiries";
    }
*/

    function handleDeleteEnquiry(e) {
        const enquiryIdToDelete = e.detail;
        enquiries = enquiries.filter(
            (enquiry) => enquiry.enquiryId !== enquiryIdToDelete,
        );
        if (activeEnquiryItem === enquiryIdToDelete) {
            activeEnquiryItem =
                enquiries.length > 0 ? enquiries[0].enquiryId : null;
        }
    }
 

    function handleSubmitEdittedData(e) {
        let enquiryToEditIndex = enquiries.findIndex(
            (enquiry) => enquiry.enquiryId === e.detail.enquiryId,
        );

        enquiries[enquiryToEditIndex] = e.detail;
        enquiries = [...enquiries]; // Trigger reactivity
        edit = false;
        console.log(edit)
    }

</script>

{#if currentEmployee.length === 0}
    <Login on:handleEmployees={handleEnterEmployeeId} />
{:else}
    <div
        class="h-full w-full mx-auto relative rounded-b-lg shadow-lg shadow-indigo-600 overflow-auto"
    >
        <Header
            {menuItems}
            {activeMenuItem}
            {enquiries}
            on:menuItemChange={handleMenuItemChange}
        />
        <div class="w-full m-auto p-10">
            {#if activeMenuItem === "New Enquiry"}
                <NewEnquiry
                    on:submitEnquiryData={handleEnquirySubmit}
                    {currentEmployee}
                />
            {:else if activeMenuItem === "All Enquiries"}
                <AllEnquriries
                    {enquiries}
                    on:registeredEnquiryClicked={handleSelectedEnquiry}
                    on:deleteEnquiry={handleDeleteEnquiry}
                    on:submitEnquiryData={handleSubmitEdittedData}
                    on:initiateEdit={handleInitiateEdit}
                    on:cancelEdit={handleCancelEdit}
                    {activeEnquiryItem}
                    {currentEmployee}
                    {edit}
                />
            {:else if activeMenuItem === "Rental Data"}
            <RentalData {enquiries}/>
            {:else if activeMenuItem === "Logout"}
                <Login />
            {/if}
        </div>
    </div>
{/if}
