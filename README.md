# Café Simulator
A dynamic café simulation using p5.js, featuring flocking customers and animated waiters.
# Demo
You can view and interact with the live demo here: https://editor.p5js.org/naheeda/sketches/Uoaluq0BV
# Description
This project simulates a café environment with the following features:

• Flocking customers using boid algorithms

• Animated waiter sprites moving across the screen
• Dynamic background that changes based on time of day
• Interactive elements where customers are attracted to the mouse position

# Files

sketch.js: Main p5.js sketch file containing setup, draw, and preload functions
sprite.js: Contains the Sprite class for animated waiters
boid.js: Implements the Boid class for customer flocking behavior
index.html: HTML structure for the p5.js sketch
style.css: Basic styling for the canvas

# How It Works

• Customers (boids) move around the screen following flocking rules: separation, alignment, and cohesion.
• Waiters are animated sprites that move across the screen.
• The background color changes to simulate different times of day.
• Moving the mouse attracts the customers, influencing their movement.

# Credits
This project uses modified code and concepts from:

The Coding Train's Flocking Simulation Challenge: YouTube Video
The Coding Train's Animated Sprites Challenge: YouTube Video
Universal LPC Sprite Sheet Character Generator for sprite assets: Website

# License
This project is open source and available under the MIT License.
