import {routing} from '$lib/routing/routesRouting.js'

export function load({params, cookies}){
    const cookie = cookies.getAll();
    console.log("loadfunction cookies:", cookie)
    console.log("loadfunction params:", params)
    console.trace("tracing param [...slug]/+page.server.js")
    const result= routing({params, cookies});
    return result;
}

