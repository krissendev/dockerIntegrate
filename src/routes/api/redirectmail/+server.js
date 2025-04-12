//TEMP FILE - DELETE THIS LATER, only used for testing/learning purposes
// Have to use +page.js for GET call ?


// This endpoint runs on the server when called.
export async function GET() {
    const res = await fetch('/redacted');
    const data = await res.text();
    console.log("GET FROM GCLOUD")
    console.log(data)
    return new Response(data, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  