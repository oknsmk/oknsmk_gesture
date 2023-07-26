let gestures_results;

//お題のランダム表示に使う
let currentGestureIndex = 0;
// お題の漢字とジェスチャー名のマッピング
let gestureMapping = {
  "卯(う)": "uu",
  "午(うま)": "uma",
  "未(ひつじ)": "hitsuji",
  "戌(いぬ)": "inu1",
  "亥(い)": "ee"
};
//お題の漢字を配列に定義
let gestures = ["uu", "uma", "hitsuji", "inu1", "ee"];

// テキスト表示に使うお題の漢字
let currentGestureKanji;

// ゲームの状態を表す定数
const GAME_STATE_TITLE = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_GAMEOVER = 2;
const GAME_STATE_LAST = 3;

// ゲームのスコアと制限時間
let score = 0;
const gameTime = 60;
let timer;

// ゲームの状態
let gameState = GAME_STATE_TITLE;

//let sound_title;
/*let sound_playing;
let sound_gameover;
let sound_last;
let bgm_pinpon;*/

/*function preload(){
  sound_title = loadSound('./sound/title.mp3');
  sound_playing = loadSound('./sound/playing_fantasy15.mp3');
  sound_gameover = loadSound('./sound/gameover.mp3');
  sound_last = loadSound('./sound/last.mp3');
  bgm_pinpon = loadSound('./sound/Quiz-Correct_Answer01-1.mp3');
}*/


function setup() {
   //sound_title.setVolume(0.5);
  /*sound_playing.setVolume(0.5);
  sound_gameover.setVolume(0.5);
  sound_last.setVolume(0.5);
  bgm_pinpon.setVolume(0.3);*/


  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  gotGestures = function (results) {
    gestures_results = results;

    if (gestures_results && gestures_results.gestures && gestures_results.gestures.length > 0) {
      let score = gestures_results.gestures[0][0].score;
      let name = gestures_results.gestures[0][0].categoryName;
      console.log(name, score);
    }

    adjustCanvas();
}
  //初期化
  score = 0;
  currentGestureIndex = 0;
  currentGestureKanji = Object.keys(gestureMapping)[currentGestureIndex];
  //sound_title.loop();
}

function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる

  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
  /*if (gestures_results) {
    if (gestures_results.landmarks) {
      for (const landmarks of gestures_results.landmarks) {
        for (let landmark of landmarks) {
          noStroke();
          fill(100, 150, 210);
          circle(landmark.x * width, landmark.y * height, 10);
        }
      }
    }

    // ジェスチャーの結果を表示する
    for (let i = 0; i < gestures_results.gestures.length; i++) {
      noStroke();
      fill(255, 0, 0);
      textSize(20);
      let name = gestures_results.gestures[i][0].categoryName;
      let score = gestures_results.gestures[i][0].score;
      let right_or_left = gestures_results.handednesses[i][0].hand;
      let pos = {
        x: gestures_results.landmarks[i][0].x * width,
        y: gestures_results.landmarks[i][0].y * height,
      };
      textSize(48);
      fill(0);
      textAlign(CENTER, CENTER);
      text(name, pos.x, pos.y);:
    }

  }*/

  //画面の仕分け
  if (gameState === GAME_STATE_TITLE) {
    drawTitleScreen();
  } else if (gameState === GAME_STATE_PLAYING) {
    updateGame();
    drawGame();
  } else if (gameState === GAME_STATE_GAMEOVER) {
    drawGameOverScreen();
  }
  else if (gameState === GAME_STATE_LAST) {
    drawGameLastScreen();
  }
}

function drawTitleScreen() {
  fill(0)
  textAlign(CENTER);
  textSize(30);
  text("way to the NINJA", width / 2, height / 5);
  textSize(20);
  text("Press Space to Start", width / 2, height / 5 + 40);
}

function drawGameOverScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text("Game Over", width / 2, height / 2);
  textSize(20);
  //text("Score: " + score, width / 2, height / 2 + 40);
  text("Press Space to Restart", width / 2, height / 2 + 80);
}

function drawGameLastScreen() {
  fill(0)
  textAlign(CENTER);
  textSize(30);
  text("You are a good NINJA", width / 4, height / 50);
  textSize(20);
  text("Press Space to Start", width / 4, height / 50 + 40);
}

function updateGame() {
  // 制限時間の計測
  if (gameState === GAME_STATE_PLAYING) {
    if (frameCount % 60 === 0) {
      timer--;
    }
    if (timer === 0) {
      gameState = GAME_STATE_GAMEOVER;
    }
  }

  // ジェスチャーが認識された場合
  if (gestures_results && gestures_results.gestures && gestures_results.gestures.length > 0) {
    let detectedGesture = gestures_results.gestures[0][0].categoryName;

    // 正解のジェスチャーが認識された場合
    if (detectedGesture === gestures[currentGestureIndex]) {
      score++;
      currentGestureIndex++;

      // すべてのお題をクリアした場合
      if (currentGestureIndex >= gestures.length) {
        gameState = GAME_STATE_LAST;
      }

        // 新しいお題の漢字をcurrentGestureKanjiに代入
        currentGestureKanji = Object.keys(gestureMapping)[currentGestureIndex];
      
    }
  }
}

function drawGame() {
  // スコアの表示
  //textAlign(RIGHT);
  //textSize(20);
  //text("Score: " + score, width - 20, 30);
  // 残り時間の表示
  textAlign(RIGHT);
  textSize(20);
  text("Time: " + timer, width - 20, 60);

  //ゲームの中身
 
    // ジェスチャーのお題を表示
    fill(0);
    textAlign(CENTER);
    textSize(20);
    text("「" + currentGestureKanji + "」のポーズをしよう！", width / 2, height / 2);
  
    // お題に対応する画像を表示
  let img;
  switch (gestures[currentGestureIndex]) {
    case "uu":
      img = loadImage("../img/uu.jpeg");
      break;
    case "uma":
      img = loadImage("../img/uma.jpeg");
      break;
    case "hitsuji":
      img = loadImage("../img/hitsuji.jpeg");
      break;
    case "inu1":
      img = loadImage("../img/inu.jpeg");
      break;
    case "ee":
      img = loadImage("../img/ee.jpeg");
      break;
    default:
      // ジェスチャーが不明の場合はデフォルトの画像を表示
      img = loadImage("default.jpeg");
      break;
  }
  if (img) {
    image(img, width - img.width, 0);
  }
  }

function keyPressed() {
  // ゲームオーバーの時とラスト画面の時にスペースキーを押したらゲームをリスタートする
  if ((gameState === GAME_STATE_GAMEOVER || gameState === GAME_STATE_LAST) && key === ' ') {
    startGame();
  } else if (gameState === GAME_STATE_TITLE && key === ' ') {
    // ゲームがタイトル画面ならゲームを開始する
    startGame();
  }
}

function startGame() {
  // 初期化
  score = 0;
  gameState = GAME_STATE_PLAYING;
  timer = gameTime;
  currentGestureIndex = 0;
  currentGestureName = gestures[currentGestureIndex];
  currentGestureKanji = Object.keys(gestureMapping)[currentGestureIndex];
}

function titleGame() {
  gameState = GAME_STATE_TITLE;
}

function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  // Get an element by its ID
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
  //console.log(element_webcam.clientWidth);
}