/**
 * WASticker Options
 */
export type StickerOptions = {
  /** Sticker Pack title
   * @default arugaz
   */
  pack?: string
  /** Sticker Pack Author
   * @default whatsapp-bot
   */
  author?: string
  /** Sticker Pack ID
   * @default random string
   */
  id?: string
  /** Sticker Categories
   * @default [] didnt have a category
   */
  categories?: Categories[]
  /** Result Width, since WASticker 1x1 it will set height too
   * @default 256
   */
  width?: number
  /** Result Fps
   * @default 25
   */
  fps?: number
  /**
   * Loop the result ?
   * @default true
   */
  loop?: boolean
  /**
   * Compress the result ? number 0 - 6
   * @default 0
   */
  compress?: number
}

type Love =
  | "โค"
  | "๐"
  | "๐"
  | "๐"
  | "๐ป"
  | "๐"
  | "๐ฉโโคโ๐ฉ"
  | "๐จโโคโ๐จ"
  | "๐"
  | "๐ฉโโคโ๐โ๐ฉ"
  | "๐จโโคโ๐โ๐จ"
  | "๐งก"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐ค"
  | "๐"
  | "โฃ"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "โฅ"
  | "๐"
  | "๐"
  | "๐ฉโโค๏ธโ๐โ๐ฉ"
  | "๐จโโค๏ธโ๐โ๐จ"
  | "๐ฉโโค๏ธโ๐จ"
  | "๐ฉโโค๏ธโ๐ฉ"
  | "๐จโโค๏ธโ๐จ"
  | "๐ฉโโค๏ธโ๐โ๐จ"
  | "๐ฌ"
  | "๐ญ"
  | "๐ซ"
  | "๐ฅฐ"
  | "๐"
  | "๐"
  | "๐"
  | "๐น"
  | "๐ฝ"
  | "โฃ๏ธ"
  | "โค๏ธ"
type Happy =
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐คฃ"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐คช"
  | "๐ค"
  | "๐บ"
  | "๐ธ"
  | "๐น"
  | "โบ"
  | "๐"
  | "๐"
  | "๐ค"
  | "๐"
type Sad =
  | "โน"
  | "๐ฃ"
  | "๐"
  | "๐ซ"
  | "๐ฉ"
  | "๐ข"
  | "๐ญ"
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐ค"
  | "๐ "
  | "๐ฅ"
  | "๐ฐ"
  | "๐จ"
  | "๐ฟ"
  | "๐พ"
  | "๐"
  | "๐โโ"
  | "๐โโ"
  | "๐"
  | "๐"
  | "๐ฅบ"
  | "๐ค"
  | "โ๏ธ"
  | "โ"
  | "๐ฉ"
  | "๐ง"
type Angry =
  | "๐ฏ"
  | "๐ฆ"
  | "๐ง"
  | "๐ฎ"
  | "๐ฒ"
  | "๐"
  | "๐ฑ"
  | "๐คฏ"
  | "๐ณ"
  | "โ"
  | "โ"
  | "๐คฌ"
  | "๐ก"
  | "๐ "
  | "๐"
  | "๐ฟ"
  | "๐พ"
  | "๐ค"
  | "๐ข"
  | "๐บ"
  | "๐ฏ๏ธ"
  | "๐"
  | "๐ฅต"
type Greet = "๐"
type Celebrate =
  | "๐"
  | "๐"
  | "๐"
  | "๐"
  | "๐ฏโโ๏ธ"
  | "๐ฏ"
  | "๐ฏโโ๏ธ"
  | "๐"
  | "๐บ"
  | "๐ฅ"
  | "โญ๏ธ"
  | "โจ"
  | "๐ซ"
  | "๐"
  | "๐"
  | "๐ป"
  | "๐ฅ"
  | "๐พ"
  | "๐"
  | "๐ฐ"

/**
 * Whatsapp sticker category
 *
 * refer to: https://github.com/WhatsApp/stickers/wiki/Tag-your-stickers-with-Emojis
 */
export type StickerCategories = Love | Happy | Sad | Angry | Greet | Celebrate
