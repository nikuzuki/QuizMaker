/*
 * QuizMaker | tmlib.js
 */

/*
 * constant
 */

// 初期化
tm.game.setup({
  title: "TrashQuiz",   // ゲームのタイトル
  startLabel: "title",  // 開始するシーンのラベル
  background: "black",  // 背景色
  fps: "60",            // フレームレート
});

var MAX_PER_LINE    = 2;                            // ピースの横に並ぶ最大数
var MAX_NUM         = MAX_PER_LINE*MAX_PER_LINE;  // ピース全体の数
var PIECE_ALL_WIDTH = SCREEN_GRID_X.span(15);       // ピース全体の幅
var PIECE_MARGIN    = 10;                           // ピースのマージン
var PIECE_SIZE      = (PIECE_ALL_WIDTH-(PIECE_MARGIN*MAX_PER_LINE))/MAX_PER_LINE; // ピースのサイズ
var PIECE_OFFSET_X  = (SCREEN_WIDTH-PIECE_ALL_WIDTH)/2 + (PIECE_SIZE+PIECE_MARGIN)/2; // ピースのオフセットX
var PIECE_OFFSET_Y  = (SCREEN_HEIGHT-PIECE_ALL_WIDTH)/2 + (PIECE_SIZE+PIECE_MARGIN)/2; // ピースのオフセットY
var PIECE_COLOR     = "hsl(180, 76%, 64%)";   // ピースの色 (色相, 彩度, 輝度)
var PIECE_FONT_SIZE = PIECE_SIZE*0.4;
var SCREEN_WIDTH    = 640;                          // スクリーン幅
var SCREEN_HEIGHT   = 960;                          // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;               // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;              // スクリーンの高さの半分
// 恐らくデータベースから受け取る形の例
var quizArray = new Array("カタログ", "回収不可", "紙ひもで縛って、集団資源回収に出す。または古紙業者へ");
// 問題形式として理想的な形
var unaArray = new Array("りんご", "みかん", "梨", "いちご");
/*
var ASSETS = {
  "bgm": "",
  "SE": "",
  "bg": "",
  "Trash": "",
}
*/

tm.define("GameScene", {
  // 親クラスを指定
  superClass: "Scene",

  // 初期化
  init: function(){
    this.superInit();

    // タイマー
    this.time = 7200; //2分だと思う

    // 最初のインデックス タッチ対象となる最初のピース
    this.currentIndex = 1;

    // ピース用のグループを追加
    var pieceGroup = CanvasElement().addChildTo(this);

    // 1 ~ 25 の数値配列を生成
    //var numbers = Array.range(1, MAX_NUM+1).shuffle();
    //console.log("numbers = " + numbers );

    unaArray.shuffle();

    var self = this;

    // (幅, 何本引くか)
    var pieceGrid = GridSystem(PIECE_ALL_WIDTH, MAX_PER_LINE);

    // 数値ボタンを生成
    //numbers.each(function(gomi, i){
    unaArray.each(function(gomi, i){
      // グリッド上でのインデックス
      console.log("i = " + i);
      console.log("index = " + gomi);
      var xIndex = i%MAX_PER_LINE;
      var yIndex = (i/MAX_PER_LINE).floor();

      // ボタン生成
      var button = FlatButton({
        width: PIECE_SIZE,
        height: PIECE_SIZE,
        fillStyle: PIECE_COLOR,
        text: gomi,  // 数字
        fontSize: PIECE_FONT_SIZE,

      }).addChildTo(pieceGroup);

      // ボタンを押した際の処理
      button.x = pieceGrid.span(xIndex) + PIECE_OFFSET_X;
      button.y = pieceGrid.span(yIndex) + PIECE_OFFSET_Y;

      button.onpush = function(){

        console.log("touch: " + this.gomi);
        self.check(this);
      };

      button.gomi = gomi;
    });
  },

  update: function(app){
   // タイマーを更新
   this.time += app.deltaTime;
  },

  check: function(piece){
    // 今のindexと一致したら次に進める
    if(this.currentIndex === piece.gomi){
      this.currentIndex += 1;
      piece.alpha = 0.5;  //明るさ
    }
  },

  clear: function(){
    // スコアを計算
    var score = 2929;

    this.exit("result", {
      score: score,
    });
  },

});
