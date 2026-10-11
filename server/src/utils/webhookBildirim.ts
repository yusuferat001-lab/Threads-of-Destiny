/**
 * Yeni bir geri bildirim geldiğinde geliştiriciye anlık haber verir.
 *
 * `GERI_BILDIRIM_WEBHOOK_URL` tanımlıysa oraya bir POST atar:
 *   - Discord webhook'u  → gövde `{ content }` (URL "discord.com/api/webhooks/..." biçiminde)
 *   - Telegram bot API'si → gövde `{ chat_id, text }` (URL "api.telegram.org/bot<TOKEN>/sendMessage",
 *     ayrıca `GERI_BILDIRIM_TELEGRAM_CHAT_ID` gerekir)
 *
 * Ateşle-unut: ağ hatası / geçersiz webhook ana isteği ETKİLEMEZ, sadece log'a düşer.
 */
export async function webhookBildirimGonder(metin: string): Promise<void> {
  const url = process.env.GERI_BILDIRIM_WEBHOOK_URL;
  if (!url) return;

  const telegram = url.includes("api.telegram.org");
  const govde = telegram
    ? { chat_id: process.env.GERI_BILDIRIM_TELEGRAM_CHAT_ID, text: metin.slice(0, 4000) }
    : {
        content: metin.slice(0, 1900), // Discord içerik limiti 2000
        // Kullanıcı mesajı "@everyone"/rol etiketi içerse bile kimseyi etiketleme.
        allowed_mentions: { parse: [] as string[] },
      };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(govde),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("Geri bildirim webhook'u gönderilemedi:", err);
  }
}
