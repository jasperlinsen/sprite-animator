
/*
 prototype SPRITE: Set and create sprite, animate sprite and return controllable elements
 */
function sprite(options){this.init(options);}
sprite.prototype = {
	/*
	 * @Params: Object{
	 *		id *OPTIONAL* {STRING}
	 *		class *OPTIONAL* {STRING, space seperated classes}
	 *		start *OPTIONAL* {INT}, start from frame 1
	 *		end *REQUIRED* {INT}
	 *		width *REQUIRED* {INT}
	 *		height *OPTIONAL* {INT}
	 *		delay *OPTIONAL* {INT}
	 *		speed *OPTIONAL* {INT}
	 *		image *REQUIRED* {STRING}
	 *		style *OPTIONAL* {STRING}
	 *		}
	 *
	 */
	init : function(options){
		// Named ID for object {STRING}
		this.id = options.id ? options.id : "sprite_" + Math.round(new Date().getTime() *  Math.random());
		// Classes for object seperated by space
		this.classes = options.class ? options.class : "";
		// Style elements specific for this
		this.style = options.style ? options.style : "";
		// Frame index to start from {INT}
		this.start = options.start ? options.start - 1 : 0;
		// Frame index to end on {INT}
		this.end = options.end ? options.end - 1 : 0;
		// Object width {INT}
		this.width = options.width ? options.width : (options.height ? options.height : 100);
		// Object height {INT}
		this.height = options.height ? options.height : this.width;
		// Initial Animation Delay {MILISECONDS}
		this.delay = options.delay ? options.delay : 1;
		// Frame Rate {MILISECONDS} {DEFAULT:60fps}
		this.speed = options.speed ? options.speed : 1000/60;
		// Path to image {STRING}
		this.image = options.image ? options.image : "";
		// HTML Buildup {HTML}
		var classinsert = options.class ? " class=\"" + this.classes + "\"" : "";
		this.html = "<div id=\""+this.id+"\""+classinsert+" style=\""+this.style+" background: url("+this.image+") no-repeat 0 0; width: "+this.width+"px; height: "+this.height+"px;\"></div>";
		// Distance that the frame needs to be moved when animated {INT}
		this.distance = this.height * (-1);
		// Is the animation on loop {BOOL}
		this.loop = 1;
		// universal check for endloop
		this.endlooptimeout = 1;
	},
	dom : function(){
		return this.html;
	},
	animate: function(){
		// Get element reference
		var element = this.js();
		var local = this;
		var timeout = "";
		// Define Starting Position
		var startingPosition = this.distance * this.start;
		// Set a framecounter
		var counter = this.start;
		// See if framecounter counts up or down to reach end
		if(this.start > this.end) var increment = -1;
		else if(this.start < this.end) var increment = 1;
		else var increment = 0;
		// set initial position
		var backgroundPositionPropertyX = element.style.backgroundPosition ? element.style.backgroundPosition.toString().split(" ")[0] + " " : "0 ";
		element.style.backgroundPosition = backgroundPositionPropertyX + startingPosition+"px";
		// delay execution
		setTimeout(function(){
			// check if animating, else return false
			if(local.animating == 1) return false;
			local.animating = 1;
			// run through the frames
			timeout=setInterval(function(){
				// increase framecounter
				counter = counter + increment;
				// calculate position by frame
				var newPosition = local.distance * counter;
				// set position
				element.style.backgroundPosition = backgroundPositionPropertyX + newPosition + "px";
				// if framecounter reaches endframe, clear and exit
				if(counter == local.end){
					clearInterval(timeout);
					local.animating = 0;
				}
			},local.speed);
		},local.delay);
	},
	startloop : function(){
		this.endlooptimeout = 0;
		if(this.loop!=1) return false;
		else {
			var local = this;
			var intervaltime = this.speed * (this.end+1) + this.delay;
			// run initial
			local.animate();
			// run seconds and on
			this.loop = setInterval(function(){local.animate()},intervaltime);
		}
	},
	endloop : function(delay){
		if(!delay) delay = 0;
		var local = this;
		this.endlooptimeout = 1;
		setTimeout(function(){
			if(local.endlooptimeout==1) {
				clearInterval(local.loop);
				local.loop = 1;
				local.endlooptimeout = 0;
			}
		},delay);
	},
	js : function(){
		return document.getElementById(this.id);
	},
	jq : function(){
		return $("#"+this.id);
	}

}