import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input placeholder="Json Web Token" id="jwt-input">
    <button id="btn-connect">Connect</button>
    <br/>

    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>
    <form id="message-form">
    <input placeholder="message" id="message-input"> 
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

const jwtInput = document.querySelector<HTMLInputElement>('#jwt-input')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
	if (jwtInput.value.trim().length <= 0) return alert('Enter a valid JWT');
	connectToServer(jwtInput.value.trim());
});

//connectToServer();
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
