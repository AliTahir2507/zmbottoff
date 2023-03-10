import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gname"

export default <Command>{
  category: "group",
  aliases: ["gcname", "gtitle", "gctitle"],
  desc: "Change group description",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Change group title
  @PREFIX@CMD <name>
  --------
  `.trimEnd(),
  execute: async ({ aruga, message, arg, group }) => {
    if (!arg) throw "noCmd"

    await aruga.groupUpdateSubject(message.from, arg)

    const text =
      "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
      "โ\n" +
      `โ ${i18n.translate("commands.group.change-name", { "@ADM": `@${message.sender.split("@")[0]}` }, group.language)}\n` +
      `${arg}\n` +
      "โ\n" +
      `โโโใ ๊ฅ${config.name}๊ฅ ใ`

    return await message.reply(text, true)
  }
}
