import {routing} from '$lib/routing/routesRouting.js'

export function load({params, cookies}){
    const cookie = cookies.getAll();
    console.log("loadfunction cookies:", cookie)
    console.log("loadfunction params:", params)
    console.trace("tracing param [lang]/+page.server.js")
    const result= routing({params, cookies});
    return result;
}

// //handle URI route /one, as opposed to [...slug] /one/two...etc

// export async function load({params}){
//     console.log("[lang]:", params.lang)
//     return{props:{lang:params.lang}}
// }