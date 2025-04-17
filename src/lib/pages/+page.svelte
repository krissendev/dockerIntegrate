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
    let { data,form } = $props();

    updateStoreObject(storeMap.sessionPreferences, "lang", data.lang)
    updateStoreObject(storeMap.sessionPreferences, "path", data.path)
    
    //Debugging environment variables
    console.log("checking for environment values...")
    console.log(JSON.stringify(data))
    console.log("dynamicOrigin:",data.dynamicOrigin)

</script>
<Navigation/>
<UtilLangLoad />
<SectionHome id="home"/>
<SectionProjects id="projects"/>
<SectionAbout id="about"/>
<SectionContact id="contact" data={data} form={form}/>
<SectionFooter />


