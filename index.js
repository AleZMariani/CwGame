var cwgame = require("./cwgame");

var main = function(num){
  cwgame.init(5);
  cwgame.load_init_life([[1,2],[2,2],[3,2]]);
  cwgame.start(5);
}

if (require.main === module) {
  main();
}
