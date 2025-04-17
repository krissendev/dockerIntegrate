import {routing}                            from '$lib/routing/routesRouting.js'

//Debugging environment variables
import { env as dynamicEnv} from '$env/dynamic/private';
const dynamicOrigin = dynamicEnv.ORIGIN || undefined;


export function load({params, cookies}){
    const cookie = cookies.getAll();
    console.log("loadfunction cookies:", cookie)
    console.log("loadfunction params:", params)
    console.trace("tracing param /routes/+page.server.js")
    const result= routing({params, cookies});
    return {...result,
        "dynamicOrigin":dynamicOrigin,
    };
}

//POST request
export const actions = {
	email: async (event) => {
		console.log("hello email..");
        // console.log(event);
        const data = await event.request.formData();
        const email = data.get("email")
        const name = data.get("name")
        const message = data.get("message")
        const sendData ={
            "email":email,
            "name":name,
            "body":message
        }
        console.log("sendData...", JSON.stringify(sendData));
        console.log(`form - email:${email}, name:${name}, message:${message}`)

        // await new Promise((resolve) => {
        //     setTimeout(() => {
        //       console.log("Delayed for 3 seconds.");
        //       resolve();
        //     }, 3000);
        //     return { success: true };
        //   });
        return { success: true };
    }
};