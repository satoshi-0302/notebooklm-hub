/* ===== NotebookLM Hub — SPA App (Cloudflare D1 Backend) ===== */

// ===== Feature Definitions =====
const FEATURES = [
  {
    id: 'source-grounding',
    icon: '🎯',
    name: 'ソースグラウンディング',
    short: '回答は必ずアップロードした資料に基づき、引用元を明示。',
    desc: 'NotebookLMの最大の特徴は「ソースグラウンディング」です。一般的なAIチャットボットと異なり、あなたがアップロードした資料のみに基づいて回答し、すべての回答に引用番号を付与します。引用をクリックすると元資料の該当箇所にジャンプでき、ハルシネーション（AIの作り話）を最小限に抑えます。'
  },
  {
    id: 'ai-podcast',
    icon: '🎙️',
    name: 'AI ポッドキャスト',
    short: '資料の内容を2人のAIホストが対話形式で解説。',
    desc: '音声概要（Audio Overview）機能を使うと、アップロードした資料の内容を2人のAIホストが自然な対話形式で解説するポッドキャストを自動生成できます。通勤中や家事中の学習に最適。Interactive Modeでは途中で質問を投げかけることも可能です。'
  },
  {
    id: 'video-overview',
    icon: '🎬',
    name: '動画オーバービュー',
    short: 'ナレーション付き解説動画を多彩なスタイルで自動生成。',
    desc: '動画オーバービュー機能では、資料の内容をナレーション付きの解説動画として自動生成できます。Watercolour、Anime、Papercraft、Whiteboardなど多彩なビジュアルスタイルから選択可能。プレゼン資料や教材としてそのまま活用できます。'
  },
  {
    id: 'mind-map',
    icon: '🧠',
    name: 'マインドマップ',
    short: '資料の構造を視覚的に整理し、全体像を一目で把握。',
    desc: 'マインドマップ機能は、アップロードした資料の内容を自動的に構造化し、視覚的なマインドマップとして表示します。複雑なトピックの全体像を俯瞰でき、トピック間の関係性や階層構造を直感的に理解できます。'
  },
  {
    id: 'quiz-flashcard',
    icon: '📝',
    name: 'クイズ＆フラッシュカード',
    short: '学習用素材を自動生成。試験対策やレビューに最適。',
    desc: 'フラッシュカードやクイズを資料の内容から自動生成します。試験対策、入社研修、知識の定着に活用できます。難易度やフォーマットもカスタマイズ可能で、繰り返し学習に適した形式で出力されます。'
  },
  {
    id: 'report-gen',
    icon: '📊',
    name: 'レポート生成',
    short: 'ブログ記事、FAQ、レポートなど多彩な形式で出力。',
    desc: 'アップロードした資料をもとに、ブログ記事、FAQ、ブリーフィングドキュメント、比較分析レポートなど多彩なフォーマットでアウトプットを生成します。業務資料の作成効率を飛躍的に向上させます。'
  }
];

// ===== Turnstile Config =====
// Replace with your real sitekey from Cloudflare Dashboard → Turnstile
const TURNSTILE_SITEKEY = '0x4AAAAAAA_PLACEHOLDER';

// ===== API Helpers =====
async function api(path, opts = {}) {
  const url = '/api/' + path;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

async function getTurnstileToken() {
  return new Promise((resolve, reject) => {
    if (typeof turnstile === 'undefined') {
      // Turnstile not loaded (local dev), resolve with empty token
      resolve('');
      return;
    }
    // Render invisible turnstile
    const container = document.getElementById('turnstile-container');
    container.innerHTML = '';
    turnstile.render(container, {
      sitekey: TURNSTILE_SITEKEY,
      callback: (token) => resolve(token),
      'error-callback': () => reject(new Error('Turnstile failed')),
      size: 'invisible'
    });
  });
}

// ===== SPA Router =====
let currentView = 'home';
let currentFeatureId = null;
let currentThreadId = null;

function navigate(route, param) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  currentView = route;

  switch (route) {
    case 'home':
      document.getElementById('view-home').classList.add('active');
      renderHome();
      window.scrollTo(0, 0);
      break;
    case 'feature':
      currentFeatureId = param;
      document.getElementById('view-feature').classList.add('active');
      renderFeatureDetail(param);
      window.scrollTo(0, 0);
      break;
    case 'board':
      document.getElementById('view-board').classList.add('active');
      renderBoard();
      window.scrollTo(0, 0);
      break;
    case 'thread':
      currentThreadId = param;
      document.getElementById('view-thread').classList.add('active');
      renderThreadDetail(param);
      window.scrollTo(0, 0);
      break;
  }
}

// ===== Renderers =====

async function renderHome() {
  // Fetch counts from all features and threads in parallel
  const [threadsData, ...exampleCounts] = await Promise.all([
    api('threads'),
    ...FEATURES.map(f => api('examples?featureId=' + f.id))
  ]);

  const threads = threadsData.threads || [];
  let totalExamples = 0;

  // Stats
  const grid = document.getElementById('features-grid');
  grid.innerHTML = FEATURES.map((f, i) => {
    const count = (exampleCounts[i].examples || []).length;
    totalExamples += count;
    return `
      <div class="feature-card" onclick="navigate('feature','${f.id}')">
        <div class="feature-icon">${f.icon}</div>
        <h3>${f.name}</h3>
        <p>${f.short}</p>
        <div class="example-count">📸 ${count}件の出力例</div>
      </div>`;
  }).join('');

  document.getElementById('stat-examples').textContent = totalExamples;
  document.getElementById('stat-threads').textContent = threads.length;

  // Board preview (latest 3)
  const preview = document.getElementById('board-preview');
  const latest = threads.slice(0, 3);
  preview.innerHTML = `<div class="threads-list">${latest.map(renderThreadCard).join('')}</div>`;
}

async function renderFeatureDetail(featureId) {
  const feature = FEATURES.find(f => f.id === featureId);
  if (!feature) { navigate('home'); return; }

  const header = document.getElementById('feature-header');
  header.innerHTML = `
    <div class="fd-icon">${feature.icon}</div>
    <h2>${feature.name}</h2>
    <p class="fd-desc">${feature.desc}</p>`;

  document.getElementById('post-form-wrapper').style.display = 'none';
  await renderGallery(featureId);
}

async function renderGallery(featureId) {
  const grid = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');

  grid.innerHTML = '<div class="empty-state"><p>読み込み中...</p></div>';

  try {
    const data = await api('examples?featureId=' + featureId);
    const examples = data.examples || [];

    if (examples.length === 0) {
      grid.style.display = 'none';
      empty.style.display = 'block';
      return;
    }

    grid.style.display = '';
    empty.style.display = 'none';

    grid.innerHTML = examples.map(ex => {
      const tagHtml = ex.tag ? `<span class="gc-tag">${ex.tag}</span>` : '';
      const sourceHtml = ex.source ? `<div class="gc-source"><span class="gc-source-label">📂 ソース:</span> ${escHtml(ex.source)}</div>` : '';
      const bodyContent = ex.output || '';
      const dateStr = ex.created_at ? ex.created_at.slice(0, 10) : '';
      return `
        <div class="gallery-card">
          <div class="gc-meta">
            <span class="gc-author">@${escHtml(ex.nickname)}</span>
            <span class="gc-date">${dateStr}</span>
          </div>
          <h4>${escHtml(ex.title)}</h4>
          ${sourceHtml}
          <div class="gc-body">${escHtml(bodyContent)}</div>
          <div class="gc-footer">
            ${tagHtml}
            <button class="like-btn" onclick="toggleLike('${ex.id}')">
              👍 <span>${ex.likes}</span>
            </button>
          </div>
        </div>`;
    }).join('');
  } catch (e) {
    grid.innerHTML = '<div class="empty-state"><p>読み込みエラー</p></div>';
  }
}

async function renderBoard(filter = 'all') {
  const list = document.getElementById('threads-list');

  document.querySelectorAll('[data-board-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.boardCat === filter);
  });

  list.innerHTML = '<div class="empty-state"><p>読み込み中...</p></div>';

  try {
    const catParam = filter === 'all' ? '' : '&cat=' + encodeURIComponent(filter);
    const data = await api('threads?cat=' + (filter === 'all' ? '' : filter));
    const threads = data.threads || [];

    if (threads.length === 0) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">💬</div><p>まだスレッドがありません。最初のスレッドを作成しましょう！</p></div>';
      return;
    }

    list.innerHTML = threads.map(renderThreadCard).join('');
  } catch (e) {
    list.innerHTML = '<div class="empty-state"><p>読み込みエラー</p></div>';
  }
}

function renderThreadCard(t) {
  const replyCount = t.reply_count || 0;
  const dateStr = t.created_at ? t.created_at.slice(0, 10) : '';
  return `
    <div class="thread-card" onclick="navigate('thread','${t.id}')">
      <span class="thread-cat" data-cat="${t.category}">${t.category}</span>
      <div class="thread-info">
        <h4>${escHtml(t.title)}</h4>
        <div class="thread-meta">
          <span>@${escHtml(t.nickname)}</span>
          <span>${dateStr}</span>
        </div>
      </div>
      <div class="thread-reply-count">💬 ${replyCount}</div>
    </div>`;
}

async function renderThreadDetail(threadId) {
  const detail = document.getElementById('thread-detail');
  const repliesList = document.getElementById('replies-list');

  detail.innerHTML = '<p>読み込み中...</p>';
  repliesList.innerHTML = '';

  try {
    const data = await api('replies?threadId=' + threadId);
    const thread = data.thread;
    const replies = data.replies || [];

    if (!thread) { navigate('board'); return; }

    const catClass = thread.category === '質問' ? 'background:rgba(66,133,244,.15);color:#4285f4' :
      thread.category === 'Tips' ? 'background:rgba(52,199,89,.15);color:#34c759' :
        'background:rgba(255,159,10,.15);color:#ff9f0a';

    const dateStr = thread.created_at ? thread.created_at.slice(0, 10) : '';

    detail.innerHTML = `
      <div class="td-header">
        <span class="td-cat" style="${catClass}">${thread.category}</span>
        <h2>${escHtml(thread.title)}</h2>
        <div class="td-meta">
          <span>@${escHtml(thread.nickname)}</span>
          <span>${dateStr}</span>
        </div>
      </div>
      <div class="td-body">${escHtml(thread.body)}</div>`;

    repliesList.innerHTML = replies.map(r => {
      const rDate = r.created_at ? r.created_at.slice(0, 10) : '';
      return `
        <div class="reply-card">
          <div class="rc-meta">
            <span class="rc-author">@${escHtml(r.nickname)}</span>
            <span class="rc-date">${rDate}</span>
          </div>
          <div class="rc-body">${escHtml(r.body)}</div>
        </div>`;
    }).join('');
  } catch (e) {
    detail.innerHTML = '<p>読み込みエラー</p>';
  }
}

// ===== Actions =====

async function toggleLike(exId) {
  try {
    const token = await getTurnstileToken();
    await api('examples-like', {
      method: 'POST',
      body: JSON.stringify({ exampleId: exId, turnstileToken: token })
    });
    // Re-render gallery
    if (currentFeatureId) await renderGallery(currentFeatureId);
  } catch (e) {
    showToast('❌ ' + e.message);
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function scrollToFeatures(e) {
  e.preventDefault();
  const el = document.getElementById('features-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== Helpers =====
function escHtml(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
  // Route clicks
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.dataset.route;
      navigate(route);
    }
  });

  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Nav scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // === Example Post Form ===
  const btnShowPost = document.getElementById('btn-show-post-form');
  const postWrapper = document.getElementById('post-form-wrapper');
  const btnCancelPost = document.getElementById('btn-cancel-post');

  btnShowPost.addEventListener('click', () => {
    postWrapper.style.display = postWrapper.style.display === 'none' ? 'block' : 'none';
  });
  btnCancelPost.addEventListener('click', () => {
    postWrapper.style.display = 'none';
  });

  document.getElementById('example-form').addEventListener('submit', async e => {
    e.preventDefault();
    const nickname = document.getElementById('ex-nickname').value.trim();
    const title = document.getElementById('ex-title').value.trim();
    const source = document.getElementById('ex-source').value.trim();
    const output = document.getElementById('ex-output').value.trim();
    const tag = document.getElementById('ex-tag').value;

    if (!nickname || !title || !source || !output) return;

    try {
      const token = await getTurnstileToken();
      await api('examples-post', {
        method: 'POST',
        body: JSON.stringify({
          featureId: currentFeatureId,
          nickname, title, source, output, tag: tag || '',
          turnstileToken: token
        })
      });

      document.getElementById('example-form').reset();
      postWrapper.style.display = 'none';
      await renderGallery(currentFeatureId);
      showToast('✅ 出力例を投稿しました！');
    } catch (err) {
      showToast('❌ ' + err.message);
    }
  });

  // === Thread Form ===
  const btnNewThread = document.getElementById('btn-new-thread');
  const threadWrapper = document.getElementById('thread-form-wrapper');
  const btnCancelThread = document.getElementById('btn-cancel-thread');

  btnNewThread.addEventListener('click', () => {
    threadWrapper.style.display = threadWrapper.style.display === 'none' ? 'block' : 'none';
  });
  btnCancelThread.addEventListener('click', () => {
    threadWrapper.style.display = 'none';
  });

  document.getElementById('thread-form').addEventListener('submit', async e => {
    e.preventDefault();
    const nickname = document.getElementById('th-nickname').value.trim();
    const category = document.getElementById('th-category').value;
    const title = document.getElementById('th-title').value.trim();
    const threadBody = document.getElementById('th-body').value.trim();

    if (!nickname || !title || !threadBody) return;

    try {
      const token = await getTurnstileToken();
      await api('threads-post', {
        method: 'POST',
        body: JSON.stringify({
          nickname, category, title, threadBody,
          turnstileToken: token
        })
      });

      document.getElementById('thread-form').reset();
      threadWrapper.style.display = 'none';
      await renderBoard();
      showToast('✅ スレッドを作成しました！');
    } catch (err) {
      showToast('❌ ' + err.message);
    }
  });

  // Board filters
  document.querySelectorAll('[data-board-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderBoard(btn.dataset.boardCat);
    });
  });

  // === Reply Form ===
  document.getElementById('reply-form').addEventListener('submit', async e => {
    e.preventDefault();
    const nickname = document.getElementById('re-nickname').value.trim();
    const replyBody = document.getElementById('re-body').value.trim();

    if (!nickname || !replyBody || !currentThreadId) return;

    try {
      const token = await getTurnstileToken();
      await api('replies-post', {
        method: 'POST',
        body: JSON.stringify({
          threadId: currentThreadId,
          nickname, replyBody,
          turnstileToken: token
        })
      });

      document.getElementById('reply-form').reset();
      await renderThreadDetail(currentThreadId);
      showToast('✅ 返信を投稿しました！');
    } catch (err) {
      showToast('❌ ' + err.message);
    }
  });

  // ===== Init =====
  navigate('home');
});
