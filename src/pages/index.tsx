import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import charsets from "../chargen";
import CharacterSet from "../components/CharacterSet";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";

const IndexPage: React.FC<PageProps> = () => {
  const pageSize = 1;
  const [page, setPage] = React.useState(0);

  const currentIndex = pageSize * page;

  const elements = charsets.slice(currentIndex, currentIndex + pageSize).map((item, idx) => {
    const { title, system, source, notes, ...rest } = item;
    return (
      <Sheet variant="outlined" sx={{ p: 4 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12}>
            <CharacterSet key={idx} {...rest} />
          </Grid>
          <Grid xs={2}>Title:</Grid>
          <Grid xs={4}>{title}</Grid>
          <Grid xs={2}>System:</Grid>
          <Grid xs={4}>{system}</Grid>
          <Grid xs={2}>Characters:</Grid>
          <Grid xs={2}>
            {rest.data.length} ({rest.dataWidth}x{rest.data[0].length})
          </Grid>
          <Grid xs={2}>Source:</Grid>
          <Grid xs={6}>{source}</Grid>
          <Grid xs={2}>Notes:</Grid>
          <Grid xs={10}>{notes}</Grid>
        </Grid>
      </Sheet>
    );
  });

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Button
        loading={false}
        onClick={() => {
          setPage(Math.max(0, page - 1));
        }}
        variant="solid"
      >
        Previous
      </Button>
      ({page + 1} of {Math.ceil(charsets.length / pageSize)})
      <Button
        loading={false}
        onClick={() => {
          setPage(page + 1);
        }}
        variant="solid"
      >
        Next
      </Button>
      {elements}
    </Grid>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
