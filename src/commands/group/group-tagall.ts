import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "tagall"

export default <Command>{
  category: "group",
  aliases: ["mentions", "mentionall"],
  desc: "Mention all participants",
  groupOnly: true,
  adminGroup: true,
  example: `
  Tags all participants w/o description
  @PREFIX@CMD description

  eg, @PREFIX@CMD hello everyone!
  --------
  `.trimEnd(),
  execute: async ({ aruga, message, arg }) => {
    const participantsId = message.groupMetadata.participants.map((v) => v.id)

    const text =
      "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
      (arg && "โ\n" + `โ ${arg}\n` + "โ\n" + "โฃโโโโโโโโโโโโโโโโโโ\n") +
      "โ\n" +
      `${participantsId.map((id) => "โ @" + id.split("@")[0]).join("\n")}\n` +
      "โ\n" +
      `โโโใ ๊ฅ${config.name}๊ฅ ใ`

    return await aruga.sendMessage(message.from, { text, mentions: participantsId }, { quoted: message, ephemeralExpiration: message.expiration })
  }
}
