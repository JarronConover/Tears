import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import PageNavbar from "../components/PageNavbar";
import { use } from "react";

function FillBracketPage() {
    const { id } = useParams(); // Get the id from the URL
    const location = useLocation(); // Get the location object
    const bracketId = location.state?.bracketId || id; // Get bracketId from state or URL
    const [bracket, setBracket] = useState(null);
    const [elements, setElements] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // New state to store selected items
    const [displayedItems, setDisplayedItems] = useState([]);
    const [temporaryBracket, setTemporaryBracket] = useState([]);
    const [winner, setWinner] = useState(null);
    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchBracket = async () => {
            const res = await fetch(`/bracket/${bracketId}/`);
            if (res.ok) {
                const data = await res.json();
                setBracket(data);
                setElements(data.items || [])
            } else {
                console.error('Failed to fetch bracket');
            }
        };

        fetchBracket();
    }, [bracketId]);

    useEffect(() => {
        if (elements.length > 0 && displayedItems.length === 0) {
            moveElementsToDisplayed();
        }
    }, [elements, displayedItems]);

    const moveElementsToDisplayed = () => {
        const elementsToDisplay = elements.slice(0, 2) || []; 
        setDisplayedItems(elementsToDisplay); 
        setElements((prevElements) => prevElements.slice(2) || []);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        console.log(selectedItem)
    };

    const handleSubmit = () => {
        if (selectedItem !== null) {
            setTemporaryBracket((prevTemporaryBracket) => [...prevTemporaryBracket, selectedItem]);
        } else {
            alert("Select a choice");
        }
    }; 

    useEffect (() => {
        if (temporaryBracket.length !== 0) {
            if (elements.length > 1) {
                setSelectedItem(null);
                moveElementsToDisplayed();
            } else if (elements.length === 1) {
                setElements([...temporaryBracket, elements[0]]);            
                moveElementsToDisplayed();
            } else {
                if (temporaryBracket.length > 1) {
                    setElements(temporaryBracket);
                    setTemporaryBracket([]);
                    moveElementsToDisplayed();
                } else {
                    const winner = temporaryBracket[0];
                    setWinner(winner);
                    handleWinner(winner)
                }
            }
        }
    }, [temporaryBracket]);

    const handleWinner = async (winner) => {
        const response = await fetch(`/bracket/${bracket.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ winner: winner }),
        });
        
        if (response.ok) {
            console.log('Winner updated successfully');
        } else {
            console.error('Failed to update winner');
        }
    }

    if (!bracket) return <div className="loading-page">Loading...</div>;


    return (
        <>
            <PageNavbar title={bracket.name} button={<Link to="/" className="navbar-button">Home</Link>} />
            <div>
                <h1>{bracket.name}</h1>
                <p>{bracket.description}</p>
            </div>
            <div>
                <h1>Choose</h1>
                {!winner && (
                <div>
                    {displayedItems && displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div key={index} onClick={() => handleSelectItem(item)} className="navbar-button">
                                {item}
                            </div>
                        ))
                    ) : (
                        <div>No items available.</div>
                    )}
                    <button onClick={handleSubmit} className="navbar-button">Submit</button>
                </div>
                )}
            </div>
            {winner && <div>Winner: {winner}</div>}
            
            
            </>
    )
}

export default FillBracketPage;