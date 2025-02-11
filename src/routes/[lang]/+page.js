//handle URI route /one, as opposed to [...slug] /one/two...etc

export async function load({params}){
    console.log("[lang]:", params.lang)
    return{props:{lang:params.lang}}
}