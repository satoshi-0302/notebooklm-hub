// GET /api/replies?threadId=xxx
export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const threadId = url.searchParams.get('threadId');

    if (!threadId) {
        return Response.json({ error: 'threadId required' }, { status: 400 });
    }

    // Get thread detail
    const thread = await env.DB.prepare(
        'SELECT * FROM threads WHERE id = ?'
    ).bind(threadId).first();

    if (!thread) {
        return Response.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Get replies
    const { results: replies } = await env.DB.prepare(
        'SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at ASC'
    ).bind(threadId).all();

    return Response.json({ thread, replies });
}
