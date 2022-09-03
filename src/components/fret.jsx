import React from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator  from "../generator";

const Fret = (props) => {

    return (
        <div className="fret" onClick={()=>Generator.play(props["string"], props["fret"])}>
            {props["string"]}---{props["fret"]}
            <Acquila/>
        </div>
    )
}

export default Fret;