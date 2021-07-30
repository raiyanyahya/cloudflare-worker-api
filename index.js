addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

// A list of allowed origins that can access our backend API
const allowedOrigins = [
  'localhost:3000'
]

// A function that returns a set of CORS headers
const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': origin
})

// Check the origin for this request
// If it is included in our set of known and allowed origins, return it, otherwise
// return a known, good origin. This effectively does not allow browsers to
// continue requests if the origin they're requesting from doesn't match.
const checkOrigin = request => {
  const origin = request.headers.get("Origin")
  const foundOrigin = allowedOrigins.find(allowedOrigin => allowedOrigin.includes(origin))
  return foundOrigin ? foundOrigin : allowedOrigins[0]
}

// Make requests based on the request body to Unsplash API
const getResponse = async event => {
 

  // Check that the request's origin is a valid origin, allowed to access this API
  const allowedOrigin = checkOrigin(event.request)

  return new Response(
    JSON.stringify({ name: "nafees", y: 6 }),
    { headers: { 'Content-type': 'application/json', ...corsHeaders(allowedOrigin) } }
  )
}

async function handleRequest(event) {
  // If an OPTIONS request comes in, return a simple
  // response with the CORS information for our app
  if (event.request.method === "OPTIONS") {
    // Check that the request's origin is a valid origin, allowed to access this API
    const allowedOrigin = checkOrigin(event.request)
    return new Response("OK", { headers: corsHeaders(allowedOrigin) })
  }

  // If a POST request comes in, handle it using the getImages function
  if (event.request.method === "GET") return getResponse(event)

  // Redirect any other requests to a different URL, such as
  // your deployed React application
  //return new Response.redirect("https://workers-unsplash-viewer.pages.dev")
}
