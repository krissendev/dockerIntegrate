<script>
    import {langdataContact }           from '$store/store.js';
	import { enhance }                  from '$app/forms';
    import { onMount }                  from 'svelte';
    let { data,form } = $props();



    let actionPath = $state(undefined);
    onMount(()=>{
        const currentPath = window.location.pathname + window.location.hash;
        actionPath = window.location.pathname + window.location.hash + "?/email";
    })
</script>
<div class="pageSection contactSvelte">
    <br>
    <h3 id="contact">This is Contact</h3>    
    <p>{$langdataContact}</p>
    <form method="POST" action={actionPath} use:enhance>
        <input name="name" type="name" placeholder="name">
        <input name="email" type="email"placeholder="email" required >
        <textarea name="message"type="text" required maxlength="1000" size="1000" placeholder="Max character length 1000" rows="7"></textarea>
        <button formaction={actionPath}>Send</button>
    </form>
    {#if form?.success}
        <p>Email successfully sent!</p>
    {/if}
</div>

<style>
    .contactSvelte{
        display:inline-block;

    }
    form{
        display:flex;
        flex-direction:column;
        /* width:70vw; */
        align-items: center;
        justify-content: center;
    } 
    form input, form textarea{
        font-size: 1.25rem;
        margin:5px;
        padding:10px;
        min-width:80vw;
    }
    form button{
        font-size: 1.25rem;
        width:80px;
        height:30px;
        
    }
</style>