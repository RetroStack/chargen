import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const BuilderPage: React.FC<PageProps> = () => {
  return <div>Builder</div>;
};

export default BuilderPage;

export const Head: HeadFC = () => <title>Character Generator ROM Builder</title>;
