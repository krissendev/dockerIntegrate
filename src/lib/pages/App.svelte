<script>
    import Navigation                              from './Navigation.svelte'
    import UtilLangLoad                         from './UtilLangLoad.svelte'
    import SectionProjects                  from './SectionProjects.svelte'
    import { page }                         from '$app/state';
    import {updateStoreObject, storeMap}    from '$lib/routing/storeHandler.js'

    //From routing +page.server.js load function into & from /lib/routesRouting.js
    let { data,form } = $props();

    updateStoreObject(storeMap.sessionPreferences, "lang", data.lang)
    updateStoreObject(storeMap.sessionPreferences, "path", data.path)

</script>
<Navigation/>
<UtilLangLoad />
<h3>All Projects</h3>
<SectionProjects id="projects"/>



