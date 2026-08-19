export * from "./types";
import type { OlayTanimi } from "./types";
import { OLAY_HAPIS } from "./hapis";
import { OLAY_YOLCULUK } from "./yolculuk";
import { OLAY_HIZIP } from "./hizip";
import { OLAY_ORTACAG_ASKER } from "./ortaCagAsker";
import { OLAY_ORTACAG_TUCCAR } from "./ortaCagTuccar";
import { OLAY_ORTACAG_DINADAMI } from "./ortaCagDinAdami";
import { OLAY_SANAYI_ASKER } from "./sanayiAsker";
import { OLAY_SANAYI_TUCCAR } from "./sanayiTuccar";
import { OLAY_SANAYI_DINADAMI } from "./sanayiDinAdami";
import { OLAY_EVCIL_HAYVAN } from "./evcilHayvan";
import { OLAY_ESYA_VE_GIZEM } from "./esyaVeGizem";
import { OLAY_AILE } from "./aile";
import { OLAY_ILISKILER } from "./iliskiler";
import { OLAY_GENEL } from "./genel";

export const OLAY_BANKASI: OlayTanimi[] = [
  ...OLAY_HAPIS,
  ...OLAY_YOLCULUK,
  ...OLAY_HIZIP,
  ...OLAY_ORTACAG_ASKER,
  ...OLAY_ORTACAG_TUCCAR,
  ...OLAY_ORTACAG_DINADAMI,
  ...OLAY_SANAYI_ASKER,
  ...OLAY_SANAYI_TUCCAR,
  ...OLAY_SANAYI_DINADAMI,
  ...OLAY_EVCIL_HAYVAN,
  ...OLAY_ESYA_VE_GIZEM,
  ...OLAY_AILE,
  ...OLAY_ILISKILER,
  ...OLAY_GENEL,
];
