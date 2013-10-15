function getCt(){//コンテキスト取得
	var canvas = document.getElementById("canvas");
	return canvas.getContext("2d");//countext
}

function clearCanvas(){//キャンバス初期化
	var ct = getCt();
		ct.clearRect(0,0,400,400);
}

function label(){//「face」表示
	var ct = getCt();
		ct.font = "30pt Impact";
		ct.fillStyle = "white";
		ct.fillText("face", 300, 380);	
}

function place(x,y){//座標の表示
	var ct = getCt();
		ct.font = "10pt Impact";
		ct.fillStyle = "white";
		ct.fillText(x, 20, 20);
		ct.fillText(y, 50, 20);	
}

function face(){//顔の作成
	var ct = getCt();
		ct.strokeStyle = 'white';
		
		ct.beginPath(); //輪郭の作成
			ct.moveTo(250,200);
			ct.arc(200,200, 50, 0, Math.PI*2, false);
		ct.stroke();
		
		ct.beginPath(); //口の作成
			ct.moveTo(165,230);//口
			ct.lineTo(165,200);
			ct.lineTo(235,200);
			ct.lineTo(235,230);
			ct.lineTo(165,230);
			ct.lineTo(175,200);//歯
			ct.lineTo(185,230);
			ct.lineTo(195,200);
			ct.lineTo(205,230);
			ct.lineTo(215,200);
			ct.lineTo(225,230);
			ct.lineTo(235,200);
		ct.stroke();
		
		ct.beginPath();  //右目の作成
			ct.lineTo(199,180);
			ct.arc(180,180, 19, 0, Math.PI*2, false);
		ct.stroke();
		
		ct.beginPath();  //左目の作成
			ct.lineTo(239,180);
			ct.arc(220,180, 19, 0, Math.PI*2, false);
		ct.stroke();		
}

function eyes(x,y,r){//目の作成
	var ct = getCt();
		ct.beginPath();
		ct.fillStyle = "white";
			ct.moveTo(x,y);
			ct.arc(x,y,r, 0, Math.PI*2, false);
		ct.fill();
		
}

function shotEye(mx,my,exr,eyr,exl,eyl){//目が飛び出す処理
	var t;
	count = 1000;
	var callback = function(){
		count--;
		if (count > 0){
			clearCanvas();
			place(mx,my);
			face();
			label();
			var c = 1000-count
			eyes(exr+c*(exr-180),eyr+c*(eyr-180),10);
			eyes(exl+c*(exl-220),eyl+c*(eyl-180),10);
			t = setTimeout(callback, 0);
		}
	}
	t = setTimeout(callback, 0);
}

function mousePack(){//マウス処理
	mouseMoveInCanvas();
	mouseOutInCanvas();
	mouseClickInCanvas();

	function mouseMoveInCanvas(){
		var canvas = document.getElementById("canvas");
		canvas.onmousemove = function (e){
			var rect = e.target.getBoundingClientRect();
			var mx=e.pageX-rect.left;
			var my=e.pageY-rect.top;
			clearCanvas();
			place(mx,my);
			face();
			label();
			var exr=180+(mx-180)/20;
			var eyr=180+(my-180)/20;
			var exl=220+(mx-220)/20;
			var eyl=180+(my-180)/20;
			eyes(exr,eyr,10);
			eyes(exl,eyl,10);
			count=0;
		}
	}
	
	function mouseOutInCanvas(){
		var canvas = document.getElementById("canvas");
		canvas.onmouseout = function (e){
			clearCanvas();
			face();
			label();
			eyes(180,180,10);
			eyes(220,180,10);
			
			count=0;
		}
	}
	
	function mouseClickInCanvas(){
		var canvas = document.getElementById("canvas");
		canvas.onmousedown = function (e){
			var rect = e.target.getBoundingClientRect();
			var mx=e.pageX-rect.left;
			var my=e.pageY-rect.top;
			clearCanvas();
			place(mx,my);
			face();
			label();
			var exr=180+(mx-180)/20;
			var eyr=180+(my-180)/20;
			var exl=220+(mx-220)/20;
			var eyl=180+(my-180)/20;
			shotEye(mx,my,exr,eyr,exl,eyl);
		}
	}
	
}
