<script>
    import {langdataContact }           from '$store/store.js';

    let result;

    ////TEMP Code /routes/api/redirectmail/+server.js - DELETE THIS LATER, only used for testing/learning purposes
    async function fetchData() {
        const response = await fetch('/api/redirectmail');
        result = await response.text();
    }
</script>
<div class="pageSection contactSvelte">
    <br>
    <h3 id="contact">This is Contact</h3>    
    <p>{$langdataContact}</p>
    <form method="POST" action="?/email">
        <input name="name" type="name" placeholder="name">
        <input name="email" type="email"placeholder="email" required >
        <textarea name="message"type="text" required></textarea>
        <button formaction="?/email">Send</button>
    </form>


    <!-- //TEMP CODE /routes/api/redirectmail/+server.js - DELETE THIS LATER, only used for testing/learning purposes -->
    <button on:click={fetchData}>Fetch Data</button>
    {#if result}
        <pre>{result}</pre>
    {/if}
</div>
