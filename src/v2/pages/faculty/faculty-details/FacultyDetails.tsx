import { JSX } from "react";
import { useParams } from "react-router"

function FacultyDetails(): JSX.Element {

    const _params = useParams();

    
    console.log(_params.id)
    return(
        <>
            <h1>FACULTY DETAILS PAGE, router params = {_params.id }</h1>
        </>
    )
}

export default FacultyDetails