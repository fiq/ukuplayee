import {createContext} from "react";

const maxStrings = 4;
const maxFrets = 4;

// create representation of fret board [ string0_frets, string1_frets, ...]
// fill..map is required to avoid using the same Array reference for each nested array
const defaultGrid = Array(maxStrings).fill([]).map(()=>Array(maxFrets+1).fill(0));

const strumContext = createContext({
    fretState: defaultGrid
}); 

export default strumContext;