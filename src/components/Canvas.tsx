import * as React from "react";

const style = {
    border: "1px solid black",
};

const Canvas: React.FC<{draw: (ctx: CanvasRenderingContext2D) => void, width: number, height: number}> = (props) => {
  const { draw, width, height, ...rest} = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      draw(ctx);
    }
  }, [draw]);

  return (
    <canvas ref={canvasRef} width={width+''} height={height+''} style={style} {...rest}></canvas>
  );
};

export default Canvas;
