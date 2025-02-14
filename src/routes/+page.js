import {routing} from '$lib/routing/routesRouting.js'

export function load({params}){
    const result= routing({params});
    return result;
}