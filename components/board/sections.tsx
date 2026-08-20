// Sections shared verbatim by every board LP (ported from the legacy HTML).
// Server components only — no client JS here.

export function YoukenSection() {
  return (
    <section id="youken">
      <div className="sec-head"><h2>募集要項</h2><span className="en">JOB DETAILS — 業態 × エリア × 雇用形態</span></div>

      <div className="brand-block b-celeste">
        <h3><span className="chip celeste">セレスト</span>美容室 CELESTE <small>全国（東京・埼玉・神奈川・京都・大阪・兵庫・名古屋・九州）</small></h3>
        <details open>
          <summary>業務委託</summary>
          <div className="d-body">
            <dl className="kv">
              <dt>歩合率</dt><dd>指名 63.8%／フリー 51.7%（税抜売上に対する歩合率・材料原価自己負担の場合。会社負担の場合は −11%）</dd>
              <dt>保証</dt><dd>入社3ヶ月間 指名81%保障／6ヶ月間 フリー55%保障（3〜6ヶ月目の指名は60%）。入社半年間の給与保証（時給1,400円相当）・入客保証（毎月100名相当）あり。早上がりで保証が減ることはありません</dd>
              <dt>インボイス</dt><dd>会社負担（自己負担を選択する場合は各種手当が2倍）</dd>
              <dt>勤務</dt><dd>自由出勤・シフト希望制（各店舗の営業時間内・遅番早番の縛りなし）。土日休みもいつでも取得可能</dd>
            </dl>
            <h4>手当・インセンティブ</h4>
            <ul>
              <li>賞与・アワード表彰：総額1,000万円を表彰者で配分（昨年実績）／紹介インセンティブ 40万円（1人紹介）</li>
              <li>店販手当 10〜20%／役職手当 平均8万円／口コミ手当 250〜500円/件</li>
              <li>美髪ランク手当 2,500円〜／再来率手当 最大5万円／行動指針 最大5万円</li>
              <li>引っ越し手当 5万円／家賃補助（会社指定エリアで家賃半額保障）</li>
              <li>独立支援（無借金独立・社長直下の独立支援会）</li>
            </ul>
            <p className="fine">条件：カラー・カット・縮毛矯正メニューに入客可能な方（ブランク相談可能）</p>
          </div>
        </details>
        <details>
          <summary>正社員</summary>
          <div className="d-body">
            <ul>
              <li>バリバリ稼ぎたい【週休2日】月給 30.8万円〜</li>
              <li>プライベート両立【完全週休2日・土日どちらか休み確約】月給 25.2万円〜</li>
              <li>時短社員・育児両立【週休2日・1日6時間】月給 22万円〜</li>
              <li>前職指名売上80万円以上【週休2日】月給 32万円〜</li>
            </ul>
            <p>月給＋売上歩合＋各種インセンティブ＋交通費（昇給あり）。歩合例：売上110万円→＋117,000円／売上130万円→＋197,000円</p>
            <p><b>経験歩合給あり</b>：指名売上に応じて月給に加算（例：指名売上30万円→＋3万円、50万円→＋5万円。売上実績に応じてご相談）</p>
            <p className="fine">給与は労働時間選択制（月140〜220h）に対応：月給19.6万円（140h）〜30.8万円（220h）＋歩合。試用期間1〜2ヶ月（時給1,230円・アルバイト雇用）。年末年始休暇（12/31〜1/3）・有給休暇あり。週休3日制なども相談可能（給与変動あり）・土日休みは月1〜2日まで取得可能</p>
          </div>
        </details>
        <details>
          <summary>アルバイト</summary>
          <div className="d-body">
            <p>基本時給 1,400円〜（全国統一）＋売上歩合＋各種インセンティブ＋交通費（経歴・技術により時給UPあり）。歩合例：売上70万円→＋41,000円／売上90万円→＋121,000円</p>
            <p className="fine">社会保険は法定通り。自由出勤・シフト希望制。研修・試用期間中は時給1,230円（習得スピードにより期間は個人差あり）</p>
          </div>
        </details>
        <details>
          <summary>正社員給与テーブル（労働時間別・東京 2025.11改訂）</summary>
          <div className="d-body">
            <p className="fine">時給1,400円ベースの労働時間選択制（変形労働時間制・固定残業代込み）。歩合給は300円/時</p>
            <div className="table-scroll"><table>
              <thead><tr><th>区分</th><th>労働時間の目安</th><th>基本給</th><th>歩合給</th><th>計</th><th>固定残業</th></tr></thead>
              <tbody>
                <tr><td>時短社員</td><td>150時間前後</td><td className="num">196,000円</td><td className="num">42,000円</td><td className="num"><b>238,000円</b></td><td className="num">10h</td></tr>
                <tr><td>時短社員</td><td>170時間前後</td><td className="num">224,000円</td><td className="num">48,000円</td><td className="num"><b>272,000円</b></td><td className="num">15h</td></tr>
                <tr><td>社員</td><td>190時間前後</td><td className="num">252,000円</td><td className="num">54,000円</td><td className="num"><b>306,000円</b></td><td className="num">20h</td></tr>
                <tr><td>社員</td><td>205時間前後</td><td className="num">280,000円</td><td className="num">60,000円</td><td className="num"><b>340,000円</b></td><td className="num">32h</td></tr>
                <tr><td>社員</td><td>220時間〜</td><td className="num">308,000円</td><td className="num">66,000円</td><td className="num"><b>374,000円</b></td><td className="num">46h</td></tr>
              </tbody>
            </table></div>
            <p><b>売上インセンティブ</b>：売上（税抜）の40%が「基本給＋歩合給＋交通費等」を上回った額を支給。例：売上90万円→2.7万〜13.9万円／110万円→10.7万〜21.9万円／130万円→18.7万〜29.9万円（労働時間パターンによる）</p>
            <ul>
              <li>口コミ手当 500円/件／美髪マイスターランク報酬 5,000〜10,000円／物販手当 10〜20%</li>
              <li>役職給 20,000〜120,000円（店長ランクによる）／人材紹介 指名売上の2%（在籍期間）または40万円</li>
            </ul>
            <p className="fine">研修期間は時給1,230円。パートは時給1,400円〜（成果に応じて昇給あり）</p>
          </div>
        </details>
        <details>
          <summary>給与例（実在スタッフ・月給）</summary>
          <div className="d-body">
            <ul>
              <li><b>月給 546,838円</b>｜男性スタイリスト Mさん（4年目）: 週休1〜2日（平日休み）・1日10〜11時間勤務</li>
              <li><b>月給 347,406円</b>｜女性・主婦・時短 Oさん(歴10年以上）: 週休2〜3日（平日・日・祝休み）・1日6時間勤務</li>
            </ul>
            <p><b>年収事例</b>：アイリスト 400万円／カラーリスト 550万円／スタイリスト 850万円／マネジメント込み 480万円・650万円・1,000万円</p>
            <p className="fine">働き方（労働時間・休日数）によって給与は変動します。詳細は面接時にご相談いただけます</p>
          </div>
        </details>
        <details>
          <summary>顧客をお持ちの方（全店舗共通）</summary>
          <div className="d-body">
            <p>お客様をお持ちの方は<b>どの店舗でもご紹介歓迎</b>です。前の店舗と同じ価格でのメニュー導入OK・フリーに無理に入らず指名のお客様を最優先で施術可能です（本人が望む場合はフリー入客も可）。</p>
          </div>
        </details>
      </div>

      <div className="brand-block b-nicotto">
        <h3><span className="chip nicotto">nicotto</span>美容室 nicotto（ニコット） <small>三軒茶屋・門前仲町・八王子（2026年下旬オープン予定）＋西日暮里（買収予定）</small></h3>
        <details open>
          <summary>ブランドコンセプト・求める方</summary>
          <div className="d-body">
            <p>50歳以上の女性のお客様を中心とした美容室。<b>年齢不問・ブランク不問</b>で、人生経験豊かな美容師さんを求めています。カットはお一人60分のゆとりある予約設計・掛け持ちなし・19時閉店。メニューは髪質改善美容室CELESTEで培った技術がベースです。</p>
            <p className="fine">ブランクのある方は新卒スタイリストと同じ教育プログラムで、シャンプー・カラー塗布からの再スタートOK（面談時の技術チェックなし）</p>
          </div>
        </details>
        <details>
          <summary>正社員（労働時間別テーブル）</summary>
          <div className="d-body">
            <p className="fine">時給1,400円ベース。営業時間9:00〜19:00・<b>土曜または日曜どちらかの休み確約</b>・時短勤務OK・産休育休あり</p>
            <div className="table-scroll"><table>
              <thead><tr><th>働き方</th><th>労働時間の目安</th><th>基本給</th></tr></thead>
              <tbody>
                <tr><td>時短社員（平日15時まで・土or日休み）</td><td>約125h</td><td className="num"><b>175,000円</b></td></tr>
                <tr><td>時短社員（平日15時まで・土日出勤）</td><td>約140h</td><td className="num"><b>196,000円</b></td></tr>
                <tr><td>社員（完全週休2日・土or日休み）</td><td>約190h</td><td className="num"><b>266,000円</b></td></tr>
              </tbody>
            </table></div>
            <p><b>経験歩合給</b>（指名売上に応じて月給に加算）：指名売上30万円→2万〜3万円／50万円→3.3万〜5万円／70万円→4.6万〜7万円／90万円→5.9万〜9万円（労働時間パターンによる）</p>
            <p className="fine">売上インセンティブ：売上（税抜）の40%が基本給＋歩合給等を上回った額を支給（例：売上90万円→6.9万〜16万円）。口コミ手当500円/件・美髪マイスター報酬・物販手当10〜20%あり</p>
          </div>
        </details>
        <details>
          <summary>パート・アルバイト</summary>
          <div className="d-body">
            <p>時給 1,400円〜（復帰・研修期間は時給1,230円）。完全自由シフト・週1日・扶養内からOK。土日休みも相談可能</p>
          </div>
        </details>
        <details>
          <summary>業務委託</summary>
          <div className="d-body">
            <p>完全歩合: 指名63%／フリー51%（税抜売上に対する歩合率）。勤務時間9:00〜19:00</p>
          </div>
        </details>
      </div>

      <div className="brand-block b-color">
        <h3><span className="chip color">カラー</span>ヘアカラー専門店 SPEEDY / Colors Labo <small>東京・沖縄・九州</small></h3>
        <details open>
          <summary>正社員（例：カラーズラボ仙川店）</summary>
          <div className="d-body">
            <ul>
              <li>バリバリ稼ぎたい【月8日休み】月給 33万円〜</li>
              <li>プライベート両立【完全週休2日・土日どちらか休み確約】月給 28万円〜</li>
              <li>塗布・選定未経験者歓迎【週休2日】月給 27万円〜</li>
              <li>時短社員・育児や家庭との両立【平日16時まで勤務】月給 25.5万円〜</li>
            </ul>
            <p className="fine">試用期間1〜2ヶ月（時給1,230円・アルバイト雇用）。土日休み取得可能・勤務時間や休日数の相談はいつでも可能。九州（OAKhair博多店）は月給 332,800円（インセンティブ含む）＋交通費の例あり</p>
          </div>
        </details>
        <details>
          <summary>パート・アルバイト</summary>
          <div className="d-body">
            <p>時給の目安（地域による）：東京 1,400円〜（土日休み希望の場合は1,340円〜）／沖縄 1,030円〜／九州 1,060円〜。Colors Labo五反田店は社内試験合格で時給 1,500円〜。遅番手当100〜200円/時・再来率手当0〜30円/時・役職手当50〜300円/時あり</p>
            <p className="fine">社会保険は法定通り。土日祝・遅番に出勤できる方は週1〜2日でも歓迎</p>
          </div>
        </details>
        <details>
          <summary>正社員給与テーブル（所定労働時間別）</summary>
          <div className="d-body">
            <p className="fine">※ 3ヶ月に1回、労働時間パターンを変更できます</p>
            <h4>東京エリア（2026年版・基本給1,240円/時＋基礎歩合給160円/時）</h4>
            <div className="table-scroll"><table>
              <thead><tr><th>働き方</th><th>労働時間の目安</th><th>基本給</th><th>基礎歩合給</th><th>計</th></tr></thead>
              <tbody>
                <tr><td>完全週休2日・土日どちらか休み・平日16時まで</td><td>約150h</td><td className="num">186,000円</td><td className="num">24,000円</td><td className="num"><b>210,000円</b></td></tr>
                <tr><td>完全週休2日・平日16時まで</td><td>約170h</td><td className="num">210,800円</td><td className="num">27,200円</td><td className="num"><b>238,000円</b></td></tr>
                <tr><td>完全週休2日</td><td>約180h</td><td className="num">223,200円</td><td className="num">28,800円</td><td className="num"><b>252,000円</b></td></tr>
                <tr><td>完全週休2日</td><td>約200h</td><td className="num">248,000円</td><td className="num">32,000円</td><td className="num"><b>280,000円</b></td></tr>
                <tr><td>完全週休2日・土日どちらか休み</td><td>約210h</td><td className="num">260,400円</td><td className="num">33,600円</td><td className="num"><b>294,000円</b></td></tr>
                <tr><td>月7日休み</td><td>約220h</td><td className="num">272,800円</td><td className="num">35,200円</td><td className="num"><b>308,000円</b></td></tr>
              </tbody>
            </table></div>
            <p>上記に加算される手当：土日祝手当（休みなし100円/時・1日休み50円/時）／遅番手当 200円/時（20時以降）／再来率手当 10〜30円/時（45%超〜55%超）ほか</p>
            <p className="fine">変形労働時間制（固定残業代込み）・試用期間は時給1,240円。五反田店は社内試験合格で特別手当 74,200〜116,600円が加算</p>
            <h4>名古屋エリア（給与詳細タブ準拠）</h4>
            <div className="table-scroll"><table>
              <thead><tr><th>所定労働時間</th><th>150h前後</th><th>170h前後</th><th>190h前後</th><th>210h前後</th></tr></thead>
              <tbody>
                <tr><td>基本給</td><td>144,200円</td><td>164,800円</td><td>185,400円</td><td>206,000円</td></tr>
                <tr><td>固定残業時間</td><td>8h</td><td>11h</td><td>26h</td><td>45h</td></tr>
              </tbody>
            </table></div>
            <h4>評価連動の手当（月々の給与に反映）</h4>
            <ul>
              <li>店長手当 23,800〜88,000円／行動指針手当 1,400〜17,600円（半年毎評価）</li>
              <li>再来率手当 1,400〜11,000円／人時接客手当 1,400〜6,600円</li>
              <li>土日手当 7,000〜22,000円／シフト貢献手当 4,200〜15,400円</li>
              <li>勤続ボーナス（黒字転換後: 3年3万円・5年5万円・7年7万円）</li>
            </ul>
            <p>平均インセンティブ実績: <b>月 96,800円</b>。給与例: 基本給264,000＋土日手当22,000＋シフト貢献6,600＋相互評価5,500＋再来率4,400＋人時接客4,400円</p>
          </div>
        </details>
        <details>
          <summary>インセンティブ・福利厚生</summary>
          <div className="d-body">
            <ul>
              <li>役職手当（月1万〜10万円）／生産性貢献手当（月3万〜6万円）／顧客満足度手当</li>
              <li>ボーナスあり（総額500万円を全スタッフで評価に応じて配分）</li>
              <li>紹介インセンティブ 20万〜40万円／店販手当 10〜20%</li>
              <li>引っ越し手当 5万円／家賃補助（会社指定エリアで家賃半額保障）</li>
              <li>社会保険完備・産休育休介護休暇・有給・定期健診・社割・海外研修（ロンドン・パリなど）ほか</li>
            </ul>
          </div>
        </details>
      </div>

      <div className="brand-block b-matsuge">
        <h3><span className="chip matsuge">まつげ</span>アイラッシュ Natural ViVi / Arc / Eye Doll / Belle / Noel <small>東京・神奈川・名古屋・九州・沖縄</small></h3>
        <details open>
          <summary>正社員</summary>
          <div className="d-body">
            <p>月給 255,000円〜（インセンティブ含む）＋交通費。Noel武蔵小杉店は月給 275,000円〜（インセンティブ含む）＋交通費</p>
            <p className="fine">まつげパーマ（ビューラー式）中心。希望があればどのメニューにも挑戦可能（九州一部店舗・沖縄・東京はメニュー拡張あり）。出勤はご相談ください</p>
          </div>
        </details>
        <details>
          <summary>パート・アルバイト</summary>
          <div className="d-body">
            <p>時給の目安（地域による）：東京・神奈川 1,230円〜／名古屋 1,140円〜／福岡 1,060円〜／沖縄 1,030円〜＋インセンティブ（再来率・相互評価などで時給加算）</p>
            <p className="fine">社会保険は法定通り</p>
          </div>
        </details>
        <details>
          <summary>正社員給与テーブル（所定労働時間別）</summary>
          <div className="d-body">
            <p className="fine">※ 3ヶ月に1回、労働時間パターンを変更できます。休みは平均月8日（労働時間により増減の相談可能）</p>
            <h4>東京エリア</h4>
            <div className="table-scroll"><table>
              <thead><tr><th>所定労働時間</th><th>170h</th><th>190h</th><th>210h</th></tr></thead>
              <tbody>
                <tr><td>基本給</td><td>220,000円</td><td>245,000円</td><td>270,000円</td></tr>
                <tr><td>固定残業時間</td><td>15h</td><td>17h</td><td>38h</td></tr>
              </tbody>
            </table></div>
            <h4>名古屋・九州エリア</h4>
            <div className="table-scroll"><table>
              <thead><tr><th>所定労働時間</th><th>170h</th><th>190h</th><th>210h</th></tr></thead>
              <tbody>
                <tr><td>基本給</td><td>200,000円</td><td>225,000円</td><td>250,000円</td></tr>
                <tr><td>固定残業時間</td><td>15h</td><td>17h</td><td>38h</td></tr>
              </tbody>
            </table></div>
            <h4>手当</h4>
            <ul>
              <li>カラー手当 25,000円／店長手当 5,000〜80,000円（月々の評価）</li>
              <li>行動指針手当 0〜30,000円（半年毎評価）／再来率手当 0〜30,000円／生産性手当 0〜10,000円</li>
            </ul>
            <p className="fine">※ 独り立ちまでの期間中は −20,000円。研修期間（約1ヶ月）は時給制（地域により異なる・面接時にご確認ください）</p>
          </div>
        </details>
      </div>

      <div className="brand-block b-oak">
        <h3><span className="chip oak">OAK</span>美容室 OAK hair <small>九州（小倉・福間・博多・九大学研都市・久留米）</small></h3>
        <details open>
          <summary>業務委託</summary>
          <div className="d-body">
            <dl className="kv">
              <dt>歩合率</dt><dd>指名 61%（入社3ヶ月は81%保障）／フリー 55%（税抜売上に対する歩合率・材料原価自己負担の場合。会社負担の場合は −11%）</dd>
              <dt>保証</dt><dd>セレストと同様（給与保証・入客保証あり）</dd>
              <dt>面貸し</dt><dd>小倉店・博多店は顧客をお持ちの方のみ面貸しでのご紹介が可能</dd>
            </dl>
            <p className="fine">手当・インセンティブはセレスト業務委託と共通です</p>
          </div>
        </details>
      </div>

      <p className="note">※ 各業態の「正社員給与テーブル」も上記に掲載しています。原文・最新版は共有スプレッドシートの「各業態の募集,概要」「給与詳細」タブをご覧ください。個別の条件は面接時にご相談いただけます。</p>
    </section>
  );
}

const SALARY_TRACKS = [
  {
    title: "業務委託（歩合50％）",
    cap: "平均時給＝生産性の50％。平均年収は週休2日で働いた場合",
    years: [
      { y: "2023年", val: "約436万円", wage: "時給 約1,650円", pct: null, h: 110, now: false },
      { y: "2024年", val: "約475万円", wage: "時給 約1,800円", pct: "前年比109%", h: 120, now: false },
      { y: "2025年", val: "約528万円", wage: "時給 約2,000円", pct: "前年比111%", h: 133, now: false },
      { y: "2026年", val: "約594万円", wage: "時給 約2,250円", pct: "前年比113%", h: 150, now: true },
    ],
  },
  {
    title: "正社員・パート・アルバイト（歩合原資40％）",
    cap: "平均時給＝生産性の40％。平均年収は週休2日で働いた場合・歩合手当別",
    years: [
      { y: "2023年", val: "約349万円", wage: "時給 約1,320円", pct: null, h: 110, now: false },
      { y: "2024年", val: "約380万円", wage: "時給 約1,440円", pct: "前年比109%", h: 120, now: false },
      { y: "2025年", val: "約422万円", wage: "時給 約1,600円", pct: "前年比111%", h: 133, now: false },
      { y: "2026年", val: "約475万円", wage: "時給 約1,800円", pct: "前年比113%", h: 150, now: true },
    ],
  },
];

export function SalaryGrowthSection({ note }: { note: string }) {
  return (
    <section id="salary-growth">
      <div className="sec-head"><h2>給与の推移</h2><span className="en">SALARY GROWTH</span></div>
      <p style={{ maxWidth: 680, marginBottom: 18 }}>生産性の改善に取り組み続けており、<b>全社の平均給与は2023年から毎年上昇しています</b>。候補者様への訴求材料としてご活用ください。</p>
      <div className="hero-stats" style={{ margin: "0 0 22px" }}>
        <div className="stat gold">約<b>594</b>万円<span>2026年 平均年収（業務委託・週休2日勤務の場合）</span></div>
        <div className="stat"><b>+36%</b><span>平均年収の伸び（2023→2026年）</span></div>
        <div className="stat"><b>970</b>万円<span>店長クラスの年収実例（2025年）</span></div>
      </div>
      <p style={{ maxWidth: 680, marginBottom: 18, fontSize: 13.5 }}>
        生産性（スタッフ1人・1時間あたりの売上）は 約3,300円（2023年）→ 約3,600円 → 約4,000円 → <b>約4,500円（2026年）</b>と毎年上昇。平均時給・平均年収も生産性に連動して毎年上がっています。
      </p>
      {SALARY_TRACKS.map((track) => (
        <div className="sg-track" key={track.title}>
          <h3>{track.title}</h3>
          <p className="sg-cap">平均年収の推移｜{track.cap}</p>
          <div className="sg-chart">
            {track.years.map((yr) => (
              <div className={yr.now ? "sg-col now" : "sg-col"} key={yr.y}>
                {yr.pct && <span className="sg-pct">{yr.pct}</span>}
                <span className="sg-val">{yr.val}</span>
                <div className="sg-bar" style={{ height: yr.h }} aria-hidden="true" />
                <div className="sg-foot"><b>{yr.y}</b><span>{yr.wage}</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h3 style={{ fontSize: 16, marginBottom: 10 }}>スタッフ年収の推移（実例）</h3>
      <div className="table-scroll">
        <table>
          <thead><tr><th>役職</th><th>2023年</th><th>2024年</th><th>2025年</th><th>アワード賞金</th></tr></thead>
          <tbody>
            <tr><td><b>店長</b></td><td>年収 790万円<br /><small>時給2,800円・単価8,800円</small></td><td>年収 830万円<br /><small>時給3,700円・単価11,000円</small></td><td><b>年収 970万円</b><br /><small>時給4,600円・単価11,800円</small></td><td className="num">＋約38万円</td></tr>
            <tr><td><b>プレーヤー</b></td><td>年収 570万円<br /><small>時給2,270円・単価8,800円</small></td><td>年収 720万円<br /><small>時給2,660円・単価11,000円</small></td><td><b>年収 790万円</b><br /><small>時給3,140円・単価11,800円</small></td><td className="num">＋約21万円</td></tr>
            <tr><td><b>プレーヤー</b></td><td>年収 470万円<br /><small>時給1,660円・単価7,000円</small></td><td>年収 510万円<br /><small>時給1,850円・単価7,650円</small></td><td><b>年収 580万円</b><br /><small>時給2,220円・単価9,100円</small></td><td className="num">＋約4万円</td></tr>
          </tbody>
        </table>
      </div>
      <p className="note" style={{ marginTop: 12 }}>{note}</p>
    </section>
  );
}

export function PhotosSection() {
  return (
    <section id="photos">
      <div className="sec-head"><h2>店舗写真・シャンプー台</h2><span className="en">STORES &amp; SHAMPOO UNITS</span></div>
      <div className="gallery">
        <figure className="ph"><img src="/photos/celeste-tokiwadai-1.jpg" alt="CELESTEときわ台店のスタイリングフロア" loading="lazy" /><figcaption><b>CELESTE ときわ台店</b>スタイリングフロア</figcaption></figure>
        <figure className="ph"><img src="/photos/celeste-tokiwadai-2.jpg" alt="CELESTEときわ台店の待合・受付" loading="lazy" /><figcaption><b>CELESTE ときわ台店</b>待合・受付</figcaption></figure>
        <figure className="ph"><img src="/photos/celeste-tokiwadai-shampoo.jpg" alt="CELESTEときわ台店のシャンプー台" loading="lazy" /><figcaption><b>CELESTE ときわ台店</b>シャンプー台（リクライニング式3台）</figcaption></figure>
        <figure className="ph"><img src="/photos/celeste-asagaya.jpg" alt="CELESTE阿佐ヶ谷店の店内" loading="lazy" /><figcaption><b>CELESTE 阿佐ヶ谷店</b>店内</figcaption></figure>
        <figure className="ph"><img src="/photos/colorslabo-hisaya.jpg" alt="Colors Labo久屋大通店の施術フロア" loading="lazy" /><figcaption><b>Colors Labo 久屋大通店</b>施術フロア</figcaption></figure>
        <figure className="ph"><img src="/photos/colorslabo-gotanda.jpg" alt="Colors Labo五反田店のスタイリングエリア" loading="lazy" /><figcaption><b>Colors Labo 五反田店</b>スタイリングエリア</figcaption></figure>
        <figure className="ph"><img src="/photos/colorslabo-sengawa.jpg" alt="カラーズラボ仙川店のスタイリングブース" loading="lazy" /><figcaption><b>カラーズラボ 仙川店</b>スタイリングブース</figcaption></figure>
        <figure className="ph"><img src="/photos/speedy-gakudai-shampoo.jpg" alt="SPEEDY学芸大学店のシャンプー台" loading="lazy" /><figcaption><b>SPEEDY 学芸大学店</b>シャンプー台</figcaption></figure>
        <figure className="ph"><img src="/photos/speedy-yutenji.jpg" alt="SPEEDY祐天寺店のシャンプー台" loading="lazy" /><figcaption><b>SPEEDY 祐天寺店</b>シャンプー台</figcaption></figure>
        <figure className="ph"><img src="/photos/speedy-naha.jpg" alt="SPEEDY那覇新都心店の店内" loading="lazy" /><figcaption><b>SPEEDY 那覇新都心店</b>店内</figcaption></figure>
        <figure className="ph"><img src="/photos/oak-interior-1.jpg" alt="OAK hairの店内" loading="lazy" /><figcaption><b>OAK hair</b>店内（スタイリングエリア）</figcaption></figure>
        <figure className="ph"><img src="/photos/oak-interior-2.jpg" alt="OAK hairの待合スペース" loading="lazy" /><figcaption><b>OAK hair</b>待合スペース</figcaption></figure>
        <figure className="ph"><img src="/photos/vivi-ebisu.jpg" alt="Natural ViViの施術スペース" loading="lazy" /><figcaption><b>Natural ViVi</b>施術スペース</figcaption></figure>
        <figure className="ph"><img src="/photos/vivi-miyashita.jpg" alt="Natural ViViの施術スペース" loading="lazy" /><figcaption><b>Natural ViVi</b>施術スペース</figcaption></figure>
        <figure className="ph"><img src="/photos/vivi-sakae.jpg" alt="Natural ViViの施術スペースと受付" loading="lazy" /><figcaption><b>Natural ViVi</b>施術スペース・受付</figcaption></figure>
        <figure className="ph"><img src="/photos/eyedoll-shibuya.jpg" alt="Eye Doll渋谷店の施術スペース" loading="lazy" /><figcaption><b>Eye Doll 渋谷店</b>施術スペース</figcaption></figure>
      </div>
      <p className="note" style={{ marginTop: 12 }}>※ 写真は各ブランドの内装イメージです。掲載のない店舗（葛西・住吉・門前仲町など）の写真は入手でき次第追加します。その他の店舗写真は共有スプレッドシートの「店舗雰囲気シャンプー台」タブにも掲載しています。ご希望の店舗があればお声がけください。</p>
    </section>
  );
}

export function InterviewSection() {
  return (
    <section id="interview">
      <div className="sec-head"><h2>インタビュー・会社の想い</h2><span className="en">INTERVIEWS</span></div>
      <div className="link-cards">
        <a className="link-card" href="https://beautygrow.co.jp/interview/" target="_blank" rel="noopener">
          <b>スタッフインタビュー</b>
          <span>アイラッシュ統括マネージャー、CELESTE川口店・石神井公園店・江古田店、SPEEDY恵比寿店のスタッフ5名のインタビューを掲載</span>
          <span className="arrow">beautygrow.co.jp/interview →</span>
        </a>
        <a className="link-card" href="https://beautygrow.co.jp/aboutus/" target="_blank" rel="noopener">
          <b>会社の想い（3つの大切なこと）</b>
          <span>「自由とチームワークの両立」「生涯現役美容師の実現」「お客様への誠実性」— 企業理念と会社概要</span>
          <span className="arrow">beautygrow.co.jp/aboutus →</span>
        </a>
        <a className="link-card" href="https://beautygrow.co.jp/recruit/" target="_blank" rel="noopener">
          <b>採用情報・代表メッセージ</b>
          <span>代表・齋藤光司のメッセージ「美容業界の働き方改革を実現します」と各業態の募集要項</span>
          <span className="arrow">beautygrow.co.jp/recruit →</span>
        </a>
      </div>
    </section>
  );
}

export function CompanySection() {
  return (
    <section id="company">
      <div className="sec-head"><h2>会社概要</h2><span className="en">COMPANY</span></div>
      <div className="co-grid">
        <div>
          <table className="co-table">
            <tbody>
              <tr><th>会社名</th><td>株式会社Beauty Grow</td></tr>
              <tr><th>代表</th><td>代表取締役 齋藤 光司</td></tr>
              <tr><th>本社</th><td>東京都港区南青山1-15-9 第45興和ビル 8F</td></tr>
              <tr><th>設立</th><td>2024年8月（持株会社として設立）</td></tr>
              <tr><th>店舗数</th><td>直営70店舗（美容室 30店舗／ヘアカラー専門店 15店舗／まつげカール専門店 25店舗）</td></tr>
              <tr><th>ブランド</th><td>CELESTE（美容室）／OAK hair（美容室）／nicotto（美容室・2026年下旬〜）／SPEEDY・Colors Labo（ヘアカラー専門）／Natural ViVi・Arc・Eye Doll・Belle・Noel（アイラッシュ）</td></tr>
              <tr><th>キャリア</th><td>マネジメント／スペシャリスト／本社スタッフ／新規事業／独立／新卒教育 の6コースから選択可能</td></tr>
              <tr><th>公式サイト</th><td><a href="https://beautygrow.co.jp" target="_blank" rel="noopener">beautygrow.co.jp</a></td></tr>
            </tbody>
          </table>
          <p className="philosophy">美容を通じて「笑顔」を創る<br /><small style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: "var(--sub)" }}>生涯現役美容師を当たり前に／お客様に最適解を提供します</small></p>
        </div>
        <div>
          <ul className="timeline">
            <li><b>2008</b><span>池袋にアイラッシュサロンを開業</span></li>
            <li><b>2012</b><span>ヘアカラー専門店運営会社 株式会社SPEEDY 設立</span></li>
            <li><b>2020</b><span>齋藤がSPEEDY社代表に就任。まつげパーマ事業を統合</span></li>
            <li><b>2024</b><span>美容室・カラー・まつげ合わせて約40店舗に拡大。株式会社Beauty Growを新設し、美容室CELESTE 25店舗をグループ化</span></li>
            <li><b>2025</b><span>株式会社SPEEDYおよびOAKグループ5店舗を吸収合併</span></li>
            <li><b>2026</b><span>グループ累計 約70店舗体制に</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
