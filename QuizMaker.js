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


var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 960;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーンの高さの半分
var quizArray = new Array("カタログ", "回収不可", "紙ひもで縛って、集団資源回収に出す。または古紙業者へ");

/*
var ASSETS = {
  "bgm": "",
  "SE": "",
  "bg": "",
  "Trash": "",
}
*/

tm.define("GameScene", {
  // アプリケーションセットアップ
  superClass: "Scene",

  // 初期化
  init: function(){
    this.superInit();
  },


});
