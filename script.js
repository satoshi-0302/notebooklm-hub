/* ===== NotebookLM Hub — SPA App ===== */

// ===== Feature Definitions =====
const FEATURES = [
  {
    id: 'grounding',
    icon: '🎯',
    name: 'ソースグラウンディング',
    short: '回答は必ずアップロードした資料に基づき、引用元を明示。',
    desc: 'NotebookLMの最大の特徴は「ソースグラウンディング」です。一般的なAIチャットボットと異なり、あなたがアップロードした資料のみに基づいて回答し、すべての回答に引用番号を付与します。引用をクリックすると元資料の該当箇所にジャンプでき、ハルシネーション（AIの作り話）を最小限に抑えます。'
  },
  {
    id: 'podcast',
    icon: '🎙️',
    name: 'AI ポッドキャスト',
    short: '資料の内容を2人のAIホストが対話形式で解説。',
    desc: '音声概要（Audio Overview）機能を使うと、アップロードした資料の内容を2人のAIホストが自然な対話形式で解説するポッドキャストを自動生成できます。通勤中や家事中の学習に最適。Interactive Modeでは途中で質問を投げかけることも可能です。'
  },
  {
    id: 'video',
    icon: '🎬',
    name: '動画オーバービュー',
    short: 'ナレーション付き解説動画を多彩なスタイルで自動生成。',
    desc: '動画オーバービュー機能では、資料の内容をナレーション付きの解説動画として自動生成できます。Watercolour、Anime、Papercraft、Whiteboardなど多彩なビジュアルスタイルから選択可能。プレゼン資料や教材としてそのまま活用できます。'
  },
  {
    id: 'mindmap',
    icon: '🧠',
    name: 'マインドマップ',
    short: '資料の構造を視覚的に整理し、全体像を一目で把握。',
    desc: 'マインドマップ機能は、アップロードした資料の内容を自動的に構造化し、視覚的なマインドマップとして表示します。複雑なトピックの全体像を俯瞰でき、トピック間の関係性や階層構造を直感的に理解できます。'
  },
  {
    id: 'quiz',
    icon: '📝',
    name: 'クイズ＆フラッシュカード',
    short: '学習用素材を自動生成。試験対策やレビューに最適。',
    desc: 'フラッシュカードやクイズを資料の内容から自動生成します。試験対策、入社研修、知識の定着に活用できます。難易度やフォーマットもカスタマイズ可能で、繰り返し学習に適した形式で出力されます。'
  },
  {
    id: 'report',
    icon: '📊',
    name: 'レポート生成',
    short: 'ブログ記事、FAQ、レポートなど多彩な形式で出力。',
    desc: 'アップロードした資料をもとに、ブログ記事、FAQ、ブリーフィングドキュメント、比較分析レポートなど多彩なフォーマットでアウトプットを生成します。業務資料の作成効率を飛躍的に向上させます。'
  }
];

// ===== Sample Data =====
function getDefaultExamples() {
  return [
    // ===== Grounding =====
    {
      id: 'ex1', featureId: 'grounding', nickname: 'リサーチャー佐藤',
      title: '業務委託契約書のリスク条項分析',
      source: '業務委託契約書（PDF、50ページ）',
      output: '■ 質問: この契約書でリスクとなりうる条項を列挙してください。\n\n■ NotebookLMの回答:\n\nこの契約書には以下のリスク条項が含まれています：\n\n1. 【損害賠償の上限が未設定】第14条第3項において、受託者の損害賠償責任について上限金額が明記されていません。[1] これにより、予期しない高額請求のリスクが生じます。\n\n2. 【一方的な解約権】第18条第1項では、委託者は30日前の書面通知により理由を問わず契約を解除できるとされています。[2] 一方、受託者側には同等の解約権が付与されていません。\n\n3. 【知的財産権の帰属】第22条によると、業務遂行過程で生じたすべての成果物の知的財産権は委託者に帰属するとされています。[3] 受託者が既に保有する技術やノウハウとの切り分けが不明確です。\n\n4. 【準拠法と管轄裁判所】第25条では、準拠法を委託者所在地の法律とし、専属的合意管轄を委託者所在地の裁判所と定めています。[4]\n\n[1] 契約書 p.12, 第14条第3項\n[2] 契約書 p.15, 第18条第1項\n[3] 契約書 p.18, 第22条\n[4] 契約書 p.21, 第25条',
      tag: 'ビジネス', likes: 12, date: '2026-02-28'
    },
    {
      id: 'ex2', featureId: 'grounding', nickname: '大学院生M',
      title: '論文間の主張の相違点を引用付きで比較',
      source: 'Smith et al. (2024) "Deep Learning Survey"（PDF）、Chen et al. (2025) "Transformer Limitations"（PDF）',
      output: '■ 質問: 2つの論文における「Transformerの汎化性能」に関する主張の相違点を示してください。\n\n■ NotebookLMの回答:\n\n両論文はTransformerの汎化性能について異なる見解を示しています。\n\n【Smith et al.の主張】\nSmithらは「十分な規模のデータセットで事前学習されたTransformerモデルは、未知のドメインに対しても高い汎化性能を示す」と述べています。[1] その根拠として、5つの異なるドメインでのファインチューニング実験において平均92.3%の精度を達成したことを挙げています。[2]\n\n【Chen et al.の主張】\n一方、Chenらは「Transformerの汎化性能は、学習データの分布に強く依存しており、分布外のデータに対しては著しく性能が低下する」と反論しています。[3] 具体的には、敵対的サンプルを用いたテストでは精度が平均34.7%まで低下することを実証しています。[4]\n\n[1] Smith et al., Section 4.2, p.8\n[2] Smith et al., Table 3, p.11\n[3] Chen et al., Section 3.1, p.5\n[4] Chen et al., Figure 7, p.9',
      tag: '研究', likes: 8, date: '2026-02-25'
    },

    // ===== Podcast =====
    {
      id: 'ex3', featureId: 'podcast', nickname: 'ポッドキャスト好き',
      title: 'クラウド3社比較の音声概要（書き起こし抜粋）',
      source: 'Google Cloud 公式ブログ記事、AWS What\'s New 記事、Azure Update 記事（各URL）',
      output: '【音声概要 書き起こし（冒頭3分）】\n\nホストA: 「今日は3大クラウドプロバイダーの最新アップデートを比較していきましょう！まずはGoogle Cloudから。」\n\nホストB: 「はい！Google Cloudで一番注目なのは、Geminiモデルが直接BigQueryから呼び出せるようになった点ですね。これ、データ分析のワークフローが劇的に変わりますよ。」\n\nホストA: 「確かに。従来はデータをエクスポートしてから別のAIサービスに投げる必要がありましたからね。一方、AWSはどうでしょう？」\n\nホストB: 「AWSはBedrock経由でClaude 4のサポートを開始しました。面白いのは、AWSがマルチモデル戦略を強化している点です。Titanだけでなく外部モデルも積極的に取り込んでいますね。」\n\nホストA: 「そしてAzure。MicrosoftはCopilotをAzure全体に統合する動きを加速しています。特にAzure AI Studioのアップデートが大きくて...」\n\nホストB: 「そうそう、Azure AI Studioではカスタムモデルのファインチューニングがノーコードでできるようになりました。これは開発者だけでなく、ビジネスユーザーにも嬉しいアップデートですよね。」\n\nホストA: 「3社を比較すると、Google Cloudはデータ統合、AWSはモデルの選択肢、Azureは使いやすさ、というそれぞれの強みが鮮明ですね。」',
      tag: 'ビジネス', likes: 15, date: '2026-03-01'
    },
    {
      id: 'ex4', featureId: 'podcast', nickname: '英語学習中',
      title: '睡眠科学論文の日本語ポッドキャスト（書き起こし抜粋）',
      source: 'Walker (2017) "Why We Sleep" 関連論文3本（英語PDF）',
      output: '【音声概要 書き起こし（抜粋）】\n\nホストA: 「今回はマシュー・ウォーカー博士の睡眠研究に関する論文を3本取り上げます。結論から言うと、睡眠不足の影響って、私たちが思っている以上に深刻なんですよね。」\n\nホストB: 「そうなんです。特に衝撃的だったのは、6時間睡眠を2週間続けた被験者の認知機能が、48時間完全に眠らなかった人と同等レベルまで低下したというデータです。」\n\nホストA: 「しかも本人はそこまで眠いとは感じていない、というのがポイントですよね。」\n\nホストB: 「まさにそこです！主観的な眠気と客観的なパフォーマンス低下には大きなギャップがある。論文では"sleep debt is invisible to the debtor"と表現されていました。」\n\nホストA: 「ではレム睡眠の役割についてはどう言及されていますか？」\n\nホストB: 「レム睡眠は記憶の統合と感情の処理に不可欠だと述べられています。特に手続き記憶...つまり自転車の乗り方のような身体的な記憶の定着にレム睡眠が重要だと。」',
      tag: '学習', likes: 9, date: '2026-02-27'
    },

    // ===== Video =====
    {
      id: 'ex5', featureId: 'video', nickname: 'プレゼン職人',
      title: '情報セキュリティ研修のAnime風動画（ナレーション台本）',
      source: '社内情報セキュリティポリシー v3.2（PDF、30ページ）',
      output: '【動画概要 ナレーション台本（Generated by NotebookLM）】\nスタイル: Anime ｜ 長さ: 3分12秒\n\n[0:00 - 0:25] オープニング\nナレーション: 「情報セキュリティ、それは現代のビジネスにおいて最も重要な課題の一つです。今日は私たちの会社のセキュリティポリシーの要点を3分で理解していきましょう。」\n\n[0:25 - 1:10] パスワード管理\nナレーション: 「まず、パスワード管理です。ポリシーでは最低12文字以上、大文字・小文字・数字・記号を含むことが求められています。同じパスワードの使い回しは厳禁。90日ごとの更新が義務付けられています。パスワードマネージャーの使用が推奨されており、会社で承認されたツールのリストは社内ポータルで確認できます。」\n\n[1:10 - 2:00] データの取り扱い\nナレーション: 「次に、データの取り扱いです。社内データは機密レベルに応じて『極秘』『社外秘』『社内限定』『公開』の4段階に分類されます。極秘データは暗号化されたチャネルのみで共有可能。個人のクラウドストレージへのアップロードは、すべてのレベルで禁止されています。」\n\n[2:00 - 2:50] インシデント対応\nナレーション: 「最後に、セキュリティインシデントが発生した場合の対応です。不審なメール、不正アクセスの兆候、データ漏洩の疑いを発見したら、24時間以内にIT部門のセキュリティチーム（内線: 2222）に報告してください。」\n\n[2:50 - 3:12] クロージング\nナレーション: 「セキュリティは全員の責任です。一人ひとりの意識と行動が、会社全体を守ります。」',
      tag: 'ビジネス', likes: 20, date: '2026-03-01'
    },
    {
      id: 'ex6', featureId: 'video', nickname: 'YouTuber見習い',
      title: '光合成の仕組み Watercolour解説動画（ナレーション台本）',
      source: 'Campbell Biology Ch.10 "Photosynthesis"（PDF）',
      output: '【動画概要 ナレーション台本（Generated by NotebookLM）】\nスタイル: Watercolour ｜ 長さ: 2分45秒\n\n[0:00 - 0:20] イントロ\nナレーション: 「植物はどうやって太陽の光を食べ物に変えるのでしょうか？その答えが、光合成です。」\n\n[0:20 - 1:15] 明反応\nナレーション: 「光合成は大きく2つの段階に分かれます。まず、葉緑体のチラコイド膜で起こる明反応。ここでは太陽光のエネルギーを使って水分子を分解し、ATPとNADPHというエネルギー通貨を作り出します。この過程で酸素が副産物として放出されます。私たちが呼吸している酸素は、実は光合成の"おまけ"なんですね。」\n\n[1:15 - 2:15] カルビン回路\nナレーション: 「次に、ストロマで起こるカルビン回路。明反応で作られたATPとNADPHのエネルギーを使って、空気中のCO2を糖（G3P）に変換します。この回路はルビスコという酵素が触媒します。ルビスコは地球上で最も多い酵素と言われています。」\n\n[2:15 - 2:45] まとめ\nナレーション: 「つまり光合成とは、光エネルギー ＋ 水 ＋ CO2 → 糖 ＋ 酸素 という、生命を支える根本的な化学反応なのです。」',
      tag: '学習', likes: 14, date: '2026-02-26'
    },

    // ===== Mindmap =====
    {
      id: 'ex7', featureId: 'mindmap', nickname: '戦略コンサル',
      title: '日本のSaaS市場調査レポートの構造マップ',
      source: 'SaaS市場調査レポート 2025年版（PDF、120ページ）',
      output: '【NotebookLMが生成したマインドマップ構造】\n\n日本のSaaS市場 2025\n├── 市場概況\n│   ├── 市場規模: 2025年 1兆8,200億円（前年比23.5%増）\n│   ├── 成長ドライバー: DX推進、リモートワーク定着、AI統合\n│   └── 課題: セキュリティ懸念、レガシーシステム移行コスト\n├── セグメント別分析\n│   ├── HCM（人的資本管理）: 4,200億円\n│   ├── CRM/SFA: 3,800億円\n│   ├── ERP: 3,500億円\n│   ├── コラボレーション: 2,900億円\n│   └── セキュリティ: 2,100億円\n├── 主要プレイヤー\n│   ├── 国内: freee、SmartHR、Sansan、マネーフォワード\n│   ├── 外資: Salesforce、Microsoft、SAP、ServiceNow\n│   └── 新興: スタートアップ127社が資金調達\n├── 技術トレンド\n│   ├── AI/ML統合: 67%の企業がAI搭載SaaSを導入予定\n│   ├── ローコード/ノーコード: カスタマイズ性の向上\n│   ├── 垂直型SaaS: 業界特化ソリューションの台頭\n│   └── セキュリティ: ゼロトラスト採用率 前年比2.3倍\n└── 将来予測\n    ├── 2027年予測: 3兆円超\n    ├── 統合プラットフォーム化の加速\n    └── AI-nativeな次世代SaaSへの移行',
      tag: 'ビジネス', likes: 11, date: '2026-02-28'
    },
    {
      id: 'ex12', featureId: 'mindmap', nickname: '高校教師',
      title: '日本史・明治維新の構造マップ',
      source: '高校日本史B 教科書（PDF）第6章「近代国家の成立」',
      output: '【NotebookLMが生成したマインドマップ構造】\n\n明治維新（1868-1889）\n├── 背景\n│   ├── 黒船来航（1853）：ペリー艦隊、開国要求\n│   ├── 不平等条約：日米修好通商条約（1858）\n│   └── 幕藩体制の動揺：藩財政の悪化、尊王攘夷運動\n├── 政治改革\n│   ├── 王政復古の大号令（1868.1）\n│   ├── 版籍奉還（1869）：土地と人民を天皇に返還\n│   ├── 廃藩置県（1871）：3府302県 → 3府72県\n│   └── 大日本帝国憲法（1889）：天皇主権、二院制\n├── 社会改革\n│   ├── 四民平等：士農工商の身分制廃止\n│   ├── 学制（1872）：国民皆学\n│   ├── 徴兵令（1873）：国民皆兵\n│   └── 地租改正（1873）：現金納税、税率3%\n├── 経済近代化\n│   ├── 殖産興業：官営模範工場（富岡製糸場 等）\n│   ├── 鉄道開通：新橋～横浜（1872）\n│   └── 通貨統一：円・銭・厘の十進法\n└── 対外関係\n    ├── 岩倉使節団（1871-1873）：欧米視察\n    ├── 琉球処分（1879）：沖縄県設置\n    └── 条約改正交渉：鹿鳴館外交',
      tag: '学習', likes: 7, date: '2026-03-01'
    },

    // ===== Quiz =====
    {
      id: 'ex8', featureId: 'quiz', nickname: '資格勉強中',
      title: 'ITパスポート試験対策クイズ（自動生成）',
      source: 'ITパスポート試験 公式テキスト 2026年版（PDF）',
      output: '【NotebookLMが生成した4択問題（抜粋 5問/30問）】\n\n━━━━━━━━━━━━━━━\n問題1. プロジェクトマネジメントにおいて、作業の順序関係と所要時間から最短完了日数を求める手法はどれか。\n  ア. PERT\n  イ. WBS\n  ウ. ガントチャート\n  エ. パレート図\n【正解: ア】PERT（Program Evaluation and Review Technique）は、作業のネットワーク図を作成し、クリティカルパスを特定して最短完了日数を算出する手法です。\n\n━━━━━━━━━━━━━━━\n問題2. 情報セキュリティの3要素（CIA）に含まれないものはどれか。\n  ア. 機密性（Confidentiality）\n  イ. 完全性（Integrity）\n  ウ. 可用性（Availability）\n  エ. 責任追跡性（Accountability）\n【正解: エ】CIA の3要素は機密性・完全性・可用性です。責任追跡性は情報セキュリティの付加的な要素ですが、基本の3要素には含まれません。\n\n━━━━━━━━━━━━━━━\n問題3. TCP/IPモデルにおいてHTTPが動作する層はどれか。\n  ア. ネットワークインターフェース層\n  イ. インターネット層\n  ウ. トランスポート層\n  エ. アプリケーション層\n【正解: エ】HTTPはアプリケーション層のプロトコルです。\n\n━━━━━━━━━━━━━━━\n問題4. データベースにおいて、表の行を一意に識別するためのキーはどれか。\n  ア. 外部キー\n  イ. 主キー\n  ウ. 候補キー\n  エ. 複合キー\n【正解: イ】主キー（Primary Key）は、表の各行を一意に識別するための列（または列の組合せ）です。\n\n━━━━━━━━━━━━━━━\n問題5. アジャイル開発において、短い反復期間で開発を行う単位を何と呼ぶか。\n  ア. フェーズ\n  イ. スプリント\n  ウ. マイルストーン\n  エ. イテレーション\n【正解: イ】スクラム開発では「スプリント」と呼ばれる1〜4週間の固定期間で反復開発を行います。なお、一般的なアジャイル用語では「イテレーション」も同義で使われます。',
      tag: '学習', likes: 18, date: '2026-02-20'
    },
    {
      id: 'ex9', featureId: 'quiz', nickname: '医学生',
      title: '解剖学フラッシュカード（自動生成）',
      source: 'グレイ解剖学 第4版（PDF）第5章「上肢」',
      output: '【NotebookLMが生成したフラッシュカード（抜粋 6枚）】\n\n┌──────────────────┐\n│ 表：上腕二頭筋（Biceps brachii）   │\n│ 裏：                               │\n│ ・起始: 長頭→肩甲骨関節上結節     │\n│         短頭→烏口突起              │\n│ ・停止: 橈骨粗面                   │\n│ ・作用: 肘関節の屈曲、前腕の回外   │\n│ ・神経: 筋皮神経（C5, C6）         │\n└──────────────────┘\n┌──────────────────┐\n│ 表：三角筋（Deltoid）              │\n│ 裏：                               │\n│ ・起始: 鎖骨外側1/3、肩峰、肩甲棘 │\n│ ・停止: 上腕骨の三角筋粗面         │\n│ ・作用: 肩関節の外転（主）         │\n│ ・神経: 腋窩神経（C5, C6）         │\n└──────────────────┘\n┌──────────────────┐\n│ 表：腕神経叢（Brachial plexus）    │\n│ 裏：                               │\n│ ・構成: C5-T1の前枝               │\n│ ・分岐: 幹→分裂→束→枝           │\n│ ・主要な枝:                        │\n│   筋皮神経、正中神経、尺骨神経、   │\n│   橈骨神経、腋窩神経               │\n└──────────────────┘',
      tag: '学習', likes: 13, date: '2026-02-22'
    },

    // ===== Report =====
    {
      id: 'ex10', featureId: 'report', nickname: 'マーケター田中',
      title: 'クラウド会計ソフト3社比較レポート（自動生成）',
      source: 'freee IR資料 2025Q3（PDF）、マネーフォワード IR資料 2025Q3（PDF）、弥生公式サイト（URL）',
      output: '【NotebookLMが生成した比較分析レポート】\n\nクラウド会計ソフト3社比較分析\n━━━━━━━━━━━━━━━━━━━━\n\n■ エグゼクティブサマリー\n日本のクラウド会計ソフト市場は、freee、マネーフォワード、弥生の3社が主要プレイヤーとして競争しています。各社は異なるターゲット層と戦略で差別化を図っています。[1][2]\n\n■ 比較表\n┌────────┬────────┬────────┬────────┐\n│          │ freee    │ MF      │ 弥生     │\n├────────┼────────┼────────┼────────┤\n│ 売上高    │ 287億円  │ 343億円  │ 非公開   │\n│ 有料課金数│ 53.1万   │ 47.2万   │ 310万超  │\n│ 強み      │ UX・統合 │ 機能網羅 │ 信頼性   │\n│ ターゲット│ スタートアップ│ 中小企業│ 個人事業主│\n│ AI機能    │ ○        │ ○       │ △       │\n└────────┴────────┴────────┴────────┘\n\n■ 示唆\n1. freeeはUI/UXの優位性とAPIエコシステムでスタートアップ市場を確保 [1]\n2. マネーフォワードはBtoB SaaSの横展開（HR、経費精算）で顧客単価向上 [2]\n3. 弥生はオンプレミス時代からの圧倒的ユーザーベースがクラウド移行の武器\n\n[1] freee IR資料 p.15, p.23\n[2] マネーフォワード IR資料 p.8, p.31',
      tag: 'ビジネス', likes: 22, date: '2026-03-02'
    },
    {
      id: 'ex11', featureId: 'report', nickname: 'ブロガーK',
      title: '生成AI最新動向ブログ記事ドラフト（自動生成）',
      source: 'Google AI Blog 2025年総括記事（URL）、OpenAI公式ブログ 2025年記事5本（URL）',
      output: '【NotebookLMが生成したブログ記事ドラフト（冒頭抜粋）】\n\n# 2025年の生成AIを振り返る：5つの転換点\n\n2025年は生成AIにとって「実用化の年」でした。研究段階から本格的な業務利用へと移行し、私たちの働き方を根本から変え始めています。この記事では、AI業界に起きた5つの重要な転換点を振り返ります。\n\n## 1. マルチモーダルの標準化\n\nテキストだけでなく、画像・音声・動画を同時に理解し生成できるマルチモーダルAIが標準となりました。GoogleのGeminiシリーズ、OpenAIのGPT-5はいずれもネイティブマルチモーダル対応を実現。「テキストだけのAI」は過去のものとなりつつあります。\n\n## 2. エージェントAIの実用化\n\n2025年最大のブレイクスルーは、AIが自律的にタスクを遂行する「エージェント」の実用化です。コードの生成からデプロイ、バグ修正まで一気通貫で行うAIエンジニアリングエージェントが、多くの開発チームに導入されました。\n\n## 3. 日本語性能の飛躍的向上\n\n日本語特化モデルの精度が劇的に向上し、ビジネス文書作成における満足度が前年比40%向上しました。...\n\n（以下3000字続く）',
      tag: 'クリエイティブ', likes: 10, date: '2026-02-24'
    }
  ];
}

function getDefaultThreads() {
  return [
    {
      id: 'th1', category: '質問', nickname: '初心者ユーザー', title: 'ソースの最大数はどのくらいですか？', body: 'NotebookLMの無料プランでソース数に制限はありますか？\n有料プランとの違いも知りたいです。\n\nまた、多くのソースを追加した場合、回答の品質に影響はあるのでしょうか？', date: '2026-03-01', replies: [
        { id: 'r1', nickname: 'NLMマスター', body: '無料プランでも十分なソース数が使えます。ただし、品質面では2〜3個のソースに絞るのがベストプラクティスです。\n\n多すぎると焦点がぼやけてしまうので、関連するソースだけを厳選するのがコツですよ。', date: '2026-03-01' },
        { id: 'r2', nickname: 'パワーユーザー', body: '補足ですが、有料プランではPlusで最大70ソース/ノートブック対応です。\nProやUltraだとさらに多くなります。\n\nとはいえ、1つのテーマに2〜3ソースが一番良い結果が出ますね。', date: '2026-03-02' }
      ]
    },
    {
      id: 'th2', category: 'Tips', nickname: 'AI活用マニア', title: '【Tips】音声概要のクオリティを上げるコツ3選', body: '音声概要を何度も使ってきた中で見つけたコツを共有します：\n\n1. ソースは2〜3個に絞る → 焦点が明確になり、会話が自然に\n2. ソース追加前に「マスターソース」として情報を1つにまとめる → 一貫性が向上\n3. 生成前にカスタム指示で「技術者向け」等のトーンを指定 → 聴衆にフィットした解説に\n\nぜひ試してみてください！', date: '2026-02-28', replies: [
        { id: 'r3', nickname: 'ポッドキャスト好き', body: '3番目のTips、今まで知りませんでした！早速試してみます。', date: '2026-03-01' }
      ]
    },
    { id: 'th3', category: '雑談', nickname: 'テック好き', title: 'NotebookLMのアップデートが楽しみ', body: '最近のアップデートでDeep ResearchやVideo Overviewが追加されて、どんどん進化してますね。\n\n次はどんな機能が来ると思いますか？\n個人的にはリアルタイム共同編集が来たら最高だなと思ってます。', date: '2026-02-27', replies: [] }
  ];
}

// ===== Data Store (localStorage) =====
const STORE_EXAMPLES = 'nlmhub_examples';
const STORE_THREADS = 'nlmhub_threads';
const STORE_LIKES = 'nlmhub_likes';

function loadExamples() {
  const d = localStorage.getItem(STORE_EXAMPLES);
  if (!d) { const defaults = getDefaultExamples(); saveExamples(defaults); return defaults; }
  return JSON.parse(d);
}
function saveExamples(data) { localStorage.setItem(STORE_EXAMPLES, JSON.stringify(data)); }

function loadThreads() {
  const d = localStorage.getItem(STORE_THREADS);
  if (!d) { const defaults = getDefaultThreads(); saveThreads(defaults); return defaults; }
  return JSON.parse(d);
}
function saveThreads(data) { localStorage.setItem(STORE_THREADS, JSON.stringify(data)); }

function loadLikes() {
  const d = localStorage.getItem(STORE_LIKES);
  return d ? JSON.parse(d) : {};
}
function saveLikes(data) { localStorage.setItem(STORE_LIKES, JSON.stringify(data)); }

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

function renderHome() {
  const examples = loadExamples();
  const threads = loadThreads();

  // Stats
  document.getElementById('stat-examples').textContent = examples.length;
  document.getElementById('stat-threads').textContent = threads.length;

  // Feature cards
  const grid = document.getElementById('features-grid');
  grid.innerHTML = FEATURES.map(f => {
    const count = examples.filter(e => e.featureId === f.id).length;
    return `
      <div class="feature-card" onclick="navigate('feature','${f.id}')">
        <div class="feature-icon">${f.icon}</div>
        <h3>${f.name}</h3>
        <p>${f.short}</p>
        <div class="example-count">📸 ${count}件の実例</div>
      </div>`;
  }).join('');

  // Board preview (latest 3)
  const preview = document.getElementById('board-preview');
  const latest = [...threads].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  preview.innerHTML = `<div class="threads-list">${latest.map(renderThreadCard).join('')}</div>`;
}

function renderFeatureDetail(featureId) {
  const feature = FEATURES.find(f => f.id === featureId);
  if (!feature) { navigate('home'); return; }

  const header = document.getElementById('feature-header');
  header.innerHTML = `
    <div class="fd-icon">${feature.icon}</div>
    <h2>${feature.name}</h2>
    <p class="fd-desc">${feature.desc}</p>`;

  document.getElementById('post-form-wrapper').style.display = 'none';
  renderGallery(featureId);
}

function renderGallery(featureId) {
  const examples = loadExamples().filter(e => e.featureId === featureId);
  const likes = loadLikes();
  const grid = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');

  if (examples.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  grid.style.display = '';
  empty.style.display = 'none';

  grid.innerHTML = examples
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(ex => {
      const liked = likes[ex.id] || false;
      const tagHtml = ex.tag ? `<span class="gc-tag">${ex.tag}</span>` : '';
      const sourceHtml = ex.source ? `<div class="gc-source"><span class="gc-source-label">📂 ソース:</span> ${escHtml(ex.source)}</div>` : '';
      const bodyContent = ex.output || ex.description || '';
      return `
        <div class="gallery-card">
          <div class="gc-meta">
            <span class="gc-author">@${escHtml(ex.nickname)}</span>
            <span class="gc-date">${ex.date}</span>
          </div>
          <h4>${escHtml(ex.title)}</h4>
          ${sourceHtml}
          <div class="gc-body">${escHtml(bodyContent)}</div>
          <div class="gc-footer">
            ${tagHtml}
            <button class="like-btn ${liked ? 'liked' : ''}" onclick="toggleLike('${ex.id}')">
              👍 <span>${ex.likes}</span>
            </button>
          </div>
        </div>`;
    }).join('');
}

function renderBoard(filter = 'all') {
  const threads = loadThreads();
  const filtered = filter === 'all' ? threads : threads.filter(t => t.category === filter);
  const list = document.getElementById('threads-list');

  document.querySelectorAll('[data-board-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.boardCat === filter);
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">💬</div><p>まだスレッドがありません。最初のスレッドを作成しましょう！</p></div>';
    return;
  }

  list.innerHTML = filtered
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(renderThreadCard).join('');
}

function renderThreadCard(t) {
  const replyCount = (t.replies || []).length;
  return `
    <div class="thread-card" onclick="navigate('thread','${t.id}')">
      <span class="thread-cat" data-cat="${t.category}">${t.category}</span>
      <div class="thread-info">
        <h4>${escHtml(t.title)}</h4>
        <div class="thread-meta">
          <span>@${escHtml(t.nickname)}</span>
          <span>${t.date}</span>
        </div>
      </div>
      <div class="thread-reply-count">💬 ${replyCount}</div>
    </div>`;
}

function renderThreadDetail(threadId) {
  const threads = loadThreads();
  const thread = threads.find(t => t.id === threadId);
  if (!thread) { navigate('board'); return; }

  const detail = document.getElementById('thread-detail');
  const catClass = thread.category === '質問' ? 'background:rgba(66,133,244,.15);color:#4285f4' :
    thread.category === 'Tips' ? 'background:rgba(52,199,89,.15);color:#34c759' :
      'background:rgba(255,159,10,.15);color:#ff9f0a';

  detail.innerHTML = `
    <div class="td-header">
      <span class="td-cat" style="${catClass}">${thread.category}</span>
      <h2>${escHtml(thread.title)}</h2>
      <div class="td-meta">
        <span>@${escHtml(thread.nickname)}</span>
        <span>${thread.date}</span>
      </div>
    </div>
    <div class="td-body">${escHtml(thread.body)}</div>`;

  const repliesList = document.getElementById('replies-list');
  repliesList.innerHTML = (thread.replies || []).map(r => `
    <div class="reply-card">
      <div class="rc-meta">
        <span class="rc-author">@${escHtml(r.nickname)}</span>
        <span class="rc-date">${r.date}</span>
      </div>
      <div class="rc-body">${escHtml(r.body)}</div>
    </div>`).join('');
}

// ===== Actions =====

function toggleLike(exId) {
  const likes = loadLikes();
  const examples = loadExamples();
  const ex = examples.find(e => e.id === exId);
  if (!ex) return;

  if (likes[exId]) {
    likes[exId] = false;
    ex.likes = Math.max(0, ex.likes - 1);
  } else {
    likes[exId] = true;
    ex.likes++;
  }

  saveLikes(likes);
  saveExamples(examples);
  renderGallery(currentFeatureId);
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
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function genId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
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

  document.getElementById('example-form').addEventListener('submit', e => {
    e.preventDefault();
    const nickname = document.getElementById('ex-nickname').value.trim();
    const title = document.getElementById('ex-title').value.trim();
    const source = document.getElementById('ex-source').value.trim();
    const output = document.getElementById('ex-output').value.trim();
    const tag = document.getElementById('ex-tag').value;

    if (!nickname || !title || !source || !output) return;

    const examples = loadExamples();
    examples.push({
      id: genId(),
      featureId: currentFeatureId,
      nickname,
      title,
      source,
      output,
      tag: tag || '',
      likes: 0,
      date: todayStr()
    });
    saveExamples(examples);

    document.getElementById('example-form').reset();
    postWrapper.style.display = 'none';
    renderGallery(currentFeatureId);
    showToast('✅ 出力例を投稿しました！');
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

  document.getElementById('thread-form').addEventListener('submit', e => {
    e.preventDefault();
    const nickname = document.getElementById('th-nickname').value.trim();
    const category = document.getElementById('th-category').value;
    const title = document.getElementById('th-title').value.trim();
    const body = document.getElementById('th-body').value.trim();

    if (!nickname || !title || !body) return;

    const threads = loadThreads();
    threads.push({
      id: genId(),
      category,
      nickname,
      title,
      body,
      date: todayStr(),
      replies: []
    });
    saveThreads(threads);

    document.getElementById('thread-form').reset();
    threadWrapper.style.display = 'none';
    renderBoard();
    showToast('✅ スレッドを作成しました！');
  });

  // Board filters
  document.querySelectorAll('[data-board-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderBoard(btn.dataset.boardCat);
    });
  });

  // === Reply Form ===
  document.getElementById('reply-form').addEventListener('submit', e => {
    e.preventDefault();
    const nickname = document.getElementById('re-nickname').value.trim();
    const body = document.getElementById('re-body').value.trim();

    if (!nickname || !body || !currentThreadId) return;

    const threads = loadThreads();
    const thread = threads.find(t => t.id === currentThreadId);
    if (!thread) return;

    if (!thread.replies) thread.replies = [];
    thread.replies.push({
      id: genId(),
      nickname,
      body,
      date: todayStr()
    });
    saveThreads(threads);

    document.getElementById('reply-form').reset();
    renderThreadDetail(currentThreadId);
    showToast('✅ 返信を投稿しました！');
  });

  // ===== Init =====
  navigate('home');
  initCanvas();
});

// ===== Canvas Background =====
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + .5,
      dx: (Math.random() - .5) * .3,
      dy: (Math.random() - .5) * .3,
      o: Math.random() * .5 + .1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(66,133,244,${p.o})`;
      ctx.fill();
    });

    // Lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(66,133,244,${.08 * (1 - dist / 120)})`;
          ctx.lineWidth = .5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}
