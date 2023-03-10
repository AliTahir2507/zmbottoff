import { Role } from "@prisma/client"
import i18n from "../../libs/international"
import { database } from "../../libs/whatsapp"
import config from "../../utils/config"
import type { Command } from "../../types/command"

export const name = "user"

export default <Command>{
  category: "owner",
  desc: "Show/Change user information",
  cd: 1,
  ownerOnly: true,
  example: `
  Change user role
  @PREFIX@CMD role <number> <role>
  
  eg, @PREFIX@CMD role 62895xx basic
  
  Role list: ${Object.keys(Role).join(", ").trimEnd()}
  --------
  `.trimEnd(),
  execute: async ({ aruga, message, args, user }) => {
    if (args.length === 3 && args[0].toLowerCase() === "role") {
      const number = args[1].replace(/\D+/g, "").trim()
      const role = args[2].toLowerCase().trim() as Role

      const members = await aruga.onWhatsApp(number)
      if (!members.length || !members[0].exists) {
        const text =
          "โโโใ ๐ฉ ๐ปษชแดแดแดษด ๐นษชษดแดแดส โฃ๐ช ใ\n" +
          "โ\n" +
          `โ ${i18n.translate("default.onWhatsApp", { "@NUM": number }, user.language)}\n` +
          "โ\n" +
          `โโโใ ๊ฅ${config.name}๊ฅ ใ`

        return await message.reply(text, true)
      }

      if (!Object.keys(Role).includes(role)) throw "noCmd"

      const expire = new Date(Date.now())
      expire.setDate(expire.getDate() + config.user[role].expires ? config.user[role].expires : 0)
      const updatedUser = await database.updateUser(members[0].jid, {
        role: role,
        expire: config.user[role].expires ? expire.getTime() : 0,
        limit: config.user[role].limit || 30
      })

      return await message.reply(JSON.stringify(updatedUser, null, 2))
    }

    throw "noCmd"
  }
}
