export * from "./types";
import type { OlayTanimi } from "./types";
import { OLAY_HAPIS } from "./hapis";
import { OLAY_YOLCULUK } from "./yolculuk";
import { OLAY_HIZIP } from "./hizip";
import { OLAY_HIZIP_ZANAATKAR } from "./hizipZanaatkar";
import { OLAY_ORTACAG_ASKER } from "./ortaCagAsker";
import { OLAY_ORTACAG_ASKER_YOLLARI } from "./ortaCagAskerYollari";
import { OLAY_ORTACAG_TUCCAR } from "./ortaCagTuccar";
import { OLAY_ORTACAG_TUCCAR_YOLLARI } from "./ortaCagTuccarYollari";
import { OLAY_ORTACAG_DINADAMI } from "./ortaCagDinAdami";
import { OLAY_ORTACAG_DINADAMI_YOLLARI } from "./ortaCagDinAdamiYollari";
import { OLAY_SANAYI_ASKER } from "./sanayiAsker";
import { OLAY_SANAYI_ASKER_YOLLARI } from "./sanayiAskerYollari";
import { OLAY_SANAYI_TUCCAR } from "./sanayiTuccar";
import { OLAY_SANAYI_TUCCAR_YOLLARI } from "./sanayiTuccarYollari";
import { OLAY_SANAYI_DINADAMI } from "./sanayiDinAdami";
import { OLAY_SANAYI_DINADAMI_YOLLARI } from "./sanayiDinAdamiYollari";
import { OLAY_ORTACAG_ZANAATKAR } from "./ortaCagZanaatkar";
import { OLAY_ORTACAG_ZANAATKAR_YOLLARI } from "./ortaCagZanaatkarYollari";
import { OLAY_SANAYI_ZANAATKAR } from "./sanayiZanaatkar";
import { OLAY_SANAYI_ZANAATKAR_YOLLARI } from "./sanayiZanaatkarYollari";
import { OLAY_EVCIL_HAYVAN } from "./evcilHayvan";
import { OLAY_EVCIL_HAYVAN_KOPEK } from "./evcilHayvanKopek";
import { OLAY_EVCIL_HAYVAN_KEDI } from "./evcilHayvanKedi";
import { OLAY_EVCIL_HAYVAN_SAHIN } from "./evcilHayvanSahin";
import { OLAY_EVCIL_HAYVAN_KARGA } from "./evcilHayvanKarga";
import { OLAY_EVCIL_HAYVAN_AT } from "./evcilHayvanAt";
import { OLAY_ESYA_VE_GIZEM } from "./esyaVeGizem";
import { OLAY_AILE } from "./aile";
import { OLAY_ILISKILER } from "./iliskiler";
import { OLAY_GENEL } from "./genel";
import { OLAY_EVLILIK_AILE } from "./evlilikVeAile";
import { OLAY_ARANMA_SEVIYESI } from "./aranmaSeviyesi";
import { OLAY_SOSYALLESME } from "./sosyallesme";
import { OLAY_KURESEL } from "./kureselOlaylar";
import { OLAY_VEBA_HASTALIGI } from "./vebaHastaligi";
import { OLAY_KOMIK_OLUM } from "./komikOlumler";
import { OLAY_KOMIK_GARIP } from "./komikGaripOlaylar";
import { OLAY_MULK } from "./mulkOlaylari";
import { OLAY_BUYULU } from "./buyuluOlaylar";
import { OLAY_BOLGESEL_ORTACAG } from "./bolgeselOrtaCag";
import { OLAY_BOLGESEL_SANAYI } from "./bolgeselSanayi";
import { OLAY_GECIKMIS_TAKIP } from "./gecikmisTakip";
import { OLAY_SAGLIK_ESIK_25, OLAY_SAGLIK_ESIK_10 } from "./saglikKritik";
import { OLAY_MESLEK_YATKINLIK } from "./meslekYatkinlikOlaylari";
import { OLAY_VERGI } from "./vergiOlaylari";
import { OLAY_OTORITE } from "./otoriteOlaylari";

export const OLAY_BANKASI: OlayTanimi[] = [
  ...OLAY_HAPIS,
  ...OLAY_ARANMA_SEVIYESI,
  ...OLAY_SOSYALLESME,
  ...OLAY_KURESEL,
  ...OLAY_VEBA_HASTALIGI,
  ...OLAY_KOMIK_OLUM,
  ...OLAY_KOMIK_GARIP,
  ...OLAY_MULK,
  ...OLAY_BUYULU,
  ...OLAY_BOLGESEL_ORTACAG,
  ...OLAY_BOLGESEL_SANAYI,
  ...OLAY_GECIKMIS_TAKIP,
  ...OLAY_SAGLIK_ESIK_25,
  ...OLAY_SAGLIK_ESIK_10,
  ...OLAY_YOLCULUK,
  ...OLAY_HIZIP,
  ...OLAY_HIZIP_ZANAATKAR,
  ...OLAY_ORTACAG_ASKER,
  ...OLAY_ORTACAG_ASKER_YOLLARI,
  ...OLAY_ORTACAG_TUCCAR,
  ...OLAY_ORTACAG_TUCCAR_YOLLARI,
  ...OLAY_ORTACAG_DINADAMI,
  ...OLAY_ORTACAG_DINADAMI_YOLLARI,
  ...OLAY_SANAYI_ASKER,
  ...OLAY_SANAYI_ASKER_YOLLARI,
  ...OLAY_SANAYI_TUCCAR,
  ...OLAY_SANAYI_TUCCAR_YOLLARI,
  ...OLAY_SANAYI_DINADAMI,
  ...OLAY_SANAYI_DINADAMI_YOLLARI,
  ...OLAY_ORTACAG_ZANAATKAR,
  ...OLAY_ORTACAG_ZANAATKAR_YOLLARI,
  ...OLAY_SANAYI_ZANAATKAR,
  ...OLAY_SANAYI_ZANAATKAR_YOLLARI,
  ...OLAY_EVCIL_HAYVAN,
  ...OLAY_EVCIL_HAYVAN_KOPEK,
  ...OLAY_EVCIL_HAYVAN_KEDI,
  ...OLAY_EVCIL_HAYVAN_SAHIN,
  ...OLAY_EVCIL_HAYVAN_KARGA,
  ...OLAY_EVCIL_HAYVAN_AT,
  ...OLAY_ESYA_VE_GIZEM,
  ...OLAY_AILE,
  ...OLAY_ILISKILER,
  ...OLAY_GENEL,
  ...OLAY_EVLILIK_AILE,
  ...OLAY_MESLEK_YATKINLIK,
  ...OLAY_VERGI,
  ...OLAY_OTORITE,
];
