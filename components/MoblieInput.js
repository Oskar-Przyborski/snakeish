import { faChevronUp, faChevronDown, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MobileInputContainer } from "../styles/styled-components.js";
import { useState } from "react";
export default function MobileInput({ ChangeDirectionCallback }) {
    const [isExpanded, setIsExpanded] = useState(true);
    return (

        <MobileInputContainer expanded ={isExpanded}>
            {isExpanded ?
                <>
                    <button onClick={() => setIsExpanded(false)} id="expand"><FontAwesomeIcon icon={faChevronDown} /></button>
                    <button onClick={() => ChangeDirectionCallback("up")} id="up" > <FontAwesomeIcon icon={faChevronUp} /></button >
                    <button onClick={() => ChangeDirectionCallback("down")} id="down"><FontAwesomeIcon icon={faChevronDown} /></button>
                    <button onClick={() => ChangeDirectionCallback("left")} id="left"><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button onClick={() => ChangeDirectionCallback("right")} id="right"><FontAwesomeIcon icon={faChevronRight} /></button>
                </>
                :
                < button onClick={() => setIsExpanded(true)} id="expand"> <FontAwesomeIcon icon={faChevronUp} /></button >
            }
        </MobileInputContainer >)


}