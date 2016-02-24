function main()
{
	var fpsCap = 60;
	var sde = new SimpleDrawExample();
	var caf = new CappedAnimationFrames(sde.gameLoop, fpsCap);
  caf.start();
  
  var $input = $("#fpsInput");
  var $btn = $("#startStop");
  $btn.click(function(){
  	if (caf.isRunning())
    {
    	caf.stop();
      sde.resetTickTimes();
      sde.drawFrame();
      $btn.text("Start");
      $input.prop("disabled", false)
    }
    else
    {
    	var newFps = parseInt($input.val());
      if (isNaN(newFps))
      {
      	$("#errorText").css("display", "inline").text("'" + $input.val() + "' is not a valid number. duh.");
      }
      else
      {
      	$("#errorText").css("display", "none").text("");
      	caf.start(newFps);
        $btn.text("Stop");
        $input.prop("disabled", true);
      }
    }
  });
  
}

$(document).ready(main);
