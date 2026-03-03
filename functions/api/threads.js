// GET /api/threads?cat=xxx
export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const cat = url.searchParams.get('cat');

    let query, params;
    if (cat && cat !== 'all') {
        query = 'SELECT * FROM threads WHERE category = ? ORDER BY created_at DESC';
        params = [cat];
    } else {
        query = 'SELECT * FROM threads ORDER BY created_at DESC';
        params = [];
    }

    const stmt = env.DB.prepare(query);
    const { results } = params.length ? await stmt.bind(...params).all() : await stmt.all();

    return Response.json({ threads: results });
}
