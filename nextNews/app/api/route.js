export function GET(request) {
  console.log(request);

  // return Response.json();
  return new Response("Test!");
}

// export function POST(request) {}
