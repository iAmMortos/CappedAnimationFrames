function SimpleDrawExample()
{
	var _self = this;
	this.canvas = $("#drawing")[0];
  this.ctx = this.canvas.getContext("2d");
  
  var thisTick = 0;
  var lastTick = 0;
  var tickTimes = [];
  var maxTicks = 100;
  var averageTick = 0;
  var totalTickTimes = 0;
  
  $(this.canvas).css({"width":"600px", "height":"400px"});
  this.canvas.width = 600;
  this.canvas.height = 400;
  
  this.ctx.fillStyle = "#6699ff";
  this.ctx.font = "16px Arial";
  
  this.squarePos = -200;
  this.moveRate = 200; // pixels per second
  
  this.updateSquare = function(delta)
  {
    _self.squarePos += _self.moveRate * (delta / 1000);
    while ((_self.squarePos + 200) > 800)
      _self.squarePos -= 800;
  };
  this.drawFrame = function()
  {
    _self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    _self.ctx.fillRect(this.squarePos, 100, 200, 200);
    _self.ctx.fillText(("FPS: " + averageTick),10,25);
  };
  this.gameLoop = function(delta)
  {
  	lastTick = thisTick;
    thisTick = Date.now();
    tickTimes.push(1000 / (thisTick - lastTick));
    while (tickTimes.length > maxTicks)
    	tickTimes.shift();
    totalTickTimes = tickTimes[0];
    for(var i = 1; i < tickTimes.length; i++)
    	totalTickTimes += tickTimes[i];
    averageTick = Math.floor((totalTickTimes / tickTimes.length) * 100) / 100;
    
    _self.updateSquare(delta);
    _self.drawFrame();
  };
  this.resetTickTimes = function()
  {
  	tickTimes = [];
    averageTick = 0;
  }
  
  this.drawFrame();
}
