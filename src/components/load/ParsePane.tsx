import React, { useEffect } from "react";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Snackbar from "@mui/joy/Snackbar";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Slider from "@mui/joy/Slider";
import CharacterSet from "../CharacterSet";

type PropType = {
  byteArray: Uint8Array;
  onParse: (characterSet: { characters: number[][]; dataWidth: number; dataHeight: number }) => void;
  onParseBack: () => void;
};

const ParsePane: React.FC<PropType> = (props) => {
  const { byteArray, onParse, onParseBack } = props;

  const [skipBytes, setSkipBytes] = React.useState(0);
  const [direction, setDirection] = React.useState<"MSB" | "LSB">("MSB");
  const [byteOrder, setByteOrder] = React.useState<"Little" | "Big">("Big");
  const [byteOrderDisabled, setByteOrderDisabled] = React.useState(true);
  const [dataWidth, setDataWidth] = React.useState(5);
  const [dataHeight, setDataHeight] = React.useState(8);

  const [characters, setCharacters] = React.useState<number[][]>([]);

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = () => {
    onParse({ characters, dataWidth, dataHeight });
  };

  // Parses input data and sets parsed data
  useEffect(() => {
    const result: number[][] = []; // [chars][rows] => columns

    const pixelSetValue = 1 << (dataWidth - 1);
    const bytes = Math.ceil(dataWidth / 8);

    for (let i = skipBytes; i < byteArray.length; i += dataHeight * bytes) {
      const character: number[] = [];

      for (let row = 0; row < dataHeight; row++) {
        for (let b = 0; b < bytes; b++) {
          const byteIdx = byteOrder === "Big" ? b : bytes - b - 1;
          let value = byteArray[i + row + byteIdx] & 0xff;
          let output = 0;

          for (let x = 0; x < Math.min(8, dataWidth); x++) {
            const drawPixel = (value & 0x01) == 1;
            if (direction == "MSB") {
              output = output >> 1;
            } else {
              output = output << 1;
            }
            if (drawPixel) {
              output = output | (direction == "MSB" ? pixelSetValue : 1);
            }
            value = value >> 1;
          }
          character.push(output);
        }
      }

      result.push(character);
    }

    setCharacters(result);
  }, [byteArray, direction, skipBytes, byteOrder, dataWidth, dataHeight]);

  // Sets data width
  useEffect(() => {
    setByteOrderDisabled(dataWidth <= 8);
  }, [dataWidth]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorMsg != null}
        autoHideDuration={5000}
        disableWindowBlurListener={true}
        color={"danger"}
        size={"lg"}
        onClose={() => {
          setErrorMsg(null);
        }}
      >
        {errorMsg}
      </Snackbar>
      <Grid xs={12}>
        <Typography level="title-lg">Parsing</Typography>
      </Grid>
      <Grid xs={12}>
        <Sheet variant="outlined" sx={{ p: 4 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={6}>Direction:</Grid>
            <Grid xs={6}>Byte-Order:</Grid>
            <Grid xs={6}>
              <Select
                value={direction}
                onChange={(_event, value) => {
                  if (value) {
                    setDirection(value);
                  }
                }}
              >
                <Option value="MSB">Most Significant Bit first</Option>
                <Option value="LSB">Least Significant Bit first</Option>
              </Select>
            </Grid>
            <Grid xs={6}>
              <Select
                value={byteOrder}
                onChange={(_event, value) => {
                  if (value) {
                    setByteOrder(value);
                  }
                }}
                disabled={byteOrderDisabled}
              >
                <Option value="Little">Little Endian</Option>
                <Option value="Big">Big Endian</Option>
              </Select>
            </Grid>
            <Grid xs={4}>Skip Data (in bytes):</Grid>
            <Grid xs={4}>Data Width (in bits):</Grid>
            <Grid xs={4}>Data Height (in rows):</Grid>
            <Grid xs={4}>
              <Slider
                disabled={false}
                orientation="horizontal"
                valueLabelDisplay="on"
                min={0}
                max={256}
                value={skipBytes}
                onChange={(_event, value, _activeThumb) => setSkipBytes(Array.isArray(value) ? value[0] : value)}
              />
            </Grid>
            <Grid xs={4}>
              <Slider
                disabled={false}
                marks
                orientation="horizontal"
                valueLabelDisplay="on"
                min={1}
                max={16}
                value={dataWidth}
                onChange={(_event, value, _activeThumb) => setDataWidth(Array.isArray(value) ? value[0] : value)}
              />
            </Grid>
            <Grid xs={4}>
              <Slider
                disabled={false}
                marks
                orientation="horizontal"
                valueLabelDisplay="on"
                min={1}
                max={24}
                value={dataHeight}
                onChange={(_event, value, _activeThumb) => setDataHeight(Array.isArray(value) ? value[0] : value)}
              />
            </Grid>
          </Grid>
        </Sheet>
      </Grid>
      <Grid xs={12}>
        <Typography level="title-lg">Parsed Character Set: {characters.length} characters</Typography>
      </Grid>
      <Grid xs={12}>
        <Sheet variant="outlined" sx={{ p: 4 }}>
          <CharacterSet dataWidth={dataWidth} characters={characters}></CharacterSet>
        </Sheet>
      </Grid>
      <Button loading={false} onClick={onParseBack} variant="soft" color="neutral">
        Back
      </Button>
      <Button onClick={submit}>Next</Button>
    </>
  );
};

export default ParsePane;
