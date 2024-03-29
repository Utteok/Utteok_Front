import * as StompJs from '@stomp/stompjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const clientData = new StompJs.Client({
	brokerURL: 'ws://dev.utteok.com/ws',
	connectHeaders: {},
	debug: function (str) {
		console.log(str);
	},
	reconnectDelay: 5000, // 자동 재 연결
	heartbeatIncoming: 4000,
	heartbeatOutgoing: 4000,
});

export const sendNickName = (nickName: string, onMessageRecieved: any) => {
	if (nickName === '') {
		return;
	}

	clientData.publish({
		destination: '/pub/checkNickname/',
		body: JSON.stringify({
			nickname: nickName,
		}),
	});
};

export const disConnect = (client: boolean) => {
	// 연결 끊기
	if (client === false) {
		return;
	}
	clientData.deactivate();
};

export const connect = (initializeClient: () => void) => {
	try {
		clientData.onConnect = function () {
			clientData.subscribe('/sub/checkNickname', callback);
		};

		const callback = function (body: StompJs.Message) {
			console.log('응답' + JSON.parse(body.body));
		};

		clientData.activate();
		initializeClient();
	} catch (err) {
		console.log(err);
	}
};
