import type { CharacterSetType } from "../../type/charset";

const charset: CharacterSetType = [
  {
    title: "CG 3 - for Model I",
    source: "xtrs",
    notes: `BDF font from Al Petrofsky, probably adapted from another
    emulator. This is not the real Model I font, which used a 6x12
    matrix; it seems to be a modified version of the 8x12 Model III
    font. Not the right size for Model 1`,
    system: "?",
    dataWidth: 8,
    data: [
      [62, 65, 1, 49, 73, 73, 62, 0],
      [12, 18, 33, 33, 63, 33, 33, 0],
      [62, 17, 17, 30, 17, 17, 62, 0],
      [30, 33, 32, 32, 32, 33, 30, 0],
      [62, 17, 17, 17, 17, 17, 62, 0],
      [63, 32, 32, 60, 32, 32, 63, 0],
      [63, 32, 32, 60, 32, 32, 32, 0],
      [31, 32, 32, 39, 33, 33, 31, 0],
      [33, 33, 33, 63, 33, 33, 33, 0],
      [28, 8, 8, 8, 8, 8, 28, 0],
      [1, 1, 1, 1, 1, 33, 30, 0],
      [33, 34, 36, 56, 36, 34, 33, 0],
      [32, 32, 32, 32, 32, 32, 63, 0],
      [65, 99, 85, 73, 65, 65, 65, 0],
      [33, 49, 41, 37, 35, 33, 33, 0],
      [30, 33, 33, 33, 33, 33, 30, 0],
      [62, 33, 33, 62, 32, 32, 32, 0],
      [30, 33, 33, 33, 37, 34, 29, 0],
      [62, 33, 33, 62, 36, 34, 33, 0],
      [30, 33, 32, 30, 1, 33, 30, 0],
      [127, 8, 8, 8, 8, 8, 8, 0],
      [33, 33, 33, 33, 33, 33, 30, 0],
      [65, 65, 65, 65, 34, 20, 8, 0],
      [65, 65, 65, 73, 85, 99, 65, 0],
      [33, 33, 18, 12, 18, 33, 33, 0],
      [65, 65, 34, 28, 8, 8, 8, 0],
      [127, 2, 4, 8, 16, 32, 127, 0],
      [8, 28, 42, 73, 8, 8, 8, 0],
      [8, 8, 8, 73, 42, 28, 8, 0],
      [0, 16, 32, 127, 32, 16, 0, 0],
      [0, 4, 2, 127, 2, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 127],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [8, 8, 8, 8, 8, 0, 8, 0],
      [18, 18, 18, 0, 0, 0, 0, 0],
      [18, 18, 63, 18, 63, 18, 18, 0],
      [8, 63, 72, 62, 9, 126, 8, 0],
      [0, 49, 2, 4, 8, 16, 35, 0],
      [28, 34, 20, 24, 37, 34, 29, 0],
      [12, 12, 8, 16, 0, 0, 0, 0],
      [4, 8, 16, 16, 16, 8, 4, 0],
      [16, 8, 4, 4, 4, 8, 16, 0],
      [8, 42, 28, 127, 28, 42, 8, 0],
      [0, 8, 8, 62, 8, 8, 0, 0],
      [0, 0, 0, 0, 12, 12, 8, 16],
      [0, 0, 0, 63, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 24, 0],
      [0, 2, 4, 8, 16, 32, 0, 0],
      [30, 33, 35, 37, 41, 49, 30, 0],
      [8, 24, 8, 8, 8, 8, 28, 0],
      [30, 33, 1, 30, 32, 32, 63, 0],
      [30, 33, 1, 14, 1, 33, 30, 0],
      [2, 6, 10, 18, 63, 2, 2, 0],
      [63, 32, 62, 1, 1, 33, 30, 0],
      [14, 16, 32, 62, 33, 33, 30, 0],
      [63, 1, 2, 4, 8, 8, 8, 0],
      [30, 33, 33, 30, 33, 33, 30, 0],
      [30, 33, 33, 31, 1, 2, 28, 0],
      [0, 12, 0, 0, 0, 12, 0, 0],
      [0, 12, 0, 0, 12, 12, 8, 16],
      [2, 4, 8, 16, 8, 4, 2, 0],
      [0, 0, 63, 0, 63, 0, 0, 0],
      [16, 8, 4, 2, 4, 8, 16, 0],
      [60, 66, 2, 12, 16, 0, 16, 0],
      [62, 65, 1, 49, 73, 73, 62, 0],
      [12, 18, 33, 33, 63, 33, 33, 0],
      [62, 17, 17, 30, 17, 17, 62, 0],
      [30, 33, 32, 32, 32, 33, 30, 0],
      [62, 17, 17, 17, 17, 17, 62, 0],
      [63, 32, 32, 60, 32, 32, 63, 0],
      [63, 32, 32, 60, 32, 32, 32, 0],
      [31, 32, 32, 39, 33, 33, 31, 0],
      [33, 33, 33, 63, 33, 33, 33, 0],
      [28, 8, 8, 8, 8, 8, 28, 0],
      [1, 1, 1, 1, 1, 33, 30, 0],
      [33, 34, 36, 56, 36, 34, 33, 0],
      [32, 32, 32, 32, 32, 32, 63, 0],
      [65, 99, 85, 73, 65, 65, 65, 0],
      [33, 49, 41, 37, 35, 33, 33, 0],
      [30, 33, 33, 33, 33, 33, 30, 0],
      [62, 33, 33, 62, 32, 32, 32, 0],
      [30, 33, 33, 33, 37, 34, 29, 0],
      [62, 33, 33, 62, 36, 34, 33, 0],
      [30, 33, 32, 30, 1, 33, 30, 0],
      [127, 8, 8, 8, 8, 8, 8, 0],
      [33, 33, 33, 33, 33, 33, 30, 0],
      [65, 65, 65, 65, 34, 20, 8, 0],
      [65, 65, 65, 73, 85, 99, 65, 0],
      [33, 33, 18, 12, 18, 33, 33, 0],
      [65, 65, 34, 28, 8, 8, 8, 0],
      [127, 2, 4, 8, 16, 32, 127, 0],
      [8, 28, 42, 8, 8, 8, 8, 0],
      [8, 8, 8, 8, 42, 28, 8, 0],
      [0, 16, 32, 127, 32, 16, 0, 0],
      [0, 4, 2, 127, 2, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 127],
      [12, 18, 16, 56, 16, 17, 62, 0],
      [0, 0, 30, 1, 31, 33, 31, 0],
      [32, 32, 46, 49, 33, 49, 46, 0],
      [0, 0, 30, 33, 32, 33, 30, 0],
      [1, 1, 29, 35, 33, 35, 29, 0],
      [0, 0, 30, 33, 63, 32, 30, 0],
      [14, 17, 16, 56, 16, 16, 16, 0],
      [0, 0, 30, 33, 33, 31, 1, 30],
      [32, 32, 46, 49, 33, 33, 33, 0],
      [8, 0, 24, 8, 8, 8, 28, 0],
      [1, 0, 3, 1, 1, 33, 33, 30],
      [32, 32, 33, 34, 60, 34, 33, 0],
      [24, 8, 8, 8, 8, 8, 28, 0],
      [0, 0, 118, 73, 73, 73, 65, 0],
      [0, 0, 46, 49, 33, 33, 33, 0],
      [0, 0, 30, 33, 33, 33, 30, 0],
      [0, 0, 46, 49, 49, 46, 32, 32],
      [0, 0, 29, 35, 35, 29, 1, 1],
      [0, 0, 46, 49, 32, 32, 32, 0],
      [0, 0, 31, 32, 30, 1, 62, 0],
      [8, 8, 62, 8, 8, 9, 6, 0],
      [0, 0, 34, 34, 34, 34, 29, 0],
      [0, 0, 65, 65, 34, 20, 8, 0],
      [0, 0, 65, 73, 73, 73, 54, 0],
      [0, 0, 33, 18, 12, 18, 33, 0],
      [0, 0, 33, 33, 33, 31, 1, 30],
      [0, 0, 62, 4, 8, 16, 62, 0],
      [6, 8, 8, 48, 8, 8, 6, 0],
      [8, 8, 8, 0, 8, 8, 8, 0],
      [48, 8, 8, 6, 8, 8, 48, 0],
      [65, 34, 28, 127, 8, 127, 8, 8],
      [85, 42, 85, 42, 85, 42, 85, 42],
    ],
  },
  {
    title: 'CG 10 - charset including the German special chars ("Umlauts")',
    source: "xtrs",
    notes: `Version of CG 3 modified by Jenz Guenther to add the national characters used in the GENIE, a German TRS-80 clone.`,
    system: "?",
    dataWidth: 8,
    data: [
      [62, 65, 1, 49, 73, 73, 62, 0],
      [12, 18, 33, 33, 63, 33, 33, 0],
      [62, 17, 17, 30, 17, 17, 62, 0],
      [30, 33, 32, 32, 32, 33, 30, 0],
      [62, 17, 17, 17, 17, 17, 62, 0],
      [63, 32, 32, 60, 32, 32, 63, 0],
      [63, 32, 32, 60, 32, 32, 32, 0],
      [31, 32, 32, 39, 33, 33, 31, 0],
      [33, 33, 33, 63, 33, 33, 33, 0],
      [28, 8, 8, 8, 8, 8, 28, 0],
      [1, 1, 1, 1, 1, 33, 30, 0],
      [33, 34, 36, 56, 36, 34, 33, 0],
      [32, 32, 32, 32, 32, 32, 63, 0],
      [65, 99, 85, 73, 65, 65, 65, 0],
      [33, 49, 41, 37, 35, 33, 33, 0],
      [30, 33, 33, 33, 33, 33, 30, 0],
      [62, 33, 33, 62, 32, 32, 32, 0],
      [30, 33, 33, 33, 37, 34, 29, 0],
      [62, 33, 33, 62, 36, 34, 33, 0],
      [30, 33, 32, 30, 1, 33, 30, 0],
      [127, 8, 8, 8, 8, 8, 8, 0],
      [33, 33, 33, 33, 33, 33, 30, 0],
      [65, 65, 65, 65, 34, 20, 8, 0],
      [65, 65, 65, 73, 85, 99, 65, 0],
      [33, 33, 18, 12, 18, 33, 33, 0],
      [65, 65, 34, 28, 8, 8, 8, 0],
      [127, 2, 4, 8, 16, 32, 127, 0],
      [8, 28, 42, 73, 8, 8, 8, 0],
      [8, 8, 8, 73, 42, 28, 8, 0],
      [0, 16, 32, 127, 32, 16, 0, 0],
      [0, 4, 2, 127, 2, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 127],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [8, 8, 8, 8, 8, 0, 8, 0],
      [18, 18, 18, 0, 0, 0, 0, 0],
      [18, 18, 63, 18, 63, 18, 18, 0],
      [8, 63, 72, 62, 9, 126, 8, 0],
      [0, 49, 2, 4, 8, 16, 35, 0],
      [28, 34, 20, 24, 37, 34, 29, 0],
      [12, 12, 8, 16, 0, 0, 0, 0],
      [4, 8, 16, 16, 16, 8, 4, 0],
      [16, 8, 4, 4, 4, 8, 16, 0],
      [8, 42, 28, 127, 28, 42, 8, 0],
      [0, 8, 8, 62, 8, 8, 0, 0],
      [0, 0, 0, 0, 12, 12, 8, 16],
      [0, 0, 0, 63, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 24, 0],
      [0, 2, 4, 8, 16, 32, 0, 0],
      [30, 33, 35, 37, 41, 49, 30, 0],
      [8, 24, 8, 8, 8, 8, 28, 0],
      [30, 33, 1, 30, 32, 32, 63, 0],
      [30, 33, 1, 14, 1, 33, 30, 0],
      [2, 6, 10, 18, 63, 2, 2, 0],
      [63, 32, 62, 1, 1, 33, 30, 0],
      [14, 16, 32, 62, 33, 33, 30, 0],
      [63, 1, 2, 4, 8, 8, 8, 0],
      [30, 33, 33, 30, 33, 33, 30, 0],
      [30, 33, 33, 31, 1, 2, 28, 0],
      [0, 12, 0, 0, 0, 12, 0, 0],
      [0, 12, 0, 0, 12, 12, 8, 16],
      [2, 4, 8, 16, 8, 4, 2, 0],
      [0, 0, 63, 0, 63, 0, 0, 0],
      [16, 8, 4, 2, 4, 8, 16, 0],
      [60, 66, 2, 12, 16, 0, 16, 0],
      [62, 65, 1, 49, 73, 73, 62, 0],
      [12, 18, 33, 33, 63, 33, 33, 0],
      [62, 17, 17, 30, 17, 17, 62, 0],
      [30, 33, 32, 32, 32, 33, 30, 0],
      [62, 17, 17, 17, 17, 17, 62, 0],
      [63, 32, 32, 60, 32, 32, 63, 0],
      [63, 32, 32, 60, 32, 32, 32, 0],
      [31, 32, 32, 39, 33, 33, 31, 0],
      [33, 33, 33, 63, 33, 33, 33, 0],
      [28, 8, 8, 8, 8, 8, 28, 0],
      [1, 1, 1, 1, 1, 33, 30, 0],
      [33, 34, 36, 56, 36, 34, 33, 0],
      [32, 32, 32, 32, 32, 32, 63, 0],
      [65, 99, 85, 73, 65, 65, 65, 0],
      [33, 49, 41, 37, 35, 33, 33, 0],
      [30, 33, 33, 33, 33, 33, 30, 0],
      [62, 33, 33, 62, 32, 32, 32, 0],
      [30, 33, 33, 33, 37, 34, 29, 0],
      [62, 33, 33, 62, 36, 34, 33, 0],
      [30, 33, 32, 30, 1, 33, 30, 0],
      [127, 8, 8, 8, 8, 8, 8, 0],
      [33, 33, 33, 33, 33, 33, 30, 0],
      [65, 65, 65, 65, 34, 20, 8, 0],
      [65, 65, 65, 73, 85, 99, 65, 0],
      [33, 33, 18, 12, 18, 33, 33, 0],
      [65, 65, 34, 28, 8, 8, 8, 0],
      [127, 2, 4, 8, 16, 32, 127, 0],
      [33, 12, 18, 33, 63, 33, 33, 0],
      [18, 0, 30, 33, 33, 33, 30, 0],
      [33, 0, 33, 33, 33, 33, 30, 0],
      [0, 0, 0, 63, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 127],
      [16, 8, 4, 0, 0, 0, 0, 0],
      [0, 0, 30, 1, 31, 33, 31, 0],
      [32, 32, 46, 49, 33, 49, 46, 0],
      [0, 0, 30, 33, 32, 33, 30, 0],
      [1, 1, 29, 35, 33, 35, 29, 0],
      [0, 0, 30, 33, 63, 32, 30, 0],
      [14, 17, 16, 56, 16, 16, 16, 0],
      [0, 0, 30, 33, 33, 31, 1, 30],
      [32, 32, 46, 49, 33, 33, 33, 0],
      [8, 0, 24, 8, 8, 8, 28, 0],
      [1, 0, 3, 1, 1, 33, 33, 30],
      [32, 32, 33, 34, 60, 34, 33, 0],
      [24, 8, 8, 8, 8, 8, 28, 0],
      [0, 0, 118, 73, 73, 73, 65, 0],
      [0, 0, 46, 49, 33, 33, 33, 0],
      [0, 0, 30, 33, 33, 33, 30, 0],
      [0, 0, 46, 49, 49, 46, 32, 32],
      [0, 0, 29, 35, 35, 29, 1, 1],
      [0, 0, 46, 49, 32, 32, 32, 0],
      [0, 0, 31, 32, 30, 1, 62, 0],
      [8, 8, 62, 8, 8, 9, 6, 0],
      [0, 0, 34, 34, 34, 34, 29, 0],
      [0, 0, 65, 65, 34, 20, 8, 0],
      [0, 0, 65, 73, 73, 73, 54, 0],
      [0, 0, 33, 18, 12, 18, 33, 0],
      [0, 0, 33, 33, 33, 31, 1, 30],
      [0, 0, 62, 4, 8, 16, 62, 0],
      [18, 0, 30, 1, 31, 33, 31, 0],
      [0, 18, 0, 30, 33, 33, 30, 0],
      [0, 34, 0, 34, 34, 34, 29, 0],
      [30, 33, 33, 62, 33, 33, 62, 32],
      [85, 42, 85, 42, 85, 42, 85, 42],
    ],
  },
];

export default charset;
