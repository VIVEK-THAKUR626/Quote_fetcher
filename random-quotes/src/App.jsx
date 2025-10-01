import { useState } from 'react'
import './App.css'

function Fetch_quotes(){

  const [quote,setQuote] = useState("Being nice doesn't mean that you are kind, it takes strength and sincerity to be kind");
  const [buttonText, setButtonText] = useState("FETCH A QUOTE");
  const [author, setAuthor] = useState("VIVEK THAKUR");
  const [loading, setLoading] = useState(false);

  async function fetch_quote() {
      try {
        setLoading(true);
        setButtonText("Fetching...");

        const response = await fetch("https://api.api-ninjas.com/v1/quotes",{
          headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}}
        );

        setButtonText("FETCH A QUOTE");
        setLoading(false);

        const data = await response.json();
        setQuote(data[0].quote);
        setAuthor(data[0].author);

      } catch (error) {
        console.error(error);
        setQuote("Couldn't fetch a quote due to some issue");
        setAuthor("VIVEK THAKUR");
      }
  }

  return(
    <div className="flex flex-col justify-evenly border-white h-fit w-[35em] mt-[10em]">
      <p className={`font-[monaco] text-gray-400 ${loading ? "hidden" : "block"}`}>{quote}</p>
      <p className={`font-[monaco] text-gray-400 self-end ${loading ? "hidden" : "block"}`}>- {author}</p>
      <div className={`border-t-white ${loading ? "block" : "hidden"} border-gray-500 border-[0.4em] rounded-full animate-spin h-[4em] w-[4em] self-center`}></div>
      <button onClick={fetch_quote} disabled={loading} className="font-[monaco] p-1.5 mt-10 bg-gray-300 w-fit text-sm">{buttonText}</button>
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
