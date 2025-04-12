import {routing}                            from '$lib/routing/routesRouting.js'

export function load({params, cookies}){
    const cookie = cookies.getAll();
    console.log("loadfunction cookies:", cookie)
    console.log("loadfunction params:", params)
    console.trace("tracing param /routes/+page.server.js")
    const result= routing({params, cookies});
    return result;
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

        try{
            //Internal API KEY "MAIL_API" for mail redirect
            const apikey = process.env.MAIL_API;
            if (!apikey || typeof apikey !== 'string') {
                throw new Error('MAIL_API environment variable is not set or is not a string');
            }
            try{
                const response = await fetch(apikey,
                    {
                        method:'POST', 
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(sendData)
                    });
                    if(response.ok){
                        console.log("Email sent successfully");
                        return { success: true };
                    } 
                    else {
                        console.log("Error sending email");
                        return { success: false };
                    }
                }
                catch(error){
                    console.error("Error making request:", error);
                    return { success: false, error: error.message };
                }
            }
            catch(error){
                console.error('Error fetching from MAIL_API:', error);
            }        
	}
};
