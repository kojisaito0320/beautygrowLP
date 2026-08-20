import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "nicotto（ニコット）業態紹介｜おとな美容師のための美容室",
  description:
    "Beauty Growの新業態 nicotto（ニコット）のコンセプトと募集要項。19時閉店・土or日休み確約・年齢不問。紹介会社様向けのご案内ページです。",
};

function ArcDown({ fill, bg }: { fill: string; bg?: string }) {
  return (
    <div className="arc" aria-hidden="true" style={bg ? { background: bg } : undefined}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none">
        <path d="M0,0 Q720,56 1440,0 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}

function ArcUp({ fill, bg }: { fill: string; bg?: string }) {
  return (
    <div className="arc" aria-hidden="true" style={bg ? { background: bg } : undefined}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none">
        <path d="M0,56 Q720,0 1440,56 L1440,56 L0,56 Z" fill={fill} />
      </svg>
    </div>
  );
}

export default function NicottoPage() {
  return (
    <>
      <p className="top-note">大人のための美容室 nicotto ご案内ページです</p>

      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="hero-eyebrow en">BEAUTY GROW NEW BRAND</p>
            <div className="logo" role="img" aria-label="nicotto ニコット ロゴ">
              <svg viewBox="0 0 400 112">
                <text x="0" y="78" fontFamily="Quicksand, sans-serif" fontWeight="700" fontSize="92" letterSpacing="1" fill="#E8836B">nicott</text>
                <g transform="translate(297,13)">
                  <circle cx="34" cy="39" r="30" fill="none" stroke="#E8836B" strokeWidth="13.5" />
                  <path className="smile-path" d="M21 36 Q34 50 47 36" fill="none" stroke="#E8836B" strokeWidth="7" strokeLinecap="round" />
                </g>
                <text x="2" y="107" fontFamily="'M PLUS Rounded 1c','BIZ UDPGothic',sans-serif" fontWeight="700" fontSize="16" letterSpacing="8" fill="#8A6F5C">おとな美容師のための美容室</text>
              </svg>
            </div>
            <h1>50歳からが、<em>黄金期。</em></h1>
            <p className="hero-lead">nicotto（ニコット）は、お客様が思わず<b className="rd">“にこっ”</b>と笑顔になる時間をつくる、50歳以上の女性のお客様のための美容室。そして、長年のご経験を持つ美容師さんが主役になれるお店です。2026年下旬、東京4店舗で新装オープンします。</p>
            <div className="hero-facts">
              <span className="fact">19時 閉店</span>
              <span className="fact">土or日休み 確約</span>
              <span className="fact">カットはお一人 60分</span>
              <span className="fact">年齢不問・ブランク不問</span>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="/photos/nicotto/style-mature-bob.jpg" alt="ツヤのあるミセスボブスタイルの仕上がり。後ろ姿" />
            <figcaption>nicottoが目指す仕上がり（社内実例写真）</figcaption>
          </figure>
        </div>
      </header>
      <ArcDown fill="#FAF4E8" />

      <section id="empathy">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">VOICE</span><h2>こんな想いを抱えた美容師さん、いませんか</h2></div>
          <p className="lead">nicottoは、この3つの「あきらめ」をなくすためにつくった業態です。</p>
          <div className="empathy">
            <div className="emp">
              <p className="q">この年齢で応募していいのか、迷ってしまう</p>
              <p className="a"><b>年齢不問です。</b>お客様の多くが50歳以上だから、同世代の会話力と経験こそが最大の強みになります。あなたの「当たり前」が、ここでは最高のサービスです。</p>
            </div>
            <div className="emp">
              <p className="q">ブランクが長くて、技術についていけるか不安</p>
              <p className="a"><b>新卒スタイリストと同じ教育プログラム</b>を用意。シャンプー・カラー塗布からの再スタートOK、面談時の技術チェックもありません。</p>
            </div>
            <div className="emp">
              <p className="q">夜遅い営業と体力勝負のスピードがもうつらい</p>
              <p className="a"><b>19時閉店・カットはお一人60分。</b>掛け持ちで走り回る営業スタイルではありません。土曜か日曜どちらかのお休みも確約します。</p>
            </div>
          </div>
        </div>
      </section>
      <ArcUp fill="#FAF4E8" />

      <section id="customers" className="bg-ivory">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">FOR CUSTOMERS</span><h2>お客様にとってのnicotto</h2></div>
          <div className="lead">
            <p>ターゲットは<b>50歳以上の女性のお客様</b>。年齢とともに変わっていく髪──白髪・うねり・ボリューム・パサつき──と向き合い続けられる「かかりつけの美容室」を目指します。</p>
            <p>メニューは<b>髪質改善美容室CELESTEで培った技術がベース</b>。白髪を活かす・ぼかすグレイカラーにも、オイル主成分のカラー剤「iNOA（イノア）」と「LINK（リンク）」で応えます。客単価10,000円以上の上質・丁寧路線です。</p>
          </div>
          <div className="cust-grid">
            <div className="cust"><h3>60分のマンツーマン</h3><p>カットはお一人60分・掛け持ち接客なし。ゆっくり相談しながら施術を受けられます。</p></div>
            <div className="cust"><h3>髪と頭皮にやさしい薬剤</h3><p>主力商材は「iNOA」と「LINK」。原材料費は売上の10％以上（業界平均の2倍以上）。</p></div>
            <div className="cust"><h3>売り込みゼロ</h3><p>必要のないメニューや商品の売り込みは一切しません。本当に必要な提案だけ。</p></div>
            <div className="cust"><h3>同世代の美容師</h3><p>同じ時代を生きてきた美容師が担当。会話も相談も、同じ目線でできる安心感。</p></div>
          </div>
          <div className="photo-row">
            <figure><img src="/photos/nicotto/inoa-grey-ba-crop.jpg" alt="「もう白髪染めで傷めたくない」iNOAオイルカラーのビフォーアフター" loading="lazy" /><figcaption>白髪染めのダメージに悩む世代へ──iNOAオイルカラー（CELESTE販促素材）</figcaption></figure>
            <figure><img src="/photos/nicotto/inoa-root-ba.jpg" alt="白髪の根元染めビフォーアフター。50代のお客様の頭頂部" loading="lazy" /><figcaption>白髪の根元リタッチ実例（CELESTE販促素材）</figcaption></figure>
            <figure><img src="/photos/nicotto/treatment-hands-iron.jpg" alt="髪質改善施術の手元" loading="lazy" /><figcaption>丁寧な施術の手元（社内実写）</figcaption></figure>
          </div>
        </div>
      </section>
      <ArcUp fill="#FBE9E2" bg="#FAF4E8" />

      <section id="promise" className="bg-mist">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">PROMISE</span><h2>お客様への3つの約束</h2></div>
          <p className="lead">Beauty Grow全ブランド共通の約束です。nicottoもこの約束の上に立ちます。</p>
          <div className="pillars">
            <div className="pillar">
              <p className="big en">1</p>
              <h3>嘘のない、美容を。</h3>
              <p>罪悪感が生まれるような仕事は一切しません。薬剤を薄めず、材料を惜しまず。「自分の家族にも受けてもらいたいと思える仕事」が品質基準です。</p>
            </div>
            <div className="pillar">
              <p className="big en">2</p>
              <h3>あなたに“最適解”を。</h3>
              <p>一人ひとりに合わせた最適解を提案します。商材の種類を減らさず多様な選択肢を用意し、「丁寧さ」と「あなたらしさ」を大切にします。</p>
            </div>
            <div className="pillar">
              <p className="big en">3</p>
              <h3>笑顔を創る、誠実なサービスを。</h3>
              <p>必要のない施術や無理な販売は行いません。時には「やらない提案」もします。</p>
            </div>
          </div>
          <div className="note-box" style={{ background: "#fff" }}>
            <b className="rd" style={{ color: "var(--coral-deep)" }}>経験を、教える力に。</b><br />
            nicottoでは新卒スタイリストの教育も店舗内で行います。長年の経験と技術を次の世代に伝える<b>「トレーナー」としてのキャリア</b>を積むことができます。施術だけではない、ベテランだからこその活躍の場があります。
          </div>
        </div>
      </section>
      <ArcDown fill="#FBE9E2" />

      <section id="stores">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">STORES</span><h2>店舗とスケジュール</h2></div>
          <p className="lead">4店舗とも<b>既存店舗を改装しての業態転換</b>です（2026年下旬新装オープン・オープニング募集中）。</p>
          <div className="stores">
            <div className="store"><span className="open">2026年下旬 新装オープン</span><h3>nicotto 三軒茶屋店</h3><p>東京都世田谷区太子堂2-19-3 ムサシヤビル2F</p></div>
            <div className="store"><span className="open">2026年下旬 新装オープン</span><h3>nicotto 門前仲町店</h3><p>東京都江東区富岡1-6-6 ウィステリアコート2F</p></div>
            <div className="store"><span className="open">2026年下旬 新装オープン</span><h3>nicotto 八王子店</h3><p>東京都八王子市中町2-18 鶴屋ビル4階</p></div>
            <div className="store"><span className="open">2026年下旬 新装オープン</span><h3>nicotto 高円寺店</h3><p>東京都杉並区高円寺北3-5-19 ウェルロード高円寺2F<br />（高円寺駅近く・既存店の業態転換）</p></div>
            <div className="store"><span className="open">時期未定</span><h3>西日暮里（予定）</h3><p>買収予定店舗あり・詳細が決まり次第ご案内します</p></div>
          </div>
          <div className="photo-row">
            <figure><img src="/photos/nicotto/interior-bright-celeste.jpg" alt="明るいレンガ調の美容室内観。花と観葉植物" loading="lazy" /><figcaption>店舗の雰囲気（参考: 同社既存店）</figcaption></figure>
            <figure><img src="/photos/nicotto/interior-white-minimal.jpg" alt="白基調のセット面" loading="lazy" /><figcaption>セット面（参考: 同社既存店）</figcaption></figure>
            <figure><img src="/photos/nicotto/interior-setmen-shampoo.jpg" alt="セット面とシャンプー台" loading="lazy" /><figcaption>シャンプー設備（参考: 同社既存店）</figcaption></figure>
          </div>
          <p className="store-note">営業時間はいずれも 9:00〜19:00。内観は同社既存店の参考写真です。nicotto各店の実写真は改装完了後（2026年下旬予定）に差し替えます。面接地は各店舗または青山本社です。</p>
        </div>
      </section>
      <ArcUp fill="#FAF4E8" />

      <section id="youken" className="bg-ivory">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">POSITIONS</span><h2>募集要項（雇用形態別）</h2></div>

          <div className="koyou">
            <h3>正社員（スタイリスト）</h3>
            <dl>
              <dt>給与</dt><dd>月給 196,000円（月140h）〜308,000円（月220h）＋歩合給。勤務時間帯・時間数の選択制（詳細は下の給与テーブル参照）</dd>
              <dt>勤務日数・体制</dt><dd>週3〜5日／シフト制・時短勤務OK・変形労働時間制</dd>
              <dt>休日</dt><dd>完全週休2日または月7日休みの選択制。<b>土曜または日曜のどちらかのお休みを確約。</b>産休・育休取得可能</dd>
              <dt>必要資格・経験</dt><dd>美容師免許／スタイリスト経験（年齢不問・ブランク不問。ブランクのある方は教育プログラムで学び直しできます）</dd>
              <dt>仕事内容</dt><dd>50歳以上の女性のお客様を中心としたサロンワーク全般（カット・カラー・パーマ・髪質改善・ヘッドスパ）。カットはお一人60分・掛け持ちなし。新卒スタイリストの店舗内教育（トレーナー業務）にも携われます</dd>
              <dt>福利厚生</dt><dd>社会保険完備／インセンティブあり・ノルマなし／研修制度／育児休暇／賞与（社内AWARDで贈呈）／交通費応相談</dd>
            </dl>
          </div>

          <div className="koyou">
            <h3>パート・アルバイト</h3>
            <dl>
              <dt>給与</dt><dd>時給 1,400円〜（全国統一）＋経験歩合・各種手当</dd>
              <dt>勤務日数・体制</dt><dd>週1〜5日／完全自由シフト・扶養内OK。土日のお休みも相談できます</dd>
              <dt>必要資格・経験</dt><dd>美容師免許（年齢不問・ブランク不問）。シャンプー・カラー塗布などのアシスタント業務からの再スタートOK</dd>
              <dt>仕事内容</dt><dd>サロンワーク（できる業務から段階的に）。新卒スタイリストと同じ教育プログラムで、焦らず自分のペースで復帰できます</dd>
              <dt>福利厚生</dt><dd>社会保険完備（加入要件を満たす場合）／交通費応相談／口コミ手当（500円/件）／物販手当（10〜20％）／社員登用あり／副業・WワークOK／育児休暇</dd>
            </dl>
          </div>

          <div className="koyou">
            <h3>業務委託（スタイリスト）</h3>
            <dl>
              <dt>歩合</dt><dd>指名 63％／フリー 51％（税抜売上に対する歩合率）。<b>インボイスは会社負担</b>（CELESTEと同条件）</dd>
              <dt>勤務日数・体制</dt><dd>週2〜5日／自由出勤。19時閉店のため夜遅くまでの勤務はありません。土曜または日曜のお休みも相談できます</dd>
              <dt>必要資格・経験</dt><dd>美容師免許／スタイリスト経験</dd>
              <dt>仕事内容</dt><dd>50歳以上の女性のお客様中心のサロンワーク。同じ時代を生きてきたからこそ分かる会話と技術が、信頼と指名につながります</dd>
              <dt>その他</dt><dd>店販手当（10〜20％）／口コミ手当（500円/件）／税務サポート／各種講習会（希望者）／正社員への契約変更も相談可</dd>
            </dl>
          </div>
        </div>
      </section>
      <ArcDown fill="#FAF4E8" />

      <section id="salary">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">SALARY</span><h2>給与テーブル（正社員・パート）</h2></div>
          <div className="table-scroll">
            <table>
              <caption>月給パターン（東京・2026年版）</caption>
              <thead><tr><th>区分</th><th>所定労働時間</th><th>基本給（月）</th><th>働き方の目安</th></tr></thead>
              <tbody>
                <tr><td>パート</td><td>時間シフト</td><td className="num">時給 1,400円</td><td>週1日〜・扶養内OK</td></tr>
                <tr><td>時短社員</td><td className="num">125h</td><td className="num">175,000円</td><td>平日15時まで中心</td></tr>
                <tr><td>時短社員</td><td className="num">140h</td><td className="num">196,000円</td><td>時短×土or日休み</td></tr>
                <tr><td>社員</td><td className="num">190h</td><td className="num">266,000円</td><td>フルタイム・完全週休2日</td></tr>
                <tr><td>社員（上限）</td><td className="num">220h</td><td className="num">308,000円</td><td>労働時間選択制の上限</td></tr>
              </tbody>
            </table>
          </div>
          <div className="table-scroll">
            <table>
              <caption>経験歩合給（前職からの移籍顧客売上に応じて基本給に加算）</caption>
              <thead><tr><th>指名売上（月）</th><th>時短社員 125h</th><th>時短社員 140h</th><th>社員 190h</th></tr></thead>
              <tbody>
                <tr><td>30万円</td><td className="num">＋20,000円</td><td className="num">＋22,000円</td><td className="num">＋30,000円</td></tr>
                <tr><td>50万円</td><td className="num">＋33,000円</td><td className="num">＋37,000円</td><td className="num">＋50,000円</td></tr>
                <tr><td>70万円</td><td className="num">＋46,000円</td><td className="num">＋52,000円</td><td className="num">＋70,000円</td></tr>
                <tr><td>90万円</td><td className="num">＋59,000円</td><td className="num">＋66,000円</td><td className="num">＋90,000円</td></tr>
              </tbody>
            </table>
          </div>
          <div className="table-scroll">
            <table>
              <caption>売上歩合給（指名客売上に応じて基本給に加算）</caption>
              <thead><tr><th>施術売上（月・税抜）</th><th>時短社員 125h</th><th>時短社員 140h</th><th>社員 190h</th></tr></thead>
              <tbody>
                <tr><td>70万円</td><td className="num">＋80,000円</td><td className="num">＋59,000円</td><td className="num">0円</td></tr>
                <tr><td>90万円</td><td className="num">＋160,000円</td><td className="num">＋139,000円</td><td className="num">＋69,000円</td></tr>
                <tr><td>110万円</td><td className="num">＋240,000円</td><td className="num">＋219,000円</td><td className="num">＋149,000円</td></tr>
                <tr><td>130万円</td><td className="num">＋320,000円</td><td className="num">＋299,000円</td><td className="num">＋229,000円</td></tr>
              </tbody>
            </table>
          </div>
          <p className="tbl-note">売上歩合の計算式: 施術指名売上（税抜）の40％−25,000円が「基本給＋経験歩合給」を上回った額を支給（累計清算）。頑張った分がそのまま報酬に反映されます。</p>
          <div className="allow">
            <div><b>口コミ手当</b>1件につき500円</div>
            <div><b>物販手当</b>販売商品の10〜20％</div>
            <div><b>美髪マイスターランク報酬</b>取得につき5,000〜10,000円</div>
            <div><b>役職給</b>店長ランクにより 20,000〜120,000円</div>
          </div>
          <div className="award-fig">
            <img src="/photos/nicotto/award-group-beautygrow.jpg" alt="Beauty Growアワード表彰式の集合写真" loading="lazy" />
            <p><b className="rd">賞与は社内AWARDで。</b>総額1,000万円を表彰者で配分（昨年実績）。頑張りが正しく評価される全社の表彰制度に、nicottoのスタッフも参加します。</p>
          </div>
        </div>
      </section>
      <ArcUp fill="#FAF4E8" />

      <section id="message" className="bg-ivory">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">MESSAGE</span><h2>代表メッセージ</h2></div>
          <div className="msg">
            <p>nicottoは、50歳以上の女性のお客様のための美容室です。そして同時に、50歳からの美容師さんが主役になれる店です。</p>
            <p>美容業界では、経験豊富な美容師さんが年齢を理由に応募をあきらめたり、子育てや介護でハサミを置いたまま、戻る場所を見つけられずにいます。技術も接客も素晴らしいのに、活躍の場がない。その「当たり前」を変えたくて、この店をつくりました。</p>
            <p>nicottoのお客様の多くは、あなたと同じ時代を生きてきた方々です。同世代だから分かる会話、長年磨いてきた技術が、そのまま信頼に変わります。最新トレンドを追い続ける必要はありません。あなたの「当たり前」が、ここでは最高のサービスです。</p>
            <p>私たちが目指すのは「生涯現役美容師」という新しい常識です。ハサミを置いていた年月も、キャリアのうち。お客様も、わたしも、にこっと笑える店を、一緒につくりましょう。</p>
            <p className="sign">株式会社Beauty Grow 代表取締役　齋藤光司</p>
          </div>
        </div>
      </section>
      <ArcDown fill="#FAF4E8" />

      <section id="qa">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">Q&amp;A</span><h2>候補者様からよくあるご質問</h2></div>
          <div className="qa">
            <details open>
              <summary>Q. 年齢が気になります。何歳まで応募できますか？</summary>
              <p className="a">年齢不問です。nicottoはお客様の多くが50歳以上の美容室。同世代の美容師さんの経験と会話力こそが、いちばんの強みになります。「50歳からが黄金期」がこの店のコンセプトです。</p>
            </details>
            <details>
              <summary>Q. ブランクが10年以上あります。ついていけるか不安です。</summary>
              <p className="a">新卒スタイリストと同じ教育プログラムをご用意しています。シャンプー・カラー塗布などのアシスタント業務からの再スタートOK。焦らず自分のペースでカットデビューを目指せます。面談時の技術チェックもありません。</p>
            </details>
            <details>
              <summary>Q. 体力に自信がありません。</summary>
              <p className="a">カットはお一人60分のゆとりある予約設計。掛け持ちで走り回る営業スタイルではありません。19時閉店で、夜遅くまでの勤務もありません。</p>
            </details>
            <details>
              <summary>Q. 家庭との両立はできますか？</summary>
              <p className="a">勤務時間は月140〜220hの選択制（時短社員あり）、完全週休2日または月7日休みを選べ、土曜か日曜どちらかのお休みを確約します。パートは完全自由シフト・扶養内OKで、産休・育休も取得できます。</p>
            </details>
            <details>
              <summary>Q. お客様はどんな方ですか？</summary>
              <p className="a">50歳以上の女性のお客様が中心です。メニューは髪質改善美容室CELESTEで培った技術がベース。必要のないメニューや商品の売り込みは一切しません。</p>
            </details>
            <details>
              <summary>Q. 勤務する店舗は選べますか？</summary>
              <p className="a">三軒茶屋・門前仲町・八王子・高円寺の4店舗からご希望を伺います。いずれも2026年下旬オープン予定です。</p>
            </details>
          </div>
        </div>
      </section>
      <ArcUp fill="#FBE9E2" />

      <section id="flow" className="bg-mist">
        <div className="wrap">
          <div className="sec-head"><span className="tag en">PROCESS</span><h2>ご紹介から入社までの流れ</h2></div>
          <ol className="flow">
            <li><b>候補者様のご紹介</b><span>いつもの窓口（担当者・共有シート）からご連絡ください</span></li>
            <li><b>日程調整 → 本社面談</b><span>私服でOK。ブランクのある方は技術チェックなしの面談のみです</span></li>
            <li><b>店舗見学（ご希望の方）</b><span>改装完了後（2026年下旬予定）は店舗でのご案内も可能です</span></li>
            <li><b>入社</b><span>オープニングメンバーとして2026年下旬スタート（入社時期は相談可）</span></li>
          </ol>
          <div className="note-box">
            紹介会社様へ：選考状況の共有・成約実績の記録は、各社の共有スプレッドシート（★更新サマリ／ご紹介者様タブ）で従来どおり運用します。nicottoのご紹介手数料条件は担当者までお問い合わせください。
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p><b>株式会社Beauty Grow</b>｜直営70店舗（美容室30／ヘアカラー専門店15／まつげカール専門店25）を運営。nicottoはその新業態です。</p>
          <p className="links">
            <a href="https://beautygrow.co.jp" target="_blank" rel="noopener">会社公式サイト</a>
            <a href="https://beautygrow.co.jp/recruit/" target="_blank" rel="noopener">採用情報・代表メッセージ</a>
          </p>
          <p>このページは紹介会社様向けの限定共有です（検索エンジン非掲載）。ロゴ・写真の一部はドラフト・参考素材であり、改装完了後（2026年下旬予定）に実店舗写真へ差し替えます。</p>
        </div>
      </footer>
    </>
  );
}
