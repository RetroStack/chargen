import React, { useEffect } from "react";

import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Snackbar from "@mui/joy/Snackbar";
import Typography from "@mui/joy/Typography";
import Tab from "@mui/joy/Tab";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import FormControl from "@mui/joy/FormControl";
import { useDropzone } from "react-dropzone";
import UploadFile from "@mui/icons-material/UploadFile";

type PropType = {
  onLoad: (byteArray: Uint8Array) => void;
};

const InputPane: React.FC<PropType> = (props) => {
  const { onLoad } = props;

  const [JSONData, setJSONData] = React.useState("");

  const [pattern, setPattern] = React.useState("");
  const [patternCharacters, setPatternCharacters] = React.useState("1@");

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Submits binary data
  const submitByteArray = (byteArray: Uint8Array) => {
    onLoad(byteArray);
  };
  const submitJSON = () => {
    try {
      const data = JSON.parse(JSONData);
      const byteArray = new Uint8Array(data);

      setErrorMsg(null);
      onLoad(byteArray);
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      setErrorMsg("Error while parsing JSON: " + message);
    }
  };

  // Reads drag-and-drop files and sets JSON data
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => setErrorMsg("File reading was aborted.");
      reader.onerror = () => setErrorMsg("File reading has failed.");
      reader.onload = () => {
        const binaryStr = reader.result;
        if (binaryStr instanceof ArrayBuffer) {
          submitByteArray(new Uint8Array(binaryStr));
        } else {
          setErrorMsg("File contents were read as non-binary.");
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
            <TabPanel value={0} sx={{ minHeight: "650px" }}>
              <div {...getRootProps()}>
                <div
                  style={{
                    border: "1px dashed black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "610px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <UploadFile />
                  <p>Drag 'n' drop file here, or click to select file</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={1} sx={{ minHeight: "650px" }}>
              <FormControl>
                <FormLabel>Text Pattern:</FormLabel>
                <Textarea
                  minRows={15}
                  maxRows={15}
                  placeholder={
                    "000111000\n001101100\n011000110\n011000110\n001101100\n000111000\n00000000\n\n001011000\n001111000\n..."
                  }
                  variant="outlined"
                  value={pattern}
                  onChange={(event) => setPattern(event.target.value)}
                />
                <FormHelperText>
                  Provide a pattern of 0s and 1s as pattern for each character, including an empty line for starting the
                  next character.
                </FormHelperText>
                <FormLabel>Active Pixel Characters:</FormLabel>
                <Input
                  variant="outlined"
                  value={patternCharacters}
                  onChange={(event) => setPatternCharacters(event.target.value)}
                />
                <Button onClick={submitJSON}>Load</Button>
              </FormControl>
            </TabPanel>
            <TabPanel value={2} sx={{ minHeight: "650px" }}>
              <FormControl>
                <FormLabel>JSON byte array:</FormLabel>
                <Textarea
                  minRows={15}
                  maxRows={15}
                  placeholder="[68, 43, ...]"
                  variant="outlined"
                  value={JSONData}
                  onChange={(event) => setJSONData(event.target.value)}
                />
                <FormHelperText>Enter the binary data from a JSON number array.</FormHelperText>
                <Button onClick={submitJSON}>Load</Button>
              </FormControl>
            </TabPanel>
          </Tabs>
        </Sheet>
      </Grid>
    </>
  );
};

export default InputPane;
