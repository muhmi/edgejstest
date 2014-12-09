
using System;
using System.Collections.Generic;

using System.Data;
using System.Threading.Tasks;

namespace Game {

	public class Player {
		public string Name { get; set; }
		public string Id { get; set; }
	}

	public class Lobby {

		List<Player> players = new List<Player>();
		
		public void Join(Player player)
		{
			players.Add(player);		
		}

		public int Count()
		{
			return players.Count;
		}
	}

}
