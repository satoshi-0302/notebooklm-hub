// POST /api/examples-like  →  toggle like
export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { exampleId } = body;
    if (!exampleId) {
        return Response.json({ error: 'exampleId required' }, { status: 400 });
    }

    // Use CF-Connecting-IP or fallback hash for dedup
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(ip + exampleId));
    const clientHash = [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);

    // Check if already liked
    const existing = await env.DB.prepare(
        'SELECT 1 FROM likes WHERE example_id = ? AND client_hash = ?'
    ).bind(exampleId, clientHash).first();

    if (existing) {
        // Unlike
        await env.DB.batch([
            env.DB.prepare('DELETE FROM likes WHERE example_id = ? AND client_hash = ?').bind(exampleId, clientHash),
            env.DB.prepare('UPDATE examples SET likes = likes - 1 WHERE id = ? AND likes > 0').bind(exampleId),
        ]);
        return Response.json({ ok: true, action: 'unliked' });
    } else {
        // Like
        await env.DB.batch([
            env.DB.prepare('INSERT INTO likes (example_id, client_hash) VALUES (?, ?)').bind(exampleId, clientHash),
            env.DB.prepare('UPDATE examples SET likes = likes + 1 WHERE id = ?').bind(exampleId),
        ]);
        return Response.json({ ok: true, action: 'liked' });
    }
}
