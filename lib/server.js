var edge = require('edge');
var util = require('util');

var getPlayer = edge.func(function () {/*
	#r "game.dll"
	using System.Threading.Tasks;
	
	public class Startup
	{
		public async Task<object> Invoke(dynamic input)
		{
			return new Game.Player();
		}
	}
*/});

var getLobby = edge.func(function () {/*
	#r "game.dll"
	using System.Threading.Tasks;
	
	public class Startup
	{
		public async Task<object> Invoke(dynamic input)
		{
			return new Game.Lobby();
		}
	}
*/});

getLobby(null, function (error, result) {
	if (error) throw error;
	console.log(result.Count());
});

