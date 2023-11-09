// 変数初期化
let untyped = '';
let typed = '';
let score = 0;


// 必要なhtmlを取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');


// 複数のテキストを格納する配列
const textLists =[
	'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

// ランダムなテキスト
const createText = () =>{
	// 正タイプした文字列クリア
	typed = '';
	typedfield.textContent = typed;

	// ランダムな数値を代入する。
	let random = (Math.floor(Math.random() * textLists.length));
	untyped = textLists[random];
	untypedfield.textContent = untyped;
};

// キー入力
const keyPress = e => {
	// 誤タイプ
	if(e.key !== untyped.substring(0, 1)) {
		wrap.classList.add('mistyped');
		// 100秒後背景色に戻す
		setTimeout(() => {
			wrap.classList.remove('mistyped');
   }, 100);

		return;
	};
	
	// 正タイプ
	score++;
  wrap.classList.remove('mistyped');
	typed += untyped.substring(0,1);
	untyped = untyped.substring(1);
	typedfield.textContent = typed;
	untypedfield.textContent = untyped;

	// テキストがなくなったら新しいの表示」
	if(untyped === '') {
		createText();
	}
};

// タイピングスキルの判定
const rankCheck = score => {
	// スコア値を返す
	// テキスト用格納
	let text = '';

	if(score < 100) {
		text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
	} else if(score < 200) {
		text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
	} else if(score < 300) {
		text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
	} else if(score >= 300) {
		text = `あなたのランクはSです。\nおめでとうございます!`;    
	}
	return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲーム終了
const gameOver = id => {
	clearInterval(id);
	const result = confirm(rankCheck(score));
	// OKボタンをクリックされたらリロードする
	if(result == true) {
		window.location.reload();
	};
};

// カウントタイマー
const timer = () => {
	// タイマー要素を取得する
	let time = count.textContent;

	const id = setInterval(() => {
		// カウントダウンする
		time--;
		count.textContent = time;
		// カウントがゼロになったら止める
		if(time <= 0) {
			gameOver(id);
		};
	}, 1000);
};

// スタート処理
start.addEventListener('click', () => {
	// カウントダウン開始
	timer();
  // ランダムなテキスト
	createText();
	// スタート非表示
	start.style.display = 'none';
	// キーボードイベント処理
	document.addEventListener('keypress', keyPress);
});
untypedfield.textContent = 'スタートボタンで開始';

