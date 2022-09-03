import React from "react"
import Neck from "./neck"
import SoundHole from "./sound-hole"


const Ukulele = (props) => {
    
    return (
        <div className="ukulele">
            <Neck/>
            <SoundHole/>
        </div>
    )
}

export default Ukulele;