import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // const filteredCoinsSymbol = coins.filter((coin) =>
  //   coin.symbol.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input
            className="coin-input"
            placeholder="Search"
            type="text"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          marketcap={coin.market_cap}
          image={coin.image}
          symbol={coin.symbol}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
        />
      ))}
    </div>
  );
}

export default App;
