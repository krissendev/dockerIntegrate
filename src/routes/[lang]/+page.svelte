<script>	
    import Page                             from '$pages/+page.svelte'
    import App from '$pages/App.svelte'
    let { data } = $props();

    //check for app
    const path = data.path;
</script>
<!-- <h1>SLUG {data.title}, {data.path}, {data.lang} </h1>
<div>{@html data.content}</div> -->
{#if path=="app"}
    <App serverdataLangPath={data}/>
    {:else}
    <Page serverdataLangPath={data}/>
{/if}

