import type { CharacterSetType } from "../../type/charset";

import ZX81 from "./ZX81";
import ZXSpectrum from "./ZXSpectrum";

const charsets: CharacterSetType = [...ZX81, ...ZXSpectrum];

export default charsets;
