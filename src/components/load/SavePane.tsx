import React from "react";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { downloadData, charsetToByteArray } from "../../utils/binary";
import { copyToClipboard } from "../../utils/clipboard";
import CopyAll from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/joy/Snackbar";

type PropType = {
  characters: number[][];
  dataWidth: number;
  onSaveBack: () => void;
};

const SavePane: React.FC<PropType> = (props) => {
  const { characters, dataWidth, onSaveBack } = props;

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const resultJSON = JSON.stringify(characters);

  const download = () => {
    const data = charsetToByteArray(characters, dataWidth);
    downloadData(data);
  };

  const copy = () => {
    copyToClipboard(resultJSON);
  };

  return (
    <div>
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
              <Button loading={false} onClick={onSaveBack} variant="soft" color="neutral">
                Back
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button loading={false} onClick={copy} variant="solid">
                <CopyAll />
                Copy To Clipboard
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
    </div>
  );
};

export default SavePane;
