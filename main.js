const windowWidth = 640;
const windowHeight = 480;
function setup()
{
    createCanvas(windowWidth, windowHeight);
    init_field();
}

function draw()
{
    background(0);
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


var field = [];
var field_next = [];

function init_field()
{
    var cnt = 0;
    for(var i = 0; i <=l; i += dx ){
        field[cnt] = T_x0; // set initial conditiom
        cnt ++;
    }
}

function calc_field() {
    var set_val = 0;
    for(var i = 0; i < field.length; i++) {
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
    var tmp = field;
    field = field_next;
    field_next = tmp;
}
