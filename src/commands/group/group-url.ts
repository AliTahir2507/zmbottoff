import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gurl"

export default <Command>{
  category: "group",
  aliases: ["gcurl", "glink", "gclink"],
  desc: "Get group invite url",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  execute: async ({ aruga, message, group }) => {
    const code = await aruga.groupInviteCode(message.from)

    const text =
      "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
      "โ\n" +
      `โ ${i18n.translate("commands.group.group-url", { "@URL": `https://chat.whatsapp.com/${code}` }, group.language)}\n` +
      "โ\n" +
      `โโโใ ๊ฅ${config.name}๊ฅ ใ`

    return await message.reply(text, true)
  }
}
