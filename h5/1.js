




	// function myFunction3(){
	// 	console.log("下，按下")
	// 	keysDown[40] = true
	// }

	// function myFunction4(){
	// 	console.log("下，松开")
	// 	delete keysDown[40];
	// }

	// function myFunction5(){
	// 	console.log("左，按下")
	// 	keysDown[37] = true
	// }

	// function myFunction6(){
	// 	console.log("左，松开")
	// 	delete keysDown[37];
	// }

	// function myFunction7(){
	// 	console.log("右，按下")
	// 	keysDown[39] = true
	// }

	// function myFunction8(){
	// 	console.log("右，松开")
	// 	delete keysDown[39];
	// }

	// function myFunction9(){
	// 	console.log("发射，按下")
	// }

	// function myFunction10(){
	// 	console.log("发射，松开")
	// 	zd_zb.push([yuan.x,yuan.y])
	// }


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 400	;
canvas.height = 600;
canvas.style="border:5px solid #000000;";
var val=0
var r_max=200
var keysDown = {};


function getLocation(x, y) {

	var bbox = canvas.getBoundingClientRect();

	return {

		x: (x - bbox.left) * (canvas.width / bbox.width),

		y: (y - bbox.top) * (canvas.height / bbox.height)
	};

}
tx=canvas.width/3
ty=canvas.height/3

function myFunction1(event,xx=10){
	console.log("按下")
	var location = getLocation(event.clientX, event.clientY);

	console.log("x=" + location.x + " ,y=" + location.y)

	var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
　　startPos = {x:touch.pageX,y:touch.pageY}; //取第一个touch的坐标值
	console.log(startPos)

	x= startPos.x
	y= startPos.y
	if(x>tx && x<2*tx && y<ty){
		console.log("上按下")
		keysDown[38] = true
		//yuan.y -= xx;

	}
	if(x>tx && x<2*tx && y>2*ty){
		console.log("下按下")
		keysDown[40] = true
		//yuan.y += xx;

	}
	if(y>ty && y<2*ty && x<1*tx){
		console.log("左按下")
		keysDown[37] = true
		//yuan.x -=xx;

	}
	if(y>ty && y<2*ty && x>2*tx){
		console.log("右按下")
		keysDown[39] = true
		//yuan.x +=xx;

	}
	// if(x>tx && x<2*tx && y>ty && y<2*ty){
	// 	console.log("开火")

	// }








}

function myFunction2(event){
	// console.log("按下")
	var location = getLocation(event.clientX, event.clientY);
	console.log("x=" + location.x + " ,y=" + location.y)
	console.log(event.targetTouches)
	console.log(event)

	var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
　　//startPos = {x:touch.pageX,y:touch.pageY}; //取第一个touch的坐标值
	console.log(touch)

	x= startPos.x
	y= startPos.y
	console.log("松开")
		if(x>tx && x<2*tx && y>ty && y<2*ty){
		console.log("开火")
		zd_zb.push([yuan.x,yuan.y])
		// delete keysDown[37];//左
		// delete keysDown[38];//上
		// delete keysDown[39];//右
		// delete keysDown[40];//下
	}
	for(var key in keysDown){
		delete keysDown[key];
	}



	// delete keysDown[38];
}








var zd_zb=[]

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;

	
	// console.log(keysDown)
	// console.log(Object.keys(keysDown).length==0)
}, false);

addEventListener("keyup", function (e) {
	if (e.keyCode==32){
		zd_zb.push([yuan.x,yuan.y])
	}


	delete keysDown[e.keyCode];
	// console.log(keysDown)
	// console.log(Object.keys(keysDown).length==0)//没按下
}, false);


var yuan= {
	x :canvas.width / 2,
	y : canvas.height / 2,
	r:12
};

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
       		break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        	break; 
        default: 
            return 0; 
            break; 
    } 
} 

var sw={
	x:randomNum(0,canvas.width),
	y:randomNum(0,canvas.height),
	zb:[]
}
for(var i=0;i<20;i++){
	sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])

	}


var update = function (xx=10) {

	if (38 in keysDown) { //  up
		yuan.y -= xx;
	}
	if (40 in keysDown) { // down
		yuan.y += xx;
	}
	if (37 in keysDown) { //  left
		yuan.x -=xx;
	}
	if (39 in keysDown) { // right
		yuan.x += xx;
	}
	if (32 in keysDown) { //  发射子弹
		// yuan.y -= xx;
		//自动
		 //zd_zb.push([yuan.x,yuan.y])//注释掉这段即可关闭全自动模式
		//break
	}

		
		// console.log(zd_zb)
	
	if(yuan.x>canvas.width){
		yuan.x=canvas.width
	}
	if(yuan.x<0){
		yuan.x=0
	}
	if(yuan.y>canvas.height){
		yuan.y=canvas.height
	}
	if(yuan.y<0){
		yuan.y=0
	}
	if(Object.keys(keysDown).length==0){
		//自动

	}

for (var o = 0; o < sw.zb.length; o++) {
				sw_x=sw.zb[o][0]
				sw_y=sw.zb[o][1]
				sw.zb[o][1]+=1
				if(sw.zb[o][1]>canvas.height){
						sw.zb.splice(o,1)
						sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])
						continue
				}
	 var z = Math.abs(((sw_x-yuan.x)**2+(sw_y-yuan.y)**2)**0.5)-yuan.r

	if (z<10){
		 // sw={
			// x:randomNum(0,canvas.width),
			// y:randomNum(0,canvas.height),
			// 	}
		sw.zb.splice(o,1)
		sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])
		yuan.r += xx/8;
		val+=1
		//限制大小
		if(yuan.r>r_max){
			yuan.r=r_max
		}
	continue

	}
}


};
// for(var i=0;i<10;i++){
// 			console.log("zd.zb")
// 		}
var t=0
var render = function () {
		//清空画布
		canvas.height=canvas.height; //清空画布

		//显示子弹
		//
		t+=1
		//if(t==20){
			t=0
		flx=1
		for(var i=0;i<zd_zb.length;i++){
			t+=1
			zd_x=zd_zb[i][0]
			zd_y=zd_zb[i][1]
			zd_zb[i][1]-=5
			 // if(zd_zb[i][1]<0){
			 // 	delete zd_zb[i]
			 // }
			 
			for (var o = 0; o < sw.zb.length; o++) {
				sw_x=sw.zb[o][0]
				sw_y=sw.zb[o][1]

			zd_z = Math.abs(((sw_x-zd_x)**2+(sw_y-zd_y)**2)**0.5)
			if (zd_z<10){
				 // sw={
					// x:randomNum(0,canvas.width),
					// y:randomNum(0,canvas.height),
					// }
				sw.zb.splice(o,1)
				sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])
				zd_zb.splice(i,1)
				//continue
				//delete zd_zb。a.splice(1)[i]
				yuan.r += xx/8;
				val+=1
				//限制大小
				if(yuan.r>r_max){
					yuan.r=r_max
				}
				flx=0
				continue

			}
			}
			if(flx==0){
				flx=1
				continue
			}
			if(zd_zb[i][1]>0){
				ctx.beginPath()//开始画
				ctx.fillStyle="#FF0000";//颜色
				ctx.arc(zd_x,zd_y,3,0,360);//画圆
				ctx.fill()//填充
				ctx.closePath()//画完
			}

		}
	//}
		ctx = canvas.getContext("2d");
		ctx.beginPath()
		ctx.arc(yuan.x,yuan.y,yuan.r,0,360);
		ctx.fillStyle="#000000";
		ctx.fill()
		ctx.closePath()

		ctx.beginPath()
		ctx.fillStyle="#FFFFFF";
		ctx.textBaseline="alphabetic";
		ctx.textAlign="center";  
		ctx.fillText(val,yuan.x,yuan.y+4)
		// ctx.measureText()
		ctx.closePath()

		for(var i=0;i<sw.zb.length;i++){
			ctx.beginPath()
			ctx.fillStyle="#FF0000";
			ctx.arc(sw.zb[i][0],sw.zb[i][1],10,0,360);
			ctx.fill()
			ctx.closePath()
	}
};
var main=function () {
		
		update(xx=5);
		render()
		requestAnimationFrame(main);
}
render()
main()
//document.body.appendChild(canvas);
