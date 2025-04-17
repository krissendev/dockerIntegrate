<script>
    import {langdataContact }           from '$store/store.js';

    import { onMount }                      from 'svelte';
    // let result;
	// let enhanceToggle = $state(false);
    let { data,form } = $props();


    ////TEMP Code /routes/api/redirectmail/+server.js - DELETE THIS LATER, only used for testing/learning purposes
    // async function fetchData() {
    //     const response = await fetch('/api/redirectmail');
    //     result = await response.text();
    // }

    // $effect(() => {
    //     console.log('Form state in +page.svelte:', form);
    // });
    let actionPath = $state(undefined);
    onMount(()=>{
        const currentPath = window.location.pathname + window.location.hash;
        // $: lang = $page.params.lang;
        actionPath = window.location.pathname + window.location.hash + "?/email";
        console.log("SECTIONCONTACT currentURL:", currentPath, " & emailURL:", actionPath)
    })
</script>
<div class="pageSection contactSvelte">
    <br>
    <h3 id="contact">This is Contact</h3>    
    <p>{$langdataContact}</p>
    <!-- <form method="POST" action="/[lang]?/email" use:enhance={handleEnhance}></form> -->
    <!-- <form method="POST" action=`${currentPath}?/email` use:enhance> -->
    <form method="POST" action={actionPath} use:enhance>
    <!-- <form method="POST" action="?/email" 
    use:enhance={()=>{
        enhanceToggle = true;
        return async ({ update }) => {
            await update();
            enhanceToggle = false;
        }   
    }}
> -->
        <input name="name" type="name" placeholder="name">
        <input name="email" type="email"placeholder="email" required >
        <textarea name="message"type="text" required></textarea>
        <button formaction="?/email">Send</button>
    </form>
    {#if form?.success}
        <p>Successfully logged in! Welcome back {JSON.stringify(form)} - {typeof(form)} - {typeof(form?.success)}</p>
    {/if}
    <!-- {#if enhanceToggle}
	<span class="saving">"sending email"...</span>
    {/if} -->


    <!-- //TEMP CODE /routes/api/redirectmail/+server.js - DELETE THIS LATER, only used for testing/learning purposes -->
    <!-- <button on:click={fetchData}>Fetch Data</button> -->
 
</div>
