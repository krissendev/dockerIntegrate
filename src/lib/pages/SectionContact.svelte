<script>
    import {langdataContact, 
        cssDarkmodeModal }              from '$store/store.js';
	import { enhance }                  from '$app/forms';
    let { data,form } = $props();


</script>
<div class="pageSection contactSvelte">
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconContact"></div>
    <h3 id="contact">This is Contact</h3>    
    <p>{$langdataContact}</p>
    <form aria-label="Email form" method="POST" action="?/email" use:enhance>
        <input aria-label="Write your name" name="name" type="name" placeholder="name">
        <input aria-label="Write your email" name="email" type="email"placeholder="email" required >
        <textarea aria-label="Write your message" name="message"type="text" required maxlength="1000" size="1000" placeholder="Max character length 1000" rows="7"></textarea>
        <button title="Send email" aria-label="Send email form">Send</button>
    </form>
    {#if form?.success}
        <p>Email successfully sent!</p>
    {/if}
</div>

<style>
    @import '$lib/layout/pages.css';
    button{
        font-weight: bold;
        background-color: #FF5900;
    }
    button:hover{background-color: #F4953E;}
    button:active{background-color: #F4953E;}
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