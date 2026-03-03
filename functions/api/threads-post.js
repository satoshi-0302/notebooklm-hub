// POST /api/threads-post  →  create a new thread
export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { nickname, category, title, threadBody } = body;
    if (!nickname || !category || !title || !threadBody) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = 'th-' + crypto.randomUUID().slice(0, 8);

    await env.DB.prepare(
        `INSERT INTO threads (id, nickname, category, title, body)
     VALUES (?, ?, ?, ?, ?)`
    ).bind(id, nickname.slice(0, 20), category.slice(0, 10), title.slice(0, 80), threadBody.slice(0, 1000)).run();

    return Response.json({ ok: true, id });
}
