import { useEffect } from "react";
import { useState } from "react";

function useYesNoFetch(url) {
    const [ yesNo, setYesNo ] = useState(null)

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((json) => {
            setYesNo(json);
        })
    },[url]);

    return  { yesNo }
}

export default useYesNoFetch;