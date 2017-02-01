
	var canvas = document.querySelector("#scene"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = {x:0,y:0},
		radius;
		window.innerWidth < 750 ? radius = 1 : radius = 3;

	var colors = ["#000", "#2e2828", "#3c3434", "#554c4c", "#756b6b"];

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
		this.friction = Math.random()*0.01 + 0.94;
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
		for (let i=0; i<2; i++) {
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

	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchend", onTouchEnd);

	let hidden = true;
	let previousClicked;

	if (window.innerWidth > 700) {
		initScene(copy[0]);
		requestAnimationFrame(render);


		var count = 1;
		var num = copy.length;
		var timeOuts = [];
		var time = 6000;
	while (count < num) {
		timeOuts.push(
			setTimeout(function () {
					initScene(copy[0]);
					requestAnimationFrame(render2);
			}, time));
			time += 3000;
			timeOuts.push(
			setTimeout(function () {
					initScene(copy[1]);
					copy = copy.slice(1);
					requestAnimationFrame(render);
			}, time));
			count += 1;
			time += 5000;
	}

	timeOuts.push(
	setTimeout(function () {
			initScene(copy[0]);
			requestAnimationFrame(render2);
			document.querySelector(".skipIntro").style.opacity = 0;
			showModule(".content1");
			setTimeout(function() {
				document.querySelector(".skipIntro").style.display = "none";
			}, 300);
	}, time));
	let pressed = false;
	document.querySelector(".skipIntro").addEventListener("click", timeClear);


	function timeClear() {
		if (pressed === false) {
			for(var i = 0; i < timeOuts.length; i++) {
					clearTimeout(timeOuts[i]);
					requestAnimationFrame(render);
					initScene(copy[0]);
					requestAnimationFrame(render2);
					pressed = true;
					document.querySelector(".skipIntro").style.opacity = 0;
					setTimeout(function() {
						document.querySelector(".skipIntro").style.display = "none";
					}, 300);
			}
		}
	}
} else {
	showModule(".content1");
	pressed = true;
}


 function hideModule() {
		document.querySelector(`${previousClicked}`).style.top = "100%";
		hidden = true;
	}
	function showModule(item) {
		document.querySelector(`${item}`).style.top = "12%";
		previousClicked = item;
		hidden = false;
	}

	document.querySelector("canvas").addEventListener("click", () => {
		if (!hidden) {
			hideModule();
		}
	});

	for (const item of document.querySelector(".links").children) {
		item.addEventListener("click", (e) => {
			if (hidden) {
				if (window.innerWidth > 700) {
					timeClear();
				}
				showModule(e.currentTarget.dataset.modal);
			 return false;
			}
			hideModule();
			showModule(e.currentTarget.dataset.modal);
		});
	}
