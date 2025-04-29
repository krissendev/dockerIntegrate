import {routing}                            from '$lib/routing/routesRouting.js'

//Debugging environment variables


export function load({params, cookies}){
    const cookie = cookies.getAll();
    console.log("[...slug]/+page.server.js loadfunction cookies:", cookie, " ,params:", params)
    const result= routing({params, cookies});
    return result;
}

//POST request
export const actions = {
	email: async (event) => {
		console.log("email actions:", event);
        const data = await event.request.formData();
        const email = data.get("email")
        const name = data.get("name")
        const message = data.get("message")
        const sendData ={
            "email":email,
            "name":name,
            "body":message
        }
        console.log("email sendData...", JSON.stringify(sendData));

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
