<script>
    import Sidebar from "./Sidebar/Sidebar.svelte";
    import EnquiryDetails from "./EnquiryDetail/EnquiryDetails.svelte";
    export let enquiries;
    export let currentEmployee;
    export let edit;
    export let activeEnquiryItem = enquiries[0].enquiryId;

    $: activeEnquiry = enquiries.find(
        (enquiry) => enquiry.enquiryId === activeEnquiryItem,
    );
</script>

<div class="h-[75vh] flex">
    <Sidebar {enquiries} {activeEnquiryItem} on:registeredEnquiryClicked />
    <div class="w-[70%] h-[75vh] p-16">
        <EnquiryDetails {activeEnquiry} {currentEmployee} {edit} on:deleteEnquiry on:editEnquiry on:submitEnquiryData on:CancelEdit on:initiateEdit />
    </div>
</div>
