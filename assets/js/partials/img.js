function Img() {
	var self = this;
	this.canvas = document.getElementById('dottie');
	this.ctx = this.canvas.getContext('2d');
	$(this.canvas).attr('width', $('.group').width());
	$(this.canvas).attr('height', '700px');

	this.getDimensions = function() {
		return {
			w: $('#dottie').width(),
			h: $('#dottie').height()
		};
	}
	this.dimensions = this.getDimensions();

	//console.log(this.dimensions);

	this.dots = [];

	for(var i = 0; i < 50; i++) {
		this.dots.push(new createDot());
	}

	function createDot() {
		this.x = Math.random() * self.dimensions.w;
		this.y = Math.random() * self.dimensions.h;

		this.vx = Math.random() / 2;
		this.vy = Math.random() / 2;

		console.log(this.vx);

		this.color="rgb(16,16,16);";

		this.radius = Math.random() * 3;
	}

	this.x = 100;
	this.y = 100;

	this.draw = function() {
		//this.ctx.globalCompositeOperation = "source-over";
		self.ctx.fillStyle = 'rgb(255,255,255)';
		self.ctx.fillRect(0, 0, self.dimensions.w, self.dimensions.h);

		for(var t = 0; t < self.dots.length; t++) {
			var p = self.dots[t];
			self.ctx.beginPath();

			self.ctx.fillStyle = p.color;
			self.ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
			self.ctx.fill();

			p.x += p.vx;
			p.y += p.vy;

			if(p.x < -50) p.x = self.dimensions.w + 50;
			if(p.y < -50) p.y = self.dimensions.h + 50;
			if(p.x > self.dimensions.w + 50) p.x = -50;
			if(p.y > self.dimensions.h + 50) p.y = -50;
		}
	};



	this.resizeCanvas = function(callback) {
		$(this.canvas).attr('width', $('.group').width());
		$(this.canvas).attr('height', '700px');

		this.dimensions = this.getDimensions();

		callback();
	};

	//this.resizeCanvas();

	this.init = function() {
		this.resizeCanvas(function() {
			setInterval(self.draw, 33);
		});


	};
	this.init();

	$(window).on('resize', function() {
		self.resizeCanvas(function(){});
		self.draw();
	})
}