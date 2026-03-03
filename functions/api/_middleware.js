// Middleware: CORS headers + Turnstile verification for POST requests

async function verifyTurnstile(token, secret, ip) {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, remoteip: ip })
    });
    const data = await res.json();
    return data.success === true;
}

export async function onRequest(context) {
    const { request, env, next } = context;

    // CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            }
        });
    }

    // Turnstile verification for POST requests
    if (request.method === 'POST') {
        try {
            const body = await request.clone().json();
            const token = body.turnstileToken;

            if (!token) {
                return new Response(JSON.stringify({ error: 'Turnstile token required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
                });
            }

            const secret = env.TURNSTILE_SECRET;
            if (secret) {
                const ip = request.headers.get('CF-Connecting-IP') || '';
                const ok = await verifyTurnstile(token, secret, ip);
                if (!ok) {
                    return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), {
                        status: 403,
                        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
                    });
                }
            }
        } catch (e) {
            // If body parsing fails, let the individual handler deal with it
        }
    }

    // Continue to the route handler
    const response = await next();

    // Add CORS headers to all responses
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    return newResponse;
}
