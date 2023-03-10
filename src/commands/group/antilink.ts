import i18n from "../../libs/international"
import { database } from "../../libs/whatsapp"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export default <Command>{
  category: "group",
  desc: "Kick participant who send whatsapp group link",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Turn on / Activate @CMD
  @PREFIX@CMD on
  --------
  Turn off / Deactivate @CMD
  @PREFIX@CMD off
  --------
  `.trimEnd(),
  execute: async ({ message, args, user, group, command }) => {
    if (args[0] && (args[0].toLowerCase() === "on" || args[0].toLowerCase() === "enable")) {
      if (!group.antilink) {
        await database.updateGroup(message.from, {
          antilink: true
        })
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.antilink.enable", { "@CMD": command }, user.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }

    if (args[0] && (args[0].toLowerCase() === "off" || args[0].toLowerCase() === "disable")) {
      if (group.antilink) {
        await database.updateGroup(message.from, {
          antilink: false
        })
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.antilink.disable", { "@CMD": command }, user.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }

    throw "noCmd"
  }
}
