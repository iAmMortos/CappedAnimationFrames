# CappedAnimationFrames
A simple JavaScript class that contains the standard boilerplate code for using the requestAnimationFrames() function with the added feature of being able to cap the frame rate as desired.

Check out the demo on [jsfiddle](https://jsfiddle.net/iAmMortos/8boxnr25/show/).

## See? It's easy!
Just provide the CappedAnimationFrames constructor with a function object and an optional capped FPS. Then call the `start()` function. Bam.
```js
// The delta is the time since the last frame in miliseconds
function gameLoop(delta)
{
  // take user input
  // update objects
  // draw objects
}

var caf = new CappedAnimationFrames(gameLoop, 30);
caf.start();
// the gameLoop() function is now running at a max of about 30 fps.

caf.setFPS(45);
// the gameLoop() function is now running at a max of 45 fps without needing to be stopped. (is that a thing people need? changing fps on the fly? *shrug*)

caf.setFPS(0);
// the gameLoop() function is now running as fast as requestAnimationFrame() will allow (probably about 60 fps)

caf.stop();
// the gameLoop() function has now stopped running at regular intervals.
```
