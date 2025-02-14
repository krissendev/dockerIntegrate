import {routing} from '$lib/routing/routesRouting.js'

export function load({params}){
    const result= routing({params});
    return result;
}

// //handle URI route /one, as opposed to [...slug] /one/two...etc

// export async function load({params}){
//     console.log("[lang]:", params.lang)
//     return{props:{lang:params.lang}}
// }