import type { OlayTanimi } from "./types";

/**
 * MESLEĞE YATKINLIK KADEMESİ olayları (2026-09 sonu, kullanıcı isteği:
 * "mesleklere yatkınlık daha çok şeyi etkilesin ... olaylar çıksın bazı
 * olaylarda şıklar kapansın"). `state.meslek_yatkinlik_seviyesi` (1=kötü,
 * 2=nötr, 3=iyi, 4=mükemmel — bkz. data/meslekYatkinlik.ts) meslek seçilirken
 * bir kez sabitlenir; bu dosyadaki olaylar bu kademeyi hem OLAY seviyesinde
 * (`minMeslekYatkinlikSeviye`/`maxMeslekYatkinlikSeviye` — bazı olaylar
 * yalnız belirli kademede hiç çıkmaz) hem SEÇENEK seviyesinde (aynı alanlar
 * bir seçeneğe konursa yalnız o şık kilitlenir/açılır, olay yine herkese
 * çıkar) kullanır. Bu, sistemin altyapısını kanıtlayan küçük, temsili bir
 * havuzdur — normal havuzdan dışlanmaz, standart ağırlıklı seçime dahildir.
 */
export const OLAY_MESLEK_YATKINLIK: OlayTanimi[] = [
  {
    id: "myk_asker_ordugah_meydan_okumasi",
    kategori: "savas",
    meslekler: ["Asker"],
    minYas: 18,
    agirlik: 0.8,
    gorsel: "⚔️",
    baslik: "Meydan Okuma",
    metin:
      "Ordugâhta can sıkıntısından bir meydan okuma başladı: silah ustalığını herkesin önünde kanıtlama şansı. Kalabalık seni izliyor.",
    secenekler: [
      {
        metin: "Ustaca bir hamleyle rakibini yere ser.",
        baseBasariSansi: 55,
        minMeslekYatkinlikSeviye: 3,
        kilitAciklamasi: "Bu hamle için yeterince yetenekli değilsin — daha temkinli bir şey dene.",
        basariliSonuc: {
          un: 6,
          mutluluk: 3,
          para: 4,
          mesaj: "Kalabalığın gözü önünde rakibini alt ettin; adın ordugâhta bir süre konuşuldu.",
        },
        basarisizSonuc: {
          saglik: -6,
          mutluluk: -3,
          mesaj: "Hamle tuttu ama zamanlaman kötüydü; sertçe yere çakıldın.",
        },
      },
      {
        metin: "Temkinli oyna, sadece savunmada kal.",
        baseBasariSansi: 78,
        basariliSonuc: {
          mutluluk: 2,
          mesaj: "Kimseyi etkilemedin ama kimseye de malzeme olmadın; iş bitti.",
        },
        basarisizSonuc: {
          saglik: -3,
          mutluluk: -2,
          mesaj: "Savunmada bile zorlandın; birkaç sert darbe yedin.",
        },
      },
      {
        metin: "Meydan okumaya hiç girme.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mutluluk: -1,
          mesaj: "Kenara çekildin. Kimse bir şey demedi ama sen bildin.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_tuccar_ozel_teklif",
    kategori: "ticaret",
    meslekler: ["Tüccar"],
    minYas: 20,
    minMeslekYatkinlikSeviye: 3,
    agirlik: 0.9,
    gorsel: "🤝",
    baslik: "Sadece Sana Özel",
    metin:
      "Piyasadaki keskin gözün fark edildi. Tanımadığın bir tüccar, düşük riskli ama kazançlı bir ortaklık teklifiyle geldi — herkese açılmayan, senin gibi keskin bir göz için ayrılmış bir fırsat bu.",
    secenekler: [
      {
        metin: "Teklifi kabul et, sermayeni ortaya koy.",
        baseBasariSansi: 68,
        maliyet: 10,
        basariliSonuc: {
          para: 22,
          un: 2,
          ticaret_sermaye_artis: 6,
          mesaj: "Sezgin haklı çıktı; ortaklık beklediğinden de kazançlı oldu.",
        },
        basarisizSonuc: {
          para: -10,
          mutluluk: -3,
          mesaj: "Ortaklık göründüğü kadar parlak değilmiş; sermayenin bir kısmını geri alamadın.",
        },
      },
      {
        metin: "Kibarca reddet, riske girme.",
        baseBasariSansi: 100,
        basariliSonuc: {
          mesaj: "Fırsatı geri çevirdin. İçinden 'ya tutsaydı' diye geçirdin ama para cebinde kaldı.",
        },
        basarisizSonuc: { mesaj: "Kullanılmadı." },
      },
    ],
  },
  {
    id: "myk_din_gunahkarin_yuku",
    kategori: "din",
    meslekler: ["Din Adamı"],
    minYas: 18,
    maxMeslekYatkinlikSeviye: 1,
    agirlik: 1,
    ton: "agir",
    gorsel: "😔",
    baslik: "Cemaatin Şüphesi",
    metin:
      "Vaazların sana hiç yakışmıyor; kendi içindeki çelişkiler kürsüden dökülüyor. Cemaatten yaşlı bir adam seni bir kenara çekip açıkça soruyor: 'Sen buna gerçekten inanıyor musun evlat?'",
    secenekler: [
      {
        metin: "Dürüst ol, şüphelerini paylaş.",
        baseBasariSansi: 60,
        basariliSonuc: {
          ahlak: 5,
          un: -3,
          mutluluk: 2,
          mesaj: "Dürüstlüğün onu şaşırttı ama saygısını kazandın; en azından yalan söylemiyorsun.",
        },
        basarisizSonuc: {
          un: -6,
          mutluluk: -3,
          mesaj: "Sözlerin cemaat arasında hızla yayıldı; sana bakışları değişti.",
        },
      },
      {
        metin: "Rolüne sarıl, inançlıymış gibi davran.",
        baseBasariSansi: 65,
        basariliSonuc: {
          un: 3,
          ahlak: -3,
          mesaj: "İnandırıcı davrandın; adam ikna oldu ve gitti. İçin biraz daha boşaldı.",
        },
        basarisizSonuc: {
          ahlak: -4,
          mutluluk: -4,
          mesaj: "Sahteliğin gözünden okundu; adam başını sallayıp uzaklaştı.",
        },
      },
    ],
  },
  {
    id: "myk_zanaatkar_ustalik_sinavi",
    kategori: "zanaat",
    meslekler: ["Zanaatkâr"],
    minYas: 20,
    agirlik: 0.8,
    gorsel: "🔨",
    baslik: "Ustalık Sınavı",
    metin:
      "Lonca, atölyene alışılmadık bir sipariş bıraktı: sıradan bir onarımın yanı sıra, isteyen ustalar için tamamen yeni bir teknik deneme şansı da tanınıyor. Risk büyük, ama başarırsan adın yıllarca anılır.",
    secenekler: [
      {
        metin: "Tamamen yeni bir teknik icat etmeyi dene.",
        baseBasariSansi: 45,
        minMeslekYatkinlikSeviye: 4,
        kilitAciklamasi: "Bunu denemek için elin henüz yeterince usta değil.",
        basariliSonuc: {
          un: 8,
          para: 6,
          unvan_kazan: "Yenilikçi Usta",
          mesaj: "Denemen tuttu! Loncanın en usta elleri bile senin buluşunu konuşuyor.",
        },
        basarisizSonuc: {
          para: -8,
          mutluluk: -3,
          mesaj: "Malzemeyi ziyan ettin; teknik daha olgunlaşmamış. Yine de kimse çabana kızmadı.",
        },
      },
      {
        metin: "Güvenli yoldan git, sıradan onarımı yap.",
        baseBasariSansi: 85,
        basariliSonuc: {
          para: 5,
          mesaj: "İş sorunsuz bitti; kimse hayal kırıklığına uğramadı, kimse de hayrete düşmedi.",
        },
        basarisizSonuc: {
          para: -3,
          mesaj: "Basit işte bile ufak bir aksilik çıktı; loncaya küçük bir tazminat ödedin.",
        },
      },
    ],
  },
];
