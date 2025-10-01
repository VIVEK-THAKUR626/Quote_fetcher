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

  async function shareQuote(){
      const shareData = { text : quote };
      try{
        await navigator.share(shareData);
      }
      catch{
        alert("Couldn't share the quote");
      }
  }

  return(
    <div className="flex flex-col justify-evenly border-white h-fit w-[35em] mt-[10em]">
      <p className={`font-[monaco] text-gray-400 ${loading ? "hidden" : "block"}`}>{quote}</p>
      <p className={`font-[monaco] text-gray-400 self-end ${loading ? "hidden" : "block"}`}>- {author}</p>
      <div className={`border-t-white ${loading ? "block" : "hidden"} border-gray-500 border-[0.4em] rounded-full animate-spin h-[4em] w-[4em] self-center`}></div>
      <div className="flex">
        <button onClick={fetch_quote} disabled={loading} className="font-[monaco] p-1.5 mt-10 bg-gray-300 w-fit text-sm">{buttonText}</button>
        <button onClick={shareQuote} className={`bg-gray-300 w-fit h-fit rounded-full p-1 mt-10 ml-5 ${loading ? "hidden" : "block"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" viewBox="0 0 640 640"><path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z"/></svg>
        </button>
      </div>
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
