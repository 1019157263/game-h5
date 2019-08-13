var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 400	;
canvas.height = 600;
canvas.style="border:5px solid #000000;";
var val=0
var r_max=200
var keysDown = {};
tx=canvas.width/3
ty=canvas.height/3
var yuan= {
	x :canvas.width / 2,
	y : canvas.height / 2,
	r:12
};
var sw={
	x:randomNum(0,canvas.width),
	y:randomNum(0,canvas.height),
	zb:[]
}
for(var i=0;i<20;i++){//生成20个食物
	sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])
	}

function getLocation(x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: (x - bbox.left) * (canvas.width / bbox.width),

		y: (y - bbox.top) * (canvas.height / bbox.height)
	};
}
function ctx_Write(colour="#FF0000",X=X,Y=Y,R=R){
		ctx.beginPath()
		ctx.fillStyle=colour;
		ctx.arc(X,Y,R,0,360);
		ctx.fill()
		ctx.closePath()
}
function text_Write(colour="#FF0000",VAL=val,X=X,Y=Y){
		ctx.beginPath()
		ctx.fillStyle="#FFFFFF";
		ctx.textBaseline="alphabetic";
		ctx.textAlign="center";  
		ctx.fillText(VAL,X,Y)
		ctx.closePath()
}
function myFunction1(event,xx=10){
	//console.log("按下")
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
	}
	if(x>tx && x<2*tx && y>2*ty){
		console.log("下按下")
		keysDown[40] = true
	}
	if(y>ty && y<2*ty && x<1*tx){
		console.log("左按下")
		keysDown[37] = true
	}
	if(y>ty && y<2*ty && x>2*tx){
		console.log("右按下")
		keysDown[39] = true
	}
}
function myFunction2(event){
	// console.log("按下")
	var location = getLocation(event.clientX, event.clientY);
	var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
　　//startPos = {x:touch.pageX,y:touch.pageY}; //取第一个touch的坐标值
	x= startPos.x
	y= startPos.y
	console.log("松开")
		if(x>tx && x<2*tx && y>ty && y<2*ty){
		console.log("开火")
		zd_zb.push([yuan.x,yuan.y])
	}
	for(var key in keysDown){
		delete keysDown[key];
	}

}
var zd_zb=[]
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	if (e.keyCode==32){
		zd_zb.push([yuan.x,yuan.y])
	}
	delete keysDown[e.keyCode];
}, false);

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
		//zd_zb.push([yuan.x,yuan.y])//注释掉这段即可关闭全自动模式
	}

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
	for (var o = 0; o < sw.zb.length; o++) {
		sw_x=sw.zb[o][0]
		sw_y=sw.zb[o][1]
		sw.zb[o][1]+=0.1
		if(sw.zb[o][1]>canvas.height){
				sw.zb.splice(o,1)
				sw.zb.push([randomNum(0,canvas.width),randomNum(0,canvas.height/2)])
				continue
				}
	 var z = Math.abs(((sw_x-yuan.x)**2+(sw_y-yuan.y)**2)**0.5)-yuan.r

	if (z<10){
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
var render = function () {
		//清空画布
		canvas.height=canvas.height; //清空画布
		//显示子弹

		ctx = canvas.getContext("2d");
		ctx_Write(colour="#000000",X=yuan.x,Y=yuan.y,R=yuan.r)//画飞机
		text_Write(colour="#FFFFFF",VAL=val,X=yuan.x,Y=yuan.y+4)//画分数
		for(var i=0;i<sw.zb.length;i++){
			ctx_Write(colour="#FF0000",X=sw.zb[i][0],Y=sw.zb[i][1],R=10)//画食物
	}
};
var main=function () {
		update(xx=5);
		render()
		requestAnimationFrame(main);
}
main()