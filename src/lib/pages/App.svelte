<script>
    import Navigation                              from './Navigation.svelte'
    import UtilLangLoad                         from './UtilLangLoad.svelte'
    import SectionProjects                  from './SectionProjects.svelte'
    import { page }                         from '$app/state';
    import {updateStoreObject, storeMap}    from '$lib/routing/storeHandler.js'

    //From routing +page.server.js load function into & from /lib/routesRouting.js
    export let serverdataLangPath;
    updateStoreObject(storeMap.sessionPreferences, "lang", serverdataLangPath.lang)
    updateStoreObject(storeMap.sessionPreferences, "path", serverdataLangPath.path)

</script>
<Navigation/>
<UtilLangLoad />
<h3>All Projects</h3>
<SectionProjects id="projects"/>



