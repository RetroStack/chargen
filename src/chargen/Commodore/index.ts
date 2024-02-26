import type { CharacterSetType } from "../../type/charset";

import C64 from "./C64";
import C128 from "./C128";
import PET from "./PET";
import VIC20 from "./VIC20";

const charsets: CharacterSetType = [...C64, ...C128, ...PET, ...VIC20];

export default charsets;
