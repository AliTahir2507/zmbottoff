import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gadd"

export default <Command>{
  category: "group",
  aliases: ["gcadd"],
  desc: "Add member to group with phone number",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Add member to group
  @PREFIX@CMD <number>

  eg, @PREFIX@CMD 62851xxxxxx
  --------
  Add multiple members
  @PREFIX@CMD <number> <number> ...<other number>

  eg, @PREFIX@CMD 62851xxxxx 5581xxx
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

      const add = (await aruga.groupParticipantsUpdate(message.from, [member.jid], "add"))[0]

      if (add.status === "403") {
        await aruga.sendAcceptInviteV4(message.from, member.jid)

        const text =
          "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
          "โ\n" +
          `โ ${i18n.translate("commands.group.group-add.invite", { "@NUM": number }, group.language)}\n` +
          "โ\n" +
          `โโโใ ๊ฅ${config.name}๊ฅ ใ`

        return await message.reply(text, true)
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.group-add.add", { "@NUM": number }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }
  }
}
