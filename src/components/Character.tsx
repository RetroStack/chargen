import * as React from "react";
import Canvas from "./Canvas";

const CharacterCustom: React.FC<{
  width?: number;
  height?: number;
  dataWidth: number;
  data: number[];
}> = (props) => {
  const width: number = props.width ?? 150;
  const height: number = props.height ?? 150;

  const dataWidth = props.dataWidth;
  const data = props.data;

  const dataHeight = data.length;
  if (dataHeight == 0) {
    return <div></div>;
  }

  const pixelWidth = Math.floor(width / dataWidth);
  const pixelHeight = Math.floor(height / dataHeight);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(0 0 0)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(255 255 255)";

    for (let y = 0; y < dataHeight; y++) {
      let value = data[y] & 0xff;

      for (let x = dataWidth - 1; x >= 0; x--) {
        const drawPixel = (value & 0x01) == 1;
        if (drawPixel) {
          ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
        }
        value = value >> 1;
      }
    }
  };

  return <Canvas draw={draw} width={width} height={height} />;
};

export default CharacterCustom;
