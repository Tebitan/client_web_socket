import { Manager, Socket } from 'socket.io-client';

let socket: Socket;
export const connectToServer = (token: string) => {
	const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
		extraHeaders: {
			authentication: token,
		},
	});
	//eliminar los Listeners
	socket?.removeAllListeners();

	socket = manager.socket('/');
	addListeners();
};

const addListeners = () => {
	const serverStatusLabel = document.querySelector('#server-status')!;
	const clientsUl = document.querySelector('#clients-ul')!;
	const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
	const messageInput =
		document.querySelector<HTMLInputElement>('#message-input')!;
	const messagesUl = document.querySelector('#messages-ul')!;

	socket.on('connect', () => {
		serverStatusLabel.innerHTML = 'connected';
	});
	socket.on('disconnect', () => {
		serverStatusLabel.innerHTML = 'disconnected';
	});
	socket.on('clients-updates', (clients: string[]) => {
		let clientHtml = '';
		clients.forEach((clientId) => {
			clientHtml += `<li>${clientId}</li>`;
		});
		clientsUl.innerHTML = clientHtml;
	});

	//escuchamos el form
	messageForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (messageInput.value.trim().length <= 0) return;
		socket.emit('message-from-client', {
			id: socket.id,
			message: messageInput.value.trim(),
		});
		messageInput.value = '';
	});

	socket.on(
		'message-from-server',
		(payload: { fullname: string; message: string }) => {
			const newMessage = `
            <li>
            <strong>${payload.fullname}</strong>
            <span>${payload.message}</span>
            </li>
            `;
			const li = document.createElement('li');
			li.innerHTML = newMessage;
			messagesUl.append(li);
		}
	);
};
