import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import SearchPane from "../components/index_rom/SearchPane";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SearchPane />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
