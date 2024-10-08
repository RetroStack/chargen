import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import E1 from "../components/pcb/E1";

import "../styles/board.css";

const BoardPage: React.FC<PageProps> = () => {
  return <E1 />;
};

export default BoardPage;

export const Head: HeadFC = () => <title>E1</title>;
