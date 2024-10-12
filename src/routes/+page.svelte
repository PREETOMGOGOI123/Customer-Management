<script>
    import "../app.css";
    import Header from "./components/Header.svelte";
    import NewEnquiry from "./components/NewEnquiry/NewEnquiry.svelte";
    import Login from "./components/Login/Login.svelte";
    import AllEnquriries from "./components/AllEnquiries/AllEnquriries.svelte";

    let menuItems = ["New Enquiry", "All Enquiries", "Logout"];
    let activeMenuItem = "New Enquiry";
    let activeEnquiryItem;
    let currentEmployee = "";

    let enquiries = [
        {
            enquiryId: "EQ001",
            bikeQuantity: 8,
            bikeType: "Mountain",
            startDate: "2023-07-01",
            endDate: "2023-07-05",
            customerName: "John Doe",
            customerAddress: "123 Main St, Anytown, USA",
            customerContact: "9876543210",
            noOfDays: 5,
            enquiryStatus: "On Rent",
        },
        {
            enquiryId: "EQ002",
            bikeQuantity: 1,
            bikeType: "Road",
            startDate: "2023-07-10",
            endDate: "2023-07-12",
            customerName: "Jane Smith",
            customerAddress: "456 Elm St, Othertown, USA",
            customerContact: "8765432109",
            noOfDays: 3,
            enquiryStatus: "On Enquiry",
        },
        {
            enquiryId: "EQ003",
            bikeQuantity: 3,
            bikeType: "Electric",
            startDate: "2023-07-15",
            endDate: "2023-07-20",
            customerName: "Alice Johnson",
            customerAddress: "789 Oak St, Newcity, USA",
            customerContact: "7654321098",
            noOfDays: 6,
            enquiryStatus: "On Rent",
        },
        {
            enquiryId: "EQ004",
            bikeQuantity: 2,
            bikeType: "Hybrid",
            startDate: "2023-07-22",
            endDate: "2023-07-25",
            customerName: "Bob Williams",
            customerAddress: "101 Pine St, Greenville, USA",
            customerContact: "6543210987",
            noOfDays: 4,
            enquiryStatus: "On Enquiry",
        },
        {
            enquiryId: "EQ005",
            bikeQuantity: 1,
            bikeType: "City",
            startDate: "2023-07-28",
            endDate: "2023-07-30",
            customerName: "Carol Brown",
            customerAddress: "202 Maple St, Riverside, USA",
            customerContact: "5432109876",
            noOfDays: 3,
            enquiryStatus: "On Rent",
        },
        {
            enquiryId: "EQ006",
            bikeQuantity: 4,
            bikeType: "Mountain",
            startDate: "2023-08-01",
            endDate: "2023-08-07",
            customerName: "David Miller",
            customerAddress: "303 Cedar St, Hilltown, USA",
            customerContact: "4321098765",
            noOfDays: 7,
            enquiryStatus: "On Enquiry",
        },
        {
            enquiryId: "EQ007",
            bikeQuantity: 2,
            bikeType: "Tandem",
            startDate: "2023-08-10",
            endDate: "2023-08-12",
            customerName: "Emma Davis",
            customerAddress: "404 Birch St, Lakeside, USA",
            customerContact: "3210987654",
            noOfDays: 3,
            enquiryStatus: "On Rent",
        },
        {
            enquiryId: "EQ008",
            bikeQuantity: 1,
            bikeType: "Folding",
            startDate: "2023-08-15",
            endDate: "2023-08-18",
            customerName: "Frank Wilson",
            customerAddress: "505 Walnut St, Mountainview, USA",
            customerContact: "2109876543",
            noOfDays: 4,
            enquiryStatus: "On Enquiry",
        },
        {
            enquiryId: "EQ009",
            bikeQuantity: 3,
            bikeType: "Road",
            startDate: "2023-08-20",
            endDate: "2023-08-25",
            customerName: "Grace Taylor",
            customerAddress: "606 Chestnut St, Seaside, USA",
            customerContact: "1098765432",
            noOfDays: 6,
            enquiryStatus: "On Rent",
        },
        {
            enquiryId: "EQ010",
            bikeQuantity: 2,
            bikeType: "Electric",
            startDate: "2023-08-28",
            endDate: "2023-09-01",
            customerName: "Henry Anderson",
            customerAddress: "707 Elm St, Valleytown, USA",
            customerContact: "0987654321",
            noOfDays: 5,
            enquiryStatus: "On Enquiry",
        },
    ];

    function handleMenuItemChange(e) {
        activeMenuItem = e.detail;
        if(activeMenuItem === "Logout"){
            currentEmployee = "";
            activeMenuItem = "New Enquiry"
        }
    }

    function handleEnquirySubmit(event) {
        let enquiryData = event.detail;
        enquiries = [enquiryData, ...enquiries];
        activeMenuItem = "All Enquiries";
    }

    function handleClickedEnquiry(e) {
        activeEnquiryItem = e.detail;
    }

    function handleEnterEmployeeId(e) {
        currentEmployee = e.detail
        console.log(currentEmployee)
    }
</script>

{#if currentEmployee.length === 0}
    <Login on:handleEmployees={handleEnterEmployeeId} />
{:else}
    <div
        class="h-fit w-full container mx-auto relative my-10 rounded-b-lg shadow-lg shadow-indigo-600"
    >
        <Header
            {menuItems}
            {activeMenuItem}
            {enquiries}
            on:menuItemChange={handleMenuItemChange}
        />
        <div class="w-full m-auto p-10">
            {#if activeMenuItem === "New Enquiry"}
                <NewEnquiry on:submitEnquiryData={handleEnquirySubmit} {currentEmployee}/>
            {:else if activeMenuItem === "All Enquiries"}
                <AllEnquriries
                    {enquiries}
                    on:registeredEnquiryClicked={handleClickedEnquiry}
                    {activeEnquiryItem}
                />
            {:else if activeMenuItem === "Login"}
                <Login />
            {/if}
        </div>
    </div>
{/if}
