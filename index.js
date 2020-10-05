const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const options = require('./utils/options')
const msgHandler = require('./handler/message')

const start = (client = new Client()) => {
    console.log('[DEV]', color('Red Emperor', 'yellow'))
    console.log('[CLIENT] CLIENT Started!')

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT') client.forceRefocus()
    })

    // listening on message
    client.onMessage((message) => {
        client.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[CLIENT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        // Message Handler
        msgHandler(client, message)
    })

    // listen group invitation
    client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) =>
        client.getGroupMembersId(id)
            .then((ids) => {
                console.log('[CLIENT]', color(`Invited to Group. [ ${name} : ${ids.length}]`, 'yellow'))
                // conditions if the group members are less than 50 then the bot will leave the group
                if (ids.length <= 5) {
                    client.sendText(id, 'Sorry, the minimum group member is 10 user to use this bot. Bye~').then(() => client.leaveGroup(id))
                } else {
                    client.sendText(id, `Hello group members *${name}*, thank you for inviting this bot, to see the bot menu send *#menu*`)
                }
            }))
     // listening on Incoming Call
        client.onIncomingCall((call) => {
            client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nbila ingin di unblock kamu harus bedonasi dan hubungi whatsapp admin: 081311850715 ')
            client.contactBlock(call.peerJid)
            //ban.push(call.peerJid)
            //fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
        })

    client.onRemovedFromGroup((data) => {
        // console.log(data)
    })

    // listen paricipant event on group (wellcome message)
    client.onGlobalParicipantsChanged((event) => {
        if (event.action === 'add') client.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨\n\n*Megumi Kato*✨`)
    })

    client.onGlobalParicipantsChanged((event) => {
        if (event.action === 'remove') client.sendTextWithMentions(event.chat, `Goodbye, Kakak @${event.who.replace('@c.us', '')} \n\n*Megumi Kato*✨`)
    })

    client.onIncomingCall((callData) => {
        // client.contactBlock(callData.peerJid)
    })
}

create('Imperial', options(true, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))
