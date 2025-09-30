import { useState , useEffect } from 'react'
import './App.css'

function Fetch_quotes(){

  const [quote,setQuote] = useState("Being nice doesn't mean that you are kind, it takes strength and sincerity to be kind");
  const [buttonText, setButtonText] = useState("FETCH A QUOTE");
  const [author, setAuthor] = useState("VIVEK THAKUR");

  async function fetch_quote() {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes",{
        headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}}
      );
      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
  }

  return(
    <div className="flex flex-col justify-evenly border-white h-fit w-[35em] mt-[10em]">
      <p className="font-[monaco] text-gray-400">{quote}</p>
      <p className="font-[monaco] text-gray-400 self-end">- {author}</p>
      <button onClick={fetch_quote} className="font-[monaco] p-1.5 mt-10 bg-gray-300 w-fit text-sm">{buttonText}</button>
    </div>
  )
}

function App() {

  return (
    <div className="flex flex-col justify-evenly">
      <header className="flex justify-center items-center h-[10vh]">
        <h1 className="font-[monaco] text-white font-extrabold text-4xl">RANDOM QUOTES</h1>
      </header>
      <main className="flex h-[90vh] justify-center">
        <Fetch_quotes />
      </main>
    </div>
  )
}

export default App
