<script>
    //Handle routing
    import Home from './Home.svelte';
    import About from './About.svelte';
    import NotFound from './NotFound.svelte';
    let currentRoute = window.location.pathname;

</script>
{#if currentRoute ==='/' || currentRoute ==='/home'}
    <Home/>
{:else if currentRoute === '/about'}
    <About/>
{:else}
    <NotFound/>
{/if}