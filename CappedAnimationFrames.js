/***
	CappedAnimationFrames(func[, obj[,  fps = 0]])
  desc: This class wraps up the boilerplate code for using the window.requestAnimationFrame() function
  			with an easy interface and provides the ability to throttle the framerate.
  	func	- The function that will be run every frame
    obj   - The object that should call the given function (If "this")
    fps   - The FPS cap desired (0 or blank for uncapped)
    
	.start([fps])
  desc: Begins the requests for animation frames at the set framerate
  	fps		- The frame rate at which to start. Otherwise stays the same.
    
  .stop()
  desc: Stops requesting animation frames.
  
  .setFPS(fps)
  desc: Sets a new framerate at which to run. Can be set WHILE running.
  	fps			- The frame rate at which the CappedAnimationFrames instance should run
    
  .isRunning()
  desc: returns the current running state of the CappedAnimationFrames instance
***/
function CappedAnimationFrames(func, obj, fps)
{
	var maxFPS = typeof fps !== 'undefined' ? fps : 0;
  
  // If a function is not provided, throw an error.
  if (func === null)
  	throw "CappedAnimationFrames constructor: You must provide a function to be executed.";
  
  var running = false;
  
  var requestId = null;     // The requestId. Used for cancelling this specific request.
  var tickNow = null;       // The time now in ms.
  var tickThen = null;      // The last tick time in ms.
  var tickDelta = null;     // The difference between tickNow and tickThen.
  var tickInterval = null;  // The length of each frame in ms. (calculated from maxFPS)
  
  // if the maxFPS is 0 (or less), then don't cap the framerate
  if (maxFPS <= 0)
  	tickInterval = 0;
  // else, set the tickInterval to the length of each frame in ms.
  else
  	tickInterval = 1000 / maxFPS;
  
  // The guts of the class. It calls the requestAnimationFrame function at the rate specified.
  function tick()
  {
  	// schedule the next tick call.
    requestId = window.requestAnimationFrame(function(){ tick(); });
    
    // calculate the time since last tick in ms
    tickNow = Date.now();
    tickDelta = tickNow - tickThen;
    
    // if it's been long enough, call the given function.
    if (tickDelta >= tickInterval)
    {
    	// adjust the tickThen time by how far OVER the tickInterval we went.
      tickThen = tickNow - (tickInterval !== 0 ? (tickDelta % tickInterval) : 0);
      
      if (obj === null)
        func(tickDelta);
      else
        func.call(obj, tickDelta);
    }
  }
  
  // Starts the ticking. If given an fps, it will set the fps before starting.
  this.start = function(fps)
  {
    if (typeof fps !== 'undefined')
      this.setFPS(fps);
      
    tickNow = Date.now();
    tickThen = tickNow - tickInterval;
    tick();
    running = true;
  };
  // Stops the ticking
  this.stop = function()
  {
    window.cancelAnimationFrame(requestId);
    running = false;
  };
  // Sets the current capped framerate to the given number. If <= 0, the framerate will be uncapped.
  this.setFPS = function(fps)
  {
    maxFPS = fps;
    
    if (maxFPS <= 0)
      tickInterval = 0;
    else
      tickInterval = 1000 / maxFPS;
  };
  // Wrapper for running. Returns the running status of the CappedAnimationFrames instance.
  this.isRunning = function()
  {
    return running;
  };
}
