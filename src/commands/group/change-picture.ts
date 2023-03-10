import i18n from "../../libs/international"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "gpicture"

export default <Command>{
  category: "group",
  aliases: ["gcpicture", "gprofile", "gcprofile"],
  desc: "Change group profile picture",
  groupOnly: true,
  adminGroup: true,
  botGroupAdmin: true,
  example: `
  Send a image message with caption
  @PREFIX@CMD
  --------
  or Reply a image message with text
  @PREFIX@CMD
  --------
  If you want to crop the image
  @PREFIX@CMD crop
  --------
  `.trimEnd(),
  execute: async ({ aruga, message, arg, group }) => {
    if (message.type.includes("image") || (message.quoted && message.quoted.type.includes("image"))) {
      const imgBuffer: Buffer = message.quoted
        ? await aruga.downloadMediaMessage(message.quoted.message)
        : await aruga.downloadMediaMessage(message.message)
      const crop = arg && arg.toLowerCase() === "crop"

      await aruga.updateProfilePicture(message.from, imgBuffer, crop)

      const text =
        "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
        "โ\n" +
        `โ ${i18n.translate("commands.group.change-picture", { "@ADM": `@${message.sender.split("@")[0]}` }, group.language)}\n` +
        "โ\n" +
        `โโโใ ๊ฅ${config.name}๊ฅ ใ`

      return await message.reply(text, true)
    }

    throw "noCmd"
  }
}
