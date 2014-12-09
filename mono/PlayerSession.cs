
using System;
using System.Collections.Generic;

using System.Data;
using System.Threading.Tasks;

namespace Game {

	public class PlayerSession {

		private string connectionId;
		private Func<object, Task<object>> send;
		private Func<object, Task<object>> log;

		public Func<object, Task<object>> Start(dynamic input)
		{
			this.connectionId = (string) input.connectionId;
			this.log = (Func<object, Task<object>>) input.log;
			this.send = (Func<object, Task<object>>) input.send;
			return (Func<object, Task<object>>)(async (ev) =>
	        {
	        	if (ev is string) {
	            	OnMessage(ev as string);
	        	}
	        	else {
	        		OnClose();
	        	}

	        	return null;
	        });
		}

		private void OnMessage(object message) {
			send(message.ToString());
		}

		private void OnClose()
		{
			log("bye!");
		}

	}

}
