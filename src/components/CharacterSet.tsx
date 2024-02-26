import * as React from "react";
import Character from "./Character";

const CharacterSet: React.FC<{
  dataWidth: number;
  data: number[][];
  rowCount?: number;
  scale?: number;
}> = (props) => {
  const { dataWidth, data, rowCount = 32, scale = 4 } = props;
  const width = dataWidth * scale;

  const charCount = data.length;
  const chars = [];
  let buffer = [];

  for (let i = 0; i < charCount; i++) {
    const height = data[i].length * scale;

    buffer.push(<Character key={i} width={width} height={height} dataWidth={dataWidth} data={data[i]} />);

    if (buffer.length >= rowCount) {
      chars.push(<div key={chars.length}>{buffer}</div>);
      buffer = [];
    }
  }
  if (buffer.length > 0) {
    chars.push(<div key={chars.length}>{buffer}</div>);
    buffer = [];
  }

  return <div>{chars}</div>;
};

export default CharacterSet;
