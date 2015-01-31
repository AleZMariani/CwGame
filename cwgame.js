var DEFAULT_DIM_TABLE_SIDE = 5;
var DEFAULT_NUM_IT = 256;
var table = [];
var iteractive = false;


exports.print = function (){
    for(var x=0;x<DIM_TABLE_SIDE;x++){
      var bp = new Buffer(DIM_TABLE_SIDE*2);
        for(var y=0;y<DIM_TABLE_SIDE;y++){
          bp.write(table[x][y],y*2,1,'utf8');
          bp.write(' ',y*2+1,1,'utf8');
        }
        var out = bp.toString('utf8',0,DIM_TABLE_SIDE*2);
        console.log(out);
    }

    console.log("");
    console.log("");
    console.log("");

};

function init_empty(){
  for(var x=0;x<DIM_TABLE_SIDE;x++){
    table[x] = [];
    for(var y=0;y<DIM_TABLE_SIDE;y++){
      table[x][y] = 'O';
    }
  }
};

function default_life(){
  table[1][2] = 'O';
  table[2][2] = 'O';
  table[3][2] = 'O';
}

exports.load_init_life = function (data){
  if(data){

    var jsonData = JSON.parse(JSON.stringify(data));
    var initial_life = jsonData.initial_life || [];
    for(var i=0; i<initial_life.length; i++){
        table[initial_life[i].x][initial_life[i].y] = 'X'
    }
  }else{
    default_life();
  }
}


function clone (existingArray) {
  var newObj = (existingArray instanceof Array) ? [] : {};
  for (i in existingArray) {
    if (i == 'clone') continue;
    if (existingArray[i] && typeof existingArray[i] == "object") {
      newObj[i] = clone(existingArray[i]);
    } else {
      newObj[i] = existingArray[i]
    }
  }
  return newObj;
};

function checkNumNeighAlive(x,y){

  var num_alive = 0;
  if(table[x-1] && table[y-1] && table[x-1][y-1]){
    if(table[x-1][y-1] == 'X'){
      num_alive += 1;
    }
  }
  if(table[x-1] && table[x-1][y]){
    if(table[x-1][y] == 'X'){
      num_alive += 1;
    }
  }
  if(table[x-1] && table[y+1] && table[x-1][y+1]){
    if(table[x-1][y+1] == 'X'){
      num_alive += 1;
    }
  }
  if(table[y-1] && table[x][y-1]){
    if(table[x][y-1] == 'X'){
      num_alive += 1;
    }
  }
  if(table[y+1] && table[y+1] &&  table[x][y+1]){
    if(table[x][y+1] == 'X'){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[y-1] && table[x+1][y-1]){
    if(table[x+1][y-1] == 'X'){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[x+1][y]){
    if(table[x+1][y] == 'X'){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[y+1] && table[x+1][y+1]){
    if(table[x+1][y+1] == 'X'){
      num_alive += 1;
    }
  }
  return num_alive;

};

/*
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
function rules(na,current_life)
{
  var new_life_status = 'O';

  if((na<2) && (current_life=='X')){
    new_life_status= 'O';
  }
  if(((na==2)||(na==3)) && (current_life=='X')){
    new_life_status= 'X';
  }
  if((na==3) && (current_life=='O')){
    new_life_status= 'X';
  }
  if((na>3) && (current_life=='X')){
    new_life_status= 'O';
  }
  return new_life_status;
}

function update_life_status(x,y,nxt_life_status,table){
    table[x][y] = nxt_life_status;
}

function tick(){
  var new_table = clone(table);
  for(var x=0;x<DIM_TABLE_SIDE;x++){
    for(var y=0;y<DIM_TABLE_SIDE;y++){

      var num_alive_neigh = checkNumNeighAlive(x,y);
      var nxt_life_status = rules(num_alive_neigh,table[x][y]);
      update_life_status(x,y,nxt_life_status,new_table);

    }
  }
  table = clone(new_table);

};

exports.setIteractive = function(val){
    iteractive = val;
}

exports.init_size = function(size){
  DIM_TABLE_SIDE = size || DEFAULT_DIM_TABLE_SIDE;
  init_empty();

}

exports.start = function(num_iteration){
  NUM_IT         = num_iteration || DEFAULT_NUM_IT;
  for(var i=0;i<NUM_IT;i++){
    tick();
    if(iteractive){
      this.print();
    }
  }

}
