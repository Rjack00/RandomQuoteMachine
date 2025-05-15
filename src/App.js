import './App.css';
import React from 'react';

const api_url =   "https://quoteslate.vercel.app/api/quotes/random";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: ""
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(api_url);
  }
  
  fetchData = async (url) => {
    try{
       const response = await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
   
    let data = await response.json();
    const quoteText = data.quote || data.quotes?.[0] || data;
      const quoteAuth = data.author || data.author?.[0] || data;
    console.log("data: ",quoteText);
    console.log("quoteAuthor: ",quoteAuth);
    this.setState({
      quote: quoteText,
      author: quoteAuth
    })
   } catch (error) {
    console.error(`My Error message: ${error.message}`)
   }
    
  };
  
  
  
  render() {
    return (
    <div id="quote-box">
        <h1 id="title">Random Quotes</h1>
      <h2 id="text" >{this.state.quote}</h2>
      <p id="author">{this.state.author}</p>
      <button id="new-quote" onClick={() => this.fetchData(api_url)} >New Quote</button>
      <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet Quote</a>
    </div>
    );
  }
  
};

export default App;
