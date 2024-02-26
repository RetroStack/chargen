import React, { useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import CharacterSet from "../components/CharacterSet";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Slider from "@mui/joy/Slider";
import Button from "@mui/joy/Button";
import { useDropzone } from "react-dropzone";
import Box from "@mui/joy/Box";
import { downloadData, charsetToByteArray } from "../utils/binary";
import { copyToClipboard } from "../utils/clipboard";
import Layout from "../components/Layout";
import Typography from '@mui/joy/Typography';
import IndicatorTopStepper from "../components/Stepper";
import CopyAll from '@mui/icons-material/CopyAll';
import UploadFile from '@mui/icons-material/UploadFile';

const LoadPage: React.FC<PageProps> = () => {
  const [pattern, setPattern] = React.useState("");
  const [JSONData, setJSONData] = React.useState("");
  const [parsedData, setParsedData] = React.useState([]);
  const [skipBytes, setSkipBytes] = React.useState(0);
  const [direction, setDirection] = React.useState<"MSB" | "LSB">("MSB");
  const [byteOrder, setByteOrder] = React.useState<"Little" | "Big">("Big");
  const [byteOrderDisabled, setByteOrderDisabled] = React.useState(true);
  const [dataWidth, setDataWidth] = React.useState(5);
  const [dataHeight, setDataHeight] = React.useState(8);
  const [width, setWidth] = React.useState(5);
  const [height, setHeight] = React.useState(8);
  const [inputData, setInputData] = React.useState<number[][]>([]);
  const [sanitizedData, setSanitizedData] = React.useState<number[][]>([]);
  const [resultJSON, setResultJSON] = React.useState("");

  // Reads drag-and-drop files and sets JSON data
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        if (binaryStr instanceof ArrayBuffer) {
          setJSONData(JSON.stringify(Array.from(new Uint8Array(binaryStr))));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Loads text patterns and sets JSON data
  useEffect(() => {
    const lines = pattern.split("\n").map((x) => x.trim());

    const result: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];

      if (currentLine === "") {
        continue;
      }

      let value = 0;
      for (let x = 0; x < currentLine.length; x++) {
        value = value << 1;
        if (currentLine[x] == "@") {
          value |= 1;
        }
      }

      result.push(value);
    }

    setJSONData(JSON.stringify(result));
  }, [pattern]);

  // Parses JSON data
  useEffect(() => {
    try {
      const data = JSON.parse(JSONData);

      setParsedData(data);
    } catch (_e) {
      setParsedData([]);
    }
  }, [JSONData]);

  // Parses input data and sets parsed data
  useEffect(() => {
    const result: number[][] = []; // [chars][rows] => columns

    const pixelSetValue = 1 << (dataWidth - 1);
    const bytes = Math.ceil(dataWidth / 8);

    for (let i = skipBytes; i < parsedData.length; i += dataHeight * bytes) {
      const character: number[] = [];

      for (let row = 0; row < dataHeight; row++) {
        for (let b = 0; b < bytes; b++) {
          const byteIdx = byteOrder === "Big" ? b : bytes - b - 1;
          let value = parsedData[i + row + byteIdx] & 0xff;
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

    setInputData(result);
  }, [parsedData, direction, skipBytes, byteOrder, dataWidth, dataHeight]);

  // Sanitizes data
  useEffect(() => {
    const result: number[][] = [];

    const columnMask = (1 << width) - 1;
    for (let i = 0; i < inputData.length; i++) {
      const character: number[] = [];
      const rows = inputData[i];

      for (let row = 0; row < Math.min(height, rows.length); row++) {
        character.push(rows[row] & columnMask);
      }

      result.push(character);
    }

    setSanitizedData(result);
  }, [inputData, width, height]);

  // Stringifies sanitized data
  useEffect(() => {
    setResultJSON(JSON.stringify(sanitizedData));
  }, [sanitizedData]);

  // Sets data width, height
  useEffect(() => {
    setWidth(dataWidth);
    setHeight(dataHeight);
    setByteOrderDisabled(dataWidth <= 8);
  }, [dataWidth, dataHeight]);

  const download = () => {
    const data = charsetToByteArray(sanitizedData, width);
    downloadData(data);
  };

  const copy = () => {
    copyToClipboard(resultJSON);
    setJSONData("");
  };

  return (
      <Layout>
        <Grid container spacing={2} sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
          <IndicatorTopStepper/>
        </Grid>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Typography level="title-lg">Input</Typography>
        </Grid>
        <Grid xs={12}>
          <Sheet variant="outlined">
            <Tabs>
              <TabList>
                <Tab variant="plain" color="neutral">
                  File Drop
                </Tab>
                <Tab variant="plain" color="neutral">
                  Pattern
                </Tab>
                <Tab variant="plain" color="neutral">
                  JSON
                </Tab>
              </TabList>
              <TabPanel value={0} sx={{minHeight: "240px"}}>
                <div {...getRootProps()}>
                  <div style={{
                    border: "1px dashed black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "200px",
                    alignItems: "center",
                    cursor: "pointer"
                  }}>
                    <input {...getInputProps()} />
                    <UploadFile/>
                    <p>Drag 'n' drop file here, or click to select file</p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={1} sx={{minHeight: "240px"}}>
                <FormControl>
                  <FormLabel>Text Pattern:</FormLabel>
                  <Textarea
                    minRows={5}
                    maxRows={5}
                    placeholder="00011100"
                    variant="outlined"
                    value={pattern}
                    onChange={(event) => setPattern(event.target.value)}
                  />
                </FormControl>
              </TabPanel>
              <TabPanel value={2} sx={{minHeight: "240px"}}>
                <FormControl>
                  <FormLabel>JSON byte array:</FormLabel>
                  <Textarea
                      minRows={5}
                      maxRows={5}
                      placeholder="[68, 43, ...]"
                      variant="outlined"
                      value={JSONData}
                      onChange={(event) => setJSONData(event.target.value)}
                  />
                  <FormHelperText>Enter the binary data from a JSON number array.</FormHelperText>
                </FormControl>
              </TabPanel>
            </Tabs>
          </Sheet>
        </Grid>
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
            <Typography level="title-lg">
              Parsed Character Set: {inputData.length} characters
            </Typography>
        </Grid>
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <CharacterSet dataWidth={dataWidth} data={inputData}></CharacterSet>
          </Sheet>
        </Grid>
        <Grid xs={12}>Sanitizing:</Grid>
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={6}>Width (in pixel):</Grid>
              <Grid xs={6}>Height (in pixel):</Grid>
              <Grid xs={6}>
                <Slider
                  disabled={false}
                  marks
                  orientation="horizontal"
                  valueLabelDisplay="on"
                  min={1}
                  max={dataWidth}
                  value={width}
                  onChange={(_event, value, _activeThumb) => setWidth(Array.isArray(value) ? value[0] : value)}
                />
              </Grid>
              <Grid xs={6}>
                <Slider
                  disabled={false}
                  marks
                  orientation="horizontal"
                  valueLabelDisplay="on"
                  min={1}
                  max={dataHeight}
                  value={height}
                  onChange={(_event, value, _activeThumb) => setHeight(Array.isArray(value) ? value[0] : value)}
                />
              </Grid>
            </Grid>
          </Sheet>
        </Grid>
        <Grid xs={12}>Sanitized Character Set:</Grid>
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <CharacterSet dataWidth={width} data={sanitizedData}></CharacterSet>
          </Sheet>
        </Grid>
        <Grid xs={12}>Sanitized Result JSON:</Grid>
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <FormControl>
              <FormLabel>JSON byte array:</FormLabel>
              <Textarea minRows={5} maxRows={5} variant="outlined" value={resultJSON} readOnly={true} />
              <FormHelperText>Sanitized data for character sets.</FormHelperText>
            </FormControl>
          </Sheet>
        </Grid>
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={3}>
                <Button loading={false} onClick={copy} variant="solid">
                  <CopyAll />
                  Copy To Clipboard

                </Button>
              </Grid>
              <Grid xs={9}>
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
      </Layout>
  );
};

export default LoadPage;

export const Head: HeadFC = () => <title>Character Generator ROM Load</title>;
