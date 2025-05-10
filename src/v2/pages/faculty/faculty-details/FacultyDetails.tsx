import { JSX } from "react";
import { useParams } from "react-router-dom"

function FacultyDetails(): JSX.Element {

    const _params = useParams();

    
    console.log(_params.id)
    return(
        <>
            <h1>FACULTY DETAILS PAGE</h1>
        </>
    )
}

export default FacultyDetails