
	var canvas = document.querySelector("#scene"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = {x:0,y:0},
		radius;
		window.innerWidth < 750 ? radius = 1 : radius = 3;

	var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

	var copy = ["Hi I'm Ned", "I Love Web", "Love web as well?","Let's Internet!"];

	var ww = canvas.width = window.innerWidth;
	var wh = canvas.height = window.innerHeight;

	function Particle(x,y){
		this.x =  Math.random()*ww;
		this.y =  Math.random()*wh;
		this.dest = {
			x : x,
			y: y
		};
		window.innerWidth < 900 ? this.r =  Math.random()*1 + 2 : this.r =  Math.random()*3 + 2;

		this.vx = (Math.random()-0.5)*25;
		this.vy = (Math.random()-0.5)*25;
		this.accX = 0;
		this.accY = 0;
		this.friction = Math.random()*0.001 + 0.94;
		this.pos = [ x, y ];
  this.v = [
    (Math.random()-0.5)*0.3,
    (Math.random()-0.5)*0.3
  ];
		this.color = colors[Math.floor(Math.random()*6)];
	}

	Particle.prototype.getBound = function(i) {
  	return i ? canvas.height : canvas.width;
	};

	Particle.prototype.render = function() {

		this.accX = (this.dest.x - this.x)/ 1000;
		this.accY = (this.dest.y - this.y)/ 1000;
		this.vx += this.accX;
		this.vy += this.accY;
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.x += this.vx;
		this.y +=  this.vy;

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
		ctx.fill();

	};

	Particle.prototype.render2 = function() {
		for (i=0; i<2; i++) {
			if (this.pos[i] > this.getBound(i)-10) { this.v[i] *= -1; }
			else if (this.pos[i] < 10) { this.v[i] *= -1; }
			this.pos[i] += this.v[i]*4;
		}

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI, false);
		ctx.fill();

		var a = this.pos[0] - mouse.x;
		var b = this.pos[1] - mouse.y;

		var distance = Math.sqrt( a*a + b*b );
		if(distance<(radius*70)){
			this.pos[0] += this.v[0]*30;
			this.pos[1] += this.v[1]*30;
		}
	};

	function onMouseMove(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
	}

function onTouchEnd(e){
  mouse.x = -9999;
  mouse.y = -9999;
}

	function initScene(word){
		ww = canvas.width = window.innerWidth;
		wh = canvas.height = window.innerHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.font = "bold "+(ww/10)+"px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(word, ww/2, wh/2);
		//
		var data  = ctx.getImageData(0, 0, ww, wh).data;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = "screen";

		particles = [];
		for(var i=0;i<ww;i+=Math.round(ww/150)){
			for(var j=0;j<wh;j+=Math.round(ww/150)){
				if(data[ ((i + j*ww)*4) + 3] > 150){
					particles.push(new Particle(i,j));
				}
			}
		}
		amount = particles.length;

	}

	function render(a) {
		requestAnimationFrame(render);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < amount; i++) {
			particles[i].render();
		}
	}
	function render2(a) {
		requestAnimationFrame(render2);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < amount; i++) {
			particles[i].render2();
		}
	}
	let hidden = true;
	function hideModule() {
		document.querySelector(".content").style.bottom = "-115%";
		hidden = true;
	}
	function showModule() {
		document.querySelector(".content").style.bottom = "-15%";
		hidden = false;
	}

	document.querySelector("canvas").addEventListener("click", () => {
		if (!hidden) {
			hideModule();
		}
	});

	for (const item of document.querySelector(".links").children) {
		item.addEventListener("click", () => {
			if (hidden) {
				showModule();
			 return false;
			}
			hideModule();
			setTimeout(() => {
				showModule();
			}, 1500);
		});
	}

	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchend", onTouchEnd);
	requestAnimationFrame(render);

	initScene(copy[0]);
	let count = 1;
	setTimeout(() => {
		requestAnimationFrame(render2);
	}, 5000);
	setTimeout(() => {
		initScene(copy[count]);
		requestAnimationFrame(render);
		count += 1;
	}, 7000);
	setTimeout(() => {
		initScene(copy[count - 1]);
		requestAnimationFrame(render2);
	}, 10000);
	setTimeout(() => {
		requestAnimationFrame(render);
		initScene(copy[count]);
		count += 1;
	}, 12000);
	setTimeout(() => {
		initScene(copy[count - 1]);
		requestAnimationFrame(render2);
	}, 15000);
	setTimeout(() => {
		requestAnimationFrame(render);
		initScene(copy[count]);
		count += 1;
	}, 17000);
	setTimeout(() => {
		initScene(copy[count - 1]);
		requestAnimationFrame(render2);
		showModule();
	}, 20000);
