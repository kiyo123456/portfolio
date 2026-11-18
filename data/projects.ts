// data/projects.ts
// ポートフォリオに載せるプロジェクトの一覧。追加・修正はこのファイルだけで済むようにしている。
// 書き方のルール：コードに実際に入っていることだけを書く（入っていない対策は「未対応」と書く）。

export type Link = {
  label: string;
  href: string;
};

// 点検表の1行
export type SecurityCheck = {
  attack: string;
  defense: string;
  owner: string; // 誰が守っているか
  status: "done" | "todo";
};

// 詳細ページの1セクション
export type DetailSection = {
  label: string; // 英語の見出しラベル（Craft Desk のルール：ラベルは英語）
  heading: string;
  body?: string[];
  points?: { title: string; text: string }[];
  table?: "security" | "hosting";
};

export type HostingOption = {
  name: string;
  decision: "採用" | "見送り";
  reason: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  badge?: string;
  period?: string;
  note?: string; // 付箋に書くひとこと
  context?: string; // 注記（どこで・誰と）
  tech: string[];
  summary: string[];
  links: Link[];
  detail?: {
    lead: string;
    sections: DetailSection[];
    security?: SecurityCheck[];
    hosting?: HostingOption[];
  };
};

export const projects: Project[] = [
  {
    slug: "mini-board",
    title: "mini-board",
    tagline: "自分のアプリの安全性を説明できるようになるために作った、小さな SNS",
    badge: "Security Study",
    period: "2026",
    note: "IPA の基準で\n6項目を点検した",
    context: "開発中のサービス TETOMI のための検証用アプリ。",
    tech: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    summary: [
      "ログイン・画像と文章の投稿・いいねができる掲示板アプリ。開発中のサービス TETOMI を安全に広げるための、検証用として作りました。",
      "IPA「安全なウェブサイトの作り方」を基準にアプリを点検し、Supabase や React が守ってくれる部分と、自分で設定しないと守れない部分を分けて整理しました。",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/kiyo123456/mini-board" }],
    detail: {
      lead: "TETOMI を現場のエンジニアに見てもらったとき、セキュリティについての質問にひとつも答えられませんでした。実際のユーザーがいる TETOMI で試すのは危ないので、小さなアプリを作って、仕組みを理解するところから始めました。",
      sections: [
        {
          label: "What",
          heading: "作ったもの",
          points: [
            { title: "ログイン", text: "Supabase Auth のメールとパスワードでログインする" },
            { title: "投稿", text: "掲示板に文章と画像を投稿できる。画像は Supabase Storage の自分専用フォルダに保存する" },
            { title: "いいね", text: "ほかの人の投稿にいいねできる。Realtime で、ほかの人の投稿もすぐに一覧に出る" },
          ],
        },
        {
          label: "Why",
          heading: "きっかけ",
          body: [
            "開発中の TETOMI を現場のエンジニアに見てもらったとき、次の3つを聞かれました。",
          ],
          points: [
            { title: "流出", text: "メールアドレスとパスワードが流出したら、どうなるのか" },
            { title: "使い回し", text: "使い回されたパスワードから、ほかのサービスにも被害が広がらないか" },
            { title: "責任", text: "流出したとき、サービスを提供する側として責任をどう取るのか" },
          ],
        },
        {
          label: "Goal",
          heading: "目的",
          body: [
            "AI で誰でもアプリを作れるようになった一方で、使う人の警戒心は高まっています。学生が作ったアプリを使ってもらうには、「安全です」と根拠を持って説明できる必要があります。",
            "そこで、使っている技術、特にセキュリティの仕組みを理解すること、どんな攻撃にどう守れるかを知ること、Supabase の使い方を把握することを目標にしました。",
          ],
        },
        {
          label: "Stack",
          heading: "技術選定",
          body: [
            "判断の基準は「一人で、短い期間で、お金をかけずに、ちゃんと動く安全なものを公開できる」ことです。",
            "もう1つの基準は「危険なものを自分で持たない・自分で作らない」こと。個人開発では、コードを見直す人も異常に気づく人も自分しかいません。被害をいちばん確実に小さくするのは、危険なものを最初から持たないことだと考えました。そのため認証は自作せず、パスワードの保存も含めて Supabase に任せています。",
          ],
          table: "hosting",
        },
        {
          label: "Method",
          heading: "点検の方法",
          points: [
            { title: "基準を決める", text: "IPA（情報処理推進機構）「安全なウェブサイトの作り方 改訂第7版」を基準にする" },
            { title: "穴を洗い出す", text: "AI にアプリを点検させ、攻撃されうる穴を洗い出す" },
            { title: "確かめる", text: "穴ごとに、自分のアプリで塞げているかをコードで確かめる" },
          ],
        },
        {
          label: "Result",
          heading: "点検の結果",
          body: [
            "Supabase・React・Next.js が守ってくれる部分と、自分で設定しないと守れない部分が混ざっていました。下の2つの「未対応」は、点検で見つけた穴です。",
          ],
          table: "security",
        },
        {
          label: "Gaps",
          heading: "見つけた穴：Supabase・React では塞がらないもの",
          points: [
            {
              title: "SVG 画像による XSS",
              text: "SVG は画像ですが、中にスクリプトを書けます。React のエスケープは画面に出すテキストが対象で、アップロードされたファイルの中身は対象外です。今は「image/」で始まる形式ならすべて受け付けているため、SVG を拒否する必要があります。",
            },
            {
              title: "クリックジャッキング",
              text: "別のサイトに透明な iframe で重ねられ、意図しないクリックをさせられる攻撃です。埋め込みを拒否するヘッダー（X-Frame-Options や CSP の frame-ancestors）は、自分で設定しないと付きません。",
            },
          ],
        },
        {
          label: "UX",
          heading: "ほかに工夫したこと",
          body: [
            "いいねを押してから表示が変わるまでに約2秒かかっていました。React の useOptimistic を使い、サーバーの返事を待たずに押した瞬間に表示を切り替えるようにしました。",
          ],
        },
        {
          label: "Learned",
          heading: "学び",
          body: [
            "Supabase は守るための仕組みを用意しているだけで、自動で守ってくれるわけではありません。RLS のポリシーを書くのも、どの仕組みをどの場面で使うかを決めるのも自分です。",
            "最初の質問には、今ならこう答えられます。パスワードは Supabase Auth がハッシュ化して保存しており、元の形では持っていません。そのほかの攻撃についても、誰がどう守っているのか、どこがまだ守れていないのかを、上の表のように説明できます。",
          ],
        },
        {
          label: "Next",
          heading: "これから",
          points: [
            { title: "見つけた穴を塞ぐ", text: "SVG のアップロードを拒否し、セキュリティヘッダーを付ける" },
            { title: "TETOMI でも点検する", text: "同じ IPA の基準で TETOMI の穴を洗い出して塞ぐ" },
            { title: "後から入る人のために", text: "新しいメンバーが仕組みを理解しながら開発できるよう、教材をそろえる" },
          ],
        },
      ],
      hosting: [
        { name: "Vercel + Next.js", decision: "採用", reason: "個人なら無料。追加の設定なしで動き、GitHub に push するだけでプレビューと本番に公開できる" },
        { name: "GitHub Pages", decision: "見送り", reason: "静的なサイトしか置けない" },
        { name: "Netlify", decision: "見送り", reason: "動かせるが、Next.js との連携の設定に手間がかかる" },
        { name: "Render・Railway・Fly.io", decision: "見送り", reason: "使用料がかかり、個人ではコストが見合わない" },
        { name: "AWS EC2", decision: "見送り", reason: "学ぶことが多く、サーバーを安全に組むための知識が要る" },
      ],
      security: [
        { attack: "パスワードの流出", defense: "パスワードはハッシュ化して保存される", owner: "Supabase Auth", status: "done" },
        { attack: "DB・セッションへの攻撃", defense: "全テーブルで RLS を有効にし、「自分の投稿だけ書き換えられる」などのポリシーを書いた。セッションは Supabase が管理する", owner: "Supabase + 自分（RLS）", status: "done" },
        { attack: "XSS（テキスト）", defense: "{} で表示すると自動でエスケープされる", owner: "React", status: "done" },
        { attack: "CSRF", defense: "@supabase/ssr のクッキーは SameSite=Lax。Server Actions は Origin と Host が違うリクエストを拒否する", owner: "Supabase + Next.js", status: "done" },
        { attack: "XSS（SVG 画像）", defense: "SVG のアップロードを拒否する", owner: "自分", status: "todo" },
        { attack: "クリックジャッキング", defense: "セキュリティヘッダーで iframe への埋め込みを拒否する", owner: "自分（設定）", status: "todo" },
      ],
    },
  },
  {
    slug: "tetomi",
    title: "TETOMI",
    tagline: "同じ大学の学生どうしで、教科書を手渡しで譲り合うサービス",
    badge: "Live",
    period: "2026 –",
    note: "大学メールで\n本人確認",
    context: "企画はチーム、開発はほぼ一人で担当。",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vitest", "Vercel"],
    summary: [
      "教科書や資格教材は高く、使い終わったものを必要な後輩に渡す場がありません。TETOMI は、同じ大学の学生だけが使える教科書の P2P 取引サービスです。大学のメールアドレスで本人確認をし、学外の人は登録できません。送料・手数料はゼロです。",
      "まずは1つの学部から始め、他の学部や関東の大学にも広げることを目指しています。出品・検索・購入希望・ISBN のバーコード読み取り・Stripe による決済などを実装しています。",
    ],
    links: [
      { label: "Visit Site", href: "https://tetomi.jp" },
      { label: "View on GitHub", href: "https://github.com/tetomi-official/fortetomi.jp" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
