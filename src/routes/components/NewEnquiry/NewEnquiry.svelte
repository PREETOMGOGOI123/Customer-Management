<script>
    import EnquiryForm from "../Shared/EnquiryForm.svelte";
    export let currentEmployee;

    // Dynamically stored messages when user enters the app
    const headlines = [
        `Yippee-ki-yay, ${currentEmployee}! That's how you close a deal!`,
        `${currentEmployee} just terminated the competition. Hasta la vista!`,
        `Great shot, ${currentEmployee}! That was one in a million!`,
        `${currentEmployee}, you're king of the world with this new customer!`,
        `Mischief managed, ${currentEmployee}! You've done brilliantly!`,
        `${currentEmployee} doesn't get new customers. ${currentEmployee} makes new customers.`,
        `${currentEmployee}, we're gonna need a bigger commission check!`,
        `Mama says ${currentEmployee} is like a box of chocolates. Always full of sweet deals!`,
        `${currentEmployee}, you had me at 'new customer'.`,
        `I love the smell of new customers in the morning. Way to go, ${currentEmployee}!`,
    ];




</script>

    <h1
        class="text-lg font-light text-center mb-14 drop-shadow-lg drop-shadow-accent animate-pulse animate-pulse-fast"
    >
        {headlines[Math.floor(Math.random() * 10)]}
    </h1>
    <EnquiryForm {currentEmployee} on:submitEnquiryData/>