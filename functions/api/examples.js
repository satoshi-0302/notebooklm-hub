// GET /api/examples?featureId=xxx
export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const featureId = url.searchParams.get('featureId');

    if (!featureId) {
        return Response.json({ error: 'featureId required' }, { status: 400 });
    }

    const { results } = await env.DB.prepare(
        'SELECT * FROM examples WHERE feature_id = ? ORDER BY created_at DESC'
    ).bind(featureId).all();

    return Response.json({ examples: results });
}
