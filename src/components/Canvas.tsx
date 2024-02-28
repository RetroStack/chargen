import * as React from "react";

const style = {
  border: "1px solid black",
};
const selectStyle = {
  border: "1px solid red",
};

type PropsType = {
  draw: (ctx: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
  selected?: boolean;
  onClick?: (event: { x: number; y: number }) => void;
};

const Canvas: React.FC<PropsType> = (props) => {
  const { draw, width, height, onClick, selected, ...rest } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      draw(ctx);
    }
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={width + ""}
      height={height + ""}
      style={selected ? selectStyle : style}
      onClick={(event) => {
        if (canvasRef.current == null) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;
        onClick && onClick({ x: canvasX, y: canvasY });
      }}
      {...rest}
    ></canvas>
  );
};

export default Canvas;
