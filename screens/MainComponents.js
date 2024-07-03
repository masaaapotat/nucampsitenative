import { useState } from "react";
import {CAMPSITES} from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';


const Main= () => {
    // state variable to hold our campsite array data
    const [campsites, setCampsites] = useState(CAMPSITES);
    return <DirectoryScreen campsites={campsites} />; 
    
};
export default Main
