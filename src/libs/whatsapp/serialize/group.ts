import { WAMessage } from "@adiwajshing/baileys"
import WAClient from "../../../libs/whatsapp"
import config from "../../../utils/config"
import type { GroupSerialize } from "../../../types/serialize"

export const group = async (aruga: WAClient, msg: WAMessage): Promise<GroupSerialize> => {
  const m = <GroupSerialize>{}
  m.from = aruga.decodeJid(msg.key.remoteJid)
  m.sender = aruga.decodeJid(msg.key.fromMe ? aruga.user.id : m.from.endsWith("g.us") || m.from === "status@broadcast" ? msg.key?.participant || msg.participant : m.from)
  m.body = [msg.messageStubParameters[1] ?? msg.messageStubParameters[0]].join("")
  m.type = msg.messageStubType
  m.timestamps = (typeof msg.messageTimestamp === "number" ? msg.messageTimestamp : msg.messageTimestamp.low ? msg.messageTimestamp.low : msg.messageTimestamp.high) * 1000 || Date.now()

  function reply(text: string) {
    return aruga.sendMessage(m.from, {
      text: "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" + "โ\n" + `โ ${text}\n` + "โ\n" + `โโโใ ๊ฅ${config.name}๊ฅ ใ`,
      mentions: [m.sender]
    })
  }
  m.reply = reply

  return m
}
