import { WACallEvent } from "@adiwajshing/baileys"
import WAClient from "../../../libs/whatsapp"
import config from "../../../utils/config"
import type { CallSerialize } from "../../../types/serialize"

/** Call Serialize */
export const call = async (aruga: WAClient, call: WACallEvent): Promise<CallSerialize> => {
  const c = <CallSerialize>{}
  c.callFrom = aruga.decodeJid(call.from)
  c.callId = call.id
  c.status = call.status

  function reply(text: string) {
    return aruga.sendMessage(c.callFrom, {
      text: "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" + "โ\n" + `โ ${text}\n` + "โ\n" + `โโโใ ๊ฅ${config.name}๊ฅ ใ`,
      mentions: [c.callFrom]
    })
  }
  c.reply = reply

  return c
}
