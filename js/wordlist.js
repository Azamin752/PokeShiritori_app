const shiritoriWords = [
  {
    "word": "フシギダネ",
    "head": "フ",
    "tail": "ネ"
  },
  {
    "word": "フシギソウ",
    "head": "フ",
    "tail": "ウ"
  },
  {
    "word": "フシギバナ",
    "head": "フ",
    "tail": "ナ"
  },
  {
    "word": "ヒトカゲ",
    "head": "ヒ",
    "tail": "ゲ"
  },
  {
    "word": "リザード",
    "head": "リ",
    "tail": "ド"
  },
  {
    "word": "リザードン",
    "head": "リ",
    "tail": "ン"
  },
  {
    "word": "ゼニガメ",
    "head": "ゼ",
    "tail": "メ"
  },
  {
    "word": "カメール",
    "head": "カ",
    "tail": "ル"
  },
  {
    "word": "カメックス",
    "head": "カ",
    "tail": "ス"
  },
  {
    "word": "キャタピー",
    "head": "キ",
    "tail": "ピ"
  },
  {
    "word": "トランセル",
    "head": "ト",
    "tail": "ル"
  },
  {
    "word": "バタフリー",
    "head": "バ",
    "tail": "リ"
  },
  {
    "word": "ビードル",
    "head": "ビ",
    "tail": "ル"
  },
  {
    "word": "コクーン",
    "head": "コ",
    "tail": "ン"
  },
  {
    "word": "スピアー",
    "head": "ス",
    "tail": "ア"
  },
  {
    "word": "ポッポ",
    "head": "ポ",
    "tail": "ポ"
  },
  {
    "word": "ピジョン",
    "head": "ピ",
    "tail": "ン"
  },
  {
    "word": "ピジョット",
    "head": "ピ",
    "tail": "ト"
  },
  {
    "word": "コラッタ",
    "head": "コ",
    "tail": "タ"
  },
  {
    "word": "ラッタ",
    "head": "ラ",
    "tail": "タ"
  },
  {
    "word": "オニスズメ",
    "head": "オ",
    "tail": "メ"
  },
  {
    "word": "オニドリル",
    "head": "オ",
    "tail": "ル"
  },
  {
    "word": "アーボ",
    "head": "ア",
    "tail": "ボ"
  },
  {
    "word": "アーボック",
    "head": "ア",
    "tail": "ク"
  },
  {
    "word": "ピカチュウ",
    "head": "ピ",
    "tail": "ウ"
  },
  {
    "word": "ライチュウ",
    "head": "ラ",
    "tail": "ウ"
  },
  {
    "word": "サンド",
    "head": "サ",
    "tail": "ド"
  },
  {
    "word": "サンドパン",
    "head": "サ",
    "tail": "ン"
  },
  {
    "word": "ニドラン♀",
    "head": "ニ",
    "tail": "ス"
  },
  {
    "word": "ニドリーナ",
    "head": "ニ",
    "tail": "ナ"
  },
  {
    "word": "ニドクイン",
    "head": "ニ",
    "tail": "ン"
  },
  {
    "word": "ニドラン♂",
    "head": "ニ",
    "tail": "ス"
  },
  {
    "word": "ニドリーノ",
    "head": "ニ",
    "tail": "ノ"
  },
  {
    "word": "ニドキング",
    "head": "ニ",
    "tail": "グ"
  },
  {
    "word": "ピッピ",
    "head": "ピ",
    "tail": "ピ"
  },
  {
    "word": "ピクシー",
    "head": "ピ",
    "tail": "シ"
  },
  {
    "word": "ロコン",
    "head": "ロ",
    "tail": "ン"
  },
  {
    "word": "キュウコン",
    "head": "キ",
    "tail": "ン"
  },
  {
    "word": "プリン",
    "head": "プ",
    "tail": "ン"
  },
  {
    "word": "プクリン",
    "head": "プ",
    "tail": "ン"
  },
  {
    "word": "ズバット",
    "head": "ズ",
    "tail": "ト"
  },
  {
    "word": "ゴルバット",
    "head": "ゴ",
    "tail": "ト"
  },
  {
    "word": "ナゾノクサ",
    "head": "ナ",
    "tail": "サ"
  },
  {
    "word": "クサイハナ",
    "head": "ク",
    "tail": "ナ"
  },
  {
    "word": "ラフレシア",
    "head": "ラ",
    "tail": "ア"
  },
  {
    "word": "パラス",
    "head": "パ",
    "tail": "ス"
  },
  {
    "word": "パラセクト",
    "head": "パ",
    "tail": "ト"
  },
  {
    "word": "コンパン",
    "head": "コ",
    "tail": "ン"
  },
  {
    "word": "モルフォン",
    "head": "モ",
    "tail": "ン"
  },
  {
    "word": "ディグダ",
    "head": "デ",
    "tail": "ダ"
  },
  {
    "word": "ダグトリオ",
    "head": "ダ",
    "tail": "オ"
  },
  {
    "word": "ニャース",
    "head": "ニ",
    "tail": "ス"
  },
  {
    "word": "ペルシアン",
    "head": "ペ",
    "tail": "ン"
  },
  {
    "word": "コダック",
    "head": "コ",
    "tail": "ク"
  },
  {
    "word": "ゴルダック",
    "head": "ゴ",
    "tail": "ク"
  },
  {
    "word": "マンキー",
    "head": "マ",
    "tail": "キ"
  },
  {
    "word": "オコリザル",
    "head": "オ",
    "tail": "ル"
  },
  {
    "word": "ガーディ",
    "head": "ガ",
    "tail": "イ"
  },
  {
    "word": "ウインディ",
    "head": "ウ",
    "tail": "イ"
  },
  {
    "word": "ニョロモ",
    "head": "ニ",
    "tail": "モ"
  },
  {
    "word": "ニョロゾ",
    "head": "ニ",
    "tail": "ゾ"
  },
  {
    "word": "ニョロボン",
    "head": "ニ",
    "tail": "ン"
  },
  {
    "word": "ケーシィ",
    "head": "ケ",
    "tail": "イ"
  },
  {
    "word": "ユンゲラー",
    "head": "ユ",
    "tail": "ラ"
  },
  {
    "word": "フーディン",
    "head": "フ",
    "tail": "ン"
  },
  {
    "word": "ワンリキー",
    "head": "ワ",
    "tail": "キ"
  },
  {
    "word": "ゴーリキー",
    "head": "ゴ",
    "tail": "キ"
  },
  {
    "word": "カイリキー",
    "head": "カ",
    "tail": "キ"
  },
  {
    "word": "マダツボミ",
    "head": "マ",
    "tail": "ミ"
  },
  {
    "word": "ウツドン",
    "head": "ウ",
    "tail": "ン"
  },
  {
    "word": "ウツボット",
    "head": "ウ",
    "tail": "ト"
  },
  {
    "word": "メノクラゲ",
    "head": "メ",
    "tail": "ゲ"
  },
  {
    "word": "ドククラゲ",
    "head": "ド",
    "tail": "ゲ"
  },
  {
    "word": "イシツブテ",
    "head": "イ",
    "tail": "テ"
  },
  {
    "word": "ゴローン",
    "head": "ゴ",
    "tail": "ン"
  },
  {
    "word": "ゴローニャ",
    "head": "ゴ",
    "tail": "ヤ"
  },
  {
    "word": "ポニータ",
    "head": "ポ",
    "tail": "タ"
  },
  {
    "word": "ギャロップ",
    "head": "ギ",
    "tail": "プ"
  },
  {
    "word": "ヤドン",
    "head": "ヤ",
    "tail": "ン"
  },
  {
    "word": "ヤドラン",
    "head": "ヤ",
    "tail": "ン"
  },
  {
    "word": "コイル",
    "head": "コ",
    "tail": "ル"
  },
  {
    "word": "レアコイル",
    "head": "レ",
    "tail": "ル"
  },
  {
    "word": "カモネギ",
    "head": "カ",
    "tail": "ギ"
  },
  {
    "word": "ドードー",
    "head": "ド",
    "tail": "ド"
  },
  {
    "word": "ドードリオ",
    "head": "ド",
    "tail": "オ"
  },
  {
    "word": "パウワウ",
    "head": "パ",
    "tail": "ウ"
  },
  {
    "word": "ジュゴン",
    "head": "ジ",
    "tail": "ン"
  },
  {
    "word": "ベトベター",
    "head": "ベ",
    "tail": "タ"
  },
  {
    "word": "ベトベトン",
    "head": "ベ",
    "tail": "ン"
  },
  {
    "word": "シェルダー",
    "head": "シ",
    "tail": "ダ"
  },
  {
    "word": "パルシェン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "ゴース",
    "head": "ゴ",
    "tail": "ス"
  },
  {
    "word": "ゴースト",
    "head": "ゴ",
    "tail": "ト"
  },
  {
    "word": "ゲンガー",
    "head": "ゲ",
    "tail": "ガ"
  },
  {
    "word": "イワーク",
    "head": "イ",
    "tail": "ク"
  },
  {
    "word": "スリープ",
    "head": "ス",
    "tail": "プ"
  },
  {
    "word": "スリーパー",
    "head": "ス",
    "tail": "パ"
  },
  {
    "word": "クラブ",
    "head": "ク",
    "tail": "ブ"
  },
  {
    "word": "キングラー",
    "head": "キ",
    "tail": "ラ"
  },
  {
    "word": "ビリリダマ",
    "head": "ビ",
    "tail": "マ"
  },
  {
    "word": "マルマイン",
    "head": "マ",
    "tail": "ン"
  },
  {
    "word": "タマタマ",
    "head": "タ",
    "tail": "マ"
  },
  {
    "word": "ナッシー",
    "head": "ナ",
    "tail": "シ"
  },
  {
    "word": "カラカラ",
    "head": "カ",
    "tail": "ラ"
  },
  {
    "word": "ガラガラ",
    "head": "ガ",
    "tail": "ラ"
  },
  {
    "word": "サワムラー",
    "head": "サ",
    "tail": "ラ"
  },
  {
    "word": "エビワラー",
    "head": "エ",
    "tail": "ラ"
  },
  {
    "word": "ベロリンガ",
    "head": "ベ",
    "tail": "ガ"
  },
  {
    "word": "ドガース",
    "head": "ド",
    "tail": "ス"
  },
  {
    "word": "マタドガス",
    "head": "マ",
    "tail": "ス"
  },
  {
    "word": "サイホーン",
    "head": "サ",
    "tail": "ン"
  },
  {
    "word": "サイドン",
    "head": "サ",
    "tail": "ン"
  },
  {
    "word": "ラッキー",
    "head": "ラ",
    "tail": "キ"
  },
  {
    "word": "モンジャラ",
    "head": "モ",
    "tail": "ラ"
  },
  {
    "word": "ガルーラ",
    "head": "ガ",
    "tail": "ラ"
  },
  {
    "word": "タッツー",
    "head": "タ",
    "tail": "ツ"
  },
  {
    "word": "シードラ",
    "head": "シ",
    "tail": "ラ"
  },
  {
    "word": "トサキント",
    "head": "ト",
    "tail": "ト"
  },
  {
    "word": "アズマオウ",
    "head": "ア",
    "tail": "ウ"
  },
  {
    "word": "ヒトデマン",
    "head": "ヒ",
    "tail": "ン"
  },
  {
    "word": "スターミー",
    "head": "ス",
    "tail": "ミ"
  },
  {
    "word": "バリヤード",
    "head": "バ",
    "tail": "ド"
  },
  {
    "word": "ストライク",
    "head": "ス",
    "tail": "ク"
  },
  {
    "word": "ルージュラ",
    "head": "ル",
    "tail": "ラ"
  },
  {
    "word": "エレブー",
    "head": "エ",
    "tail": "ブ"
  },
  {
    "word": "ブーバー",
    "head": "ブ",
    "tail": "バ"
  },
  {
    "word": "カイロス",
    "head": "カ",
    "tail": "ス"
  },
  {
    "word": "ケンタロス",
    "head": "ケ",
    "tail": "ス"
  },
  {
    "word": "コイキング",
    "head": "コ",
    "tail": "グ"
  },
  {
    "word": "ギャラドス",
    "head": "ギ",
    "tail": "ス"
  },
  {
    "word": "ラプラス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "メタモン",
    "head": "メ",
    "tail": "ン"
  },
  {
    "word": "イーブイ",
    "head": "イ",
    "tail": "イ"
  },
  {
    "word": "シャワーズ",
    "head": "シ",
    "tail": "ズ"
  },
  {
    "word": "サンダース",
    "head": "サ",
    "tail": "ス"
  },
  {
    "word": "ブースター",
    "head": "ブ",
    "tail": "タ"
  },
  {
    "word": "ポリゴン",
    "head": "ポ",
    "tail": "ン"
  },
  {
    "word": "オムナイト",
    "head": "オ",
    "tail": "ト"
  },
  {
    "word": "オムスター",
    "head": "オ",
    "tail": "タ"
  },
  {
    "word": "カブト",
    "head": "カ",
    "tail": "ト"
  },
  {
    "word": "カブトプス",
    "head": "カ",
    "tail": "ス"
  },
  {
    "word": "プテラ",
    "head": "プ",
    "tail": "ラ"
  },
  {
    "word": "カビゴン",
    "head": "カ",
    "tail": "ン"
  },
  {
    "word": "フリーザー",
    "head": "フ",
    "tail": "ザ"
  },
  {
    "word": "サンダー",
    "head": "サ",
    "tail": "ダ"
  },
  {
    "word": "ファイヤー",
    "head": "フ",
    "tail": "ヤ"
  },
  {
    "word": "ミニリュウ",
    "head": "ミ",
    "tail": "ウ"
  },
  {
    "word": "ハクリュー",
    "head": "ハ",
    "tail": "ユ"
  },
  {
    "word": "カイリュー",
    "head": "カ",
    "tail": "ユ"
  },
  {
    "word": "ミュウツー",
    "head": "ミ",
    "tail": "ツ"
  },
  {
    "word": "ミュウ",
    "head": "ミ",
    "tail": "ウ"
  },
  {
    "word": "チコリータ",
    "head": "チ",
    "tail": "タ"
  },
  {
    "word": "ベイリーフ",
    "head": "ベ",
    "tail": "フ"
  },
  {
    "word": "メガニウム",
    "head": "メ",
    "tail": "ム"
  },
  {
    "word": "ヒノアラシ",
    "head": "ヒ",
    "tail": "シ"
  },
  {
    "word": "マグマラシ",
    "head": "マ",
    "tail": "シ"
  },
  {
    "word": "バクフーン",
    "head": "バ",
    "tail": "ン"
  },
  {
    "word": "ワニノコ",
    "head": "ワ",
    "tail": "コ"
  },
  {
    "word": "アリゲイツ",
    "head": "ア",
    "tail": "ツ"
  },
  {
    "word": "オーダイル",
    "head": "オ",
    "tail": "ル"
  },
  {
    "word": "オタチ",
    "head": "オ",
    "tail": "チ"
  },
  {
    "word": "オオタチ",
    "head": "オ",
    "tail": "チ"
  },
  {
    "word": "ホーホー",
    "head": "ホ",
    "tail": "ホ"
  },
  {
    "word": "ヨルノズク",
    "head": "ヨ",
    "tail": "ク"
  },
  {
    "word": "レディバ",
    "head": "レ",
    "tail": "バ"
  },
  {
    "word": "レディアン",
    "head": "レ",
    "tail": "ン"
  },
  {
    "word": "イトマル",
    "head": "イ",
    "tail": "ル"
  },
  {
    "word": "アリアドス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "クロバット",
    "head": "ク",
    "tail": "ト"
  },
  {
    "word": "チョンチー",
    "head": "チ",
    "tail": "チ"
  },
  {
    "word": "ランターン",
    "head": "ラ",
    "tail": "ン"
  },
  {
    "word": "ピチュー",
    "head": "ピ",
    "tail": "ユ"
  },
  {
    "word": "ピィ",
    "head": "ピ",
    "tail": "イ"
  },
  {
    "word": "ププリン",
    "head": "プ",
    "tail": "ン"
  },
  {
    "word": "トゲピー",
    "head": "ト",
    "tail": "ピ"
  },
  {
    "word": "トゲチック",
    "head": "ト",
    "tail": "ク"
  },
  {
    "word": "ネイティ",
    "head": "ネ",
    "tail": "イ"
  },
  {
    "word": "ネイティオ",
    "head": "ネ",
    "tail": "オ"
  },
  {
    "word": "メリープ",
    "head": "メ",
    "tail": "プ"
  },
  {
    "word": "モココ",
    "head": "モ",
    "tail": "コ"
  },
  {
    "word": "デンリュウ",
    "head": "デ",
    "tail": "ウ"
  },
  {
    "word": "キレイハナ",
    "head": "キ",
    "tail": "ナ"
  },
  {
    "word": "マリル",
    "head": "マ",
    "tail": "ル"
  },
  {
    "word": "マリルリ",
    "head": "マ",
    "tail": "リ"
  },
  {
    "word": "ウソッキー",
    "head": "ウ",
    "tail": "キ"
  },
  {
    "word": "ニョロトノ",
    "head": "ニ",
    "tail": "ノ"
  },
  {
    "word": "ハネッコ",
    "head": "ハ",
    "tail": "コ"
  },
  {
    "word": "ポポッコ",
    "head": "ポ",
    "tail": "コ"
  },
  {
    "word": "ワタッコ",
    "head": "ワ",
    "tail": "コ"
  },
  {
    "word": "エイパム",
    "head": "エ",
    "tail": "ム"
  },
  {
    "word": "ヒマナッツ",
    "head": "ヒ",
    "tail": "ツ"
  },
  {
    "word": "キマワリ",
    "head": "キ",
    "tail": "リ"
  },
  {
    "word": "ヤンヤンマ",
    "head": "ヤ",
    "tail": "マ"
  },
  {
    "word": "ウパー",
    "head": "ウ",
    "tail": "パ"
  },
  {
    "word": "ヌオー",
    "head": "ヌ",
    "tail": "オ"
  },
  {
    "word": "エーフィ",
    "head": "エ",
    "tail": "イ"
  },
  {
    "word": "ブラッキー",
    "head": "ブ",
    "tail": "キ"
  },
  {
    "word": "ヤミカラス",
    "head": "ヤ",
    "tail": "ス"
  },
  {
    "word": "ヤドキング",
    "head": "ヤ",
    "tail": "グ"
  },
  {
    "word": "ムウマ",
    "head": "ム",
    "tail": "マ"
  },
  {
    "word": "アンノーン",
    "head": "ア",
    "tail": "ン"
  },
  {
    "word": "ソーナンス",
    "head": "ソ",
    "tail": "ス"
  },
  {
    "word": "キリンリキ",
    "head": "キ",
    "tail": "キ"
  },
  {
    "word": "クヌギダマ",
    "head": "ク",
    "tail": "マ"
  },
  {
    "word": "フォレトス",
    "head": "フ",
    "tail": "ス"
  },
  {
    "word": "ノコッチ",
    "head": "ノ",
    "tail": "チ"
  },
  {
    "word": "グライガー",
    "head": "グ",
    "tail": "ガ"
  },
  {
    "word": "ハガネール",
    "head": "ハ",
    "tail": "ル"
  },
  {
    "word": "ブルー",
    "head": "ブ",
    "tail": "ル"
  },
  {
    "word": "グランブル",
    "head": "グ",
    "tail": "ル"
  },
  {
    "word": "ハリーセン",
    "head": "ハ",
    "tail": "ン"
  },
  {
    "word": "ハッサム",
    "head": "ハ",
    "tail": "ム"
  },
  {
    "word": "ツボツボ",
    "head": "ツ",
    "tail": "ボ"
  },
  {
    "word": "ヘラクロス",
    "head": "ヘ",
    "tail": "ス"
  },
  {
    "word": "ニューラ",
    "head": "ニ",
    "tail": "ラ"
  },
  {
    "word": "ヒメグマ",
    "head": "ヒ",
    "tail": "マ"
  },
  {
    "word": "リングマ",
    "head": "リ",
    "tail": "マ"
  },
  {
    "word": "マグマッグ",
    "head": "マ",
    "tail": "グ"
  },
  {
    "word": "マグカルゴ",
    "head": "マ",
    "tail": "ゴ"
  },
  {
    "word": "ウリムー",
    "head": "ウ",
    "tail": "ム"
  },
  {
    "word": "イノムー",
    "head": "イ",
    "tail": "ム"
  },
  {
    "word": "サニーゴ",
    "head": "サ",
    "tail": "ゴ"
  },
  {
    "word": "テッポウオ",
    "head": "テ",
    "tail": "オ"
  },
  {
    "word": "オクタン",
    "head": "オ",
    "tail": "ン"
  },
  {
    "word": "デリバード",
    "head": "デ",
    "tail": "ド"
  },
  {
    "word": "マンタイン",
    "head": "マ",
    "tail": "ン"
  },
  {
    "word": "エアームド",
    "head": "エ",
    "tail": "ド"
  },
  {
    "word": "デルビル",
    "head": "デ",
    "tail": "ル"
  },
  {
    "word": "ヘルガー",
    "head": "ヘ",
    "tail": "ガ"
  },
  {
    "word": "キングドラ",
    "head": "キ",
    "tail": "ラ"
  },
  {
    "word": "ゴマゾウ",
    "head": "ゴ",
    "tail": "ウ"
  },
  {
    "word": "ドンファン",
    "head": "ド",
    "tail": "ン"
  },
  {
    "word": "ポリゴン2",
    "head": "ポ",
    "tail": "ツ"
  },
  {
    "word": "オドシシ",
    "head": "オ",
    "tail": "シ"
  },
  {
    "word": "ドーブル",
    "head": "ド",
    "tail": "ル"
  },
  {
    "word": "バルキー",
    "head": "バ",
    "tail": "キ"
  },
  {
    "word": "カポエラー",
    "head": "カ",
    "tail": "ラ"
  },
  {
    "word": "ムチュール",
    "head": "ム",
    "tail": "ル"
  },
  {
    "word": "エレキッド",
    "head": "エ",
    "tail": "ド"
  },
  {
    "word": "ブビィ",
    "head": "ブ",
    "tail": "イ"
  },
  {
    "word": "ミルタンク",
    "head": "ミ",
    "tail": "ク"
  },
  {
    "word": "ハピナス",
    "head": "ハ",
    "tail": "ス"
  },
  {
    "word": "ライコウ",
    "head": "ラ",
    "tail": "ウ"
  },
  {
    "word": "エンテイ",
    "head": "エ",
    "tail": "イ"
  },
  {
    "word": "スイクン",
    "head": "ス",
    "tail": "ン"
  },
  {
    "word": "ヨーギラス",
    "head": "ヨ",
    "tail": "ス"
  },
  {
    "word": "サナギラス",
    "head": "サ",
    "tail": "ス"
  },
  {
    "word": "バンギラス",
    "head": "バ",
    "tail": "ス"
  },
  {
    "word": "ルギア",
    "head": "ル",
    "tail": "ア"
  },
  {
    "word": "ホウオウ",
    "head": "ホ",
    "tail": "ウ"
  },
  {
    "word": "セレビィ",
    "head": "セ",
    "tail": "イ"
  },
  {
    "word": "キモリ",
    "head": "キ",
    "tail": "リ"
  },
  {
    "word": "ジュプトル",
    "head": "ジ",
    "tail": "ル"
  },
  {
    "word": "ジュカイン",
    "head": "ジ",
    "tail": "ン"
  },
  {
    "word": "アチャモ",
    "head": "ア",
    "tail": "モ"
  },
  {
    "word": "ワカシャモ",
    "head": "ワ",
    "tail": "モ"
  },
  {
    "word": "バシャーモ",
    "head": "バ",
    "tail": "モ"
  },
  {
    "word": "ミズゴロウ",
    "head": "ミ",
    "tail": "ウ"
  },
  {
    "word": "ヌマクロー",
    "head": "ヌ",
    "tail": "ロ"
  },
  {
    "word": "ラグラージ",
    "head": "ラ",
    "tail": "ジ"
  },
  {
    "word": "ポチエナ",
    "head": "ポ",
    "tail": "ナ"
  },
  {
    "word": "グラエナ",
    "head": "グ",
    "tail": "ナ"
  },
  {
    "word": "ジグザグマ",
    "head": "ジ",
    "tail": "マ"
  },
  {
    "word": "マッスグマ",
    "head": "マ",
    "tail": "マ"
  },
  {
    "word": "ケムッソ",
    "head": "ケ",
    "tail": "ソ"
  },
  {
    "word": "カラサリス",
    "head": "カ",
    "tail": "ス"
  },
  {
    "word": "アゲハント",
    "head": "ア",
    "tail": "ト"
  },
  {
    "word": "マユルド",
    "head": "マ",
    "tail": "ド"
  },
  {
    "word": "ドクケイル",
    "head": "ド",
    "tail": "ル"
  },
  {
    "word": "ハスボー",
    "head": "ハ",
    "tail": "ボ"
  },
  {
    "word": "ハスブレロ",
    "head": "ハ",
    "tail": "ロ"
  },
  {
    "word": "ルンパッパ",
    "head": "ル",
    "tail": "パ"
  },
  {
    "word": "タネボー",
    "head": "タ",
    "tail": "ボ"
  },
  {
    "word": "コノハナ",
    "head": "コ",
    "tail": "ナ"
  },
  {
    "word": "ダーテング",
    "head": "ダ",
    "tail": "グ"
  },
  {
    "word": "スバメ",
    "head": "ス",
    "tail": "メ"
  },
  {
    "word": "オオスバメ",
    "head": "オ",
    "tail": "メ"
  },
  {
    "word": "キャモメ",
    "head": "キ",
    "tail": "メ"
  },
  {
    "word": "ペリッパー",
    "head": "ペ",
    "tail": "パ"
  },
  {
    "word": "ラルトス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "キルリア",
    "head": "キ",
    "tail": "ア"
  },
  {
    "word": "サーナイト",
    "head": "サ",
    "tail": "ト"
  },
  {
    "word": "アメタマ",
    "head": "ア",
    "tail": "マ"
  },
  {
    "word": "アメモース",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "キノココ",
    "head": "キ",
    "tail": "コ"
  },
  {
    "word": "キノガッサ",
    "head": "キ",
    "tail": "サ"
  },
  {
    "word": "ナマケロ",
    "head": "ナ",
    "tail": "ロ"
  },
  {
    "word": "ヤルキモノ",
    "head": "ヤ",
    "tail": "ノ"
  },
  {
    "word": "ケッキング",
    "head": "ケ",
    "tail": "グ"
  },
  {
    "word": "ツチニン",
    "head": "ツ",
    "tail": "ン"
  },
  {
    "word": "テッカニン",
    "head": "テ",
    "tail": "ン"
  },
  {
    "word": "ヌケニン",
    "head": "ヌ",
    "tail": "ン"
  },
  {
    "word": "ゴニョニョ",
    "head": "ゴ",
    "tail": "ヨ"
  },
  {
    "word": "ドゴーム",
    "head": "ド",
    "tail": "ム"
  },
  {
    "word": "バクオング",
    "head": "バ",
    "tail": "グ"
  },
  {
    "word": "マクノシタ",
    "head": "マ",
    "tail": "タ"
  },
  {
    "word": "ハリテヤマ",
    "head": "ハ",
    "tail": "マ"
  },
  {
    "word": "ルリリ",
    "head": "ル",
    "tail": "リ"
  },
  {
    "word": "ノズパス",
    "head": "ノ",
    "tail": "ス"
  },
  {
    "word": "エネコ",
    "head": "エ",
    "tail": "コ"
  },
  {
    "word": "エネコロロ",
    "head": "エ",
    "tail": "ロ"
  },
  {
    "word": "ヤミラミ",
    "head": "ヤ",
    "tail": "ミ"
  },
  {
    "word": "クチート",
    "head": "ク",
    "tail": "ト"
  },
  {
    "word": "ココドラ",
    "head": "コ",
    "tail": "ラ"
  },
  {
    "word": "コドラ",
    "head": "コ",
    "tail": "ラ"
  },
  {
    "word": "ボスゴドラ",
    "head": "ボ",
    "tail": "ラ"
  },
  {
    "word": "アサナン",
    "head": "ア",
    "tail": "ン"
  },
  {
    "word": "チャーレム",
    "head": "チ",
    "tail": "ム"
  },
  {
    "word": "ラクライ",
    "head": "ラ",
    "tail": "イ"
  },
  {
    "word": "ライボルト",
    "head": "ラ",
    "tail": "ト"
  },
  {
    "word": "プラスル",
    "head": "プ",
    "tail": "ル"
  },
  {
    "word": "マイナン",
    "head": "マ",
    "tail": "ン"
  },
  {
    "word": "バルビート",
    "head": "バ",
    "tail": "ト"
  },
  {
    "word": "イルミーゼ",
    "head": "イ",
    "tail": "ゼ"
  },
  {
    "word": "ロゼリア",
    "head": "ロ",
    "tail": "ア"
  },
  {
    "word": "ゴクリン",
    "head": "ゴ",
    "tail": "ン"
  },
  {
    "word": "マルノーム",
    "head": "マ",
    "tail": "ム"
  },
  {
    "word": "キバニア",
    "head": "キ",
    "tail": "ア"
  },
  {
    "word": "サメハダー",
    "head": "サ",
    "tail": "ダ"
  },
  {
    "word": "ホエルコ",
    "head": "ホ",
    "tail": "コ"
  },
  {
    "word": "ホエルオー",
    "head": "ホ",
    "tail": "オ"
  },
  {
    "word": "ドンメル",
    "head": "ド",
    "tail": "ル"
  },
  {
    "word": "バクーダ",
    "head": "バ",
    "tail": "ダ"
  },
  {
    "word": "コータス",
    "head": "コ",
    "tail": "ス"
  },
  {
    "word": "バネブー",
    "head": "バ",
    "tail": "ブ"
  },
  {
    "word": "ブーピッグ",
    "head": "ブ",
    "tail": "グ"
  },
  {
    "word": "パッチール",
    "head": "パ",
    "tail": "ル"
  },
  {
    "word": "ナックラー",
    "head": "ナ",
    "tail": "ラ"
  },
  {
    "word": "ビブラーバ",
    "head": "ビ",
    "tail": "バ"
  },
  {
    "word": "フライゴン",
    "head": "フ",
    "tail": "ン"
  },
  {
    "word": "サボネア",
    "head": "サ",
    "tail": "ア"
  },
  {
    "word": "ノクタス",
    "head": "ノ",
    "tail": "ス"
  },
  {
    "word": "チルット",
    "head": "チ",
    "tail": "ト"
  },
  {
    "word": "チルタリス",
    "head": "チ",
    "tail": "ス"
  },
  {
    "word": "ザングース",
    "head": "ザ",
    "tail": "ス"
  },
  {
    "word": "ハブネーク",
    "head": "ハ",
    "tail": "ク"
  },
  {
    "word": "ルナトーン",
    "head": "ル",
    "tail": "ン"
  },
  {
    "word": "ソルロック",
    "head": "ソ",
    "tail": "ク"
  },
  {
    "word": "ドジョッチ",
    "head": "ド",
    "tail": "チ"
  },
  {
    "word": "ナマズン",
    "head": "ナ",
    "tail": "ン"
  },
  {
    "word": "ヘイガニ",
    "head": "ヘ",
    "tail": "ニ"
  },
  {
    "word": "シザリガー",
    "head": "シ",
    "tail": "ガ"
  },
  {
    "word": "ヤジロン",
    "head": "ヤ",
    "tail": "ン"
  },
  {
    "word": "ネンドール",
    "head": "ネ",
    "tail": "ル"
  },
  {
    "word": "リリーラ",
    "head": "リ",
    "tail": "ラ"
  },
  {
    "word": "ユレイドル",
    "head": "ユ",
    "tail": "ル"
  },
  {
    "word": "アノプス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "アーマルド",
    "head": "ア",
    "tail": "ド"
  },
  {
    "word": "ヒンバス",
    "head": "ヒ",
    "tail": "ス"
  },
  {
    "word": "ミロカロス",
    "head": "ミ",
    "tail": "ス"
  },
  {
    "word": "ポワルン",
    "head": "ポ",
    "tail": "ン"
  },
  {
    "word": "カクレオン",
    "head": "カ",
    "tail": "ン"
  },
  {
    "word": "カゲボウズ",
    "head": "カ",
    "tail": "ズ"
  },
  {
    "word": "ジュペッタ",
    "head": "ジ",
    "tail": "タ"
  },
  {
    "word": "ヨマワル",
    "head": "ヨ",
    "tail": "ル"
  },
  {
    "word": "サマヨール",
    "head": "サ",
    "tail": "ル"
  },
  {
    "word": "トロピウス",
    "head": "ト",
    "tail": "ス"
  },
  {
    "word": "チリーン",
    "head": "チ",
    "tail": "ン"
  },
  {
    "word": "アブソル",
    "head": "ア",
    "tail": "ル"
  },
  {
    "word": "ソーナノ",
    "head": "ソ",
    "tail": "ノ"
  },
  {
    "word": "ユキワラシ",
    "head": "ユ",
    "tail": "シ"
  },
  {
    "word": "オニゴーリ",
    "head": "オ",
    "tail": "リ"
  },
  {
    "word": "タマザラシ",
    "head": "タ",
    "tail": "シ"
  },
  {
    "word": "トドグラー",
    "head": "ト",
    "tail": "ラ"
  },
  {
    "word": "トドゼルガ",
    "head": "ト",
    "tail": "ガ"
  },
  {
    "word": "パールル",
    "head": "パ",
    "tail": "ル"
  },
  {
    "word": "ハンテール",
    "head": "ハ",
    "tail": "ル"
  },
  {
    "word": "サクラビス",
    "head": "サ",
    "tail": "ス"
  },
  {
    "word": "ジーランス",
    "head": "ジ",
    "tail": "ス"
  },
  {
    "word": "ラブカス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "タツベイ",
    "head": "タ",
    "tail": "イ"
  },
  {
    "word": "コモルー",
    "head": "コ",
    "tail": "ル"
  },
  {
    "word": "ボーマンダ",
    "head": "ボ",
    "tail": "ダ"
  },
  {
    "word": "ダンバル",
    "head": "ダ",
    "tail": "ル"
  },
  {
    "word": "メタング",
    "head": "メ",
    "tail": "グ"
  },
  {
    "word": "メタグロス",
    "head": "メ",
    "tail": "ス"
  },
  {
    "word": "レジロック",
    "head": "レ",
    "tail": "ク"
  },
  {
    "word": "レジアイス",
    "head": "レ",
    "tail": "ス"
  },
  {
    "word": "レジスチル",
    "head": "レ",
    "tail": "ル"
  },
  {
    "word": "ラティアス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "ラティオス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "カイオーガ",
    "head": "カ",
    "tail": "ガ"
  },
  {
    "word": "グラードン",
    "head": "グ",
    "tail": "ン"
  },
  {
    "word": "レックウザ",
    "head": "レ",
    "tail": "ザ"
  },
  {
    "word": "ジラーチ",
    "head": "ジ",
    "tail": "チ"
  },
  {
    "word": "デオキシス",
    "head": "デ",
    "tail": "ス"
  },
  {
    "word": "ナエトル",
    "head": "ナ",
    "tail": "ル"
  },
  {
    "word": "ハヤシガメ",
    "head": "ハ",
    "tail": "メ"
  },
  {
    "word": "ドダイトス",
    "head": "ド",
    "tail": "ス"
  },
  {
    "word": "ヒコザル",
    "head": "ヒ",
    "tail": "ル"
  },
  {
    "word": "モウカザル",
    "head": "モ",
    "tail": "ル"
  },
  {
    "word": "ゴウカザル",
    "head": "ゴ",
    "tail": "ル"
  },
  {
    "word": "ポッチャマ",
    "head": "ポ",
    "tail": "マ"
  },
  {
    "word": "ポッタイシ",
    "head": "ポ",
    "tail": "シ"
  },
  {
    "word": "エンペルト",
    "head": "エ",
    "tail": "ト"
  },
  {
    "word": "ムックル",
    "head": "ム",
    "tail": "ル"
  },
  {
    "word": "ムクバード",
    "head": "ム",
    "tail": "ド"
  },
  {
    "word": "ムクホーク",
    "head": "ム",
    "tail": "ク"
  },
  {
    "word": "ビッパ",
    "head": "ビ",
    "tail": "パ"
  },
  {
    "word": "ビーダル",
    "head": "ビ",
    "tail": "ル"
  },
  {
    "word": "コロボーシ",
    "head": "コ",
    "tail": "シ"
  },
  {
    "word": "コロトック",
    "head": "コ",
    "tail": "ク"
  },
  {
    "word": "コリンク",
    "head": "コ",
    "tail": "ク"
  },
  {
    "word": "ルクシオ",
    "head": "ル",
    "tail": "オ"
  },
  {
    "word": "レントラー",
    "head": "レ",
    "tail": "ラ"
  },
  {
    "word": "スボミー",
    "head": "ス",
    "tail": "ミ"
  },
  {
    "word": "ロズレイド",
    "head": "ロ",
    "tail": "ド"
  },
  {
    "word": "ズガイドス",
    "head": "ズ",
    "tail": "ス"
  },
  {
    "word": "ラムパルド",
    "head": "ラ",
    "tail": "ド"
  },
  {
    "word": "タテトプス",
    "head": "タ",
    "tail": "ス"
  },
  {
    "word": "トリデプス",
    "head": "ト",
    "tail": "ス"
  },
  {
    "word": "ミノムッチ",
    "head": "ミ",
    "tail": "チ"
  },
  {
    "word": "ミノマダム",
    "head": "ミ",
    "tail": "ム"
  },
  {
    "word": "ガーメイル",
    "head": "ガ",
    "tail": "ル"
  },
  {
    "word": "ミツハニー",
    "head": "ミ",
    "tail": "ニ"
  },
  {
    "word": "ビークイン",
    "head": "ビ",
    "tail": "ン"
  },
  {
    "word": "パチリス",
    "head": "パ",
    "tail": "ス"
  },
  {
    "word": "ブイゼル",
    "head": "ブ",
    "tail": "ル"
  },
  {
    "word": "フローゼル",
    "head": "フ",
    "tail": "ル"
  },
  {
    "word": "チェリンボ",
    "head": "チ",
    "tail": "ボ"
  },
  {
    "word": "チェリム",
    "head": "チ",
    "tail": "ム"
  },
  {
    "word": "カラナクシ",
    "head": "カ",
    "tail": "シ"
  },
  {
    "word": "トリトドン",
    "head": "ト",
    "tail": "ン"
  },
  {
    "word": "エテボース",
    "head": "エ",
    "tail": "ス"
  },
  {
    "word": "フワンテ",
    "head": "フ",
    "tail": "テ"
  },
  {
    "word": "フワライド",
    "head": "フ",
    "tail": "ド"
  },
  {
    "word": "ミミロル",
    "head": "ミ",
    "tail": "ル"
  },
  {
    "word": "ミミロップ",
    "head": "ミ",
    "tail": "プ"
  },
  {
    "word": "ムウマージ",
    "head": "ム",
    "tail": "ジ"
  },
  {
    "word": "ドンカラス",
    "head": "ド",
    "tail": "ス"
  },
  {
    "word": "ニャルマー",
    "head": "ニ",
    "tail": "マ"
  },
  {
    "word": "ブニャット",
    "head": "ブ",
    "tail": "ト"
  },
  {
    "word": "リーシャン",
    "head": "リ",
    "tail": "ン"
  },
  {
    "word": "スカンプー",
    "head": "ス",
    "tail": "プ"
  },
  {
    "word": "スカタンク",
    "head": "ス",
    "tail": "ク"
  },
  {
    "word": "ドーミラー",
    "head": "ド",
    "tail": "ラ"
  },
  {
    "word": "ドータクン",
    "head": "ド",
    "tail": "ン"
  },
  {
    "word": "ウソハチ",
    "head": "ウ",
    "tail": "チ"
  },
  {
    "word": "マネネ",
    "head": "マ",
    "tail": "ネ"
  },
  {
    "word": "ピンプク",
    "head": "ピ",
    "tail": "ク"
  },
  {
    "word": "ペラップ",
    "head": "ペ",
    "tail": "プ"
  },
  {
    "word": "ミカルゲ",
    "head": "ミ",
    "tail": "ゲ"
  },
  {
    "word": "フカマル",
    "head": "フ",
    "tail": "ル"
  },
  {
    "word": "ガバイト",
    "head": "ガ",
    "tail": "ト"
  },
  {
    "word": "ガブリアス",
    "head": "ガ",
    "tail": "ス"
  },
  {
    "word": "ゴンベ",
    "head": "ゴ",
    "tail": "ベ"
  },
  {
    "word": "リオル",
    "head": "リ",
    "tail": "ル"
  },
  {
    "word": "ルカリオ",
    "head": "ル",
    "tail": "オ"
  },
  {
    "word": "ヒポポタス",
    "head": "ヒ",
    "tail": "ス"
  },
  {
    "word": "カバルドン",
    "head": "カ",
    "tail": "ン"
  },
  {
    "word": "スコルピ",
    "head": "ス",
    "tail": "ピ"
  },
  {
    "word": "ドラピオン",
    "head": "ド",
    "tail": "ン"
  },
  {
    "word": "グレッグル",
    "head": "グ",
    "tail": "ル"
  },
  {
    "word": "ドクロッグ",
    "head": "ド",
    "tail": "グ"
  },
  {
    "word": "マスキッパ",
    "head": "マ",
    "tail": "パ"
  },
  {
    "word": "ケイコウオ",
    "head": "ケ",
    "tail": "オ"
  },
  {
    "word": "ネオラント",
    "head": "ネ",
    "tail": "ト"
  },
  {
    "word": "タマンタ",
    "head": "タ",
    "tail": "タ"
  },
  {
    "word": "ユキカブリ",
    "head": "ユ",
    "tail": "リ"
  },
  {
    "word": "ユキノオー",
    "head": "ユ",
    "tail": "オ"
  },
  {
    "word": "マニューラ",
    "head": "マ",
    "tail": "ラ"
  },
  {
    "word": "ジバコイル",
    "head": "ジ",
    "tail": "ル"
  },
  {
    "word": "ベロベルト",
    "head": "ベ",
    "tail": "ト"
  },
  {
    "word": "ドサイドン",
    "head": "ド",
    "tail": "ン"
  },
  {
    "word": "モジャンボ",
    "head": "モ",
    "tail": "ボ"
  },
  {
    "word": "エレキブル",
    "head": "エ",
    "tail": "ル"
  },
  {
    "word": "ブーバーン",
    "head": "ブ",
    "tail": "ン"
  },
  {
    "word": "トゲキッス",
    "head": "ト",
    "tail": "ス"
  },
  {
    "word": "メガヤンマ",
    "head": "メ",
    "tail": "マ"
  },
  {
    "word": "リーフィア",
    "head": "リ",
    "tail": "ア"
  },
  {
    "word": "グレイシア",
    "head": "グ",
    "tail": "ア"
  },
  {
    "word": "グライオン",
    "head": "グ",
    "tail": "ン"
  },
  {
    "word": "マンムー",
    "head": "マ",
    "tail": "ム"
  },
  {
    "word": "ポリゴンZ",
    "head": "ポ",
    "tail": "ト"
  },
  {
    "word": "エルレイド",
    "head": "エ",
    "tail": "ド"
  },
  {
    "word": "ダイノーズ",
    "head": "ダ",
    "tail": "ズ"
  },
  {
    "word": "ヨノワール",
    "head": "ヨ",
    "tail": "ル"
  },
  {
    "word": "ユキメノコ",
    "head": "ユ",
    "tail": "コ"
  },
  {
    "word": "ロトム",
    "head": "ロ",
    "tail": "ム"
  },
  {
    "word": "ユクシー",
    "head": "ユ",
    "tail": "シ"
  },
  {
    "word": "エムリット",
    "head": "エ",
    "tail": "ト"
  },
  {
    "word": "アグノム",
    "head": "ア",
    "tail": "ム"
  },
  {
    "word": "ディアルガ",
    "head": "デ",
    "tail": "ガ"
  },
  {
    "word": "パルキア",
    "head": "パ",
    "tail": "ア"
  },
  {
    "word": "ヒードラン",
    "head": "ヒ",
    "tail": "ン"
  },
  {
    "word": "レジギガス",
    "head": "レ",
    "tail": "ス"
  },
  {
    "word": "ギラティナ",
    "head": "ギ",
    "tail": "ナ"
  },
  {
    "word": "クレセリア",
    "head": "ク",
    "tail": "ア"
  },
  {
    "word": "フィオネ",
    "head": "フ",
    "tail": "ネ"
  },
  {
    "word": "マナフィ",
    "head": "マ",
    "tail": "イ"
  },
  {
    "word": "ダークライ",
    "head": "ダ",
    "tail": "イ"
  },
  {
    "word": "シェイミ",
    "head": "シ",
    "tail": "ミ"
  },
  {
    "word": "アルセウス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "ビクティニ",
    "head": "ビ",
    "tail": "ニ"
  },
  {
    "word": "ツタージャ",
    "head": "ツ",
    "tail": "ヤ"
  },
  {
    "word": "ジャノビー",
    "head": "ジ",
    "tail": "ビ"
  },
  {
    "word": "ジャローダ",
    "head": "ジ",
    "tail": "ダ"
  },
  {
    "word": "ポカブ",
    "head": "ポ",
    "tail": "ブ"
  },
  {
    "word": "チャオブー",
    "head": "チ",
    "tail": "ブ"
  },
  {
    "word": "エンブオー",
    "head": "エ",
    "tail": "オ"
  },
  {
    "word": "ミジュマル",
    "head": "ミ",
    "tail": "ル"
  },
  {
    "word": "フタチマル",
    "head": "フ",
    "tail": "ル"
  },
  {
    "word": "ダイケンキ",
    "head": "ダ",
    "tail": "キ"
  },
  {
    "word": "ミネズミ",
    "head": "ミ",
    "tail": "ミ"
  },
  {
    "word": "ミルホッグ",
    "head": "ミ",
    "tail": "グ"
  },
  {
    "word": "ヨーテリー",
    "head": "ヨ",
    "tail": "リ"
  },
  {
    "word": "ハーデリア",
    "head": "ハ",
    "tail": "ア"
  },
  {
    "word": "ムーランド",
    "head": "ム",
    "tail": "ド"
  },
  {
    "word": "チョロネコ",
    "head": "チ",
    "tail": "コ"
  },
  {
    "word": "レパルダス",
    "head": "レ",
    "tail": "ス"
  },
  {
    "word": "ヤナップ",
    "head": "ヤ",
    "tail": "プ"
  },
  {
    "word": "ヤナッキー",
    "head": "ヤ",
    "tail": "キ"
  },
  {
    "word": "バオップ",
    "head": "バ",
    "tail": "プ"
  },
  {
    "word": "バオッキー",
    "head": "バ",
    "tail": "キ"
  },
  {
    "word": "ヒヤップ",
    "head": "ヒ",
    "tail": "プ"
  },
  {
    "word": "ヒヤッキー",
    "head": "ヒ",
    "tail": "キ"
  },
  {
    "word": "ムンナ",
    "head": "ム",
    "tail": "ナ"
  },
  {
    "word": "ムシャーナ",
    "head": "ム",
    "tail": "ナ"
  },
  {
    "word": "マメパト",
    "head": "マ",
    "tail": "ト"
  },
  {
    "word": "ハトーボー",
    "head": "ハ",
    "tail": "ボ"
  },
  {
    "word": "ケンホロウ",
    "head": "ケ",
    "tail": "ウ"
  },
  {
    "word": "シママ",
    "head": "シ",
    "tail": "マ"
  },
  {
    "word": "ゼブライカ",
    "head": "ゼ",
    "tail": "カ"
  },
  {
    "word": "ダンゴロ",
    "head": "ダ",
    "tail": "ロ"
  },
  {
    "word": "ガントル",
    "head": "ガ",
    "tail": "ル"
  },
  {
    "word": "ギガイアス",
    "head": "ギ",
    "tail": "ス"
  },
  {
    "word": "コロモリ",
    "head": "コ",
    "tail": "リ"
  },
  {
    "word": "ココロモリ",
    "head": "コ",
    "tail": "リ"
  },
  {
    "word": "モグリュー",
    "head": "モ",
    "tail": "ユ"
  },
  {
    "word": "ドリュウズ",
    "head": "ド",
    "tail": "ズ"
  },
  {
    "word": "タブンネ",
    "head": "タ",
    "tail": "ネ"
  },
  {
    "word": "ドッコラー",
    "head": "ド",
    "tail": "ラ"
  },
  {
    "word": "ドテッコツ",
    "head": "ド",
    "tail": "ツ"
  },
  {
    "word": "ローブシン",
    "head": "ロ",
    "tail": "ン"
  },
  {
    "word": "オタマロ",
    "head": "オ",
    "tail": "ロ"
  },
  {
    "word": "ガマガル",
    "head": "ガ",
    "tail": "ル"
  },
  {
    "word": "ガマゲロゲ",
    "head": "ガ",
    "tail": "ゲ"
  },
  {
    "word": "ナゲキ",
    "head": "ナ",
    "tail": "キ"
  },
  {
    "word": "ダゲキ",
    "head": "ダ",
    "tail": "キ"
  },
  {
    "word": "クルミル",
    "head": "ク",
    "tail": "ル"
  },
  {
    "word": "クルマユ",
    "head": "ク",
    "tail": "ユ"
  },
  {
    "word": "ハハコモリ",
    "head": "ハ",
    "tail": "リ"
  },
  {
    "word": "フシデ",
    "head": "フ",
    "tail": "デ"
  },
  {
    "word": "ホイーガ",
    "head": "ホ",
    "tail": "ガ"
  },
  {
    "word": "ペンドラー",
    "head": "ペ",
    "tail": "ラ"
  },
  {
    "word": "モンメン",
    "head": "モ",
    "tail": "ン"
  },
  {
    "word": "エルフーン",
    "head": "エ",
    "tail": "ン"
  },
  {
    "word": "チュリネ",
    "head": "チ",
    "tail": "ネ"
  },
  {
    "word": "ドレディア",
    "head": "ド",
    "tail": "ア"
  },
  {
    "word": "バスラオ",
    "head": "バ",
    "tail": "オ"
  },
  {
    "word": "メグロコ",
    "head": "メ",
    "tail": "コ"
  },
  {
    "word": "ワルビル",
    "head": "ワ",
    "tail": "ル"
  },
  {
    "word": "ワルビアル",
    "head": "ワ",
    "tail": "ル"
  },
  {
    "word": "ダルマッカ",
    "head": "ダ",
    "tail": "カ"
  },
  {
    "word": "ヒヒダルマ",
    "head": "ヒ",
    "tail": "マ"
  },
  {
    "word": "マラカッチ",
    "head": "マ",
    "tail": "チ"
  },
  {
    "word": "イシズマイ",
    "head": "イ",
    "tail": "イ"
  },
  {
    "word": "イワパレス",
    "head": "イ",
    "tail": "ス"
  },
  {
    "word": "ズルッグ",
    "head": "ズ",
    "tail": "グ"
  },
  {
    "word": "ズルズキン",
    "head": "ズ",
    "tail": "ン"
  },
  {
    "word": "シンボラー",
    "head": "シ",
    "tail": "ラ"
  },
  {
    "word": "デスマス",
    "head": "デ",
    "tail": "ス"
  },
  {
    "word": "デスカーン",
    "head": "デ",
    "tail": "ン"
  },
  {
    "word": "プロトーガ",
    "head": "プ",
    "tail": "ガ"
  },
  {
    "word": "アバゴーラ",
    "head": "ア",
    "tail": "ラ"
  },
  {
    "word": "アーケン",
    "head": "ア",
    "tail": "ン"
  },
  {
    "word": "アーケオス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "ヤブクロン",
    "head": "ヤ",
    "tail": "ン"
  },
  {
    "word": "ダストダス",
    "head": "ダ",
    "tail": "ス"
  },
  {
    "word": "ゾロア",
    "head": "ゾ",
    "tail": "ア"
  },
  {
    "word": "ゾロアーク",
    "head": "ゾ",
    "tail": "ク"
  },
  {
    "word": "チラーミィ",
    "head": "チ",
    "tail": "イ"
  },
  {
    "word": "チラチーノ",
    "head": "チ",
    "tail": "ノ"
  },
  {
    "word": "ゴチム",
    "head": "ゴ",
    "tail": "ム"
  },
  {
    "word": "ゴチミル",
    "head": "ゴ",
    "tail": "ル"
  },
  {
    "word": "ゴチルゼル",
    "head": "ゴ",
    "tail": "ル"
  },
  {
    "word": "ユニラン",
    "head": "ユ",
    "tail": "ン"
  },
  {
    "word": "ダブラン",
    "head": "ダ",
    "tail": "ン"
  },
  {
    "word": "ランクルス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "コアルヒー",
    "head": "コ",
    "tail": "ヒ"
  },
  {
    "word": "スワンナ",
    "head": "ス",
    "tail": "ナ"
  },
  {
    "word": "バニプッチ",
    "head": "バ",
    "tail": "チ"
  },
  {
    "word": "バニリッチ",
    "head": "バ",
    "tail": "チ"
  },
  {
    "word": "バイバニラ",
    "head": "バ",
    "tail": "ラ"
  },
  {
    "word": "シキジカ",
    "head": "シ",
    "tail": "カ"
  },
  {
    "word": "メブキジカ",
    "head": "メ",
    "tail": "カ"
  },
  {
    "word": "エモンガ",
    "head": "エ",
    "tail": "ガ"
  },
  {
    "word": "カブルモ",
    "head": "カ",
    "tail": "モ"
  },
  {
    "word": "シュバルゴ",
    "head": "シ",
    "tail": "ゴ"
  },
  {
    "word": "タマゲタケ",
    "head": "タ",
    "tail": "ケ"
  },
  {
    "word": "モロバレル",
    "head": "モ",
    "tail": "ル"
  },
  {
    "word": "プルリル",
    "head": "プ",
    "tail": "ル"
  },
  {
    "word": "ブルンゲル",
    "head": "ブ",
    "tail": "ル"
  },
  {
    "word": "ママンボウ",
    "head": "マ",
    "tail": "ウ"
  },
  {
    "word": "バチュル",
    "head": "バ",
    "tail": "ル"
  },
  {
    "word": "デンチュラ",
    "head": "デ",
    "tail": "ラ"
  },
  {
    "word": "テッシード",
    "head": "テ",
    "tail": "ド"
  },
  {
    "word": "ナットレイ",
    "head": "ナ",
    "tail": "イ"
  },
  {
    "word": "ギアル",
    "head": "ギ",
    "tail": "ル"
  },
  {
    "word": "ギギアル",
    "head": "ギ",
    "tail": "ル"
  },
  {
    "word": "ギギギアル",
    "head": "ギ",
    "tail": "ル"
  },
  {
    "word": "シビシラス",
    "head": "シ",
    "tail": "ス"
  },
  {
    "word": "シビビール",
    "head": "シ",
    "tail": "ル"
  },
  {
    "word": "シビルドン",
    "head": "シ",
    "tail": "ン"
  },
  {
    "word": "リグレー",
    "head": "リ",
    "tail": "レ"
  },
  {
    "word": "オーベム",
    "head": "オ",
    "tail": "ム"
  },
  {
    "word": "ヒトモシ",
    "head": "ヒ",
    "tail": "シ"
  },
  {
    "word": "ランプラー",
    "head": "ラ",
    "tail": "ラ"
  },
  {
    "word": "シャンデラ",
    "head": "シ",
    "tail": "ラ"
  },
  {
    "word": "キバゴ",
    "head": "キ",
    "tail": "ゴ"
  },
  {
    "word": "オノンド",
    "head": "オ",
    "tail": "ド"
  },
  {
    "word": "オノノクス",
    "head": "オ",
    "tail": "ス"
  },
  {
    "word": "クマシュン",
    "head": "ク",
    "tail": "ン"
  },
  {
    "word": "ツンベアー",
    "head": "ツ",
    "tail": "ア"
  },
  {
    "word": "フリージオ",
    "head": "フ",
    "tail": "オ"
  },
  {
    "word": "チョボマキ",
    "head": "チ",
    "tail": "キ"
  },
  {
    "word": "アギルダー",
    "head": "ア",
    "tail": "ダ"
  },
  {
    "word": "マッギョ",
    "head": "マ",
    "tail": "ヨ"
  },
  {
    "word": "コジョフー",
    "head": "コ",
    "tail": "フ"
  },
  {
    "word": "コジョンド",
    "head": "コ",
    "tail": "ド"
  },
  {
    "word": "クリムガン",
    "head": "ク",
    "tail": "ン"
  },
  {
    "word": "ゴビット",
    "head": "ゴ",
    "tail": "ト"
  },
  {
    "word": "ゴルーグ",
    "head": "ゴ",
    "tail": "グ"
  },
  {
    "word": "コマタナ",
    "head": "コ",
    "tail": "ナ"
  },
  {
    "word": "キリキザン",
    "head": "キ",
    "tail": "ン"
  },
  {
    "word": "バッフロン",
    "head": "バ",
    "tail": "ン"
  },
  {
    "word": "ワシボン",
    "head": "ワ",
    "tail": "ン"
  },
  {
    "word": "ウォーグル",
    "head": "ウ",
    "tail": "ル"
  },
  {
    "word": "バルチャイ",
    "head": "バ",
    "tail": "イ"
  },
  {
    "word": "バルジーナ",
    "head": "バ",
    "tail": "ナ"
  },
  {
    "word": "クイタラン",
    "head": "ク",
    "tail": "ン"
  },
  {
    "word": "アイアント",
    "head": "ア",
    "tail": "ト"
  },
  {
    "word": "モノズ",
    "head": "モ",
    "tail": "ズ"
  },
  {
    "word": "ジヘッド",
    "head": "ジ",
    "tail": "ド"
  },
  {
    "word": "サザンドラ",
    "head": "サ",
    "tail": "ラ"
  },
  {
    "word": "メラルバ",
    "head": "メ",
    "tail": "バ"
  },
  {
    "word": "ウルガモス",
    "head": "ウ",
    "tail": "ス"
  },
  {
    "word": "コバルオン",
    "head": "コ",
    "tail": "ン"
  },
  {
    "word": "テラキオン",
    "head": "テ",
    "tail": "ン"
  },
  {
    "word": "ビリジオン",
    "head": "ビ",
    "tail": "ン"
  },
  {
    "word": "トルネロス",
    "head": "ト",
    "tail": "ス"
  },
  {
    "word": "ボルトロス",
    "head": "ボ",
    "tail": "ス"
  },
  {
    "word": "レシラム",
    "head": "レ",
    "tail": "ム"
  },
  {
    "word": "ゼクロム",
    "head": "ゼ",
    "tail": "ム"
  },
  {
    "word": "ランドロス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "キュレム",
    "head": "キ",
    "tail": "ム"
  },
  {
    "word": "ケルディオ",
    "head": "ケ",
    "tail": "オ"
  },
  {
    "word": "メロエッタ",
    "head": "メ",
    "tail": "タ"
  },
  {
    "word": "ゲノセクト",
    "head": "ゲ",
    "tail": "ト"
  },
  {
    "word": "ハリマロン",
    "head": "ハ",
    "tail": "ン"
  },
  {
    "word": "ハリボーグ",
    "head": "ハ",
    "tail": "グ"
  },
  {
    "word": "ブリガロン",
    "head": "ブ",
    "tail": "ン"
  },
  {
    "word": "フォッコ",
    "head": "フ",
    "tail": "コ"
  },
  {
    "word": "テールナー",
    "head": "テ",
    "tail": "ナ"
  },
  {
    "word": "マフォクシー",
    "head": "マ",
    "tail": "シ"
  },
  {
    "word": "ケロマツ",
    "head": "ケ",
    "tail": "ツ"
  },
  {
    "word": "ゲコガシラ",
    "head": "ゲ",
    "tail": "ラ"
  },
  {
    "word": "ゲッコウガ",
    "head": "ゲ",
    "tail": "ガ"
  },
  {
    "word": "ホルビー",
    "head": "ホ",
    "tail": "ビ"
  },
  {
    "word": "ホルード",
    "head": "ホ",
    "tail": "ド"
  },
  {
    "word": "ヤヤコマ",
    "head": "ヤ",
    "tail": "マ"
  },
  {
    "word": "ヒノヤコマ",
    "head": "ヒ",
    "tail": "マ"
  },
  {
    "word": "ファイアロー",
    "head": "フ",
    "tail": "ロ"
  },
  {
    "word": "コフキムシ",
    "head": "コ",
    "tail": "シ"
  },
  {
    "word": "コフーライ",
    "head": "コ",
    "tail": "イ"
  },
  {
    "word": "ビビヨン",
    "head": "ビ",
    "tail": "ン"
  },
  {
    "word": "シシコ",
    "head": "シ",
    "tail": "コ"
  },
  {
    "word": "カエンジシ",
    "head": "カ",
    "tail": "シ"
  },
  {
    "word": "フラベベ",
    "head": "フ",
    "tail": "ベ"
  },
  {
    "word": "フラエッテ",
    "head": "フ",
    "tail": "テ"
  },
  {
    "word": "フラージェス",
    "head": "フ",
    "tail": "ス"
  },
  {
    "word": "メェークル",
    "head": "メ",
    "tail": "ル"
  },
  {
    "word": "ゴーゴート",
    "head": "ゴ",
    "tail": "ト"
  },
  {
    "word": "ヤンチャム",
    "head": "ヤ",
    "tail": "ム"
  },
  {
    "word": "ゴロンダ",
    "head": "ゴ",
    "tail": "ダ"
  },
  {
    "word": "トリミアン",
    "head": "ト",
    "tail": "ン"
  },
  {
    "word": "ニャスパー",
    "head": "ニ",
    "tail": "パ"
  },
  {
    "word": "ニャオニクス",
    "head": "ニ",
    "tail": "ス"
  },
  {
    "word": "ヒトツキ",
    "head": "ヒ",
    "tail": "キ"
  },
  {
    "word": "ニダンギル",
    "head": "ニ",
    "tail": "ル"
  },
  {
    "word": "ギルガルド",
    "head": "ギ",
    "tail": "ド"
  },
  {
    "word": "シュシュプ",
    "head": "シ",
    "tail": "プ"
  },
  {
    "word": "フレフワン",
    "head": "フ",
    "tail": "ン"
  },
  {
    "word": "ペロッパフ",
    "head": "ペ",
    "tail": "フ"
  },
  {
    "word": "ペロリーム",
    "head": "ペ",
    "tail": "ム"
  },
  {
    "word": "マーイーカ",
    "head": "マ",
    "tail": "カ"
  },
  {
    "word": "カラマネロ",
    "head": "カ",
    "tail": "ロ"
  },
  {
    "word": "カメテテ",
    "head": "カ",
    "tail": "テ"
  },
  {
    "word": "ガメノデス",
    "head": "ガ",
    "tail": "ス"
  },
  {
    "word": "クズモー",
    "head": "ク",
    "tail": "モ"
  },
  {
    "word": "ドラミドロ",
    "head": "ド",
    "tail": "ロ"
  },
  {
    "word": "ウデッポウ",
    "head": "ウ",
    "tail": "ウ"
  },
  {
    "word": "ブロスター",
    "head": "ブ",
    "tail": "タ"
  },
  {
    "word": "エリキテル",
    "head": "エ",
    "tail": "ル"
  },
  {
    "word": "エレザード",
    "head": "エ",
    "tail": "ド"
  },
  {
    "word": "チゴラス",
    "head": "チ",
    "tail": "ス"
  },
  {
    "word": "ガチゴラス",
    "head": "ガ",
    "tail": "ス"
  },
  {
    "word": "アマルス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "アマルルガ",
    "head": "ア",
    "tail": "ガ"
  },
  {
    "word": "ニンフィア",
    "head": "ニ",
    "tail": "ア"
  },
  {
    "word": "ルチャブル",
    "head": "ル",
    "tail": "ル"
  },
  {
    "word": "デデンネ",
    "head": "デ",
    "tail": "ネ"
  },
  {
    "word": "メレシー",
    "head": "メ",
    "tail": "シ"
  },
  {
    "word": "ヌメラ",
    "head": "ヌ",
    "tail": "ラ"
  },
  {
    "word": "ヌメイル",
    "head": "ヌ",
    "tail": "ル"
  },
  {
    "word": "ヌメルゴン",
    "head": "ヌ",
    "tail": "ン"
  },
  {
    "word": "クレッフィ",
    "head": "ク",
    "tail": "イ"
  },
  {
    "word": "ボクレー",
    "head": "ボ",
    "tail": "レ"
  },
  {
    "word": "オーロット",
    "head": "オ",
    "tail": "ト"
  },
  {
    "word": "バケッチャ",
    "head": "バ",
    "tail": "ヤ"
  },
  {
    "word": "パンプジン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "カチコール",
    "head": "カ",
    "tail": "ル"
  },
  {
    "word": "クレベース",
    "head": "ク",
    "tail": "ス"
  },
  {
    "word": "オンバット",
    "head": "オ",
    "tail": "ト"
  },
  {
    "word": "オンバーン",
    "head": "オ",
    "tail": "ン"
  },
  {
    "word": "ゼルネアス",
    "head": "ゼ",
    "tail": "ス"
  },
  {
    "word": "イベルタル",
    "head": "イ",
    "tail": "ル"
  },
  {
    "word": "ジガルデ",
    "head": "ジ",
    "tail": "デ"
  },
  {
    "word": "ディアンシー",
    "head": "デ",
    "tail": "シ"
  },
  {
    "word": "フーパ",
    "head": "フ",
    "tail": "パ"
  },
  {
    "word": "ボルケニオン",
    "head": "ボ",
    "tail": "ン"
  },
  {
    "word": "モクロー",
    "head": "モ",
    "tail": "ロ"
  },
  {
    "word": "フクスロー",
    "head": "フ",
    "tail": "ロ"
  },
  {
    "word": "ジュナイパー",
    "head": "ジ",
    "tail": "パ"
  },
  {
    "word": "ニャビー",
    "head": "ニ",
    "tail": "ビ"
  },
  {
    "word": "ニャヒート",
    "head": "ニ",
    "tail": "ト"
  },
  {
    "word": "ガオガエン",
    "head": "ガ",
    "tail": "ン"
  },
  {
    "word": "アシマリ",
    "head": "ア",
    "tail": "リ"
  },
  {
    "word": "オシャマリ",
    "head": "オ",
    "tail": "リ"
  },
  {
    "word": "アシレーヌ",
    "head": "ア",
    "tail": "ヌ"
  },
  {
    "word": "ツツケラ",
    "head": "ツ",
    "tail": "ラ"
  },
  {
    "word": "ケララッパ",
    "head": "ケ",
    "tail": "パ"
  },
  {
    "word": "ドデカバシ",
    "head": "ド",
    "tail": "シ"
  },
  {
    "word": "ヤングース",
    "head": "ヤ",
    "tail": "ス"
  },
  {
    "word": "デカグース",
    "head": "デ",
    "tail": "ス"
  },
  {
    "word": "アゴジムシ",
    "head": "ア",
    "tail": "シ"
  },
  {
    "word": "デンヂムシ",
    "head": "デ",
    "tail": "シ"
  },
  {
    "word": "クワガノン",
    "head": "ク",
    "tail": "ン"
  },
  {
    "word": "マケンカニ",
    "head": "マ",
    "tail": "ニ"
  },
  {
    "word": "ケケンカニ",
    "head": "ケ",
    "tail": "ニ"
  },
  {
    "word": "オドリドリ",
    "head": "オ",
    "tail": "リ"
  },
  {
    "word": "アブリー",
    "head": "ア",
    "tail": "リ"
  },
  {
    "word": "アブリボン",
    "head": "ア",
    "tail": "ン"
  },
  {
    "word": "イワンコ",
    "head": "イ",
    "tail": "コ"
  },
  {
    "word": "ルガルガン",
    "head": "ル",
    "tail": "ン"
  },
  {
    "word": "ヨワシ",
    "head": "ヨ",
    "tail": "シ"
  },
  {
    "word": "ヒドイデ",
    "head": "ヒ",
    "tail": "デ"
  },
  {
    "word": "ドヒドイデ",
    "head": "ド",
    "tail": "デ"
  },
  {
    "word": "ドロバンコ",
    "head": "ド",
    "tail": "コ"
  },
  {
    "word": "バンバドロ",
    "head": "バ",
    "tail": "ロ"
  },
  {
    "word": "シズクモ",
    "head": "シ",
    "tail": "モ"
  },
  {
    "word": "オニシズクモ",
    "head": "オ",
    "tail": "モ"
  },
  {
    "word": "カリキリ",
    "head": "カ",
    "tail": "リ"
  },
  {
    "word": "ラランテス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "ネマシュ",
    "head": "ネ",
    "tail": "ユ"
  },
  {
    "word": "マシェード",
    "head": "マ",
    "tail": "ド"
  },
  {
    "word": "ヤトウモリ",
    "head": "ヤ",
    "tail": "リ"
  },
  {
    "word": "エンニュート",
    "head": "エ",
    "tail": "ト"
  },
  {
    "word": "ヌイコグマ",
    "head": "ヌ",
    "tail": "マ"
  },
  {
    "word": "キテルグマ",
    "head": "キ",
    "tail": "マ"
  },
  {
    "word": "アマカジ",
    "head": "ア",
    "tail": "ジ"
  },
  {
    "word": "アママイコ",
    "head": "ア",
    "tail": "コ"
  },
  {
    "word": "アマージョ",
    "head": "ア",
    "tail": "ヨ"
  },
  {
    "word": "キュワワー",
    "head": "キ",
    "tail": "ワ"
  },
  {
    "word": "ヤレユータン",
    "head": "ヤ",
    "tail": "ン"
  },
  {
    "word": "ナゲツケサル",
    "head": "ナ",
    "tail": "ル"
  },
  {
    "word": "コソクムシ",
    "head": "コ",
    "tail": "シ"
  },
  {
    "word": "グソクムシャ",
    "head": "グ",
    "tail": "ヤ"
  },
  {
    "word": "スナバァ",
    "head": "ス",
    "tail": "ア"
  },
  {
    "word": "シロデスナ",
    "head": "シ",
    "tail": "ナ"
  },
  {
    "word": "ナマコブシ",
    "head": "ナ",
    "tail": "シ"
  },
  {
    "word": "タイプ:ヌル",
    "head": "タ",
    "tail": "ル"
  },
  {
    "word": "シルヴァディ",
    "head": "シ",
    "tail": "イ"
  },
  {
    "word": "メテノ",
    "head": "メ",
    "tail": "ノ"
  },
  {
    "word": "ネッコアラ",
    "head": "ネ",
    "tail": "ラ"
  },
  {
    "word": "バクガメス",
    "head": "バ",
    "tail": "ス"
  },
  {
    "word": "トゲデマル",
    "head": "ト",
    "tail": "ル"
  },
  {
    "word": "ミミッキュ",
    "head": "ミ",
    "tail": "ユ"
  },
  {
    "word": "ハギギシリ",
    "head": "ハ",
    "tail": "リ"
  },
  {
    "word": "ジジーロン",
    "head": "ジ",
    "tail": "ン"
  },
  {
    "word": "ダダリン",
    "head": "ダ",
    "tail": "ン"
  },
  {
    "word": "ジャラコ",
    "head": "ジ",
    "tail": "コ"
  },
  {
    "word": "ジャランゴ",
    "head": "ジ",
    "tail": "ゴ"
  },
  {
    "word": "ジャラランガ",
    "head": "ジ",
    "tail": "ガ"
  },
  {
    "word": "カプ・コケコ",
    "head": "カ",
    "tail": "コ"
  },
  {
    "word": "カプ・テテフ",
    "head": "カ",
    "tail": "フ"
  },
  {
    "word": "カプ・ブルル",
    "head": "カ",
    "tail": "ル"
  },
  {
    "word": "カプ・レヒレ",
    "head": "カ",
    "tail": "レ"
  },
  {
    "word": "コスモッグ",
    "head": "コ",
    "tail": "グ"
  },
  {
    "word": "コスモウム",
    "head": "コ",
    "tail": "ム"
  },
  {
    "word": "ソルガレオ",
    "head": "ソ",
    "tail": "オ"
  },
  {
    "word": "ルナアーラ",
    "head": "ル",
    "tail": "ラ"
  },
  {
    "word": "ウツロイド",
    "head": "ウ",
    "tail": "ド"
  },
  {
    "word": "マッシブーン",
    "head": "マ",
    "tail": "ン"
  },
  {
    "word": "フェローチェ",
    "head": "フ",
    "tail": "エ"
  },
  {
    "word": "デンジュモク",
    "head": "デ",
    "tail": "ク"
  },
  {
    "word": "テッカグヤ",
    "head": "テ",
    "tail": "ヤ"
  },
  {
    "word": "カミツルギ",
    "head": "カ",
    "tail": "ギ"
  },
  {
    "word": "アクジキング",
    "head": "ア",
    "tail": "グ"
  },
  {
    "word": "ネクロズマ",
    "head": "ネ",
    "tail": "マ"
  },
  {
    "word": "マギアナ",
    "head": "マ",
    "tail": "ナ"
  },
  {
    "word": "マーシャドー",
    "head": "マ",
    "tail": "ド"
  },
  {
    "word": "ベベノム",
    "head": "ベ",
    "tail": "ム"
  },
  {
    "word": "アーゴヨン",
    "head": "ア",
    "tail": "ン"
  },
  {
    "word": "ツンデツンデ",
    "head": "ツ",
    "tail": "デ"
  },
  {
    "word": "ズガドーン",
    "head": "ズ",
    "tail": "ン"
  },
  {
    "word": "ゼラオラ",
    "head": "ゼ",
    "tail": "ラ"
  },
  {
    "word": "メルタン",
    "head": "メ",
    "tail": "ン"
  },
  {
    "word": "メルメタル",
    "head": "メ",
    "tail": "ル"
  },
  {
    "word": "サルノリ",
    "head": "サ",
    "tail": "リ"
  },
  {
    "word": "バチンキー",
    "head": "バ",
    "tail": "キ"
  },
  {
    "word": "ゴリランダー",
    "head": "ゴ",
    "tail": "ダ"
  },
  {
    "word": "ヒバニー",
    "head": "ヒ",
    "tail": "ニ"
  },
  {
    "word": "ラビフット",
    "head": "ラ",
    "tail": "ト"
  },
  {
    "word": "エースバーン",
    "head": "エ",
    "tail": "ン"
  },
  {
    "word": "メッソン",
    "head": "メ",
    "tail": "ン"
  },
  {
    "word": "ジメレオン",
    "head": "ジ",
    "tail": "ン"
  },
  {
    "word": "インテレオン",
    "head": "イ",
    "tail": "ン"
  },
  {
    "word": "ホシガリス",
    "head": "ホ",
    "tail": "ス"
  },
  {
    "word": "ヨクバリス",
    "head": "ヨ",
    "tail": "ス"
  },
  {
    "word": "ココガラ",
    "head": "コ",
    "tail": "ラ"
  },
  {
    "word": "アオガラス",
    "head": "ア",
    "tail": "ス"
  },
  {
    "word": "アーマーガア",
    "head": "ア",
    "tail": "ア"
  },
  {
    "word": "サッチムシ",
    "head": "サ",
    "tail": "シ"
  },
  {
    "word": "レドームシ",
    "head": "レ",
    "tail": "シ"
  },
  {
    "word": "イオルブ",
    "head": "イ",
    "tail": "ブ"
  },
  {
    "word": "クスネ",
    "head": "ク",
    "tail": "ネ"
  },
  {
    "word": "フォクスライ",
    "head": "フ",
    "tail": "イ"
  },
  {
    "word": "ヒメンカ",
    "head": "ヒ",
    "tail": "カ"
  },
  {
    "word": "ワタシラガ",
    "head": "ワ",
    "tail": "ガ"
  },
  {
    "word": "ウールー",
    "head": "ウ",
    "tail": "ル"
  },
  {
    "word": "バイウールー",
    "head": "バ",
    "tail": "ル"
  },
  {
    "word": "カムカメ",
    "head": "カ",
    "tail": "メ"
  },
  {
    "word": "カジリガメ",
    "head": "カ",
    "tail": "メ"
  },
  {
    "word": "ワンパチ",
    "head": "ワ",
    "tail": "チ"
  },
  {
    "word": "パルスワン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "タンドン",
    "head": "タ",
    "tail": "ン"
  },
  {
    "word": "トロッゴン",
    "head": "ト",
    "tail": "ン"
  },
  {
    "word": "セキタンザン",
    "head": "セ",
    "tail": "ン"
  },
  {
    "word": "カジッチュ",
    "head": "カ",
    "tail": "ユ"
  },
  {
    "word": "アップリュー",
    "head": "ア",
    "tail": "ユ"
  },
  {
    "word": "タルップル",
    "head": "タ",
    "tail": "ル"
  },
  {
    "word": "スナヘビ",
    "head": "ス",
    "tail": "ビ"
  },
  {
    "word": "サダイジャ",
    "head": "サ",
    "tail": "ヤ"
  },
  {
    "word": "ウッウ",
    "head": "ウ",
    "tail": "ウ"
  },
  {
    "word": "サシカマス",
    "head": "サ",
    "tail": "ス"
  },
  {
    "word": "カマスジョー",
    "head": "カ",
    "tail": "ヨ"
  },
  {
    "word": "エレズン",
    "head": "エ",
    "tail": "ン"
  },
  {
    "word": "ストリンダー",
    "head": "ス",
    "tail": "ダ"
  },
  {
    "word": "ヤクデ",
    "head": "ヤ",
    "tail": "デ"
  },
  {
    "word": "マルヤクデ",
    "head": "マ",
    "tail": "デ"
  },
  {
    "word": "タタッコ",
    "head": "タ",
    "tail": "コ"
  },
  {
    "word": "オトスパス",
    "head": "オ",
    "tail": "ス"
  },
  {
    "word": "ヤバチャ",
    "head": "ヤ",
    "tail": "ヤ"
  },
  {
    "word": "ポットデス",
    "head": "ポ",
    "tail": "ス"
  },
  {
    "word": "ミブリム",
    "head": "ミ",
    "tail": "ム"
  },
  {
    "word": "テブリム",
    "head": "テ",
    "tail": "ム"
  },
  {
    "word": "ブリムオン",
    "head": "ブ",
    "tail": "ン"
  },
  {
    "word": "ベロバー",
    "head": "ベ",
    "tail": "バ"
  },
  {
    "word": "ギモー",
    "head": "ギ",
    "tail": "モ"
  },
  {
    "word": "オーロンゲ",
    "head": "オ",
    "tail": "ゲ"
  },
  {
    "word": "タチフサグマ",
    "head": "タ",
    "tail": "マ"
  },
  {
    "word": "ニャイキング",
    "head": "ニ",
    "tail": "グ"
  },
  {
    "word": "サニゴーン",
    "head": "サ",
    "tail": "ン"
  },
  {
    "word": "ネギガナイト",
    "head": "ネ",
    "tail": "ト"
  },
  {
    "word": "バリコオル",
    "head": "バ",
    "tail": "ル"
  },
  {
    "word": "デスバーン",
    "head": "デ",
    "tail": "ン"
  },
  {
    "word": "マホミル",
    "head": "マ",
    "tail": "ル"
  },
  {
    "word": "マホイップ",
    "head": "マ",
    "tail": "プ"
  },
  {
    "word": "タイレーツ",
    "head": "タ",
    "tail": "ツ"
  },
  {
    "word": "バチンウニ",
    "head": "バ",
    "tail": "ニ"
  },
  {
    "word": "ユキハミ",
    "head": "ユ",
    "tail": "ミ"
  },
  {
    "word": "モスノウ",
    "head": "モ",
    "tail": "ウ"
  },
  {
    "word": "イシヘンジン",
    "head": "イ",
    "tail": "ン"
  },
  {
    "word": "コオリッポ",
    "head": "コ",
    "tail": "ポ"
  },
  {
    "word": "イエッサン",
    "head": "イ",
    "tail": "ン"
  },
  {
    "word": "モルペコ",
    "head": "モ",
    "tail": "コ"
  },
  {
    "word": "ゾウドウ",
    "head": "ゾ",
    "tail": "ウ"
  },
  {
    "word": "ダイオウドウ",
    "head": "ダ",
    "tail": "ウ"
  },
  {
    "word": "パッチラゴン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "パッチルドン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "ウオノラゴン",
    "head": "ウ",
    "tail": "ン"
  },
  {
    "word": "ウオチルドン",
    "head": "ウ",
    "tail": "ン"
  },
  {
    "word": "ジュラルドン",
    "head": "ジ",
    "tail": "ン"
  },
  {
    "word": "ドラメシヤ",
    "head": "ド",
    "tail": "ヤ"
  },
  {
    "word": "ドロンチ",
    "head": "ド",
    "tail": "チ"
  },
  {
    "word": "ドラパルト",
    "head": "ド",
    "tail": "ト"
  },
  {
    "word": "ザシアン",
    "head": "ザ",
    "tail": "ン"
  },
  {
    "word": "ザマゼンタ",
    "head": "ザ",
    "tail": "タ"
  },
  {
    "word": "ムゲンダイナ",
    "head": "ム",
    "tail": "ナ"
  },
  {
    "word": "ダクマ",
    "head": "ダ",
    "tail": "マ"
  },
  {
    "word": "ウーラオス",
    "head": "ウ",
    "tail": "ス"
  },
  {
    "word": "ザルード",
    "head": "ザ",
    "tail": "ド"
  },
  {
    "word": "レジエレキ",
    "head": "レ",
    "tail": "キ"
  },
  {
    "word": "レジドラゴ",
    "head": "レ",
    "tail": "ゴ"
  },
  {
    "word": "ブリザポス",
    "head": "ブ",
    "tail": "ス"
  },
  {
    "word": "レイスポス",
    "head": "レ",
    "tail": "ス"
  },
  {
    "word": "バドレックス",
    "head": "バ",
    "tail": "ス"
  },
  {
    "word": "アヤシシ",
    "head": "ア",
    "tail": "シ"
  },
  {
    "word": "バサギリ",
    "head": "バ",
    "tail": "リ"
  },
  {
    "word": "ガチグマ",
    "head": "ガ",
    "tail": "マ"
  },
  {
    "word": "イダイトウ",
    "head": "イ",
    "tail": "ウ"
  },
  {
    "word": "オオニューラ",
    "head": "オ",
    "tail": "ラ"
  },
  {
    "word": "ハリーマン",
    "head": "ハ",
    "tail": "ン"
  },
  {
    "word": "ラブトロス",
    "head": "ラ",
    "tail": "ス"
  },
  {
    "word": "ニャオハ",
    "head": "ニ",
    "tail": "ハ"
  },
  {
    "word": "ニャローテ",
    "head": "ニ",
    "tail": "テ"
  },
  {
    "word": "マスカーニャ",
    "head": "マ",
    "tail": "ヤ"
  },
  {
    "word": "ホゲータ",
    "head": "ホ",
    "tail": "タ"
  },
  {
    "word": "アチゲータ",
    "head": "ア",
    "tail": "タ"
  },
  {
    "word": "ラウドボーン",
    "head": "ラ",
    "tail": "ン"
  },
  {
    "word": "クワッス",
    "head": "ク",
    "tail": "ス"
  },
  {
    "word": "ウェルカモ",
    "head": "ウ",
    "tail": "モ"
  },
  {
    "word": "ウェーニバル",
    "head": "ウ",
    "tail": "ル"
  },
  {
    "word": "グルトン",
    "head": "グ",
    "tail": "ン"
  },
  {
    "word": "パフュートン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "タマンチュラ",
    "head": "タ",
    "tail": "ラ"
  },
  {
    "word": "ワナイダー",
    "head": "ワ",
    "tail": "ダ"
  },
  {
    "word": "マメバッタ",
    "head": "マ",
    "tail": "タ"
  },
  {
    "word": "エクスレッグ",
    "head": "エ",
    "tail": "グ"
  },
  {
    "word": "パモ",
    "head": "パ",
    "tail": "モ"
  },
  {
    "word": "パモット",
    "head": "パ",
    "tail": "ト"
  },
  {
    "word": "パーモット",
    "head": "パ",
    "tail": "ト"
  },
  {
    "word": "ワッカネズミ",
    "head": "ワ",
    "tail": "ミ"
  },
  {
    "word": "イッカネズミ",
    "head": "イ",
    "tail": "ミ"
  },
  {
    "word": "パピモッチ",
    "head": "パ",
    "tail": "チ"
  },
  {
    "word": "バウッツェル",
    "head": "バ",
    "tail": "ル"
  },
  {
    "word": "ミニーブ",
    "head": "ミ",
    "tail": "ブ"
  },
  {
    "word": "オリーニョ",
    "head": "オ",
    "tail": "ヨ"
  },
  {
    "word": "オリーヴァ",
    "head": "オ",
    "tail": "ア"
  },
  {
    "word": "イキリンコ",
    "head": "イ",
    "tail": "コ"
  },
  {
    "word": "コジオ",
    "head": "コ",
    "tail": "オ"
  },
  {
    "word": "ジオヅム",
    "head": "ジ",
    "tail": "ム"
  },
  {
    "word": "キョジオーン",
    "head": "キ",
    "tail": "ン"
  },
  {
    "word": "カルボウ",
    "head": "カ",
    "tail": "ウ"
  },
  {
    "word": "グレンアルマ",
    "head": "グ",
    "tail": "マ"
  },
  {
    "word": "ソウブレイズ",
    "head": "ソ",
    "tail": "ズ"
  },
  {
    "word": "ズピカ",
    "head": "ズ",
    "tail": "カ"
  },
  {
    "word": "ハラバリー",
    "head": "ハ",
    "tail": "リ"
  },
  {
    "word": "カイデン",
    "head": "カ",
    "tail": "ン"
  },
  {
    "word": "タイカイデン",
    "head": "タ",
    "tail": "ン"
  },
  {
    "word": "オラチフ",
    "head": "オ",
    "tail": "フ"
  },
  {
    "word": "マフィティフ",
    "head": "マ",
    "tail": "フ"
  },
  {
    "word": "シルシュルー",
    "head": "シ",
    "tail": "ル"
  },
  {
    "word": "タギングル",
    "head": "タ",
    "tail": "ル"
  },
  {
    "word": "アノクサ",
    "head": "ア",
    "tail": "サ"
  },
  {
    "word": "アノホラグサ",
    "head": "ア",
    "tail": "サ"
  },
  {
    "word": "ノノクラゲ",
    "head": "ノ",
    "tail": "ゲ"
  },
  {
    "word": "リククラゲ",
    "head": "リ",
    "tail": "ゲ"
  },
  {
    "word": "ガケガニ",
    "head": "ガ",
    "tail": "ニ"
  },
  {
    "word": "カプサイジ",
    "head": "カ",
    "tail": "ジ"
  },
  {
    "word": "スコヴィラン",
    "head": "ス",
    "tail": "ン"
  },
  {
    "word": "シガロコ",
    "head": "シ",
    "tail": "コ"
  },
  {
    "word": "ベラカス",
    "head": "ベ",
    "tail": "ス"
  },
  {
    "word": "ヒラヒナ",
    "head": "ヒ",
    "tail": "ナ"
  },
  {
    "word": "クエスパトラ",
    "head": "ク",
    "tail": "ラ"
  },
  {
    "word": "カヌチャン",
    "head": "カ",
    "tail": "ン"
  },
  {
    "word": "ナカヌチャン",
    "head": "ナ",
    "tail": "ン"
  },
  {
    "word": "デカヌチャン",
    "head": "デ",
    "tail": "ン"
  },
  {
    "word": "ウミディグダ",
    "head": "ウ",
    "tail": "ダ"
  },
  {
    "word": "ウミトリオ",
    "head": "ウ",
    "tail": "オ"
  },
  {
    "word": "オトシドリ",
    "head": "オ",
    "tail": "リ"
  },
  {
    "word": "ナミイルカ",
    "head": "ナ",
    "tail": "カ"
  },
  {
    "word": "イルカマン",
    "head": "イ",
    "tail": "ン"
  },
  {
    "word": "ブロロン",
    "head": "ブ",
    "tail": "ン"
  },
  {
    "word": "ブロロローム",
    "head": "ブ",
    "tail": "ム"
  },
  {
    "word": "モトトカゲ",
    "head": "モ",
    "tail": "ゲ"
  },
  {
    "word": "ミミズズ",
    "head": "ミ",
    "tail": "ズ"
  },
  {
    "word": "キラーメ",
    "head": "キ",
    "tail": "メ"
  },
  {
    "word": "キラフロル",
    "head": "キ",
    "tail": "ル"
  },
  {
    "word": "ボチ",
    "head": "ボ",
    "tail": "チ"
  },
  {
    "word": "ハカドッグ",
    "head": "ハ",
    "tail": "グ"
  },
  {
    "word": "カラミンゴ",
    "head": "カ",
    "tail": "ゴ"
  },
  {
    "word": "アルクジラ",
    "head": "ア",
    "tail": "ラ"
  },
  {
    "word": "ハルクジラ",
    "head": "ハ",
    "tail": "ラ"
  },
  {
    "word": "ミガルーサ",
    "head": "ミ",
    "tail": "サ"
  },
  {
    "word": "ヘイラッシャ",
    "head": "ヘ",
    "tail": "ヤ"
  },
  {
    "word": "シャリタツ",
    "head": "シ",
    "tail": "ツ"
  },
  {
    "word": "コノヨザル",
    "head": "コ",
    "tail": "ル"
  },
  {
    "word": "ドオー",
    "head": "ド",
    "tail": "オ"
  },
  {
    "word": "リキキリン",
    "head": "リ",
    "tail": "ン"
  },
  {
    "word": "ノココッチ",
    "head": "ノ",
    "tail": "チ"
  },
  {
    "word": "ドドゲザン",
    "head": "ド",
    "tail": "ン"
  },
  {
    "word": "イダイナキバ",
    "head": "イ",
    "tail": "バ"
  },
  {
    "word": "サケブシッポ",
    "head": "サ",
    "tail": "ポ"
  },
  {
    "word": "アラブルタケ",
    "head": "ア",
    "tail": "ケ"
  },
  {
    "word": "ハバタクカミ",
    "head": "ハ",
    "tail": "ミ"
  },
  {
    "word": "チヲハウハネ",
    "head": "チ",
    "tail": "ネ"
  },
  {
    "word": "スナノケガワ",
    "head": "ス",
    "tail": "ワ"
  },
  {
    "word": "テツノワダチ",
    "head": "テ",
    "tail": "チ"
  },
  {
    "word": "テツノツツミ",
    "head": "テ",
    "tail": "ミ"
  },
  {
    "word": "テツノカイナ",
    "head": "テ",
    "tail": "ナ"
  },
  {
    "word": "テツノコウベ",
    "head": "テ",
    "tail": "ベ"
  },
  {
    "word": "テツノドクガ",
    "head": "テ",
    "tail": "ガ"
  },
  {
    "word": "テツノイバラ",
    "head": "テ",
    "tail": "ラ"
  },
  {
    "word": "セビエ",
    "head": "セ",
    "tail": "エ"
  },
  {
    "word": "セゴール",
    "head": "セ",
    "tail": "ル"
  },
  {
    "word": "セグレイブ",
    "head": "セ",
    "tail": "ブ"
  },
  {
    "word": "コレクレー",
    "head": "コ",
    "tail": "レ"
  },
  {
    "word": "サーフゴー",
    "head": "サ",
    "tail": "ゴ"
  },
  {
    "word": "チオンジェン",
    "head": "チ",
    "tail": "ン"
  },
  {
    "word": "パオジアン",
    "head": "パ",
    "tail": "ン"
  },
  {
    "word": "ディンルー",
    "head": "デ",
    "tail": "ル"
  },
  {
    "word": "イーユイ",
    "head": "イ",
    "tail": "イ"
  },
  {
    "word": "トドロクツキ",
    "head": "ト",
    "tail": "キ"
  },
  {
    "word": "テツノブジン",
    "head": "テ",
    "tail": "ン"
  },
  {
    "word": "コライドン",
    "head": "コ",
    "tail": "ン"
  },
  {
    "word": "ミライドン",
    "head": "ミ",
    "tail": "ン"
  },
  {
    "word": "ウネルミナモ",
    "head": "ウ",
    "tail": "モ"
  },
  {
    "word": "テツノイサハ",
    "head": "テ",
    "tail": "ハ"
  },
  {
    "word": "カミッチュ",
    "head": "カ",
    "tail": "ユ"
  },
  {
    "word": "チャデス",
    "head": "チ",
    "tail": "ス"
  },
  {
    "word": "ヤバソチャ",
    "head": "ヤ",
    "tail": "ヤ"
  },
  {
    "word": "イイネイヌ",
    "head": "イ",
    "tail": "ヌ"
  },
  {
    "word": "マシマシラ",
    "head": "マ",
    "tail": "ラ"
  },
  {
    "word": "キチキギス",
    "head": "キ",
    "tail": "ス"
  },
  {
    "word": "オーガポン",
    "head": "オ",
    "tail": "ン"
  },
  {
    "word": "ブリジュラス",
    "head": "ブ",
    "tail": "ス"
  },
  {
    "word": "カミツオロチ",
    "head": "カ",
    "tail": "チ"
  },
  {
    "word": "ウガツホムラ",
    "head": "ウ",
    "tail": "ラ"
  },
  {
    "word": "タケルライコ",
    "head": "タ",
    "tail": "コ"
  },
  {
    "word": "テツノイワオ",
    "head": "テ",
    "tail": "オ"
  },
  {
    "word": "テツノカシラ",
    "head": "テ",
    "tail": "ラ"
  },
  {
    "word": "テラパゴス",
    "head": "テ",
    "tail": "ス"
  },
  {
    "word": "モモワロウ",
    "head": "モ",
    "tail": "ウ"
  }
];

window.App = window.App || {};
App.wordlist = shiritoriWords;