import { Outlet, Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
 
function Survey() {
    // we take the parameter "questionNumber" from  src (index.jsx) where the routing is
    const { questionNumber } = useParams()

    return (
        <div>
            <h1>Questionnaire 🧮</h1>
            <Link to = "client">Question Clien {questionNumber}</Link>
            <Link to = "freelance">Questionnaire Freelance {questionNumber}</Link>

            <Outlet />
        </div>
    )
}

export default Survey   