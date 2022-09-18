import React, { useRef, useEffect } from "react";
import "./acquila.css";

const baseX = 13;
const baseY = 0;
const stillLineWidth = 3;
const pressedLineWidth = 5;

const Acquila = (props) => {
    const acquilaRef = useRef("parent");
    const canvasRef = useRef(null);

    console.log("acquila");

    const clearCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(baseX-100, baseY, canvas.width, canvas.height);
        return ctx;
    };

    const drawPressedString = () => {
        const canvas = canvasRef.current;
        const ctx = clearCanvas(canvas);
        ctx.strokeStyle = "#EEEEDD";
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineWidth = pressedLineWidth;
        ctx.quadraticCurveTo(0, canvas.height/2, baseX, canvas.height);
        ctx.stroke();
    };

    const drawStillString = () => {
        const canvas = canvasRef.current;
        const ctx = clearCanvas(canvas);
        ctx.beginPath();
        ctx.lineWidth = stillLineWidth;
        ctx.strokeStyle= '#EEEEDD';

        //ctx.fillStyle = "black";
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(baseX, canvas.height);
        ctx.stroke();
    };

    useEffect(() => {
        if (props["pressed"]) {
            return drawPressedString();
        }

        return drawStillString();
    });

    return (
        <div className="acquila" ref={acquilaRef}>
            <canvas height="100%" className="string-canvas" ref={canvasRef}>
            </canvas>
        </div>
    );
};

export default Acquila;
