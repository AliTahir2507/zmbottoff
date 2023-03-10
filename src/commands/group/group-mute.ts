import i18n from "../../libs/international"
import { command, database } from "../../libs/whatsapp"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gmute"

export default <Command>{
  category: "group",
  aliases: ["gcmute"],
  desc: "Mute/Unmute bot on group",
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
  execute: async ({ message, args, group }) => {
    if (args[0] && (args[0].toLowerCase() === "on" || args[0].toLowerCase() === "enable")) {
      if (!group.mute) {
        await database.updateGroup(message.from, {
          mute: true
        })
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.group-mute.enable", { "@CMD": command }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }

    if (args[0] && (args[0].toLowerCase() === "off" || args[0].toLowerCase() === "disable")) {
      if (group.mute) {
        await database.updateGroup(message.from, {
          mute: false
        })
      }

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.group-mute.disable", { "@CMD": command }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }

    throw "noCmd"
  }
}
