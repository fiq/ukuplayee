import React from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator  from "../generator";
import { getNoteName } from "../generator";

const Fret = (props) => {

    const note = getNoteName(props["string"], props["fret"]);
    return (
        <div className="fret" onClick={()=>Generator.play(props["string"], props["fret"])}>
            {note}
            <Acquila/>
        </div>
    )
}

export default Fret;