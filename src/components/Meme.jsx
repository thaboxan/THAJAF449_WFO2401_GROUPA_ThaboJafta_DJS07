// Importing the React library
import React from "react"

// Defining a functional component named Meme and exporting it as the default export
export default function Meme() {
    // Declaring a state variable `meme` and its setter `setMeme` to manage the meme details
    const [meme, setMeme] = React.useState({
        topText: "", // Text to appear at the top of the meme
        bottomText: "", // Text to appear at the bottom of the meme
        randomImage: "http://i.imgflip.com/1bij.jpg" // Initial random image URL
    })

    // Declaring a state variable `allMemes` and its setter `setAllMemes` to store all memes data fetched from the API
    const [allMemes, setAllMemes] = React.useState([])

    // useEffect hook to fetch memes data from the API when the component mounts
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes") // Fetching meme data from the API
            const data = await res.json() // Parsing the response as JSON
            setAllMemes(data.data.memes) // Setting the fetched memes data to `allMemes` state
        }
        getMemes() // Invoking the async function to fetch memes
    }, []) // Empty dependency array ensures this effect runs only once after the initial render
    
    // Function to set a new random meme image from the fetched memes
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length) // Generating a random index
        const url = allMemes[randomNumber].url // Getting the URL of the random meme
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url // Updating the `randomImage` property with the new URL
        }))
    }
    
    // Function to handle changes in the input fields
    function handleChange(event) {
        const {name, value} = event.target // Extracting the name and value from the event target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value // Dynamically updating the corresponding state property
        }))
    }
    
    // Rendering the component UI
    return (
        <main>
            <div className="form">
                {/* Input field for the top text */}
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                {/* Input field for the bottom text */}
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                {/* Button to get a new meme image */}
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            {/* Displaying the meme image and texts */}
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
