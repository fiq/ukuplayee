import React from "react"
import "./neck.css"
import Fret from "./fret"

const maxFrets = 4;
const Neck = () => {

    const renderFretBoard = () => {
        console.log("Fret board")
        const frets = [];
        for (let fret = 1; fret <= maxFrets; fret++) {
            for (let string = 4; string > 0; string--) {

                console.log(`hammer on ${string} ${fret}`);

                frets.push(<Fret string={string} fret={fret} />)
            }
        }
        return frets;
    }

    return (
        <div className="neck">
            {renderFretBoard()}
        </div>

    )
};

export default Neck;