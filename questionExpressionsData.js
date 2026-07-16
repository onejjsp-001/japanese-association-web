/*
 * 日语疑问表达百科首批数据。
 * 页面渲染、搜索和导航逻辑位于 question-expressions.js。
 */
const questionExample = (japanese, chinese) => ({ japanese, chinese });

const questionEncyclopediaEntry = ({
  id,
  type,
  title,
  subtitle,
  purposeCategory,
  structureCategory,
  registerLevel,
  summary,
  formula,
  tags = [],
  searchTerms = [],
  standard,
  casual,
  formal,
  collocations = [],
  contrasts = [],
  mistakes = [],
  relatedIds = []
}) => ({
  id,
  type,
  title,
  subtitle,
  purposeCategory,
  structureCategory,
  registerLevel,
  summary,
  formula,
  tags,
  searchTerms,
  examples: {
    standard: standard ? [questionExample(...standard)] : [],
    casual: casual ? [questionExample(...casual)] : [],
    formal: formal ? [questionExample(...formal)] : []
  },
  collocations,
  contrasts,
  mistakes,
  relatedIds
});

const QUESTION_EXPRESSIONS_DATA = {
  id: "question-expressions",
  title: "日语疑问表达百科",
  japaneseTitle: "疑問表現百科",
  reading: "ぎもんひょうげんひゃっか",
  meaning: "按目的、句型和语气查询自然问法",
  badge: "百科",
  icon: "問",
  description: "疑问词 · 句型 · 语气与场景",
  layout: "question-encyclopedia",
  subtitle: "按提问目的、句型结构和语气关系，快速找到自然的日语问法",
  intro: "从“想问什么”出发，找到适合对象和场景的自然问法。",
  registerLevels: {
    1: "正式、郑重",
    2: "礼貌",
    3: "轻松礼貌",
    4: "普通随意",
    5: "强硬、可能带质问感"
  },
  highFrequency: [
    { label: "なんで／どうして／なぜ", targetId: "comparison-reason" },
    { label: "の？／んですか", targetId: "pattern-n-desu-ka" },
    { label: "请求别人", targetId: "comparison-request" },
    { label: "询问地点", targetId: "comparison-place" },
    { label: "职场确认", targetId: "comparison-confirmation" },
    { label: "どこに／どこで／どこへ", targetId: "comparison-place" }
  ],
  mapGroups: [
    {
      id: "unknown",
      title: "A. 获取未知信息",
      items: [
        ["人物", "purpose-person"], ["事物", "purpose-thing"], ["地点", "purpose-place"],
        ["时间", "purpose-time"], ["原因", "purpose-reason"], ["方法", "purpose-method"],
        ["数量", "purpose-quantity"], ["程度", "word-dono-kurai"], ["价格", "word-ikura"], ["选择", "purpose-choice"]
      ]
    },
    {
      id: "situation",
      title: "B. 询问情况",
      items: [
        ["状态", "purpose-state"], ["意见", "purpose-opinion"], ["计划", "pattern-masu-ka"],
        ["经历", "pattern-ta-koto-ga-arimasu-ka"], ["可能性", "pattern-deshou-ka"], ["是否完成", "pattern-mashita-ka"]
      ]
    },
    {
      id: "negotiate",
      title: "C. 与对方协商",
      items: [
        ["请求许可", "pattern-temo-ii-desu-ka"], ["请求帮助", "pattern-te-moraemasu-ka"],
        ["邀请", "pattern-masen-ka"], ["主动提供帮助", "pattern-mashou-ka"],
        ["询问建议", "pattern-reba-ii-desu-ka"], ["确认是否方便", "scene-workplace"]
      ]
    },
    {
      id: "confirm",
      title: "D. 确认信息",
      items: [
        ["单纯确认", "pattern-desu-ka"], ["确认自己的理解", "pattern-to-iu-koto-desu-ka"],
        ["确认传闻", "pattern-deshou-ka"], ["确认真实性", "comparison-confirmation"],
        ["间接疑问", "pattern-ka-dou-ka"]
      ]
    },
    {
      id: "background",
      title: "E. 询问背景",
      items: [
        ["～んですか", "pattern-n-desu-ka"], ["～のですか", "pattern-no-desu-ka"],
        ["原因追问", "word-doushite"], ["惊讶确认", "pattern-n-desu-ka"],
        ["关心", "pattern-no-desu-ka"], ["怀疑", "comparison-ending" ]
      ]
    },
    {
      id: "stance",
      title: "F. 表达立场",
      items: [
        ["寻求认同", "pattern-janai-desu-ka"], ["委婉反对", "comparison-confirmation"],
        ["反问", "comparison-ending"], ["不满", "mistake-questioning-tone"],
        ["责备", "mistake-anime-speech"], ["自言自语", "comparison-ending"]
      ]
    }
  ],

  purposes: [
    questionEncyclopediaEntry({
      id: "purpose-person", type: "purpose", title: "询问人物", subtitle: "根据人物在句中的角色选择助词",
      purposeCategory: "人物", structureCategory: "疑问词＋助词＋谓语", registerLevel: 2,
      summary: "先判断要问的是动作主体、对象、同伴还是来源，再选择「誰が・誰に・誰と・誰から」。",
      formula: "誰＋が／に／と／から＋谓语", tags: ["人物", "助词", "礼貌"],
      searchTerms: ["谁", "谁做", "问人", "人物关系"],
      standard: ["誰が担当しますか。", "由谁负责？"], casual: ["誰と行くの？", "和谁去？"],
      formal: ["どなたに確認すればよろしいでしょうか。", "我应该向哪位确认？"],
      collocations: ["誰が決める", "誰に聞く", "誰と会う", "誰から聞く"],
      contrasts: ["「誰は」通常不用于直接询问未知人物。", "正式场合可用「どなた」。"],
      mistakes: ["不自然：誰は来ますか。", "自然：誰が来ますか。"],
      relatedIds: ["word-dare", "word-dare-ga", "word-dare-ni", "comparison-person-particles"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-thing", type: "purpose", title: "询问事物", subtitle: "区分内容、选择和性质",
      purposeCategory: "事物", structureCategory: "何／どれ／どの／どんな", registerLevel: 2,
      summary: "问内容用「何」，从候选中选一个用「どれ・どの」，问性质或类型用「どんな」。",
      formula: "何＋助词／どれ／どの＋名词／どんな＋名词", tags: ["事物", "选择", "性质"],
      searchTerms: ["什么", "哪一个", "哪种", "物品"],
      standard: ["何が必要ですか。", "需要什么？"], casual: ["どれがいい？", "哪个好？"],
      formal: ["どの資料をご覧になりましたか。", "您看了哪份资料？"],
      collocations: ["何をする", "どれを選ぶ", "どの商品", "どんな方法"],
      contrasts: ["「どの」后面必须接名词。", "「どんな」询问性质，不是从固定选项中选择。"],
      mistakes: ["错误：どのがいいですか。", "自然：どれがいいですか。"],
      relatedIds: ["word-nani", "word-dore", "word-dono", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-place", type: "purpose", title: "询问地点", subtitle: "存在、动作和移动方向使用不同助词",
      purposeCategory: "地点", structureCategory: "どこ＋に／で／へ", registerLevel: 2,
      summary: "「どこに」问存在或到达地点，「どこで」问动作发生地点，「どこへ」强调移动方向。",
      formula: "どこ＋に／で／へ＋谓语", tags: ["地点", "场所助词", "高频"],
      searchTerms: ["在哪里", "去哪里", "动作地点", "存在地点"],
      standard: ["どこで買いましたか。", "在哪里买的？"], casual: ["どこにいるの？", "你在哪里？"],
      formal: ["受付はどちらにございますか。", "接待处在哪里？"],
      collocations: ["どこにある", "どこで働く", "どこへ行く", "どちらで購入する"],
      contrasts: ["に：存在／到达", "で：动作", "へ：方向"],
      mistakes: ["错误：どこに買いましたか。", "自然：どこで買いましたか。"],
      relatedIds: ["word-doko", "word-doko-de", "word-doko-ni", "comparison-place"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-time", type: "purpose", title: "询问时间", subtitle: "时点、起点、终点和截止时间",
      purposeCategory: "时间", structureCategory: "いつ＋时间助词", registerLevel: 2,
      summary: "「いつ」问时间点；加「から・まで・までに」可分别询问开始、持续终点和完成期限。",
      formula: "いつ／いつから／いつまで／いつまでに＋谓语", tags: ["时间", "期限", "日程"],
      searchTerms: ["什么时候", "从什么时候", "到什么时候", "截止"],
      standard: ["いつ出発しますか。", "什么时候出发？"], casual: ["いつまでいる？", "待到什么时候？"],
      formal: ["いつまでに提出すればよろしいでしょうか。", "最晚应在什么时候提交？"],
      collocations: ["いつ始まる", "いつから働く", "いつまで滞在する", "いつまでに出す"],
      contrasts: ["「まで」表示持续到某时。", "「までに」表示在该时点之前完成。"],
      mistakes: ["错误：いつまで提出しますか。", "自然：いつまでに提出しますか。"],
      relatedIds: ["word-itsu", "word-itsu-kara", "word-itsu-made-ni", "comparison-time-limit"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-reason", type: "purpose", title: "询问原因", subtitle: "正式、中性和口语表达的距离感不同",
      purposeCategory: "原因", structureCategory: "なぜ／どうして／なんで", registerLevel: 3,
      summary: "「なぜ」偏书面和正式，「どうして」中性且适合关心式询问，「なんで」口语但容易显得直接。",
      formula: "なぜ／どうして／なんで＋普通形／ですか", tags: ["原因", "语气", "追问"],
      searchTerms: ["为什么", "理由", "质问", "关心原因"],
      standard: ["どうして予定が変わったんですか。", "为什么计划变了？"], casual: ["なんで来なかったの？", "怎么没来？"],
      formal: ["なぜこの判断に至ったのでしょうか。", "为何会作出这一判断？"],
      collocations: ["なぜ必要か", "どうして遅れたのか", "なんで分かったの"],
      contrasts: ["正式对象避免突然使用「なんで」。", "「どうして」也可表示方法，但上下文通常能区分。"],
      mistakes: ["对上司直接说「なんでですか」可能显得顶撞。"],
      relatedIds: ["word-naze", "word-doushite", "word-nande", "comparison-reason"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-method", type: "purpose", title: "询问方法与手段", subtitle: "状态方式、操作步骤和工具手段",
      purposeCategory: "方法", structureCategory: "どう／どうやって／何で", registerLevel: 2,
      summary: "问整体方式或情况用「どう」，问具体步骤用「どうやって」，问工具、交通手段或材料用「何で」。",
      formula: "どう＋谓语／どうやって＋动作／何で＋动作", tags: ["方法", "手段", "工具"],
      searchTerms: ["怎么做", "用什么", "交通工具", "步骤"],
      standard: ["どうやって予約しますか。", "要怎么预约？"], casual: ["これ、どうやって使うの？", "这个怎么用？"],
      formal: ["こちらへはどのようにお越しになりましたか。", "您是如何来这里的？"],
      collocations: ["どう考える", "どうやって作る", "何で行く", "どのように対応する"],
      contrasts: ["「何で」也可能被理解为「为什么」。", "正式场合可用「どのように」。"],
      mistakes: ["问操作步骤时只说「どうですか」信息不足。"],
      relatedIds: ["word-dou", "word-nani-de", "word-douyatte", "comparison-method"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-quantity", type: "purpose", title: "询问数量与程度", subtitle: "可数数量、持续量和程度并不相同",
      purposeCategory: "数量", structureCategory: "いくつ／どのくらい／数量疑问", registerLevel: 2,
      summary: "「いくつ」问个数，「どのくらい」问时间、距离、程度等范围，具体量词常用「何＋量词」。",
      formula: "いくつ／何＋量词／どのくらい＋谓语", tags: ["数量", "程度", "量词"],
      searchTerms: ["多少个", "多久", "多远", "多大程度"],
      standard: ["全部でいくつありますか。", "一共有几个？"], casual: ["どのくらい待つ？", "要等多久？"],
      formal: ["完了までどの程度かかる見込みでしょうか。", "预计完成需要多长时间？"],
      collocations: ["何人いる", "何本必要", "どのくらいかかる", "どれほど重要か"],
      contrasts: ["「いくら」主要问价格或不可数程度。", "量词明确时优先使用「何人・何個」等。"],
      mistakes: ["错误：人はいくついますか。", "自然：何人いますか。"],
      relatedIds: ["word-ikura", "word-dono-kurai", "comparison-degree"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-choice", type: "purpose", title: "询问选择", subtitle: "独立选择与修饰名词要分开",
      purposeCategory: "选择", structureCategory: "どれ／どの＋名词／どちら", registerLevel: 2,
      summary: "「どれ」可以单独指代选项，「どの」必须修饰名词；两者择一或正式场合常用「どちら」。",
      formula: "どれ＋助词／どの＋名词／どちら＋助词", tags: ["选择", "候选", "指示词"],
      searchTerms: ["哪一个", "哪个", "二选一", "选择"],
      standard: ["どれを選びますか。", "选哪一个？"], casual: ["どっちがいい？", "哪个好？"],
      formal: ["どちらの案をご希望でしょうか。", "您希望选择哪一个方案？"],
      collocations: ["どれが必要", "どの商品", "どちらを希望する"],
      contrasts: ["「どんな」问性质，不是固定选项。", "「どちら」比「どっち」礼貌。"],
      mistakes: ["错误：どのを買いますか。", "自然：どれを買いますか。"],
      relatedIds: ["word-dore", "word-dono", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-state", type: "purpose", title: "询问状态", subtitle: "问情况、结果和身体感受",
      purposeCategory: "状态", structureCategory: "どう／どんな状態／～ていますか", registerLevel: 2,
      summary: "一般情况用「どうですか」，具体进行状态用「～ていますか」，需要背景说明时可用「どうしたんですか」。",
      formula: "どうですか／どうしましたか／～ていますか", tags: ["状态", "情况", "关心"],
      searchTerms: ["怎么样", "怎么了", "进展", "身体情况"],
      standard: ["準備はどうですか。", "准备得怎么样？"], casual: ["どうしたの？", "怎么了？"],
      formal: ["現在の進捗はいかがでしょうか。", "目前进展如何？"],
      collocations: ["体調はどう", "どうしたの", "進んでいますか", "いかがでしょうか"],
      contrasts: ["「どうしましたか」询问发生了什么。", "「どうですか」询问评价或状态。"],
      mistakes: ["对身体不适的人只说「何ですか」不自然。"],
      relatedIds: ["word-dou", "pattern-n-desu-ka", "scene-hospital"]
    }),
    questionEncyclopediaEntry({
      id: "purpose-opinion", type: "purpose", title: "询问意见", subtitle: "开放询问、选择确认和委婉征求看法",
      purposeCategory: "意见", structureCategory: "どう思いますか／いかがですか", registerLevel: 2,
      summary: "询问看法常用「どう思いますか」；征求评价可用「いかがですか」；对上级避免只说「どう？」。",
      formula: "主题＋について＋どう思いますか", tags: ["意见", "评价", "职场"],
      searchTerms: ["怎么看", "意见", "想法", "征求看法"],
      standard: ["この案についてどう思いますか。", "你怎么看这个方案？"], casual: ["これ、どう思う？", "你觉得这个怎么样？"],
      formal: ["こちらの方針について、どのようにお考えでしょうか。", "您如何看待这一方针？"],
      collocations: ["どう思う", "どう考える", "ご意見を伺う", "いかがでしょうか"],
      contrasts: ["「どうですか」也可问评价，但不一定要求展开理由。"],
      mistakes: ["错误：あなたはどう思いますか。反复使用「あなた」会显得生硬。"],
      relatedIds: ["pattern-to-omoimasu-ka", "mistake-overuse-anata", "scene-workplace"]
    })
  ],

  questionWords: [
    questionEncyclopediaEntry({
      id: "word-nani", type: "question-word", title: "何（なに／なん）", subtitle: "询问事物、内容或种类",
      purposeCategory: "事物", structureCategory: "疑问词＋助词", registerLevel: 2,
      summary: "「何」询问未知内容；在「何ですか・何人・何時」等环境中常读作「なん」。",
      formula: "何＋が／を／に／の／量词", tags: ["事物", "内容", "读音变化"], searchTerms: ["什么", "なに", "なん", "何の"],
      standard: ["何を探していますか。", "你在找什么？"], casual: ["何してるの？", "在做什么？"],
      formal: ["ご用件は何でしょうか。", "请问您有什么事？"], collocations: ["何が必要", "何をする", "何の話", "何人"],
      contrasts: ["候选中选一个时用「どれ」。", "问性质时用「どんな」。"], mistakes: ["错误：何があなたは欲しいですか。", "自然：何が欲しいですか。"],
      relatedIds: ["purpose-thing", "word-dore", "word-dono", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-dare", type: "question-word", title: "誰", subtitle: "询问人物身份",
      purposeCategory: "人物", structureCategory: "誰＋助词", registerLevel: 3,
      summary: "「誰」用于一般关系；面对顾客、上级或正式对象时常用「どなた」。",
      formula: "誰＋が／に／と／から", tags: ["人物", "身份", "普通"], searchTerms: ["谁", "どなた", "人物身份"],
      standard: ["あの方は誰ですか。", "那位是谁？"], casual: ["誰と話してたの？", "刚才在和谁说话？"],
      formal: ["どなたがお見えになりましたか。", "是哪位来访了？"], collocations: ["誰が来る", "誰に頼む", "誰と行く", "誰から聞く"],
      contrasts: ["「どなた」更加礼貌。", "未知人物作主题时通常用「が」而不是「は」。"], mistakes: ["错误：誰は担当ですか。", "自然：誰が担当ですか。"],
      relatedIds: ["purpose-person", "word-dare-ga", "word-dare-ni", "comparison-person-particles"]
    }),
    questionEncyclopediaEntry({
      id: "word-dare-ga", type: "question-word", title: "誰が", subtitle: "询问动作主体或状态承担者",
      purposeCategory: "人物", structureCategory: "疑问词＋が", registerLevel: 2,
      summary: "当未知信息是“谁做”或“谁处于该状态”时，使用「誰が」。",
      formula: "誰が＋动作／状态", tags: ["人物", "主语", "が"], searchTerms: ["谁做", "主体", "主格助词"],
      standard: ["誰がこの資料を作りましたか。", "谁做了这份资料？"], casual: ["誰が来る？", "谁来？"],
      formal: ["どなたがご担当でしょうか。", "请问哪位负责？"], collocations: ["誰が決める", "誰が知っている", "誰が担当する"],
      contrasts: ["「誰は」把“谁”设为既知主题，普通问句中很少使用。"], mistakes: ["不自然：誰は来ましたか。", "自然：誰が来ましたか。"],
      relatedIds: ["word-dare", "purpose-person", "mistake-dare-wa"]
    }),
    questionEncyclopediaEntry({
      id: "word-dare-ni", type: "question-word", title: "誰に", subtitle: "询问动作对象、接受者或目标人物",
      purposeCategory: "人物", structureCategory: "疑问词＋に", registerLevel: 2,
      summary: "用于询问向谁说、给谁、请谁帮忙或从谁那里得到影响。",
      formula: "誰に＋聞く／渡す／頼む／会う", tags: ["人物", "对象", "に"], searchTerms: ["向谁", "给谁", "找谁", "动作对象"],
      standard: ["誰に相談しましたか。", "你和谁商量了？"], casual: ["誰に聞けばいい？", "问谁比较好？"],
      formal: ["どなたにお渡しすればよろしいでしょうか。", "我应该交给哪位？"], collocations: ["誰に聞く", "誰に渡す", "誰に頼む", "誰に会う"],
      contrasts: ["共同做某事用「誰と」。", "来源用「誰から」。"], mistakes: ["错误：誰を相談しましたか。", "自然：誰に相談しましたか。"],
      relatedIds: ["word-dare-to", "word-dare-kara", "comparison-person-particles"]
    }),
    questionEncyclopediaEntry({
      id: "word-dare-to", type: "question-word", title: "誰と", subtitle: "询问共同参与者或交谈对象",
      purposeCategory: "人物", structureCategory: "疑问词＋と", registerLevel: 3,
      summary: "「誰と」强调一起行动、见面、交谈或比较的另一方。",
      formula: "誰と＋会う／行く／話す", tags: ["人物", "同伴", "と"], searchTerms: ["和谁", "跟谁", "一起"],
      standard: ["誰と会う予定ですか。", "打算和谁见面？"], casual: ["誰と行く？", "和谁去？"],
      formal: ["どなたとお話しになりましたか。", "您和哪位谈过？"], collocations: ["誰と行く", "誰と会う", "誰と話す", "誰と比べる"],
      contrasts: ["单向动作对象常用「誰に」。"], mistakes: ["错误：誰に一緒に行きますか。", "自然：誰と一緒に行きますか。"],
      relatedIds: ["word-dare-ni", "word-dare-kara", "comparison-person-particles"]
    }),
    questionEncyclopediaEntry({
      id: "word-dare-kara", type: "question-word", title: "誰から", subtitle: "询问信息、物品或动作的来源人物",
      purposeCategory: "人物", structureCategory: "疑问词＋から", registerLevel: 2,
      summary: "用于询问从谁那里听说、收到、学到或被联系。",
      formula: "誰から＋聞く／もらう／習う", tags: ["人物", "来源", "から"], searchTerms: ["从谁", "谁告诉的", "来源人物"],
      standard: ["誰から聞きましたか。", "你从谁那里听说的？"], casual: ["それ、誰からもらったの？", "那个是谁给你的？"],
      formal: ["どなたからご紹介いただきましたか。", "请问是哪位介绍您的？"], collocations: ["誰から聞く", "誰からもらう", "誰から習う"],
      contrasts: ["动作接受者用「誰に」。", "共同对象用「誰と」。"], mistakes: ["错误：誰に聞いた情報ですか。若问来源更自然说「誰から聞いた情報ですか」。"],
      relatedIds: ["word-dare-ni", "word-dare-to", "comparison-person-particles"]
    }),
    questionEncyclopediaEntry({
      id: "word-doko", type: "question-word", title: "どこ", subtitle: "询问地点的基础疑问词",
      purposeCategory: "地点", structureCategory: "どこ＋场所助词", registerLevel: 3,
      summary: "「どこ」本身只表示未知地点，具体功能由「に・で・へ・から・まで」决定。",
      formula: "どこ＋に／で／へ／から／まで", tags: ["地点", "基础", "场所"], searchTerms: ["哪里", "哪儿", "场所"],
      standard: ["駅はどこですか。", "车站在哪里？"], casual: ["今どこ？", "现在在哪儿？"],
      formal: ["会場はどちらでしょうか。", "请问会场在哪里？"], collocations: ["どこにある", "どこで買う", "どこへ行く", "どこから来る"],
      contrasts: ["正式场合询问地点可用「どちら」。"], mistakes: ["只说「どこ？」适合熟人，不适合正式对象。"],
      relatedIds: ["word-doko-de", "word-doko-ni", "word-doko-e", "comparison-place"]
    }),
    questionEncyclopediaEntry({
      id: "word-doko-de", type: "question-word", title: "どこで", subtitle: "询问动作发生的地点",
      purposeCategory: "地点", structureCategory: "疑问词＋で", registerLevel: 2,
      summary: "「どこで」用于询问购买、工作、见面、申请等动作在哪里进行。",
      formula: "どこで＋动作", tags: ["地点", "动作地点", "で", "高频"], searchTerms: ["在哪里做", "动作场所", "场所助词"],
      standard: ["どこで買いましたか。", "在哪里买的？"], casual: ["これ、どこで買ったの？", "这个在哪里买的？"],
      formal: ["こちらの商品はどちらで購入できますか。", "这件商品可以在哪里购买？"], collocations: ["どこで買う", "どこで働く", "どこで会う", "どこで申し込む"],
      contrasts: ["どこに：存在／到达地点", "どこへ：移动方向"], mistakes: ["错误：どこに買いましたか。", "自然：どこで買いましたか。"],
      relatedIds: ["word-doko-ni", "word-doko-e", "comparison-place"]
    }),
    questionEncyclopediaEntry({
      id: "word-doko-ni", type: "question-word", title: "どこに", subtitle: "询问存在地点或移动到达点",
      purposeCategory: "地点", structureCategory: "疑问词＋に", registerLevel: 2,
      summary: "与「ある・いる」搭配问存在地点，也可与「行く・置く」等问到达点或放置位置。",
      formula: "どこに＋ある／いる／行く／置く", tags: ["地点", "存在", "到达", "に"], searchTerms: ["在哪里存在", "到哪里", "放哪里"],
      standard: ["受付はどこにありますか。", "接待处在哪里？"], casual: ["鍵、どこに置いた？", "钥匙放哪儿了？"],
      formal: ["どちらにお掛けになりましたか。", "您打到哪里了？"], collocations: ["どこにある", "どこにいる", "どこに置く", "どこに行く"],
      contrasts: ["动作发生地点用「どこで」。", "强调方向可用「どこへ」。"], mistakes: ["错误：どこに食べましたか。", "自然：どこで食べましたか。"],
      relatedIds: ["word-doko-de", "word-doko-e", "comparison-place"]
    }),
    questionEncyclopediaEntry({
      id: "word-doko-e", type: "question-word", title: "どこへ", subtitle: "询问移动方向或目的地",
      purposeCategory: "地点", structureCategory: "疑问词＋へ", registerLevel: 2,
      summary: "与移动动词搭配，强调朝向何处；会话中「どこに行く」也很常见。",
      formula: "どこへ＋行く／向かう／移動する", tags: ["地点", "方向", "へ"], searchTerms: ["去哪里", "往哪里", "移动方向"],
      standard: ["これからどこへ行きますか。", "接下来去哪里？"], casual: ["次、どこ行く？", "接下来去哪儿？"],
      formal: ["この後はどちらへ向かわれますか。", "之后您将前往哪里？"], collocations: ["どこへ行く", "どこへ向かう", "どこへ移る"],
      contrasts: ["到达点可用「どこに」。", "动作地点不能使用「へ」。"], mistakes: ["错误：どこへ働いていますか。", "自然：どこで働いていますか。"],
      relatedIds: ["word-doko-ni", "word-doko-de", "comparison-place"]
    }),
    questionEncyclopediaEntry({
      id: "word-itsu", type: "question-word", title: "いつ", subtitle: "询问不确定的时间点",
      purposeCategory: "时间", structureCategory: "时间疑问词", registerLevel: 2,
      summary: "问日期、时段或时机；「いつ」后通常不加表示具体时点的「に」。",
      formula: "いつ＋谓语", tags: ["时间", "时机", "日程"], searchTerms: ["什么时候", "何时", "时间点"],
      standard: ["いつ日本に来ましたか。", "什么时候来日本的？"], casual: ["いつ会える？", "什么时候能见面？"],
      formal: ["いつ頃ご回答いただけますでしょうか。", "大约何时可以得到答复？"], collocations: ["いつ来る", "いつ始まる", "いつ頃", "いつでも"],
      contrasts: ["问具体钟点用「何時」。", "「いつに」通常不自然。"], mistakes: ["错误：いつに来ますか。", "自然：いつ来ますか。"],
      relatedIds: ["word-itsu-kara", "word-itsu-made", "word-itsu-made-ni", "purpose-time"]
    }),
    questionEncyclopediaEntry({
      id: "word-itsu-kara", type: "question-word", title: "いつから", subtitle: "询问开始时间",
      purposeCategory: "时间", structureCategory: "疑问词＋から", registerLevel: 2,
      summary: "用于询问课程、工作、营业、计划等从什么时候开始。",
      formula: "いつから＋开始／持续动作", tags: ["时间", "起点", "から"], searchTerms: ["从什么时候", "几点开始", "开始时间"],
      standard: ["受付はいつから始まりますか。", "受理从什么时候开始？"], casual: ["いつから休み？", "从什么时候开始放假？"],
      formal: ["新しい制度はいつから適用されますか。", "新制度从何时开始适用？"], collocations: ["いつから始まる", "いつから働く", "いつから使える"],
      contrasts: ["结束时间用「いつまで」。"], mistakes: ["开始点不要误用「まで」。"],
      relatedIds: ["word-itsu", "word-itsu-made", "comparison-time-limit"]
    }),
    questionEncyclopediaEntry({
      id: "word-itsu-made", type: "question-word", title: "いつまで", subtitle: "询问状态或动作持续到何时",
      purposeCategory: "时间", structureCategory: "疑问词＋まで", registerLevel: 2,
      summary: "关注持续终点，不要求动作在该时点前完成。",
      formula: "いつまで＋持续动作／状态", tags: ["时间", "终点", "持续"], searchTerms: ["到什么时候", "持续多久", "结束时间"],
      standard: ["この店はいつまで開いていますか。", "这家店营业到几点？"], casual: ["いつまで東京にいるの？", "在东京待到什么时候？"],
      formal: ["こちらの契約はいつまで有効でしょうか。", "这份合同有效到什么时候？"], collocations: ["いつまでいる", "いつまで続く", "いつまで使える"],
      contrasts: ["截止完成时间用「いつまでに」。"], mistakes: ["提交期限通常说「いつまでに提出」。"],
      relatedIds: ["word-itsu-made-ni", "comparison-time-limit"]
    }),
    questionEncyclopediaEntry({
      id: "word-itsu-made-ni", type: "question-word", title: "いつまでに", subtitle: "询问完成期限",
      purposeCategory: "时间", structureCategory: "疑问词＋までに", registerLevel: 2,
      summary: "要求某动作在指定时点之前完成，常用于提交、付款、回复和办理手续。",
      formula: "いつまでに＋完成性动作", tags: ["时间", "截止", "期限"], searchTerms: ["最晚什么时候", "截止日期", "期限"],
      standard: ["いつまでに申し込めばいいですか。", "最晚什么时候申请？"], casual: ["これ、いつまでに出せばいい？", "这个最晚什么时候交？"],
      formal: ["いつまでにご回答いただけますでしょうか。", "最晚何时能得到您的答复？"], collocations: ["いつまでに出す", "いつまでに払う", "いつまでに返事する"],
      contrasts: ["「いつまで」关注持续终点。", "「いつまでに」关注完成期限。"], mistakes: ["错误：いつまで提出しますか。", "自然：いつまでに提出しますか。"],
      relatedIds: ["word-itsu-made", "comparison-time-limit", "scene-workplace"]
    }),
    questionEncyclopediaEntry({
      id: "word-naze", type: "question-word", title: "なぜ", subtitle: "正式、书面或分析性地询问原因",
      purposeCategory: "原因", structureCategory: "原因疑问词", registerLevel: 2,
      summary: "比「どうして・なんで」更正式、客观，常用于说明、会议、报道和书面论述。",
      formula: "なぜ＋普通形／なぜ～のでしょうか", tags: ["原因", "正式", "书面"], searchTerms: ["为什么", "正式原因", "分析"],
      standard: ["なぜこの方法を選んだのですか。", "为什么选择这个方法？"], casual: ["なぜか分からない。", "不知道为什么。"],
      formal: ["なぜこの問題が発生したのでしょうか。", "为什么会发生这个问题？"], collocations: ["なぜ必要か", "なぜ起きたか", "なぜなら"],
      contrasts: ["日常关心式提问更常用「どうして」。", "朋友间使用会略显郑重。"], mistakes: ["语气虽正式，但直接追问仍可能给人压力。"],
      relatedIds: ["word-doushite", "word-nande", "comparison-reason"]
    }),
    questionEncyclopediaEntry({
      id: "word-doushite", type: "question-word", title: "どうして", subtitle: "中性地询问原因，也可带关心",
      purposeCategory: "原因", structureCategory: "原因疑问词", registerLevel: 3,
      summary: "日常和礼貌会话都常用；配合「んですか」可自然询问背景，但语调仍决定是否像质问。",
      formula: "どうして＋普通形／どうして～んですか", tags: ["原因", "中性", "关心"], searchTerms: ["为什么", "怎么会", "原因追问"],
      standard: ["どうしてそう思うんですか。", "为什么会这么想？"], casual: ["どうして来なかったの？", "为什么没来？"],
      formal: ["どうしてこの変更が必要なのでしょうか。", "为什么需要进行这项变更？"], collocations: ["どうして分かった", "どうして必要", "どうしてなの"],
      contrasts: ["「なぜ」更正式客观。", "「なんで」更口语直接。"], mistakes: ["连续追问「どうして？」可能让对方感到被逼问。"],
      relatedIds: ["word-naze", "word-nande", "comparison-reason", "pattern-n-desu-ka"]
    }),
    questionEncyclopediaEntry({
      id: "word-nande", type: "question-word", title: "なんで", subtitle: "口语中询问原因，也可能表示手段",
      purposeCategory: "原因", structureCategory: "口语疑问词", registerLevel: 4,
      summary: "朋友间非常常用，但对正式对象容易显得随便或带质问；上下文中也可能是「何で」的手段用法。",
      formula: "なんで＋普通形／なんで～の？", tags: ["原因", "口语", "直接"], searchTerms: ["为什么", "怎么", "口语原因", "何で"],
      standard: ["なんで予定が変わったんですか。", "为什么计划变了？"], casual: ["なんで分かったの？", "你怎么知道的？"],
      formal: ["変更の理由を伺ってもよろしいでしょうか。", "可以请教一下变更的理由吗？"], collocations: ["なんで来ない", "なんで知ってる", "なんでそうなる"],
      contrasts: ["正式场合改用「なぜ」或「どうして」。", "手段的「何で」可通过上下文区分。"], mistakes: ["对上司说「なんでですか」可能显得顶撞。"],
      relatedIds: ["word-naze", "word-doushite", "word-nani-de", "comparison-reason"]
    }),
    questionEncyclopediaEntry({
      id: "word-dou", type: "question-word", title: "どう", subtitle: "询问状态、评价或整体方式",
      purposeCategory: "状态", structureCategory: "副词性疑问词", registerLevel: 3,
      summary: "可问“怎么样”“如何看待”“处理得怎样”；若要具体操作步骤，通常用「どうやって」。",
      formula: "どう＋动词／どうですか／どう思いますか", tags: ["状态", "评价", "方式"], searchTerms: ["怎么样", "如何", "怎么看"],
      standard: ["新しい職場はどうですか。", "新工作环境怎么样？"], casual: ["これ、どうする？", "这个怎么办？"],
      formal: ["今後どのように対応されますか。", "今后将如何处理？"], collocations: ["どう思う", "どうする", "どうだった", "どのように"],
      contrasts: ["具体步骤用「どうやって」。", "工具手段用「何で」。"], mistakes: ["错误：駅までどうですか。若问交通方式应说「どうやって行きますか」。"],
      relatedIds: ["word-douyatte", "word-nani-de", "comparison-method"]
    }),
    questionEncyclopediaEntry({
      id: "word-nani-de", type: "question-word", title: "何で", subtitle: "询问工具、材料或交通手段",
      purposeCategory: "方法", structureCategory: "疑问词＋で", registerLevel: 3,
      summary: "「何で」可问用什么做、乘什么去；读作「なんで」时也可能被理解为“为什么”。",
      formula: "何で＋动作", tags: ["手段", "工具", "で", "歧义"], searchTerms: ["用什么", "坐什么", "交通工具", "材料"],
      standard: ["駅まで何で行きますか。", "坐什么去车站？"], casual: ["これ、何で切るの？", "这个用什么切？"],
      formal: ["どの交通手段でお越しになりますか。", "您将通过何种交通方式前来？"], collocations: ["何で行く", "何で切る", "何で作る", "何で払う"],
      contrasts: ["避免歧义可说「何を使って」。", "问步骤用「どうやって」。"], mistakes: ["对方误解为原因时，补充具体名词或改说「何を使って」。"],
      relatedIds: ["word-dou", "word-douyatte", "word-nande", "comparison-method"]
    }),
    questionEncyclopediaEntry({
      id: "word-douyatte", type: "question-word", title: "どうやって", subtitle: "询问具体方法、步骤或到达方式",
      purposeCategory: "方法", structureCategory: "方法疑问词", registerLevel: 3,
      summary: "期待对方说明过程或步骤，比单独的「どう」更具体。正式场合可用「どのように」。",
      formula: "どうやって＋动作", tags: ["方法", "步骤", "口语"], searchTerms: ["怎么做", "如何操作", "步骤", "怎么去"],
      standard: ["どうやって予約すればいいですか。", "应该怎么预约？"], casual: ["どうやって作ったの？", "怎么做出来的？"],
      formal: ["どのように申請すればよろしいでしょうか。", "应当如何申请？"], collocations: ["どうやって行く", "どうやって使う", "どうやって申し込む"],
      contrasts: ["工具本身用「何で」。", "状态评价用「どう」。"], mistakes: ["正式邮件中连续使用「どうやって」略显口语。"],
      relatedIds: ["word-dou", "word-nani-de", "comparison-method"]
    }),
    questionEncyclopediaEntry({
      id: "word-dore", type: "question-word", title: "どれ", subtitle: "从几个候选中选择一个",
      purposeCategory: "选择", structureCategory: "独立指示疑问词", registerLevel: 3,
      summary: "可以单独作名词使用，后面直接接助词；不需要再接名词。",
      formula: "どれ＋が／を／に", tags: ["选择", "候选", "独立使用"], searchTerms: ["哪一个", "哪个", "选择"],
      standard: ["どれが一番使いやすいですか。", "哪个最好用？"], casual: ["どれにする？", "选哪个？"],
      formal: ["どちらをご希望でしょうか。", "您希望哪一个？"], collocations: ["どれがいい", "どれを選ぶ", "どれにする"],
      contrasts: ["修饰名词用「どの」。", "问性质用「どんな」。"], mistakes: ["错误：どれ商品ですか。", "自然：どの商品ですか。"],
      relatedIds: ["word-dono", "word-donna", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-dono", type: "question-word", title: "どの", subtitle: "修饰名词，询问具体哪一个",
      purposeCategory: "选择", structureCategory: "连体疑问词＋名词", registerLevel: 3,
      summary: "「どの」不能单独使用，必须接名词，从可识别的候选中指定一个。",
      formula: "どの＋名词＋助词", tags: ["选择", "修饰名词", "连体词"], searchTerms: ["哪个人", "哪个东西", "哪份"],
      standard: ["どの電車に乗ればいいですか。", "应该坐哪趟电车？"], casual: ["どの店に行く？", "去哪家店？"],
      formal: ["どの資料をご参照になりましたか。", "您参考了哪份资料？"], collocations: ["どの商品", "どの人", "どの方法", "どの時点"],
      contrasts: ["独立使用时改用「どれ」。", "问类型特征时用「どんな」。"], mistakes: ["错误：どのが必要ですか。", "自然：どれが必要ですか。"],
      relatedIds: ["word-dore", "word-donna", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-donna", type: "question-word", title: "どんな", subtitle: "询问性质、种类或印象",
      purposeCategory: "事物", structureCategory: "连体疑问词＋名词", registerLevel: 3,
      summary: "不要求从固定候选中选择，而是期待对方描述特征、种类或印象。",
      formula: "どんな＋名词", tags: ["性质", "种类", "描述"], searchTerms: ["什么样的", "哪种", "性质"],
      standard: ["どんな仕事をしていますか。", "你从事什么样的工作？"], casual: ["どんな人だった？", "是个什么样的人？"],
      formal: ["どのような対応をご希望でしょうか。", "您希望得到怎样的处理？"], collocations: ["どんな人", "どんな仕事", "どんな感じ", "どのような"],
      contrasts: ["固定选项中选择用「どの」。", "「どういう」更关注定义、内容或背景。"], mistakes: ["问具体哪家店时不用「どんな店」，而用「どの店」。"],
      relatedIds: ["word-dono", "word-dore", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-ikura", type: "question-word", title: "いくら", subtitle: "询问价格、金额或不可数程度",
      purposeCategory: "价格", structureCategory: "数量疑问词", registerLevel: 2,
      summary: "最常用于价格，也可在「いくら考えても」等结构中表示“无论多少”。",
      formula: "名词＋はいくらですか", tags: ["价格", "金额", "购物"], searchTerms: ["多少钱", "价格", "费用"],
      standard: ["全部でいくらですか。", "一共多少钱？"], casual: ["これ、いくらだった？", "这个多少钱买的？"],
      formal: ["費用はおいくらになりますか。", "费用是多少？"], collocations: ["いくらですか", "いくらかかる", "おいくら"],
      contrasts: ["个数用「いくつ」。", "持续时间和程度常用「どのくらい」。"], mistakes: ["询问人数不要使用「いくら」。"],
      relatedIds: ["purpose-quantity", "word-dono-kurai", "scene-convenience-store"]
    }),
    questionEncyclopediaEntry({
      id: "word-dono-kurai", type: "question-word", title: "どのくらい", subtitle: "询问时间、距离、数量或程度的大致范围",
      purposeCategory: "数量", structureCategory: "程度疑问词", registerLevel: 2,
      summary: "适用范围很广，期待大致数值或程度；「どれくらい」在会话中同样自然。",
      formula: "どのくらい＋谓语／どのくらいの＋名词", tags: ["程度", "时间", "距离", "数量"], searchTerms: ["多久", "多远", "多少程度", "どれくらい", "どれほど"],
      standard: ["駅までどのくらいかかりますか。", "到车站需要多久？"], casual: ["どれくらい待った？", "等了多久？"],
      formal: ["完了までどの程度の期間を要しますか。", "完成大约需要多长时间？"], collocations: ["どのくらいかかる", "どのくらい遠い", "どのくらい必要"],
      contrasts: ["「どれほど」更书面，也可加强程度。", "具体个数优先用量词疑问。"], mistakes: ["问明确人数时说「何人」比「どのくらいの人」自然。"],
      relatedIds: ["purpose-quantity", "comparison-degree", "word-ikura"]
    }),
    questionEncyclopediaEntry({
      id: "word-dochira", type: "question-word", title: "どちら", subtitle: "礼貌询问方向、地点、人物或二选一",
      purposeCategory: "选择", structureCategory: "礼貌疑问词", registerLevel: 2,
      summary: "既可表示“哪一边”，也可作为「どこ・どっち・誰」的礼貌说法，具体意思由场景决定。",
      formula: "どちら＋助词／名词＋はどちらですか", tags: ["选择", "方向", "礼貌"], searchTerms: ["哪边", "哪位", "哪里礼貌说法"],
      standard: ["受付はどちらですか。", "接待处在哪里？"], casual: ["どっちにする？", "选哪个？"], formal: ["どちらさまでしょうか。", "请问您是哪位？"],
      collocations: ["どちらですか", "どちらへ", "どちらさま"], contrasts: ["朋友间二选一常用「どっち」。", "三个以上选项通常用「どれ」。"],
      mistakes: ["问人物时只说「どちらですか」可能不清楚，电话中常用「どちらさま」。"], relatedIds: ["word-docchi", "word-dore", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-docchi", type: "question-word", title: "どっち", subtitle: "口语中询问方向或二选一",
      purposeCategory: "选择", structureCategory: "口语疑问词", registerLevel: 4,
      summary: "是「どちら」的随意口语形式，适合朋友和家人，不宜直接用于正式接待。",
      formula: "どっち＋助词／どっちが＋形容词", tags: ["二选一", "方向", "口语"], searchTerms: ["哪个", "哪边", "二选一口语"],
      standard: ["どちらが使いやすいですか。", "哪一个更好用？"], casual: ["駅、どっち？", "车站在哪边？"], formal: ["どちらをご希望でしょうか。", "您希望哪一个？"],
      collocations: ["どっちがいい", "どっちに行く", "どっちでもいい"], contrasts: ["礼貌表达改用「どちら」。"],
      mistakes: ["对顾客说「どっちですか」显得过于随意。"], relatedIds: ["word-dochira", "word-dore", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-ikutsu", type: "question-word", title: "いくつ", subtitle: "询问个数或较泛的年龄",
      purposeCategory: "数量", structureCategory: "数量疑问词", registerLevel: 3,
      summary: "用于不特别指定量词的个数；询问成人年龄时通常用更礼貌的「おいくつ」。",
      formula: "名词＋はいくつありますか", tags: ["个数", "年龄", "数量"], searchTerms: ["几个", "多少个", "多大年龄"],
      standard: ["必要なファイルはいくつありますか。", "需要几个文件？"], casual: ["りんご、いくついる？", "苹果要几个？"], formal: ["失礼ですが、おいくつでいらっしゃいますか。", "冒昧问一下，您多大年纪？"],
      collocations: ["いくつある", "いくつ必要", "おいくつ"], contrasts: ["可数对象有固定量词时，「何枚・何本」更具体。", "价格使用「いくら」。"],
      mistakes: ["正式场合直接问成人「何歳ですか」可能过于直接。"], relatedIds: ["word-ikura", "purpose-quantity"]
    }),
    questionEncyclopediaEntry({
      id: "word-nanji", type: "question-word", title: "何時", subtitle: "询问钟点",
      purposeCategory: "时间", structureCategory: "时间疑问词", registerLevel: 2,
      summary: "读作「なんじ」，询问具体几点；询问日期或宽泛时段时改用其他时间疑问词。",
      formula: "何時に＋动作／何時から・まで", tags: ["时间", "钟点", "几点"], searchTerms: ["なんじ", "几点", "什么时候钟点"],
      standard: ["会議は何時に始まりますか。", "会议几点开始？"], casual: ["何時に着く？", "几点到？"], formal: ["何時ごろお伺いすればよろしいでしょうか。", "我大约几点拜访合适？"],
      collocations: ["何時に", "何時から", "何時まで", "何時ごろ"], contrasts: ["不要求具体钟点时使用「いつ」。"],
      mistakes: ["表示动作时间点通常说「何時に」，但谓语是「始まる」时主题也可说「会議は何時からですか」。"], relatedIds: ["word-itsu", "word-itsu-kara", "purpose-time"]
    }),
    questionEncyclopediaEntry({
      id: "word-nanyoubi", type: "question-word", title: "何曜日", subtitle: "询问星期几",
      purposeCategory: "时间", structureCategory: "时间疑问词", registerLevel: 2,
      summary: "读作「なんようび」，用于确认每周日程中的星期。",
      formula: "何曜日に＋动作／何曜日ですか", tags: ["星期", "日程", "时间"], searchTerms: ["なんようび", "星期几", "周几"],
      standard: ["定休日は何曜日ですか。", "休息日是星期几？"], casual: ["次、何曜日に会う？", "下次周几见？"], formal: ["面接は何曜日をご希望でしょうか。", "面试您希望安排在星期几？"],
      collocations: ["何曜日ですか", "何曜日に", "毎週何曜日"], contrasts: ["问具体日期用「何日」，问宽泛时间用「いつ」。"],
      mistakes: ["星期读法使用「ようび」，不是日期的「にち」。"], relatedIds: ["word-itsu", "purpose-time"]
    }),
    questionEncyclopediaEntry({
      id: "word-dore-kurai", type: "question-word", title: "どれくらい", subtitle: "会话中询问大致程度、时间或距离",
      purposeCategory: "数量", structureCategory: "程度疑问词", registerLevel: 3,
      summary: "与「どのくらい」基本同义，在日常口语中很常见；正式报告中可改用「どの程度」。",
      formula: "どれくらい＋谓语", tags: ["程度", "时间", "口语"], searchTerms: ["多久", "多大程度", "多远"],
      standard: ["完成までどれくらいかかりますか。", "到完成需要多久？"], casual: ["どれくらい待てる？", "能等多久？"], formal: ["完了までどの程度かかる見込みでしょうか。", "预计到完成需要多长时间？"],
      collocations: ["どれくらいかかる", "どれくらい必要", "どれくらい遠い"], contrasts: ["「どのくらい」同义且语体更中性。", "「どれほど」较书面或带强调。"],
      mistakes: ["询问明确个数时优先使用量词疑问。"], relatedIds: ["word-dono-kurai", "comparison-degree"]
    }),
    questionEncyclopediaEntry({
      id: "word-douiu", type: "question-word", title: "どういう", subtitle: "询问具体含义、内容、关系或背景",
      purposeCategory: "事物", structureCategory: "疑问词＋名词", registerLevel: 3,
      summary: "比「どんな」更聚焦“究竟是什么内容、以什么定义或理由成立”。",
      formula: "どういう＋名词＋ですか", tags: ["含义", "内容", "背景"], searchTerms: ["什么意思", "怎么回事", "怎样的内容"],
      standard: ["それはどういう意味ですか。", "那是什么意思？"], casual: ["どういうこと？", "怎么回事？"], formal: ["具体的にはどのような趣旨でしょうか。", "具体而言是什么宗旨？"],
      collocations: ["どういう意味", "どういうこと", "どういう関係"], contrasts: ["问性质印象时常用「どんな」。", "正式表达可用「どのような」。"],
      mistakes: ["重读「どういうことですか」可能带追责感，正式场合可先说「確認ですが」。"], relatedIds: ["word-donna", "pattern-to-iu-koto-desu-ka", "comparison-choice-quality"]
    }),
    questionEncyclopediaEntry({
      id: "word-nanno", type: "question-word", title: "何の", subtitle: "询问名词的种类、所属或内容",
      purposeCategory: "事物", structureCategory: "何＋の＋名词", registerLevel: 3,
      summary: "「何」通过「の」修饰后面的名词，期待种类或内容，而不是从既有候选中选择。",
      formula: "何の＋名词＋ですか", tags: ["种类", "所属", "内容"], searchTerms: ["什么的", "哪一类", "なんの"],
      standard: ["これは何の書類ですか。", "这是什么文件？"], casual: ["何の話？", "什么事？"], formal: ["何の目的でご利用になりますか。", "您出于什么目的使用？"],
      collocations: ["何のため", "何の話", "何の書類"], contrasts: ["固定候选中的哪一个用「どの＋名词」。"],
      mistakes: ["「何の」必须继续接名词，不能像「何」那样独立使用。"], relatedIds: ["word-nani", "word-dono", "comparison-choice-quality"]
    })
  ],

  questionPatterns: [
    questionEncyclopediaEntry({
      id: "pattern-desu-ka", type: "pattern", title: "～ですか", subtitle: "礼貌地确认名词或状态",
      purposeCategory: "确认信息", structureCategory: "名词／形容词＋ですか", registerLevel: 2,
      summary: "最基础的礼貌疑问句；适合未知信息和单纯确认，不自动包含背景追问。",
      formula: "名词／ナ形容词＋ですか／イ形容词＋ですか", tags: ["确认", "礼貌", "基础句尾"], searchTerms: ["是不是", "吗", "确认信息"],
      standard: ["こちらが申込書ですか。", "这是申请表吗？"], casual: ["これ、申込書？", "这是申请表？"],
      formal: ["こちらが正式な申請書でしょうか。", "请问这是正式申请表吗？"], collocations: ["誰ですか", "大丈夫ですか", "必要ですか"],
      contrasts: ["「～んですか」带有背景或意外感。", "正式而委婉可用「～でしょうか」。"], mistakes: ["对朋友每句都加「か」会显得生硬。"],
      relatedIds: ["pattern-masu-ka", "pattern-n-desu-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-masu-ka", type: "pattern", title: "～ますか", subtitle: "礼貌询问动作、习惯或计划",
      purposeCategory: "计划", structureCategory: "动词ます形＋か", registerLevel: 2,
      summary: "用于中性地问对方是否做某事；若真正意图是请求别人做事，需改用请求句型。",
      formula: "动词ます形＋か", tags: ["动作", "计划", "礼貌"], searchTerms: ["会不会做", "要做吗", "动作询问"],
      standard: ["明日の会議に参加しますか。", "参加明天的会议吗？"], casual: ["明日の会議、出る？", "参加明天的会吗？"],
      formal: ["明日の会議にはご出席になりますか。", "您会出席明天的会议吗？"], collocations: ["行きますか", "使いますか", "参加しますか"],
      contrasts: ["邀请常用「～ませんか」。", "请求动作常用「～てもらえますか」。"], mistakes: ["「窓を開けますか」是在问对方是否开，不是自然请求。"],
      relatedIds: ["pattern-masen-ka", "pattern-te-moraemasu-ka", "mistake-request-masu-ka"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-mashita-ka", type: "pattern", title: "～ましたか", subtitle: "确认动作是否已经发生或完成",
      purposeCategory: "是否完成", structureCategory: "动词过去礼貌形＋か", registerLevel: 2,
      summary: "询问既定动作是否完成；若关心结果状态，可结合「もう」或「～ていますか」。",
      formula: "（もう）＋动词ました形＋か", tags: ["完成", "过去", "确认"], searchTerms: ["做完了吗", "已经了吗", "过去动作"],
      standard: ["もう申請しましたか。", "已经申请了吗？"], casual: ["もう申し込んだ？", "已经申请了？"],
      formal: ["申請手続きはお済みでしょうか。", "申请手续是否已经办妥？"], collocations: ["もう食べましたか", "確認しましたか", "終わりましたか"],
      contrasts: ["经历询问用「～たことがありますか」。"], mistakes: ["对尚未到期限的任务连问会产生催促感。"],
      relatedIds: ["pattern-ta-koto-ga-arimasu-ka", "comparison-ending"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-ta-koto-ga-arimasu-ka", type: "pattern", title: "～たことがありますか", subtitle: "询问是否有过某种经历",
      purposeCategory: "经历", structureCategory: "动词た形＋ことがある", registerLevel: 2,
      summary: "询问人生经历，不用于询问刚刚或某个明确时间发生的单次事件。",
      formula: "动词た形＋ことがありますか", tags: ["经历", "经验", "礼貌"], searchTerms: ["有没有过", "曾经", "经验"],
      standard: ["日本で働いたことがありますか。", "你曾经在日本工作过吗？"], casual: ["北海道に行ったことある？", "去过北海道吗？"],
      formal: ["同様の業務を担当されたご経験はありますか。", "您是否有负责类似工作的经验？"], collocations: ["行ったことがある", "使ったことがある", "見たことがある"],
      contrasts: ["明确过去时间用「～ましたか」。"], mistakes: ["错误：昨日行ったことがありますか。", "自然：昨日行きましたか。"],
      relatedIds: ["pattern-mashita-ka", "scene-job-interview"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-masen-ka", type: "pattern", title: "～ませんか", subtitle: "礼貌邀请或提出共同活动",
      purposeCategory: "邀请", structureCategory: "动词ません形＋か", registerLevel: 2,
      summary: "形式是否定疑问，实际常是给对方保留拒绝空间的邀请。",
      formula: "动词ます词干＋ませんか", tags: ["邀请", "提议", "礼貌"], searchTerms: ["要不要一起", "邀请", "否定疑问"],
      standard: ["一緒に昼ご飯を食べませんか。", "要不要一起吃午饭？"], casual: ["今度、一緒に行かない？", "下次一起去吗？"],
      formal: ["もしよろしければ、ご参加いただけませんか。", "如果方便的话，您能参加吗？"], collocations: ["行きませんか", "食べませんか", "参加しませんか"],
      contrasts: ["「～ますか」只是询问计划。", "「～ましょうか」常表示主动提议。"], mistakes: ["不要只按字面理解为“难道不……吗”。"],
      relatedIds: ["pattern-mashou-ka", "comparison-request", "mistake-masen-ka"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-mashou-ka", type: "pattern", title: "～ましょうか", subtitle: "主动提出帮助或共同决定",
      purposeCategory: "主动提供帮助", structureCategory: "动词意志礼貌形＋か", registerLevel: 2,
      summary: "可表示“我来……吗”或“一起……吧？”；语境决定是主动帮助还是共同提议。",
      formula: "动词ます词干＋ましょうか", tags: ["主动帮助", "提议", "礼貌"], searchTerms: ["我来吧", "要不要我", "一起吧"],
      standard: ["荷物を持ちましょうか。", "我来帮你拿行李吧？"], casual: ["手伝おうか。", "要我帮忙吗？"],
      formal: ["こちらでお調べいたしましょうか。", "是否需要我方为您查询？"], collocations: ["持ちましょうか", "調べましょうか", "お送りしましょうか"],
      contrasts: ["邀请对方参加多用「～ませんか」。"], mistakes: ["对上级提出共同决定时要注意不要显得替对方做主。"],
      relatedIds: ["pattern-masen-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-temo-ii-desu-ka", type: "pattern", title: "～てもいいですか", subtitle: "请求许可做某事",
      purposeCategory: "请求许可", structureCategory: "动词て形＋もいい", registerLevel: 2,
      summary: "询问自己的行为是否被允许；正式对象可加缓冲语或使用「よろしいでしょうか」。",
      formula: "动词て形＋もいいですか", tags: ["许可", "请求", "礼貌"], searchTerms: ["可以做吗", "允许", "请求许可"],
      standard: ["ここに座ってもいいですか。", "可以坐这里吗？"], casual: ["これ、使ってもいい？", "这个可以用吗？"],
      formal: ["こちらに記入してもよろしいでしょうか。", "可以填写在这里吗？"], collocations: ["入ってもいい", "使ってもいい", "休んでもいい"],
      contrasts: ["能力询问「できますか」不等于许可。", "可否无妨可用「～ても大丈夫ですか」。"], mistakes: ["错误：ここで写真ができますか。", "自然：ここで写真を撮ってもいいですか。"],
      relatedIds: ["pattern-temo-daijoubu-desu-ka", "mistake-dekiru-permission"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-temo-daijoubu-desu-ka", type: "pattern", title: "～ても大丈夫ですか", subtitle: "确认某行为是否会造成问题",
      purposeCategory: "请求许可", structureCategory: "动词て形＋も大丈夫", registerLevel: 3,
      summary: "比单纯许可更强调“这样做不会有问题吗”，适合时间、方式或身体条件的确认。",
      formula: "动词て形＋も大丈夫ですか", tags: ["许可", "无妨", "确认"], searchTerms: ["没问题吗", "这样可以吗", "是否方便"],
      standard: ["明日提出しても大丈夫ですか。", "明天提交也没问题吗？"], casual: ["少し遅れても大丈夫？", "晚一点没问题吗？"],
      formal: ["予定を来週に変更しても差し支えないでしょうか。", "将计划改到下周是否会有不便？"], collocations: ["遅れても大丈夫", "変更しても大丈夫", "食べても大丈夫"],
      contrasts: ["一般许可用「～てもいいですか」。", "更正式可用「差し支えないでしょうか」。"], mistakes: ["对法规许可不要只凭「大丈夫」判断，应明确问规则。"],
      relatedIds: ["pattern-temo-ii-desu-ka", "scene-workplace"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-te-kuremasu-ka", type: "pattern", title: "～てくれますか", subtitle: "直接请求对方为自己做事",
      purposeCategory: "请求别人做事", structureCategory: "动词て形＋くれる", registerLevel: 3,
      summary: "礼貌形式但仍较直接，适合关系较近或职责明确的对象；对上级通常换用更委婉句型。",
      formula: "动词て形＋くれますか", tags: ["请求", "直接", "关系较近"], searchTerms: ["能帮我吗", "请你做", "くれる"],
      standard: ["少し待ってくれますか。", "可以稍等一下吗？"], casual: ["これ、見てくれる？", "能帮我看看这个吗？"],
      formal: ["こちらをご確認いただけますか。", "可以请您确认一下吗？"], collocations: ["待ってくれる", "見てくれる", "手伝ってくれる"],
      contrasts: ["「～てもらえますか」把焦点放在自己获得帮助，更柔和。"], mistakes: ["对顾客或上司使用可能显得要求感较强。"],
      relatedIds: ["pattern-te-moraemasu-ka", "pattern-te-itadakemasu-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-te-moraemasu-ka", type: "pattern", title: "～てもらえますか", subtitle: "礼貌而自然地请求帮助",
      purposeCategory: "请求别人做事", structureCategory: "动词て形＋もらえる", registerLevel: 2,
      summary: "日常礼貌请求非常常用，比「～てくれますか」柔和，但对重要正式对象仍可升级为「いただけますか」。",
      formula: "动词て形＋もらえますか", tags: ["请求", "帮助", "礼貌"], searchTerms: ["可以帮我", "请求别人", "もらう"],
      standard: ["もう一度説明してもらえますか。", "可以再说明一次吗？"], casual: ["ちょっと手伝ってもらえる？", "能稍微帮一下吗？"],
      formal: ["もう一度ご説明いただけますでしょうか。", "能否请您再说明一次？"], collocations: ["見てもらう", "教えてもらう", "確認してもらう"],
      contrasts: ["更正式用「～ていただけますか」。", "更委婉可用否定可能「～ていただけないでしょうか」。"], mistakes: ["不要用「～ますか」代替请求而造成意图不清。"],
      relatedIds: ["pattern-te-itadakemasu-ka", "pattern-te-itadakenai-deshou-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-te-itadakemasu-ka", type: "pattern", title: "～ていただけますか", subtitle: "对正式对象礼貌请求",
      purposeCategory: "请求别人做事", structureCategory: "动词て形＋いただける", registerLevel: 1,
      summary: "适合顾客、老师、上司和商务往来；仍是明确请求，可结合「恐れ入りますが」缓冲。",
      formula: "（恐れ入りますが）＋动词て形＋いただけますか", tags: ["请求", "正式", "职场"], searchTerms: ["请您", "商务请求", "いただく"],
      standard: ["こちらにご記入いただけますか。", "可以请您填写这里吗？"], casual: ["ここに書いてもらえる？", "能写在这里吗？"],
      formal: ["恐れ入りますが、本日中にご確認いただけますでしょうか。", "劳驾，能否请您在今天内确认？"], collocations: ["確認していただく", "教えていただく", "お送りいただく"],
      contrasts: ["更委婉用「～ていただけないでしょうか」。"], mistakes: ["礼貌形式不等于请求负担小，仍需考虑期限和对方职责。"],
      relatedIds: ["pattern-te-moraemasu-ka", "pattern-te-itadakenai-deshou-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-te-itadakenai-deshou-ka", type: "pattern", title: "～ていただけないでしょうか", subtitle: "非常委婉地提出正式请求",
      purposeCategory: "请求别人做事", structureCategory: "否定可能＋でしょうか", registerLevel: 1,
      summary: "通过否定可能和推量降低强迫感，适合负担较大或需要特别照顾的请求。",
      formula: "动词て形＋いただけないでしょうか", tags: ["请求", "郑重", "委婉"], searchTerms: ["能否请您", "非常礼貌请求", "负担较大"],
      standard: ["日程を変更していただけないでしょうか。", "能否请您调整一下日程？"], casual: ["予定、変えてもらえない？", "能不能改一下安排？"],
      formal: ["誠に恐縮ですが、期限をご延長いただけないでしょうか。", "非常抱歉，能否请您延长期限？"], collocations: ["変更していただけない", "ご検討いただけない", "お待ちいただけない"],
      contrasts: ["普通职场请求不必每次都使用如此郑重的形式。"], mistakes: ["过度使用会使简单事务显得距离很远。"],
      relatedIds: ["pattern-te-itadakemasu-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-ta-hou-ga-ii-desu-ka", type: "pattern", title: "～たほうがいいですか", subtitle: "询问是否更应该采取某行动",
      purposeCategory: "询问建议", structureCategory: "动词た形＋ほうがいい", registerLevel: 2,
      summary: "在两个方向之间征求建议，常含“这样做是不是更好”的预设。",
      formula: "动词た形＋ほうがいいですか", tags: ["建议", "选择", "比较"], searchTerms: ["是不是最好", "应该吗", "建议"],
      standard: ["事前に予約したほうがいいですか。", "最好提前预约吗？"], casual: ["病院に行ったほうがいい？", "最好去医院吗？"],
      formal: ["先に担当者へご相談したほうがよろしいでしょうか。", "是否最好先向负责人咨询？"], collocations: ["行ったほうがいい", "確認したほうがいい", "待ったほうがいい"],
      contrasts: ["问具体做法用「～ればいいですか」。"], mistakes: ["并非所有建议都需要二选一，开放询问可说「どうすればいいですか」。"],
      relatedIds: ["pattern-reba-ii-desu-ka", "pattern-tara-ii-desu-ka", "comparison-advice"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-reba-ii-desu-ka", type: "pattern", title: "～ればいいですか", subtitle: "询问实现目的所需的方法",
      purposeCategory: "询问建议", structureCategory: "条件形＋いい", registerLevel: 2,
      summary: "期待对方给出具体行动方案，常与「どうすれば」搭配。",
      formula: "どう＋动词条件形＋いいですか", tags: ["建议", "方法", "条件形"], searchTerms: ["该怎么办", "怎样才好", "具体方法"],
      standard: ["どこで申し込めばいいですか。", "应该在哪里申请？"], casual: ["次はどうすればいい？", "接下来怎么办？"],
      formal: ["どちらへ伺えばよろしいでしょうか。", "我应该前往哪里？"], collocations: ["どうすればいい", "誰に聞けばいい", "どこへ行けばいい"],
      contrasts: ["「～たらいいですか」口语更柔和。", "「～たほうがいいですか」带比较预设。"], mistakes: ["正式场合可将「いい」换成「よろしい」。"],
      relatedIds: ["pattern-ta-hou-ga-ii-desu-ka", "pattern-tara-ii-desu-ka", "comparison-advice"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-tara-ii-desu-ka", type: "pattern", title: "～たらいいですか", subtitle: "口语中柔和询问做法或建议",
      purposeCategory: "询问建议", structureCategory: "たら条件＋いい", registerLevel: 3,
      summary: "与「～ればいいですか」意思接近，会话中更柔和自然。",
      formula: "どう＋动词たら形＋いいですか", tags: ["建议", "口语", "方法"], searchTerms: ["怎么办好", "怎么做", "たら"],
      standard: ["予約を変更したい場合はどうしたらいいですか。", "想改预约时该怎么办？"], casual: ["これ、どうしたらいい？", "这个怎么办？"],
      formal: ["変更を希望する場合、どのように対応すればよろしいでしょうか。", "如希望变更，应如何办理？"], collocations: ["どうしたらいい", "誰に聞いたらいい", "いつ行ったらいい"],
      contrasts: ["正式说明中更常用「～ればよろしいでしょうか」。"], mistakes: ["不要和建议别人用的「～たらどうですか」混淆。"],
      relatedIds: ["pattern-reba-ii-desu-ka", "comparison-advice"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-n-desu-ka", type: "pattern", title: "～んですか", subtitle: "询问背景、理由或出乎预期的信息",
      purposeCategory: "询问背景", structureCategory: "普通形＋んですか", registerLevel: 3,
      summary: "不是单纯给问句加礼貌，而是暗示说话人看到了线索，想知道背景、原因或进一步说明。",
      formula: "普通形＋んですか（名词／ナ形容词＋なんですか）", tags: ["背景", "说明", "关心", "惊讶"], searchTerms: ["怎么回事", "为什么会", "背景追问", "の？"],
      standard: ["今日はお休みなんですか。", "今天休息吗？（看到某种迹象后询问）"], casual: ["もう帰るの？", "已经要回去了吗？"],
      formal: ["こちらをご希望なのですか。", "您希望选择这个吗？"], collocations: ["どうしたんですか", "行かないんですか", "必要なんですか"],
      contrasts: ["「～ですか」是中性确认。", "「～のですか」较正式或书面。"], mistakes: ["所有问句都使用「んですか」会制造不必要的追问感。"],
      relatedIds: ["pattern-no-desu-ka", "pattern-desu-ka", "comparison-ending", "mistake-overuse-n-desu-ka"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-no-desu-ka", type: "pattern", title: "～のですか", subtitle: "正式、完整地询问背景或说明",
      purposeCategory: "询问背景", structureCategory: "普通形＋のですか", registerLevel: 1,
      summary: "功能接近「んですか」，但更完整、正式，常见于说明、采访、书面或郑重会话。",
      formula: "普通形＋のですか", tags: ["背景", "正式", "说明"], searchTerms: ["为何如此", "正式背景", "のです"],
      standard: ["なぜ参加されないのですか。", "为什么不参加呢？"], casual: ["なんで参加しないの？", "为什么不参加？"],
      formal: ["どのような経緯で決定されたのですか。", "这是经过怎样的过程决定的？"], collocations: ["なぜ～のですか", "どういうことなのですか"],
      contrasts: ["会话中「んですか」更自然。", "语气过硬时正式形式仍可能像质问。"], mistakes: ["不要以为形式完整就一定委婉。"],
      relatedIds: ["pattern-n-desu-ka", "comparison-ending"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-deshou-ka", type: "pattern", title: "～でしょうか", subtitle: "委婉、留有余地地询问或确认",
      purposeCategory: "确认信息", structureCategory: "普通形／名词＋でしょうか", registerLevel: 1,
      summary: "降低断定感，适合客服、职场、正式确认，也可表达说话人确实不确定。",
      formula: "普通形／名词＋でしょうか", tags: ["正式", "委婉", "确认"], searchTerms: ["请问是否", "会不会", "でしょうか"],
      standard: ["明日は営業していますでしょうか。", "请问明天营业吗？"], casual: ["明日、開いてるかな。", "明天开门吗？"],
      formal: ["こちらの認識で問題ございませんでしょうか。", "请问按这一理解是否没有问题？"], collocations: ["よろしいでしょうか", "可能でしょうか", "いつでしょうか"],
      contrasts: ["单纯礼貌询问用「～ですか」即可。", "「～のでしょうか」更强调推测背景。"], mistakes: ["简单日常问题过度使用会显得疏远。"],
      relatedIds: ["pattern-desu-ka", "pattern-n-desu-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-to-iu-koto-desu-ka", type: "pattern", title: "～ということですか", subtitle: "确认自己对信息或结论的理解",
      purposeCategory: "确认自己的理解", structureCategory: "普通形＋ということ", registerLevel: 2,
      summary: "把对方的话重新概括后确认，适合澄清规则、结论和下一步安排。",
      formula: "普通形＋ということですか", tags: ["理解确认", "复述", "职场"], searchTerms: ["也就是说", "我的理解是", "确认结论"],
      standard: ["予約は変更できないということですか。", "也就是说预约不能更改吗？"], casual: ["今日は来ないってこと？", "也就是说今天不来？"],
      formal: ["来週から新しい手順に変わるという理解でよろしいでしょうか。", "我理解为从下周起改用新流程，可以吗？"], collocations: ["つまり～ということ", "～という理解", "～という意味"],
      contrasts: ["「～んですか」更像追问背景。", "「～じゃないですか」常带寻求认同。"], mistakes: ["复述错误可能让对方感到被曲解，最好保留确认余地。"],
      relatedIds: ["pattern-tte-koto-desu-ka", "comparison-confirmation", "scene-workplace"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-tte-koto-desu-ka", type: "pattern", title: "～ってことですか", subtitle: "口语中确认理解或结论",
      purposeCategory: "确认自己的理解", structureCategory: "普通形＋ってこと", registerLevel: 3,
      summary: "是「～ということですか」的口语形式，适合朋友和较轻松的职场会话。",
      formula: "普通形＋ってことですか／ってこと？", tags: ["理解确认", "口语", "复述"], searchTerms: ["就是说", "也就是说", "ってこと"],
      standard: ["現地集合ってことですか。", "也就是说在现场集合吗？"], casual: ["今日は中止ってこと？", "就是说今天取消？"],
      formal: ["本日は中止ということでよろしいでしょうか。", "确认一下，今天取消对吗？"], collocations: ["～ってこと？", "つまり～ってこと"],
      contrasts: ["对顾客或正式对象使用完整的「ということですか」。"], mistakes: ["正式邮件中避免使用「って」。"],
      relatedIds: ["pattern-to-iu-koto-desu-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-ka-dou-ka", type: "pattern", title: "～かどうか", subtitle: "把“是否”嵌入句子中",
      purposeCategory: "间接疑问", structureCategory: "普通形＋かどうか", registerLevel: 2,
      summary: "用于“不知道是否、确认是否、判断是否”等间接疑问，不直接要求对方回答时尤其常见。",
      formula: "普通形＋かどうか＋分かる／確認する／決める", tags: ["间接疑问", "是否", "嵌入句"], searchTerms: ["是否", "かどうか", "间接问句"],
      standard: ["参加できるかどうか教えてください。", "请告诉我是否能参加。"], casual: ["行くかどうか、まだ決めてない。", "还没决定去不去。"],
      formal: ["対応が可能かどうかご確認いただけますか。", "能否请您确认是否可以处理？"], collocations: ["できるかどうか", "必要かどうか", "正しいかどうか"],
      contrasts: ["有疑问词时通常不用「どうか」，如「いつ来るか」。"], mistakes: ["错误：いつ来るかどうか。", "自然：いつ来るか。"],
      relatedIds: ["pattern-question-word-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-question-word-ka", type: "pattern", title: "疑问词＋普通形＋か", subtitle: "把具体未知信息嵌入句子中",
      purposeCategory: "间接疑问", structureCategory: "疑问词＋普通形＋か", registerLevel: 2,
      summary: "用于“知道在哪里、问什么时候、确认由谁负责”等；嵌入句内部一般使用普通形。",
      formula: "疑问词＋普通形＋か＋分かる／知る／聞く", tags: ["间接疑问", "嵌入句", "普通形"], searchTerms: ["不知道哪里", "知道什么时候", "疑问词加か"],
      standard: ["会議が何時に始まるか分かりますか。", "你知道会议几点开始吗？"], casual: ["どこにあるか知ってる？", "知道在哪里吗？"],
      formal: ["どなたがご担当か教えていただけますか。", "能否告知由哪位负责？"], collocations: ["どこにあるか", "いつ来るか", "誰が担当か"],
      contrasts: ["是否二选一用「～かどうか」。"], mistakes: ["错误：何時に始まりますか分かりますか。", "自然：何時に始まるか分かりますか。"],
      relatedIds: ["pattern-ka-dou-ka", "mistake-indirect-question"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-to-omoimasu-ka", type: "pattern", title: "～と思いますか", subtitle: "询问对方的判断、预测或意见",
      purposeCategory: "询问意见", structureCategory: "普通形＋と思う", registerLevel: 2,
      summary: "适合开放询问对方怎么看；若要询问对某方案的评价，也可用「どう思いますか」。",
      formula: "普通形＋と思いますか／どう思いますか", tags: ["意见", "判断", "预测"], searchTerms: ["你觉得", "怎么看", "认为吗"],
      standard: ["この方法が一番いいと思いますか。", "你认为这个方法最好吗？"], casual: ["これ、どう思う？", "你怎么看这个？"],
      formal: ["今後どのような影響があるとお考えでしょうか。", "您认为今后会有怎样的影响？"], collocations: ["どう思う", "必要だと思う", "可能だと思う"],
      contrasts: ["「～ですか」只确认事实，不一定要求意见。"], mistakes: ["过度加入「あなたは」会像翻译腔。"],
      relatedIds: ["purpose-opinion", "mistake-overuse-anata"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-janai-desu-ka", type: "pattern", title: "～じゃないですか", subtitle: "寻求认同、提醒或带立场地确认",
      purposeCategory: "寻求认同", structureCategory: "普通形＋じゃないですか", registerLevel: 3,
      summary: "并非单纯否定疑问，常暗示说话人已有判断，希望对方认同；语气强时可能像反驳。",
      formula: "普通形／名词＋じゃないですか", tags: ["认同", "提醒", "反问", "立场"], searchTerms: ["不是吗", "对吧", "寻求认同"],
      standard: ["この方法のほうが分かりやすいんじゃないですか。", "这个方法不是更容易理解吗？"], casual: ["もう時間ないんじゃない？", "是不是已经没时间了？"],
      formal: ["別の可能性も考えられるのではないでしょうか。", "是否也应考虑其他可能性？"], collocations: ["いいんじゃない", "必要じゃないですか", "～のではないでしょうか"],
      contrasts: ["中性确认用「～ですか」。", "「～んじゃないですか」更强调推断或背景。"], mistakes: ["对上级直接使用可能带反驳感。"],
      relatedIds: ["comparison-confirmation", "mistake-questioning-tone", "comparison-ending"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-tewa-ikemasen-ka", type: "pattern", title: "～てはいけませんか", subtitle: "确认某行为是否被禁止",
      purposeCategory: "请求许可", structureCategory: "て形＋はいけませんか", registerLevel: 3,
      summary: "字面是在问“这样做不行吗”，常带反驳禁止或寻求例外的预设，并非中性的许可问法。",
      formula: "动词て形＋はいけませんか", tags: ["禁止", "许可", "反问"], searchTerms: ["不可以吗", "禁止确认", "许可"],
      standard: ["ここに荷物を置いてはいけませんか。", "这里不能放行李吗？"], casual: ["ここ、座っちゃだめ？", "这里不能坐吗？"], formal: ["こちらに記入してはいけないのでしょうか。", "这里是不可以填写吗？"],
      collocations: ["入ってはいけませんか", "使ってはいけませんか"], contrasts: ["中性请求许可用「～てもいいですか」。"], mistakes: ["没有禁止背景时使用会显得在挑战规则。"], relatedIds: ["pattern-temo-ii-desu-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-te-moratte-mo-ii", type: "pattern", title: "～てもらってもいいですか", subtitle: "较口语地请求对方为自己做事",
      purposeCategory: "请求别人做事", structureCategory: "て形＋もらってもいいですか", registerLevel: 3,
      summary: "把“能否让我得到这个帮助”说成许可问句，日常服务场景自然，但不如「いただけますか」郑重。",
      formula: "动词て形＋もらってもいいですか", tags: ["请求", "口语", "许可式请求"], searchTerms: ["能帮我吗", "请求别人", "てもらってもいい"],
      standard: ["ここに名前を書いてもらってもいいですか。", "可以请你在这里写名字吗？"], casual: ["ちょっと見てもらってもいい？", "能帮我看一下吗？"], formal: ["こちらをご確認いただけますでしょうか。", "能否请您确认一下这里？"],
      collocations: ["見てもらってもいい", "待ってもらってもいい"], contrasts: ["更简洁用「～てもらえますか」。", "正式对象用「～ていただけますか」。"], mistakes: ["对上司提出负担较大的请求时仍可能偏随意。"], relatedIds: ["pattern-te-moraemasu-ka", "pattern-te-itadakemasu-ka", "comparison-request"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-n-deshou-ka", type: "pattern", title: "～んでしょうか", subtitle: "带背景地委婉推测或追问",
      purposeCategory: "询问背景", structureCategory: "普通形＋んでしょうか", registerLevel: 2,
      summary: "把「んですか」的背景追问变得更含蓄，常表达说话人的疑惑、推测或担心。",
      formula: "普通形＋んでしょうか", tags: ["背景", "推测", "委婉"], searchTerms: ["是不是呢", "为什么会", "んでしょうか"],
      standard: ["このままで問題ないんでしょうか。", "这样下去真的没问题吗？"], casual: ["これでいいのかな。", "这样可以吗？"], formal: ["今後どのように進めるべきなのでしょうか。", "今后应当如何推进呢？"],
      collocations: ["大丈夫なんでしょうか", "どうなるんでしょうか"], contrasts: ["直接确认用「んですか」。", "书面正式常用「のでしょうか」。"], mistakes: ["连续用于质问仍会给对方压力。"], relatedIds: ["pattern-n-desu-ka", "pattern-no-deshou-ka", "comparison-ending"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-no-deshou-ka", type: "pattern", title: "～のでしょうか", subtitle: "正式或书面地询问背景与推测",
      purposeCategory: "询问背景", structureCategory: "普通形＋のでしょうか", registerLevel: 1,
      summary: "「んでしょうか」的完整形式，适合说明、采访、正式发言和较书面的疑问。",
      formula: "普通形＋のでしょうか", tags: ["背景", "正式", "书面"], searchTerms: ["正式背景追问", "のでしょうか", "究竟"],
      standard: ["なぜこの違いが生じるのでしょうか。", "为什么会产生这种差异呢？"], casual: ["なんで違うんだろう。", "为什么不一样呢？"], formal: ["どのような対応が求められるのでしょうか。", "需要采取怎样的应对呢？"],
      collocations: ["なぜ～のでしょうか", "どうなるのでしょうか"], contrasts: ["会话中「んでしょうか」更自然。"], mistakes: ["日常简单问路时使用会显得过于书面。"], relatedIds: ["pattern-n-deshou-ka", "pattern-no-desu-ka", "comparison-ending"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-dewa-nai-deshou-ka", type: "pattern", title: "～ではないでしょうか", subtitle: "委婉提出判断、反对或建议",
      purposeCategory: "寻求认同", structureCategory: "普通形＋ではないでしょうか", registerLevel: 1,
      summary: "形式像疑问，实际常用来柔化自己的主张；仍带明确立场，不是完全中立。",
      formula: "普通形＋の／名词＋ではないでしょうか", tags: ["委婉反对", "主张", "正式"], searchTerms: ["不是吗正式", "委婉意见", "ではないでしょうか"],
      standard: ["別の方法もあるのではないでしょうか。", "是不是也有其他方法？"], casual: ["別の方法もあるんじゃない？", "不是还有别的方法吗？"], formal: ["再検討する必要があるのではないでしょうか。", "是否有必要重新讨论？"],
      collocations: ["必要ではないでしょうか", "可能なのではないでしょうか"], contrasts: ["中性求证用「～でしょうか」。"], mistakes: ["只换成礼貌形并不能消除反对立场。"], relatedIds: ["pattern-janai-desu-ka", "comparison-confirmation", "mistake-questioning-tone"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-to-iu-imi", type: "pattern", title: "～という意味ですか", subtitle: "确认词语、说法或行为的含义",
      purposeCategory: "确认自己的理解", structureCategory: "普通形／引用＋という意味ですか", registerLevel: 2,
      summary: "聚焦“这句话意味着什么”，比「ということですか」更明确地询问语义。",
      formula: "引用内容＋という意味ですか", tags: ["含义", "理解确认", "引用"], searchTerms: ["什么意思", "意味着", "という意味"],
      standard: ["キャンセルできないという意味ですか。", "意思是不能取消吗？"], casual: ["それ、無理って意味？", "那是说不行的意思？"], formal: ["今回は対象外という意味でよろしいでしょうか。", "可以理解为本次不属于对象范围吗？"],
      collocations: ["どういう意味", "～という意味"], contrasts: ["确认事实结论时用「～ということですか」。"], mistakes: ["语调太强时可能像抓住措辞质问。"], relatedIds: ["word-douiu", "pattern-to-iu-koto-desu-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-ka-wakarimasu-ka", type: "pattern", title: "～か分かりますか", subtitle: "询问对方是否知道某个未知信息",
      purposeCategory: "间接疑问", structureCategory: "疑问词／普通形＋か＋分かりますか", registerLevel: 2,
      summary: "先把疑问信息嵌入句中，再询问对方能否判断或是否知道。",
      formula: "疑问词＋普通形＋か分かりますか", tags: ["间接疑问", "判断", "询问信息"], searchTerms: ["你知道吗", "是否清楚", "分かりますか"],
      standard: ["次の電車が何時に来るか分かりますか。", "你知道下一班车几点来吗？"], casual: ["どこにあるか分かる？", "知道在哪里吗？"], formal: ["結果がいつ公表されるかお分かりになりますか。", "您知道结果何时公布吗？"],
      collocations: ["どこにあるか分かる", "いつ始まるか分かる"], contrasts: ["询问是否掌握事实也可用「知っていますか」。"], mistakes: ["嵌入部分不用「ですか／ますか」。"], relatedIds: ["pattern-question-word-ka", "pattern-ka-shitteimasu-ka", "mistake-indirect-question"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-ka-shitteimasu-ka", type: "pattern", title: "～か知っていますか", subtitle: "询问对方是否掌握某项事实",
      purposeCategory: "间接疑问", structureCategory: "疑问词／普通形＋か＋知っていますか", registerLevel: 2,
      summary: "关注对方是否已经知道该信息；对陌生人直接用时可改成更柔和的「ご存じですか」。",
      formula: "疑问词＋普通形＋か知っていますか", tags: ["间接疑问", "知识", "事实"], searchTerms: ["知道吗", "知っていますか", "ご存じ"],
      standard: ["田中さんがどこにいるか知っていますか。", "你知道田中在哪里吗？"], casual: ["これ、誰が作ったか知ってる？", "知道这个是谁做的吗？"], formal: ["担当者がどなたかご存じでしょうか。", "您知道负责人是哪位吗？"],
      collocations: ["誰か知っている", "どこか知っている", "ご存じですか"], contrasts: ["现场判断或理解能力侧重「分かりますか」。"], mistakes: ["对顾客直接说「知っていますか」有时像在测试知识。"], relatedIds: ["pattern-question-word-ka", "pattern-ka-wakarimasu-ka"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-n-janai-desu-ka", type: "pattern", title: "～んじゃないですか", subtitle: "基于线索作推断并寻求认同",
      purposeCategory: "寻求认同", structureCategory: "普通形＋んじゃないですか", registerLevel: 3,
      summary: "比单纯「じゃないですか」更突出背景和推断；语调强时也可能变成反驳。",
      formula: "普通形＋んじゃないですか", tags: ["推断", "背景", "认同"], searchTerms: ["是不是", "我看是", "んじゃない"],
      standard: ["電車のほうが早いんじゃないですか。", "坐电车是不是更快？"], casual: ["もう終わったんじゃない？", "是不是已经结束了？"], formal: ["別の原因も考えられるのではないでしょうか。", "是否也可能存在其他原因？"],
      collocations: ["いいんじゃない", "必要なんじゃない"], contrasts: ["中性确认使用「～ですか」。"], mistakes: ["对上司反复使用容易像坚持己见。"], relatedIds: ["pattern-janai-desu-ka", "pattern-dewa-nai-deshou-ka", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-no-dewa-arimasen-ka", type: "pattern", title: "～のではありませんか", subtitle: "正式地提出带立场的确认或反问",
      purposeCategory: "反问和质疑", structureCategory: "普通形＋のではありませんか", registerLevel: 1,
      summary: "礼貌度高但立场并不弱，常用于讨论或采访中指出可能性，也可能给人被追问的感觉。",
      formula: "普通形＋のではありませんか", tags: ["反问", "质疑", "正式"], searchTerms: ["难道不是吗", "のではありませんか", "正式质疑"],
      standard: ["説明が不足しているのではありませんか。", "说明是不是不够充分？"], casual: ["説明、足りないんじゃない？", "说明是不是不够？"], formal: ["制度そのものを見直す必要があるのではありませんか。", "是否有必要重新审视制度本身？"],
      collocations: ["必要なのではありませんか", "問題があるのではありませんか"], contrasts: ["更柔和的提案常用「～のではないでしょうか」。"], mistakes: ["形式礼貌不等于听感柔和，内容仍可能是责问。"], relatedIds: ["pattern-dewa-nai-deshou-ka", "mistake-questioning-tone", "comparison-confirmation"]
    }),
    questionEncyclopediaEntry({
      id: "pattern-understanding-formal", type: "pattern", title: "～という理解でよろしいでしょうか", subtitle: "在职场中正式确认自己的理解",
      purposeCategory: "确认自己的理解", structureCategory: "普通形＋という理解でよろしいでしょうか", registerLevel: 1,
      summary: "先明确复述自己的理解，再请对方确认，适合会议、邮件和规则说明。",
      formula: "确认内容＋という理解でよろしいでしょうか", tags: ["职场", "理解确认", "正式"], searchTerms: ["可以这样理解吗", "职场确认", "理解でよろしい"],
      standard: ["提出は来週までという理解でよろしいですか。", "可以理解为下周前提交吗？"], casual: ["来週までってことでいい？", "就是下周前，对吧？"], formal: ["本件は対応不要という理解でよろしいでしょうか。", "本事项可以理解为无需处理吗？"],
      collocations: ["～という認識で", "～という理解で"], contrasts: ["口语确认用「～ってことですか」。"], mistakes: ["复述内容过于武断时，仍可能像在逼对方确认。"], relatedIds: ["pattern-to-iu-koto-desu-ka", "pattern-tte-koto-desu-ka", "comparison-confirmation"]
    })
  ],

  comparisons: [
    {
      id: "comparison-reason", title: "なぜ・どうして・なんで", category: "原因",
      summary: "三者都能问原因，但正式度、心理距离和质问感不同。",
      rows: [
        ["なぜ", "正式、郑重", "客观分析原因", "冷静、书面", "会议、说明、文章"],
        ["どうして", "轻松礼貌", "中性询问原因", "可带关心", "日常与一般礼貌会话"],
        ["なんで", "普通随意", "口语追问原因", "直接，重读时像质问", "朋友、关系近的人"]
      ],
      recommendation: "不确定对象关系时优先用「どうして～んですか」；正式说明用「なぜ」。",
      relatedIds: ["word-naze", "word-doushite", "word-nande"]
    },
    {
      id: "comparison-method", title: "どう・どうやって・何で", category: "方法",
      summary: "分别关注整体情况、具体步骤和所用手段。",
      rows: [
        ["どう", "轻松礼貌", "状态、评价、整体方式", "开放", "どう思いますか"],
        ["どうやって", "普通随意", "具体步骤或到达方式", "期待过程说明", "どうやって申し込む"],
        ["何で", "轻松礼貌", "工具、材料、交通手段", "期待名词回答", "何で駅まで行く"]
      ],
      recommendation: "问操作流程用「どうやって」，问工具或交通方式用「何で」。",
      relatedIds: ["word-dou", "word-douyatte", "word-nani-de"]
    },
    {
      id: "comparison-place", title: "どこに・どこで・どこへ", category: "地点",
      summary: "助词决定地点在句中的功能。",
      rows: [
        ["どこに", "礼貌", "存在、到达、放置点", "静态或目标点", "どこにありますか"],
        ["どこで", "礼貌", "动作发生地点", "活动场所", "どこで買いましたか"],
        ["どこへ", "礼貌", "移动方向", "强调朝向", "どこへ行きますか"]
      ],
      recommendation: "先看谓语：ある／いる→に，买／吃／工作→で，移动方向→へ。",
      relatedIds: ["word-doko-ni", "word-doko-de", "word-doko-e"]
    },
    {
      id: "comparison-choice-quality", title: "どれ・どの・どんな・どういう", category: "选择和性质",
      summary: "候选选择、名词修饰、性质描述和内容定义使用不同形式。",
      rows: [
        ["どれ", "普通随意", "独立选择一个", "候选明确", "どれがいい？"],
        ["どの", "轻松礼貌", "修饰名词选择", "候选明确", "どの商品ですか"],
        ["どんな", "轻松礼貌", "询问性质或种类", "期待描述", "どんな仕事ですか"],
        ["どういう", "轻松礼貌", "询问含义、内容或背景", "期待解释", "どういう意味ですか"]
      ],
      recommendation: "有固定候选时用「どれ／どの」，想听特征描述用「どんな」。",
      relatedIds: ["word-dore", "word-dono", "word-donna", "purpose-thing"]
    },
    {
      id: "comparison-person-particles", title: "誰が・誰に・誰と・誰から", category: "人物助词",
      summary: "人物在动作中的角色决定助词。",
      rows: [
        ["誰が", "礼貌", "动作主体", "谁来做", "誰が担当しますか"],
        ["誰に", "礼貌", "动作对象或接受者", "向谁／给谁", "誰に聞きますか"],
        ["誰と", "轻松礼貌", "共同参与者", "和谁一起", "誰と行きますか"],
        ["誰から", "礼貌", "信息或物品来源", "从谁那里", "誰から聞きましたか"]
      ],
      recommendation: "不要用中文的“谁”直接替代所有助词结构，先判断人物角色。",
      relatedIds: ["word-dare-ga", "word-dare-ni", "word-dare-to", "word-dare-kara"]
    },
    {
      id: "comparison-degree", title: "どのくらい・どれくらい・どれほど", category: "程度",
      summary: "前两者日常互换度高，「どれほど」更书面或强调程度。",
      rows: [
        ["どのくらい", "礼貌", "时间、距离、数量、程度", "中性", "どのくらいかかりますか"],
        ["どれくらい", "普通随意", "同上，会话常用", "自然口语", "どれくらい待った？"],
        ["どれほど", "正式、郑重", "强调程度或书面询问", "郑重、较强", "どれほど重要でしょうか"]
      ],
      recommendation: "日常查询优先「どのくらい／どれくらい」，书面强调程度可用「どれほど」。",
      relatedIds: ["word-dono-kurai", "purpose-quantity"]
    },
    {
      id: "comparison-ending", title: "疑问句尾的语气差别", category: "句尾语气",
      summary: "同一个“去吗”会因句尾不同而改变关系距离、背景感和质问感。",
      rows: [
        ["行きますか", "礼貌", "中性询问", "距离适中", "一般对象"],
        ["行きます？", "轻松礼貌", "省略か，语调提问", "较柔和", "同事、熟人"],
        ["行く？", "普通随意", "直接口语", "亲近", "朋友"],
        ["行くの？", "普通随意", "带背景或确认", "关心／意外", "朋友"],
        ["行くんですか", "轻松礼貌", "追问背景", "可能带意外", "一般会话"],
        ["行くのですか", "正式、郑重", "正式背景询问", "距离较远", "采访、说明"],
        ["行くか？", "强硬", "男性化直接询问", "可能压迫", "非常有限"],
        ["行くんでしょうか", "礼貌", "带推测的背景疑问", "不确定", "谨慎询问"]
      ],
      recommendation: "朋友间优先「行く？」，一般礼貌关系用「行きますか」，有线索再用「んですか」。",
      relatedIds: ["pattern-masu-ka", "pattern-n-desu-ka", "pattern-no-desu-ka", "mistake-anime-speech"]
    },
    {
      id: "comparison-request", title: "请求表达的礼貌和负担感", category: "请求",
      summary: "形式越郑重距离越远，但真正的礼貌还取决于请求负担、期限和缓冲语。",
      rows: [
        ["～てくれますか", "轻松礼貌", "直接请求", "要求感较明显", "关系近、职责明确"],
        ["～てもらえますか", "礼貌", "自然请求帮助", "柔和", "日常与同事"],
        ["～ていただけますか", "正式、郑重", "正式请求", "尊重", "顾客、上司"],
        ["～ていただけないでしょうか", "正式、郑重", "负担较大的委婉请求", "充分留余地", "商务、特别请求"],
        ["～てもらってもいいですか", "轻松礼貌", "先确认请求是否可行", "谨慎但稍口语", "同事、熟人"]
      ],
      recommendation: "普通礼貌请求优先「～てもらえますか」；正式对象用「～ていただけますか」。",
      relatedIds: ["pattern-te-kuremasu-ka", "pattern-te-moraemasu-ka", "pattern-te-itadakemasu-ka"]
    },
    {
      id: "comparison-advice", title: "～たほうがいい・～ればいい・～たらいい", category: "建议",
      summary: "分别强调“哪个更好”“实现目的的方法”和口语中的柔和建议。",
      rows: [
        ["～たほうがいいですか", "礼貌", "比较后询问是否更好", "已有倾向", "是否最好先预约"],
        ["～ればいいですか", "礼貌", "询问具体实现方法", "目标明确", "在哪里申请"],
        ["～たらいいですか", "轻松礼貌", "口语柔和询问做法", "较自然", "该怎么办"]
      ],
      recommendation: "不知道步骤时说「どうすればいいですか」最清楚。",
      relatedIds: ["pattern-ta-hou-ga-ii-desu-ka", "pattern-reba-ii-desu-ka", "pattern-tara-ii-desu-ka"]
    },
    {
      id: "comparison-confirmation", title: "确认信息与确认理解", category: "确认",
      summary: "中性确认、背景追问、理解复述和寻求认同的心理立场不同。",
      rows: [
        ["～ですか", "礼貌", "中性确认未知信息", "无明显预设", "一般询问"],
        ["～んですか", "轻松礼貌", "追问背景或意外信息", "已有线索", "关心、追问"],
        ["～ということですか", "礼貌", "复述后确认理解", "谨慎澄清", "规则、安排"],
        ["～という理解でよろしいでしょうか", "正式、郑重", "正式确认共识", "尊重、留余地", "职场、会议"],
        ["～じゃないですか", "轻松礼貌", "寻求认同或反问", "已有立场", "提醒、反驳" ]
      ],
      recommendation: "只确认事实用「ですか」；复述对方意思用「ということですか」。",
      relatedIds: ["pattern-desu-ka", "pattern-n-desu-ka", "pattern-to-iu-koto-desu-ka", "pattern-janai-desu-ka"]
    }
  ],

  scenes: [
    {
      id: "scene-convenience-store", title: "便利店", summary: "价格、库存、加热、支付和服务确认最常见。",
      purposes: ["询问价格", "确认商品", "请求服务"],
      expressions: [
        ["これはいくらですか。", "这个多少钱？", "礼貌", "word-ikura"],
        ["この商品はありますか。", "有这个商品吗？", "礼貌", "pattern-desu-ka"],
        ["温めてもらえますか。", "可以帮我加热吗？", "礼貌", "pattern-te-moraemasu-ka"],
        ["袋を一枚いただけますか。", "可以给我一个袋子吗？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["カードで払ってもいいですか。", "可以刷卡支付吗？", "礼貌", "pattern-temo-ii-desu-ka"]
      ],
      unnatural: "只说「これ、できますか」无法明确是问库存、支付还是服务。"
    },
    {
      id: "scene-restaurant", title: "餐厅", summary: "预约、座位、菜品内容、忌口和结账是高频查询。",
      purposes: ["确认预约", "询问内容", "提出请求"],
      expressions: [
        ["二人ですが、席はありますか。", "两个人，请问有座位吗？", "礼貌", "pattern-desu-ka"],
        ["これはどんな料理ですか。", "这是什么样的菜？", "礼貌", "word-donna"],
        ["辛さはどのくらいですか。", "辣度大概怎样？", "礼貌", "word-dono-kurai"],
        ["アレルギーのある食材が入っているか確認していただけますか。", "能否帮我确认是否含有过敏食材？", "正式、郑重", "pattern-ka-dou-ka"],
        ["お会計をお願いできますか。", "可以结账吗？", "礼貌", "comparison-request"]
      ],
      unnatural: "对店员只说「これ何？」过于随意，使用「これは何ですか」或「どんな料理ですか」。"
    },
    {
      id: "scene-station", title: "车站", summary: "站台、换乘、发车时间和所需时间需要明确助词。",
      purposes: ["询问地点", "询问时间", "询问方法"],
      expressions: [
        ["新宿行きは何番線ですか。", "去新宿的是几号站台？", "礼貌", "word-nani"],
        ["この電車は東京駅に止まりますか。", "这趟车在东京站停吗？", "礼貌", "pattern-masu-ka"],
        ["渋谷までどのくらいかかりますか。", "到涩谷需要多久？", "礼貌", "word-dono-kurai"],
        ["どこで乗り換えればいいですか。", "应该在哪里换乘？", "礼貌", "pattern-reba-ii-desu-ka"],
        ["次の電車は何時に出ますか。", "下一班车几点出发？", "礼貌", "purpose-time"]
      ],
      unnatural: "「どこに乗り換えますか」容易把地点功能说错；换乘动作地点使用「どこで」。"
    },
    {
      id: "scene-directions", title: "问路", summary: "先确认目的地，再询问路线、距离和交通方式。",
      purposes: ["询问地点", "询问方法", "询问距离"],
      expressions: [
        ["駅はどこですか。", "车站在哪里？", "礼貌", "word-doko"],
        ["ここからどうやって行けばいいですか。", "从这里应该怎么去？", "礼貌", "word-douyatte"],
        ["歩いてどのくらいかかりますか。", "走路大概要多久？", "礼貌", "word-dono-kurai"],
        ["この道をまっすぐ行けばいいですか。", "沿这条路直走就可以吗？", "礼貌", "pattern-reba-ii-desu-ka"],
        ["すみません、道を教えていただけますか。", "不好意思，可以请您告诉我路线吗？", "正式、郑重", "pattern-te-itadakemasu-ka"]
      ],
      unnatural: "突然只说地点名加「どこ？」不够礼貌，先加「すみません」。"
    },
    {
      id: "scene-workplace", title: "公司职场", summary: "日程、责任人、理解确认和正式请求需要控制语气。",
      purposes: ["确认信息", "确认理解", "请求帮助"],
      expressions: [
        ["この件は誰が担当しますか。", "这件事由谁负责？", "礼貌", "word-dare-ga"],
        ["いつまでに提出すればいいですか。", "最晚什么时候提交？", "礼貌", "word-itsu-made-ni"],
        ["来週から新しい手順に変わるという理解でよろしいでしょうか。", "我理解为下周开始改用新流程，对吗？", "正式、郑重", "pattern-to-iu-koto-desu-ka"],
        ["お時間のあるときに確認していただけますか。", "您方便时可以确认一下吗？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["この案についてどう思いますか。", "您怎么看这个方案？", "礼貌", "pattern-to-omoimasu-ka"]
      ],
      unnatural: "形式礼貌但直接追问「なんでですか」仍可能像顶撞；先确认背景或询问理由。"
    },
    {
      id: "scene-job-interview", title: "就职面试", summary: "职责、工作方式、培养制度和入职安排适合郑重问法。",
      purposes: ["询问内容", "询问计划", "确认理解"],
      expressions: [
        ["入社後はどのような業務を担当するのでしょうか。", "入职后将负责怎样的工作？", "正式、郑重", "word-donna"],
        ["研修制度について教えていただけますか。", "能否介绍一下培训制度？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["配属先はいつ頃決まるのでしょうか。", "分配部门大约何时确定？", "正式、郑重", "pattern-deshou-ka"],
        ["一日の仕事の流れはどのようになっていますか。", "一天的工作流程是怎样的？", "正式、郑重", "word-dou"],
        ["未経験でも応募可能という理解でよろしいでしょうか。", "我理解为没有经验也可以应聘，对吗？", "正式、郑重", "pattern-to-iu-koto-desu-ka"]
      ],
      unnatural: "把福利问题连续说成「休みは？給料は？」显得唐突，应使用完整礼貌句。"
    },
    {
      id: "scene-hospital", title: "医院", summary: "症状、持续时间、原因和注意事项要表达清楚。",
      purposes: ["询问状态", "询问时间", "请求说明"],
      expressions: [
        ["この症状はいつからですか。", "这个症状从什么时候开始？", "礼貌", "word-itsu-kara"],
        ["薬はいつ飲めばいいですか。", "药应该什么时候吃？", "礼貌", "pattern-reba-ii-desu-ka"],
        ["どのくらいで治りますか。", "大约多久能好？", "礼貌", "word-dono-kurai"],
        ["検査の前に食事をしても大丈夫ですか。", "检查前吃饭没问题吗？", "礼貌", "pattern-temo-daijoubu-desu-ka"],
        ["もう一度説明していただけますか。", "能否再说明一次？", "正式、郑重", "pattern-te-itadakemasu-ka"]
      ],
      unnatural: "只说「痛いですか」可能不清楚是在问自己还是医生判断；明确身体部位和时间。"
    },
    {
      id: "scene-city-office", title: "区役所", summary: "手续、窗口、材料、期限和办理时间是核心信息。",
      purposes: ["询问事物", "询问地点", "询问方法"],
      expressions: [
        ["この手続きには何が必要ですか。", "这个手续需要什么？", "礼貌", "word-nani"],
        ["どの窓口に行けばいいですか。", "应该去哪个窗口？", "礼貌", "pattern-reba-ii-desu-ka"],
        ["申請してからどのくらいかかりますか。", "申请后大概需要多久？", "礼貌", "word-dono-kurai"],
        ["必要な書類を教えていただけますか。", "可以告诉我需要哪些材料吗？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["この住所で申請できるかどうか確認していただけますか。", "能否确认这个地址是否可以申请？", "正式、郑重", "pattern-ka-dou-ka"]
      ],
      unnatural: "「何を持つ？」过于随意且含义不清，应说明是哪项手续所需材料。"
    },
    {
      id: "scene-school", title: "学校", summary: "课程、作业、教室和向老师确认要求时要区分对象关系。",
      purposes: ["询问时间", "确认要求", "请求说明"],
      expressions: [
        ["次の授業は何時からですか。", "下一节课几点开始？", "礼貌", "word-nanji"],
        ["宿題はいつまでに出せばいいですか。", "作业最晚什么时候交？", "礼貌", "word-itsu-made-ni"],
        ["この言葉はどういう意味ですか。", "这个词是什么意思？", "礼貌", "word-douiu"],
        ["もう一度説明していただけますか。", "可以再说明一次吗？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["この答えで合っていますか。", "这个答案对吗？", "礼貌", "pattern-desu-ka"]
      ],
      unnatural: "对老师直接说「これ何？」过于随意，至少把问题说完整并使用礼貌形。"
    },
    {
      id: "scene-part-time", title: "打工", summary: "排班、职责、请假和操作确认需要简洁而礼貌。",
      purposes: ["询问计划", "请求帮助", "确认理解"],
      expressions: [
        ["次のシフトは何曜日ですか。", "下一次排班是星期几？", "礼貌", "word-nanyoubi"],
        ["この作業はどうやって進めますか。", "这项工作怎么进行？", "礼貌", "word-douyatte"],
        ["来週、お休みをいただいてもいいですか。", "下周可以请假吗？", "礼貌", "pattern-temo-ii-desu-ka"],
        ["ここを確認してもらえますか。", "能帮我确认这里吗？", "轻松礼貌", "pattern-te-moraemasu-ka"],
        ["先に清掃するという理解でよろしいでしょうか。", "可以理解为先打扫吗？", "正式、郑重", "pattern-understanding-formal"]
      ],
      unnatural: "只说「休みたいです」是在陈述愿望；需要明确询问许可或商量排班。"
    },
    {
      id: "scene-phone", title: "电话", summary: "电话中缺少视觉线索，人物、事项和回电时间要说得更明确。",
      purposes: ["确认人物", "询问时间", "请求转接"],
      expressions: [
        ["どちらさまでしょうか。", "请问您是哪位？", "正式、郑重", "word-dochira"],
        ["田中様はいらっしゃいますか。", "田中先生/女士在吗？", "礼貌", "pattern-masu-ka"],
        ["何時ごろお戻りになりますか。", "大约几点回来？", "正式、郑重", "word-nanji"],
        ["営業部につないでいただけますか。", "能帮我转接营业部吗？", "正式、郑重", "pattern-te-itadakemasu-ka"],
        ["折り返しお願いできますでしょうか。", "能请他/她回电吗？", "正式、郑重", "pattern-deshou-ka"]
      ],
      unnatural: "电话中只说「田中さん？」容易像在确认对方本人，应说明想找哪位或自己的来意。"
    },
    {
      id: "scene-rental", title: "租房", summary: "费用、设备、规则、入住时间和解约条件需要逐项确认。",
      purposes: ["询问价格", "确认规则", "询问条件"],
      expressions: [
        ["初期費用は全部でいくらですか。", "初期费用一共多少？", "礼貌", "word-ikura"],
        ["インターネットは使えますか。", "可以使用网络吗？", "礼貌", "pattern-masu-ka"],
        ["ペットを飼ってもいいですか。", "可以养宠物吗？", "礼貌", "pattern-temo-ii-desu-ka"],
        ["いつから入居できますか。", "什么时候可以入住？", "礼貌", "word-itsu-kara"],
        ["解約の条件を教えていただけますか。", "能告诉我解约条件吗？", "正式、郑重", "pattern-te-itadakemasu-ka"]
      ],
      unnatural: "只问「いくらですか」可能不清楚是房租、管理费还是初期费用，应明确项目。"
    },
    {
      id: "scene-friends", title: "与朋友聊天", summary: "朋友间常省略「か」，用普通形升调或「の？」保持自然。",
      purposes: ["询问计划", "询问意见", "询问背景"],
      expressions: [
        ["週末、何する？", "周末做什么？", "普通随意", "word-nani"],
        ["どっちがいい？", "哪个好？", "普通随意", "word-docchi"],
        ["これ、どう思う？", "你怎么看这个？", "普通随意", "pattern-to-omoimasu-ka"],
        ["昨日、なんで来なかったの？", "昨天为什么没来？", "普通随意", "word-nande"],
        ["一緒に行かない？", "要不要一起去？", "普通随意", "pattern-masen-ka"]
      ],
      unnatural: "每句都用「～か」会显得审问式或过度男性化，普通形升调通常更自然。"
    }
  ],

  mistakes: [
    {
      id: "mistake-chinese-order", title: "把中文疑问语序直接搬进日语", category: "语序",
      unnatural: "何があなたは欲しいですか。", natural: "何が欲しいですか。",
      reason: "日语通常不需要把“你”显式放在疑问词后面。", feeling: "翻译腔明显，焦点不自然。",
      recommended: "上下文已知对象时省略主语。", relatedIds: ["word-nani", "mistake-overuse-anata"]
    },
    {
      id: "mistake-question-position", title: "疑问词位置受中文影响", category: "语序",
      unnatural: "あなたは買いましたか、何を。", natural: "何を買いましたか。",
      reason: "日语虽允许句尾补充，但普通中性问句应把疑问词放在谓语前。", feeling: "像事后追问或刻意强调。",
      recommended: "使用“疑问词＋助词＋谓语”的基础顺序。", relatedIds: ["word-nani"]
    },
    {
      id: "mistake-dare-wa", title: "询问未知人物时使用「誰は」", category: "助词",
      unnatural: "誰は担当しますか。", natural: "誰が担当しますか。",
      reason: "未知人物是焦点，通常由「が」标记。", feeling: "听者会期待前文已有几个人物对比。",
      recommended: "问“谁做”时使用「誰が」。", relatedIds: ["word-dare-ga", "comparison-person-particles"]
    },
    {
      id: "mistake-doko-ni-de", title: "混淆「どこに」和「どこで」", category: "助词",
      unnatural: "どこに買いましたか。", natural: "どこで買いましたか。",
      reason: "购买是动作，动作发生地点使用「で」。", feeling: "能猜懂，但助词错误明显。",
      recommended: "ある／いる→に，动作→で。", relatedIds: ["word-doko-de", "word-doko-ni", "comparison-place"]
    },
    {
      id: "mistake-dou-douyatte", title: "混淆「どう」和「どうやって」", category: "疑问词",
      unnatural: "この機械はどうですか。（想问操作步骤）", natural: "この機械はどうやって使いますか。",
      reason: "「どうですか」主要问状态或评价，不会自动指向具体步骤。", feeling: "对方可能回答“很好用”。",
      recommended: "期待过程说明时使用「どうやって」。", relatedIds: ["word-dou", "word-douyatte", "comparison-method"]
    },
    {
      id: "mistake-nani-dore-dono", title: "混淆「何・どれ・どの・どんな」", category: "疑问词",
      unnatural: "どのが一番いいですか。", natural: "どれが一番いいですか。",
      reason: "「どの」必须接名词；独立选择使用「どれ」。", feeling: "句子结构未完成。",
      recommended: "内容→何，独立选项→どれ，修饰名词→どの，性质→どんな。", relatedIds: ["comparison-choice-quality"]
    },
    {
      id: "mistake-friend-ka", title: "对朋友过度使用句尾「か」", category: "语气",
      unnatural: "今日、映画を見に行くか。", natural: "今日、映画を見に行く？",
      reason: "普通形＋か容易带男性化、审问或戏剧化语气。", feeling: "距离感强，某些语调下像命令前的确认。",
      recommended: "朋友间使用普通形升调或「の？」。", relatedIds: ["comparison-ending", "mistake-anime-speech"]
    },
    {
      id: "mistake-casual-to-superior", title: "对老师或上司使用普通随意形", category: "对象关系",
      unnatural: "先生、これでいい？", natural: "先生、これでよろしいでしょうか。",
      reason: "内容虽简单，但对象关系要求更礼貌的句尾。", feeling: "像把对方当作关系很近的同辈。",
      recommended: "至少使用「いいですか」，正式确认用「よろしいでしょうか」。", relatedIds: ["pattern-deshou-ka"]
    },
    {
      id: "mistake-request-masu-ka", title: "请求别人时只使用「～ますか」", category: "请求",
      unnatural: "窓を開けますか。（想请对方开窗）", natural: "窓を開けてもらえますか。",
      reason: "「開けますか」是在询问对方是否打算开，不明确表达请求。", feeling: "对方可能只回答“不开”。",
      recommended: "日常礼貌请求使用「～てもらえますか」。", relatedIds: ["pattern-masu-ka", "pattern-te-moraemasu-ka", "comparison-request"]
    },
    {
      id: "mistake-masen-ka", title: "把「～ませんか」只理解为否定疑问", category: "句型",
      unnatural: "一緒に行きませんか＝你不去吗？", natural: "一緒に行きませんか＝要不要一起去？",
      reason: "这一形式在会话中常用于给对方留出拒绝空间的邀请。", feeling: "若按字面理解，容易错过对方的邀请意图。",
      recommended: "结合“一緒に”等语境判断邀请功能。", relatedIds: ["pattern-masen-ka"]
    },
    {
      id: "mistake-overuse-anata", title: "过度使用「あなた」", category: "语用",
      unnatural: "あなたはどのように思いますか。", natural: "この件についてどう思いますか。",
      reason: "日语在对象明确时通常省略第二人称；直接称「あなた」可能显得疏远或带指责。", feeling: "像翻译文本，或刻意把矛头指向对方。",
      recommended: "省略主语，必要时使用姓名＋さん或职务。", relatedIds: ["purpose-opinion", "pattern-to-omoimasu-ka"]
    },
    {
      id: "mistake-formal-nande", title: "对正式对象使用「なんで」", category: "对象关系",
      unnatural: "部長、なんで変更したんですか。", natural: "変更の理由を伺ってもよろしいでしょうか。",
      reason: "「なんで」口语而直接，与正式关系和质询内容叠加后容易显得顶撞。", feeling: "像追责或反驳。",
      recommended: "使用「なぜ」或把问题改成“请教理由”。", relatedIds: ["word-nande", "comparison-reason"]
    },
    {
      id: "mistake-overuse-n-desu-ka", title: "所有疑问句都使用「んですか」", category: "语气",
      unnatural: "お名前は何なんですか。", natural: "お名前は何ですか。",
      reason: "「んですか」通常预设背景或线索，单纯索取信息时没有必要。", feeling: "可能像“怎么会叫这个名字”或追问隐情。",
      recommended: "中性未知信息使用「ですか／ますか」。", relatedIds: ["pattern-n-desu-ka", "pattern-desu-ka", "comparison-confirmation"]
    },
    {
      id: "mistake-dekiru-permission", title: "把「できますか」用于请求许可", category: "句型",
      unnatural: "ここで写真ができますか。", natural: "ここで写真を撮ってもいいですか。",
      reason: "「できる」主要表示能力或客观可能，不一定表达规则许可。", feeling: "对方可能理解为设备或环境是否支持拍照。",
      recommended: "询问允许自己的行为时用「～てもいいですか」。", relatedIds: ["pattern-temo-ii-desu-ka"]
    },
    {
      id: "mistake-questioning-tone", title: "形式礼貌但实际仍带质问感", category: "语气",
      unnatural: "どうしてまだ終わっていないんですか。", natural: "進捗を教えていただけますか。何か問題はありますか。",
      reason: "礼貌词尾不能消除“为什么还没做完”的责备预设。", feeling: "对方会感到被追责。",
      recommended: "先询问现状和障碍，再确认原因。", relatedIds: ["word-doushite", "pattern-n-desu-ka", "comparison-confirmation"]
    },
    {
      id: "mistake-anime-speech", title: "过度模仿动漫男性口语", category: "语体",
      unnatural: "お前、どこへ行くんだ？", natural: "どこに行くの？／どちらへ行かれますか。",
      reason: "「お前・～んだ・～か」组合在现实关系中很强硬，适用范围非常窄。", feeling: "粗鲁、支配感强，可能引发冲突。",
      recommended: "根据关系使用普通形升调或礼貌形。", relatedIds: ["comparison-ending", "mistake-friend-ka"]
    },
    {
      id: "mistake-indirect-question", title: "间接疑问中仍使用礼貌问句形", category: "句型",
      unnatural: "何時に始まりますか分かりますか。", natural: "何時に始まるか分かりますか。",
      reason: "嵌入「分かりますか」前的疑问内容使用普通形＋か。", feeling: "两个完整问句直接粘在一起。",
      recommended: "疑问词＋普通形＋か＋分かりますか。", relatedIds: ["pattern-question-word-ka", "pattern-ka-dou-ka"]
    }
  ],

  extraAnchors: [
    { id: "comparison-time-limit", targetId: "word-itsu-made-ni", label: "まで和までに" },
    { id: "scene-hospital", targetId: "scene-hospital", label: "医院问法" }
  ]
};
