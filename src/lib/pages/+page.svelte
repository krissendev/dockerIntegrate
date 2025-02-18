<script>
    import Nav from './Nav.svelte'
    import LangLoad from './LangLoad.svelte'

    import Home from './Home.svelte'
    import Projects from './Projects.svelte'
    import About from './About.svelte'
    import Contact from './Contact.svelte'
    import { page } from '$app/state';

    //From routing
    export let prop;

</script>
<!-- <div>+page.svelte Component, language URL; {prop}</div> -->

<Nav/>
<LangLoad />

<!--<Page prop={data.lang}/>-->

<Home id="home"/>
<Projects id="projects"/>
<About id="about"/>
<Contact id="contact"/>


