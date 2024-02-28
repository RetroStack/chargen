import * as React from "react";
import Canvas from "./Canvas";

type PropsType = {
  width?: number;
  height?: number;
  dataWidth: number;
  character: number[];
  refresh?: number;
  selected?: boolean;
  onClick?: (event: { x: number; y: number; character: number[] }) => void;
};

const Character: React.FC<PropsType> = (props) => {
  const { dataWidth, character, selected, width = 150, height = 150 } = props;

  const dataHeight = character.length;
  if (dataHeight == 0) {
    return <></>;
  }

  const pixelWidth = Math.floor(width / dataWidth);
  const pixelHeight = Math.floor(height / dataHeight);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(0 0 0)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(255 255 255)";

    for (let y = 0; y < dataHeight; y++) {
      let value = character[y] & 0xff;

      for (let x = dataWidth - 1; x >= 0; x--) {
        const drawPixel = (value & 0x01) == 1;
        if (drawPixel) {
          ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
        }
        value = value >> 1;
      }
    }
  };

  const onClick: (event: { x: number; y: number }) => void = (event) => {
    const x = Math.floor(event.x / pixelWidth);
    const y = Math.floor(event.y / pixelHeight);
    props.onClick && props.onClick({ x, y, character });
  };

  return <Canvas selected={selected} draw={draw} width={width} height={height} onClick={onClick} />;
};

export default Character;
