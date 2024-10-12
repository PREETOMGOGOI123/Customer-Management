<script>
    import Sidebar from "./Sidebar/Sidebar.svelte";
    import EnquiryDetails from "./EnquiryDetail/EnquiryDetails.svelte";
    export let enquiries;
    export let activeEnquiryItem = enquiries[0].customerName;

    $: activeEnquiry = enquiries.find(
        (enquiry) => enquiry.customerName === activeEnquiryItem,
    );
</script>

<div class="h-[75vh] flex">
    <Sidebar {enquiries} {activeEnquiryItem} on:registeredEnquiryClicked />
    <div class="w-[70%] h-[75vh] p-16">
        <EnquiryDetails {activeEnquiry} />
    </div>
</div>
