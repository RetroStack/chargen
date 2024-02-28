import * as React from "react";
import Character from "./Character";

type PropsType = {
  dataWidth: number;
  characters: number[][];
  rowCount?: number;
  scale?: number;
  refresh?: number;
  selectedCharacter?: number;
  onClick?: (event: { characters: number[][]; characterIndex: number; x: number; y: number }) => void;
};

const CharacterSet: React.FC<PropsType> = (props) => {
  const { dataWidth, characters, rowCount = 32, scale = 3, refresh, selectedCharacter, onClick } = props;
  const width = dataWidth * scale;

  const charCount = characters.length;
  const chars = [];
  let buffer = [];

  for (let i = 0; i < charCount; i++) {
    const height = characters[i].length * scale;

    buffer.push(
      <Character
        key={i}
        width={width}
        height={height}
        dataWidth={dataWidth}
        character={characters[i]}
        refresh={refresh}
        selected={selectedCharacter === i}
        onClick={(event) => {
          const newEvent = {
            characters,
            characterIndex: i,
            x: event.x,
            y: event.y,
          };
          onClick && onClick(newEvent);
        }}
      />,
    );

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
