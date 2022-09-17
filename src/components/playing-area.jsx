import React, { useContext } from "react";
import "./playing-area.css";
import Neck from "./neck";
import SoundHole from "./sound-hole";
import strumContext from "./strum-context";


const PlayingArea = (props) => {

    const maxFrets = 4;
    const strumState = useContext(strumContext);

    return (
        <strumContext.Provider value={strumState}>
            <div className="playing-area">
                <Neck maxFrets={maxFrets}/>
                <SoundHole maxFrets={maxFrets}/>
            </div>

        </strumContext.Provider>
    );
};

export default PlayingArea;
