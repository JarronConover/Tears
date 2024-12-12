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
                    <label htmlFor="numItems" className="">Number of Items (0-16):</label>
                    <input
                        type="number"
                        id="numItems"
                        name="numItems"
                        value={formData.numItems}
                        onChange={handleInputChange}
                        min="0"
                        max="16"
                        className="border rounded w-full p-2"
                    />
                </div>
                {Array.from({ length: formData.numItems }).map((_, index) => (
                    <div key={index}>
                        <label htmlFor={`item-${index}`} className="">Item {index + 1}:</label>
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
                <button type="submit" className="">Submit</button>
            </form>
        </>
    );
}

export default CreatePage;
