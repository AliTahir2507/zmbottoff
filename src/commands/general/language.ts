import { readFile } from "fs/promises"
import { join as pathJoin } from "path"
import i18n from "../../libs/international"
import config from "../../utils/config"
import { database } from "../../libs/whatsapp"
import type { Command } from "../../types/command"

export default <Command>{
  category: "general",
  aliases: ["lang"],
  desc: "Show/Set user language",
  privateOnly: true,
  execute: async ({ aruga, message, prefix, args, user, command }) => {
    const listLanguages: {
      iso: string
      lang: string
    }[] = JSON.parse(await readFile(pathJoin(__dirname, "..", "..", "..", "database", "languages.json"), "utf-8"))

    if (args.length >= 1 && !!listLanguages.find((value) => value.iso === args[0])) {
      const lang = listLanguages.find((value) => value.iso === args[0])
      const user = await database.updateUser(message.sender, { language: lang.iso })
      return await message.reply(i18n.translate("commands.general.language.changed", { "@LANGUAGE": lang.lang }, user.language), true)
    }

    const text =
      "\n\n" +
      "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
      "โ\n" +
      `โ ${i18n.translate("commands.general.language.text", {}, user.language)}\n` +
      "โ\n" +
      `โโโใ ๊ฅ${config.name}๊ฅ ใ` +
      "\n\n"

    return await aruga.sendMessage(
      message.from,
      {
        title: `*${i18n.translate("commands.general.language.title", {}, user.language)}*`,
        text,
        footer: config.footer,
        buttonText: i18n.translate("commands.general.language.buttonText", {}, user.language),
        sections: [
          {
            rows: listLanguages
              .filter((v) => i18n.listLanguage().includes(v.iso))
              .sort((first, last) => first.lang.localeCompare(last.lang))
              .map((value) => {
                return {
                  title: value.lang,
                  rowId: `${prefix}${command} ${value.iso}`
                }
              })
          }
        ]
      },
      { ephemeralExpiration: message.expiration }
    )
  }
}
