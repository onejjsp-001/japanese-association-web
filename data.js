/*
 * 全部学习内容统一保存在这里。
 * related 是由核心词触发的密切联想，sentences 是可直接照搬开口的句子。
 */
const encyclopediaItem = (
  word,
  reading,
  meaning,
  description,
  example,
  exampleReading,
  translation,
  level = ""
) => ({ word, reading, meaning, description, example, exampleReading, translation, level });

const LEARNING_DATA = [
  {
    id: "date",
    title: "日期",
    japaneseTitle: "日付 · ひづけ",
    icon: "日",
    cardLabel: "TIME & DATE",
    description: "5 个分类 · 表格联想",
    layout: "modal-categories",
    categories: [
      {
        id: "year",
        japanese: "年",
        kana: "ねん",
        chinese: "年",
        displayType: "table",
        sections: [
          {
            title: "相对年份",
            type: "table",
            columns: 2,
            mobileColumns: 2,
            items: [
              { japanese: "一昨年", kana: "おととし", chinese: "前年" },
              { japanese: "去年", kana: "きょねん", chinese: "去年" },
              { japanese: "今年", kana: "ことし", chinese: "今年" },
              { japanese: "来年", kana: "らいねん", chinese: "明年" },
              { japanese: "再来年", kana: "さらいねん", chinese: "后年" },
              { japanese: "毎年", kana: "まいとし／まいねん", chinese: "每年" }
            ]
          },
          {
            title: "其他关联词",
            type: "grid",
            columns: 2,
            mobileColumns: 2,
            items: [
              { japanese: "年末", kana: "ねんまつ", chinese: "年末" },
              { japanese: "年始", kana: "ねんし", chinese: "年初" },
              { japanese: "何年", kana: "なんねん", chinese: "哪年／几年" },
              { japanese: "毎年", kana: "まいとし／まいねん", chinese: "每年" }
            ]
          },
          {
            title: "年份读法示例",
            type: "table",
            columns: 2,
            mobileColumns: 2,
            items: [
              { japanese: "1998年", kana: "せんきゅうひゃくきゅうじゅうはちねん", chinese: "1998年" },
              { japanese: "2000年", kana: "にせんねん", chinese: "2000年" },
              { japanese: "2024年", kana: "にせんにじゅうよねん", chinese: "2024年" },
              { japanese: "2025年", kana: "にせんにじゅうごねん", chinese: "2025年" },
              { japanese: "2026年", kana: "にせんにじゅうろくねん", chinese: "2026年" },
              { japanese: "2027年", kana: "にせんにじゅうななねん", chinese: "2027年" }
            ]
          }
        ]
      },
      {
        id: "month",
        japanese: "月",
        kana: "がつ・つき",
        chinese: "月",
        displayType: "grid",
        sections: [
          {
            title: "一月から十二月",
            type: "grid",
            columns: 3,
            mobileColumns: 3,
            compact: true,
            items: [
              { japanese: "一月", kana: "いちがつ", chinese: "一月" },
              { japanese: "二月", kana: "にがつ", chinese: "二月" },
              { japanese: "三月", kana: "さんがつ", chinese: "三月" },
              { japanese: "四月", kana: "しがつ", chinese: "四月" },
              { japanese: "五月", kana: "ごがつ", chinese: "五月" },
              { japanese: "六月", kana: "ろくがつ", chinese: "六月" },
              { japanese: "七月", kana: "しちがつ", chinese: "七月" },
              { japanese: "八月", kana: "はちがつ", chinese: "八月" },
              { japanese: "九月", kana: "くがつ", chinese: "九月" },
              { japanese: "十月", kana: "じゅうがつ", chinese: "十月" },
              { japanese: "十一月", kana: "じゅういちがつ", chinese: "十一月" },
              { japanese: "十二月", kana: "じゅうにがつ", chinese: "十二月" }
            ]
          },
          {
            title: "前后月份",
            type: "grid",
            columns: 3,
            mobileColumns: 2,
            items: [
              { japanese: "先月", kana: "せんげつ", chinese: "上个月" },
              { japanese: "今月", kana: "こんげつ", chinese: "这个月" },
              { japanese: "来月", kana: "らいげつ", chinese: "下个月" },
              { japanese: "毎月", kana: "まいげつ", chinese: "每个月" },
              { japanese: "何月", kana: "なんがつ", chinese: "几月" }
            ]
          }
        ]
      },
      {
        id: "day",
        japanese: "日",
        kana: "にち・ひ",
        chinese: "日",
        displayType: "calendar",
        sections: [
          {
            title: "日付の読み方",
            type: "calendar",
            weekdays: ["日", "月", "火", "水", "木", "金", "土"],
            items: [
              { japanese: "1日", kana: "ついたち", chinese: "1日" },
              { japanese: "2日", kana: "ふつか", chinese: "2日" },
              { japanese: "3日", kana: "みっか", chinese: "3日" },
              { japanese: "4日", kana: "よっか", chinese: "4日" },
              { japanese: "5日", kana: "いつか", chinese: "5日" },
              { japanese: "6日", kana: "むいか", chinese: "6日" },
              { japanese: "7日", kana: "なのか", chinese: "7日" },
              { japanese: "8日", kana: "ようか", chinese: "8日" },
              { japanese: "9日", kana: "ここのか", chinese: "9日" },
              { japanese: "10日", kana: "とおか", chinese: "10日" },
              { japanese: "11日", kana: "じゅういちにち", chinese: "11日" },
              { japanese: "12日", kana: "じゅうににち", chinese: "12日" },
              { japanese: "13日", kana: "じゅうさんにち", chinese: "13日" },
              { japanese: "14日", kana: "じゅうよっか", chinese: "14日" },
              { japanese: "15日", kana: "じゅうごにち", chinese: "15日" },
              { japanese: "16日", kana: "じゅうろくにち", chinese: "16日" },
              { japanese: "17日", kana: "じゅうしちにち", chinese: "17日" },
              { japanese: "18日", kana: "じゅうはちにち", chinese: "18日" },
              { japanese: "19日", kana: "じゅうくにち", chinese: "19日" },
              { japanese: "20日", kana: "はつか", chinese: "20日" },
              { japanese: "21日", kana: "にじゅういちにち", chinese: "21日" },
              { japanese: "22日", kana: "にじゅうににち", chinese: "22日" },
              { japanese: "23日", kana: "にじゅうさんにち", chinese: "23日" },
              { japanese: "24日", kana: "にじゅうよっか", chinese: "24日" },
              { japanese: "25日", kana: "にじゅうごにち", chinese: "25日" },
              { japanese: "26日", kana: "にじゅうろくにち", chinese: "26日" },
              { japanese: "27日", kana: "にじゅうしちにち", chinese: "27日" },
              { japanese: "28日", kana: "にじゅうはちにち", chinese: "28日" },
              { japanese: "29日", kana: "にじゅうくにち", chinese: "29日" },
              { japanese: "30日", kana: "さんじゅうにち", chinese: "30日" },
              { japanese: "31日", kana: "さんじゅういちにち", chinese: "31日" }
            ]
          }
        ]
      },
      {
        id: "weekday",
        japanese: "曜日",
        kana: "ようび",
        chinese: "星期",
        displayType: "grid",
        sections: [
          {
            title: "一週間",
            type: "grid",
            columns: 4,
            mobileColumns: 2,
            items: [
              { japanese: "日曜日", kana: "にちようび", chinese: "星期日" },
              { japanese: "月曜日", kana: "げつようび", chinese: "星期一" },
              { japanese: "火曜日", kana: "かようび", chinese: "星期二" },
              { japanese: "水曜日", kana: "すいようび", chinese: "星期三" },
              { japanese: "木曜日", kana: "もくようび", chinese: "星期四" },
              { japanese: "金曜日", kana: "きんようび", chinese: "星期五" },
              { japanese: "土曜日", kana: "どようび", chinese: "星期六" }
            ]
          }
        ]
      },
      {
        id: "relative-date",
        japanese: "相対日付",
        kana: "そうたいひづけ",
        chinese: "相对日期",
        displayType: "grid",
        sections: [
          {
            title: "前後の日",
            type: "grid",
            columns: 4,
            mobileColumns: 2,
            items: [
              { japanese: "一昨日", kana: "おととい", chinese: "前天" },
              { japanese: "昨日", kana: "きのう", chinese: "昨天" },
              { japanese: "今日", kana: "きょう", chinese: "今天" },
              { japanese: "明日", kana: "あした／あす", chinese: "明天" },
              { japanese: "明後日", kana: "あさって", chinese: "后天" },
              { japanese: "先日", kana: "せんじつ", chinese: "前几天" },
              { japanese: "毎日", kana: "まいにち", chinese: "每天" },
              { japanese: "何日", kana: "なんにち", chinese: "几号／几天" }
            ]
          }
        ]
      }
    ],
    branches: [
      {
        id: "date-units",
        name: "基本单位",
        words: [
          {
            japanese: "年",
            kana: "ねん",
            chinese: "年",
            related: [
              { japanese: "一昨年", kana: "おととし", chinese: "前年" },
              { japanese: "去年", kana: "きょねん", chinese: "去年" },
              { japanese: "今年", kana: "ことし", chinese: "今年" },
              { japanese: "来年", kana: "らいねん", chinese: "明年" },
              { japanese: "再来年", kana: "さらいねん", chinese: "后年" },
              { japanese: "毎年", kana: "まいとし／まいねん", chinese: "每年" },
              { japanese: "年末", kana: "ねんまつ", chinese: "年末" },
              { japanese: "年始", kana: "ねんし", chinese: "年初" },
              { japanese: "何年", kana: "なんねん", chinese: "哪年／几年" },
              { japanese: "1998年", kana: "せんきゅうひゃくきゅうじゅうはちねん", chinese: "1998年" },
              { japanese: "2000年", kana: "にせんねん", chinese: "2000年" },
              { japanese: "2024年", kana: "にせんにじゅうよねん", chinese: "2024年" },
              { japanese: "2025年", kana: "にせんにじゅうごねん", chinese: "2025年" },
              { japanese: "2026年", kana: "にせんにじゅうろくねん", chinese: "2026年" },
              { japanese: "2027年", kana: "にせんにじゅうななねん", chinese: "2027年" }
            ],
            sentences: [
              { japanese: "今年は二〇二六年です。", kana: "ことしは にせんにじゅうろくねん です。", chinese: "今年是2026年。" },
              { japanese: "来年、日本へ行きます。", kana: "らいねん、にほんへ いきます。", chinese: "明年去日本。" },
              { japanese: "去年より忙しいです。", kana: "きょねんより いそがしいです。", chinese: "比去年忙。" },
              { japanese: "毎年ここに来ています。", kana: "まいとし ここに きています。", chinese: "每年都来这里。" }
            ]
          },
          {
            japanese: "月",
            kana: "がつ／つき",
            chinese: "月／月份",
            related: [
              { japanese: "一月", kana: "いちがつ", chinese: "一月" },
              { japanese: "二月", kana: "にがつ", chinese: "二月" },
              { japanese: "三月", kana: "さんがつ", chinese: "三月" },
              { japanese: "四月", kana: "しがつ", chinese: "四月" },
              { japanese: "五月", kana: "ごがつ", chinese: "五月" },
              { japanese: "六月", kana: "ろくがつ", chinese: "六月" },
              { japanese: "七月", kana: "しちがつ", chinese: "七月" },
              { japanese: "八月", kana: "はちがつ", chinese: "八月" },
              { japanese: "九月", kana: "くがつ", chinese: "九月" },
              { japanese: "十月", kana: "じゅうがつ", chinese: "十月" },
              { japanese: "十一月", kana: "じゅういちがつ", chinese: "十一月" },
              { japanese: "十二月", kana: "じゅうにがつ", chinese: "十二月" },
              { japanese: "先月", kana: "せんげつ", chinese: "上个月" },
              { japanese: "今月", kana: "こんげつ", chinese: "这个月" },
              { japanese: "来月", kana: "らいげつ", chinese: "下个月" },
              { japanese: "毎月", kana: "まいげつ", chinese: "每个月" },
              { japanese: "月末", kana: "げつまつ", chinese: "月底" },
              { japanese: "何月", kana: "なんがつ", chinese: "几月" }
            ],
            sentences: [
              { japanese: "七月に東京へ行きます。", kana: "しちがつに とうきょうへ いきます。", chinese: "七月去东京。" },
              { japanese: "来月は予定がいっぱいです。", kana: "らいげつは よていが いっぱいです。", chinese: "下个月安排得很满。" },
              { japanese: "今月末までに終わらせます。", kana: "こんげつまつまでに おわらせます。", chinese: "这个月底之前完成。" },
              { japanese: "誕生日は何月ですか。", kana: "たんじょうびは なんがつですか。", chinese: "生日是几月？" }
            ]
          },
          {
            japanese: "日",
            kana: "にち／ひ",
            chinese: "日／天",
            related: [
              { japanese: "一日", kana: "ついたち", chinese: "一号" },
              { japanese: "二日", kana: "ふつか", chinese: "二号" },
              { japanese: "三日", kana: "みっか", chinese: "三号" },
              { japanese: "四日", kana: "よっか", chinese: "四号" },
              { japanese: "五日", kana: "いつか", chinese: "五号" },
              { japanese: "六日", kana: "むいか", chinese: "六号" },
              { japanese: "七日", kana: "なのか", chinese: "七号" },
              { japanese: "八日", kana: "ようか", chinese: "八号" },
              { japanese: "九日", kana: "ここのか", chinese: "九号" },
              { japanese: "十日", kana: "とおか", chinese: "十号" },
              { japanese: "十一日", kana: "じゅういちにち", chinese: "十一号" },
              { japanese: "十二日", kana: "じゅうににち", chinese: "十二号" },
              { japanese: "十三日", kana: "じゅうさんにち", chinese: "十三号" },
              { japanese: "十四日", kana: "じゅうよっか", chinese: "十四号" },
              { japanese: "十五日", kana: "じゅうごにち", chinese: "十五号" },
              { japanese: "十六日", kana: "じゅうろくにち", chinese: "十六号" },
              { japanese: "十七日", kana: "じゅうしちにち", chinese: "十七号" },
              { japanese: "十八日", kana: "じゅうはちにち", chinese: "十八号" },
              { japanese: "十九日", kana: "じゅうくにち", chinese: "十九号" },
              { japanese: "二十日", kana: "はつか", chinese: "二十号" },
              { japanese: "二十一日", kana: "にじゅういちにち", chinese: "二十一号" },
              { japanese: "二十二日", kana: "にじゅうににち", chinese: "二十二号" },
              { japanese: "二十三日", kana: "にじゅうさんにち", chinese: "二十三号" },
              { japanese: "二十四日", kana: "にじゅうよっか", chinese: "二十四号" },
              { japanese: "二十五日", kana: "にじゅうごにち", chinese: "二十五号" },
              { japanese: "二十六日", kana: "にじゅうろくにち", chinese: "二十六号" },
              { japanese: "二十七日", kana: "にじゅうしちにち", chinese: "二十七号" },
              { japanese: "二十八日", kana: "にじゅうはちにち", chinese: "二十八号" },
              { japanese: "二十九日", kana: "にじゅうくにち", chinese: "二十九号" },
              { japanese: "三十日", kana: "さんじゅうにち", chinese: "三十号" },
              { japanese: "三十一日", kana: "さんじゅういちにち", chinese: "三十一号" },
              { japanese: "何日", kana: "なんにち", chinese: "几号／几天" }
            ],
            sentences: [
              { japanese: "今日は七月十五日です。", kana: "きょうは しちがつ じゅうごにちです。", chinese: "今天是七月十五日。" },
              { japanese: "次の休みは二十日です。", kana: "つぎの やすみは はつかです。", chinese: "下次休息是二十号。" },
              { japanese: "何日まで日本にいますか。", kana: "なんにちまで にほんに いますか。", chinese: "在日本待到几号？" },
              { japanese: "あと三日で終わります。", kana: "あと みっかで おわります。", chinese: "还有三天就结束。" }
            ]
          }
        ]
      },
      {
        id: "relative-dates",
        name: "相对日期",
        words: [
          {
            japanese: "今日",
            kana: "きょう",
            chinese: "今天",
            related: [
              { japanese: "今朝", kana: "けさ", chinese: "今天早上" },
              { japanese: "今日の昼", kana: "きょうの ひる", chinese: "今天中午" },
              { japanese: "今晩", kana: "こんばん", chinese: "今天晚上" },
              { japanese: "今日中", kana: "きょうじゅう", chinese: "今天之内" },
              { japanese: "今日から", kana: "きょうから", chinese: "从今天开始" },
              { japanese: "今日まで", kana: "きょうまで", chinese: "到今天为止" }
            ],
            sentences: [
              { japanese: "今日は何をしますか。", kana: "きょうは なにを しますか。", chinese: "今天做什么？" },
              { japanese: "今日中に返信します。", kana: "きょうじゅうに へんしんします。", chinese: "今天之内回复。" },
              { japanese: "今晩、時間ありますか。", kana: "こんばん、じかん ありますか。", chinese: "今晚有时间吗？" }
            ]
          },
          {
            japanese: "明日",
            kana: "あした／あす",
            chinese: "明天",
            related: [
              { japanese: "明日の朝", kana: "あしたの あさ", chinese: "明天早上" },
              { japanese: "明日の昼", kana: "あしたの ひる", chinese: "明天中午" },
              { japanese: "明日の夜", kana: "あしたの よる", chinese: "明天晚上" },
              { japanese: "明日から", kana: "あしたから", chinese: "从明天开始" },
              { japanese: "明日まで", kana: "あしたまで", chinese: "截止到明天" },
              { japanese: "明日以降", kana: "あした いこう", chinese: "明天以后" },
              { japanese: "明後日", kana: "あさって", chinese: "后天" }
            ],
            sentences: [
              { japanese: "明日は水曜日です。", kana: "あしたは すいようびです。", chinese: "明天是星期三。" },
              { japanese: "明日の朝、電話します。", kana: "あしたの あさ、でんわします。", chinese: "明天早上打电话。" },
              { japanese: "明日までにお願いします。", kana: "あしたまでに おねがいします。", chinese: "请在明天之前完成。" }
            ]
          },
          {
            japanese: "昨日",
            kana: "きのう",
            chinese: "昨天",
            related: [
              { japanese: "昨日の朝", kana: "きのうの あさ", chinese: "昨天早上" },
              { japanese: "昨日の昼", kana: "きのうの ひる", chinese: "昨天中午" },
              { japanese: "昨夜", kana: "ゆうべ", chinese: "昨晚" },
              { japanese: "昨日まで", kana: "きのうまで", chinese: "到昨天为止" },
              { japanese: "一昨日", kana: "おととい", chinese: "前天" }
            ],
            sentences: [
              { japanese: "昨日は何をしましたか。", kana: "きのうは なにを しましたか。", chinese: "昨天做了什么？" },
              { japanese: "昨夜はよく眠れませんでした。", kana: "ゆうべは よく ねむれませんでした。", chinese: "昨晚没睡好。" },
              { japanese: "昨日まで休みでした。", kana: "きのうまで やすみでした。", chinese: "休息到昨天。" }
            ]
          }
        ]
      },
      {
        id: "weekdays",
        name: "星期",
        words: [
          {
            japanese: "曜日",
            kana: "ようび",
            chinese: "星期",
            related: [
              { japanese: "月曜日", kana: "げつようび", chinese: "星期一" },
              { japanese: "火曜日", kana: "かようび", chinese: "星期二" },
              { japanese: "水曜日", kana: "すいようび", chinese: "星期三" },
              { japanese: "木曜日", kana: "もくようび", chinese: "星期四" },
              { japanese: "金曜日", kana: "きんようび", chinese: "星期五" },
              { japanese: "土曜日", kana: "どようび", chinese: "星期六" },
              { japanese: "日曜日", kana: "にちようび", chinese: "星期日" },
              { japanese: "平日", kana: "へいじつ", chinese: "工作日" },
              { japanese: "週末", kana: "しゅうまつ", chinese: "周末" },
              { japanese: "先週", kana: "せんしゅう", chinese: "上周" },
              { japanese: "今週", kana: "こんしゅう", chinese: "本周" },
              { japanese: "来週", kana: "らいしゅう", chinese: "下周" },
              { japanese: "毎週", kana: "まいしゅう", chinese: "每周" },
              { japanese: "何曜日", kana: "なんようび", chinese: "星期几" }
            ],
            sentences: [
              { japanese: "今日は何曜日ですか。", kana: "きょうは なんようびですか。", chinese: "今天星期几？" },
              { japanese: "毎週金曜日に会いましょう。", kana: "まいしゅう きんようびに あいましょう。", chinese: "每周五见吧。" },
              { japanese: "来週の月曜日は空いています。", kana: "らいしゅうの げつようびは あいています。", chinese: "下周一有空。" },
              { japanese: "週末は家でゆっくりします。", kana: "しゅうまつは いえで ゆっくりします。", chinese: "周末在家好好休息。" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "body",
    title: "人体",
    japaneseTitle: "身体 · からだ",
    icon: "人",
    cardLabel: "HUMAN BODY",
    description: "8 个词根 · 日常动作与感受",
    branches: [
      {
        id: "head",
        name: "头部",
        words: [
          {
            word: "頭",
            reading: "あたま",
            meaning: "头部",
            displayType: "encyclopedia",
            categories: [
              {
                id: "hair-scalp",
                title: "髪と頭皮",
                reading: "かみと とうひ",
                meaning: "头发与头皮",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("髪", "かみ", "头发", "整体的头发。", "髪を乾かしてから寝ます。", "かみを かわかしてから ねます。", "把头发吹干后再睡。"),
                      encyclopediaItem("髪の毛", "かみのけ", "头发、发丝", "一根根头发或头发这个事物。", "髪の毛が一本、服についています。", "かみのけが いっぽん、ふくに ついています。", "衣服上粘着一根头发。"),
                      encyclopediaItem("頭皮", "とうひ", "头皮", "覆盖头部、长出头发的皮肤。", "頭皮が少しかゆいです。", "とうひが すこし かゆいです。", "头皮有点痒。"),
                      encyclopediaItem("生え際", "はえぎわ", "发际线", "头发开始生长的边缘。", "生え際に白髪が増えました。", "はえぎわに しらがが ふえました。", "发际线附近的白发变多了。"),
                      encyclopediaItem("つむじ", "つむじ", "头顶发旋", "头顶头发呈旋涡状生长的地方。", "つむじの辺りが跳ねています。", "つむじの あたりが はねています。", "发旋附近的头发翘起来了。"),
                      encyclopediaItem("前髪", "まえがみ", "刘海", "垂在额头前面的头发。", "前髪が目にかかっています。", "まえがみが めに かかっています。", "刘海遮到眼睛了。"),
                      encyclopediaItem("後ろ髪", "うしろがみ", "后面的头发", "头部后方的头发。", "後ろ髪を短く切りました。", "うしろがみを みじかく きりました。", "把后面的头发剪短了。"),
                      encyclopediaItem("白髪", "しらが", "白发", "失去黑色、变白的头发。", "白髪が一本見つかりました。", "しらがが いっぽん みつかりました。", "发现了一根白头发。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("髪を切る", "かみを きる", "剪头发", "把头发剪短或修整。", "週末に髪を切ります。", "しゅうまつに かみを きります。", "周末去剪头发。"),
                      encyclopediaItem("髪を伸ばす", "かみを のばす", "留长头发", "让头发继续长长。", "今、髪を伸ばしています。", "いま、かみを のばしています。", "我现在正在留长头发。"),
                      encyclopediaItem("髪を洗う", "かみを あらう", "洗头发", "用水和洗发用品清洗头发。", "寝る前に髪を洗いました。", "ねる まえに かみを あらいました。", "睡前洗了头。"),
                      encyclopediaItem("髪が抜ける", "かみが ぬける", "掉头发", "头发从头皮脱落。", "最近、髪がよく抜けます。", "さいきん、かみが よく ぬけます。", "最近经常掉头发。"),
                      encyclopediaItem("白髪が増える", "しらがが ふえる", "白头发增加", "白发的数量变多。", "この一年で白髪が増えました。", "この いちねんで しらがが ふえました。", "这一年白头发变多了。")
                    ]
                  }
                ]
              },
              {
                id: "face-outline",
                title: "顔の輪郭",
                reading: "かおの りんかく",
                meaning: "脸部轮廓",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("顔", "かお", "脸", "头部前面能看到五官的部分。", "顔を鏡で見ました。", "かおを かがみで みました。", "在镜子里看了看脸。"),
                      encyclopediaItem("額", "ひたい", "额头", "眉毛上方到发际线之间的部分。", "額が少し熱いです。", "ひたいが すこし あついです。", "额头有点烫。"),
                      encyclopediaItem("こめかみ", "こめかみ", "太阳穴", "眼睛外侧与耳朵之间的部位。", "こめかみがずきずきします。", "こめかみが ずきずきします。", "太阳穴一跳一跳地疼。"),
                      encyclopediaItem("頬", "ほお", "脸颊", "脸的两侧、眼睛下方的部位。", "寒くて頬が赤くなりました。", "さむくて ほおが あかく なりました。", "因为冷，脸颊变红了。"),
                      encyclopediaItem("顎", "あご", "下巴、颌部", "嘴巴下方到脸部下端的部位。", "顎に手を当てて考えます。", "あごに てを あてて かんがえます。", "用手托着下巴思考。"),
                      encyclopediaItem("輪郭", "りんかく", "脸部轮廓", "从外侧看到的脸部线条。", "横から見ると輪郭がよく分かります。", "よこから みると りんかくが よく わかります。", "从侧面看能清楚看到脸部轮廓。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("額に汗をかく", "ひたいに あせを かく", "额头出汗", "汗出现在额头上。", "走ったので額に汗をかきました。", "はしったので ひたいに あせを かきました。", "因为跑了步，额头出汗了。"),
                      encyclopediaItem("頬に触れる", "ほおに ふれる", "触碰脸颊", "轻轻碰到脸颊。", "冷たい手で頬に触れました。", "つめたい てで ほおに ふれました。", "用冰凉的手碰了碰脸颊。"),
                      encyclopediaItem("顎を上げる", "あごを あげる", "抬起下巴", "让下巴向上移动。", "写真を撮るので、少し顎を上げてください。", "しゃしんを とるので、すこし あごを あげてください。", "要拍照，请稍微抬一下下巴。"),
                      encyclopediaItem("顔を上げる", "かおを あげる", "抬起头", "从低头状态把脸抬起来。", "名前を呼ばれて顔を上げました。", "なまえを よばれて かおを あげました。", "听到有人叫名字便抬起了头。")
                    ]
                  }
                ]
              },
              {
                id: "eyes",
                title: "目",
                reading: "め",
                meaning: "眼睛",
                groups: [
                  {
                    title: "眼睛外部",
                    items: [
                      encyclopediaItem("目", "め", "眼睛", "用于看东西的部位。", "目に髪が入りました。", "めに かみが はいりました。", "头发进眼睛了。", "基础"),
                      encyclopediaItem("まぶた", "まぶた", "眼皮", "覆盖眼球、睁闭眼睛的皮肤。", "眠くてまぶたが重いです。", "ねむくて まぶたが おもいです。", "困得眼皮很沉。", "基础"),
                      encyclopediaItem("上まぶた", "うわまぶた", "上眼皮", "眼睛上侧的眼皮。", "上まぶたが少し腫れています。", "うわまぶたが すこし はれています。", "上眼皮有点肿。", "基础"),
                      encyclopediaItem("下まぶた", "したまぶた", "下眼皮", "眼睛下侧的眼皮。", "下まぶたに小さな傷があります。", "したまぶたに ちいさな きずが あります。", "下眼皮有一道小伤口。", "基础"),
                      encyclopediaItem("まつ毛", "まつげ", "睫毛", "长在眼皮边缘的毛。", "まつ毛が目に入りました。", "まつげが めに はいりました。", "睫毛掉进眼睛了。", "基础"),
                      encyclopediaItem("目尻", "めじり", "外眼角", "靠近耳朵一侧的眼角。", "笑うと目尻にしわができます。", "わらうと めじりに しわが できます。", "一笑外眼角就会出现皱纹。", "基础"),
                      encyclopediaItem("目頭", "めがしら", "内眼角", "靠近鼻子一侧的眼角。", "目頭をそっと押さえました。", "めがしらを そっと おさえました。", "轻轻按住了内眼角。", "基础")
                    ]
                  },
                  {
                    title: "眼睛内部",
                    items: [
                      encyclopediaItem("眼球", "がんきゅう", "眼球", "眼窝内呈球状、负责视觉的部分。", "眼球を強く押さないでください。", "がんきゅうを つよく おさないでください。", "请不要用力按压眼球。", "进阶"),
                      encyclopediaItem("白目", "しろめ", "眼白", "眼球中白色的部分。", "目にゴミが入って、白目が赤くなりました。", "めに ごみが はいって、しろめが あかく なりました。", "眼睛里进了灰尘，眼白变红了。", "基础"),
                      encyclopediaItem("黒目", "くろめ", "眼睛黑色部分", "日常说法中眼睛中央看起来较黑的部分。", "黒目が大きく見えます。", "くろめが おおきく みえます。", "眼睛黑色的部分看起来很大。", "基础"),
                      encyclopediaItem("瞳", "ひとみ", "眼眸", "眼睛中央、与视线和表情相关的部分。", "彼女の瞳が光っています。", "かのじょの ひとみが ひかっています。", "她的眼眸闪着光。", "基础"),
                      encyclopediaItem("瞳孔", "どうこう", "瞳孔", "眼睛中央让光线进入的黑色小孔。", "暗い所では瞳孔が開きます。", "くらい ところでは どうこうが ひらきます。", "在暗处瞳孔会扩大。", "进阶"),
                      encyclopediaItem("虹彩", "こうさい", "虹膜", "围绕瞳孔、带有颜色的环状部分。", "虹彩の色は人によって違います。", "こうさいの いろは ひとに よって ちがいます。", "虹膜的颜色因人而异。", "进阶"),
                      encyclopediaItem("角膜", "かくまく", "角膜", "覆盖眼球最前面的透明部分。", "角膜を傷つけないように気をつけます。", "かくまくを きずつけないように きを つけます。", "注意不要伤到角膜。", "进阶")
                    ]
                  },
                  {
                    title: "眼睛相关",
                    items: [
                      encyclopediaItem("涙", "なみだ", "眼泪", "从眼睛流出的液体。", "笑いすぎて涙が出ました。", "わらいすぎて なみだが でました。", "笑得眼泪都出来了。", "基础"),
                      encyclopediaItem("涙腺", "るいせん", "泪腺", "产生眼泪的部位。", "涙腺が刺激されて涙が出ました。", "るいせんが しげきされて なみだが でました。", "泪腺受到刺激，流出了眼泪。", "进阶"),
                      encyclopediaItem("視力", "しりょく", "视力", "看清物体的能力。", "最近、視力が少し落ちました。", "さいきん、しりょくが すこし おちました。", "最近视力有点下降。", "基础"),
                      encyclopediaItem("目薬", "めぐすり", "眼药水", "滴入眼睛使用的药。", "乾燥するので目薬を持ち歩いています。", "かんそうするので めぐすりを もちあるいています。", "因为眼睛容易干，我随身带着眼药水。", "基础"),
                      encyclopediaItem("眼鏡", "めがね", "眼镜", "戴在眼前用来矫正视力或保护眼睛的用品。", "家では眼鏡をかけています。", "いえでは めがねを かけています。", "我在家戴眼镜。", "基础"),
                      encyclopediaItem("コンタクトレンズ", "コンタクトレンズ", "隐形眼镜", "直接戴在眼球表面的薄镜片。", "今日はコンタクトレンズを外しました。", "きょうは コンタクトレンズを はずしました。", "今天把隐形眼镜摘了。", "基础")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("目を開ける", "めを あける", "睁开眼睛", "把闭着的眼睛睁开。", "ゆっくり目を開けてください。", "ゆっくり めを あけてください。", "请慢慢睁开眼睛。"),
                      encyclopediaItem("目を閉じる", "めを とじる", "闭上眼睛", "让上下眼皮合起来。", "少し目を閉じて休みます。", "すこし めを とじて やすみます。", "闭一会儿眼睛休息。"),
                      encyclopediaItem("目が合う", "めが あう", "对上视线", "两个人正好互相看向对方。", "電車の中で彼と目が合いました。", "でんしゃの なかで かれと めが あいました。", "在电车里和他对上了视线。"),
                      encyclopediaItem("目をこする", "めを こする", "揉眼睛", "用手摩擦眼睛附近。", "眠くても目をこすらないで。", "ねむくても めを こすらないで。", "即使困也别揉眼睛。"),
                      encyclopediaItem("涙が出る", "なみだが でる", "流眼泪", "眼泪从眼睛里流出来。", "玉ねぎを切ると涙が出ます。", "たまねぎを きると なみだが でます。", "切洋葱会流眼泪。"),
                      encyclopediaItem("目薬をさす", "めぐすりを さす", "滴眼药水", "把眼药水滴进眼睛。", "目が乾いたので目薬をさしました。", "めが かわいたので めぐすりを さしました。", "眼睛干，所以滴了眼药水。"),
                      encyclopediaItem("目がかゆい", "めが かゆい", "眼睛痒", "眼睛有想揉的发痒感觉。", "花粉のせいで目がかゆいです。", "かふんの せいで めが かゆいです。", "因为花粉，眼睛很痒。"),
                      encyclopediaItem("目が疲れる", "めが つかれる", "眼睛疲劳", "长时间用眼后感到眼睛累。", "画面を見すぎて目が疲れました。", "がめんを みすぎて めが つかれました。", "看屏幕太久，眼睛累了。")
                    ]
                  }
                ]
              },
              {
                id: "eyebrows",
                title: "眉・眉毛",
                reading: "まゆ・まゆげ",
                meaning: "眉毛",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("眉", "まゆ", "眉", "眼睛上方呈弧形的部位。", "彼は眉を少し上げました。", "かれは まゆを すこし あげました。", "他稍微扬了扬眉。"),
                      encyclopediaItem("眉毛", "まゆげ", "眉毛", "长在眉部的毛。", "眉毛が少し伸びています。", "まゆげが すこし のびています。", "眉毛稍微长长了。"),
                      encyclopediaItem("眉間", "みけん", "眉间", "左右眉毛之间的部位。", "眉間に力が入っています。", "みけんに ちからが はいっています。", "眉间正在用力。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("眉をひそめる", "まゆを ひそめる", "皱眉", "因不快或疑惑而皱起眉头。", "その話を聞いて眉をひそめました。", "その はなしを きいて まゆを ひそめました。", "听到那件事后皱起了眉。"),
                      encyclopediaItem("眉毛を整える", "まゆげを ととのえる", "修整眉毛", "把眉毛修剪成整齐的形状。", "出かける前に眉毛を整えます。", "でかける まえに まゆげを ととのえます。", "出门前修整眉毛。"),
                      encyclopediaItem("眉間にしわを寄せる", "みけんに しわを よせる", "皱起眉间", "让眉间出现皱纹，表现担心或不满。", "難しい顔で眉間にしわを寄せています。", "むずかしい かおで みけんに しわを よせています。", "一脸为难地皱着眉头。")
                    ]
                  }
                ]
              },
              {
                id: "nose",
                title: "鼻",
                reading: "はな",
                meaning: "鼻子",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("鼻", "はな", "鼻子", "位于脸中央、用于呼吸和闻气味的部位。", "鼻が少し赤くなっています。", "はなが すこし あかく なっています。", "鼻子有点红。"),
                      encyclopediaItem("鼻筋", "はなすじ", "鼻梁", "从两眼之间延伸到鼻尖的线条。", "鼻筋に日焼け止めを塗りました。", "はなすじに ひやけどめを ぬりました。", "在鼻梁上涂了防晒霜。"),
                      encyclopediaItem("鼻先", "はなさき", "鼻尖", "鼻子最前端的部位。", "寒くて鼻先が冷たいです。", "さむくて はなさきが つめたいです。", "因为冷，鼻尖冰凉。"),
                      encyclopediaItem("小鼻", "こばな", "鼻翼", "鼻孔两侧鼓起的部分。", "小鼻の周りをやさしく洗います。", "こばなの まわりを やさしく あらいます。", "轻轻清洗鼻翼周围。"),
                      encyclopediaItem("鼻の穴", "はなのあな", "鼻孔", "空气进出鼻子的开口。", "右の鼻の穴が詰まっています。", "みぎの はなのあなが つまっています。", "右边鼻孔堵住了。"),
                      encyclopediaItem("鼻毛", "はなげ", "鼻毛", "长在鼻孔内、阻挡灰尘的毛。", "鼻毛を短く整えました。", "はなげを みじかく ととのえました。", "把鼻毛修短了。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("鼻をかむ", "はなを かむ", "擤鼻涕", "用纸巾等把鼻涕排出来。", "ティッシュで鼻をかみました。", "ティッシュで はなを かみました。", "用纸巾擤了鼻涕。"),
                      encyclopediaItem("鼻が詰まる", "はなが つまる", "鼻塞", "鼻腔堵住，空气不容易通过。", "風邪で鼻が詰まっています。", "かぜで はなが つまっています。", "因为感冒，鼻子堵住了。"),
                      encyclopediaItem("鼻水が出る", "はなみずが でる", "流鼻涕", "鼻水从鼻子里流出来。", "朝から鼻水が出ます。", "あさから はなみずが でます。", "从早上开始一直流鼻涕。"),
                      encyclopediaItem("鼻で息をする", "はなで いきを する", "用鼻子呼吸", "让空气通过鼻子进出。", "口を閉じて鼻で息をしてください。", "くちを とじて はなで いきを してください。", "请闭上嘴，用鼻子呼吸。")
                    ]
                  }
                ]
              },
              {
                id: "ears",
                title: "耳",
                reading: "みみ",
                meaning: "耳朵",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("耳", "みみ", "耳朵", "位于头部两侧、用于听声音的部位。", "右の耳が少し痛いです。", "みぎの みみが すこし いたいです。", "右耳有点疼。"),
                      encyclopediaItem("耳たぶ", "みみたぶ", "耳垂", "耳朵下方柔软的部分。", "耳たぶが冷たくなりました。", "みみたぶが つめたく なりました。", "耳垂变凉了。"),
                      encyclopediaItem("耳の穴", "みみのあな", "耳孔", "声音进入耳朵的开口。", "耳の穴に指を入れないでください。", "みみのあなに ゆびを いれないでください。", "请不要把手指伸进耳孔。"),
                      encyclopediaItem("鼓膜", "こまく", "鼓膜", "耳朵深处接收声音振动的薄膜。", "大きな音は鼓膜に負担をかけます。", "おおきな おとは こまくに ふたんを かけます。", "巨大的声音会给鼓膜造成负担。"),
                      encyclopediaItem("耳垢", "みみあか", "耳垢", "耳道内自然产生的分泌物。", "耳垢を無理に取らないでください。", "みみあかを むりに とらないでください。", "请不要勉强掏耳垢。"),
                      encyclopediaItem("聴力", "ちょうりょく", "听力", "听见并分辨声音的能力。", "聴力を検査してもらいました。", "ちょうりょくを けんさして もらいました。", "请人给我检查了听力。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("耳をふさぐ", "みみを ふさぐ", "捂住耳朵", "用手等堵住耳朵。", "大きな音がして耳をふさぎました。", "おおきな おとが して みみを ふさぎました。", "声音很大，我捂住了耳朵。"),
                      encyclopediaItem("耳を傾ける", "みみを かたむける", "侧耳倾听", "认真地听某个声音或人的话。", "小さな声に耳を傾けました。", "ちいさな こえに みみを かたむけました。", "侧耳倾听微小的声音。"),
                      encyclopediaItem("耳が痛い", "みみが いたい", "耳朵疼", "耳朵有疼痛感。", "飛行機の中で耳が痛くなりました。", "ひこうきの なかで みみが いたく なりました。", "在飞机里耳朵疼了起来。"),
                      encyclopediaItem("音が聞こえる", "おとが きこえる", "听到声音", "声音传入耳中并能被感知。", "外から音が聞こえます。", "そとから おとが きこえます。", "能听到外面传来的声音。")
                    ]
                  }
                ]
              },
              {
                id: "mouth",
                title: "口と口の中",
                reading: "くちと くちのなか",
                meaning: "嘴巴与口腔",
                groups: [
                  {
                    title: "部位词汇",
                    items: [
                      encyclopediaItem("口", "くち", "嘴", "进食、说话和呼吸会用到的开口。", "大きく口を開けてください。", "おおきく くちを あけてください。", "请把嘴张大。"),
                      encyclopediaItem("唇", "くちびる", "嘴唇", "围在口部外侧的柔软部分。", "寒くて唇が乾いています。", "さむくて くちびるが かわいています。", "因为冷，嘴唇很干。"),
                      encyclopediaItem("上唇", "うわくちびる", "上嘴唇", "嘴巴上方的嘴唇。", "上唇にクリームを塗りました。", "うわくちびるに クリームを ぬりました。", "在上嘴唇涂了润唇膏。"),
                      encyclopediaItem("下唇", "したくちびる", "下嘴唇", "嘴巴下方的嘴唇。", "下唇を少しかみました。", "したくちびるを すこし かみました。", "轻轻咬了一下下嘴唇。"),
                      encyclopediaItem("歯", "は", "牙齿", "用于咬断和咀嚼食物的坚硬部分。", "冷たい物が歯にしみます。", "つめたい ものが はに しみます。", "吃凉的东西牙齿会酸痛。"),
                      encyclopediaItem("歯茎", "はぐき", "牙龈", "包围并支撑牙齿的柔软组织。", "歯茎が少し腫れています。", "はぐきが すこし はれています。", "牙龈有点肿。"),
                      encyclopediaItem("舌", "した", "舌头", "口腔内用于品尝、说话和吞咽的部位。", "熱い物で舌をやけどしました。", "あつい もので したを やけどしました。", "吃烫的东西把舌头烫伤了。"),
                      encyclopediaItem("口の中", "くちのなか", "口腔内部", "嘴巴里面的整个空间。", "口の中を水ですすぎました。", "くちのなかを みずで すすぎました。", "用水漱了漱口。"),
                      encyclopediaItem("唾液", "だえき", "唾液", "口腔内分泌、帮助湿润和消化的液体。", "食べ物を見ると唾液が出ます。", "たべものを みると だえきが でます。", "看到食物就会分泌唾液。")
                    ]
                  },
                  {
                    title: "常用表达",
                    items: [
                      encyclopediaItem("口を開ける", "くちを あける", "张嘴", "把闭着的嘴张开。", "もう少し口を開けてください。", "もう すこし くちを あけてください。", "请再把嘴张开一点。"),
                      encyclopediaItem("口を閉じる", "くちを とじる", "闭嘴", "把张开的嘴合上。", "食べる時は口を閉じます。", "たべる ときは くちを とじます。", "吃东西时要闭着嘴。"),
                      encyclopediaItem("歯を磨く", "はを みがく", "刷牙", "用牙刷清洁牙齿。", "毎朝、食後に歯を磨きます。", "まいあさ、しょくごに はを みがきます。", "每天早饭后刷牙。"),
                      encyclopediaItem("舌を出す", "したを だす", "伸出舌头", "把舌头伸到嘴巴外面。", "診察で舌を出してくださいと言われました。", "しんさつで したを だしてくださいと いわれました。", "检查时医生让我伸出舌头。"),
                      encyclopediaItem("唇が乾く", "くちびるが かわく", "嘴唇干燥", "嘴唇水分不足、感觉发干。", "空気が乾燥して唇が乾きます。", "くうきが かんそうして くちびるが かわきます。", "空气干燥，嘴唇也变干了。"),
                      encyclopediaItem("歯茎から血が出る", "はぐきから ちが でる", "牙龈出血", "血从牙龈处流出来。", "歯を磨くと歯茎から血が出ます。", "はを みがくと はぐきから ちが でます。", "刷牙时牙龈会出血。")
                    ]
                  }
                ]
              }
            ]
          },
          {
            japanese: "顔",
            kana: "かお",
            chinese: "脸",
            related: [
              { japanese: "顔を洗う", kana: "かおを あらう", chinese: "洗脸" },
              { japanese: "顔を見る", kana: "かおを みる", chinese: "见面／看看脸" },
              { japanese: "顔を上げる", kana: "かおを あげる", chinese: "抬起脸" },
              { japanese: "顔色が悪い", kana: "かおいろが わるい", chinese: "脸色不好" },
              { japanese: "笑顔", kana: "えがお", chinese: "笑脸／笑容" },
              { japanese: "真顔", kana: "まがお", chinese: "严肃的表情" }
            ],
            sentences: [
              { japanese: "起きたら、まず顔を洗います。", kana: "おきたら、まず かおを あらいます。", chinese: "起床后先洗脸。" },
              { japanese: "今日は顔色が悪いですよ。", kana: "きょうは かおいろが わるいですよ。", chinese: "你今天脸色不太好。" },
              { japanese: "久しぶりに顔が見たいです。", kana: "ひさしぶりに かおが みたいです。", chinese: "好久不见，想见见你。" }
            ]
          },
          {
            japanese: "目",
            kana: "め",
            chinese: "眼睛",
            related: [
              { japanese: "目を開ける", kana: "めを あける", chinese: "睁眼" },
              { japanese: "目を閉じる", kana: "めを とじる", chinese: "闭眼" },
              { japanese: "目が見える", kana: "めが みえる", chinese: "看得见" },
              { japanese: "目が合う", kana: "めが あう", chinese: "对上视线" },
              { japanese: "目が疲れる", kana: "めが つかれる", chinese: "眼睛疲劳" },
              { japanese: "目が覚める", kana: "めが さめる", chinese: "醒来" },
              { japanese: "目をそらす", kana: "めを そらす", chinese: "移开视线" }
            ],
            sentences: [
              { japanese: "ゆっくり目を閉じてください。", kana: "ゆっくり めを とじてください。", chinese: "请慢慢闭上眼睛。" },
              { japanese: "彼と目が合いました。", kana: "かれと めが あいました。", chinese: "和他对上了视线。" },
              { japanese: "画面を見すぎて目が疲れました。", kana: "がめんを みすぎて めが つかれました。", chinese: "看屏幕太久，眼睛累了。" }
            ]
          },
          {
            japanese: "耳",
            kana: "みみ",
            chinese: "耳朵",
            related: [
              { japanese: "耳が痛い", kana: "みみが いたい", chinese: "耳朵疼／听着刺耳" },
              { japanese: "耳を澄ます", kana: "みみを すます", chinese: "侧耳倾听" },
              { japanese: "耳に入る", kana: "みみに はいる", chinese: "传到耳中" },
              { japanese: "耳を疑う", kana: "みみを うたがう", chinese: "不敢相信听到的话" },
              { japanese: "聞こえる", kana: "きこえる", chinese: "听得见" },
              { japanese: "聞き取れない", kana: "ききとれない", chinese: "听不清／听不懂" }
            ],
            sentences: [
              { japanese: "よく聞こえません。", kana: "よく きこえません。", chinese: "听不太清。" },
              { japanese: "もう一度ゆっくり言ってください。", kana: "もう いちど ゆっくり いってください。", chinese: "请再慢慢说一遍。" },
              { japanese: "その話は私の耳にも入っています。", kana: "その はなしは わたしの みみにも はいっています。", chinese: "那件事我也听说了。" }
            ]
          },
          {
            japanese: "口",
            kana: "くち",
            chinese: "嘴",
            related: [
              { japanese: "口を開ける", kana: "くちを あける", chinese: "张嘴" },
              { japanese: "口を閉じる", kana: "くちを とじる", chinese: "闭嘴" },
              { japanese: "口に入れる", kana: "くちに いれる", chinese: "放进嘴里" },
              { japanese: "口に合う", kana: "くちに あう", chinese: "合口味" },
              { japanese: "口が滑る", kana: "くちが すべる", chinese: "说漏嘴" },
              { japanese: "口に出す", kana: "くちに だす", chinese: "说出口" }
            ],
            sentences: [
              { japanese: "大きく口を開けてください。", kana: "おおきく くちを あけてください。", chinese: "请把嘴张大。" },
              { japanese: "この料理は口に合いますか。", kana: "この りょうりは くちに あいますか。", chinese: "这道菜合你口味吗？" },
              { japanese: "うっかり口が滑りました。", kana: "うっかり くちが すべりました。", chinese: "不小心说漏嘴了。" }
            ]
          }
        ]
      },
      {
        id: "limbs",
        name: "四肢",
        words: [
          {
            japanese: "手",
            kana: "て",
            chinese: "手",
            related: [
              { japanese: "手を洗う", kana: "てを あらう", chinese: "洗手" },
              { japanese: "手を上げる", kana: "てを あげる", chinese: "举手" },
              { japanese: "手を貸す", kana: "てを かす", chinese: "搭把手" },
              { japanese: "手をつなぐ", kana: "てを つなぐ", chinese: "牵手" },
              { japanese: "手に取る", kana: "てに とる", chinese: "拿在手里" },
              { japanese: "手が空く", kana: "てが あく", chinese: "腾出手来／有空" },
              { japanese: "手に入れる", kana: "てに いれる", chinese: "弄到手／获得" }
            ],
            sentences: [
              { japanese: "先に手を洗ってください。", kana: "さきに てを あらってください。", chinese: "请先洗手。" },
              { japanese: "ちょっと手を貸してくれますか。", kana: "ちょっと てを かしてくれますか。", chinese: "能搭把手吗？" },
              { japanese: "手が空いたら連絡してください。", kana: "てが あいたら れんらくしてください。", chinese: "有空了请联系我。" }
            ]
          },
          {
            japanese: "足",
            kana: "あし",
            chinese: "脚／腿",
            related: [
              { japanese: "足が痛い", kana: "あしが いたい", chinese: "脚疼／腿疼" },
              { japanese: "足が疲れる", kana: "あしが つかれる", chinese: "腿累" },
              { japanese: "足が速い", kana: "あしが はやい", chinese: "跑得快" },
              { japanese: "足を止める", kana: "あしを とめる", chinese: "停下脚步" },
              { japanese: "足を伸ばす", kana: "あしを のばす", chinese: "伸腿／顺便走远一点" },
              { japanese: "足を運ぶ", kana: "あしを はこぶ", chinese: "亲自前往" }
            ],
            sentences: [
              { japanese: "歩きすぎて足が疲れました。", kana: "あるきすぎて あしが つかれました。", chinese: "走太多，腿累了。" },
              { japanese: "少し足を伸ばしましょう。", kana: "すこし あしを のばしましょう。", chinese: "稍微伸伸腿吧。" },
              { japanese: "ぜひ一度、店に足を運んでください。", kana: "ぜひ いちど、みせに あしを はこんでください。", chinese: "请务必亲自来店里一次。" }
            ]
          }
        ]
      },
      {
        id: "internal-body",
        name: "身体内部",
        words: [
          {
            japanese: "心臓",
            kana: "しんぞう",
            chinese: "心脏",
            related: [
              { japanese: "心臓がどきどきする", kana: "しんぞうが どきどきする", chinese: "心怦怦跳" },
              { japanese: "心臓が止まりそう", kana: "しんぞうが とまりそう", chinese: "心脏快停了似的" },
              { japanese: "心拍数", kana: "しんぱくすう", chinese: "心率" },
              { japanese: "脈が速い", kana: "みゃくが はやい", chinese: "脉搏快" },
              { japanese: "胸が苦しい", kana: "むねが くるしい", chinese: "胸口难受" }
            ],
            sentences: [
              { japanese: "緊張して心臓がどきどきしています。", kana: "きんちょうして しんぞうが どきどきしています。", chinese: "紧张得心怦怦跳。" },
              { japanese: "急に胸が苦しくなりました。", kana: "きゅうに むねが くるしくなりました。", chinese: "突然胸口难受起来。" },
              { japanese: "心拍数を測ってください。", kana: "しんぱくすうを はかってください。", chinese: "请测一下心率。" }
            ]
          }
        ]
      }
    ]
  }
];

/*
 * 新版“人体联想”测试数据。
 * 与 LEARNING_DATA 中的旧版人体完全分离，后续身体区域继续添加到 sections 即可。
 */
const bodyAssociationItem = (
  id,
  word,
  reading,
  meaning,
  description,
  collocations,
  example,
  exampleReading,
  translation,
  searchTerms = []
) => ({ id, word, reading, meaning, description, collocations, example, exampleReading, translation, searchTerms });

const bodyAssociationVocabulary = (id, word, reading, meaning, searchTerms = []) => ({
  id,
  word,
  reading,
  meaning,
  searchTerms
});

const bodyAssociationExpression = (text, reading, meaning, segments = [], searchTerms = []) => ({
  text,
  reading,
  meaning,
  segments,
  searchTerms
});

const bodyAssociationExample = (text, meaning, segments = [], searchTerms = []) => ({
  text,
  meaning,
  segments,
  searchTerms
});

const bodyAssociationData = {
  id: "body-association",
  title: "人体联想",
  japaneseTitle: "人体联想 · からだれんそう",
  reading: "からだれんそう",
  meaning: "从身体部位展开日常词和表达",
  icon: "体",
  cardLabel: "BODY ASSOCIATION",
  description: "全身部位 · 日常动作与会话",
  badge: "联想学习",
  layout: "body-association",
  sections: [
    {
      id: "head-face",
      title: "頭・顔",
      reading: "あたま・かお",
      meaning: "头部与脸部",
      note: "目前只完成头部与脸部，其他身体部位以后继续补充。",
      categories: [
        {
          id: "hair",
          title: "髪",
          reading: "かみ",
          meaning: "头发",
          associationFlow: [
            ["髪"],
            ["切る", "洗う", "乾かす"],
            ["髪を伸ばす", "髪を染める"],
            ["髪が抜ける"]
          ],
          items: [
            bodyAssociationItem("hair", "髪", "かみ", "头发", "头上整体的头发。", ["髪を切る", "髪を洗う", "髪を乾かす", "髪を伸ばす", "髪を染める", "髪が抜ける"], "髪を短く切りました。", "かみを みじかく きりました。", "我把头发剪短了。", ["剪头发", "洗头", "吹干头发", "留长头发", "染头发", "掉头发"]),
            bodyAssociationItem("strand", "髪の毛", "かみのけ", "头发、发丝", "说一根根头发时常用的说法。", ["髪の毛が落ちる", "髪の毛を拾う"], "服に髪の毛がついています。", "ふくに かみのけが ついています。", "衣服上粘着头发。"),
            bodyAssociationItem("bangs", "前髪", "まえがみ", "刘海", "垂在额头前面的头发。", ["前髪を切る", "前髪を整える"], "前髪が目にかかっています。", "まえがみが めに かかっています。", "刘海遮到眼睛了。"),
            bodyAssociationItem("gray-hair", "白髪", "しらが", "白头发", "变成白色的头发。", ["白髪が増える", "白髪を染める"], "最近、白髪が少し増えました。", "さいきん、しらがが すこし ふえました。", "最近白头发稍微变多了。"),
            bodyAssociationItem("scalp", "頭皮", "とうひ", "头皮", "长出头发的头部皮肤。", ["頭皮を洗う", "頭皮がかゆい"], "今日は頭皮が少しかゆいです。", "きょうは とうひが すこし かゆいです。", "今天头皮有点痒。"),
            bodyAssociationItem("cowlick", "つむじ", "つむじ", "发旋", "头顶头发呈旋涡状的地方。", ["つむじの辺り", "つむじが二つある"], "つむじの辺りの髪が跳ねています。", "つむじの あたりの かみが はねています。", "发旋附近的头发翘起来了。")
          ]
        },
        {
          id: "face",
          title: "顔",
          reading: "かお",
          meaning: "脸",
          associationFlow: [
            ["顔"],
            ["見る", "洗う", "隠す"],
            ["顔を上げる", "顔色を見る"],
            ["頬が赤くなる", "額に汗をかく"]
          ],
          items: [
            bodyAssociationItem("face", "顔", "かお", "脸", "有眼睛、鼻子和嘴的头部正面。", ["顔を洗う", "顔を上げる", "顔を隠す", "顔色が悪い"], "朝起きたら、まず顔を洗います。", "あさ おきたら、まず かおを あらいます。", "早上起床后先洗脸。", ["洗脸", "抬起脸", "遮住脸", "脸色不好"]),
            bodyAssociationItem("forehead", "額", "ひたい", "额头", "眉毛上方到发际线之间的部分。", ["額に汗をかく", "額に手を当てる"], "暑くて額に汗をかきました。", "あつくて ひたいに あせを かきました。", "因为热，额头出汗了。"),
            bodyAssociationItem("cheek", "頬", "ほお", "脸颊", "脸左右两侧、眼睛下方的部分。", ["頬が赤くなる", "頬に触れる"], "寒くて頬が赤くなりました。", "さむくて ほおが あかく なりました。", "因为冷，脸颊变红了。"),
            bodyAssociationItem("chin", "顎", "あご", "下巴", "嘴巴下方的脸部末端。", ["顎を上げる", "顎に手を当てる"], "少し顎を上げてください。", "すこし あごを あげてください。", "请稍微抬一下下巴。"),
            bodyAssociationItem("mole", "ほくろ", "ほくろ", "痣", "皮肤上的小色点。", ["ほくろがある", "ほくろが目立つ"], "頬に小さなほくろがあります。", "ほおに ちいさな ほくろが あります。", "脸颊上有一颗小痣。"),
            bodyAssociationItem("wrinkle", "しわ", "しわ", "皱纹", "皮肤表面形成的细纹。", ["しわが増える", "目元のしわ"], "笑うと目元にしわができます。", "わらうと めもとに しわが できます。", "一笑眼周就会出现皱纹。"),
            bodyAssociationItem("pimple", "ニキビ", "ニキビ", "青春痘", "脸上常见的小痘痘。", ["ニキビができる", "ニキビを触らない"], "額にニキビができました。", "ひたいに ニキビが できました。", "额头长了一颗痘。")
          ]
        },
        {
          id: "eyes-eyebrows",
          title: "目・眉",
          reading: "め・まゆ",
          meaning: "眼睛和眉毛",
          associationFlow: [
            ["目", "見る"],
            ["目を開ける", "目を閉じる"],
            ["目が合う", "目をこする"],
            ["目が疲れる", "目がかゆい"]
          ],
          items: [
            bodyAssociationItem("eye", "目", "め", "眼睛", "用来看东西的部位。", ["目を開ける", "目を閉じる", "目をこする", "目が合う", "目が疲れる", "目がかゆい"], "目が疲れたので、少し休みます。", "めが つかれたので、すこし やすみます。", "眼睛累了，所以休息一下。", ["睁眼", "闭眼", "揉眼睛", "视线相遇", "眼睛疲劳", "眼睛痒"]),
            bodyAssociationItem("eyelid", "まぶた", "まぶた", "眼皮", "睁眼和闭眼时活动的皮肤。", ["まぶたを閉じる", "まぶたが重い"], "眠くてまぶたが重いです。", "ねむくて まぶたが おもいです。", "困得眼皮很沉。"),
            bodyAssociationItem("eyelashes", "まつ毛", "まつげ", "睫毛", "长在眼皮边缘的毛。", ["まつ毛が長い", "まつ毛が目に入る"], "まつ毛が目に入りました。", "まつげが めに はいりました。", "睫毛掉进眼睛了。"),
            bodyAssociationItem("eyebrows", "眉毛", "まゆげ", "眉毛", "长在眼睛上方的毛。", ["眉毛を整える", "眉毛を描く"], "出かける前に眉毛を整えます。", "でかける まえに まゆげを ととのえます。", "出门前修整眉毛。"),
            bodyAssociationItem("between-eyebrows", "眉間", "みけん", "眉间", "左右眉毛之间的地方。", ["眉間にしわを寄せる", "眉間を押さえる"], "考えながら眉間にしわを寄せています。", "かんがえながら みけんに しわを よせています。", "一边思考一边皱着眉头。"),
            bodyAssociationItem("white-eye", "白目", "しろめ", "眼白", "眼睛里看起来是白色的部分。", ["白目が赤い", "白目が充血する"], "寝不足で白目が赤くなりました。", "ねぶそくで しろめが あかく なりました。", "因为睡眠不足，眼白变红了。"),
            bodyAssociationItem("dark-eye", "黒目", "くろめ", "眼睛黑色的部分", "日常说法中眼睛中央看起来较黑的部分。", ["黒目が大きい", "黒目がきれい"], "写真では黒目が大きく見えます。", "しゃしんでは くろめが おおきく みえます。", "照片里眼睛黑色的部分看起来很大。"),
            bodyAssociationItem("tears", "涙", "なみだ", "眼泪", "从眼睛流出来的液体。", ["涙が出る", "涙を拭く"], "笑いすぎて涙が出ました。", "わらいすぎて なみだが でました。", "笑得眼泪都出来了。")
          ]
        },
        {
          id: "nose",
          title: "鼻",
          reading: "はな",
          meaning: "鼻子",
          associationFlow: [
            ["鼻", "におい"],
            ["においを嗅ぐ"],
            ["鼻をかむ"],
            ["鼻が詰まる", "鼻水が出る"]
          ],
          items: [
            bodyAssociationItem("nose", "鼻", "はな", "鼻子", "用来呼吸和闻气味的部位。", ["鼻をかむ", "鼻が詰まる", "鼻で息をする", "においを嗅ぐ"], "花のにおいを鼻で嗅ぎました。", "はなの においを はなで かぎました。", "用鼻子闻了花香。", ["擤鼻涕", "鼻塞", "用鼻子呼吸", "闻气味"]),
            bodyAssociationItem("nostril", "鼻の穴", "はなのあな", "鼻孔", "空气进出鼻子的开口。", ["鼻の穴が詰まる", "鼻の穴をふさぐ"], "右の鼻の穴が詰まっています。", "みぎの はなのあなが つまっています。", "右边鼻孔堵住了。"),
            bodyAssociationItem("runny-nose", "鼻水", "はなみず", "鼻涕", "感冒或过敏时从鼻子流出的液体。", ["鼻水が出る", "鼻水を拭く"], "風邪で鼻水が出ます。", "かぜで はなみずが でます。", "因为感冒一直流鼻涕。"),
            bodyAssociationItem("nose-hair", "鼻毛", "はなげ", "鼻毛", "长在鼻孔里面的毛。", ["鼻毛を切る", "鼻毛を整える"], "鏡を見ながら鼻毛を整えました。", "かがみを みながら はなげを ととのえました。", "照着镜子修整了鼻毛。")
          ]
        },
        {
          id: "ears",
          title: "耳",
          reading: "みみ",
          meaning: "耳朵",
          associationFlow: [
            ["耳", "音"],
            ["聞く", "聞こえる"],
            ["耳を傾ける"],
            ["耳をふさぐ", "よく聞こえない"]
          ],
          items: [
            bodyAssociationItem("ear", "耳", "みみ", "耳朵", "用来听声音的部位。", ["耳をふさぐ", "耳を傾ける", "耳が痛い"], "大きな音がして耳をふさぎました。", "おおきな おとが して みみを ふさぎました。", "声音很大，我捂住了耳朵。", ["捂住耳朵", "侧耳倾听", "耳朵疼"]),
            bodyAssociationItem("earlobe", "耳たぶ", "みみたぶ", "耳垂", "耳朵下方柔软的部分。", ["耳たぶが冷たい", "耳たぶに触れる"], "寒くて耳たぶが冷たいです。", "さむくて みみたぶが つめたいです。", "因为冷，耳垂冰凉。"),
            bodyAssociationItem("ear-hole", "耳の穴", "みみのあな", "耳孔", "声音进入耳朵的开口。", ["耳の穴をふさぐ", "耳の穴に入る"], "耳の穴に水が入りました。", "みみのあなに みずが はいりました。", "耳朵里进水了。"),
            bodyAssociationItem("earwax", "耳垢", "みみあか", "耳垢", "耳朵里面自然产生的脏东西。", ["耳垢を取る", "耳垢がたまる"], "耳垢を無理に取らないでください。", "みみあかを むりに とらないでください。", "请不要勉强掏耳垢。"),
            bodyAssociationItem("sound", "音", "おと", "声音", "耳朵能够听到的声响。", ["音が聞こえる", "よく聞こえない", "音が大きい"], "外から小さな音が聞こえます。", "そとから ちいさな おとが きこえます。", "能听到外面传来的小声音。", ["听到声音", "听不清楚"])
          ]
        },
        {
          id: "mouth-teeth",
          title: "口・歯",
          reading: "くち・は",
          meaning: "嘴和牙齿",
          associationFlow: [
            ["口"],
            ["話す", "食べる", "飲む"],
            ["口を開ける", "口を閉じる"],
            ["歯を磨く", "舌を出す"]
          ],
          items: [
            bodyAssociationItem("mouth", "口", "くち", "嘴", "说话、吃东西和喝水时使用的部位。", ["口を開ける", "口を閉じる"], "大きく口を開けてください。", "おおきく くちを あけてください。", "请把嘴张大。", ["张嘴", "闭嘴"]),
            bodyAssociationItem("lips", "唇", "くちびる", "嘴唇", "围在嘴巴外侧的柔软部分。", ["唇が乾く", "唇をかむ"], "空気が乾燥して唇が乾きます。", "くうきが かんそうして くちびるが かわきます。", "空气干燥，嘴唇也干了。"),
            bodyAssociationItem("teeth", "歯", "は", "牙齿", "用来咬断和咀嚼食物的部分。", ["歯を磨く", "歯が痛い"], "甘い物を食べると歯が痛いです。", "あまい ものを たべると はが いたいです。", "吃甜食时牙疼。", ["刷牙", "牙疼"]),
            bodyAssociationItem("gums", "歯茎", "はぐき", "牙龈", "包围并支撑牙齿的柔软部分。", ["歯茎から血が出る", "歯茎が腫れる"], "歯を磨くと歯茎から血が出ます。", "はを みがくと はぐきから ちが でます。", "刷牙时牙龈会出血。"),
            bodyAssociationItem("tongue", "舌", "した", "舌头", "品尝味道和说话时会用到的部位。", ["舌を出す", "舌をかむ"], "熱い物で舌をやけどしました。", "あつい もので したを やけどしました。", "吃烫的东西把舌头烫伤了。"),
            bodyAssociationItem("saliva", "唾", "つば", "唾液、口水", "嘴里产生的液体，日常会话中常说つば。", ["つばを飲み込む", "つばが出る"], "緊張して、つばを飲み込みました。", "きんちょうして、つばを のみこみました。", "因为紧张，我咽了一下口水。")
          ]
        },
        {
          id: "neck-throat",
          title: "首・喉",
          reading: "くび・のど",
          meaning: "脖子和喉咙",
          associationFlow: [
            ["首", "喉"],
            ["動かす", "飲む"],
            ["首を振る", "首を回す"],
            ["喉が痛い", "喉が渇く"]
          ],
          items: [
            bodyAssociationItem("neck", "首", "くび", "脖子", "连接头部和身体的部位。", ["首を振る", "首をかしげる", "首を回す", "首が痛い", "首がこる"], "長く座っていたので首がこりました。", "ながく すわっていたので くびが こりました。", "坐得太久，脖子僵硬了。", ["摇头", "歪头表示疑惑", "转动脖子", "脖子疼", "脖子僵硬"]),
            bodyAssociationItem("throat", "喉", "のど", "喉咙", "呼吸、说话和吞咽时会用到的地方。", ["喉が痛い", "喉が渇く", "水を飲む"], "喉が渇いたので水を飲みました。", "のどが かわいたので みずを のみました。", "口渴了，所以喝了水。", ["喉咙疼", "口渴", "喝水"]),
            bodyAssociationItem("nape", "うなじ", "うなじ", "后颈", "脖子后面、靠近发际线的部分。", ["うなじに汗をかく", "うなじが見える"], "暑くてうなじに汗をかきました。", "あつくて うなじに あせを かきました。", "因为热，后颈出汗了。"),
            bodyAssociationItem("adam-apple", "喉仏", "のどぼとけ", "喉结", "喉咙前面稍微突出的部分。", ["喉仏が動く", "喉仏が目立つ"], "水を飲むと喉仏が動きます。", "みずを のむと のどぼとけが うごきます。", "喝水时喉结会动。")
          ]
        }
      ]
    },
    {
      id: "upper-limbs-hands",
      title: "上肢・手",
      reading: "じょうし・て",
      meaning: "手臂与手",
      note: "从肩膀到指尖，整理日常最常说的动作、状态和会话。",
      categories: [
        {
          id: "shoulders-arms",
          title: "肩・腕",
          reading: "かた・うで",
          meaning: "肩膀和手臂",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("shoulder", "肩", "かた", "肩膀"),
            bodyAssociationVocabulary("shoulder-width", "肩幅", "かたはば", "肩宽"),
            bodyAssociationVocabulary("arm", "腕", "うで", "手臂、胳膊"),
            bodyAssociationVocabulary("upper-arm", "二の腕", "にのうで", "上臂"),
            bodyAssociationVocabulary("armpit", "脇", "わき", "腋下"),
            bodyAssociationVocabulary("strength", "力", "ちから", "力气")
          ],
          expressions: [
            bodyAssociationExpression("肩がこる", "かたがこる", "肩膀酸痛、僵硬"),
            bodyAssociationExpression("肩が痛い", "かたがいたい", "肩膀疼"),
            bodyAssociationExpression("肩を回す", "かたをまわす", "转动肩膀"),
            bodyAssociationExpression("肩をすくめる", "かたをすくめる", "耸肩"),
            bodyAssociationExpression("肩にかける", "かたにかける", "搭在肩上"),
            bodyAssociationExpression("腕を上げる", "うでをあげる", "抬起手臂"),
            bodyAssociationExpression("腕を伸ばす", "うでをのばす", "伸出手臂"),
            bodyAssociationExpression("腕を組む", "うでをくむ", "抱着胳膊"),
            bodyAssociationExpression("腕を振る", "うでをふる", "摆动手臂"),
            bodyAssociationExpression("力を入れる", "ちからをいれる", "用力")
          ],
          examples: [
            bodyAssociationExample("肩がこっているので、少し回します。", "肩膀有些僵硬，所以稍微转动一下。", [
              { text: "肩", reading: "かた" }, { text: "がこっているので、" }, { text: "少し", reading: "すこし" }, { text: "回", reading: "まわ" }, { text: "します。" }
            ]),
            bodyAssociationExample("荷物を肩にかけました。", "我把行李挎在了肩上。", [
              { text: "荷物", reading: "にもつ" }, { text: "を" }, { text: "肩", reading: "かた" }, { text: "にかけました。" }
            ]),
            bodyAssociationExample("腕を伸ばしてください。", "请伸出手臂。", [
              { text: "腕", reading: "うで" }, { text: "を" }, { text: "伸", reading: "の" }, { text: "ばしてください。" }
            ])
          ]
        },
        {
          id: "elbows",
          title: "肘",
          reading: "ひじ",
          meaning: "手肘",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("elbow", "肘", "ひじ", "手肘"),
            bodyAssociationVocabulary("armrest", "肘掛け", "ひじかけ", "扶手"),
            bodyAssociationVocabulary("bend", "曲げる", "まげる", "弯曲"),
            bodyAssociationVocabulary("straighten", "伸ばす", "のばす", "伸直")
          ],
          expressions: [
            bodyAssociationExpression("肘を曲げる", "ひじをまげる", "弯曲手肘"),
            bodyAssociationExpression("肘を伸ばす", "ひじをのばす", "伸直手肘"),
            bodyAssociationExpression("肘をつく", "ひじをつく", "用手肘撑着"),
            bodyAssociationExpression("肘をぶつける", "ひじをぶつける", "撞到手肘"),
            bodyAssociationExpression("肘が痛い", "ひじがいたい", "手肘疼"),
            bodyAssociationExpression("肘掛けを使う", "ひじかけをつかう", "使用扶手")
          ],
          examples: [
            bodyAssociationExample("机に肘をつかないでください。", "请不要把手肘撑在桌子上。", [
              { text: "机", reading: "つくえ" }, { text: "に" }, { text: "肘", reading: "ひじ" }, { text: "をつかないでください。" }
            ]),
            bodyAssociationExample("肘をぶつけてしまいました。", "我不小心撞到手肘了。", [
              { text: "肘", reading: "ひじ" }, { text: "をぶつけてしまいました。" }
            ])
          ]
        },
        {
          id: "wrists",
          title: "手首",
          reading: "てくび",
          meaning: "手腕",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("wrist", "手首", "てくび", "手腕"),
            bodyAssociationVocabulary("watch", "腕時計", "うでどけい", "手表"),
            bodyAssociationVocabulary("pulse", "脈", "みゃく", "脉搏"),
            bodyAssociationVocabulary("inner-side", "内側", "うちがわ", "内侧"),
            bodyAssociationVocabulary("outer-side", "外側", "そとがわ", "外侧")
          ],
          expressions: [
            bodyAssociationExpression("手首を回す", "てくびをまわす", "转动手腕"),
            bodyAssociationExpression("手首を曲げる", "てくびをまげる", "弯曲手腕"),
            bodyAssociationExpression("手首をひねる", "てくびをひねる", "扭伤手腕"),
            bodyAssociationExpression("手首をつかむ", "てくびをつかむ", "抓住手腕"),
            bodyAssociationExpression("腕時計をつける", "うでどけいをつける", "戴手表"),
            bodyAssociationExpression("脈を測る", "みゃくをはかる", "测量脉搏")
          ],
          examples: [
            bodyAssociationExample("転んで手首をひねりました。", "我摔倒后扭伤了手腕。", [
              { text: "転", reading: "ころ" }, { text: "んで" }, { text: "手首", reading: "てくび" }, { text: "をひねりました。" }
            ]),
            bodyAssociationExample("腕時計を左の手首につけています。", "我把手表戴在左手腕上。", [
              { text: "腕時計", reading: "うでどけい" }, { text: "を" }, { text: "左", reading: "ひだり" }, { text: "の" }, { text: "手首", reading: "てくび" }, { text: "につけています。" }
            ])
          ]
        },
        {
          id: "hands-palms",
          title: "手・手のひら",
          reading: "て・てのひら",
          meaning: "手与手掌",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("hand", "手", "て", "手"),
            bodyAssociationVocabulary("right-hand", "右手", "みぎて", "右手"),
            bodyAssociationVocabulary("left-hand", "左手", "ひだりて", "左手"),
            bodyAssociationVocabulary("both-hands", "両手", "りょうて", "双手"),
            bodyAssociationVocabulary("one-hand", "片手", "かたて", "单手"),
            bodyAssociationVocabulary("palm", "手のひら", "てのひら", "手掌"),
            bodyAssociationVocabulary("back-of-hand", "手の甲", "てのこう", "手背"),
            bodyAssociationVocabulary("fist", "拳", "こぶし", "拳头"),
            bodyAssociationVocabulary("palm-lines", "手相", "てそう", "掌纹、手相"),
            bodyAssociationVocabulary("sweat", "汗", "あせ", "汗")
          ],
          expressions: [
            bodyAssociationExpression("手を洗う", "てをあらう", "洗手"),
            bodyAssociationExpression("手を拭く", "てをふく", "擦手"),
            bodyAssociationExpression("手を上げる", "てをあげる", "举手", [], ["举手"]),
            bodyAssociationExpression("手を下ろす", "てをおろす", "放下手"),
            bodyAssociationExpression("手を振る", "てをふる", "挥手"),
            bodyAssociationExpression("手を握る", "てをにぎる", "握住手"),
            bodyAssociationExpression("手を開く", "てをひらく", "张开手"),
            bodyAssociationExpression("手を貸す", "てをかす", "帮忙", [], ["搭把手"]),
            bodyAssociationExpression("手をつなぐ", "てをつなぐ", "牵手"),
            bodyAssociationExpression("手をたたく", "てをたたく", "拍手"),
            bodyAssociationExpression("拳を握る", "こぶしをにぎる", "握拳"),
            bodyAssociationExpression("手のひらに汗をかく", "てのひらにあせをかく", "手心出汗")
          ],
          examples: [
            bodyAssociationExample("食事の前に手を洗ってください。", "吃饭前请洗手。", [
              { text: "食事", reading: "しょくじ" }, { text: "の" }, { text: "前", reading: "まえ" }, { text: "に" }, { text: "手", reading: "て" }, { text: "を" }, { text: "洗", reading: "あら" }, { text: "ってください。" }
            ]),
            bodyAssociationExample("分からない人は手を上げてください。", "不明白的人请举手。", [
              { text: "分", reading: "わ" }, { text: "からない" }, { text: "人", reading: "ひと" }, { text: "は" }, { text: "手", reading: "て" }, { text: "を" }, { text: "上", reading: "あ" }, { text: "げてください。" }
            ], ["举手"]),
            bodyAssociationExample("ちょっと手を貸してくれませんか。", "能帮我一下吗？", [
              { text: "ちょっと" }, { text: "手", reading: "て" }, { text: "を" }, { text: "貸", reading: "か" }, { text: "してくれませんか。" }
            ])
          ],
          tip: "「手を貸す」表示“帮忙、搭把手”，不是把手借出去。"
        },
        {
          id: "fingers-nails",
          title: "指・爪",
          reading: "ゆび・つめ",
          meaning: "手指与指甲",
          compactVocabulary: true,
          vocabularyGroups: [
            {
              title: "手指",
              items: [
                bodyAssociationVocabulary("finger", "指", "ゆび", "手指"),
                bodyAssociationVocabulary("thumb", "親指", "おやゆび", "拇指"),
                bodyAssociationVocabulary("index-finger", "人差し指", "ひとさしゆび", "食指", ["食指"]),
                bodyAssociationVocabulary("middle-finger", "中指", "なかゆび", "中指"),
                bodyAssociationVocabulary("ring-finger", "薬指", "くすりゆび", "无名指"),
                bodyAssociationVocabulary("little-finger", "小指", "こゆび", "小指"),
                bodyAssociationVocabulary("fingertip", "指先", "ゆびさき", "指尖"),
                bodyAssociationVocabulary("fingerprint", "指紋", "しもん", "指纹"),
                bodyAssociationVocabulary("joint", "関節", "かんせつ", "关节")
              ]
            },
            {
              title: "指甲",
              items: [
                bodyAssociationVocabulary("nail", "爪", "つめ", "指甲"),
                bodyAssociationVocabulary("cuticle", "甘皮", "あまかわ", "指甲边缘的表皮"),
                bodyAssociationVocabulary("hangnail", "ささくれ", "ささくれ", "倒刺", ["倒刺"]),
                bodyAssociationVocabulary("manicure", "マニキュア", "マニキュア", "指甲油、美甲"),
                bodyAssociationVocabulary("nail-art", "ネイル", "ネイル", "美甲、指甲装饰")
              ]
            }
          ],
          items: [],
          expressions: [
            bodyAssociationExpression("指を差す", "ゆびをさす", "用手指指"),
            bodyAssociationExpression("指を曲げる", "ゆびをまげる", "弯曲手指"),
            bodyAssociationExpression("指を伸ばす", "ゆびをのばす", "伸直手指"),
            bodyAssociationExpression("指で押す", "ゆびでおす", "用手指按"),
            bodyAssociationExpression("指を切る", "ゆびをきる", "割伤手指"),
            bodyAssociationExpression("指を挟む", "ゆびをはさむ", "夹到手指"),
            bodyAssociationExpression("指紋を取る", "しもんをとる", "采集指纹"),
            bodyAssociationExpression("爪を切る", "つめをきる", "剪指甲"),
            bodyAssociationExpression("爪を噛む", "つめをかむ", "咬指甲"),
            bodyAssociationExpression("爪が伸びる", "つめがのびる", "指甲长长"),
            bodyAssociationExpression("マニキュアを塗る", "マニキュアをぬる", "涂指甲油"),
            bodyAssociationExpression("ささくれができる", "ささくれができる", "长倒刺", [], ["倒刺"])
          ],
          examples: [
            bodyAssociationExample("このボタンを人差し指で押してください。", "请用食指按这个按钮。", [
              { text: "このボタンを" }, { text: "人差し指", reading: "ひとさしゆび" }, { text: "で" }, { text: "押", reading: "お" }, { text: "してください。" }
            ], ["食指"]),
            bodyAssociationExample("ドアに指を挟んでしまいました。", "我的手指不小心被门夹到了。", [
              { text: "ドアに" }, { text: "指", reading: "ゆび" }, { text: "を" }, { text: "挟", reading: "はさ" }, { text: "んでしまいました。" }
            ]),
            bodyAssociationExample("爪が伸びたので、切りました。", "指甲长了，所以剪掉了。", [
              { text: "爪", reading: "つめ" }, { text: "が" }, { text: "伸", reading: "の" }, { text: "びたので、" }, { text: "切", reading: "き" }, { text: "りました。" }
            ])
          ]
        }
      ]
    },
    {
      id: "torso-back",
      title: "胴体・背中",
      reading: "どうたい・せなか",
      meaning: "躯干与背部",
      note: "围绕胸口、背部、腹部和腰部整理日常感受与动作。",
      categories: [
        {
          id: "chest",
          title: "胸・胸元",
          reading: "むね・むなもと",
          meaning: "胸口与前胸",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("chest", "胸", "むね", "胸、胸口"),
            bodyAssociationVocabulary("neckline", "胸元", "むなもと", "胸前、领口附近"),
            bodyAssociationVocabulary("chest-width", "胸囲", "きょうい", "胸围"),
            bodyAssociationVocabulary("breath", "息", "いき", "呼吸、气息"),
            bodyAssociationVocabulary("heartbeat", "鼓動", "こどう", "心跳")
          ],
          expressions: [
            bodyAssociationExpression("胸を張る", "むねをはる", "挺胸"),
            bodyAssociationExpression("胸に手を当てる", "むねにてをあてる", "把手放在胸口"),
            bodyAssociationExpression("胸が苦しい", "むねがくるしい", "胸口难受"),
            bodyAssociationExpression("胸がどきどきする", "むねがどきどきする", "心怦怦跳"),
            bodyAssociationExpression("息を吸う", "いきをすう", "吸气"),
            bodyAssociationExpression("息を吐く", "いきをはく", "呼气")
          ],
          examples: [
            bodyAssociationExample("ゆっくり息を吸って、吐いてください。", "请慢慢吸气，然后呼气。", [
              { text: "ゆっくり" }, { text: "息", reading: "いき" }, { text: "を" }, { text: "吸", reading: "す" }, { text: "って、" }, { text: "吐", reading: "は" }, { text: "いてください。" }
            ]),
            bodyAssociationExample("緊張して胸がどきどきします。", "紧张得心怦怦跳。", [
              { text: "緊張", reading: "きんちょう" }, { text: "して" }, { text: "胸", reading: "むね" }, { text: "がどきどきします。" }
            ])
          ]
        },
        {
          id: "back",
          title: "背中・背骨",
          reading: "せなか・せぼね",
          meaning: "背部与脊背",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("back", "背中", "せなか", "后背"),
            bodyAssociationVocabulary("spine", "背骨", "せぼね", "脊背、脊柱"),
            bodyAssociationVocabulary("posture-line", "背筋", "せすじ", "背部线条、腰背"),
            bodyAssociationVocabulary("back-side", "背面", "はいめん", "背面"),
            bodyAssociationVocabulary("posture", "姿勢", "しせい", "姿势")
          ],
          expressions: [
            bodyAssociationExpression("背中が痛い", "せなかがいたい", "后背疼"),
            bodyAssociationExpression("背中を伸ばす", "せなかをのばす", "伸展后背"),
            bodyAssociationExpression("背中を丸める", "せなかをまるめる", "弓起后背"),
            bodyAssociationExpression("背中を向ける", "せなかをむける", "背对着"),
            bodyAssociationExpression("背筋を伸ばす", "せすじをのばす", "挺直腰背"),
            bodyAssociationExpression("姿勢を正す", "しせいをただす", "端正姿势")
          ],
          examples: [
            bodyAssociationExample("長く座っていたので、背中が痛いです。", "坐得太久，后背疼。", [
              { text: "長", reading: "なが" }, { text: "く" }, { text: "座", reading: "すわ" }, { text: "っていたので、" }, { text: "背中", reading: "せなか" }, { text: "が" }, { text: "痛", reading: "いた" }, { text: "いです。" }
            ]),
            bodyAssociationExample("もう少し背筋を伸ばしてください。", "请再把腰背挺直一点。", [
              { text: "もう" }, { text: "少し", reading: "すこし" }, { text: "背筋", reading: "せすじ" }, { text: "を" }, { text: "伸", reading: "の" }, { text: "ばしてください。" }
            ])
          ]
        },
        {
          id: "abdomen-sides",
          title: "お腹・脇腹",
          reading: "おなか・わきばら",
          meaning: "腹部与侧腹",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("belly", "お腹", "おなか", "肚子、腹部"),
            bodyAssociationVocabulary("abdomen", "腹", "はら", "腹部、肚子"),
            bodyAssociationVocabulary("side", "脇腹", "わきばら", "侧腹"),
            bodyAssociationVocabulary("pit-stomach", "みぞおち", "みぞおち", "心窝、上腹中央"),
            bodyAssociationVocabulary("navel", "へそ", "へそ", "肚脐"),
            bodyAssociationVocabulary("appetite", "食欲", "しょくよく", "食欲")
          ],
          expressions: [
            bodyAssociationExpression("お腹が空く", "おなかがすく", "肚子饿"),
            bodyAssociationExpression("お腹がいっぱい", "おなかがいっぱい", "吃饱了"),
            bodyAssociationExpression("お腹が痛い", "おなかがいたい", "肚子疼"),
            bodyAssociationExpression("お腹を壊す", "おなかをこわす", "吃坏肚子"),
            bodyAssociationExpression("脇腹が痛む", "わきばらがいたむ", "侧腹疼"),
            bodyAssociationExpression("お腹をへこませる", "おなかをへこませる", "收腹")
          ],
          examples: [
            bodyAssociationExample("朝から何も食べていないので、お腹が空きました。", "从早上起什么都没吃，肚子饿了。", [
              { text: "朝", reading: "あさ" }, { text: "から" }, { text: "何", reading: "なに" }, { text: "も" }, { text: "食", reading: "た" }, { text: "べていないので、" }, { text: "お腹", reading: "おなか" }, { text: "が" }, { text: "空", reading: "す" }, { text: "きました。" }
            ]),
            bodyAssociationExample("食べすぎてお腹がいっぱいです。", "吃多了，肚子很饱。", [
              { text: "食", reading: "た" }, { text: "べすぎて" }, { text: "お腹", reading: "おなか" }, { text: "がいっぱいです。" }
            ])
          ]
        },
        {
          id: "waist-hips",
          title: "腰・お尻",
          reading: "こし・おしり",
          meaning: "腰部与臀部",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("waist", "腰", "こし", "腰"),
            bodyAssociationVocabulary("waist-area", "腰回り", "こしまわり", "腰部周围"),
            bodyAssociationVocabulary("hips", "お尻", "おしり", "臀部、屁股"),
            bodyAssociationVocabulary("seat", "尻", "しり", "臀部"),
            bodyAssociationVocabulary("lower-back", "腰の辺り", "こしのあたり", "腰附近")
          ],
          expressions: [
            bodyAssociationExpression("腰が痛い", "こしがいたい", "腰疼"),
            bodyAssociationExpression("腰を曲げる", "こしをまげる", "弯腰"),
            bodyAssociationExpression("腰を伸ばす", "こしをのばす", "伸展腰部"),
            bodyAssociationExpression("腰を下ろす", "こしをおろす", "坐下"),
            bodyAssociationExpression("お尻をつく", "おしりをつく", "屁股着地、坐下"),
            bodyAssociationExpression("尻もちをつく", "しりもちをつく", "摔个屁股墩")
          ],
          examples: [
            bodyAssociationExample("重い物を持って、腰が痛くなりました。", "搬了重物以后腰疼了。", [
              { text: "重", reading: "おも" }, { text: "い" }, { text: "物", reading: "もの" }, { text: "を" }, { text: "持", reading: "も" }, { text: "って、" }, { text: "腰", reading: "こし" }, { text: "が" }, { text: "痛", reading: "いた" }, { text: "くなりました。" }
            ]),
            bodyAssociationExample("ここに腰を下ろして休みましょう。", "在这里坐下来休息吧。", [
              { text: "ここに" }, { text: "腰", reading: "こし" }, { text: "を" }, { text: "下", reading: "お" }, { text: "ろして" }, { text: "休", reading: "やす" }, { text: "みましょう。" }
            ])
          ]
        }
      ]
    },
    {
      id: "lower-limbs-feet",
      title: "下肢・足",
      reading: "かし・あし",
      meaning: "腿部与脚",
      note: "从大腿到脚趾，集中训练走路、站立、疲劳和疼痛等表达。",
      categories: [
        {
          id: "legs-thighs",
          title: "脚・太もも",
          reading: "あし・ふともも",
          meaning: "腿与大腿",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("leg", "脚", "あし", "腿"),
            bodyAssociationVocabulary("leg-foot", "足", "あし", "脚、腿"),
            bodyAssociationVocabulary("thigh", "太もも", "ふともも", "大腿"),
            bodyAssociationVocabulary("inner-thigh", "内もも", "うちもも", "大腿内侧"),
            bodyAssociationVocabulary("crotch", "股", "また", "胯下、两腿之间"),
            bodyAssociationVocabulary("stride", "歩幅", "ほはば", "步幅")
          ],
          expressions: [
            bodyAssociationExpression("足を上げる", "あしをあげる", "抬腿"),
            bodyAssociationExpression("足を伸ばす", "あしをのばす", "伸腿"),
            bodyAssociationExpression("足を組む", "あしをくむ", "翘腿、交叉双腿"),
            bodyAssociationExpression("足が疲れる", "あしがつかれる", "腿累"),
            bodyAssociationExpression("足がしびれる", "あしがしびれる", "腿麻"),
            bodyAssociationExpression("歩幅を広げる", "ほはばをひろげる", "加大步幅")
          ],
          examples: [
            bodyAssociationExample("歩きすぎて足が疲れました。", "走得太多，腿累了。", [
              { text: "歩", reading: "ある" }, { text: "きすぎて" }, { text: "足", reading: "あし" }, { text: "が" }, { text: "疲", reading: "つか" }, { text: "れました。" }
            ]),
            bodyAssociationExample("少し足を伸ばして休みます。", "稍微伸伸腿休息一下。", [
              { text: "少し", reading: "すこし" }, { text: "足", reading: "あし" }, { text: "を" }, { text: "伸", reading: "の" }, { text: "ばして" }, { text: "休", reading: "やす" }, { text: "みます。" }
            ])
          ]
        },
        {
          id: "knees",
          title: "膝",
          reading: "ひざ",
          meaning: "膝盖",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("knee", "膝", "ひざ", "膝盖"),
            bodyAssociationVocabulary("kneecap", "膝小僧", "ひざこぞう", "膝盖前部"),
            bodyAssociationVocabulary("back-knee", "膝の裏", "ひざのうら", "膝盖后侧"),
            bodyAssociationVocabulary("lap", "膝の上", "ひざのうえ", "膝上、大腿上")
          ],
          expressions: [
            bodyAssociationExpression("膝を曲げる", "ひざをまげる", "弯曲膝盖"),
            bodyAssociationExpression("膝を伸ばす", "ひざをのばす", "伸直膝盖"),
            bodyAssociationExpression("膝をつく", "ひざをつく", "跪下一只或双膝"),
            bodyAssociationExpression("膝が痛い", "ひざがいたい", "膝盖疼"),
            bodyAssociationExpression("膝を抱える", "ひざをかかえる", "抱膝"),
            bodyAssociationExpression("膝の上に置く", "ひざのうえにおく", "放在膝上")
          ],
          examples: [
            bodyAssociationExample("階段を上ると膝が痛みます。", "一上楼梯膝盖就疼。", [
              { text: "階段", reading: "かいだん" }, { text: "を" }, { text: "上", reading: "のぼ" }, { text: "ると" }, { text: "膝", reading: "ひざ" }, { text: "が" }, { text: "痛", reading: "いた" }, { text: "みます。" }
            ]),
            bodyAssociationExample("膝を曲げて座ってください。", "请弯曲膝盖坐下。", [
              { text: "膝", reading: "ひざ" }, { text: "を" }, { text: "曲", reading: "ま" }, { text: "げて" }, { text: "座", reading: "すわ" }, { text: "ってください。" }
            ])
          ]
        },
        {
          id: "shins-calves",
          title: "すね・ふくらはぎ",
          reading: "すね・ふくらはぎ",
          meaning: "小腿前侧与小腿肚",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("shin", "すね", "すね", "小腿前侧"),
            bodyAssociationVocabulary("calf", "ふくらはぎ", "ふくらはぎ", "小腿肚"),
            bodyAssociationVocabulary("front-shin", "向こうずね", "むこうずね", "胫部、小腿前侧"),
            bodyAssociationVocabulary("leg-hair", "すね毛", "すねげ", "腿毛")
          ],
          expressions: [
            bodyAssociationExpression("すねをぶつける", "すねをぶつける", "撞到小腿"),
            bodyAssociationExpression("ふくらはぎが張る", "ふくらはぎがはる", "小腿肚发紧"),
            bodyAssociationExpression("ふくらはぎがつる", "ふくらはぎがつる", "小腿抽筋"),
            bodyAssociationExpression("足がむくむ", "あしがむくむ", "腿脚浮肿"),
            bodyAssociationExpression("ふくらはぎをもむ", "ふくらはぎをもむ", "揉小腿")
          ],
          examples: [
            bodyAssociationExample("走った後、ふくらはぎが張っています。", "跑完以后小腿肚发紧。", [
              { text: "走", reading: "はし" }, { text: "った" }, { text: "後", reading: "あと" }, { text: "、ふくらはぎが" }, { text: "張", reading: "は" }, { text: "っています。" }
            ]),
            bodyAssociationExample("机の角にすねをぶつけました。", "小腿撞到了桌角。", [
              { text: "机", reading: "つくえ" }, { text: "の" }, { text: "角", reading: "かど" }, { text: "にすねをぶつけました。" }
            ])
          ]
        },
        {
          id: "ankles-heels",
          title: "足首・かかと",
          reading: "あしくび・かかと",
          meaning: "脚踝与脚跟",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("ankle", "足首", "あしくび", "脚踝"),
            bodyAssociationVocabulary("ankle-bone", "くるぶし", "くるぶし", "踝骨、脚踝突起"),
            bodyAssociationVocabulary("heel", "かかと", "かかと", "脚后跟"),
            bodyAssociationVocabulary("shoe-rub", "靴ずれ", "くつずれ", "鞋子磨脚")
          ],
          expressions: [
            bodyAssociationExpression("足首を回す", "あしくびをまわす", "转动脚踝"),
            bodyAssociationExpression("足首をひねる", "あしくびをひねる", "扭伤脚踝"),
            bodyAssociationExpression("足首が腫れる", "あしくびがはれる", "脚踝肿"),
            bodyAssociationExpression("かかとを上げる", "かかとをあげる", "抬起脚后跟"),
            bodyAssociationExpression("かかとが痛い", "かかとがいたい", "脚后跟疼"),
            bodyAssociationExpression("靴ずれができる", "くつずれができる", "鞋子磨出水泡")
          ],
          examples: [
            bodyAssociationExample("段差で足首をひねりました。", "在台阶处扭伤了脚踝。", [
              { text: "段差", reading: "だんさ" }, { text: "で" }, { text: "足首", reading: "あしくび" }, { text: "をひねりました。" }
            ]),
            bodyAssociationExample("新しい靴でかかとが痛いです。", "穿新鞋脚后跟疼。", [
              { text: "新", reading: "あたら" }, { text: "しい" }, { text: "靴", reading: "くつ" }, { text: "でかかとが" }, { text: "痛", reading: "いた" }, { text: "いです。" }
            ])
          ]
        },
        {
          id: "feet-soles",
          title: "足・足の裏",
          reading: "あし・あしのうら",
          meaning: "脚与脚底",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("foot", "足", "あし", "脚、脚部"),
            bodyAssociationVocabulary("instep", "足の甲", "あしのこう", "脚背"),
            bodyAssociationVocabulary("sole", "足の裏", "あしのうら", "脚底"),
            bodyAssociationVocabulary("arch", "土踏まず", "つちふまず", "足弓"),
            bodyAssociationVocabulary("barefoot", "裸足", "はだし", "赤脚"),
            bodyAssociationVocabulary("tiptoe", "つま先", "つまさき", "脚尖")
          ],
          expressions: [
            bodyAssociationExpression("足を洗う", "あしをあらう", "洗脚"),
            bodyAssociationExpression("足を踏む", "あしをふむ", "踩到脚"),
            bodyAssociationExpression("足の裏が痛い", "あしのうらがいたい", "脚底疼"),
            bodyAssociationExpression("つま先で立つ", "つまさきでたつ", "踮脚站立"),
            bodyAssociationExpression("裸足で歩く", "はだしであるく", "赤脚走路"),
            bodyAssociationExpression("足を滑らせる", "あしをすべらせる", "脚下一滑")
          ],
          examples: [
            bodyAssociationExample("一日中歩いて、足の裏が痛いです。", "走了一整天，脚底疼。", [
              { text: "一日中", reading: "いちにちじゅう" }, { text: "歩", reading: "ある" }, { text: "いて、" }, { text: "足", reading: "あし" }, { text: "の" }, { text: "裏", reading: "うら" }, { text: "が" }, { text: "痛", reading: "いた" }, { text: "いです。" }
            ]),
            bodyAssociationExample("床が冷たいので、裸足では歩きません。", "地板很凉，所以不赤脚走。", [
              { text: "床", reading: "ゆか" }, { text: "が" }, { text: "冷", reading: "つめ" }, { text: "たいので、" }, { text: "裸足", reading: "はだし" }, { text: "では" }, { text: "歩", reading: "ある" }, { text: "きません。" }
            ])
          ]
        },
        {
          id: "toes-toenails",
          title: "足の指・爪",
          reading: "あしのゆび・つめ",
          meaning: "脚趾与脚趾甲",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("toe", "足の指", "あしのゆび", "脚趾"),
            bodyAssociationVocabulary("big-toe", "足の親指", "あしのおやゆび", "大脚趾"),
            bodyAssociationVocabulary("little-toe", "足の小指", "あしのこゆび", "小脚趾"),
            bodyAssociationVocabulary("toenail", "足の爪", "あしのつめ", "脚趾甲"),
            bodyAssociationVocabulary("toe-tip", "指先", "ゆびさき", "趾尖、指尖")
          ],
          expressions: [
            bodyAssociationExpression("足の指を動かす", "あしのゆびをうごかす", "活动脚趾"),
            bodyAssociationExpression("足の指をぶつける", "あしのゆびをぶつける", "撞到脚趾"),
            bodyAssociationExpression("足の爪を切る", "あしのつめをきる", "剪脚趾甲"),
            bodyAssociationExpression("つま先をぶつける", "つまさきをぶつける", "撞到脚尖"),
            bodyAssociationExpression("指先が冷える", "ゆびさきがひえる", "趾尖发凉")
          ],
          examples: [
            bodyAssociationExample("椅子に足の小指をぶつけました。", "小脚趾撞到了椅子。", [
              { text: "椅子", reading: "いす" }, { text: "に" }, { text: "足", reading: "あし" }, { text: "の" }, { text: "小指", reading: "こゆび" }, { text: "をぶつけました。" }
            ]),
            bodyAssociationExample("お風呂の後で足の爪を切ります。", "洗澡后剪脚趾甲。", [
              { text: "お" }, { text: "風呂", reading: "ふろ" }, { text: "の" }, { text: "後", reading: "あと" }, { text: "で" }, { text: "足", reading: "あし" }, { text: "の" }, { text: "爪", reading: "つめ" }, { text: "を" }, { text: "切", reading: "き" }, { text: "ります。" }
            ])
          ]
        }
      ]
    },
    {
      id: "inside-body",
      title: "体内・内臓",
      reading: "たいない・ないぞう",
      meaning: "身体内部",
      note: "只保留日常会话中常见的内部器官、呼吸、消化和身体反应。",
      categories: [
        {
          id: "heart-blood",
          title: "心臓・血",
          reading: "しんぞう・ち",
          meaning: "心脏与血液",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("heart", "心臓", "しんぞう", "心脏"),
            bodyAssociationVocabulary("blood", "血", "ち", "血"),
            bodyAssociationVocabulary("pulse-inner", "脈", "みゃく", "脉搏"),
            bodyAssociationVocabulary("blood-pressure", "血圧", "けつあつ", "血压"),
            bodyAssociationVocabulary("heartbeat-inner", "心拍", "しんぱく", "心跳、心率")
          ],
          expressions: [
            bodyAssociationExpression("心臓がどきどきする", "しんぞうがどきどきする", "心怦怦跳"),
            bodyAssociationExpression("脈が速い", "みゃくがはやい", "脉搏快"),
            bodyAssociationExpression("血が出る", "ちがでる", "出血"),
            bodyAssociationExpression("血が止まる", "ちがとまる", "血止住"),
            bodyAssociationExpression("血圧を測る", "けつあつをはかる", "量血压"),
            bodyAssociationExpression("心拍数が上がる", "しんぱくすうがあがる", "心率上升")
          ],
          examples: [
            bodyAssociationExample("走った後は心臓がどきどきします。", "跑完以后心怦怦跳。", [
              { text: "走", reading: "はし" }, { text: "った" }, { text: "後", reading: "あと" }, { text: "は" }, { text: "心臓", reading: "しんぞう" }, { text: "がどきどきします。" }
            ]),
            bodyAssociationExample("少し血が出ましたが、もう止まりました。", "流了一点血，不过已经止住了。", [
              { text: "少し", reading: "すこし" }, { text: "血", reading: "ち" }, { text: "が" }, { text: "出", reading: "で" }, { text: "ましたが、もう" }, { text: "止", reading: "と" }, { text: "まりました。" }
            ])
          ]
        },
        {
          id: "lungs-breathing",
          title: "肺・呼吸",
          reading: "はい・こきゅう",
          meaning: "肺与呼吸",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("lungs", "肺", "はい", "肺"),
            bodyAssociationVocabulary("breathing", "呼吸", "こきゅう", "呼吸"),
            bodyAssociationVocabulary("breath-inside", "息", "いき", "气息、呼吸"),
            bodyAssociationVocabulary("deep-breath", "深呼吸", "しんこきゅう", "深呼吸"),
            bodyAssociationVocabulary("air", "空気", "くうき", "空气")
          ],
          expressions: [
            bodyAssociationExpression("呼吸をする", "こきゅうをする", "呼吸"),
            bodyAssociationExpression("深呼吸をする", "しんこきゅうをする", "做深呼吸"),
            bodyAssociationExpression("息を止める", "いきをとめる", "屏住呼吸"),
            bodyAssociationExpression("息が切れる", "いきがきれる", "上气不接下气"),
            bodyAssociationExpression("息苦しい", "いきぐるしい", "呼吸困难、憋闷"),
            bodyAssociationExpression("息を整える", "いきをととのえる", "调整呼吸")
          ],
          examples: [
            bodyAssociationExample("階段を走って、息が切れました。", "跑上楼梯后上气不接下气。", [
              { text: "階段", reading: "かいだん" }, { text: "を" }, { text: "走", reading: "はし" }, { text: "って、" }, { text: "息", reading: "いき" }, { text: "が" }, { text: "切", reading: "き" }, { text: "れました。" }
            ]),
            bodyAssociationExample("一度深呼吸して、落ち着きましょう。", "先深呼吸一次，冷静下来吧。", [
              { text: "一度", reading: "いちど" }, { text: "深呼吸", reading: "しんこきゅう" }, { text: "して、" }, { text: "落", reading: "お" }, { text: "ち" }, { text: "着", reading: "つ" }, { text: "きましょう。" }
            ])
          ]
        },
        {
          id: "stomach-intestines",
          title: "胃・腸",
          reading: "い・ちょう",
          meaning: "胃与肠道",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("stomach", "胃", "い", "胃"),
            bodyAssociationVocabulary("intestines", "腸", "ちょう", "肠道"),
            bodyAssociationVocabulary("digestion", "消化", "しょうか", "消化"),
            bodyAssociationVocabulary("appetite-inner", "食欲", "しょくよく", "食欲"),
            bodyAssociationVocabulary("stomach-condition", "胃腸", "いちょう", "胃肠")
          ],
          expressions: [
            bodyAssociationExpression("胃が痛い", "いがいたい", "胃疼"),
            bodyAssociationExpression("胃がもたれる", "いがもたれる", "胃胀、不消化"),
            bodyAssociationExpression("胃に優しい", "いにやさしい", "对胃温和"),
            bodyAssociationExpression("消化がいい", "しょうかがいい", "容易消化"),
            bodyAssociationExpression("食欲がある", "しょくよくがある", "有食欲"),
            bodyAssociationExpression("食欲がない", "しょくよくがない", "没有食欲")
          ],
          examples: [
            bodyAssociationExample("脂っこい物を食べて、胃がもたれています。", "吃了油腻的东西，胃里不舒服。", [
              { text: "脂", reading: "あぶら" }, { text: "っこい" }, { text: "物", reading: "もの" }, { text: "を" }, { text: "食", reading: "た" }, { text: "べて、" }, { text: "胃", reading: "い" }, { text: "がもたれています。" }
            ]),
            bodyAssociationExample("今日はあまり食欲がありません。", "今天没什么食欲。", [
              { text: "今日", reading: "きょう" }, { text: "はあまり" }, { text: "食欲", reading: "しょくよく" }, { text: "がありません。" }
            ])
          ]
        },
        {
          id: "liver-kidneys",
          title: "肝臓・腎臓",
          reading: "かんぞう・じんぞう",
          meaning: "肝脏与肾脏",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("liver", "肝臓", "かんぞう", "肝脏"),
            bodyAssociationVocabulary("kidneys", "腎臓", "じんぞう", "肾脏"),
            bodyAssociationVocabulary("internal-organs", "内臓", "ないぞう", "内脏"),
            bodyAssociationVocabulary("health-check", "健康診断", "けんこうしんだん", "健康检查"),
            bodyAssociationVocabulary("test-result", "検査結果", "けんさけっか", "检查结果")
          ],
          expressions: [
            bodyAssociationExpression("肝臓を休ませる", "かんぞうをやすませる", "让肝脏休息"),
            bodyAssociationExpression("お酒を控える", "おさけをひかえる", "少喝酒、戒酒"),
            bodyAssociationExpression("水分を取る", "すいぶんをとる", "补充水分"),
            bodyAssociationExpression("健康診断を受ける", "けんこうしんだんをうける", "接受健康检查"),
            bodyAssociationExpression("検査結果を見る", "けんさけっかをみる", "查看检查结果")
          ],
          examples: [
            bodyAssociationExample("健康診断で肝臓の数値を確認しました。", "体检时确认了肝脏相关数值。", [
              { text: "健康診断", reading: "けんこうしんだん" }, { text: "で" }, { text: "肝臓", reading: "かんぞう" }, { text: "の" }, { text: "数値", reading: "すうち" }, { text: "を" }, { text: "確認", reading: "かくにん" }, { text: "しました。" }
            ]),
            bodyAssociationExample("今日はお酒を控えて、水を多めに飲みます。", "今天少喝酒，多喝一点水。", [
              { text: "今日", reading: "きょう" }, { text: "はお" }, { text: "酒", reading: "さけ" }, { text: "を" }, { text: "控", reading: "ひか" }, { text: "えて、" }, { text: "水", reading: "みず" }, { text: "を" }, { text: "多", reading: "おお" }, { text: "めに" }, { text: "飲", reading: "の" }, { text: "みます。" }
            ])
          ]
        }
      ]
    },
    {
      id: "whole-body-condition",
      title: "全身・体調",
      reading: "ぜんしん・たいちょう",
      meaning: "全身与身体状态",
      note: "补充皮肤、体温、肌肉与全身状态，让身体感受可以直接说出口。",
      categories: [
        {
          id: "skin",
          title: "肌・皮膚",
          reading: "はだ・ひふ",
          meaning: "肌肤与皮肤",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("skin-daily", "肌", "はだ", "肌肤"),
            bodyAssociationVocabulary("skin-formal", "皮膚", "ひふ", "皮肤"),
            bodyAssociationVocabulary("pores", "毛穴", "けあな", "毛孔"),
            bodyAssociationVocabulary("rash", "湿疹", "しっしん", "湿疹、皮疹"),
            bodyAssociationVocabulary("dryness", "乾燥", "かんそう", "干燥"),
            bodyAssociationVocabulary("itch", "かゆみ", "かゆみ", "瘙痒")
          ],
          expressions: [
            bodyAssociationExpression("肌が乾燥する", "はだがかんそうする", "皮肤干燥"),
            bodyAssociationExpression("肌が荒れる", "はだがあれる", "皮肤粗糙、状态变差"),
            bodyAssociationExpression("皮膚がかゆい", "ひふがかゆい", "皮肤痒"),
            bodyAssociationExpression("赤くなる", "あかくなる", "变红"),
            bodyAssociationExpression("日焼けする", "ひやけする", "晒黑、晒伤"),
            bodyAssociationExpression("クリームを塗る", "クリームをぬる", "涂乳霜")
          ],
          examples: [
            bodyAssociationExample("空気が乾燥して、肌がかゆいです。", "空气干燥，皮肤很痒。", [
              { text: "空気", reading: "くうき" }, { text: "が" }, { text: "乾燥", reading: "かんそう" }, { text: "して、" }, { text: "肌", reading: "はだ" }, { text: "がかゆいです。" }
            ]),
            bodyAssociationExample("お風呂の後にクリームを塗ります。", "洗澡后涂乳霜。", [
              { text: "お" }, { text: "風呂", reading: "ふろ" }, { text: "の" }, { text: "後", reading: "あと" }, { text: "にクリームを" }, { text: "塗", reading: "ぬ" }, { text: "ります。" }
            ])
          ]
        },
        {
          id: "temperature-sweat",
          title: "体温・汗",
          reading: "たいおん・あせ",
          meaning: "体温与出汗",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("temperature", "体温", "たいおん", "体温"),
            bodyAssociationVocabulary("fever", "熱", "ねつ", "发热、体温"),
            bodyAssociationVocabulary("sweat-body", "汗", "あせ", "汗"),
            bodyAssociationVocabulary("chills", "寒気", "さむけ", "寒战、发冷"),
            bodyAssociationVocabulary("thermometer", "体温計", "たいおんけい", "体温计")
          ],
          expressions: [
            bodyAssociationExpression("体温を測る", "たいおんをはかる", "量体温"),
            bodyAssociationExpression("熱がある", "ねつがある", "发烧"),
            bodyAssociationExpression("熱が下がる", "ねつがさがる", "退烧"),
            bodyAssociationExpression("汗をかく", "あせをかく", "出汗"),
            bodyAssociationExpression("汗を拭く", "あせをふく", "擦汗"),
            bodyAssociationExpression("寒気がする", "さむけがする", "感觉发冷")
          ],
          examples: [
            bodyAssociationExample("少し熱があるので、体温を測ります。", "有点发烧，所以量一下体温。", [
              { text: "少し", reading: "すこし" }, { text: "熱", reading: "ねつ" }, { text: "があるので、" }, { text: "体温", reading: "たいおん" }, { text: "を" }, { text: "測", reading: "はか" }, { text: "ります。" }
            ]),
            bodyAssociationExample("暑くて汗が止まりません。", "太热了，汗一直不停。", [
              { text: "暑", reading: "あつ" }, { text: "くて" }, { text: "汗", reading: "あせ" }, { text: "が" }, { text: "止", reading: "と" }, { text: "まりません。" }
            ])
          ]
        },
        {
          id: "bones-muscles",
          title: "骨・筋肉",
          reading: "ほね・きんにく",
          meaning: "骨骼与肌肉",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("bone", "骨", "ほね", "骨头"),
            bodyAssociationVocabulary("muscle", "筋肉", "きんにく", "肌肉"),
            bodyAssociationVocabulary("joint-body", "関節", "かんせつ", "关节"),
            bodyAssociationVocabulary("body-strength", "体力", "たいりょく", "体力"),
            bodyAssociationVocabulary("muscle-pain", "筋肉痛", "きんにくつう", "肌肉酸痛")
          ],
          expressions: [
            bodyAssociationExpression("筋肉を鍛える", "きんにくをきたえる", "锻炼肌肉"),
            bodyAssociationExpression("筋肉をほぐす", "きんにくをほぐす", "放松肌肉"),
            bodyAssociationExpression("筋肉痛になる", "きんにくつうになる", "肌肉酸痛"),
            bodyAssociationExpression("関節を動かす", "かんせつをうごかす", "活动关节"),
            bodyAssociationExpression("体力が落ちる", "たいりょくがおちる", "体力下降"),
            bodyAssociationExpression("体力をつける", "たいりょくをつける", "增强体力")
          ],
          examples: [
            bodyAssociationExample("昨日運動したので、全身が筋肉痛です。", "昨天运动了，所以全身肌肉酸痛。", [
              { text: "昨日", reading: "きのう" }, { text: "運動", reading: "うんどう" }, { text: "したので、" }, { text: "全身", reading: "ぜんしん" }, { text: "が" }, { text: "筋肉痛", reading: "きんにくつう" }, { text: "です。" }
            ]),
            bodyAssociationExample("毎日少しずつ体力をつけたいです。", "我想每天一点点增强体力。", [
              { text: "毎日", reading: "まいにち" }, { text: "少し", reading: "すこし" }, { text: "ずつ" }, { text: "体力", reading: "たいりょく" }, { text: "をつけたいです。" }
            ])
          ]
        },
        {
          id: "condition-pain",
          title: "体調・痛み",
          reading: "たいちょう・いたみ",
          meaning: "身体状态与疼痛",
          compactVocabulary: true,
          items: [
            bodyAssociationVocabulary("condition", "体調", "たいちょう", "身体状况"),
            bodyAssociationVocabulary("pain", "痛み", "いたみ", "疼痛"),
            bodyAssociationVocabulary("fatigue", "疲れ", "つかれ", "疲劳"),
            bodyAssociationVocabulary("dullness", "だるさ", "だるさ", "乏力、倦怠"),
            bodyAssociationVocabulary("numbness", "しびれ", "しびれ", "麻木"),
            bodyAssociationVocabulary("swelling", "腫れ", "はれ", "肿胀")
          ],
          expressions: [
            bodyAssociationExpression("体調がいい", "たいちょうがいい", "身体状态好"),
            bodyAssociationExpression("体調が悪い", "たいちょうがわるい", "身体不舒服"),
            bodyAssociationExpression("全身がだるい", "ぜんしんがだるい", "全身乏力"),
            bodyAssociationExpression("痛みが続く", "いたみがつづく", "疼痛持续"),
            bodyAssociationExpression("疲れがたまる", "つかれがたまる", "积累疲劳"),
            bodyAssociationExpression("少し休む", "すこしやすむ", "稍微休息"),
            bodyAssociationExpression("無理をしない", "むりをしない", "不要勉强"),
            bodyAssociationExpression("体を休める", "からだをやすめる", "让身体休息")
          ],
          examples: [
            bodyAssociationExample("今日は体調がよくないので、早めに休みます。", "今天身体不太舒服，所以早点休息。", [
              { text: "今日", reading: "きょう" }, { text: "は" }, { text: "体調", reading: "たいちょう" }, { text: "がよくないので、" }, { text: "早", reading: "はや" }, { text: "めに" }, { text: "休", reading: "やす" }, { text: "みます。" }
            ]),
            bodyAssociationExample("痛みが続くなら、無理をしないでください。", "如果一直疼，请不要勉强。", [
              { text: "痛", reading: "いた" }, { text: "みが" }, { text: "続", reading: "つづ" }, { text: "くなら、" }, { text: "無理", reading: "むり" }, { text: "をしないでください。" }
            ])
          ]
        }
      ]
    }
  ]
};

const bodyAssociationExpressionData = {
  hair: [
    bodyAssociationExpression("髪を切る", "かみをきる", "剪头发"),
    bodyAssociationExpression("髪を洗う", "かみをあらう", "洗头"),
    bodyAssociationExpression("髪を乾かす", "かみをかわかす", "吹干头发"),
    bodyAssociationExpression("髪を伸ばす", "かみをのばす", "留长头发"),
    bodyAssociationExpression("髪を染める", "かみをそめる", "染头发"),
    bodyAssociationExpression("髪が抜ける", "かみがぬける", "掉头发")
  ],
  face: [
    bodyAssociationExpression("顔を洗う", "かおをあらう", "洗脸"),
    bodyAssociationExpression("顔を上げる", "かおをあげる", "抬起脸"),
    bodyAssociationExpression("顔を隠す", "かおをかくす", "遮住脸"),
    bodyAssociationExpression("顔色が悪い", "かおいろがわるい", "脸色不好"),
    bodyAssociationExpression("額に汗をかく", "ひたいにあせをかく", "额头出汗"),
    bodyAssociationExpression("頬が赤くなる", "ほおがあかくなる", "脸颊变红")
  ],
  "eyes-eyebrows": [
    bodyAssociationExpression("目を開ける", "めをあける", "睁眼"),
    bodyAssociationExpression("目を閉じる", "めをとじる", "闭眼"),
    bodyAssociationExpression("目をこする", "めをこする", "揉眼睛"),
    bodyAssociationExpression("目が合う", "めがあう", "视线相遇"),
    bodyAssociationExpression("目が疲れる", "めがつかれる", "眼睛疲劳"),
    bodyAssociationExpression("目がかゆい", "めがかゆい", "眼睛痒"),
    bodyAssociationExpression("涙が出る", "なみだがでる", "流眼泪"),
    bodyAssociationExpression("眉毛を整える", "まゆげをととのえる", "修眉毛")
  ],
  nose: [
    bodyAssociationExpression("においを嗅ぐ", "においをかぐ", "闻气味"),
    bodyAssociationExpression("鼻をかむ", "はなをかむ", "擤鼻涕", [{ text: "鼻", reading: "はな" }, { text: "をかむ" }]),
    bodyAssociationExpression("鼻が詰まる", "はながつまる", "鼻塞", [{ text: "鼻", reading: "はな" }, { text: "が" }, { text: "詰まる", reading: "つまる" }]),
    bodyAssociationExpression("鼻水が出る", "はなみずがでる", "流鼻涕"),
    bodyAssociationExpression("鼻で息をする", "はなでいきをする", "用鼻子呼吸")
  ],
  ears: [
    bodyAssociationExpression("耳をふさぐ", "みみをふさぐ", "捂住耳朵"),
    bodyAssociationExpression("耳を傾ける", "みみをかたむける", "侧耳倾听"),
    bodyAssociationExpression("耳が痛い", "みみがいたい", "耳朵疼"),
    bodyAssociationExpression("音が聞こえる", "おとがきこえる", "听到声音"),
    bodyAssociationExpression("よく聞こえない", "よくきこえない", "听不清楚")
  ],
  "mouth-teeth": [
    bodyAssociationExpression("口を開ける", "くちをあける", "张嘴"),
    bodyAssociationExpression("口を閉じる", "くちをとじる", "闭嘴"),
    bodyAssociationExpression("歯を磨く", "はをみがく", "刷牙"),
    bodyAssociationExpression("舌を出す", "したをだす", "伸舌头"),
    bodyAssociationExpression("唇が乾く", "くちびるがかわく", "嘴唇干"),
    bodyAssociationExpression("歯が痛い", "はがいたい", "牙疼"),
    bodyAssociationExpression("歯茎から血が出る", "はぐきからちがでる", "牙龈出血")
  ],
  "neck-throat": [
    bodyAssociationExpression("首を振る", "くびをふる", "摇头"),
    bodyAssociationExpression("首をかしげる", "くびをかしげる", "歪头表示疑惑"),
    bodyAssociationExpression("首を回す", "くびをまわす", "转动脖子"),
    bodyAssociationExpression("首が痛い", "くびがいたい", "脖子疼"),
    bodyAssociationExpression("首がこる", "くびがこる", "脖子僵硬"),
    bodyAssociationExpression("喉が痛い", "のどがいたい", "喉咙疼"),
    bodyAssociationExpression("喉が渇く", "のどがかわく", "口渴"),
    bodyAssociationExpression("水を飲む", "みずをのむ", "喝水")
  ]
};

/*
 * 数量・量词模块（第一阶段）。
 * 同一物品可以出现在多个量词的 objects 中，搜索时由 script.js 动态反查，
 * 因而不会把物品限制为只能对应一个量词。
 */
const counterObject = (word, reading, meaning, searchTerms = []) => ({
  word,
  reading,
  meaning,
  searchTerms
});

const counterCountSeries = (entries) => entries.map(([text, reading, irregular = false], index) => ({
  number: index + 1,
  text,
  reading,
  irregular
}));

const counterExample = (text, meaning, segments = [], searchTerms = []) => ({
  text,
  meaning,
  segments,
  searchTerms
});

const counterAssociationData = {
  id: "counter-association",
  title: "数量与量词",
  japaneseTitle: "数え方・助数詞",
  reading: "かぞえかた・じょすうし",
  meaning: "数量与量词",
  icon: "数",
  badge: "常用",
  cardLabel: "COUNT & COUNTERS",
  description: "12 个常用量词 · 物品反查",
  layout: "counter-association",
  categories: [
    {
      id: "general-counting",
      title: "通用数量",
      reading: "つうようすうりょう",
      meaning: "不确定量词时、小型物品",
      summary: "つ・個",
      counterIds: ["tsu", "ko"]
    },
    {
      id: "people-animals",
      title: "人・動物",
      reading: "ひと・どうぶつ",
      meaning: "人物与常见动物",
      summary: "人・匹",
      counterIds: ["nin", "hiki"]
    },
    {
      id: "objects-shapes",
      title: "物品・形状",
      reading: "ぶっぴん・けいじょう",
      meaning: "按物品形状或种类计数",
      summary: "本・枚・台・冊",
      counterIds: ["hon", "mai", "dai", "satsu"]
    },
    {
      id: "food-drink",
      title: "飲食",
      reading: "いんしょく",
      meaning: "杯装饮料",
      summary: "杯",
      counterIds: ["hai"]
    },
    {
      id: "daily-numbers",
      title: "生活数字",
      reading: "せいかつすうじ",
      meaning: "次数、年龄、楼层",
      summary: "回・歳・階",
      counterIds: ["kai-times", "sai", "kai-floor"]
    }
  ],
  counters: {
    tsu: {
      id: "tsu",
      counter: "つ",
      reading: "つ",
      meaning: "一般物品、事情",
      usage: "不强调具体形状时计数物品，也可用于抽象事物。",
      categoryId: "general-counting",
      searchTerms: ["通用", "几个", "多少", "一般物品", "抽象事物"],
      objects: [
        counterObject("りんご", "りんご", "苹果"),
        counterObject("質問", "しつもん", "问题"),
        counterObject("お願い", "おねがい", "请求"),
        counterObject("荷物", "にもつ", "行李")
      ],
      counts: counterCountSeries([
        ["一つ", "ひとつ"], ["二つ", "ふたつ"], ["三つ", "みっつ"], ["四つ", "よっつ"], ["五つ", "いつつ"],
        ["六つ", "むっつ"], ["七つ", "ななつ"], ["八つ", "やっつ"], ["九つ", "ここのつ"], ["十", "とお"]
      ]),
      question: {
        text: "いくつ",
        reading: "いくつ",
        meaning: "几个、多少",
        example: "荷物はいくつありますか。",
        exampleMeaning: "有几件行李？",
        segments: [{ text: "荷物", reading: "にもつ" }, { text: "はいくつありますか。" }]
      },
      examples: [
        counterExample("りんごを三つ買いました。", "买了三个苹果。", [
          { text: "りんごを" }, { text: "三つ", reading: "みっつ" }, { text: "買", reading: "か" }, { text: "いました。" }
        ]),
        counterExample("質問が一つあります。", "我有一个问题。", [
          { text: "質問", reading: "しつもん" }, { text: "が" }, { text: "一つ", reading: "ひとつ" }, { text: "あります。" }
        ])
      ],
      tip: "「つ」一般使用到十；数量更大时通常使用「個」或更具体的量词。"
    },
    ko: {
      id: "ko",
      counter: "個",
      reading: "こ",
      meaning: "小型物品",
      usage: "小型物品、形状明确的单个物品。",
      categoryId: "general-counting",
      searchTerms: ["小型", "几个", "单个物品"],
      objects: [
        counterObject("卵", "たまご", "鸡蛋"),
        counterObject("りんご", "りんご", "苹果"),
        counterObject("箱", "はこ", "盒子"),
        counterObject("ボール", "ボール", "球")
      ],
      counts: counterCountSeries([
        ["一個", "いっこ", true], ["二個", "にこ"], ["三個", "さんこ"], ["四個", "よんこ"], ["五個", "ごこ"],
        ["六個", "ろっこ", true], ["七個", "ななこ"], ["八個", "はっこ", true], ["九個", "きゅうこ"], ["十個", "じゅっこ", true]
      ]),
      question: {
        text: "何個",
        reading: "なんこ",
        meaning: "几个",
        example: "箱はいくつありますか。",
        exampleMeaning: "有几个箱子？",
        segments: [{ text: "箱", reading: "はこ" }, { text: "はいくつありますか。" }]
      },
      examples: [
        counterExample("卵を六個買いました。", "买了六个鸡蛋。", [
          { text: "卵", reading: "たまご" }, { text: "を" }, { text: "六個", reading: "ろっこ" }, { text: "買", reading: "か" }, { text: "いました。" }
        ]),
        counterExample("箱はいくつありますか。", "有几个箱子？", [
          { text: "箱", reading: "はこ" }, { text: "はいくつありますか。" }
        ])
      ]
    },
    nin: {
      id: "nin",
      counter: "人",
      reading: "にん",
      meaning: "人数",
      usage: "计算人数。",
      categoryId: "people-animals",
      searchTerms: ["人物", "人数", "几个人", "多少人"],
      objects: [
        counterObject("学生", "がくせい", "学生"),
        counterObject("友達", "ともだち", "朋友"),
        counterObject("店員", "てんいん", "店员"),
        counterObject("家族", "かぞく", "家人")
      ],
      counts: counterCountSeries([
        ["一人", "ひとり", true], ["二人", "ふたり", true], ["三人", "さんにん"], ["四人", "よにん", true], ["五人", "ごにん"],
        ["六人", "ろくにん"], ["七人", "しちにん"], ["八人", "はちにん"], ["九人", "きゅうにん"], ["十人", "じゅうにん"]
      ]),
      question: {
        text: "何人",
        reading: "なんにん",
        meaning: "几个人",
        example: "何人で来ますか。",
        exampleMeaning: "几个人来？",
        segments: [{ text: "何人", reading: "なんにん" }, { text: "で" }, { text: "来", reading: "き" }, { text: "ますか。" }]
      },
      examples: [
        counterExample("家族は四人です。", "我家有四个人。", [
          { text: "家族", reading: "かぞく" }, { text: "は" }, { text: "四人", reading: "よにん" }, { text: "です。" }
        ]),
        counterExample("何人で来ますか。", "几个人来？", [
          { text: "何人", reading: "なんにん" }, { text: "で" }, { text: "来", reading: "き" }, { text: "ますか。" }
        ])
      ]
    },
    hiki: {
      id: "hiki",
      counter: "匹",
      reading: "ひき",
      meaning: "常见动物",
      usage: "猫、狗、鱼、昆虫等常见动物。",
      categoryId: "people-animals",
      searchTerms: ["动物", "几只", "几条"],
      objects: [
        counterObject("猫", "ねこ", "猫"),
        counterObject("犬", "いぬ", "狗"),
        counterObject("魚", "さかな", "鱼"),
        counterObject("虫", "むし", "虫子")
      ],
      counts: counterCountSeries([
        ["一匹", "いっぴき", true], ["二匹", "にひき"], ["三匹", "さんびき", true], ["四匹", "よんひき"], ["五匹", "ごひき"],
        ["六匹", "ろっぴき", true], ["七匹", "ななひき"], ["八匹", "はっぴき", true], ["九匹", "きゅうひき"], ["十匹", "じゅっぴき", true]
      ]),
      question: {
        text: "何匹",
        reading: "なんびき",
        meaning: "几只、几条",
        example: "魚は何匹いますか。",
        exampleMeaning: "有几条鱼？",
        segments: [{ text: "魚", reading: "さかな" }, { text: "は" }, { text: "何匹", reading: "なんびき" }, { text: "いますか。" }]
      },
      examples: [
        counterExample("猫を二匹飼っています。", "养了两只猫。", [
          { text: "猫", reading: "ねこ" }, { text: "を" }, { text: "二匹", reading: "にひき" }, { text: "飼", reading: "か" }, { text: "っています。" }
        ]),
        counterExample("魚は何匹いますか。", "有几条鱼？", [
          { text: "魚", reading: "さかな" }, { text: "は" }, { text: "何匹", reading: "なんびき" }, { text: "いますか。" }
        ])
      ]
    },
    hon: {
      id: "hon",
      counter: "本",
      reading: "ほん",
      meaning: "细长物品",
      usage: "细长的物品。",
      categoryId: "objects-shapes",
      searchTerms: ["细长", "几根", "几瓶", "几把"],
      objects: [
        counterObject("ペン", "ペン", "笔"),
        counterObject("傘", "かさ", "伞"),
        counterObject("瓶", "びん", "瓶子"),
        counterObject("バナナ", "バナナ", "香蕉")
      ],
      counts: counterCountSeries([
        ["一本", "いっぽん", true], ["二本", "にほん"], ["三本", "さんぼん", true], ["四本", "よんほん"], ["五本", "ごほん"],
        ["六本", "ろっぽん", true], ["七本", "ななほん"], ["八本", "はっぽん", true], ["九本", "きゅうほん"], ["十本", "じゅっぽん", true]
      ]),
      question: {
        text: "何本",
        reading: "なんぼん",
        meaning: "几根、几瓶、几把",
        example: "傘は何本ありますか。",
        exampleMeaning: "有几把伞？",
        segments: [{ text: "傘", reading: "かさ" }, { text: "は" }, { text: "何本", reading: "なんぼん" }, { text: "ありますか。" }]
      },
      examples: [
        counterExample("傘を一本買いました。", "买了一把伞。", [
          { text: "傘", reading: "かさ" }, { text: "を" }, { text: "一本", reading: "いっぽん" }, { text: "買", reading: "か" }, { text: "いました。" }
        ]),
        counterExample("ペンを二本買いました。", "买了两支笔。", [
          { text: "ペンを" }, { text: "二本", reading: "にほん" }, { text: "買", reading: "か" }, { text: "いました。" }
        ]),
        counterExample("傘は何本ありますか。", "有几把伞？", [
          { text: "傘", reading: "かさ" }, { text: "は" }, { text: "何本", reading: "なんぼん" }, { text: "ありますか。" }
        ])
      ]
    },
    mai: {
      id: "mai",
      counter: "枚",
      reading: "まい",
      meaning: "薄而扁平的物品",
      usage: "薄而扁平的物品。",
      categoryId: "objects-shapes",
      searchTerms: ["薄", "扁平", "几张", "几片"],
      objects: [
        counterObject("紙", "かみ", "纸"),
        counterObject("写真", "しゃしん", "照片"),
        counterObject("切符", "きっぷ", "票"),
        counterObject("皿", "さら", "盘子")
      ],
      counts: counterCountSeries([
        ["一枚", "いちまい"], ["二枚", "にまい"], ["三枚", "さんまい"], ["四枚", "よんまい"], ["五枚", "ごまい"],
        ["六枚", "ろくまい"], ["七枚", "ななまい"], ["八枚", "はちまい"], ["九枚", "きゅうまい"], ["十枚", "じゅうまい"]
      ]),
      question: {
        text: "何枚",
        reading: "なんまい",
        meaning: "几张、几片",
        example: "写真は何枚ありますか。",
        exampleMeaning: "有几张照片？",
        segments: [{ text: "写真", reading: "しゃしん" }, { text: "は" }, { text: "何枚", reading: "なんまい" }, { text: "ありますか。" }]
      },
      examples: [
        counterExample("写真を三枚撮りました。", "拍了三张照片。", [
          { text: "写真", reading: "しゃしん" }, { text: "を" }, { text: "三枚", reading: "さんまい" }, { text: "撮", reading: "と" }, { text: "りました。" }
        ]),
        counterExample("切符を二枚ください。", "请给我两张票。", [
          { text: "切符", reading: "きっぷ" }, { text: "を" }, { text: "二枚", reading: "にまい" }, { text: "ください。" }
        ])
      ]
    },
    dai: {
      id: "dai",
      counter: "台",
      reading: "だい",
      meaning: "机器、设备、车辆",
      usage: "机器、电子设备、车辆。",
      categoryId: "objects-shapes",
      searchTerms: ["机器", "电子设备", "车辆", "几台", "几辆"],
      objects: [
        counterObject("パソコン", "パソコン", "电脑"),
        counterObject("テレビ", "テレビ", "电视"),
        counterObject("車", "くるま", "汽车"),
        counterObject("自転車", "じてんしゃ", "自行车")
      ],
      counts: counterCountSeries([
        ["一台", "いちだい"], ["二台", "にだい"], ["三台", "さんだい"], ["四台", "よんだい"], ["五台", "ごだい"],
        ["六台", "ろくだい"], ["七台", "ななだい"], ["八台", "はちだい"], ["九台", "きゅうだい"], ["十台", "じゅうだい"]
      ]),
      question: {
        text: "何台",
        reading: "なんだい",
        meaning: "几台、几辆",
        example: "パソコンは何台ありますか。",
        exampleMeaning: "有几台电脑？",
        segments: [{ text: "パソコンは" }, { text: "何台", reading: "なんだい" }, { text: "ありますか。" }]
      },
      examples: [
        counterExample("パソコンが二台あります。", "有两台电脑。", [
          { text: "パソコンが" }, { text: "二台", reading: "にだい" }, { text: "あります。" }
        ]),
        counterExample("車を一台買いました。", "买了一辆汽车。", [
          { text: "車", reading: "くるま" }, { text: "を" }, { text: "一台", reading: "いちだい" }, { text: "買", reading: "か" }, { text: "いました。" }
        ])
      ]
    },
    satsu: {
      id: "satsu",
      counter: "冊",
      reading: "さつ",
      meaning: "书籍、册子",
      usage: "书籍、杂志、笔记本等装订成册的物品。",
      categoryId: "objects-shapes",
      searchTerms: ["书", "书籍", "杂志", "几本"],
      objects: [
        counterObject("本", "ほん", "书"),
        counterObject("雑誌", "ざっし", "杂志"),
        counterObject("ノート", "ノート", "笔记本"),
        counterObject("教科書", "きょうかしょ", "教科书")
      ],
      counts: counterCountSeries([
        ["一冊", "いっさつ", true], ["二冊", "にさつ"], ["三冊", "さんさつ"], ["四冊", "よんさつ"], ["五冊", "ごさつ"],
        ["六冊", "ろくさつ"], ["七冊", "ななさつ"], ["八冊", "はっさつ", true], ["九冊", "きゅうさつ"], ["十冊", "じゅっさつ", true]
      ]),
      question: {
        text: "何冊",
        reading: "なんさつ",
        meaning: "几本、几册",
        example: "ノートは何冊必要ですか。",
        exampleMeaning: "需要几本笔记本？",
        segments: [{ text: "ノートは" }, { text: "何冊", reading: "なんさつ" }, { text: "必要", reading: "ひつよう" }, { text: "ですか。" }]
      },
      examples: [
        counterExample("本を三冊借りました。", "借了三本书。", [
          { text: "本", reading: "ほん" }, { text: "を" }, { text: "三冊", reading: "さんさつ" }, { text: "借", reading: "か" }, { text: "りました。" }
        ]),
        counterExample("ノートは何冊必要ですか。", "需要几本笔记本？", [
          { text: "ノートは" }, { text: "何冊", reading: "なんさつ" }, { text: "必要", reading: "ひつよう" }, { text: "ですか。" }
        ])
      ]
    },
    hai: {
      id: "hai",
      counter: "杯",
      reading: "はい",
      meaning: "杯装饮料",
      usage: "杯、碗等容器中的饮料。",
      categoryId: "food-drink",
      searchTerms: ["饮料", "饮食", "几杯"],
      objects: [
        counterObject("水", "みず", "水"),
        counterObject("コーヒー", "コーヒー", "咖啡"),
        counterObject("お茶", "おちゃ", "茶"),
        counterObject("ビール", "ビール", "啤酒")
      ],
      counts: counterCountSeries([
        ["一杯", "いっぱい", true], ["二杯", "にはい"], ["三杯", "さんばい", true], ["四杯", "よんはい"], ["五杯", "ごはい"],
        ["六杯", "ろっぱい", true], ["七杯", "ななはい"], ["八杯", "はっぱい", true], ["九杯", "きゅうはい"], ["十杯", "じゅっぱい", true]
      ]),
      question: {
        text: "何杯",
        reading: "なんばい",
        meaning: "几杯",
        example: "水を何杯飲みましたか。",
        exampleMeaning: "喝了几杯水？",
        segments: [{ text: "水", reading: "みず" }, { text: "を" }, { text: "何杯", reading: "なんばい" }, { text: "飲", reading: "の" }, { text: "みましたか。" }]
      },
      examples: [
        counterExample("コーヒーを一杯飲みました。", "喝了一杯咖啡。", [
          { text: "コーヒーを" }, { text: "一杯", reading: "いっぱい" }, { text: "飲", reading: "の" }, { text: "みました。" }
        ]),
        counterExample("水を何杯飲みましたか。", "喝了几杯水？", [
          { text: "水", reading: "みず" }, { text: "を" }, { text: "何杯", reading: "なんばい" }, { text: "飲", reading: "の" }, { text: "みましたか。" }
        ])
      ]
    },
    "kai-times": {
      id: "kai-times",
      counter: "回",
      reading: "かい",
      meaning: "动作、事件的次数",
      usage: "动作或事件发生的次数。",
      categoryId: "daily-numbers",
      searchTerms: ["次数", "几次", "多少次"],
      objects: [
        counterObject("旅行", "りょこう", "旅行"),
        counterObject("練習", "れんしゅう", "练习"),
        counterObject("電話", "でんわ", "打电话"),
        counterObject("試験", "しけん", "考试")
      ],
      counts: counterCountSeries([
        ["一回", "いっかい", true], ["二回", "にかい"], ["三回", "さんかい"], ["四回", "よんかい"], ["五回", "ごかい"],
        ["六回", "ろっかい", true], ["七回", "ななかい"], ["八回", "はちかい"], ["九回", "きゅうかい"], ["十回", "じゅっかい", true]
      ]),
      question: {
        text: "何回",
        reading: "なんかい",
        meaning: "几次",
        example: "日本へ何回来ましたか。",
        exampleMeaning: "来过日本几次？",
        segments: [{ text: "日本", reading: "にほん" }, { text: "へ" }, { text: "何回", reading: "なんかい" }, { text: "来", reading: "き" }, { text: "ましたか。" }]
      },
      examples: [
        counterExample("日本へ三回来ました。", "来过日本三次。", [
          { text: "日本", reading: "にほん" }, { text: "へ" }, { text: "三回", reading: "さんかい" }, { text: "来", reading: "き" }, { text: "ました。" }
        ]),
        counterExample("もう一回言ってください。", "请再说一遍。", [
          { text: "もう" }, { text: "一回", reading: "いっかい" }, { text: "言", reading: "い" }, { text: "ってください。" }
        ])
      ]
    },
    sai: {
      id: "sai",
      counter: "歳",
      reading: "さい",
      meaning: "年龄",
      usage: "表示年龄。",
      categoryId: "daily-numbers",
      searchTerms: ["年龄", "几岁", "多大"],
      objects: [
        counterObject("年齢", "ねんれい", "年龄"),
        counterObject("子ども", "こども", "儿童"),
        counterObject("大人", "おとな", "成人")
      ],
      counts: counterCountSeries([
        ["一歳", "いっさい", true], ["二歳", "にさい"], ["三歳", "さんさい"], ["四歳", "よんさい"], ["五歳", "ごさい"],
        ["六歳", "ろくさい"], ["七歳", "ななさい"], ["八歳", "はっさい", true], ["九歳", "きゅうさい"], ["十歳", "じゅっさい", true]
      ]),
      specialCounts: [{ text: "二十歳", reading: "はたち", meaning: "二十岁", irregular: true }],
      questions: [
        {
          text: "何歳",
          reading: "なんさい",
          meaning: "几岁",
          example: "弟は何歳ですか。",
          exampleMeaning: "弟弟几岁？",
          segments: [{ text: "弟", reading: "おとうと" }, { text: "は" }, { text: "何歳", reading: "なんさい" }, { text: "ですか。" }]
        },
        { text: "おいくつ", reading: "おいくつ", meaning: "多大年龄（较礼貌）" }
      ],
      examples: [
        counterExample("弟は十歳です。", "弟弟十岁。", [
          { text: "弟", reading: "おとうと" }, { text: "は" }, { text: "十歳", reading: "じゅっさい" }, { text: "です。" }
        ]),
        counterExample("今年二十四歳になりました。", "今年二十四岁了。", [
          { text: "今年", reading: "ことし" }, { text: "二十四歳", reading: "にじゅうよんさい" }, { text: "になりました。" }
        ])
      ]
    },
    "kai-floor": {
      id: "kai-floor",
      counter: "階",
      reading: "かい",
      meaning: "建筑物楼层",
      usage: "建筑物的楼层。",
      categoryId: "daily-numbers",
      searchTerms: ["楼层", "几楼", "第几层"],
      objects: [
        counterObject("学校", "がっこう", "学校"),
        counterObject("駅", "えき", "车站"),
        counterObject("デパート", "デパート", "百货商场"),
        counterObject("ホテル", "ホテル", "酒店")
      ],
      counts: counterCountSeries([
        ["一階", "いっかい", true], ["二階", "にかい"], ["三階", "さんがい", true], ["四階", "よんかい"], ["五階", "ごかい"],
        ["六階", "ろっかい", true], ["七階", "ななかい"], ["八階", "はちかい"], ["九階", "きゅうかい"], ["十階", "じゅっかい", true]
      ]),
      question: {
        text: "何階",
        reading: "なんがい",
        meaning: "几楼",
        example: "受付は何階ですか。",
        exampleMeaning: "前台在几楼？",
        segments: [{ text: "受付", reading: "うけつけ" }, { text: "は" }, { text: "何階", reading: "なんがい" }, { text: "ですか。" }]
      },
      examples: [
        counterExample("教室は三階にあります。", "教室在三楼。", [
          { text: "教室", reading: "きょうしつ" }, { text: "は" }, { text: "三階", reading: "さんがい" }, { text: "にあります。" }
        ]),
        counterExample("受付は何階ですか。", "前台在几楼？", [
          { text: "受付", reading: "うけつけ" }, { text: "は" }, { text: "何階", reading: "なんがい" }, { text: "ですか。" }
        ])
      ],
      tip: "「回」は次数，「階」は楼层。"
    }
  }
};

/* 水果联想（第一阶段）：只收录日常常见水果与直接可用表达。 */
const fruitVocabulary = (word, reading, meaning, segments = [], searchTerms = []) => ({
  word,
  reading,
  meaning,
  segments,
  searchTerms
});

const fruitQuantity = (text, reading, meaning, counterId = "", segments = []) => ({
  text,
  reading,
  meaning,
  counterId,
  segments
});

const fruitExample = (text, meaning, segments = [], searchTerms = []) => ({
  text,
  meaning,
  segments,
  searchTerms
});

const fruitParts = {
  skin: fruitVocabulary("皮", "かわ", "果皮"),
  rind: fruitVocabulary("厚い皮", "あついかわ", "厚果皮"),
  seed: fruitVocabulary("種", "たね", "种子、果核"),
  core: fruitVocabulary("芯", "しん", "果芯"),
  flesh: fruitVocabulary("果肉", "かにく", "果肉"),
  juice: fruitVocabulary("汁", "しる", "汁液", [], ["果汁"]),
  bunch: fruitVocabulary("房", "ふさ", "一串、一房"),
  grain: fruitVocabulary("粒", "つぶ", "一粒"),
  stem: fruitVocabulary("ヘタ", "ヘタ", "果蒂"),
  segment: fruitVocabulary("房", "ふさ", "橘瓣"),
  leaf: fruitVocabulary("葉", "は", "叶子"),
  surfaceSeeds: fruitVocabulary("表面の種", "ひょうめんのたね", "表面的籽")
};

const fruitStates = {
  sweet: fruitVocabulary("甘い", "あまい", "甜"),
  sour: fruitVocabulary("酸っぱい", "すっぱい", "酸"),
  sweetSour: fruitVocabulary("甘酸っぱい", "あまずっぱい", "酸甜"),
  juicy: fruitVocabulary("みずみずしい", "みずみずしい", "新鲜多汁", [], ["多汁", "水分充足"]),
  hard: fruitVocabulary("固い", "かたい", "硬"),
  soft: fruitVocabulary("柔らかい", "やわらかい", "柔软"),
  ripe: fruitVocabulary("熟している", "じゅくしている", "成熟了"),
  overripe: fruitVocabulary("熟しすぎている", "じゅくしすぎている", "熟过头了"),
  ready: fruitVocabulary("食べ頃", "たべごろ", "正适合吃"),
  fresh: fruitVocabulary("新鮮", "しんせん", "新鲜"),
  damaged: fruitVocabulary("傷んでいる", "いたんでいる", "坏了、不新鲜"),
  blackened: fruitVocabulary("黒くなっている", "くろくなっている", "变黑了"),
  crisp: fruitVocabulary("しゃきしゃきしている", "しゃきしゃきしている", "口感爽脆"),
  fragrant: fruitVocabulary("香りがいい", "かおりがいい", "香味很好"),
  bitter: fruitVocabulary("少し苦い", "すこしにがい", "略带苦味"),
  refreshing: fruitVocabulary("さっぱりしている", "さっぱりしている", "清爽"),
  seedless: fruitVocabulary("種なし", "たねなし", "无籽"),
  frozen: fruitVocabulary("冷凍", "れいとう", "冷冻"),
  firm: fruitVocabulary("実が締まっている", "みがしまっている", "果肉紧实")
};

const fruitActions = {
  wash: fruitVocabulary("洗う", "あらう", "清洗"),
  cut: fruitVocabulary("切る", "きる", "切开"),
  peel: fruitVocabulary("皮をむく", "かわをむく", "剥皮"),
  removeSeed: fruitVocabulary("種を取る", "たねをとる", "去籽"),
  removeCore: fruitVocabulary("芯を取る", "しんをとる", "去果芯"),
  cutHalf: fruitVocabulary("半分に切る", "はんぶんにきる", "切成两半"),
  chill: fruitVocabulary("冷やす", "ひやす", "冷藏、冰镇"),
  eat: fruitVocabulary("食べる", "たべる", "吃"),
  squeeze: fruitVocabulary("絞る", "しぼる", "榨汁"),
  juice: fruitVocabulary("ジュースにする", "ジュースにする", "做成果汁"),
  sliceRound: fruitVocabulary("輪切りにする", "わぎりにする", "切成圆片"),
  separate: fruitVocabulary("房に分ける", "ふさにわける", "分成一瓣一瓣"),
  removeStem: fruitVocabulary("ヘタを取る", "ヘタをとる", "去果蒂"),
  spoon: fruitVocabulary("スプーンで食べる", "スプーンでたべる", "用勺子吃"),
  freeze: fruitVocabulary("冷凍する", "れいとうする", "冷冻"),
  removeSkinThick: fruitVocabulary("厚い皮をむく", "あついかわをむく", "削去厚皮")
};

const fruitAssociationData = {
  id: "fruit-association",
  title: "水果联想",
  japaneseTitle: "果物",
  reading: "くだもの",
  meaning: "水果联想",
  icon: "果",
  badge: "生活",
  cardLabel: "FRUIT & DAILY LIFE",
  description: "20 种常见水果 · 味道与动作",
  layout: "fruit-association",
  quickFruitIds: ["apple", "banana", "mikan", "orange", "strawberry", "grape", "peach", "pear", "watermelon", "melon", "lemon", "kiwi"],
  categories: [
    { id: "common", title: "身近な果物", reading: "みぢかなくだもの", meaning: "常见水果", fruitIds: ["apple", "banana", "pear", "peach", "persimmon"] },
    { id: "citrus", title: "柑橘類", reading: "かんきつるい", meaning: "柑橘类", fruitIds: ["mikan", "orange", "lemon", "grapefruit", "yuzu"] },
    { id: "small", title: "小さな果物", reading: "ちいさなくだもの", meaning: "小粒水果", fruitIds: ["strawberry", "grape", "cherry", "blueberry"] },
    { id: "tropical", title: "南国の果物", reading: "なんごくのくだもの", meaning: "热带水果", fruitIds: ["pineapple", "mango", "kiwi"] },
    { id: "large", title: "大きな果物", reading: "おおきなくだもの", meaning: "瓜类和大型水果", fruitIds: ["watermelon", "melon", "papaya"] }
  ],
  fruits: {
    apple: {
      id: "apple", word: "りんご", reading: "りんご", meaning: "苹果", categoryId: "common", tags: ["常见", "秋冬"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.core, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.sweetSour, fruitStates.juicy, fruitStates.hard, fruitStates.damaged],
      actions: [fruitVocabulary("りんごを洗う", "りんごをあらう", "洗苹果"), fruitActions.peel, fruitActions.cutHalf, fruitActions.removeCore],
      counters: [fruitQuantity("りんご一個", "りんごいっこ", "一个苹果", "ko")],
      examples: [
        fruitExample("りんごの皮をむいてください。", "请把苹果皮削掉。", [{ text: "りんごの" }, { text: "皮", reading: "かわ" }, { text: "をむいてください。" }]),
        fruitExample("このりんごは甘くて、みずみずしいです。", "这个苹果又甜又多汁。", [{ text: "このりんごは" }, { text: "甘", reading: "あま" }, { text: "くて、みずみずしいです。" }])
      ]
    },
    banana: {
      id: "banana", word: "バナナ", reading: "バナナ", meaning: "香蕉", categoryId: "common", tags: ["常见", "热带"],
      parts: [fruitParts.skin, fruitParts.bunch, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.soft, fruitStates.ripe, fruitStates.blackened, fruitStates.overripe],
      actions: [fruitVocabulary("バナナの皮をむく", "バナナのかわをむく", "剥香蕉皮"), fruitVocabulary("一本食べる", "いっぽんたべる", "吃一根"), fruitActions.sliceRound],
      counters: [fruitQuantity("バナナ一本", "バナナいっぽん", "一根香蕉", "hon"), fruitQuantity("一房", "ひとふさ", "一把香蕉")],
      examples: [
        fruitExample("バナナの皮をむいて食べます。", "剥掉香蕉皮后吃。", [{ text: "バナナの" }, { text: "皮", reading: "かわ" }, { text: "をむいて" }, { text: "食", reading: "た" }, { text: "べます。" }]),
        fruitExample("このバナナは少し熟しすぎています。", "这根香蕉有点熟过头了。", [{ text: "このバナナは" }, { text: "少", reading: "すこ" }, { text: "し" }, { text: "熟", reading: "じゅく" }, { text: "しすぎています。" }])
      ]
    },
    pear: {
      id: "pear", word: "梨", reading: "なし", meaning: "梨", categoryId: "common", tags: ["常见", "秋季"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.core, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.juicy, fruitStates.crisp, fruitStates.fresh],
      actions: [fruitVocabulary("梨を洗う", "なしをあらう", "洗梨"), fruitActions.peel, fruitActions.cut, fruitActions.removeCore],
      counters: [fruitQuantity("梨一個", "なしいっこ", "一个梨", "ko")],
      examples: [
        fruitExample("梨を冷やしてから食べます。", "把梨冰一下再吃。", [{ text: "梨", reading: "なし" }, { text: "を" }, { text: "冷", reading: "ひ" }, { text: "やしてから" }, { text: "食", reading: "た" }, { text: "べます。" }]),
        fruitExample("この梨はみずみずしくて甘いです。", "这个梨水分很足，也很甜。", [{ text: "この" }, { text: "梨", reading: "なし" }, { text: "はみずみずしくて" }, { text: "甘", reading: "あま" }, { text: "いです。" }])
      ]
    },
    peach: {
      id: "peach", word: "桃", reading: "もも", meaning: "桃子", categoryId: "common", tags: ["常见", "夏季"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.juicy, fruitStates.soft, fruitStates.ready, fruitStates.fragrant],
      actions: [fruitVocabulary("桃を洗う", "ももをあらう", "洗桃子"), fruitActions.peel, fruitActions.cut, fruitActions.chill],
      counters: [fruitQuantity("桃一個", "ももいっこ", "一个桃子", "ko")],
      examples: [
        fruitExample("この桃はもう食べ頃です。", "这个桃子已经正适合吃了。", [{ text: "この" }, { text: "桃", reading: "もも" }, { text: "はもう" }, { text: "食べ頃", reading: "たべごろ" }, { text: "です。" }]),
        fruitExample("桃の皮をむいて半分に切りました。", "把桃子剥皮后切成了两半。", [{ text: "桃", reading: "もも" }, { text: "の" }, { text: "皮", reading: "かわ" }, { text: "をむいて" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "りました。" }])
      ]
    },
    persimmon: {
      id: "persimmon", word: "柿", reading: "かき", meaning: "柿子", categoryId: "common", tags: ["秋季", "常见"],
      parts: [fruitParts.skin, fruitParts.stem, fruitParts.seed, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.hard, fruitStates.soft, fruitStates.ripe],
      actions: [fruitActions.peel, fruitActions.removeStem, fruitActions.cut, fruitActions.eat],
      counters: [fruitQuantity("柿一個", "かきいっこ", "一个柿子", "ko")],
      examples: [
        fruitExample("柿の皮をむいて食べました。", "剥了柿子皮吃。", [{ text: "柿", reading: "かき" }, { text: "の" }, { text: "皮", reading: "かわ" }, { text: "をむいて" }, { text: "食", reading: "た" }, { text: "べました。" }]),
        fruitExample("まだ固いので、もう少し待ちます。", "还很硬，所以再等一等。", [{ text: "まだ" }, { text: "固", reading: "かた" }, { text: "いので、もう" }, { text: "少", reading: "すこ" }, { text: "し" }, { text: "待", reading: "ま" }, { text: "ちます。" }])
      ]
    },
    mikan: {
      id: "mikan", word: "みかん", reading: "みかん", meaning: "橘子", categoryId: "citrus", tags: ["常见", "冬季"],
      parts: [fruitParts.skin, fruitParts.segment, fruitParts.seed, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.juicy, fruitStates.fresh],
      actions: [fruitActions.peel, fruitActions.separate, fruitVocabulary("汁を絞る", "しるをしぼる", "挤汁")],
      counters: [fruitQuantity("みかん三個", "みかんさんこ", "三个橘子", "ko")],
      examples: [
        fruitExample("みかんの皮は手でむけます。", "橘子皮可以用手剥。", [{ text: "みかんの" }, { text: "皮", reading: "かわ" }, { text: "は" }, { text: "手", reading: "て" }, { text: "でむけます。" }]),
        fruitExample("このみかんは少し酸っぱいです。", "这个橘子有点酸。", [{ text: "このみかんは" }, { text: "少", reading: "すこ" }, { text: "し" }, { text: "酸", reading: "す" }, { text: "っぱいです。" }])
      ]
    },
    orange: {
      id: "orange", word: "オレンジ", reading: "オレンジ", meaning: "橙子", categoryId: "citrus", tags: ["常见", "柑橘"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.juicy, fruitStates.fresh],
      actions: [fruitActions.cutHalf, fruitActions.squeeze, fruitActions.juice, fruitActions.chill],
      counters: [fruitQuantity("オレンジ一個", "オレンジいっこ", "一个橙子", "ko")],
      examples: [
        fruitExample("オレンジを半分に切ってください。", "请把橙子切成两半。", [{ text: "オレンジを" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "ってください。" }]),
        fruitExample("朝、オレンジジュースを飲みました。", "早上喝了橙汁。", [{ text: "朝", reading: "あさ" }, { text: "、オレンジジュースを" }, { text: "飲", reading: "の" }, { text: "みました。" }])
      ]
    },
    lemon: {
      id: "lemon", word: "レモン", reading: "レモン", meaning: "柠檬", categoryId: "citrus", tags: ["柑橘", "调味"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sour, fruitStates.refreshing, fruitStates.fresh, fruitStates.fragrant],
      actions: [fruitActions.cut, fruitActions.squeeze, fruitVocabulary("皮をすりおろす", "かわをすりおろす", "磨取柠檬皮屑"), fruitActions.juice],
      counters: [fruitQuantity("レモン一個", "レモンいっこ", "一个柠檬", "ko")],
      examples: [
        fruitExample("レモンの汁を少し絞ります。", "挤一点柠檬汁。", [{ text: "レモンの" }, { text: "汁", reading: "しる" }, { text: "を" }, { text: "少", reading: "すこ" }, { text: "し" }, { text: "絞", reading: "しぼ" }, { text: "ります。" }]),
        fruitExample("このレモンはとても酸っぱいです。", "这个柠檬非常酸。", [{ text: "このレモンはとても" }, { text: "酸", reading: "す" }, { text: "っぱいです。" }])
      ]
    },
    grapefruit: {
      id: "grapefruit", word: "グレープフルーツ", reading: "グレープフルーツ", meaning: "葡萄柚", categoryId: "citrus", tags: ["柑橘", "清爽"],
      parts: [fruitParts.rind, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sour, fruitStates.bitter, fruitStates.juicy, fruitStates.refreshing],
      actions: [fruitActions.cutHalf, fruitActions.squeeze, fruitActions.spoon, fruitActions.chill],
      counters: [fruitQuantity("グレープフルーツ一個", "グレープフルーツいっこ", "一个葡萄柚", "ko")],
      examples: [
        fruitExample("グレープフルーツを半分に切りました。", "把葡萄柚切成了两半。", [{ text: "グレープフルーツを" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "りました。" }]),
        fruitExample("少し苦いですが、さっぱりしています。", "虽然有点苦，但很清爽。", [{ text: "少", reading: "すこ" }, { text: "し" }, { text: "苦", reading: "にが" }, { text: "いですが、さっぱりしています。" }])
      ]
    },
    yuzu: {
      id: "yuzu", word: "柚子", reading: "ゆず", meaning: "日本柚子", categoryId: "citrus", tags: ["柑橘", "香味"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sour, fruitStates.fragrant, fruitStates.fresh],
      actions: [fruitActions.cut, fruitActions.squeeze, fruitVocabulary("皮を使う", "かわをつかう", "使用果皮"), fruitVocabulary("料理に入れる", "りょうりにいれる", "放入菜肴")],
      counters: [fruitQuantity("柚子一個", "ゆずいっこ", "一个日本柚子", "ko")],
      examples: [
        fruitExample("柚子の皮を料理に使います。", "用日本柚子的皮做菜。", [{ text: "柚子", reading: "ゆず" }, { text: "の" }, { text: "皮", reading: "かわ" }, { text: "を" }, { text: "料理", reading: "りょうり" }, { text: "に" }, { text: "使", reading: "つか" }, { text: "います。" }]),
        fruitExample("柚子の香りがとてもいいです。", "日本柚子的香味很好。", [{ text: "柚子", reading: "ゆず" }, { text: "の" }, { text: "香", reading: "かお" }, { text: "りがとてもいいです。" }])
      ],
      tip: "日语「柚子（ゆず）」通常指日本柚子，不等同于中文日常所说的大型柚子。"
    },
    strawberry: {
      id: "strawberry", word: "いちご", reading: "いちご", meaning: "草莓", categoryId: "small", tags: ["常见", "春季"],
      parts: [fruitParts.stem, fruitParts.surfaceSeeds, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.sweetSour, fruitStates.fresh, fruitStates.damaged],
      actions: [fruitVocabulary("いちごを洗う", "いちごをあらう", "洗草莓"), fruitActions.removeStem, fruitActions.cutHalf, fruitActions.eat],
      counters: [fruitQuantity("一パック", "いちパック", "一盒"), fruitQuantity("一粒", "ひとつぶ", "一颗")],
      examples: [
        fruitExample("いちごを一パック買いました。", "买了一盒草莓。", [{ text: "いちごを" }, { text: "一", reading: "いち" }, { text: "パック" }, { text: "買", reading: "か" }, { text: "いました。" }]),
        fruitExample("ヘタを取ってから洗います。", "去掉果蒂后再洗。", [{ text: "ヘタを" }, { text: "取", reading: "と" }, { text: "ってから" }, { text: "洗", reading: "あら" }, { text: "います。" }])
      ]
    },
    grape: {
      id: "grape", word: "ぶどう", reading: "ぶどう", meaning: "葡萄", categoryId: "small", tags: ["常见", "秋季"],
      parts: [fruitParts.bunch, fruitParts.grain, fruitParts.skin, fruitParts.seed],
      tastes: [fruitStates.sweet, fruitStates.juicy, fruitStates.seedless, fruitStates.fresh],
      actions: [fruitVocabulary("ぶどうを洗う", "ぶどうをあらう", "洗葡萄"), fruitVocabulary("一粒食べる", "ひとつぶたべる", "吃一粒"), fruitActions.peel, fruitVocabulary("種を出す", "たねをだす", "吐籽")],
      counters: [fruitQuantity("一房", "ひとふさ", "一串"), fruitQuantity("一粒", "ひとつぶ", "一粒")],
      examples: [
        fruitExample("ぶどうを一房買いました。", "买了一串葡萄。", [{ text: "ぶどうを" }, { text: "一房", reading: "ひとふさ" }, { text: "買", reading: "か" }, { text: "いました。" }]),
        fruitExample("このぶどうは種がありません。", "这种葡萄没有籽。", [{ text: "このぶどうは" }, { text: "種", reading: "たね" }, { text: "がありません。" }])
      ]
    },
    cherry: {
      id: "cherry", word: "さくらんぼ", reading: "さくらんぼ", meaning: "樱桃", categoryId: "small", tags: ["初夏", "小粒"],
      parts: [fruitVocabulary("軸", "じく", "果梗"), fruitParts.seed, fruitParts.skin, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.juicy, fruitStates.fresh],
      actions: [fruitVocabulary("さくらんぼを洗う", "さくらんぼをあらう", "洗樱桃"), fruitVocabulary("軸を取る", "じくをとる", "去果梗"), fruitActions.removeSeed, fruitActions.eat],
      counters: [fruitQuantity("一パック", "いちパック", "一盒"), fruitQuantity("一粒", "ひとつぶ", "一颗")],
      examples: [
        fruitExample("さくらんぼを一パック買いました。", "买了一盒樱桃。", [{ text: "さくらんぼを" }, { text: "一", reading: "いち" }, { text: "パック" }, { text: "買", reading: "か" }, { text: "いました。" }]),
        fruitExample("このさくらんぼは甘酸っぱいです。", "这些樱桃酸酸甜甜的。", [{ text: "このさくらんぼは" }, { text: "甘酸", reading: "あまず" }, { text: "っぱいです。" }])
      ]
    },
    blueberry: {
      id: "blueberry", word: "ブルーベリー", reading: "ブルーベリー", meaning: "蓝莓", categoryId: "small", tags: ["小粒", "常见"],
      parts: [fruitParts.skin, fruitParts.flesh, fruitParts.juice, fruitParts.grain],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.fresh, fruitStates.frozen],
      actions: [fruitVocabulary("ブルーベリーを洗う", "ブルーベリーをあらう", "洗蓝莓"), fruitVocabulary("一粒食べる", "ひとつぶたべる", "吃一粒"), fruitActions.freeze, fruitVocabulary("ヨーグルトに入れる", "ヨーグルトにいれる", "放进酸奶")],
      counters: [fruitQuantity("一パック", "いちパック", "一盒"), fruitQuantity("一粒", "ひとつぶ", "一粒")],
      examples: [
        fruitExample("ブルーベリーをヨーグルトに入れます。", "把蓝莓放进酸奶里。", [{ text: "ブルーベリーをヨーグルトに" }, { text: "入", reading: "い" }, { text: "れます。" }]),
        fruitExample("残った分は冷凍しました。", "剩下的部分冷冻起来了。", [{ text: "残", reading: "のこ" }, { text: "った" }, { text: "分", reading: "ぶん" }, { text: "は" }, { text: "冷凍", reading: "れいとう" }, { text: "しました。" }])
      ]
    },
    pineapple: {
      id: "pineapple", word: "パイナップル", reading: "パイナップル", meaning: "菠萝", categoryId: "tropical", tags: ["热带", "常见"],
      parts: [fruitParts.rind, fruitParts.leaf, fruitParts.core, fruitParts.flesh],
      tastes: [fruitStates.sweet, fruitStates.sour, fruitStates.juicy, fruitStates.ripe],
      actions: [fruitActions.removeSkinThick, fruitActions.removeCore, fruitVocabulary("食べやすく切る", "たべやすくきる", "切成方便入口的大小"), fruitActions.chill],
      counters: [fruitQuantity("パイナップル一個", "パイナップルいっこ", "一个菠萝", "ko"), fruitQuantity("一切れ", "ひときれ", "一块")],
      examples: [
        fruitExample("パイナップルの芯を取ってください。", "请去掉菠萝芯。", [{ text: "パイナップルの" }, { text: "芯", reading: "しん" }, { text: "を" }, { text: "取", reading: "と" }, { text: "ってください。" }]),
        fruitExample("よく熟していて、とても甘いです。", "熟得很好，非常甜。", [{ text: "よく" }, { text: "熟", reading: "じゅく" }, { text: "していて、とても" }, { text: "甘", reading: "あま" }, { text: "いです。" }])
      ]
    },
    mango: {
      id: "mango", word: "マンゴー", reading: "マンゴー", meaning: "芒果", categoryId: "tropical", tags: ["热带", "夏季"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.fragrant, fruitStates.soft, fruitStates.ripe, fruitStates.ready],
      actions: [fruitActions.peel, fruitActions.cut, fruitActions.removeSeed, fruitActions.chill],
      counters: [fruitQuantity("マンゴー一個", "マンゴーいっこ", "一个芒果", "ko")],
      examples: [
        fruitExample("マンゴーの種は大きいです。", "芒果的果核很大。", [{ text: "マンゴーの" }, { text: "種", reading: "たね" }, { text: "は" }, { text: "大", reading: "おお" }, { text: "きいです。" }]),
        fruitExample("柔らかくなったら食べ頃です。", "变软后就正适合吃了。", [{ text: "柔", reading: "やわ" }, { text: "らかくなったら" }, { text: "食べ頃", reading: "たべごろ" }, { text: "です。" }])
      ]
    },
    kiwi: {
      id: "kiwi", word: "キウイ", reading: "キウイ", meaning: "猕猴桃、奇异果", categoryId: "tropical", tags: ["常见", "酸甜"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweetSour, fruitStates.sour, fruitStates.soft, fruitStates.ready],
      actions: [fruitActions.cutHalf, fruitActions.spoon, fruitActions.peel, fruitActions.chill],
      counters: [fruitQuantity("キウイ一個", "キウイいっこ", "一个猕猴桃", "ko")],
      examples: [
        fruitExample("キウイを半分に切って、スプーンで食べます。", "把猕猴桃切成两半，用勺子吃。", [{ text: "キウイを" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "って、スプーンで" }, { text: "食", reading: "た" }, { text: "べます。" }]),
        fruitExample("まだ固いので、食べ頃ではありません。", "还很硬，不到适合吃的时候。", [{ text: "まだ" }, { text: "固", reading: "かた" }, { text: "いので、" }, { text: "食べ頃", reading: "たべごろ" }, { text: "ではありません。" }])
      ]
    },
    watermelon: {
      id: "watermelon", word: "スイカ", reading: "スイカ", meaning: "西瓜", categoryId: "large", tags: ["夏季", "大型"],
      parts: [fruitParts.rind, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.juicy, fruitStates.fresh, fruitStates.firm],
      actions: [fruitVocabulary("スイカを切る", "スイカをきる", "切西瓜"), fruitActions.removeSeed, fruitActions.chill, fruitVocabulary("一切れ食べる", "ひときれたべる", "吃一块")],
      counters: [fruitQuantity("一玉", "ひとたま", "一个整西瓜"), fruitQuantity("一切れ", "ひときれ", "一块西瓜")],
      examples: [
        fruitExample("スイカを冷蔵庫で冷やしています。", "正在冰箱里冰西瓜。", [{ text: "スイカを" }, { text: "冷蔵庫", reading: "れいぞうこ" }, { text: "で" }, { text: "冷", reading: "ひ" }, { text: "やしています。" }]),
        fruitExample("スイカを一切れください。", "请给我一块西瓜。", [{ text: "スイカを" }, { text: "一切れ", reading: "ひときれ" }, { text: "ください。" }])
      ]
    },
    melon: {
      id: "melon", word: "メロン", reading: "メロン", meaning: "甜瓜、蜜瓜", categoryId: "large", tags: ["夏季", "大型"],
      parts: [fruitParts.rind, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.fragrant, fruitStates.juicy, fruitStates.ready],
      actions: [fruitActions.cutHalf, fruitActions.removeSeed, fruitActions.cut, fruitActions.chill],
      counters: [fruitQuantity("メロン一個", "メロンいっこ", "一个甜瓜", "ko"), fruitQuantity("一切れ", "ひときれ", "一块")],
      examples: [
        fruitExample("メロンを半分に切って、種を取りました。", "把甜瓜切成两半，去掉了籽。", [{ text: "メロンを" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "って、" }, { text: "種", reading: "たね" }, { text: "を" }, { text: "取", reading: "と" }, { text: "りました。" }]),
        fruitExample("このメロンは香りがよくて甘いです。", "这个甜瓜香味很好，也很甜。", [{ text: "このメロンは" }, { text: "香", reading: "かお" }, { text: "りがよくて" }, { text: "甘", reading: "あま" }, { text: "いです。" }])
      ]
    },
    papaya: {
      id: "papaya", word: "パパイヤ", reading: "パパイヤ", meaning: "木瓜", categoryId: "large", tags: ["热带", "大型"],
      parts: [fruitParts.skin, fruitParts.seed, fruitParts.flesh, fruitParts.juice],
      tastes: [fruitStates.sweet, fruitStates.soft, fruitStates.ripe, fruitStates.fragrant],
      actions: [fruitActions.cutHalf, fruitActions.removeSeed, fruitActions.peel, fruitActions.spoon],
      counters: [fruitQuantity("パパイヤ一個", "パパイヤいっこ", "一个木瓜", "ko"), fruitQuantity("一切れ", "ひときれ", "一块")],
      examples: [
        fruitExample("パパイヤを半分に切って、種を取ります。", "把木瓜切成两半，去掉籽。", [{ text: "パパイヤを" }, { text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "って、" }, { text: "種", reading: "たね" }, { text: "を" }, { text: "取", reading: "と" }, { text: "ります。" }]),
        fruitExample("よく熟したパパイヤは柔らかいです。", "熟好的木瓜很软。", [{ text: "よく" }, { text: "熟", reading: "じゅく" }, { text: "したパパイヤは" }, { text: "柔", reading: "やわ" }, { text: "らかいです。" }])
      ]
    }
  },
  commonExpressions: [
    {
      id: "buying", title: "購入", reading: "こうにゅう", meaning: "购买",
      items: [
        fruitExample("これは一個いくらですか。", "这个一个多少钱？", [{ text: "これは" }, { text: "一個", reading: "いっこ" }, { text: "いくらですか。" }]),
        fruitExample("りんごを三個ください。", "请给我三个苹果。", [{ text: "りんごを" }, { text: "三個", reading: "さんこ" }, { text: "ください。" }]),
        fruitExample("甘いものはどれですか。", "哪个比较甜？", [{ text: "甘", reading: "あま" }, { text: "いものはどれですか。" }]),
        fruitExample("食べ頃ですか。", "现在适合吃吗？", [{ text: "食べ頃", reading: "たべごろ" }, { text: "ですか。" }]),
        fruitExample("もう少し熟したものはありますか。", "有更熟一些的吗？", [{ text: "もう" }, { text: "少", reading: "すこ" }, { text: "し" }, { text: "熟", reading: "じゅく" }, { text: "したものはありますか。" }])
      ]
    },
    {
      id: "eating", title: "果物を食べる", reading: "くだものをたべる", meaning: "吃水果",
      items: [
        fruitExample("皮をむいて食べます。", "剥皮后吃。", [{ text: "皮", reading: "かわ" }, { text: "をむいて" }, { text: "食", reading: "た" }, { text: "べます。" }]),
        fruitExample("種を取ってください。", "请把籽去掉。", [{ text: "種", reading: "たね" }, { text: "を" }, { text: "取", reading: "と" }, { text: "ってください。" }]),
        fruitExample("半分に切りましょう。", "切成两半吧。", [{ text: "半分", reading: "はんぶん" }, { text: "に" }, { text: "切", reading: "き" }, { text: "りましょう。" }]),
        fruitExample("冷やしたほうがおいしいです。", "冰镇后更好吃。", [{ text: "冷", reading: "ひ" }, { text: "やしたほうがおいしいです。" }])
      ]
    },
    {
      id: "taste-state", title: "味・状態", reading: "あじ・じょうたい", meaning: "味道与状态",
      items: [
        fruitExample("とても甘いです。", "非常甜。", [{ text: "とても" }, { text: "甘", reading: "あま" }, { text: "いです。" }]),
        fruitExample("少し酸っぱいです。", "有点酸。", [{ text: "少", reading: "すこ" }, { text: "し" }, { text: "酸", reading: "す" }, { text: "っぱいです。" }]),
        fruitExample("まだ固いです。", "还很硬。", [{ text: "まだ" }, { text: "固", reading: "かた" }, { text: "いです。" }]),
        fruitExample("もう食べ頃です。", "已经正适合吃了。", [{ text: "もう" }, { text: "食べ頃", reading: "たべごろ" }, { text: "です。" }]),
        fruitExample("少し傷んでいます。", "有点坏了。", [{ text: "少", reading: "すこ" }, { text: "し" }, { text: "傷", reading: "いた" }, { text: "んでいます。" }])
      ]
    }
  ]
};
