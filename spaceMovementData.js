/*
 * “空间、方位与移动”模块数据。
 * 只保存学习内容；页面渲染位于 space-movement.js。
 */
const spaceMovementData = (() => {
  const segments = (...parts) => parts.map((part) => (
    Array.isArray(part) ? { text: part[0], reading: part[1] || "" } : { text: part }
  ));

  const example = (meaning, ...parts) => {
    const rubySegments = segments(...parts);
    return {
      text: rubySegments.map((part) => part.text).join(""),
      meaning,
      segments: rubySegments
    };
  };

  const phrase = (text, reading, meaning = "", rubySegments = []) => ({
    text,
    reading,
    meaning,
    segments: rubySegments
  });

  const item = (id, title, reading, meaning, summary, options = {}) => ({
    id,
    title,
    reading,
    meaning,
    summary,
    type: options.type || "word",
    formalLevel: options.formalLevel || "",
    motion: options.motion || "",
    distinction: options.distinction || "",
    tags: options.tags || [],
    aliases: options.aliases || [],
    searchTerms: options.searchTerms || [],
    particles: options.particles || [],
    collocations: options.collocations || [],
    examples: options.examples || [],
    ask: options.ask || [],
    answers: options.answers || [],
    copyPhrases: options.copyPhrases || [],
    relatedIds: options.relatedIds || [],
    crossLinks: options.crossLinks || []
  });

  const scene = (id, title, reading, meaning, summary, options = {}) => item(
    id,
    title,
    reading,
    meaning,
    summary,
    {
      ...options,
      type: "scene",
      collocations: options.keywords || [],
      examples: options.copyPhrases || []
    }
  );

  const places = {
    id: "places",
    title: "指示地点",
    japaneseTitle: "指示場所",
    reading: "しじばしょ",
    meaning: "这里、那里与哪边",
    summary: "先按说话人、听话人和双方距离选择こ・そ・あ・ど，再区分普通、礼貌和随意说法。",
    items: [
      item("place-koko", "ここ", "ここ", "这里", "靠近说话人的地点，最普通、最直接。", {
        formalLevel: "普通",
        distinction: "表示具体地点；比「こちら」直接，比「こっち」中性。",
        particles: ["ここに", "ここで", "ここから"],
        collocations: [phrase("ここに置く", "ここにおく", "放在这里"), phrase("ここで待つ", "ここでまつ", "在这里等")],
        examples: [example("请坐这里。", "ここに", ["座", "すわ"], "ってください。")],
        relatedIds: ["place-kochira", "place-kocchi", "particle-ni-presence", "particle-de-action"]
      }),
      item("place-soko", "そこ", "そこ", "那里", "靠近听话人，或双方刚刚谈到的地点。", {
        formalLevel: "普通",
        distinction: "常指对方身边的地方，也能指语境中已经明确的位置。",
        particles: ["そこに", "そこで", "そこまで"],
        collocations: [phrase("そこにある", "そこにある", "在那里"), phrase("そこで曲がる", "そこでまがる", "在那里转弯")],
        examples: [example("请把包放在那里。", "バッグはそこに", ["置", "お"], "いてください。")],
        relatedIds: ["place-sochira", "place-socchi"]
      }),
      item("place-asoko", "あそこ", "あそこ", "那边、那里", "离说话人和听话人都较远，而且双方能共同确认的地点。", {
        formalLevel: "普通",
        distinction: "多用于视线可及的远处；不是单纯的「そこ」加远一点。",
        particles: ["あそこに", "あそこで", "あそこまで"],
        collocations: [phrase("あそこに見える", "あそこにみえる", "能看见那边"), phrase("あそこまで歩く", "あそこまであるく", "走到那边")],
        examples: [example("车站就在那边。", ["駅", "えき"], "はあそこです。")],
        relatedIds: ["place-achira", "place-acchi", "distance-anohen"]
      }),
      item("place-doko", "どこ", "どこ", "哪里", "询问具体地点的基础疑问词。", {
        formalLevel: "普通",
        distinction: "需要根据后面的助词区分存在地点、动作地点和移动方向。",
        particles: ["どこに", "どこで", "どこへ", "どこから", "どこまで"],
        collocations: [phrase("どこにある", "どこにある", "在哪里"), phrase("どこで会う", "どこであう", "在哪里见")],
        examples: [example("洗手间在哪里？", "トイレはどこですか。")],
        relatedIds: ["place-dochira", "place-docchi", "particle-ni-presence", "particle-de-action"],
        crossLinks: [
          { label: "疑问表达百科：どこ", route: { theme: "question-expressions", section: "questions-words", entry: "word-doko" } },
          { label: "疑问表达百科：地点询问", route: { theme: "question-expressions", section: "questions-purposes", entry: "purpose-place" } }
        ]
      }),
      item("place-kochira", "こちら", "こちら", "这边、这里（礼貌）", "礼貌地指向说话人一侧，也可指人或方向。", {
        formalLevel: "礼貌",
        distinction: "接待、服务场景常用；比「ここ」柔和，也可表示“这位”。",
        particles: ["こちらに", "こちらで", "こちらへ"],
        collocations: [phrase("こちらへどうぞ", "こちらへどうぞ", "请往这边"), phrase("こちらで待つ", "こちらでまつ", "在这边等")],
        examples: [example("前台在这边。", ["受付", "うけつけ"], "はこちらです。")],
        relatedIds: ["place-koko", "place-kocchi"]
      }),
      item("place-sochira", "そちら", "そちら", "那边、您那边（礼貌）", "礼貌地指听话人一侧，电话中也常表示对方所在处。", {
        formalLevel: "礼貌",
        distinction: "既能指方向，也能礼貌地指对方或对方单位。",
        particles: ["そちらに", "そちらで", "そちらから"],
        collocations: [phrase("そちらに伺う", "そちらにうかがう", "去您那里"), phrase("そちらで確認する", "そちらでかくにんする", "在您那边确认")],
        examples: [example("我现在去您那边。", ["今", "いま"], "からそちらへ", ["向", "む"], "かいます。")],
        relatedIds: ["place-soko", "place-socchi"]
      }),
      item("place-achira", "あちら", "あちら", "那边（礼貌）", "礼貌地指双方都较远的一侧或方向。", {
        formalLevel: "礼貌",
        distinction: "商店、车站等引导场景常见，也可礼貌地指远处的人。",
        particles: ["あちらに", "あちらで", "あちらへ"],
        collocations: [phrase("あちらに見える", "あちらにみえる", "能看到那边"), phrase("あちらへ進む", "あちらへすすむ", "往那边走")],
        examples: [example("电梯在那边。", "エレベーターはあちらです。")],
        relatedIds: ["place-asoko", "place-acchi"]
      }),
      item("place-dochira", "どちら", "どちら", "哪边、哪里（礼貌）", "礼貌地询问方向、地点或二者中的选择。", {
        formalLevel: "礼貌",
        distinction: "可替代「どこ」使问法更礼貌，也有“哪一个”的用法。",
        particles: ["どちらに", "どちらで", "どちらへ"],
        collocations: [phrase("どちらですか", "どちらですか", "是哪边"), phrase("どちらに行く", "どちらにいく", "往哪边走")],
        examples: [example("东口在哪边？", ["東口", "ひがしぐち"], "はどちらですか。")],
        relatedIds: ["place-doko", "place-docchi"]
      }),
      item("place-kocchi", "こっち", "こっち", "这边（随意）", "朋友、家人之间指说话人一侧的口语说法。", {
        formalLevel: "随意",
        distinction: "比「ここ」更有方向感，比「こちら」随意，不适合正式接待。",
        particles: ["こっちに", "こっちで", "こっちへ"],
        collocations: [phrase("こっちに来る", "こっちにくる", "来这边"), phrase("こっちへ曲がる", "こっちへまがる", "转向这边")],
        examples: [example("到这边来。", "こっちに", ["来", "き"], "て。")],
        relatedIds: ["place-koko", "place-kochira"]
      }),
      item("place-socchi", "そっち", "そっち", "那边（随意）", "随意地指听话人一侧或对方选择的方向。", {
        formalLevel: "随意",
        distinction: "常用于熟人对话；语气过强时可能像命令。",
        particles: ["そっちに", "そっちで", "そっちへ"],
        collocations: [phrase("そっちに行く", "そっちにいく", "去你那边"), phrase("そっちで待つ", "そっちでまつ", "在那边等")],
        examples: [example("我马上去你那边。", "すぐそっちに", ["行", "い"], "くよ。")],
        relatedIds: ["place-soko", "place-sochira"]
      }),
      item("place-acchi", "あっち", "あっち", "那边（随意）", "随意地指离双方较远的方向。", {
        formalLevel: "随意",
        distinction: "有明显口语感；正式场合用「あちら」。",
        particles: ["あっちに", "あっちで", "あっちへ"],
        collocations: [phrase("あっちにある", "あっちにある", "在那边"), phrase("あっちへ行く", "あっちへいく", "往那边去")],
        examples: [example("便利店在那边。", "コンビニはあっちにあるよ。")],
        relatedIds: ["place-asoko", "place-achira"]
      }),
      item("place-docchi", "どっち", "どっち", "哪边（随意）", "熟人之间询问方向或两者选择。", {
        formalLevel: "随意",
        distinction: "比「どこ」更强调方向或二选一，礼貌场合改用「どちら」。",
        particles: ["どっちに", "どっちで", "どっちへ"],
        collocations: [phrase("どっちに行く", "どっちにいく", "走哪边"), phrase("どっちが近い", "どっちがちかい", "哪边更近")],
        examples: [example("哪边比较近？", "どっちが", ["近", "ちか"], "い？")],
        relatedIds: ["place-doko", "place-dochira"]
      })
    ]
  };

  const directions = {
    id: "directions",
    title: "基本方位",
    japaneseTitle: "基本方向",
    reading: "きほんほうこう",
    meaning: "上下、前后、左右与中心",
    summary: "以一个基准物为中心，用「Nの＋方位词」说清楚相对位置。",
    items: [
      item("direction-ue", "上", "うえ", "上面、上方", "比基准物高，或在其表面上方。", {
        particles: ["Nの上に", "Nの上で"],
        collocations: [phrase("机の上", "つくえのうえ", "桌子上"), phrase("上を見る", "うえをみる", "向上看")],
        examples: [example("钥匙在桌子上。", ["机", "つくえ"], "の", ["上", "うえ"], "に", ["鍵", "かぎ"], "があります。")],
        relatedIds: ["direction-shita", "movement-agaru", "movement-noboru"]
      }),
      item("direction-shita", "下", "した", "下面、下方", "比基准物低，或被其覆盖、支撑的空间。", {
        particles: ["Nの下に", "Nの下で"],
        collocations: [phrase("椅子の下", "いすのした", "椅子下面"), phrase("下を見る", "したをみる", "向下看")],
        examples: [example("猫在椅子下面。", ["猫", "ねこ"], "は", ["椅子", "いす"], "の", ["下", "した"], "にいます。")],
        relatedIds: ["direction-ue", "movement-oriru", "movement-kudaru"]
      }),
      item("direction-mae", "前", "まえ", "前方、面前", "位于基准物朝向的一侧，或视线正前方。", {
        distinction: "表示朝向前方；不是建筑背面的「裏」，也不是人的背后「後ろ」。",
        particles: ["Nの前に", "Nの前で"],
        collocations: [phrase("駅の前", "えきのまえ", "车站前"), phrase("前に進む", "まえにすすむ", "向前走")],
        examples: [example("我在车站前等。", ["駅", "えき"], "の", ["前", "まえ"], "で", ["待", "ま"], "っています。")],
        relatedIds: ["direction-ushiro", "direction-ura", "movement-susumu"]
      }),
      item("direction-ushiro", "後ろ", "うしろ", "背后、后方", "位于人或物朝向的背面方向。", {
        distinction: "强调朝向的后方；人的背后通常用「後ろ」，建筑背面常用「裏」。",
        particles: ["Nの後ろに", "Nの後ろで"],
        collocations: [phrase("私の後ろ", "わたしのうしろ", "我后面"), phrase("後ろを振り向く", "うしろをふりむく", "回头看")],
        examples: [example("请排在我后面。", ["私", "わたし"], "の", ["後", "うし"], "ろに", ["並", "なら"], "んでください。")],
        relatedIds: ["direction-mae", "direction-ura"]
      }),
      item("direction-hidari", "左", "ひだり", "左边", "以人或基准物的朝向为基准的左侧。", {
        particles: ["左に", "左へ", "Nの左側"],
        collocations: [phrase("左に曲がる", "ひだりにまがる", "向左转"), phrase("左側にある", "ひだりがわにある", "在左侧")],
        examples: [example("请在下一个路口左转。", ["次", "つぎ"], "の", ["角", "かど"], "を", ["左", "ひだり"], "に", ["曲", "ま"], "がってください。")],
        relatedIds: ["direction-migi", "road-hidarite", "movement-magaru"]
      }),
      item("direction-migi", "右", "みぎ", "右边", "以人或基准物的朝向为基准的右侧。", {
        aliases: ["右边", "右侧", "右转"],
        particles: ["右に", "右へ", "Nの右側"],
        collocations: [phrase("右に曲がる", "みぎにまがる", "向右转"), phrase("右側に見える", "みぎがわにみえる", "在右侧能看到")],
        examples: [example("银行在右边。", ["銀行", "ぎんこう"], "は", ["右", "みぎ"], "にあります。")],
        relatedIds: ["direction-hidari", "road-migite", "movement-magaru"]
      }),
      item("direction-yoko", "横", "よこ", "横侧、旁边", "位于某物左右的横向位置，不强调是否紧挨。", {
        distinction: "只说明横侧位置；「隣」更强调直接相邻。",
        particles: ["Nの横に", "Nの横で"],
        collocations: [phrase("入口の横", "いりぐちのよこ", "入口旁"), phrase("横に並ぶ", "よこにならぶ", "并排")],
        examples: [example("自动售货机在入口旁边。", ["自動販売機", "じどうはんばいき"], "は", ["入口", "いりぐち"], "の", ["横", "よこ"], "です。")],
        relatedIds: ["direction-tonari", "distance-soba"]
      }),
      item("direction-tonari", "隣", "となり", "紧邻、隔壁", "同类事物或并列位置中直接相邻。", {
        distinction: "强调紧挨着，通常比「横」和「近く」距离更明确。",
        particles: ["Nの隣に", "Nの隣で"],
        collocations: [phrase("銀行の隣", "ぎんこうのとなり", "银行隔壁"), phrase("隣の部屋", "となりのへや", "隔壁房间")],
        examples: [example("便利店在银行旁边。", "コンビニは", ["銀行", "ぎんこう"], "の", ["隣", "となり"], "です。")],
        relatedIds: ["direction-yoko", "distance-chikaku", "distance-mukai"]
      }),
      item("direction-naka", "中", "なか", "里面、内部", "处于有边界的空间内部。", {
        particles: ["Nの中に", "Nの中で"],
        collocations: [phrase("箱の中", "はこのなか", "箱子里"), phrase("中に入る", "なかにはいる", "进入里面")],
        examples: [example("钱包在包里。", ["財布", "さいふ"], "はかばんの", ["中", "なか"], "にあります。")],
        relatedIds: ["direction-soto", "range-uchi", "movement-hairu"]
      }),
      item("direction-soto", "外", "そと", "外面、室外", "位于某个边界之外，常与「中」相对。", {
        particles: ["Nの外に", "Nの外で"],
        collocations: [phrase("店の外", "みせのそと", "店外"), phrase("外に出る", "そとにでる", "到外面去")],
        examples: [example("我们到外面说吧。", ["外", "そと"], "で", ["話", "はな"], "しましょう。")],
        relatedIds: ["direction-naka", "range-sotogawa", "movement-deru"]
      }),
      item("direction-shomen", "正面", "しょうめん", "正面、正前方", "位于入口、脸或建筑朝向的正前方。", {
        particles: ["Nの正面に", "正面から"],
        collocations: [phrase("駅の正面", "えきのしょうめん", "车站正面"), phrase("正面に見える", "しょうめんにみえる", "正前方能看到")],
        examples: [example("出口正面有一个公交站。", ["出口", "でぐち"], "の", ["正面", "しょうめん"], "にバス", ["停", "てい"], "があります。")],
        relatedIds: ["direction-mae", "distance-mukai"]
      }),
      item("direction-ura", "裏", "うら", "背面、反面、建筑物后面", "表示物体看不见的一面、表面的反面或建筑背面。", {
        distinction: "建筑物后面常说「建物の裏」；人的背后通常说「人の後ろ」。",
        particles: ["Nの裏に", "Nの裏で"],
        collocations: [phrase("建物の裏", "たてもののうら", "建筑后面"), phrase("紙の裏", "かみのうら", "纸的背面")],
        examples: [example("停车场在大楼后面。", ["駐車場", "ちゅうしゃじょう"], "はビルの", ["裏", "うら"], "にあります。")],
        relatedIds: ["direction-mae", "direction-ushiro"]
      }),
      item("direction-hantaigawa", "反対側", "はんたいがわ", "另一侧、对侧", "位于同一空间、道路或物体的相反一边。", {
        particles: ["Nの反対側に", "反対側へ"],
        collocations: [phrase("道の反対側", "みちのはんたいがわ", "马路对面一侧"), phrase("反対側へ渡る", "はんたいがわへわたる", "走到另一侧")],
        examples: [example("药店在马路另一侧。", ["薬局", "やっきょく"], "は", ["道", "みち"], "の", ["反対側", "はんたいがわ"], "です。")],
        relatedIds: ["distance-mukai", "movement-wataru"]
      }),
      item("direction-uchigawa", "内側", "うちがわ", "内侧", "相对于边界、门、圆圈等朝内部的一面。", {
        particles: ["Nの内側に", "内側へ"],
        collocations: [phrase("ドアの内側", "どあのうちがわ", "门内侧"), phrase("線の内側", "せんのうちがわ", "线内")],
        examples: [example("请站在线的内侧。", ["線", "せん"], "の", ["内側", "うちがわ"], "に", ["立", "た"], "ってください。")],
        relatedIds: ["direction-sotogawa", "range-uchi"]
      }),
      item("direction-sotogawa", "外側", "そとがわ", "外侧", "相对于边界、容器或建筑朝外的一面。", {
        particles: ["Nの外側に", "外側へ"],
        collocations: [phrase("窓の外側", "まどのそとがわ", "窗外侧"), phrase("外側を歩く", "そとがわをあるく", "沿外侧走")],
        examples: [example("自行车请停在围栏外侧。", ["自転車", "じてんしゃ"], "はフェンスの", ["外側", "そとがわ"], "に", ["止", "と"], "めてください。")],
        relatedIds: ["direction-uchigawa", "range-gaibu"]
      }),
      item("direction-chuo", "中央", "ちゅうおう", "中央、中心区域", "较正式、客观地指一个区域的中心。", {
        formalLevel: "中性、稍正式",
        particles: ["Nの中央に", "中央で"],
        collocations: [phrase("広場の中央", "ひろばのちゅうおう", "广场中央"), phrase("中央に集まる", "ちゅうおうにあつまる", "聚到中央")],
        examples: [example("广场中央有一座喷泉。", ["広場", "ひろば"], "の", ["中央", "ちゅうおう"], "に", ["噴水", "ふんすい"], "があります。")],
        relatedIds: ["direction-mannaka"]
      }),
      item("direction-mannaka", "真ん中", "まんなか", "正中间", "日常口语中指最中间的位置。", {
        formalLevel: "普通口语",
        particles: ["Nの真ん中に", "真ん中で"],
        collocations: [phrase("部屋の真ん中", "へやのまんなか", "房间正中"), phrase("真ん中に座る", "まんなかにすわる", "坐在中间")],
        examples: [example("请坐在中间。", ["真", "ま"], "ん", ["中", "なか"], "に", ["座", "すわ"], "ってください。")],
        relatedIds: ["direction-chuo", "distance-aida"]
      })
    ]
  };

  const range = {
    id: "range",
    title: "内外与范围",
    japaneseTitle: "内外・範囲",
    reading: "ないがい・はんい",
    meaning: "内部、外部、深处与入口",
    summary: "用边界、入口和观察者位置来区分「中／内」「外／外側」「奥／手前」。",
    items: [
      item("range-naka", "中", "なか", "里面", "强调容器、房间、建筑等有边界空间的内部。", {
        distinction: "「中」最具体、最口语；「内」还可表示范围、组织或期限以内。",
        particles: ["Nの中に", "Nの中で"],
        collocations: [phrase("店の中", "みせのなか", "店里"), phrase("箱の中を見る", "はこのなかをみる", "看箱子里面")],
        examples: [example("店里有很多人。", ["店", "みせ"], "の", ["中", "なか"], "に", ["人", "ひと"], "がたくさんいます。")],
        relatedIds: ["range-uchi", "range-naibu"]
      }),
      item("range-soto", "外", "そと", "外面、外部空间", "站在边界以外，常强调室外或外面的空间。", {
        distinction: "「外」可以独立表示户外；「外側」强调某物朝外的一侧。",
        particles: ["Nの外に", "Nの外で"],
        collocations: [phrase("建物の外", "たてもののそと", "建筑外"), phrase("外で待つ", "そとでまつ", "在外面等")],
        examples: [example("出租车在大楼外面等。", "タクシーは", ["建物", "たてもの"], "の", ["外", "そと"], "で", ["待", "ま"], "っています。")],
        relatedIds: ["range-sotogawa", "range-gaibu"]
      }),
      item("range-uchi", "内", "うち", "内部、范围以内", "表示某个范围、组织、时间或选择之内。", {
        distinction: "比「中」抽象；「三日以内」「会社内」等范围表达常用「内」。",
        particles: ["Nの内に", "N内で", "N以内"],
        collocations: [phrase("建物内", "たてものない", "建筑内"), phrase("一週間以内", "いっしゅうかんいない", "一周以内")],
        examples: [example("请在建筑内等候。", ["建物内", "たてものない"], "でお", ["待", "ま"], "ちください。")],
        relatedIds: ["range-naka", "range-naibu"]
      }),
      item("range-uchigawa", "内側", "うちがわ", "内侧", "有明确边界时，朝内部的一侧。", {
        particles: ["Nの内側に", "内側から"],
        collocations: [phrase("改札の内側", "かいさつのうちがわ", "检票口内侧"), phrase("内側から開ける", "うちがわからあける", "从里面打开")],
        examples: [example("洗手间在检票口内侧。", "トイレは", ["改札", "かいさつ"], "の", ["内側", "うちがわ"], "にあります。")],
        relatedIds: ["range-sotogawa", "road-kaisatsu"]
      }),
      item("range-sotogawa", "外側", "そとがわ", "外侧", "有明确边界时，朝外部的一侧。", {
        particles: ["Nの外側に", "外側から"],
        collocations: [phrase("駅の外側", "えきのそとがわ", "车站外侧"), phrase("外側に回る", "そとがわにまわる", "绕到外侧")],
        examples: [example("自动取款机在检票口外侧。", "ATMは", ["改札", "かいさつ"], "の", ["外側", "そとがわ"], "です。")],
        relatedIds: ["range-uchigawa", "range-soto"]
      }),
      item("range-oku", "奥", "おく", "深处、里面靠后的位置", "从入口或观察者看，空间更深、更靠里的地方。", {
        distinction: "以入口和观察方向为基准；与离观察者较近的「手前」相对。",
        particles: ["Nの奥に", "奥へ"],
        collocations: [phrase("部屋の奥", "へやのおく", "房间深处"), phrase("奥へ進む", "おくへすすむ", "往里面走")],
        examples: [example("房间深处有一张桌子。", ["部屋", "へや"], "の", ["奥", "おく"], "に", ["机", "つくえ"], "があります。")],
        relatedIds: ["range-temae", "movement-susumu"]
      }),
      item("range-temae", "手前", "てまえ", "靠近眼前的一侧、未到某处之前", "从观察者看较近，或在目标地点之前。", {
        distinction: "可表示空间近侧，也可表示“到入口之前”的位置。",
        particles: ["Nの手前に", "Nの手前で"],
        collocations: [phrase("入口の手前", "いりぐちのてまえ", "入口前面"), phrase("橋の手前", "はしのてまえ", "桥前")],
        examples: [example("请在入口前面等。", ["入口", "いりぐち"], "の", ["手前", "てまえ"], "で", ["待", "ま"], "ってください。")],
        relatedIds: ["range-oku", "range-iriguchi"]
      }),
      item("range-iriguchi", "入口", "いりぐち", "入口", "进入建筑、房间或区域的开口和地点。", {
        particles: ["入口に", "入口で", "入口から"],
        collocations: [phrase("入口を探す", "いりぐちをさがす", "找入口"), phrase("入口から入る", "いりぐちからはいる", "从入口进入")],
        examples: [example("入口在建筑右侧。", ["入口", "いりぐち"], "は", ["建物", "たてもの"], "の", ["右側", "みぎがわ"], "です。")],
        relatedIds: ["range-deguchi", "movement-hairu"]
      }),
      item("range-deguchi", "出口", "でぐち", "出口", "离开建筑、车站或区域的开口和地点。", {
        aliases: ["出口", "出站口"],
        particles: ["出口に", "出口で", "出口から"],
        collocations: [phrase("出口を探す", "でぐちをさがす", "找出口"), phrase("出口から出る", "でぐちからでる", "从出口出去")],
        examples: [example("三号出口请走这边。", ["三番出口", "さんばんでぐち"], "はこちらです。")],
        relatedIds: ["range-iriguchi", "movement-deru", "scene-station-exit"]
      }),
      item("range-hani", "範囲", "はんい", "范围", "有界限的区域、适用面或活动区域。", {
        formalLevel: "中性、说明用语",
        particles: ["範囲内で", "範囲外に"],
        collocations: [phrase("歩ける範囲", "あるけるはんい", "步行范围"), phrase("この範囲内", "このはんいない", "这个范围内")],
        examples: [example("这都在步行范围内。", "ここは", ["歩", "ある"], "ける", ["範囲", "はんい"], "です。")],
        relatedIds: ["range-mawari", "distance-chikaku"]
      }),
      item("range-mawari", "周り", "まわり", "周围", "围绕某个基准物的一圈或附近区域。", {
        particles: ["Nの周りに", "Nの周りを"],
        collocations: [phrase("駅の周り", "えきのまわり", "车站周围"), phrase("建物の周りを歩く", "たてもののまわりをあるく", "绕建筑走")],
        examples: [example("车站周围有很多餐厅。", ["駅", "えき"], "の", ["周", "まわ"], "りにレストランがたくさんあります。")],
        relatedIds: ["range-atari", "distance-chikaku"]
      }),
      item("range-atari", "辺り", "あたり", "这一带、附近一片", "以某处为中心的模糊区域，比明确边界更宽松。", {
        particles: ["Nの辺りに", "この辺りで"],
        collocations: [phrase("駅の辺り", "えきのあたり", "车站一带"), phrase("この辺りを探す", "このあたりをさがす", "找这一带")],
        examples: [example("这附近应该有一家咖啡店。", "この", ["辺", "あた"], "りにカフェがあるはずです。")],
        relatedIds: ["range-mawari", "range-kinpen", "distance-konohen"]
      }),
      item("range-kinpen", "近辺", "きんぺん", "附近一带、周边地区", "较书面或信息说明式地表示某地点周边。", {
        formalLevel: "中性、稍正式",
        particles: ["N近辺に", "N近辺で"],
        collocations: [phrase("駅近辺", "えききんぺん", "车站周边"), phrase("近辺を調べる", "きんぺんをしらべる", "调查周边")],
        examples: [example("车站周边禁止停车。", ["駅近辺", "えききんぺん"], "は", ["駐車禁止", "ちゅうしゃきんし"], "です。")],
        relatedIds: ["range-atari", "distance-chikaku"]
      }),
      item("range-naibu", "内部", "ないぶ", "内部", "客观、正式地指设施、设备或组织的里面。", {
        formalLevel: "正式、说明用语",
        particles: ["内部に", "内部で"],
        collocations: [phrase("建物内部", "たてものないぶ", "建筑内部"), phrase("内部を確認する", "ないぶをかくにんする", "确认内部")],
        examples: [example("建筑内部禁止吸烟。", ["建物内部", "たてものないぶ"], "は", ["禁煙", "きんえん"], "です。")],
        relatedIds: ["range-naka", "range-uchi", "range-gaibu"]
      }),
      item("range-gaibu", "外部", "がいぶ", "外部", "客观、正式地指设施、组织或系统之外。", {
        formalLevel: "正式、说明用语",
        particles: ["外部に", "外部から"],
        collocations: [phrase("建物外部", "たてものがいぶ", "建筑外部"), phrase("外部から入る", "がいぶからはいる", "从外部进入")],
        examples: [example("只能从外部进入这个房间。", "この", ["部屋", "へや"], "には", ["外部", "がいぶ"], "からしか", ["入", "はい"], "れません。")],
        relatedIds: ["range-soto", "range-naibu"]
      })
    ]
  };

  const distance = {
    id: "distance",
    title: "相邻与距离",
    japaneseTitle: "隣接・距離",
    reading: "りんせつ・きょり",
    meaning: "旁边、附近、对面与远近",
    summary: "重点分清直接相邻、横侧、模糊邻近、附近范围、正对面和两个事物之间。",
    items: [
      item("distance-tonari", "隣", "となり", "直接相邻、隔壁", "在同一排列或同类地点中紧挨着。", {
        distinction: "比「近く」更近；比「横」更强调相邻关系。",
        particles: ["Nの隣に", "Nの隣で"],
        collocations: [phrase("隣の店", "となりのみせ", "隔壁店"), phrase("隣に座る", "となりにすわる", "坐旁边")],
        examples: [example("药店就在医院旁边。", ["薬局", "やっきょく"], "は", ["病院", "びょういん"], "の", ["隣", "となり"], "です。")],
        relatedIds: ["distance-yoko", "distance-soba", "distance-chikaku"]
      }),
      item("distance-yoko", "横", "よこ", "横侧位置", "只说明位于左右一侧，不保证紧挨。", {
        distinction: "「横」是方向位置；「隣」是相邻关系。",
        particles: ["Nの横に", "Nの横で"],
        collocations: [phrase("自販機の横", "じはんきのよこ", "自动售货机旁"), phrase("横を通る", "よこをとおる", "从旁边经过")],
        examples: [example("请把行李放在座位旁。", ["荷物", "にもつ"], "は", ["席", "せき"], "の", ["横", "よこ"], "に", ["置", "お"], "いてください。")],
        relatedIds: ["distance-tonari", "distance-soba"]
      }),
      item("distance-soba", "そば", "そば", "身边、很靠近", "距离很近，但不像「隣」那样要求并列相邻。", {
        distinction: "范围较模糊，也可表示人的身边；语感通常比「近く」更贴近。",
        particles: ["Nのそばに", "Nのそばで"],
        collocations: [phrase("駅のそば", "えきのそば", "车站旁"), phrase("そばにいる", "そばにいる", "在身边")],
        examples: [example("请不要离开孩子身边。", ["子", "こ"], "どものそばを", ["離", "はな"], "れないでください。")],
        relatedIds: ["distance-chikaku", "distance-tonari"]
      }),
      item("distance-chikaku", "近く", "ちかく", "附近", "在某地点周边，不一定紧挨或能直接看到。", {
        aliases: ["附近", "周边"],
        distinction: "范围可大可小；比「そば」更宽，比「隣」更不要求贴近。",
        particles: ["Nの近くに", "Nの近くで"],
        collocations: [phrase("駅の近く", "えきのちかく", "车站附近"), phrase("近くに住む", "ちかくにすむ", "住在附近")],
        examples: [example("我住在车站附近。", ["駅", "えき"], "の", ["近", "ちか"], "くに", ["住", "す"], "んでいます。")],
        relatedIds: ["distance-soba", "distance-chikai", "distance-konohen"]
      }),
      item("distance-mukai", "向かい", "むかい", "正对面", "隔着道路、走廊等正面相对的位置。", {
        distinction: "强调面对面；「反対側」只表示另一侧，不一定正对。",
        particles: ["Nの向かいに", "Nの向かいで"],
        collocations: [phrase("学校の向かい", "がっこうのむかい", "学校对面"), phrase("向かい側", "むかいがわ", "对面一侧")],
        examples: [example("邮局在学校对面。", ["郵便局", "ゆうびんきょく"], "は", ["学校", "がっこう"], "の", ["向", "む"], "かいにあります。")],
        relatedIds: ["direction-hantaigawa", "direction-shomen"]
      }),
      item("distance-aida", "間", "あいだ", "两者之间", "位于两个事物、地点或人的中间。", {
        particles: ["AとBの間に", "AとBの間で"],
        collocations: [phrase("駅と学校の間", "えきとがっこうのあいだ", "车站和学校之间"), phrase("間を通る", "あいだをとおる", "从中间穿过")],
        examples: [example("在银行和便利店之间。", ["銀行", "ぎんこう"], "とコンビニの", ["間", "あいだ"], "です。")],
        relatedIds: ["direction-mannaka", "movement-tooru"]
      }),
      item("distance-mawari", "周り", "まわり", "周围", "围绕基准物的一圈或附近区域。", {
        particles: ["Nの周りに", "Nの周りを"],
        collocations: [phrase("公園の周り", "こうえんのまわり", "公园周围"), phrase("周りを見る", "まわりをみる", "看看周围")],
        examples: [example("我们绕湖走了一圈。", ["湖", "みずうみ"], "の", ["周", "まわ"], "りを", ["歩", "ある"], "きました。")],
        relatedIds: ["distance-atari", "range-mawari"]
      }),
      item("distance-atari", "辺り", "あたり", "这一带", "以某处为中心的模糊片区。", {
        particles: ["この辺りに", "Nの辺りで"],
        collocations: [phrase("この辺り", "このあたり", "这一带"), phrase("駅の辺り", "えきのあたり", "车站一带")],
        examples: [example("我把自行车停在这一带了。", "この", ["辺", "あた"], "りに", ["自転車", "じてんしゃ"], "を", ["止", "と"], "めました。")],
        relatedIds: ["distance-konohen", "range-atari"]
      }),
      item("distance-chikai", "近い", "ちかい", "近", "表示两个地点之间距离短。", {
        particles: ["Nに近い", "Nから近い"],
        collocations: [phrase("駅に近い", "えきにちかい", "离车站近"), phrase("ここから近い", "ここからちかい", "离这里近")],
        examples: [example("这家酒店离车站很近。", "このホテルは", ["駅", "えき"], "に", ["近", "ちか"], "いです。")],
        relatedIds: ["distance-tooi", "distance-chikaku"]
      }),
      item("distance-tooi", "遠い", "とおい", "远", "表示到目标地点的距离长。", {
        particles: ["Nから遠い", "Nまで遠い"],
        collocations: [phrase("駅から遠い", "えきからとおい", "离车站远"), phrase("歩くには遠い", "あるくにはとおい", "走路太远")],
        examples: [example("从这里走过去有点远。", "ここから", ["歩", "ある"], "くには", ["少", "すこ"], "し", ["遠", "とお"], "いです。")],
        relatedIds: ["distance-chikai", "scene-distance"]
      }),
      item("distance-sugu", "すぐ", "すぐ", "马上、就在近处", "用于距离时表示不用走很久，位置非常近。", {
        collocations: [phrase("すぐそこ", "すぐそこ", "就在附近"), phrase("すぐ右", "すぐみぎ", "马上右边")],
        examples: [example("便利店就在附近。", "コンビニはすぐそこです。")],
        relatedIds: ["distance-sukoshisaki", "distance-chikaku"]
      }),
      item("distance-sukoshisaki", "少し先", "すこしさき", "再往前一点", "沿当前方向继续一小段距离。", {
        particles: ["少し先に", "少し先で"],
        collocations: [phrase("少し先の角", "すこしさきのかど", "前面一点的路口"), phrase("少し先にある", "すこしさきにある", "在前面一点")],
        examples: [example("公交站在再往前一点的地方。", "バス", ["停", "てい"], "は", ["少", "すこ"], "し", ["先", "さき"], "にあります。")],
        relatedIds: ["distance-sugu", "movement-susumu"]
      }),
      item("distance-konohen", "この辺", "このへん", "这附近", "说话人所在位置周边的口语说法。", {
        aliases: ["这边附近", "这一带"],
        particles: ["この辺に", "この辺で"],
        collocations: [phrase("この辺にある", "このへんにある", "在这附近"), phrase("この辺で降りる", "このへんでおりる", "在这附近下车")],
        examples: [example("这附近有便利店吗？", "この", ["辺", "へん"], "にコンビニはありますか。")],
        relatedIds: ["distance-sonohen", "distance-anohen", "scene-ask-place"]
      }),
      item("distance-sonohen", "その辺", "そのへん", "那附近", "听话人身边或刚刚提到的区域附近。", {
        particles: ["その辺に", "その辺で"],
        collocations: [phrase("その辺を探す", "そのへんをさがす", "找那一带"), phrase("その辺で待つ", "そのへんでまつ", "在那附近等")],
        examples: [example("请在那附近等一下。", "その", ["辺", "へん"], "で", ["少", "すこ"], "し", ["待", "ま"], "ってください。")],
        relatedIds: ["distance-konohen", "distance-anohen"]
      }),
      item("distance-anohen", "あの辺", "あのへん", "那一带（较远）", "双方都能确认的远处区域。", {
        particles: ["あの辺に", "あの辺で"],
        collocations: [phrase("あの辺に見える", "あのへんにみえる", "在那一带能看到"), phrase("あの辺まで行く", "あのへんまでいく", "去那一带")],
        examples: [example("车站大概在那一带。", ["駅", "えき"], "はたぶんあの", ["辺", "へん"], "です。")],
        relatedIds: ["distance-konohen", "distance-sonohen", "place-asoko"]
      })
    ]
  };

  const roads = {
    id: "roads",
    title: "道路与建筑位置",
    japaneseTitle: "道路・建物",
    reading: "どうろ・たてもの",
    meaning: "路口、楼层、站台与出口",
    summary: "把道路标志、建筑设施和顺序词连成可直接用于说明路线的表达。",
    items: [
      item("road-michi", "道", "みち", "路、道路", "日常最常用，可指具体道路或路线。", {
        particles: ["道を", "道に", "道で"],
        collocations: [phrase("この道を進む", "このみちをすすむ", "沿这条路走"), phrase("道を聞く", "みちをきく", "问路")],
        examples: [example("请沿这条路一直走。", "この", ["道", "みち"], "をまっすぐ", ["進", "すす"], "んでください。")],
        relatedIds: ["road-douro", "road-toori", "movement-susumu"]
      }),
      item("road-douro", "道路", "どうろ", "道路", "较正式、客观地指供车辆和行人通行的道路。", {
        formalLevel: "正式、说明用语",
        particles: ["道路を", "道路沿い"],
        collocations: [phrase("道路を渡る", "どうろをわたる", "过马路"), phrase("主要道路", "しゅようどうろ", "主干道")],
        examples: [example("请不要在这里横穿道路。", "ここで", ["道路", "どうろ"], "を", ["渡", "わた"], "らないでください。")],
        relatedIds: ["road-michi", "road-oudanhodou"]
      }),
      item("road-toori", "通り", "とおり", "街道、沿街道路", "常用于有名称或店铺排列的街道。", {
        particles: ["通りを", "通りに", "通り沿い"],
        collocations: [phrase("大通り", "おおどおり", "大街"), phrase("通り沿い", "とおりぞい", "沿街")],
        examples: [example("餐厅在这条街上。", "レストランはこの", ["通", "とお"], "りにあります。")],
        relatedIds: ["road-michi", "movement-tooru"]
      }),
      item("road-kousaten", "交差点", "こうさてん", "十字路口、交叉路口", "两条或多条道路交汇的地点。", {
        particles: ["交差点で", "交差点を"],
        collocations: [phrase("交差点を右に曲がる", "こうさてんをみぎにまがる", "在路口右转"), phrase("次の交差点", "つぎのこうさてん", "下一个路口")],
        examples: [example("请在下一个路口右转。", ["次", "つぎ"], "の", ["交差点", "こうさてん"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。")],
        relatedIds: ["road-kado", "road-shingou", "movement-magaru"]
      }),
      item("road-kado", "角", "かど", "拐角、街角", "道路或建筑物转角处。", {
        particles: ["角で", "角を"],
        collocations: [phrase("一つ目の角", "ひとつめのかど", "第一个路口"), phrase("角を曲がる", "かどをまがる", "拐弯")],
        examples: [example("咖啡店就在那个拐角。", "カフェはあの", ["角", "かど"], "にあります。")],
        relatedIds: ["road-hitotsume", "road-kousaten", "movement-magaru"]
      }),
      item("road-shingou", "信号", "しんごう", "红绿灯", "道路上控制通行的交通信号灯。", {
        particles: ["信号で", "信号を"],
        collocations: [phrase("二つ目の信号", "ふたつめのしんごう", "第二个红绿灯"), phrase("信号を渡る", "しんごうをわたる", "从红绿灯处过马路")],
        examples: [example("请在第二个红绿灯左转。", ["二", "ふた"], "つ", ["目", "め"], "の", ["信号", "しんごう"], "を", ["左", "ひだり"], "に", ["曲", "ま"], "がってください。")],
        relatedIds: ["road-futatsume", "road-oudanhodou", "movement-magaru"]
      }),
      item("road-oudanhodou", "横断歩道", "おうだんほどう", "人行横道", "行人横穿道路的专用区域。", {
        particles: ["横断歩道を"],
        collocations: [phrase("横断歩道を渡る", "おうだんほどうをわたる", "走人行横道"), phrase("横断歩道の前", "おうだんほどうのまえ", "人行横道前")],
        examples: [example("请走人行横道过马路。", ["横断歩道", "おうだんほどう"], "を", ["渡", "わた"], "ってください。")],
        relatedIds: ["road-douro", "movement-wataru"]
      }),
      item("road-hashi", "橋", "はし", "桥", "跨越河流、道路等连接两侧的设施。", {
        particles: ["橋を", "橋の上で"],
        collocations: [phrase("橋を渡る", "はしをわたる", "过桥"), phrase("橋の手前", "はしのてまえ", "桥前")],
        examples: [example("过桥后就是车站。", ["橋", "はし"], "を", ["渡", "わた"], "ると、すぐ", ["駅", "えき"], "です。")],
        relatedIds: ["movement-wataru", "range-temae"]
      }),
      item("road-kaidan", "階段", "かいだん", "楼梯", "连接不同楼层、供人上下的台阶。", {
        particles: ["階段を", "階段で"],
        collocations: [phrase("階段を上がる", "かいだんをあがる", "上楼梯"), phrase("階段を下りる", "かいだんをおりる", "下楼梯")],
        examples: [example("请从这段楼梯上到二楼。", "この", ["階段", "かいだん"], "を", ["上", "あ"], "がって", ["二階", "にかい"], "へ", ["行", "い"], "ってください。")],
        relatedIds: ["movement-agaru", "movement-oriru", "road-kai"]
      }),
      item("road-escalator", "エスカレーター", "エスカレーター", "自动扶梯", "连续移动、连接楼层的设备。", {
        particles: ["エスカレーターで", "エスカレーターを"],
        collocations: [phrase("エスカレーターで上がる", "えすかれーたーであがる", "乘扶梯上楼"), phrase("下りのエスカレーター", "くだりのえすかれーたー", "下行扶梯")],
        examples: [example("自动扶梯在右边。", "エスカレーターは", ["右側", "みぎがわ"], "にあります。")],
        relatedIds: ["road-elevator", "road-kaidan"]
      }),
      item("road-elevator", "エレベーター", "エレベーター", "电梯", "垂直移动于不同楼层的封闭设备。", {
        particles: ["エレベーターで", "エレベーターに"],
        collocations: [phrase("エレベーターで行く", "えれべーたーでいく", "乘电梯去"), phrase("エレベーターに乗る", "えれべーたーにのる", "乘电梯")],
        examples: [example("请乘电梯到五楼。", "エレベーターで", ["五階", "ごかい"], "まで", ["行", "い"], "ってください。")],
        relatedIds: ["road-escalator", "road-kai"]
      }),
      item("road-kaisatsu", "改札", "かいさつ", "检票口", "车站内进出付费区域的闸机或检票处。", {
        aliases: ["闸机", "检票口"],
        particles: ["改札を", "改札で", "改札の"],
        collocations: [phrase("改札を出る", "かいさつをでる", "出检票口"), phrase("改札の内側", "かいさつのうちがわ", "检票口内侧")],
        examples: [example("出检票口后请向左走。", ["改札", "かいさつ"], "を", ["出", "で"], "て、", ["左", "ひだり"], "に", ["進", "すす"], "んでください。")],
        relatedIds: ["movement-deru", "road-home", "scene-station-exit"]
      }),
      item("road-home", "ホーム", "ホーム", "站台", "火车、电车上下车的月台。", {
        aliases: ["月台", "站台"],
        particles: ["ホームで", "ホームに", "ホームから"],
        collocations: [phrase("三番ホーム", "さんばんほーむ", "三号站台"), phrase("ホームで待つ", "ほーむでまつ", "在站台等")],
        examples: [example("去新宿的电车从四号站台发车。", ["新宿", "しんじゅく"], "行きの", ["電車", "でんしゃ"], "は", ["四番", "よんばん"], "ホームから", ["出", "で"], "ます。")],
        relatedIds: ["road-kaisatsu", "scene-transfer"]
      }),
      item("road-deguchi", "出口", "でぐち", "出口、出站口", "离开车站、地下街或建筑的出口。", {
        aliases: ["几号出口", "出站口"],
        particles: ["出口から", "出口で"],
        collocations: [phrase("何番出口", "なんばんでぐち", "几号出口"), phrase("東口", "ひがしぐち", "东口")],
        examples: [example("离美术馆最近的是哪个出口？", ["美術館", "びじゅつかん"], "に", ["近", "ちか"], "いのは", ["何番出口", "なんばんでぐち"], "ですか。")],
        relatedIds: ["range-deguchi", "scene-station-exit"]
      }),
      item("road-tsukiatari", "突き当たり", "つきあたり", "路的尽头、正前方无路处", "沿道路或走廊走到不能再直行的位置。", {
        particles: ["突き当たりに", "突き当たりで"],
        collocations: [phrase("道の突き当たり", "みちのつきあたり", "路的尽头"), phrase("突き当たりを右へ", "つきあたりをみぎへ", "尽头向右")],
        examples: [example("路的尽头有一家银行。", ["道", "みち"], "の", ["突", "つ"], "き", ["当", "あ"], "たりに", ["銀行", "ぎんこう"], "があります。")],
        relatedIds: ["road-michi", "movement-magaru"]
      }),
      item("road-hitotsume", "一つ目", "ひとつめ", "第一个", "从当前起点开始数的第一个路口、信号或入口。", {
        collocations: [phrase("一つ目の角", "ひとつめのかど", "第一个路口"), phrase("一つ目の信号", "ひとつめのしんごう", "第一个红绿灯")],
        examples: [example("请在第一个路口右转。", ["一", "ひと"], "つ", ["目", "め"], "の", ["角", "かど"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。")],
        relatedIds: ["road-futatsume", "road-kado"]
      }),
      item("road-futatsume", "二つ目", "ふたつめ", "第二个", "从当前起点开始数的第二个路口、信号或入口。", {
        collocations: [phrase("二つ目の角", "ふたつめのかど", "第二个路口"), phrase("二つ目の信号", "ふたつめのしんごう", "第二个红绿灯")],
        examples: [example("在第二个十字路口就是。", ["二", "ふた"], "つ", ["目", "め"], "の", ["交差点", "こうさてん"], "です。")],
        relatedIds: ["road-hitotsume", "road-kousaten"]
      }),
      item("road-migite", "右手", "みぎて", "右手边", "沿当前前进方向看到的右侧，问路回答中高频。", {
        particles: ["右手に", "右手に見える"],
        collocations: [phrase("右手にある", "みぎてにある", "在右手边"), phrase("右手に見える", "みぎてにみえる", "右手边能看到")],
        examples: [example("走一会儿，右手边就能看到医院。", ["少", "すこ"], "し", ["歩", "ある"], "くと、", ["右手", "みぎて"], "に", ["病院", "びょういん"], "が", ["見", "み"], "えます。")],
        relatedIds: ["road-hidarite", "direction-migi"]
      }),
      item("road-hidarite", "左手", "ひだりて", "左手边", "沿当前前进方向看到的左侧。", {
        particles: ["左手に", "左手に見える"],
        collocations: [phrase("左手にある", "ひだりてにある", "在左手边"), phrase("左手に見える", "ひだりてにみえる", "左手边能看到")],
        examples: [example("邮局在左手边。", ["郵便局", "ゆうびんきょく"], "は", ["左手", "ひだりて"], "にあります。")],
        relatedIds: ["road-migite", "direction-hidari"]
      }),
      item("road-chika", "地下", "ちか", "地下", "低于地面的楼层或空间。", {
        particles: ["地下に", "地下で", "地下へ"],
        collocations: [phrase("地下に下りる", "ちかにおりる", "下到地下"), phrase("地下通路", "ちかつうろ", "地下通道")],
        examples: [example("超市在地下一层。", "スーパーは", ["地下一階", "ちかいっかい"], "です。")],
        relatedIds: ["road-chijou", "movement-oriru"]
      }),
      item("road-chijou", "地上", "ちじょう", "地面上、地上", "相对于地下而言的地面和地上空间。", {
        particles: ["地上に", "地上へ"],
        collocations: [phrase("地上に出る", "ちじょうにでる", "走到地面"), phrase("地上出口", "ちじょうでぐち", "地面出口")],
        examples: [example("从这个出口可以到地面。", "この", ["出口", "でぐち"], "から", ["地上", "ちじょう"], "に", ["出", "で"], "られます。")],
        relatedIds: ["road-chika", "movement-deru"]
      }),
      item("road-kai", "階", "かい", "楼层", "表示建筑物的层数和所在楼层。", {
        aliases: ["几楼", "楼层"],
        particles: ["N階に", "N階で", "N階まで"],
        collocations: [phrase("二階に上がる", "にかいにあがる", "上二楼"), phrase("何階ですか", "なんかいですか", "在几楼")],
        examples: [example("接待处在三楼。", ["受付", "うけつけ"], "は", ["三階", "さんがい"], "にあります。")],
        relatedIds: ["road-kaidan", "road-elevator"]
      }),
      item("road-massugu", "まっすぐ", "まっすぐ", "一直、直走", "不转弯，沿当前方向继续前进。", {
        collocations: [phrase("まっすぐ行く", "まっすぐいく", "一直走"), phrase("まっすぐ進む", "まっすぐすすむ", "径直前进")],
        examples: [example("请一直走到红绿灯。", ["信号", "しんごう"], "までまっすぐ", ["行", "い"], "ってください。")],
        relatedIds: ["movement-susumu", "scene-confirm-direction"]
      }),
      item("road-migi-gawa", "右側", "みぎがわ", "右侧", "客观描述道路、设施或队列的右边一侧。", {
        particles: ["右側に", "右側を"],
        collocations: [phrase("右側に見える", "みぎがわにみえる", "右侧能看到"), phrase("右側を歩く", "みぎがわをあるく", "走右侧")],
        examples: [example("请走通道右侧。", ["通路", "つうろ"], "の", ["右側", "みぎがわ"], "を", ["歩", "ある"], "いてください。")],
        relatedIds: ["road-hidari-gawa", "road-migite"]
      }),
      item("road-hidari-gawa", "左側", "ひだりがわ", "左侧", "客观描述道路、设施或队列的左边一侧。", {
        particles: ["左側に", "左側を"],
        collocations: [phrase("左側にある", "ひだりがわにある", "在左侧"), phrase("左側を通る", "ひだりがわをとおる", "从左侧通过")],
        examples: [example("售票机在入口左侧。", ["券売機", "けんばいき"], "は", ["入口", "いりぐち"], "の", ["左側", "ひだりがわ"], "です。")],
        relatedIds: ["road-migi-gawa", "road-hidarite"]
      })
    ]
  };

  const movement = {
    id: "movement",
    title: "基本移动动作",
    japaneseTitle: "基本移動",
    reading: "きほんいどう",
    meaning: "前往、进入、穿过与上下",
    summary: "用动作画面和助词搭配理解移动动词，而不是只背中文翻译。",
    items: [
      item("movement-iku", "行く", "いく", "去", "从说话人当前视点离开，移动到另一个地点。", {
        motion: "起点 → 离开当前视点 → 目的地",
        particles: ["地点に行く", "地点へ行く", "交通工具で行く"],
        collocations: [phrase("学校に行く", "がっこうにいく", "去学校"), phrase("電車で行く", "でんしゃでいく", "坐电车去")],
        examples: [example("明天我坐电车去京都。", ["明日", "あした"], "、", ["電車", "でんしゃ"], "で", ["京都", "きょうと"], "に", ["行", "い"], "きます。")],
        relatedIds: ["movement-kuru", "movement-mukau", "particle-ni-destination"]
      }),
      item("movement-kuru", "来る", "くる", "来", "朝说话人或当前叙述视点所在处移动。", {
        motion: "别处 → 接近说话人／叙述视点",
        particles: ["地点に来る", "地点へ来る", "地点から来る"],
        collocations: [phrase("日本に来る", "にほんにくる", "来日本"), phrase("駅から来る", "えきからくる", "从车站来")],
        examples: [example("朋友下午会来我家。", ["友達", "ともだち"], "が", ["午後", "ごご"], "うちに", ["来", "き"], "ます。")],
        relatedIds: ["movement-iku", "particle-kara-origin"]
      }),
      item("movement-kaeru", "帰る", "かえる", "回家、回到所属地点", "回到家、公司、国家等自己原本所属或应返回的地点。", {
        motion: "当前位置 → 自己所属的地点",
        distinction: "「戻る」只是回到之前的位置或状态，不一定是家。",
        particles: ["家に帰る", "国へ帰る"],
        collocations: [phrase("家に帰る", "いえにかえる", "回家"), phrase("会社へ帰る", "かいしゃへかえる", "回公司")],
        examples: [example("今天我直接回家。", ["今日", "きょう"], "はまっすぐ", ["家", "いえ"], "に", ["帰", "かえ"], "ります。")],
        relatedIds: ["movement-modoru", "movement-iku"]
      }),
      item("movement-susumu", "進む", "すすむ", "前进", "沿当前方向、道路或路线继续向前移动。", {
        motion: "当前地点 → 沿方向继续向前",
        particles: ["方向に進む", "道を進む"],
        collocations: [phrase("まっすぐ進む", "まっすぐすすむ", "一直往前"), phrase("右に進む", "みぎにすすむ", "向右前进")],
        examples: [example("请沿着这条路走大约五分钟。", "この", ["道", "みち"], "を", ["五分", "ごふん"], "ほど", ["進", "すす"], "んでください。")],
        relatedIds: ["movement-aruku", "movement-mukau", "road-massugu"]
      }),
      item("movement-magaru", "曲がる", "まがる", "转弯", "在路口或拐角改变前进方向。", {
        aliases: ["转弯", "右转", "左转"],
        motion: "直行 → 在节点改变方向",
        particles: ["角を曲がる", "右に曲がる"],
        collocations: [phrase("右に曲がる", "みぎにまがる", "向右转"), phrase("角を左へ曲がる", "かどをひだりへまがる", "在拐角向左转")],
        examples: [example("请在第二个红绿灯右转。", ["二", "ふた"], "つ", ["目", "め"], "の", ["信号", "しんごう"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。")],
        relatedIds: ["road-kado", "road-shingou", "scene-confirm-direction"]
      }),
      item("movement-wataru", "渡る", "わたる", "横渡、跨过", "从道路、桥、河流等的一边移动到另一边。", {
        aliases: ["过桥", "过马路"],
        motion: "一侧 → 横跨边界／通道 → 另一侧",
        distinction: "「渡る」跨到另一边；「通る」沿路线经过或从某处穿过。",
        particles: ["橋を渡る", "道を渡る"],
        collocations: [phrase("横断歩道を渡る", "おうだんほどうをわたる", "走人行横道"), phrase("橋を渡る", "はしをわたる", "过桥")],
        examples: [example("过人行横道后向左走。", ["横断歩道", "おうだんほどう"], "を", ["渡", "わた"], "ってから、", ["左", "ひだり"], "へ", ["行", "い"], "ってください。")],
        relatedIds: ["movement-tooru", "road-hashi", "particle-wo-route"]
      }),
      item("movement-tooru", "通る", "とおる", "经过、穿过", "经过某条道路、通道、地点，或从一个空间中穿过。", {
        motion: "进入路线／地点 → 从中经过 → 继续离开",
        distinction: "不强调到达另一岸；重点是路线或经过点。",
        particles: ["道を通る", "公園を通る"],
        collocations: [phrase("地下道を通る", "ちかどうをとおる", "走地下通道"), phrase("公園を通る", "こうえんをとおる", "经过公园")],
        examples: [example("去车站时会经过这个公园。", ["駅", "えき"], "へ", ["行", "い"], "くとき、この", ["公園", "こうえん"], "を", ["通", "とお"], "ります。")],
        relatedIds: ["movement-wataru", "particle-wo-route"]
      }),
      item("movement-hairu", "入る", "はいる", "进入", "从外部越过边界进入房间、店铺或区域。", {
        motion: "外部 → 越过入口／边界 → 内部",
        particles: ["地点に入る", "入口から入る"],
        collocations: [phrase("部屋に入る", "へやにはいる", "进入房间"), phrase("店に入る", "みせにはいる", "进店")],
        examples: [example("请从正门进入建筑。", ["正面入口", "しょうめんいりぐち"], "から", ["建物", "たてもの"], "に", ["入", "はい"], "ってください。")],
        relatedIds: ["movement-deru", "range-iriguchi", "particle-ni-destination"]
      }),
      item("movement-deru", "出る", "でる", "出去、离开", "从内部越过边界到外面，也可离开车站、家等地点。", {
        motion: "内部 → 越过出口／边界 → 外部",
        particles: ["地点を出る", "出口から出る"],
        collocations: [phrase("家を出る", "いえをでる", "离开家"), phrase("駅を出る", "えきをでる", "出车站")],
        examples: [example("出车站后右边就是公交站。", ["駅", "えき"], "を", ["出", "で"], "ると、", ["右", "みぎ"], "にバス", ["停", "てい"], "があります。")],
        relatedIds: ["movement-hairu", "range-deguchi", "particle-wo-route"]
      }),
      item("movement-agaru", "上がる", "あがる", "上去、上升到较高处", "从低处移动到较高的楼层、台阶或位置，重视高度变化。", {
        motion: "低处 → 高处",
        distinction: "楼梯、楼层常用「上がる」；山、塔等需要攀登时更常用「登る」。",
        particles: ["階段を上がる", "二階に上がる"],
        collocations: [phrase("階段を上がる", "かいだんをあがる", "上楼梯"), phrase("二階に上がる", "にかいにあがる", "上二楼")],
        examples: [example("请上楼梯到二楼。", ["階段", "かいだん"], "を", ["上", "あ"], "がって", ["二階", "にかい"], "へ", ["行", "い"], "ってください。")],
        relatedIds: ["movement-noboru", "movement-oriru", "road-kaidan"]
      }),
      item("movement-oriru", "下りる", "おりる", "下去、下楼", "从高处移动到较低的楼层、楼梯或位置。", {
        motion: "高处 → 低处",
        distinction: "楼梯、坡道、楼层常用「下りる」；交通工具下车通常写作「降りる」。",
        particles: ["階段を下りる", "地下に下りる"],
        collocations: [phrase("階段を下りる", "かいだんをおりる", "下楼梯"), phrase("地下に下りる", "ちかにおりる", "下到地下")],
        examples: [example("请下楼梯到地下一层。", ["階段", "かいだん"], "を", ["下", "お"], "りて", ["地下一階", "ちかいっかい"], "へ", ["行", "い"], "ってください。")],
        relatedIds: ["movement-kudaru", "movement-oriru-vehicle", "road-kaidan"]
      }),
      item("movement-noboru", "登る", "のぼる", "攀登、登上", "通过持续攀爬登上山、塔、长坡等较高目标。", {
        motion: "低处 → 持续攀登 → 高处目标",
        distinction: "强调攀登过程；普通上楼通常用「上がる」。",
        particles: ["山に登る", "坂を登る"],
        collocations: [phrase("山に登る", "やまにのぼる", "登山"), phrase("坂を登る", "さかをのぼる", "上坡")],
        examples: [example("从这里登上塔顶大约需要十分钟。", "ここから", ["塔", "とう"], "に", ["登", "のぼ"], "るまで", ["十分", "じゅっぷん"], "ほどです。")],
        relatedIds: ["movement-agaru", "movement-kudaru"]
      }),
      item("movement-kudaru", "下る", "くだる", "沿坡或路线向下", "沿山坡、河流、道路等整体向低处移动。", {
        motion: "高处 → 沿坡度／流向持续向下",
        distinction: "强调路线的下行；从楼梯下来更常说「下りる」。",
        particles: ["坂を下る", "川を下る"],
        collocations: [phrase("坂を下る", "さかをくだる", "下坡"), phrase("山道を下る", "やまみちをくだる", "沿山路下行")],
        examples: [example("沿坡道下去就能看到车站。", ["坂", "さか"], "を", ["下", "くだ"], "ると", ["駅", "えき"], "が", ["見", "み"], "えます。")],
        relatedIds: ["movement-oriru", "movement-noboru"]
      }),
      item("movement-oriru-vehicle", "降りる", "おりる", "下车、从交通工具下来", "离开电车、公交车、电梯等乘坐中的交通工具。", {
        motion: "交通工具内部 → 站点／外部",
        distinction: "交通工具下车通常写「降りる」；楼梯下行写「下りる」。",
        particles: ["駅で降りる", "電車を降りる"],
        collocations: [phrase("次の駅で降りる", "つぎのえきでおりる", "下一站下车"), phrase("バスを降りる", "ばすをおりる", "下公交车")],
        examples: [example("我在下一站下车。", ["次", "つぎ"], "の", ["駅", "えき"], "で", ["降", "お"], "ります。")],
        relatedIds: ["movement-oriru", "scene-transfer"]
      }),
      item("movement-modoru", "戻る", "もどる", "返回原处、回到先前状态", "回到之前的位置、路线或状态，不限定为家。", {
        motion: "当前位置 → 之前的位置／状态",
        distinction: "回家或回所属地用「帰る」；走错路返回用「戻る」。",
        particles: ["元の場所に戻る", "道を戻る"],
        collocations: [phrase("駅に戻る", "えきにもどる", "回车站"), phrase("来た道を戻る", "きたみちをもどる", "原路返回")],
        examples: [example("走错了，我们回到刚才的路口吧。", ["道", "みち"], "を", ["間違", "まちが"], "えたので、さっきの", ["角", "かど"], "に", ["戻", "もど"], "りましょう。")],
        relatedIds: ["movement-kaeru", "movement-tomaru"]
      }),
      item("movement-tomaru", "止まる", "とまる", "停下、停止移动", "人、车辆或设备从移动状态变为静止。", {
        motion: "移动中 → 停止",
        particles: ["場所で止まる", "信号で止まる"],
        collocations: [phrase("信号で止まる", "しんごうでとまる", "在红绿灯停下"), phrase("ここで止まる", "ここでとまる", "停在这里")],
        examples: [example("这班公交车在车站前停。", "このバスは", ["駅前", "えきまえ"], "で", ["止", "と"], "まります。")],
        relatedIds: ["movement-susumu", "road-shingou"]
      }),
      item("movement-aruku", "歩く", "あるく", "走路、步行", "用脚移动，常与距离、时间和路线搭配。", {
        motion: "步行沿路线移动",
        particles: ["道を歩く", "地点まで歩く"],
        collocations: [phrase("駅まで歩く", "えきまであるく", "走到车站"), phrase("歩いて行く", "あるいていく", "走着去")],
        examples: [example("从这里走到车站大约十分钟。", "ここから", ["駅", "えき"], "まで", ["歩", "ある"], "いて", ["十分", "じゅっぷん"], "くらいです。")],
        relatedIds: ["movement-hashiru", "particle-made-end", "scene-distance"]
      }),
      item("movement-hashiru", "走る", "はしる", "跑、行驶", "人快速跑动，也可表示车辆沿道路行驶。", {
        motion: "快速沿路线移动",
        particles: ["道を走る", "駅まで走る"],
        collocations: [phrase("駅まで走る", "えきまではしる", "跑到车站"), phrase("道路を走る", "どうろをはしる", "在道路上行驶")],
        examples: [example("如果跑的话，能赶上那班电车。", ["走", "はし"], "れば、その", ["電車", "でんしゃ"], "に", ["間", "ま"], "に", ["合", "あ"], "います。")],
        relatedIds: ["movement-aruku", "movement-susumu"]
      }),
      item("movement-mukau", "向かう", "むかう", "前往、朝向", "带着明确方向或目标朝某地移动，强调正在前往。", {
        motion: "当前位置 → 朝目标方向持续移动",
        distinction: "「行く」只表达去；「向かう」更突出方向和过程。",
        particles: ["地点へ向かう", "方向に向かう"],
        collocations: [phrase("駅へ向かう", "えきへむかう", "前往车站"), phrase("出口に向かう", "でぐちにむかう", "朝出口走")],
        examples: [example("我现在正前往机场。", ["今", "いま"], "、", ["空港", "くうこう"], "へ", ["向", "む"], "かっています。")],
        relatedIds: ["movement-iku", "particle-e-direction"]
      }),
      item("movement-chikazuku", "近づく", "ちかづく", "接近、靠近", "与某个地点或对象之间的距离逐渐缩短。", {
        motion: "较远 → 距离缩短 → 靠近目标",
        particles: ["地点に近づく", "人に近づく"],
        collocations: [phrase("駅に近づく", "えきにちかづく", "接近车站"), phrase("入口に近づく", "いりぐちにちかづく", "靠近入口")],
        examples: [example("靠近车站后，人变多了。", ["駅", "えき"], "に", ["近", "ちか"], "づくと、", ["人", "ひと"], "が", ["増", "ふ"], "えました。")],
        relatedIds: ["movement-hanareru", "distance-chikai"]
      }),
      item("movement-hanareru", "離れる", "はなれる", "离开、远离", "与地点或对象之间的距离逐渐变大。", {
        motion: "靠近目标 → 距离扩大 → 远离",
        particles: ["地点から離れる", "人と離れる"],
        collocations: [phrase("駅から離れる", "えきからはなれる", "远离车站"), phrase("列を離れる", "れつをはなれる", "离开队伍")],
        examples: [example("请不要离开队伍。", ["列", "れつ"], "から", ["離", "はな"], "れないでください。")],
        relatedIds: ["movement-chikazuku", "distance-tooi"]
      }),
      item("movement-idou", "移動する", "いどうする", "移动、转移", "中性地表示从一个位置转移到另一个位置。", {
        formalLevel: "中性、说明用语",
        motion: "位置A → 位置B",
        particles: ["地点に移動する", "場所から移動する"],
        collocations: [phrase("別の場所に移動する", "べつのばしょにいどうする", "移到别处"), phrase("徒歩で移動する", "とほでいどうする", "步行移动")],
        examples: [example("会议在三楼，请乘电梯过去。", ["会議", "かいぎ"], "は", ["三階", "さんがい"], "なので、エレベーターで", ["移動", "いどう"], "してください。")],
        relatedIds: ["movement-iku", "movement-susumu"]
      })
    ]
  };

  const particles = {
    id: "particles",
    title: "出发、经过与到达",
    japaneseTitle: "出発・経路・到着",
    reading: "しゅっぱつ・けいろ・とうちゃく",
    meaning: "に、へ、を、から、まで、で",
    summary: "把助词放回完整移动路径：起点、经过、方向、到达点、终点和交通手段。",
    items: [
      item("particle-ni-destination", "地点に行く", "ちてんにいく", "到某地去：に强调到达点", "「に」把目的地当作动作最终到达的点。", {
        type: "particle",
        aliases: ["どこに", "到达点", "目的地"],
        particles: ["地点に行く", "地点に入る", "地点に着く"],
        collocations: [phrase("学校に行く", "がっこうにいく", "去学校"), phrase("部屋に入る", "へやにはいる", "进入房间")],
        examples: [example("下午三点去车站。", ["午後三時", "ごごさんじ"], "に", ["駅", "えき"], "に", ["行", "い"], "きます。")],
        relatedIds: ["particle-e-direction", "particle-ni-presence", "movement-iku"],
        crossLinks: [{ label: "疑问表达百科：どこに", route: { theme: "question-expressions", section: "questions-words", entry: "word-doko-ni" } }]
      }),
      item("particle-e-direction", "地点へ向かう", "ちてんへむかう", "朝某地前进：へ强调方向", "「へ」把地点看作前进方向，箭头感比到达点更明显。", {
        type: "particle",
        aliases: ["どこへ", "方向助词"],
        particles: ["地点へ行く", "地点へ向かう"],
        collocations: [phrase("駅へ向かう", "えきへむかう", "前往车站"), phrase("出口へ進む", "でぐちへすすむ", "朝出口走")],
        examples: [example("请往东口方向走。", ["東口", "ひがしぐち"], "へ", ["進", "すす"], "んでください。")],
        relatedIds: ["particle-ni-destination", "movement-mukau"],
        crossLinks: [{ label: "疑问表达百科：どこへ", route: { theme: "question-expressions", section: "questions-words", entry: "word-doko-e" } }]
      }),
      item("particle-ni-presence", "駅にいる", "えきにいる", "存在地点：在车站", "表示人或物存在的位置，常与「いる／ある」搭配。", {
        type: "particle",
        aliases: ["どこに", "存在地点"],
        particles: ["地点にいる", "地点にある"],
        collocations: [phrase("駅にいる", "えきにいる", "人在车站"), phrase("机の上にある", "つくえのうえにある", "在桌上")],
        examples: [example("朋友现在在检票口前。", ["友達", "ともだち"], "は", ["今", "いま"], "、", ["改札前", "かいさつまえ"], "にいます。")],
        relatedIds: ["particle-de-action", "particle-ni-destination"],
        crossLinks: [{ label: "疑问表达百科：どこに", route: { theme: "question-expressions", section: "questions-words", entry: "word-doko-ni" } }]
      }),
      item("particle-de-action", "駅で会う", "えきであう", "动作地点：在车站见面", "「で」表示动作、事件发生的地点，也可表示交通工具或手段。", {
        type: "particle",
        aliases: ["どこで", "动作地点", "交通工具"],
        particles: ["地点で动作", "交通工具で行く"],
        collocations: [phrase("駅で会う", "えきであう", "在车站见面"), phrase("電車で行く", "でんしゃでいく", "坐电车去")],
        examples: [example("我们在车站前见吧。", ["駅前", "えきまえ"], "で", ["会", "あ"], "いましょう。")],
        relatedIds: ["particle-ni-presence", "particle-de-transport"],
        crossLinks: [{ label: "疑问表达百科：どこで", route: { theme: "question-expressions", section: "questions-words", entry: "word-doko-de" } }]
      }),
      item("particle-wo-route", "地点を出る・道路を通る", "ちてんをでる・どうろをとおる", "移动经过或离开的场所用「を」", "这里的「を」不是普通受事宾语，而是移动路径、经过点或离开点。", {
        type: "particle",
        aliases: ["经过助词", "离开地点", "移动的を"],
        particles: ["道を歩く", "公園を通る", "橋を渡る", "駅を出る"],
        collocations: [phrase("道を歩く", "みちをあるく", "沿路走"), phrase("駅を出る", "えきをでる", "出车站")],
        examples: [example("出车站后，穿过公园。", ["駅", "えき"], "を", ["出", "で"], "て、", ["公園", "こうえん"], "を", ["通", "とお"], "ります。")],
        relatedIds: ["movement-tooru", "movement-wataru", "movement-deru"]
      }),
      item("particle-kara-origin", "地点から来る", "ちてんからくる", "从某地来：から表示起点", "标记移动开始的地点，也可表示路线说明的出发点。", {
        type: "particle",
        aliases: ["起点", "从哪里", "どこから"],
        particles: ["地点から来る", "地点から出る"],
        collocations: [phrase("駅から来る", "えきからくる", "从车站来"), phrase("ここから始める", "ここからはじめる", "从这里开始")],
        examples: [example("我从南口出来了。", ["南口", "みなみぐち"], "から", ["出", "で"], "ました。")],
        relatedIds: ["particle-made-end", "particle-full-path"]
      }),
      item("particle-made-end", "地点まで歩く", "ちてんまであるく", "走到某地：まで表示终点范围", "标记移动到哪里为止，强调路线或距离的终点。", {
        type: "particle",
        aliases: ["终点", "到哪里", "どこまで"],
        particles: ["地点まで歩く", "地点まで行く"],
        collocations: [phrase("駅まで歩く", "えきまであるく", "走到车站"), phrase("橋まで行く", "はしまでいく", "走到桥边")],
        examples: [example("从这里走到医院需要十五分钟。", "ここから", ["病院", "びょういん"], "まで", ["歩", "ある"], "いて", ["十五分", "じゅうごふん"], "です。")],
        relatedIds: ["particle-kara-origin", "movement-aruku"]
      }),
      item("particle-de-transport", "交通工具で行く", "こうつうきかんでいく", "乘某种交通工具去：で表示手段", "表示移动所使用的交通工具或方式。", {
        type: "particle",
        aliases: ["坐车去", "交通方式", "怎么去"],
        particles: ["電車で行く", "バスで来る", "歩いて行く"],
        collocations: [phrase("電車で行く", "でんしゃでいく", "坐电车去"), phrase("バスで空港へ行く", "ばすでくうこうへいく", "坐公交去机场")],
        examples: [example("我坐地铁去公司。", ["地下鉄", "ちかてつ"], "で", ["会社", "かいしゃ"], "へ", ["行", "い"], "きます。")],
        relatedIds: ["particle-de-action", "scene-transfer"]
      }),
      item("particle-full-path", "から → を → へ → に → まで", "から・を・へ・に・まで", "完整移动路径", "把起点、经过路线、前进方向、到达点和终点范围连成一条路径。", {
        type: "particle",
        aliases: ["移动路径", "完整路线", "起点经过方向到达终点"],
        particles: ["起点から", "经过地点を", "方向へ", "到达点に", "终点まで"],
        collocations: [phrase("駅から公園を通って学校まで", "えきからこうえんをとおってがっこうまで", "从车站经公园到学校")],
        examples: [example("从车站出发，穿过公园，走到学校。", ["駅", "えき"], "から", ["公園", "こうえん"], "を", ["通", "とお"], "って", ["学校", "がっこう"], "まで", ["歩", "ある"], "きます。")],
        relatedIds: ["particle-kara-origin", "particle-wo-route", "particle-e-direction", "particle-ni-destination", "particle-made-end"]
      })
    ]
  };

  const scenes = {
    id: "scenes",
    title: "问路与位置场景",
    japaneseTitle: "道案内・場面",
    reading: "みちあんない・ばめん",
    meaning: "问地点、找出口与换乘",
    summary: "每个场景都给出可以怎么问、对方可能怎么回答、关键词和可以直接照搬的句子。",
    items: [
      scene("scene-ask-place", "場所を尋ねる", "ばしょをたずねる", "询问地点", "询问设施在哪里，并根据礼貌程度选择「どこ／どちら」。", {
        aliases: ["问地点", "在哪里", "哪里有"],
        formalLevel: "普通：どこですか／礼貌：どちらですか",
        keywords: [phrase("どこですか", "どこですか", "在哪里"), phrase("どちらですか", "どちらですか", "在哪边"), phrase("この近く", "このちかく", "这附近")],
        ask: [
          example("请问，车站在哪里？", "すみません、", ["駅", "えき"], "はどこですか。"),
          example("厕所在哪边？", "トイレはどちらですか。")
        ],
        answers: [
          example("就在那边。", "すぐそこです。"),
          example("在这个建筑的二楼。", "この", ["建物", "たてもの"], "の", ["二階", "にかい"], "です。")
        ],
        copyPhrases: [
          example("这附近有便利店吗？", "この", ["近", "ちか"], "くにコンビニはありますか。"),
          example("最近的洗手间在哪里？", ["一番近", "いちばんちか"], "いトイレはどこですか。")
        ],
        crossLinks: [{ label: "疑问表达百科：地点询问", route: { theme: "question-expressions", section: "questions-purposes", entry: "purpose-place" } }],
        relatedIds: ["place-doko", "place-dochira", "distance-konohen"]
      }),
      scene("scene-ask-route", "行き方を尋ねる", "いきかたをたずねる", "询问走法", "询问到目的地应该怎么走、能否步行到达。", {
        aliases: ["怎么去", "怎么走", "问路"],
        formalLevel: "「どう行けばいいですか」自然礼貌，适合向陌生人问路。",
        keywords: [phrase("どう行けばいいですか", "どういけばいいですか", "应该怎么去"), phrase("歩いて行けますか", "あるいていけますか", "能走过去吗")],
        ask: [
          example("去车站应该怎么走？", ["駅", "えき"], "までどう", ["行", "い"], "けばいいですか。"),
          example("从这里可以走过去吗？", "ここから", ["歩", "ある"], "いて", ["行", "い"], "けますか。")
        ],
        answers: [
          example("沿这条路一直走。", "この", ["道", "みち"], "をまっすぐ", ["行", "い"], "ってください。"),
          example("在第二个路口右转。", ["二", "ふた"], "つ", ["目", "め"], "の", ["角", "かど"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。")
        ],
        copyPhrases: [example("应该往哪边走？", "どちらに", ["行", "い"], "けばいいですか。")],
        crossLinks: [{ label: "疑问表达百科：询问方法", route: { theme: "question-expressions", section: "questions-purposes", entry: "purpose-method" } }],
        relatedIds: ["movement-iku", "particle-e-direction", "road-michi"]
      }),
      scene("scene-confirm-direction", "方向を確認する", "ほうこうをかくにんする", "确认方向", "复述方向或用二选一确认自己没有走错。", {
        aliases: ["走对了吗", "右还是左", "确认方向"],
        formalLevel: "「この道で合っていますか」比直接说「正しいですか」自然。",
        keywords: [phrase("合っていますか", "あっていますか", "对吗"), phrase("右ですか、左ですか", "みぎですか、ひだりですか", "右还是左")],
        ask: [
          example("走这条路对吗？", "この", ["道", "みち"], "で", ["合", "あ"], "っていますか。"),
          example("是右边还是左边？", ["右", "みぎ"], "ですか、", ["左", "ひだり"], "ですか。")
        ],
        answers: [
          example("对，请一直走。", "はい、そのまままっすぐです。"),
          example("不是，是左边。", "いいえ、", ["左", "ひだり"], "です。")
        ],
        copyPhrases: [example("一直往前走就可以吗？", "まっすぐ", ["行", "い"], "けばいいですか。")],
        relatedIds: ["road-massugu", "movement-magaru", "direction-migi"]
      }),
      scene("scene-distance", "距離を確認する", "きょりをかくにんする", "确认距离", "确认远近、步行时间和是否就在附近。", {
        aliases: ["有多远", "走几分钟", "歩いて何分"],
        formalLevel: "「何分くらい」给对方留下估算空间，日常最自然。",
        keywords: [phrase("遠いですか", "とおいですか", "远吗"), phrase("何分くらい", "なんぷんくらい", "大约几分钟")],
        ask: [
          example("离这里远吗？", "ここから", ["遠", "とお"], "いですか。"),
          example("走路大约需要几分钟？", ["歩", "ある"], "いて", ["何分", "なんぷん"], "くらいですか。")
        ],
        answers: [
          example("走路大约十分钟。", ["歩", "ある"], "いて", ["十分", "じゅっぷん"], "くらいです。"),
          example("不远，就在附近。", ["遠", "とお"], "くないです。すぐそこです。")
        ],
        copyPhrases: [example("就在附近吗？", "すぐそこですか。")],
        relatedIds: ["distance-chikai", "distance-tooi", "movement-aruku"]
      }),
      scene("scene-station-exit", "駅の出口を探す", "えきのでぐちをさがす", "寻找车站出口", "确认几号出口、东西南北口和最近的出口。", {
        aliases: ["几号出口", "东口", "出站"],
        formalLevel: "车站问路用「どちらですか」礼貌而自然。",
        keywords: [phrase("何番出口", "なんばんでぐち", "几号出口"), phrase("東口", "ひがしぐち", "东口")],
        ask: [
          example("是几号出口？", ["何番出口", "なんばんでぐち"], "ですか。"),
          example("东口在哪边？", ["東口", "ひがしぐち"], "はどちらですか。")
        ],
        answers: [
          example("请从三号出口出去。", ["三番出口", "さんばんでぐち"], "から", ["出", "で"], "てください。"),
          example("东口在检票口的左边。", ["東口", "ひがしぐち"], "は", ["改札", "かいさつ"], "の", ["左", "ひだり"], "です。")
        ],
        copyPhrases: [example("离车站最近的是哪个出口？", ["駅", "えき"], "に", ["一番近", "いちばんちか"], "い", ["出口", "でぐち"], "はどこですか。")],
        relatedIds: ["road-deguchi", "road-kaisatsu", "movement-deru"]
      }),
      scene("scene-building-facility", "建物内の施設を探す", "たてものないのしせつをさがす", "寻找建筑内部设施", "在商场、医院、办公楼里确认楼层和内外位置。", {
        aliases: ["建筑内部", "几楼", "电梯在哪"],
        formalLevel: "接待场景可用「どちらにありますか」保持礼貌。",
        keywords: [phrase("何階", "なんかい", "几楼"), phrase("建物の奥", "たてもののおく", "建筑深处")],
        ask: [
          example("接待处在几楼？", ["受付", "うけつけ"], "は", ["何階", "なんかい"], "ですか。"),
          example("电梯在哪里？", "エレベーターはどこですか。")
        ],
        answers: [
          example("在二楼最里面。", ["二階", "にかい"], "の", ["一番奥", "いちばんおく"], "です。"),
          example("楼梯旁边就是。", ["階段", "かいだん"], "の", ["隣", "となり"], "です。")
        ],
        copyPhrases: [example("洗手间在检票口里面吗？", "トイレは", ["改札", "かいさつ"], "の", ["内側", "うちがわ"], "ですか。")],
        relatedIds: ["road-kai", "range-oku", "range-uchigawa"]
      }),
      scene("scene-transfer", "乗り換える", "のりかえる", "乘车和换乘", "确认换乘站、站台和下车站。", {
        aliases: ["换乘", "转车", "乗り換え"],
        formalLevel: "确认站台时说「このホームで合っていますか」很自然。",
        keywords: [phrase("乗り換える", "のりかえる", "换乘"), phrase("ホーム", "ほーむ", "站台"), phrase("降りる", "おりる", "下车")],
        ask: [
          example("在哪里换乘？", "どこで", ["乗", "の"], "り", ["換", "か"], "えますか。"),
          example("是这个站台吗？", "このホームで", ["合", "あ"], "っていますか。")
        ],
        answers: [
          example("请在东京站换乘。", ["東京駅", "とうきょうえき"], "で", ["乗", "の"], "り", ["換", "か"], "えてください。"),
          example("请在下一站下车。", ["次", "つぎ"], "の", ["駅", "えき"], "で", ["降", "お"], "りてください。")
        ],
        copyPhrases: [
          example("这班电车去新宿吗？", "この", ["電車", "でんしゃ"], "は", ["新宿", "しんじゅく"], "に", ["行", "い"], "きますか。"),
          example("我在下一站下车。", ["次", "つぎ"], "の", ["駅", "えき"], "で", ["降", "お"], "ります。")
        ],
        relatedIds: ["road-home", "movement-oriru-vehicle", "particle-de-transport"]
      }),
      scene("scene-give-directions", "道順を説明する", "みちじゅんをせつめいする", "向别人说明路线", "用顺序、路标和移动动词把路线拆成几个短步骤。", {
        aliases: ["说明路线", "指路", "告诉怎么走"],
        formalLevel: "使用「～てください」清楚礼貌；朋友间可用普通形。",
        keywords: [phrase("まず", "まず", "首先"), phrase("それから", "それから", "然后"), phrase("突き当たり", "つきあたり", "尽头")],
        ask: [example("从这里到市役所怎么走？", "ここから", ["市役所", "しやくしょ"], "までどう", ["行", "い"], "きますか。")],
        answers: [
          example("先一直走到红绿灯。", "まず、", ["信号", "しんごう"], "までまっすぐ", ["行", "い"], "ってください。"),
          example("然后在路的尽头向左转。", "それから、", ["道", "みち"], "の", ["突", "つ"], "き", ["当", "あ"], "たりを", ["左", "ひだり"], "に", ["曲", "ま"], "がってください。")
        ],
        copyPhrases: [example("过桥后，右手边就是。", ["橋", "はし"], "を", ["渡", "わた"], "ると、", ["右手", "みぎて"], "にあります。")],
        relatedIds: ["road-tsukiatari", "movement-magaru", "movement-wataru"]
      }),
      scene("scene-clarify", "聞き返して確認する", "ききかえしてかくにんする", "没有听懂时再次确认", "先请求重复，再复述关键方向或顺序，避免整段路线听错。", {
        aliases: ["再说一遍", "没听懂", "再次确认"],
        formalLevel: "「もう一度お願いします」比只说「え？」礼貌可靠。",
        keywords: [phrase("もう一度", "もういちど", "再一次"), phrase("～んですか", "んですか", "是……吗")],
        ask: [
          example("请再说一遍。", "もう", ["一度", "いちど"], "お", ["願", "ねが"], "いします。"),
          example("是向右转吗？", ["右", "みぎ"], "に", ["曲", "ま"], "がるんですか。")
        ],
        answers: [
          example("对，请在第二个红绿灯右转。", "はい、", ["二", "ふた"], "つ", ["目", "め"], "の", ["信号", "しんごう"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。"),
          example("不，是第一个红绿灯。", "いいえ、", ["最初", "さいしょ"], "の", ["信号", "しんごう"], "です。")
        ],
        copyPhrases: [example("是第一个红绿灯，还是第二个？", ["最初", "さいしょ"], "の", ["信号", "しんごう"], "ですか、", ["二", "ふた"], "つ", ["目", "め"], "の", ["信号", "しんごう"], "ですか。")],
        crossLinks: [{ label: "疑问表达百科：～んですか", route: { theme: "question-expressions", section: "questions-patterns", entry: "pattern-n-desu-ka" } }],
        relatedIds: ["scene-confirm-direction", "road-shingou"]
      })
    ]
  };

  const comparisons = [
    {
      id: "compare-koko-register",
      title: "ここ／こちら／こっち",
      sectionIds: ["places"],
      summary: "都指说话人一侧：「ここ」中性地点，「こちら」礼貌且有方向感，「こっち」随意口语。",
      entries: [
        { title: "ここ", note: "普通、具体地点" },
        { title: "こちら", note: "礼貌、接待常用" },
        { title: "こっち", note: "随意、熟人之间" }
      ]
    },
    {
      id: "compare-soko-register",
      title: "そこ／そちら／そっち",
      sectionIds: ["places"],
      summary: "都指听话人一侧；正式程度依次为中性、礼貌、随意。",
      entries: [
        { title: "そこ", note: "普通地点" },
        { title: "そちら", note: "礼貌，也可指对方" },
        { title: "そっち", note: "随意口语" }
      ]
    },
    {
      id: "compare-doko-register",
      title: "どこ／どちら／どっち",
      sectionIds: ["places", "scenes"],
      summary: "「どこ」问地点；「どちら」礼貌，也可问方向；「どっち」随意且常带二选一。",
      entries: [
        { title: "どこ", note: "基础地点疑问" },
        { title: "どちら", note: "礼貌地点／方向" },
        { title: "どっち", note: "随意方向／选择" }
      ]
    },
    {
      id: "compare-front-back",
      title: "前／後ろ／裏",
      sectionIds: ["directions"],
      summary: "「前」是朝向前方；「後ろ」是人或物的背后；「裏」是反面或建筑背面。",
      entries: [
        { title: "前", note: "面前、朝向前方" },
        { title: "後ろ", note: "人的背后、后方" },
        { title: "裏", note: "物体反面、建筑背面" }
      ]
    },
    {
      id: "compare-nearby",
      title: "隣／横／そば／近く",
      sectionIds: ["directions", "distance"],
      summary: "「隣」直接相邻；「横」横侧；「そば」很靠近；「近く」附近但不一定紧挨。",
      entries: [
        { title: "隣", note: "紧挨、隔壁" },
        { title: "横", note: "横侧位置" },
        { title: "そば", note: "很靠近、身边" },
        { title: "近く", note: "较宽的附近范围" }
      ]
    },
    {
      id: "compare-inside",
      title: "中／内／内部",
      sectionIds: ["range"],
      summary: "「中」最具体口语；「内」可表示抽象范围；「内部」客观、正式。",
      entries: [
        { title: "中", note: "容器、房间里面" },
        { title: "内", note: "范围、组织以内" },
        { title: "内部", note: "正式说明内部空间" }
      ]
    },
    {
      id: "compare-oku-temae",
      title: "奥／手前",
      sectionIds: ["range"],
      summary: "以入口或观察者为基准：「奥」更深、更里面；「手前」更近、尚未到目标。",
      entries: [
        { title: "奥", note: "从入口看更深处" },
        { title: "手前", note: "观察者近侧、目标之前" }
      ]
    },
    {
      id: "compare-agaru-noboru",
      title: "上がる／登る",
      sectionIds: ["movement"],
      summary: "「上がる」重视高度变化和楼层；「登る」强调攀登山、塔、长坡的过程。",
      entries: [
        { title: "上がる", note: "楼梯、楼层、台阶" },
        { title: "登る", note: "山、塔、坡道" }
      ]
    },
    {
      id: "compare-oriru",
      title: "下りる／降りる／下る",
      sectionIds: ["movement"],
      summary: "「下りる」下楼或下到低处；「降りる」下交通工具；「下る」沿坡、河流向下。",
      entries: [
        { title: "下りる", note: "楼梯、地下" },
        { title: "降りる", note: "电车、公交车" },
        { title: "下る", note: "坡道、山路、河流" }
      ]
    },
    {
      id: "compare-tooru-wataru",
      title: "通る／渡る",
      sectionIds: ["movement", "roads"],
      summary: "「通る」经过路线或地点；「渡る」从道路、桥、河流的一边到另一边。",
      entries: [
        { title: "通る", note: "经过、穿过路线" },
        { title: "渡る", note: "横跨到另一侧" }
      ]
    },
    {
      id: "compare-iku-mukau",
      title: "行く／向かう",
      sectionIds: ["movement"],
      summary: "「行く」单纯表示去；「向かう」强调朝明确目标前进的过程。",
      entries: [
        { title: "行く", note: "从当前视点离开去某处" },
        { title: "向かう", note: "正在朝目标前进" }
      ]
    },
    {
      id: "compare-kaeru-modoru",
      title: "帰る／戻る",
      sectionIds: ["movement"],
      summary: "「帰る」回家或所属地；「戻る」回到之前的位置、路线或状态。",
      entries: [
        { title: "帰る", note: "回家、回国、回公司" },
        { title: "戻る", note: "原路返回、回到原位" }
      ]
    },
    {
      id: "compare-ni-e",
      title: "に／へ",
      sectionIds: ["particles"],
      summary: "「に」强调到达点；「へ」强调方向。很多日常移动表达都可互换，但固定搭配需按动词选择。",
      entries: [
        { title: "学校に行く", note: "目的地、到达点" },
        { title: "学校へ行く", note: "前进方向" }
      ]
    },
    {
      id: "compare-ni-de",
      title: "に／で",
      sectionIds: ["particles", "scenes"],
      summary: "「駅にいる」是存在地点；「駅で会う」是动作发生地点。",
      entries: [
        { title: "駅にいる", note: "人存在于车站" },
        { title: "駅で会う", note: "见面动作在车站发生" }
      ]
    },
    {
      id: "compare-kara-made",
      title: "から／まで",
      sectionIds: ["particles"],
      summary: "「から」标记起点；「まで」标记终点范围，两者常成对出现。",
      entries: [
        { title: "駅から", note: "从车站开始" },
        { title: "学校まで", note: "到学校为止" }
      ]
    }
  ];

  const comparisonReadings = {
    "前": "まえ",
    "後ろ": "うしろ",
    "裏": "うら",
    "隣": "となり",
    "横": "よこ",
    "近く": "ちかく",
    "中": "なか",
    "内": "うち",
    "内部": "ないぶ",
    "奥": "おく",
    "手前": "てまえ",
    "上がる": "あがる",
    "登る": "のぼる",
    "下りる": "おりる",
    "降りる": "おりる",
    "下る": "くだる",
    "通る": "とおる",
    "渡る": "わたる",
    "行く": "いく",
    "向かう": "むかう",
    "帰る": "かえる",
    "戻る": "もどる",
    "学校に行く": "がっこうにいく",
    "学校へ行く": "がっこうへいく",
    "駅にいる": "えきにいる",
    "駅で会う": "えきであう",
    "駅から": "えきから",
    "学校まで": "がっこうまで"
  };
  comparisons.forEach((comparison) => {
    comparison.entries.forEach((entry) => {
      entry.reading = comparisonReadings[entry.title] || "";
    });
  });

  const sectionList = [places, directions, range, distance, roads, movement, particles, scenes];

  return {
    id: "space-movement",
    title: "空间、方位与移动",
    japaneseTitle: "場所・方向・移動",
    reading: "ばしょ・ほうこう・いどう",
    meaning: "从“在哪里”和“往哪里走”出发，连接方位词、移动动词、助词和日常问路表达。",
    description: "位置 · 方位 · 移动 · 问路",
    badge: "联想学习",
    icon: "方",
    layout: "space-movement",
    sections: sectionList,
    comparisons,
    intents: [
      { title: "某物在哪里", reading: "どこにある", meaning: "存在地点", route: { section: "places", item: "place-doko" } },
      { title: "往哪里走", reading: "どちらへいく", meaning: "方向确认", route: { section: "scenes", item: "scene-confirm-direction" } },
      { title: "怎么去", reading: "どういけばいい", meaning: "询问走法", route: { section: "scenes", item: "scene-ask-route" } },
      { title: "位置关系", reading: "いちかんけい", meaning: "上下内外", route: { section: "directions" } },
      { title: "车站与换乘", reading: "えき・のりかえ", meaning: "出口和站台", route: { section: "scenes", item: "scene-transfer" } }
    ],
    positionMap: [
      { label: "上", reading: "うえ", itemId: "direction-ue", className: "top" },
      { label: "下", reading: "した", itemId: "direction-shita", className: "bottom" },
      { label: "前", reading: "まえ", itemId: "direction-mae", className: "front" },
      { label: "後ろ", reading: "うしろ", itemId: "direction-ushiro", className: "back" },
      { label: "左", reading: "ひだり", itemId: "direction-hidari", className: "left" },
      { label: "右", reading: "みぎ", itemId: "direction-migi", className: "right" },
      { label: "中", reading: "なか", itemId: "direction-naka", className: "inside" },
      { label: "外", reading: "そと", itemId: "direction-soto", className: "outside" }
    ],
    pathNodes: [
      { label: "出发点", particle: "から", reading: "から", itemId: "particle-kara-origin" },
      { label: "经过地点", particle: "を", reading: "を", itemId: "particle-wo-route" },
      { label: "方向", particle: "へ", reading: "へ", itemId: "particle-e-direction" },
      { label: "到达点", particle: "に", reading: "に", itemId: "particle-ni-destination" },
      { label: "终点", particle: "まで", reading: "まで", itemId: "particle-made-end" }
    ],
    highFrequency: [
      example("请问，车站在哪里？", "すみません、", ["駅", "えき"], "はどこですか。"),
      example("这附近有便利店吗？", "この", ["近", "ちか"], "くにコンビニはありますか。"),
      example("去车站应该怎么走？", ["駅", "えき"], "までどう", ["行", "い"], "けばいいですか。"),
      example("请在第二个红绿灯右转。", ["二", "ふた"], "つ", ["目", "め"], "の", ["信号", "しんごう"], "を", ["右", "みぎ"], "に", ["曲", "ま"], "がってください。"),
      example("走这条路对吗？", "この", ["道", "みち"], "で", ["合", "あ"], "っていますか。"),
      example("走路大约需要几分钟？", ["歩", "ある"], "いて", ["何分", "なんぷん"], "くらいですか。"),
      example("在哪里换乘？", "どこで", ["乗", "の"], "り", ["換", "か"], "えますか。"),
      example("请再说一遍。", "もう", ["一度", "いちど"], "お", ["願", "ねが"], "いします。")
    ]
  };
})();
