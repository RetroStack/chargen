import * as React from "react";

import roms from "../../roms";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type PropsType = {
  onClick?: (event: { data: number[]; index: number }) => void;
};

const SearchPane: React.FC<PropsType> = (props) => {
  const pageSize = 1;
  const [page, setPage] = React.useState(0);

  const onClick = props.onClick;

  const currentIndex = pageSize * page;

  const elements = roms.slice(currentIndex, currentIndex + pageSize).map((item, idx) => {
    const { title, system, source, notes, data } = item;
    return (
      <Sheet key={idx} variant="outlined" sx={{ p: 4 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} pb="1.5rem">
          <Card sx={{ margin: "auto", marginBottom: "1rem" }}>
            <Typography variant="h3"> {title} </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={4}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    System
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {system}
                  </Typography>
                </CardContent>
              </Grid>

              <Grid xs={4}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Bytes
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {data.length}
                  </Typography>
                </CardContent>
              </Grid>

              <Grid xs={4}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Source
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    <Link href={source}>{source}</Link>
                  </Typography>
                </CardContent>
              </Grid>

              <Grid xs={10}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {notes}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid xs={2}>
                <Button
                  loading={false}
                  onClick={() => {
                    onClick && onClick({ data, index: currentIndex });
                  }}
                  variant="solid"
                >
                  Insert
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Sheet>
    );
  });

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Box m="auto" pb="2rem">
          <Button
            loading={false}
            onClick={() => {
              setPage(Math.max(0, page - 1));
            }}
            variant="solid"
            disabled={page === 0}
          >
            <ArrowCircleLeftIcon />
          </Button>
          ({page + 1} of {Math.ceil(roms.length / pageSize)})
          <Button
            loading={false}
            onClick={() => {
              setPage(page + 1);
            }}
            variant="solid"
            disabled={page === Math.floor(roms.length / pageSize)}
          >
            <ArrowCircleRightIcon />
          </Button>
          <Button
            loading={false}
            onClick={() => {
              setPage(page + 10);
            }}
            variant="solid"
            disabled={page === Math.floor(roms.length / pageSize)}
          >
            <ArrowCircleRightIcon />
            +10
          </Button>
        </Box>
      </Grid>
      {elements}
    </>
  );
};

export default SearchPane;
