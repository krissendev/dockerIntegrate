<script>
    //Handle routing
    import Home from './Home.svelte';
    import About from './About.svelte';

    let currentRoute = window.location.pathname;

</script>
{#if currentRoute ==='/' || currentRoute ==='/home'}
    <Home/>
{:else if currentRoute === '/about'}
    <About/>
{:else}
    <h1>404 - Page Not Found</h1>
{/if}