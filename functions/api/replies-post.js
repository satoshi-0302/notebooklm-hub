// POST /api/replies-post  →  create a new reply
export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { threadId, nickname, replyBody } = body;
    if (!threadId || !nickname || !replyBody) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = 're-' + crypto.randomUUID().slice(0, 8);

    await env.DB.batch([
        env.DB.prepare(
            `INSERT INTO replies (id, thread_id, nickname, body) VALUES (?, ?, ?, ?)`
        ).bind(id, threadId, nickname.slice(0, 20), replyBody.slice(0, 500)),
        env.DB.prepare(
            `UPDATE threads SET reply_count = reply_count + 1 WHERE id = ?`
        ).bind(threadId),
    ]);

    return Response.json({ ok: true, id });
}
