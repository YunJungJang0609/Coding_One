# Star wars!

This is a final fial project for Coding One of 21005613 Yun Jung Jang.


## Introduction

This is a further development of the "Stars" mode of my week3 "Raindrop and stars" project. 

Visit my "Raindrop and stars" project: (https://mimicproject.com/code/5e1f4145-1598-4cb5-4ec2-faac463fa55f)

The above is a functional project that generates different star shapes when its users click the mouse button on the screen.
I made it to check easily how a system based on a random condition can create different shapes.

This time, I made a game with a similar code. This generates slightly different star shapes compare to the previous project. The user can start the game by pressing the "Start Game" button.

The base code to create different star shapes is from here: (https://p5js.org/examples/form-star.html)

It sets an x position, y position, spike, outer radius and inner radius in the constructor. I added the velocity variables in it as it needs to fly towards the user. It could be nice if it rotates and makes a nice star-falling effect, which I couldn't manage to do it.

At the beginning of the game, the white circle in the middle of the black screen represents the user.
When the user targets with the mouse a flying star and clicks it, the white circle shoots a projectile. If the target has a big shape, it will reduce its size and it will disappear at the end.
The goal is to destroy the incoming stars. The player will get a higher score when the star is completely destroyed compared to when a star reduces the size. Every time when a star gets hit, it gives an explosion effect.
When a star hits the user, the game ends.
The user can check their score on the left-top corner of the screen and when they start and finish the game. When they restart the game, the system resets the score to 0.

Click the image to watch the full play video:

[![PlayVideo](source/title.jpg)](https://youtu.be/tPJVl63met0)







## What was difficult

I always feel difficult to use Maximilian.js to create sound effects. Although the code was exactly the same with the Mimic project, maxiSample() function didn't work in Visual Studio Code.
Thus, I made a spaceship sound instead of the background music.
My initial goal was to implement Star Wars background music and a Star Wars gun sound effect when the user shoots the stars.

I have an error with a projectile that its reach becomes really short that it doesn't hit a star sometimes. I couldn't make a video of it as it happens really rare. Also, the game becomes slow after restarting the game.

The other error that I couldn't fix appears sometimes when after destroying a star, another one nearby disappears. Like this:

<img src="source/ErrorVideo3.gif" width="70%"/>


I planned to put a storyline and more functions in the game, however, it was difficult to manage the time.





## Links

This is the html code: (https://github.com/YunJungJang0609/Coding_One/blob/main/Index.html)

This is the javascript code: (https://github.com/YunJungJang0609/Coding_One/blob/main/jsScript.js)

This is the css code: (https://github.com/YunJungJang0609/Coding_One/blob/main/stylesheet.css)