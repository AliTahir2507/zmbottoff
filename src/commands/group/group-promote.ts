import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gpromote"

export default <Command>{
  category: "group",
  aliases: ["gcpromote"],
  desc: "Demote group admins become members of group",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Demote with number / mention
  @PREFIX@CMD <number | @mention>

  eg, @PREFIX@CMD 62851xxxxxx
  --------
  Demote multiple members / mentions
  @PREFIX@CMD <number> <@mention> ...<other member>

  eg, @PREFIX@CMD 62851xxxxx @mention
  --------
  `.trimEnd(),
  execute: async ({ aruga, message, args, group }) => {
    if (!args.length) throw "noCmd"

    for (const number of args) {
      const members = await aruga.onWhatsApp(number.replace(/\D+/g, "").trim())
      const member = members[0]
      if (!members.length || !member.exists) {
        const text =
          "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
          "โ\n" +
          `โ ${i18n.translate("default.onWhatsApp", { "@NUM": number }, group.language)}\n` +
          "โ\n" +
          `โโโใ ๊ฅ${config.name}๊ฅ ใ`

        return await message.reply(text, true)
      }

      await aruga.groupParticipantsUpdate(message.from, [member.jid], "promote")

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.group-promote", { "@ADM": `@${member.jid.split("@")[0]}` }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }
  }
}
