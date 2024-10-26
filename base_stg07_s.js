//背景のスクロール（縦）
//自機の移動（マウス）
//味方の機体の弾を発射する。
//操作方法の切り替え
//タイムボタン
//敵機の移動、ランダムに発射
var tmr = 0;
t = 0;

function setup(){
		//canvasSize(1200,720);
		canvasSize(720,1200);
		setFPS(30);
		loadImg(0,"image/BG07.png");
		loadImg(1,"image/spaceshipS03.png");//02
		loadImg(2,"image/tama06.png");//03
		loadImg(5,"image/nezumi02.png");
		loadImg(3,"image/damage04.png");
		loadImg(6,"image/nezumi07.png");
		loadImg(7,"image/nezumi07.png");
		loadImg(8,"image/weak03.png");
		loadImg(9,"image/tate01.png");
		initSShip();//02
		initMissile();//04
		loadSound(0,"sound/tyutyu01.mp3");
		loadSound(1,"sound/guard02.mp3");
		}
var stp = 0;//ストップするか否か
var nanido = 0;
function mainloop(){//タイトル画面、ゲーム中、ゲームオーバー
	drawBG(1);
	if(key[84] == 1 && (idx == 1 || idx == 2)){//T
		key[84]++;
		stp = 1 - stp;
		if( stp == 1 ){
			idx = 2;
		}
		else{
			idx = 1;
		}
	}
	
	
	
	if( stp == 0 ){
		tmr++;
	}
	t = int(tmr / 30);//30フレームに一回カウント
	//fill("silver");
	//fRect( 50, 0, 700, 1100, "navy" );
	
	//fText("☆ " + t, 600, 40, 50, "white" );//t or tmr 表示
	
	switch(idx){
		case 0://ゲーム開始時
			
			initSShip();
			initEA();
			initEffect();
			initMissile();
			//idx = 2;
			
			nezumiAp();
			score = 0;
			//stp = 0;//タイプボタン二回押さないといけないから1にしておく。
			//start_gamen = true;
			if(key[32] == 1){//SPACE
				//tapC = 0;
				key[32]++;
				idx = 1;
			}
			//s_タップ操作対応のためコメントアウト
			//ケース2にも同じコードがある。
			//マウス操作かキーボード操作かを切り替える。
			/*if( key[83] == 1 ){//S
				 key[83]++;
				 chgC = 1 - chgC;
				if( chgCF ){
				 	chgCF = false;
				 }
				 else{
				 	chgCF = true;
				 }
	 		}
			if( !chgC ){
	 			fText("[S]Mouse", 360, 600, 50, "blue" );
	 		}
			 else{
			 	fText("[S]KeyBoard", 360,600,50,"red");
			 }*/
			 //s_Aだけでなく枠内をタップしても変わるようにする。
			/*if(key[65] == 1){
				key[65]++;
				automa = 1 - automa;
			}*/
			if(key[65] == 1 ){
				key[65]++;
				automa = 1 - automa;
			}
			if( tapC > 0 ){
				if(tapX > 210 && tapX < 510 && tapY > 635 && tapY < 690){
					tapC = 0;
					automa = 1 - automa;
				}
				
				if(tapX > 160 && tapX < 560 && tapY > 755 && tapY < 810 ){
					tapC = 0;
					//fRect(360-(25*8),780-25,50+(25*14),50+5,"blue");
					idx = 1;
				}
				//fRect(360-(180),720-25,50+320,55,"blue");
				if(tapX > 180 && tapX < 360 && tapY > 695 && tapY < 750){
					tapC = 0;
					nanido = (nanido + 1) % 3;
				}
			}
			if( automa == 0 ){
				//fRect(360-(25*6),660-25,50+(25*10),50+5,"blue");
				fText("[A]uto OFF", 360, 660, 50, "white" );
			}
			else if(automa == 1){
				
				fText("[A]uto ON", 360, 660, 50, "white" );
			}
			if(key[68] == 1){
				key[68]++;
				nanido = (nanido + 1) % 3;
			}
			//fRect(360-(180),720-25,50+320,55,"blue");
			if(nanido % 3 == 0){
				fText("[D]VERY EASY",360,720,50,"white");
			}
			else if( nanido % 3 == 1){
				fText("[D]EASY",360,720,50,"white");
			}
			else if(nanido % 3 == 2){
				fText("[D]NOMAL",360,720,50,"white");
			}
			//if(start_gamen) fText("ラットバスター",360,200,100,"white");
			fText("ラットバスター",360,200,100,"white");
			//fText("Click or Space START",360,720,50,"white");
			
			
			fRect(360-(25*8),780-25,50+(25*14),50+5,"blue");
			fText("[Space] START",360,780,50,"white");
			break;
		case 1://ゲーム中
	        setEnemy();
	        setItem();
	        moveSShip();
	        moveMissile();
	        moveObject();
	        switch(allnstate){
	        	case 0:
	        		inoutMove();
	        		break;
	        //突進をランダムにする
	        //EA();
	        	case 1:
	        		//画面外移動
	        		//allnstate = 2;
	        		outMove();
	        		break;
	        	case 2:
	        		//攻撃中
	        		enemyAttack01();
	        		break;
	        	case 3:
	        		//画面内移動
	        		//allnstate = 4;
	        		inMove();
	        		break;
	        	case 4:
	        		//待機
	        		if(tmr - waitTime > 60){
	        		  allnstate = 1;
	        		}
	        		break;
	        }
	        //nezumiMove();
	        for(i=0; i<E_MAX; i++) fRect(410+i*30, 1140, 20, 40, "#c00000");
			for(i=0; i<energy; i++) fRect(410+i*30, 1140, 20, 40, colorRGB(50-5*i, 240-12*i, 100+12*i));
	        fText("SCORE " + score, 200, 1165, 50, "white" );
	        drawEffect();
	        break;
		case 2://タイムボタン
			//マウス操作かキーボード操作かを切り替える。
			if( key[83] == 1 ){//S
				 key[83]++;
				 chgC = 1 - chgC;
				if( chgCF ){
				 	chgCF = false;
				 }
				 else{
				 	chgCF = true;
				 }
	 		}
			if( !chgC ){
	 			fText("[S]Mouse", 360, 600, 50, "blue" );
	 		}
			 else{
			 	fText("[S]KeyBoard", 360,600,50,"red");
			 }
			if(key[65] == 1){
				key[65]++;
				automa = 1 - automa;
			}
			if( automa == 0 ){
				fText("[A]uto OFF", 360, 660, 50, "white" );
			}
			else if(automa == 1){
				fText("[A]uto ON", 360, 660, 50, "white" );
			}
			//if(start_gamen) fText("ラットバスター",360,200,100,"white");
			break;
		case 3: //クリア
			fText("CLEAR",360,500,100,"white");
			if( t >= 2 ){
				
				//fText("Click or Space RESTART",360,720,50,"white");
				fText("[Space] RESTART",360,720,50,"white");
				if( key[32] == 1 || tapC > 0){
					key[32]++;
					tapC = 0;
					idx = 0;
					tmr = 0;
				}
			}
			break;
		case 4: //ゲームオーバー
			fText("GAME OVER",360,500,100,"red");
			//fText("Click or Space RESTART",360,720,50,"white");
			if( t >= 2 ){
				fText("[Space] RESTART",360,720,50,"white");
				if( key[32] == 1 || tapC > 0){
					key[32]++;
					tapC = 0;
					idx = 0;
					tmr = 0;
				}
			}
			break;
	}
}
//var bgX = 0;
var bgY = 0;
function drawBG(spd) {//背景のスクロール
/*bgX = (bgX + spd)%1200;
drawImg(0,-bgX,0);
drawImg(0,1200-bgX,0);*/

bgY = (bgY + spd)%1200;
drawImg(0,0,bgY);
drawImg(0,0,-1200+bgY);
}
var idx = 0;
var ssX = 0;//02
var ssY = 0;//02
var ssSP = 20;
var energy = 0;
var E_MAX = 8;
var muteki = 0;
var automa = 0;//04-2
function initSShip() {//自機の初期値代入
	ssX = 360;//02
	ssY = 800;//02
	//タップした位置の初期値を代入すると、他のタップが出来ないのを防ぐためにコメントアウト。
	//tapX = 360;
	//tapY = 900;
	energy = 8;
	muteki = 0;
}
var mc = 0;
var mcF = false;
var stpmc = 0;
var svmMAX = 30;
var svmX = new Array(svmMAX);//save mouseX
var svmY = new Array(svmMAX);//save mouseY
var svmNum = 0;
var chgC = 0;
var chgCF = false;
var tpF = false;
function moveSShip() {//自機の移動、オート射撃、武器のセット、タップ操作
	//キーを押し続けるとどうなるか？
	//fText( key[32], 100, 40, 50, "white" );
	//65~90がA~Z,スペースが32
	//←↑→↓の順に37,38,39,40
	//Enter 13, ESC 27, Shift 16, Ctrl 17 
	//数字キー 0~9の順に 48~57
	
	if( tapC == 0 ){
		tpF = false;//押しっぱなしで連射されないように
	}
	//s_タップで弾が発射されないようにコメントアウト
	/*if( (automa == 0 && key[32] == 1) || (automa == 0 && tapC > 0 && tpF == false)){
		//s_弾の発射だけでなく、移動もタップなので、0にすると移動しなくなるのを防ぐ。
		//tapC = 0;
		tpF = true;//押しっぱなしで連射されないように
	
		key[32]++;
		setMissile(ssX,ssY-40,0,-30);//03
	}*/
	//s_スペースで弾を発射
	if(automa == 0 && key[32] == 1){
		
		//tpF = true;//押しっぱなしで連射されないように
	
		key[32]++;
		setMissile(ssX,ssY-40,0,-30);//03
	}
	if(automa == 1 && tmr%8 == 0){
		setMissile( ssX, ssY-40, 0, -30 );
		//setWeapon();
	}
	
	//何フレーム目に初めてここを通るか調べて、何フレームかを表示
	//最初のタップの座標の表示
	mc++;
	if(mc == 1){
		mcF = true;
		stpmc = tmr;
	}
	if(mcF){
	 //fText(stpmc,100,90,50,"white");
	 //fText(tapX,100,140,50,"white");
	 //fText(tapY,100,190,50,"white");
	 }
	 //最初の30フレームのマウスに近づく動作を調べるために、
	 //30フレーム分、座標を表示するようにした。
	/*if( svmNum < svmMAX ){
		svmX[svmNum] = ssX;
		svmY[svmNum] = ssY;
		
		svmNum++;
	}
	else{
		for( var i = 0; i < svmMAX; i++ ){
		fText( "X= " + svmX[i] + " Y= " + svmY[i], 200, 240 + (i*30),30,"white");
		}
	}*/
	
	
	 //chgCが1であれば、キーボード操作、0、であればマウス操作
	 //スマホに対応させるためにコメントアウト
	/*if( chgC == 1 ){
		if( key[37] > 0 && ssX > 30 ) ssX -= ssSP;
		if( key[38] > 0 && ssY > 30) ssY -= ssSP;
		if( key[39] > 0 && ssX < 690) ssX += ssSP;
		if( key[40] > 0 && ssY < 1170) ssY += ssSP;
	}*/
	//09タップした位置に自機を近づける。
	//タップしてなくて、マウスカーソルの位置に移動する。
	
	/*if( chgC == 0 ){
		ssX = ssX + int((tapX-ssX)/6);
		ssY = ssY + int((tapY-ssY)/6);
	}*/
	//スマホ操作に対応させる。
	var col = "black";
	fRect(10,25,160,60,"blue");
	if(automa == 1) col = "white";
	fText("[Auto]",90,50,50,col);
	
	if( key[37] > 0 && ssX > 30 ) ssX -= ssSP;
	if( key[38] > 0 && ssY > 30) ssY -= ssSP;
	if( key[39] > 0 && ssX < 690) ssX += ssSP;
	if( key[40] > 0 && ssY < 1170) ssY += ssSP;
	if(tapC > 0){
		if( tapX > 10 && tapX < 170 && tapY > 25 && tapY < 85){
			tapC = 0;
			automa = 1 - automa;
		}
		else{
			ssX = ssX + int((tapX-ssX)/6);
			ssY = ssY + int((tapY-ssY)/6);
		}
	}
	//スマホ操作に対応させる。
	if(muteki%2 == 0) drawImgC(1,ssX,ssY);//02
	if(muteki > 0 ) muteki--;

}
function setWeapon() {//複数の弾を同時に出せるようにセット

}
//04 複数の弾
var MSL_MAX = 100;
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslImg = new Array(MSL_MAX);//08
var mslNum = 0;
var laser = 0;
function initMissile() {//ミサイルの初期化
	for(var i=0; i<MSL_MAX; i++) mslF[i] = false;
	mslNum = 0;
}
function setMissile(x, y, xp, yp) {//ミサイルに座標と、変化量をセット、レーザー
	//04
	mslX[mslNum] = x;
	mslY[mslNum] = y;
	mslXp[mslNum] = xp;
	mslYp[mslNum] = yp;
	mslF[mslNum] = true;
	mslImg[mslNum] = 2;//08
	if(laser > 0){//08
		laser--;
		mslImg[mslNum] = 12;
	}
	mslNum = (mslNum+1)%MSL_MAX;
}
function moveMissile() {//ミサイルの移動、表示、枠外に出たら消す。
//03
	/*if( mslF == true ){
		mslX = mslX + mslXp;
		mslY = mslY + mslYp;
		drawImgC(mslImg,mslX,mslY);
		if( mslY < 0 )mslF = false;
	}*/ //03
	//04
	for(var i = 0; i<MSL_MAX; i++){
		if(mslF[i] == true){
			mslX[i] = mslX[i] + mslXp[i];
			mslY[i] = mslY[i] + mslYp[i];
			//drawImgC( 2, mslX[i], mslY[i] );//04
			drawImgC( mslImg[i], mslX[i], mslY[i] );
			if(mslY[i] < 0 ) mslF[i] = false;
		}
	}


}
function initObject() {//敵機の初期化

}
var OBJ_MAX = 14;
var objX = new Array(OBJ_MAX);
var objY = new Array(OBJ_MAX);
var objXp = new Array(OBJ_MAX);
var objYp = new Array(OBJ_MAX);
var objF = new Array(OBJ_MAX);
var objNum = 0;
var objType = new Array(OBJ_MAX);//0=敵の弾,1=敵機,2=アイテム
var objImg = new Array(OBJ_MAX);
var objLife = new Array(OBJ_MAX);
function setObject(typ, png, x, y, xp, yp, lif) {//敵にタイプ、画像番号、座標、移動速度、ライフ、出現
	objX[objNum] = x;
	objY[objNum] = y;
	objXp[objNum] = xp;
	objYp[objNum] = yp;
	objF[objNum] = true;
	objType[objNum] = typ;
	objImg[objNum] = png;
	objLife[objNum] = lif;
	objNum = (objNum+1)%OBJ_MAX;
}
function nezumiAp(){//ねずみ出現
	var nlife;
	if(nanido % 3 == 0){
		nlife = 10;
	}
	else if(nanido % 3 == 1){
		nlife = 15;
	}
	else if(nanido % 3 == 2){
		nlife = 20;
	}
	for(var i = 0; i < gsnMAX; i++){
		//setObject(1,5,60+(i*100),250,20,20,50);
		
			if(i % 2 == 0){
				setObject(1,6,60+(int(i/2)*100),-50,0,0,nlife);//ここのライフを変えるだけでいい。
			}
			else if(i % 2 == 1){
				setObject(1,7,60+(int(i/2)*100),-150,0,0,nlife);
			}
		
		
		
	}
}
function nezumiMove(){
	for(var i = 0;i < gsnMAX;i++){
		drawImgC(objImg[i],objX[i],objY[i]);
	}
}
var attack;
var gsnMAX = 14;
//var tossin = new Array(gsnMAX);//ねずみが突進してくる。
var gosignF = new Array(gsnMAX);
var taiki = new Array(gsnMAX);
var weakP = new Array(gsnMAX);//ウィークポイント、ランダムに2体だけ当たるようにする。
var nstate = new Array(gsnMAX);//状態0が(登場）、1が待機（無敵）、2が待機（weak),3,4がスピード入力,5が突撃中（無敵）、6が突撃（weak）、7が待機（突撃終了）
var nebari = new Array(gsnMAX);//何発か当てないと消えない。
var waitTime;
var allnstate;//0が登場,4が待機,1が画面外に移動,2が攻撃中,3が画面内に移動,4が待機
var ready01;
function initEA(){
	for(var i = 0; i < gsnMAX; i++){
		gosignF[i] = false;
		taiki[i] = false; 
		//tossin[i] = 0;
		weakP[i] = false;
		nstate[i] = 0;
	 }
	 ready01 = false;
	 allnstate = 0;
	 waitTime = 0;
}

function EA(){
	if( tmr % 1 == 0 ){
		if( attack == 0 ){
			//attack = 1 + rnd(3);
			attack = 1;
		}
		//attack = 1 + rnd(3);
	}
	if( attack == 1 ){
		enemyAttack01();
		//fText("突進",300,500,50,"white");
	}
	else if( attack == 2 ){
		fText("かみつき",300,500,50,"white");
		attack = 0;
	}
	else if( attack == 3 ){
		fText("ラットボール",300,500,50,"white");
		attack = 0;
	}
	else if( attack == 4 ){
		fText("必殺技",300,500,50,"white");
		attack = 0;
	}
	else{
		//fText("考え中",300,500,50,"white");
		attack = 0;
	}
}
function inoutMove(){
	var ok = 0;
	for(var i = 0;i < gsnMAX;i++){
		if(nstate[i] == 0){
			if(i % 2 == 0){
				objY[i] += 5;
				if(objY[i] > 250){
					objY[i] = 250;
					nstate[i] = 1;
				}
			}
			else if(i % 2 == 1){
				objY[i] += 5;
				if(objY[i] > 150){
					objY[i] = 150;
					nstate[i] = 1;
				}
			}
		
		}
		else if(nstate[i] == 1) ok++;
	}
	if(ok == gsnMAX) allnstate = 4; waitTime = tmr;//待機するための準備
}
function outMove(){
	var ok = 0;
	for(var i = 0;i < gsnMAX;i++){
		if(nstate[i] == 1){
			if(i % 2 == 0){
				objY[i] -= 15;
				if(objY[i] < -50){
					objY[i] = -50;
					//nstate[i] = 1;
					ok++;
				}
			}
			else if(i % 2 == 1){
				objY[i] -= 15;
				if(objY[i] < -150){
					objY[i] = -150;
					//nstate[i] = 1;
					ok++;
				}
			}
		
		}
		//else if(nstate[i] == 1) ok++;
	}
	if(ok == gsnMAX) allnstate = 2; 
}
function inMove(){
	var ok = 0;
	for(var i = 0;i < gsnMAX;i++){
		if(nstate[i] == 1){
			if(i % 2 == 0){
				objY[i] += 15;
				if(objY[i] > 250){
					objY[i] = 250;
					//nstate[i] = 1;
					ok++;
				}
			}
			else if(i % 2 == 1){
				objY[i] += 15;
				if(objY[i] > 150){
					objY[i] = 150;
					//nstate[i] = 1;
					ok++;
				}
			}
		
		}
		//else if(nstate[i] == 1) ok++;
	}
	if(ok == gsnMAX) allnstate = 4; waitTime = tmr;//待機するための準備
}
var ent = "入ってない";
var entN = 0;
function enemyAttack01(){
	//突進をランダムにする
    var gosign = false;//ゴーサインになってない敵機があれば
    var ggn = false;//すべてが真なら
    var gosignAll = 0;
    var tn = 0;//計測用
    
    if(tmr % 20 == 0 ){
    	
		for(var i = 0;i < gsnMAX;i++){
			/*if(gosignF[i] == false){
				gosignAll++;
			}*/
			if(nstate[i] == 1){
				gosignAll++;
			}
		}
        //nstate[]がすべて1ならば,ねばりとウィークを設定
        if(gosignAll == gsnMAX ){
        	for(var i = 0;i < gsnMAX;i++){
        		//weakP[i] = false;
        		if(nanido % 3 == 0){
					nebari[i] = 1;
    			}
    			else if(nanido % 3 == 1){
    				nebari[i] = 2;
    			}
    			else if(nanido % 3 == 2){
    				nebari[i] = 3;
    			}
        	}
        	var k = 0;
        	while( k < 5 ){
        		var w = rnd(gsnMAX);
        		/*if( weakP[w] == false){
        			weakP[w] = true;
        			k++;
        			//ent = "入った";
        			
        		}*/
        		if(nstate[w] == 1){
        			nstate[w] = 2;
        			
        			k++;
        		}
        	}
        }
        
        //fText(ent+" "+entN,360,500,100,"white");
        //entN = 0;
        /*for(var i = 0;i < gsnMAX;i++){
        	if(weakP[i] == true){
        		fText(i+" true", 500, 600+(i*30),30,"white");
        	}
        	else if(weakP[i] == false){
        		fText(i+" false", 500, 600+(i*30),30,"white");
        	}
        }*/
        ;
        var gg = 0;//ゴーサインの真の数
    	for(var i = 0; i < gsnMAX; i++){
    		//if(gosignF[i] == true) gg++;
    		if(nstate[i] == 3 || nstate[i] == 4 || nstate[i] == 5) gg++;
    	}
    	if( gg == gsnMAX ) ggn = true;
        while(gosign == false && ggn == false ){//全員ゴーサインが出ているなら飛ばす。
        	var j = rnd(gsnMAX);
        	
        	/*if( gosignF[j] == false ){
        		gosignF[j] = true;
        		gosign = true;
        	}
        	*/
        	//状態が1か2なら1を3に2を4にする。
    		if(nstate[j] == 1 || nstate[j] == 2){
    			
				if(nanido % 3 == 0){
    				var k = rnd(3);
    				if( nstate[j] == 1 ){
    					objYp[j] = 20;
    					nstate[j] = 3;
    				}
    				else if(nstate[j] == 2){
    					if( k >= 1 ){
    						objYp[j] = 10;
    						nstate[j] = 4;
    					}
    					else{
    						objYp[j] = 10;
    						nstate[j] = 4;
    					}
    				}
    			}
    			else if(nanido % 3 == 1){
    				var k = rnd(3);
    				if( nstate[j] == 1 ){
    					objYp[j] = 30;
    					nstate[j] = 3;
    				}
    				else if(nstate[j] == 2){
    					if( k >= 1 ){
    						objYp[j] = 10;
    						nstate[j] = 4;
    					}
    					else{
    						objYp[j] = 10;
    						nstate[j] = 4;
    					}
    				}
    			}
    			else if(nanido % 3 == 2){
    				var k = rnd(3);
    				if( nstate[j] == 1 ){
    					objYp[j] = 30;
    					nstate[j] = 3;
    				}
    				else if(nstate[j] == 2){
    					if( k >= 1 ){
    						objYp[j] = 10;
    						nstate[j] = 4;
    					}
    					else{
    						objYp[j] = 20;
    						nstate[j] = 4;
    					}
    				}
    			}
    			gosign = true;
    		}
        }
    }
    
    //fText(tn,360,400,40,"white");
	for(var i = 0;i < gsnMAX;i++){
		if( objY[i] < 1100 ){
			//drawImgC(5,objX[i],objY[i]);//moveObjectに移動
			//if( gosignF[i] == true && tmr % 1 == 0 && taiki[i] == false) objY[i] += 20;
			//if((nstate[i] == 3 || nstate[i] == 4) && tmr % 1 == 0) objY[i] += 20;
			
		}
		else{
			//外に出たら、元の位置に戻り、待機
			if(objImg[i] == 6) objY[i] = -50;
			if(objImg[i] == 7) objY[i] = -150;
			//taiki[i] = true;
			nstate[i] = 5;
			objXp[i] = 0;
			objYp[i] = 0;
			if(nanido % 3 == 0){
				nebari[i] = 1;
			}
			else if(nanido % 3 == 1){
				nebari[i] = 2;
			}
			else if(nanido % 3 == 2){
				nebari[i] = 3;
			}
			
		}
	}
	var taikiAll = 0;
    for(var i = 0;i < gsnMAX;i++){
    	
    	if(nstate[i] == 5){
    		taikiAll++;
    	}
    }
    //全員待機状態ならば
	if( taikiAll == gsnMAX ){
    	//fText("ok",300,600,50,"white");
    	for(var i = 0;i < gsnMAX;i++){
        	nstate[i] = 1;
    	 }
    	 attack = 0;
    	 allnstate = 3;
    	 //waitTime = tmr;
    }
    //fText(taikiAll, 200,400,40,"white");
    //for(var k = 0;k < OBJ_MAX; k++) fText(nstate[k],360,400+(k*40),40,"white");
	//fText("ok",300,500,50,"white");
    
}
var score = 0;
function moveObject() {//敵の動き、自機が撃った弾とヒットチェック、敵の弾と敵機とのヒットチェック
						//エネルギー0でゲームオーバー、アイテム、画面外に出たら消す
//for(var k = 0;k < OBJ_MAX; k++) fText(nstate[k],360,400+(k*40),40,"white");
	for(var i = 0;i < OBJ_MAX; i++){
		if( objF[i] == true ){
			objX[i] = objX[i] + objXp[i];
			objY[i] = objY[i] + objYp[i];
			if( objY[i] < 1100 ){
        			drawImgC(objImg[i],objX[i],objY[i]);
        			/*if(gosignF[i] == true && taiki[i] == false){
        				drawImgC(8,objX[i],objY[i]);
        			}*/
        			/*if(gosignF[i] == true && taiki[i] == false && weakP[i] == true){
        				drawImgC(8,objX[i],objY[i]);
        			}*/
        			if(nstate[i] == 4) drawImgC(8,objX[i],objY[i]);
        			
        	}
			if(objType[i] == 1){
					var r = 12 + (img[objImg[i]].width+img[objImg[i]].height)/4;//ヒットチェックの径
					for(var n=0; n<MSL_MAX; n++){
						if(mslF[n] == true){
							//if(getDis(objX[i], objY[i], mslX[n], mslY[n] < r ){ //カッコつけ忘れ
							if(getDis(objX[i], objY[i], mslX[n], mslY[n]) < r ){
								mslF[n] = false;//07ミサイルの貫通を無くす。
								//if(mslImg[n] == 2) mslF = false;//08 通常弾とレーザーの違い
								//if(gosignF[i] == true && taiki[i] == false && weakP[i] == true){
								if(nstate[i] == 4){
									//07 当たっていたら、オブジェクトのライフを減らして、ライフが0の場合とそうでない場合に分ける。
									
									nebari[i]--;
									playSE(0);
									//drawImgC(3,objX[i],objY[i]);
									setEffect(3,objX[i],objY[i],5);
									if(nebari[i] <= 0 ){
									objLife[0]--;
									score = score + 1000;
									nstate[i] = 5;
									if(objImg[i] == 6) objY[i] = -50;
        							if(objImg[i] == 7) objY[i] = -150;
        							objXp[i] = 0;
        							objYp[i] = 0;
        							}
								}
								else{
									playSE(1);
									setEffect(9,objX[i],objY[i],5);
								}
								if(objLife[0] == 0){
									for(var m = 0; m < OBJ_MAX; m++){
										objF[m] = false;
									
									}
									idx = 3;
									tmr = 0;
								}
							}
						}
					}
			}
			//自機と敵機と敵の弾とアイテムのヒットチェック
			//var r = 30+(img[objImg[i]].width+img[objImg[i]].height)/4;
			var r = 30+50;
			if(getDis(objX[i], objY[i], ssX, ssY) < r){
				if( objType[i] <= 1 && muteki == 0 ){
					//objF[i] = false;//ぶつかっても消えないので、コメントアウト
					//setEffect(objX[i], objY[i], 9);//010
					energy--;
					muteki = 30;
					//010
					if(energy == 0){//エネルギー0でゲームオーバへ
						idx = 4;
						//tsave = tmr;
						tmr = 0;
					}
				}
			}
		}
	}
}

//06_3
var EFCT_MAX = 100;
var efctX = new Array(EFCT_MAX);
var efctY = new Array(EFCT_MAX);
var efctN = new Array(EFCT_MAX);
var efctImg = new Array(EFCT_MAX);
var efctNum = 0;
function initEffect() {//エフェクトの初期化
	for(var i=0; i<EFCT_MAX; i++) efctN[i] = 0;
	efctNum = 0;
}
function setEffect(png, x, y, n) {//エフェクトに座標と、画像の何番目かをセット
	efctX[efctNum] = x;
	efctY[efctNum] = y;
	efctN[efctNum] = n;
	efctImg[efctNum] = png;
	efctNum = (efctNum+1)%EFCT_MAX;
}
function drawEffect() {//エフェクトの表示
	for(var i=0; i<EFCT_MAX; i++){
		if(efctN[i] > 0){
			if(efctImg[i] == 3){
				drawImgTS(3, (5-efctN[i])*100, 0, 100, 200, efctX[i]-50, efctY[i]-100, 100, 200);
			}
			if(efctImg[i] == 9){
				drawImgC(9,efctX[i],efctY[i]);
			}
			efctN[i]--;
		}
	}

}
function setEnemy() {//敵機をセットする、経過秒数（フレームごとではなく、1秒ごと）


}
function setItem() {//アイテムをセットする。（敵と同じセットオブジェクト関数を使う）

}