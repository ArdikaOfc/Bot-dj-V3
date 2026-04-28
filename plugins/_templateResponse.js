import { proto, generateWAMessage, areJidsSameUser } from '@adiwajshing/baileys';

export async function all(m, chatUpdate) {
	if (m.isBaileys) return;
	if (!m.message) return;

	if (
		!m.message.buttonsResponseMessage &&
		!m.message.templateButtonReplyMessage &&
		!m.message.listResponseMessage &&
		!m.message.interactiveResponseMessage &&
		!m.message.pollUpdateMessage
	) return;

	let id = '';

	try {
		if (m.mtype === 'conversation') {
			id = m.message.conversation;

		} else if (m.mtype === 'imageMessage') {
			id = m.message.imageMessage.caption;

		} else if (m.mtype === 'videoMessage') {
			id = m.message.videoMessage.caption;

		} else if (m.mtype === 'extendedTextMessage') {
			id = m.message.extendedTextMessage.text;

		} else if (m.mtype === 'buttonsResponseMessage') {
			id = m.message.buttonsResponseMessage.selectedButtonId;

		} else if (m.mtype === 'listResponseMessage') {
			id = m.message.listResponseMessage.singleSelectReply.selectedRowId;

		} else if (m.mtype === 'templateButtonReplyMessage') {
			id = m.message.templateButtonReplyMessage.selectedId;

		} else if (m.mtype === 'interactiveResponseMessage') {
			let data = m.msg?.nativeFlowResponseMessage;

			if (data?.paramsJson) {
				let parsed = JSON.parse(data.paramsJson);
				id = parsed.id || parsed.rowId || '';
			} else {
				id = data?.id || '';
			}

		} else if (m.mtype === 'messageContextInfo') {
			id =
				m.message?.buttonsResponseMessage?.selectedButtonId ||
				m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
				m.text;
		}

	} catch (e) {
		console.log('Error parsing interactive:', e);
	}

	if (!id) return;

	let messages = await generateWAMessage(
		m.chat,
		{ text: id, mentions: m.mentionedJid },
		{
			userJid: this.user.jid,
			quoted: m.quoted && m.quoted.fakeObj,
		}
	);

	messages.key.remoteJid = m.chat;
	messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
	messages.key.id = m.key.id;
	messages.pushName = m.pushName;

	if (m.isGroup) {
		messages.key.participant = messages.participant = m.sender;
	}

	let msg = {
		...chatUpdate,
		messages: [proto.WebMessageInfo.create(messages)].map((v) => {
			v.conn = this;
			return v;
		}),
		type: 'append',
	};

	this.ev.emit('messages.upsert', msg);
}