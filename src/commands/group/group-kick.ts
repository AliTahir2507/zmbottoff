import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gkick"

export default <Command>{
  category: "group",
  aliases: ["gckick"],
  desc: "Kick member from group with phone number / mention",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Kick member from group with number / mention
  @PREFIX@CMD <number | @mention>

  eg, @PREFIX@CMD 62851xxxxxx
  --------
  Kick multiple members / mention
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

      const kick = (await aruga.groupParticipantsUpdate(message.from, [member.jid], "remove"))[0]

      if (kick.status === "404") {
        const text =
          "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
          "โ\n" +
          `โ ${i18n.translate("commands.group.group-kick.failed", { "@NUM": number }, group.language)}\n` +
          "โ\n" +
          `โโโใ ๊ฅ${config.name}๊ฅ ใ`

        return await message.reply(text, true)
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.group-kick.success", { "@NUM": number }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }
  }
}
