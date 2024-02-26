import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const ListPage: React.FC<PageProps> = () => {
  return <div>List</div>;
};

export default ListPage;

export const Head: HeadFC = () => <title>Character Generator List</title>;
