// POST /api/examples-post  →  create a new example
export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { featureId, nickname, title, source, output, tag } = body;
    if (!featureId || !nickname || !title || !source || !output) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = 'ex-' + crypto.randomUUID().slice(0, 8);

    await env.DB.prepare(
        `INSERT INTO examples (id, feature_id, nickname, title, source, output, tag)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, featureId, nickname.slice(0, 20), title.slice(0, 80), source.slice(0, 120), output.slice(0, 3000), (tag || '').slice(0, 20)).run();

    return Response.json({ ok: true, id });
}
