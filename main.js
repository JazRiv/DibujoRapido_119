timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = ""
quick_draw_data_set = ['fish', 'clock', 'apple', 'pencil'];

function setup() {
    canvas = createCanvas(280, 280);
    background("#fff");
    canvas.mouseReleased(classifyCanvas);
    actualizarLienzo();
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw(){
    stroke("black");
    strokeWeight(13);
    if (mouseIsPressed == true) {
        line(pmouseX,  pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, resultado){
    if (!error) {
        console.log(resultado);
        drawn_sketch = resultado[0].label;
        document.getElementById("dibujo").innerHTML = "Tu dibujaste:" + drawn_sketch;
        confianza = respuesta[0].confidence;
        confianza = Math.round(confianza * 100);
        document.getElementById("conf").innerHTML = confianza + "%";
    }
    check_sketch();
}

function check_sketch(){
    if (drawn_sketch == sketch) {
        answer_holder = "set";
        score ++;
        document.getElementById("points").innerHTML = "Puntuacion:" + score;
    }
}

function actualizarLienzo() {
    background("white");
    na = Math.floor((Math.random() * quick_draw_data_set.length));
    Element_of_array = quick_draw_data_set[na];
    console.log(na + Element_of_array);
    sketch = Element_of_array;
    document.getElementById("reto").innerHTML = "Dibuja:" + sketch;
    timer = setInterval(tiempo, 1000);
}

function tiempo(){
    timer_counter++ ;
    document.getElementById("time").innerHTML = "Tiempo:" + timer_counter;
    check_time();
}

function check_time(){
    
    if (timer_counter >= 60){
    timer_counter = 0;
    timer_check = "completed";
    }
    if (timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        clearInterval(timer);
        actualizarLienzo();
    }
}

function borrar(){
    background("white");
}