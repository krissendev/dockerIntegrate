<script>
	import Darkmode from './Darkmode.svelte'
	// import Tutorialtemp from './Tutorialtemp.svelte'
	import Nav from './Nav.svelte'
	import Flags from './Flags.svelte'
	import Content from './Content.svelte'
	import Language from './Language.svelte'
	let language = navigator.language;

</script>
<Language/>
<Nav/>
<Flags/>
<Darkmode/>
<Content/>
<!-- <Tutorialtemp/> -->
