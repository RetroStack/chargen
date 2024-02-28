import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import charsets from "../chargen";
import CharacterSet from "../components/CharacterSet";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import Layout from "../components/Layout";
import Box from '@mui/joy/Box';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const IndexPage: React.FC<PageProps> = () => {
  const pageSize = 1;
  const [page, setPage] = React.useState(0);

  const currentIndex = pageSize * page;

  const elements = charsets.slice(currentIndex, currentIndex + pageSize).map((item, idx) => {
    const { title, system, source, notes, ...rest } = item;
    return (
          <Sheet variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} pb="1.5rem">
                <Card sx={{margin :"auto", marginBottom: "1rem" }}>
            <Typography variant="h3" > {title} </Typography>
            <Divider pb="1rem"/>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={4}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                            System
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {system}
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid xs={4}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Characters
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {rest.data.length} ({rest.dataWidth}x{rest.data[0].length})
                        </Typography>
                    </CardContent>
                </Grid>


                <Grid xs={4}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                            Source
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            <Link href={source}>{source}</Link>
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid xs={12}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                            Notes
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {notes}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            </Card>
            </Grid>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Box m="auto" >
                    <CharacterSet key={idx} {...rest} />
                </Box>
            </Grid>
          </Sheet>
    );
  });

  return (
      <Layout>
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
              <ArrowCircleLeftIcon/>
            </Button>

            ({page + 1} of {Math.ceil(charsets.length / pageSize)})

            <Button
              loading={false}
              onClick={() => {
                setPage(page + 1);
              }}
              variant="solid"
              disabled={page === pageSize}
            >
              <ArrowCircleRightIcon/>
            </Button>
          </Box>
        </Grid>
          {elements}
      </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
