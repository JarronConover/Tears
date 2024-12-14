import { useEffect, useState } from "react";
import PageNavbar from "../components/PageNavbar";
import { Link } from "react-router-dom";

function CreatePage(props) {
    const {} = props;
    
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState(null);

    
    async function getUser() {
        const res = await fetch('/me/', {
            credentials: "same-origin",
        });
        const body = await res.json();
        setUser(body.username);
        setFirstName(body.firstName);
    }
    
    useEffect(() => {
        getUser();
    }, []);
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        numItems: 0,
        items: [],
        username: user || "",
        user: firstName || "",
        winner: "",
    });

    useEffect(() => {
        if (user && firstName) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                username: user,
                user: firstName,
            }));
        }
    }, [user, firstName])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "numItems") {
            const newNumItems = Math.min(Math.max(parseInt(value, 10) || 0, 0), 16);
            setFormData({
                ...formData,
                numItems: newNumItems,
                items: formData.items.slice(0, newNumItems),
            });
        } else if (name.startsWith("item-")) {
            const index = parseInt(name.split("-")[1], 10);
            const updatedItems = [...formData.items];
            updatedItems[index] = value;
            setFormData({ ...formData, items: updatedItems });
        } 
         else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNumItemsClick = (num) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            numItems: num,
            items: prevFormData.items.slice(0, num),
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/create/", {
                credentials: "same-origin",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
      
            if (response.ok) {
                const result = await response.json();
                console.log("Bracket successfully added:", result);
                alert("Bracket added successfully!");
            } else {
                const errorData = await response.json();
                console.error("Error adding bracket:", errorData);
                alert("Failed to add bracket. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the bracket.");
        }
    };

    return (
        <>
            <PageNavbar
                title="Create Brackets"
                button={<Link to={"/"} className="navbar-button">Home</Link>}
            />
            <form onSubmit={handleSubmit} className="">
                <div>
                    <label htmlFor="name" className="">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2"
                    />
                </div>
              <div>
                    <label className="">Number of Items:</label>
                    <div className="flex space-x-2">
                        {[2, 4, 8, 16].map((num) => (
                            <button
                                key={num}
                                type="button"
                                className={`border rounded p-2 ${
                                    formData.numItems === num ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                                onClick={() => handleNumItemsClick(num)}
                            >
                                {num} Items
                            </button>
                        ))}
                    </div>
                </div>
                {formData.numItems > 0 && (
                    <div className={`bracket-container-${formData.numItems}`}>
                        {/* Left div with first half of items */}
                        <div className="w-1/2">
                            {Array.from({ length: Math.floor(formData.numItems / 2) }).map((_, index) => (
                                <div className="div-for-item" key={index}>
                                    <input
                                        type="text"
                                        id={`item-${index}`}
                                        name={`item-${index}`}
                                        value={formData.items[index] || ""}
                                        onChange={handleInputChange}
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Divs in between */}
                        {
                            (() => {
                                const dividerCounts = [1, 2, 4, 6];  // Dividers for 2, 4, 8, and 16 items
                                const index = Math.log2(formData.numItems) - 1; // Get the correct index for the divider counts array
                                const count = dividerCounts[index]; // Get the number of dividers
                                
                                // Generate the correct naming for divs
                                const divNames = [];
                                const halfCount = Math.floor(count / 2);

                                // For even count of dividers, name them in this pattern: div-3, div-2, div-1, div-1, div-2, div-3
                                if (count % 2 === 0) {
                                    for (let i = halfCount; i >= 1; i--) {
                                        divNames.push(`middle-div-${i}`);
                                    }
                                    for (let i = 1; i <= halfCount; i++) {
                                        divNames.push(`middle-div-${i}`);
                                    }
                                } else {
                                    // For odd count of dividers, name them in this pattern: div-3, div-2, div-1, div-1, div-2, div-3
                                    for (let i = halfCount; i > 0; i--) {
                                        divNames.push(`middle-div-${i}`);
                                    }
                                    divNames.push('middle-div-1');
                                    for (let i = 2; i <= halfCount; i++) {
                                        divNames.push(`middle-div-${i}`);
                                    }
                                }

                                return divNames.map((name, idx) => {
                                    // Determine how many filler divs to add based on the name
                                    let fillerCount = 0;
                                    if (name === "middle-div-1") {
                                        fillerCount = 1;
                                    } else if (name === "middle-div-2") {
                                        fillerCount = 3;
                                    } else if (name === "middle-div-3") {
                                        fillerCount = 7;
                                    }
                                
                                    // Generate the filler divs based on the fillerCount
                                    const fillers = Array.from({ length: fillerCount }).map((_, i) => (
                                        <div className="filler-div" key={`filler-${i + 1}`} />
                                    ));
                                
                                    // Return the div with the filler divs inside
                                    return (
                                        <div className={name} key={idx}>
                                            {fillers}
                                        </div>
                                    );
                                });
                            })()
                        }

                        {/* Right div with the second half of items */}
                        <div className="w-1/2">
                            {Array.from({ length: Math.ceil(formData.numItems / 2) }).map((_, index) => (
                                <div className="div-for-item" key={index}>
                                    <input
                                        type="text"
                                        id={`item-${Math.floor(formData.numItems / 2) + index}`}
                                        name={`item-${Math.floor(formData.numItems / 2) + index}`}
                                        value={formData.items[Math.floor(formData.numItems / 2) + index] || ""}
                                        onChange={handleInputChange}
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button type="submit" className="">Submit</button>
            </form>
        </>
    );
}

export default CreatePage;
