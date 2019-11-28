'use strict';
const circle_r = 16;
const circle_distance = circle_r * 1.8;

function setup()
{
    frameRate(12);
    colorMode(HSB, 360, 100, 100)
    init_field();
    const windowWidth = 650;
    const windowHeight = (field.length + 2) * circle_distance;
    createCanvas(windowWidth, windowHeight);
}

function draw()
{
    background(0,0,100);
    draw_heatmap();
    calc_field();
}

function draw_heatmap()
{
    noStroke();

    for(let i = 0; i < field.length; i++){
        for(let j = circle_distance; j < windowWidth - circle_distance; j += circle_distance){
            fill(heat_color(field[i]));
            const x_rand = random(-1, 1);
            const y_rand = random(-1, 1);
            ellipse(j + x_rand, circle_distance * (i + 1) + y_rand, circle_r, circle_r);
        }
    }
}

function heat_color(val){
    // 0: red
    // 240: blue
    const min_color = 240;
    const h_rand = random(-3, 3);
    const s_rand = random(-10, 0);
    const b_rand = random(-10, 0);
    const hue = - min_color / T_diff * (val - T_x0) + min_color;
    return color(constrain(hue + h_rand, 0, min_color), 100 + s_rand, 100 + b_rand);

}


// HT simulation from here
const lambda = 30.0; // W / m K
const rho = 3.95; // g / cm3
const c = 0.778; // J/ g K

const l = 100.0; // mm
const dx = 5.0; // mm
const dt = 0.1; // sec

const r = lambda * dt / rho / c / (dx**2);

// Initial Condition
const T_x0 = 293.0;

// Boundary Condition
const T_0t = 373.0;
const T_lt = 373.0;

// Maximum Temperature Difference
const T_max = Math.max(T_0t, T_lt);
const T_diff = T_max - T_x0;


let field = [];
let field_next = [];

function init_field()
{
    let cnt = 0;
    for(let i = 0; i <=l; i += dx ){
        field[cnt] = T_x0; // set initial conditiom
        cnt++;
    }
}

function calc_field() {
    for(let i = 0; i < field.length; i++) {
        let set_val = 0;
        if( i == 0 ) { // Boundary Condition
            set_val = T_0t;
        } else if ( i == field.length -1 ) { // Boundary Condition
            set_val = T_lt;
        } else {
            set_val = calc_HT(i);
        }
        field_next[i] = set_val
    }
    swap();
}

function calc_HT(cnt){
    return r * ( field[cnt-1]  - 2.0 * field[cnt] + field[cnt+1]) + field[cnt];
}


function swap(){
    const tmp = field;
    field = field_next;
    field_next = tmp;
}
