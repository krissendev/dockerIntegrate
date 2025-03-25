<script>
    import Navigation                              from './Navigation.svelte'
    import UtilLangLoad                         from './UtilLangLoad.svelte'
    import SectionHome                      from './SectionHome.svelte'
    import SectionProjects                  from './SectionProjects.svelte'
    import SectionAbout                     from './SectionAbout.svelte'
    import SectionContact                   from './SectionContact.svelte'
    import SectionFooter                   from './SectionFooter.svelte'
    import { page }                         from '$app/state';
    import {updateStoreObject, storeMap}    from '$lib/routing/storeHandler.js'

    //From routing +page.server.js load function into & from /lib/routesRouting.js
    export let serverdataLangPath;
    updateStoreObject(storeMap.sessionPreferences, "lang", serverdataLangPath.lang)
    updateStoreObject(storeMap.sessionPreferences, "path", serverdataLangPath.path)

</script>
<Navigation/>
<UtilLangLoad />
<SectionHome id="home"/>
<SectionProjects id="projects"/>
<SectionAbout id="about"/>
<SectionContact id="contact"/>
<SectionFooter />


