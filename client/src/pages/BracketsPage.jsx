import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNavbar from "../components/PageNavbar";

function BracketsPage(props) {
    const { } = props;
    const [brackets, setBrackets] = useState([]);

    async function fetchBrackets() {
        const response = await fetch("/brackets/");
        const data = await response.json();
        setBrackets(data);
    }

    useEffect(() => {
        fetchBrackets();
    }, []);


    return (
        <>
            <PageNavbar title='Fill Out Brackets' button={
                <Link to="/" className="navbar-button">Home</Link>
            }
            />
            <ul>
                {brackets.map((bracket) => (
                    <Link 
                    to={{ 
                        pathname: `/bracket/${bracket.id}`, 
                        state: { bracketId: bracket.id } 
                    }}
                    key={bracket.id}
                    >
                    <li key={bracket.id}>
                        <strong>{bracket.name}</strong>: {bracket.description}
                    </li>
                    </Link>
                    
                ))}
            </ul>








            {/* For bracket in brackets display bracket */}
            {/* when select a bracket go to specific page for that bracket */}
            {/* look at how i did that in the previouse project */}
            {/* start with 2 choices and go for each round and give points per round. */}
            {/* check if the bracket has been made into a public already and either make a public
            bracket or add the stats to the already public one */}

        </>
    )
}

export default BracketsPage;