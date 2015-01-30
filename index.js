var DIM_TABLE = 5;
var NUM_IT = 256;
var table = [];


function print(){
    for(var x=0;x<DIM_TABLE;x++){
      console.log('%s %s %s %s %s', table[x][0],table[x][1],table[x][2],table[x][3],table[x][4]);
    }
    console.log("");
    console.log("");
    console.log("");

};

function init(){
  for(var x=0;x<DIM_TABLE;x++){
    table[x]=[];
    table[x][0]='O';
    table[x][1]='O';
    table[x][2]='O';
    table[x][3]='O';
    table[x][4]='O';
  }
  table[1][2] = 'X';
  table[2][2] = 'X';
  table[3][2] = 'X';

};

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
  for(var x=0;x<DIM_TABLE;x++){
    for(var y=0;y<DIM_TABLE;y++){

      var num_alive_neigh = checkNumNeighAlive(x,y);
      var nxt_life_status = rules(num_alive_neigh,table[x][y]);
      update_life_status(x,y,nxt_life_status,new_table);

    }
  }
  table = clone(new_table);

};

var main = function(num){
  init();
  print();
  var num_ite = num || NUM_IT;

  for(var i=0;i<num_ite;i++){
    tick();
    print();
  }

}

if (require.main === module) {
  main();
}
