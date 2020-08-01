import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

// give us the possibility of manage request properly
const app = express()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// our single entry point for every message
app.post('/', async (req, res) => {
  /*
    You can put the logic you want here
    the message receive will be in this
    https://core.telegram.org/bots/api#update
  */
  const command = "/mimimize "
  const isValidTelegramMessage = req.body
                          && req.body.message
                          && req.body.message.chat
                          && req.body.message.chat.id
                          && req.body.message.text
                          && req.body.message.text.toLowerCase().startsWith(command)

  if (isValidTelegramMessage) {
    const chat_id = req.body.message.chat.id

    return res.status(200).send({
      method: 'sendMessage',
      chat_id,
      text: req.body.message.text.substring(command.length).replace(/[aáàäâãeéèëêoóòöôõuúùüû]/g, "i").replace(/[AÁÀÄÂÃEÉÈËÊOÓÒÖÔÕUÚÙÜÛ]/g, "I")
    })
  }

  return res.status(200).send({ status: 'not a telegram message' })
})

// this is the only function it will be published in firebase
export const router = functions.https.onRequest(app)