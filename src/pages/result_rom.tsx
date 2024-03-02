import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

import SearchPane from "../components/index_rom/SearchPane";

import roms from "../roms";
import { downloadData } from "../utils/binary";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const ListPage: React.FC<PageProps> = () => {
  const [selectedROMs, setSelectedROMs] = React.useState<number[]>([]);
  const [selectedROMType, setSelectedROMType] = React.useState("trs80m1_2x_a_8");

  const [startByte, setStartByte] = React.useState(0);
  const [byteLength, setByteLength] = React.useState(8192);

  const romsEl = selectedROMs.map((selectedROM, idx) => {
    const rom = roms[selectedROM];
    return (
      <Sheet key={idx} variant="outlined" sx={{ p: 4 }}>
        {rom.title} {rom.notes}
        <Button
          loading={false}
          variant="solid"
          onClick={() => {
            let newList = selectedROMs.slice(0);
            newList.splice(idx, 1);
            setSelectedROMs(newList);
          }}
        >
          Delete
        </Button>
      </Sheet>
    );
  });

  const inverse = () => {
    setSelectedROMs(selectedROMs.slice(0).reverse());
  };
  const bitFlip = () => {
    const maxBits = Math.ceil(Math.log(selectedROMs.length) / Math.log(2));
    const flipBits = (num: number) => {
      let rev = 0;
      for (let i = 0; i < maxBits; i++) {
        rev = (rev << 1) | (num & 1);
        num = num >> 1;
      }
      return rev;
    };
    const newSelectedROMs = selectedROMs
      .map((_v, idx) => {
        const index = flipBits(idx);
        return selectedROMs[index];
      })
      .filter((val) => val != null);
    setSelectedROMs(newSelectedROMs);
  };

  const download = () => {
    const data = selectedROMs.reduce<number[]>((acc, idx) => {
      const rom = roms[idx];
      const start = startByte;
      const length = byteLength;
      const byteArray = rom.data;
      for (let i = start; i < start + length; i++) {
        if (i >= byteArray.length) {
          acc.push(0);
        } else {
          acc.push(byteArray[i]);
        }
      }
      return acc;
    }, []);
    downloadData(new Uint8Array(data), "rom.bin");
  };

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <SearchPane
            onClick={(event) => {
              const list = selectedROMs.concat([event.index]);
              setSelectedROMs(list);
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              Start: {startByte} Length: {byteLength}
              <Select
                value={selectedROMType}
                onChange={(_event, value) => {
                  if (value) setSelectedROMType(value);
                  switch (value) {
                    case "trs80m1_2x_a_8":
                      setStartByte(0);
                      setByteLength(8192);
                      break;
                    case "trs80m1_2x_b_4":
                      setStartByte(8192);
                      setByteLength(4096);
                      break;
                    case "trs80m1_2x_b_8":
                      setStartByte(8192);
                      setByteLength(8192);
                      break;
                    case "trs80m1_3x_a_4":
                      setStartByte(0);
                      setByteLength(4096);
                      break;
                    case "trs80m1_3x_b_4":
                      setStartByte(4096);
                      setByteLength(4096);
                      break;
                    case "trs80m1_3x_c_4":
                      setStartByte(8192);
                      setByteLength(4096);
                      break;
                  }
                }}
              >
                <Option value="trs80m1_2x_a_8">TRS-80 Model 1 2xROMs - ROM A (8k)</Option>
                <Option value="trs80m1_2x_b_4">TRS-80 Model 1 2xROMs - ROM B (4k)</Option>
                <Option value="trs80m1_2x_b_8">TRS-80 Model 1 2xROMs - ROM B (8k)</Option>
                <Option value="trs80m1_3x_a_4">TRS-80 Model 1 3xROMs - ROM A (4k)</Option>
                <Option value="trs80m1_3x_b_4">TRS-80 Model 1 3xROMs - ROM B (4k)</Option>
                <Option value="trs80m1_3x_c_4">TRS-80 Model 1 3xROMs - ROM C (4k)</Option>
              </Select>
            </Grid>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid>{romsEl}</Grid>
            </Grid>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={3}>
                <Button loading={false} onClick={inverse} variant="solid">
                  Inverse
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button loading={false} onClick={bitFlip} variant="solid">
                  Bit-Flip
                </Button>
              </Grid>
              <Grid xs={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Button loading={false} onClick={download} variant="solid">
                    Download Binary
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
};

export default ListPage;

export const Head: HeadFC = () => <title>ROM List</title>;
