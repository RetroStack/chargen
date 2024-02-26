import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const EditPage: React.FC<PageProps> = () => {
  return <div>Editor</div>;
};

export default EditPage;

export const Head: HeadFC = () => <title>Character Generator Editor</title>;
