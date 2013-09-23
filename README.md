sprite-animator
===============

Animate a sprite with minimal effort by simple calling a new sprite() method and passing arguments as an object to the code. This will generate a new div that will be allowed to animate the background position by calling animate(). It also supports looping animations by calling startloop() and ending the loop by calling endloop();
The whole script only requires three initial values to be functional and allows for lots of options to define the details of the animation. The required options are image, width and end which represent the sprite you want to use (each frame stack on below the last one), the width of the image (height automatically defaults to square) and the number of frames respectively.

Calling the script is as simple as assigning the function to a variable:
 - var mySprite = new sprite({image:"path/to/image.ext",width:200,end:10});

Then you can get back the element code by calling
 - var spriteDOM = mySprite.dom();

which can be appended to the DOM itself by calling
 - document.write(spriteDOM);

Triggering the animation can de done by calling
 - mySprite.animate();

To loop the animation endlessly, you can call
 - mySprite.startloop();

To end the loop, just call
 - mySprite.endloop();

The following options can be added to the initial setup to alter the output:
 - id {STRING} : An ID you can predefine - if not given it will generate a random ID.
 - class {STRING, space seperated classes} : Adds classes to the generated div
 - start {INT} : The starting position (number of frame) - this can be handy if you want to make a specific loop in a bigger picture of animation.
 - height {INT} : Define the height of the image, default to square (width)
 - delay {INT} : delays triggering the animation in milliseconds
 - speed {INT} : the speed at which the frames get shown, default to 60 fps
 - style {STRING} : Add additional styles to the returned object, like positioning or border etc...

PLANNED FEATURES:
 - Allow for multiple animations to be defined on a frame-to-frame basis