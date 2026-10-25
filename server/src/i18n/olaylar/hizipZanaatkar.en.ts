import type { OlayCeviri } from "./index";

/**
 * server/src/data/olaylar/hizipZanaatkar.ts — İngilizce çevirileri.
 * Hizip adları: Lonca Meclisi → Guild Council, Serbest Ustalar → Free Masters.
 */
function c(
  baslik: string,
  metin: string,
  secenekler: [string, string, string, string, string, string][]
): OlayCeviri {
  return {
    baslik,
    metin,
    secenekler: secenekler.map(([m, bm, bd, fm, fd, _unused]) => ({
      metin: m,
      basariliSonuc: { mesaj: bm, detay: bd },
      basarisizSonuc: { mesaj: fm, detay: fd },
    })),
  };
}

export const OLAYLAR_HIZIP_ZANAATKAR_EN: Record<string, OlayCeviri> = {
  hizip_lonca_meclisi_sabit_tarife: c("Fixed Tariff",
    "The Council announced a single price tariff for the year. Selling below or above it will be punished.",
    [
      ["Follow the tariff to the letter.", "You followed the tariff; the Council held you up as an example.", "Order brings calm but narrow profit.", "The customer disliked the tariff and went to your neighbor.", "A fixed price doesn't bring fixed customers.", ""],
      ["Wink at the customer, discount a little.", "The discount filled your shop; nobody saw.", "The edge of a rule is wide.", "The inspector caught your discount; you were fined.", "The Council hears even small deviations.", ""],
    ]),
  hizip_lonca_meclisi_cirak_siniri: c("Apprentice Limit",
    "The Council gave every master at most two apprentices. Work has piled up in your shop; a third apprentice would help.",
    [
      ["Obey the rule, run the work with two.", "Work slowed but you're clean in the Council's eyes.", "Patience is a master's trade.", "You couldn't keep up; an order slipped away.", "Rules wear you out.", ""],
      ["Secretly work a third apprentice.", "Orders were met; nobody saw the third apprentice.", "Hidden labor, hidden profit.", "The third apprentice was reported; your shop was sealed.", "The Council counts apprentices.", ""],
    ]),
  hizip_lonca_meclisi_muhur_aidati: c("Seal Dues",
    "The Council renewed the master's seal. Every shop pays extra dues this year, or loses its seal.",
    [
      ["Pay the dues in full.", "Your seal was renewed; your name is safe in the ledger.", "A seal is a receipt of trust.", "The clerk wrote the sum wrong; you paid twice.", "Even order slips.", ""],
      ["Delay the dues and bargain.", "The Council granted time; you kept your earnings.", "If your word counts, you gain time.", "No extension; fine and dues were charged together.", "What's late, doubles.", ""],
    ]),
  hizip_lonca_meclisi_serbest_usta: c("Next-Door Neighbor",
    "A free master in the next street works without obeying the Council. Customers flock to him.",
    [
      ["Report him to the Council.", "His shop was closed; his customers came back to you.", "Order was kept, neighborliness broken.", "Your report got out; people on the street turned their backs.", "Whispers always come back.", ""],
      ["Look the other way.", "You stayed silent; the shop next door carried on.", "Some doors aren't knocked on.", "The Council took your silence as betrayal.", "Silence is complicity too.", ""],
    ]),
  hizip_lonca_meclisi_denetim: c("Inspection Day",
    "A Council inspector walked into your shop unannounced. He will check measures, standards and your ledger.",
    [
      ["Show every ledger in full.", "The inspector found everything in order; your name was praised.", "Clean books, easy sleep.", "A small bookkeeping slip got you fined.", "Even the most careful hand errs.", ""],
      ["Soften the inspector with a gift.", "The inspector looked away, but it cost you a gift.", "Silence has a price.", "The gift was taken as a bribe; the Council fined you heavily.", "A gift to the wrong door burns.", ""],
    ]),
  hizip_lonca_meclisi_baskan_secimi: c("Council Chair",
    "The Council's chair election is near. Two candidates ask for your support: one strict, one flexible.",
    [
      ["Back the strict candidate.", "Your candidate won; your word weighs more in the Council.", "Standing with the strong brings standing.", "Your candidate lost; the new chair will remember you.", "Wrong horse, long road.", ""],
      ["Abstain from voting.", "You tied yourself to no one; no one asked you.", "Neutrality is also a stance.", "Your abstention was taken as cowardice.", "Silence doesn't please everyone.", ""],
    ]),
  hizip_lonca_meclisi_yangin_sandigi: c("Fire Chest",
    "A shop on your street burned down. The Council asks everyone for a share to the relief chest.",
    [
      ["Give your share generously.", "The victim stood up again; the Council praised you.", "What you give returns, though late.", "The chest was badly managed; your money was wasted.", "Kindness doesn't always find its place.", ""],
      ["Give the minimum share.", "You paid your debt; nobody mentioned you.", "Little given, little love.", "Your stinginess was talked about in the Council.", "A small purse casts a long shadow.", ""],
    ]),
  hizip_lonca_meclisi_usta_sinavi: c("Mastery Jury",
    "The Council picked you for a young journeyman's mastery exam jury. His work is beautiful but flawed.",
    [
      ["Approve the work.", "The journeyman became a master; he is grateful to your shop.", "A generous jury makes a loyal journeyman.", "The flaw came out later; the jury's name was shaken.", "Looking away has a price.", ""],
      ["Demand a fix first.", "He fixed the work; the bar was raised.", "Strictness protects the craft.", "The journeyman was hurt; the Council found you harsh.", "A true word sometimes leaves you alone.", ""],
    ]),

  hizip_serbest_ustalar_serbest_fiyat: c("Your Own Price",
    "Free Masters set their own prices. An expensive order came this week; you'll name the price.",
    [
      ["Name a bold price.", "The customer accepted without haggling.", "Those who know their worth win.", "The customer looked at the price and left.", "Price takes courage, and luck.", ""],
      ["Quote near the market price.", "The order closed with a fair profit.", "A measured step doesn't stumble.", "The order shrank, and so did the profit.", "The safe road is narrow.", ""],
    ]),
  hizip_serbest_ustalar_cirak_kapisi: c("Open Door",
    "No one limits apprentices. Six young hopefuls came to your door.",
    [
      ["Take them all, grow the shop.", "The shop grew; orders are being met.", "Growth tires but pays.", "Half of the apprentices quit; the costs stayed.", "A crowd is not labor.", ""],
      ["Pick the most gifted one.", "The one apprentice turned out surprisingly good.", "Few but good.", "The one you chose wasn't as good as you thought.", "Eyes can err.", ""],
    ]),
  hizip_serbest_ustalar_meclis_baskisi: c("The Council's Warning",
    "Two Guild Council men came to your shop: return to order, or find no supplies.",
    [
      ["Stand firm, don't back down.", "You didn't back down; the Free Masters lifted you up.", "Courage creates company.", "Suppliers stopped selling to you.", "A show of strength is costly.", ""],
      ["Give a soothing word.", "You bought time, but your friends will question you.", "Peace isn't free.", "Neither the Council nor your friends trust you now.", "Whoever sits on two chairs falls.", ""],
    ]),
  hizip_serbest_ustalar_ortak_atolye: c("Shared Workshop",
    "Several Free Masters propose a shared workshop to split the rent.",
    [
      ["Join the partnership.", "Costs were split; work sped up.", "Together the load is light.", "The partners couldn't agree; part of your money was lost.", "A partnership is also a test.", ""],
      ["Carry on alone.", "Your own order wasn't disturbed.", "A lonely road is sometimes a sturdy road.", "Rent was heavy this year.", "Solitude has a bill.", ""],
    ]),
  hizip_serbest_ustalar_yasak_teknik: c("Forbidden Technique",
    "A free master offers to teach you a new finishing technique the Council has banned.",
    [
      ["Learn the technique.", "Your pieces shone; demand grew.", "Novelty opens the door.", "The technique failed; material was wasted.", "Not every novelty works.", ""],
      ["Stick to the old method.", "Your practiced hand again produced clean work.", "The old way also walks.", "Your rivals pulled ahead with the new method.", "Standing still is falling behind.", ""],
    ]),
  hizip_serbest_ustalar_yabanci_siparis: c("Foreign Customer",
    "A merchant from afar wants a big order from the Free Masters. The deadline is tight.",
    [
      ["Accept the order.", "You delivered on time; the merchant will return.", "Bold labor gets paid.", "Delivery was late; the merchant stopped paying.", "Big work, big risk.", ""],
      ["Make only a small part.", "The small part was delivered cleanly.", "A calculated step is a safe step.", "The merchant ignored the small job.", "Small job, small attention.", ""],
    ]),
  hizip_serbest_ustalar_dayanisma_fonu: c("Solidarity Fund",
    "Free Masters are setting up a shared fund for colleagues who fall ill or lose money.",
    [
      ["Contribute regularly.", "The fund kept a master afloat in a hard time.", "Solidarity is a net.", "The fund's keeper vanished; you never saw the money.", "Trust is tested too.", ""],
      ["Stay out, protect your savings.", "Your savings were safe; nobody said a word.", "Cold arithmetic stays quiet.", "Your distance hurt your friends.", "Lonely wealth is cold.", ""],
    ]),
  hizip_serbest_ustalar_meclise_donus: c("Offer to Return",
    "The Guild Council is ready to forgive you: give up being a free master and your penalties are erased.",
    [
      ["Refuse the offer.", "You kept your side; the Free Masters drew strength from you.", "Independence has a high price.", "Because of your refusal, your old penalties reopened.", "Burning the bridge is easy.", ""],
      ["Negotiate, meet halfway.", "Your penalties were reduced, but some friends are angry.", "A compromise doesn't suit everyone.", "Both sides found you untrustworthy.", "Whoever stays in the middle is crushed.", ""],
    ]),
};
