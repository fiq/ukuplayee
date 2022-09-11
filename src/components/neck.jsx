import React from "react";
import Fret from "./fret";
import "./neck.css"

const Neck = (props) => {
    const maxFrets = props.maxFrets || 4;

    const renderFretBoard = () => {
        const frets = [];
        for (let fret = 1; fret <= maxFrets; fret++) {
            for (let string = 4; string > 0; string--) {
                frets.push(<Fret string={string} fret={fret} />)
            }
        }

        return frets;
    }

    return (
            <div className="neck">
                {renderFretBoard()}
            </div>

    );
};

export default Neck;