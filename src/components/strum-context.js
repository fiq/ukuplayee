import {createContext} from "react";

const strumContext = createContext({
    fretted: {
        4: [],
        3: [],
        2: [],
        1: []
    },
}); 

export default strumContext;