var cwgame = require("./cwgame");

var main = function(num){
  cwgame.init_size(11);
  // {"x":"1", "y":"2"},
  // {"x":"2", "y":"2"},
  // {"x":"3", "y":"2"},

  cwgame.load_init_life({ "initial_life":
              [
                {"x":"0", "y":"0"},
                {"x":"0", "y":"10"},
                {"x":"1", "y":"1"},
                {"x":"1", "y":"9"},
                {"x":"2", "y":"2"},
                {"x":"2", "y":"8"},
                {"x":"3", "y":"3"},
                {"x":"3", "y":"7"},
                {"x":"4", "y":"4"},
                {"x":"4", "y":"6"},
                {"x":"5", "y":"5"},
                {"x":"5", "y":"5"},
                {"x":"6", "y":"6"},
                {"x":"6", "y":"4"},
                {"x":"7", "y":"7"},
                {"x":"7", "y":"3"},
                {"x":"8", "y":"8"},
                {"x":"8", "y":"2"},
                {"x":"9", "y":"9"},
                {"x":"9", "y":"1"},
                {"x":"10", "y":"10"},
                {"x":"10", "y":"0"},
              ]
  });
  cwgame.print();
  cwgame.setIteractive(true);
  cwgame.start(10);
  cwgame.print();
}

if (require.main === module) {
  main();
}
