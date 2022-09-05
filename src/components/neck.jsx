import React, { useContext } from "react"
import "./neck.css"
import Fret from "./fret"
import SoundHole from "./sound-hole";
import strumContext from "./strum-context";

const maxFrets = 4;
const Neck = () => {
    const strumState = useContext(strumContext);

    const renderFretBoard = () => {
        const frets = [];
        for (let fret = 1; fret <= maxFrets; fret++) {
            for (let string = 4; string > 0; string--) {
                frets.push(<Fret string={string} fret={fret} />)
            }
        }

        return frets;
    }

    const renderOpenStrings = () => {
        const opens = [];
        for (let string = 4; string > 0; string--) {
            opens.push(<Fret isOpen={true} string={string} fret={0} />)
        }
        return opens;
    }

    return (
        <strumContext.Provider value={strumState}>

            <div className="neck">
                {renderFretBoard()}

                <SoundHole>
                    {renderOpenStrings()}
                </SoundHole>
            </div>

        </strumContext.Provider>

    )
};

export default Neck;