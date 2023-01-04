import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5000/chat-box", {
	// extraHeaders: {
	// 	'x-txid': "123",
	// 	'x-address': 'address',
	// 	'x-signature': 'signature',
	// 	'x-nonce': 'nonce',
	// 	'x-time': 'time',
	// 	'test': 'test'
	// },
	// transports: ['websocket']
});

console.log(socket);
function App() {
	//Room State

	// Messages States
	const [connect, setConnect] = useState("");
	const [message, setMessage] = useState("");
	const tx_id = '1672134288827 - 0xF0218...F1e4DFf&0xa5552...d8c439B'

	useEffect(() => {
		socket.on("connect-server", (data) => {
			setConnect(data);
			socket.emit("join_room", tx_id);
			socket.on('new_message', (data) => {
				console.log(data);
				setMessage(JSON.stringify(data))
			})
		});
	}, [socket]);

	return (
		<div className="App">
			<h1>Connect: {connect}</h1>
			<h1>Message: {message} </h1>
		</div>
	);
}

export default App;
