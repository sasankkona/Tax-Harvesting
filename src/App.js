import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import { CiCircleInfo } from "react-icons/ci";
import Header from './components/Header';
import HoldingsTable from "./components/HoldingsTable";
import { getCapitalGains } from "./components/api/capitalGains";
import PreHarvestingCard from "./components/PreHarvestingCard";
import AfterHarvestingCard from "./components/AfterHarvestingCard";
import { getHoldings } from "./components/api/holdings";
import './App.css';

function App() {
  const [baseGains, setBaseGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [viewAllHoldings, setViewAllHoldings] = useState(false);

  const [afterHarvestingGains, setAfterHarvestingGains] = useState(null);
  const [preRealisedGains, setPreRealisedGains] = useState(0);

  useEffect(() => {
    getCapitalGains().then((data) => {
      const gains = data.capitalGains;
      setBaseGains(gains);
      setAfterHarvestingGains(gains); // Start with same values

      // Calculate and store pre-harvesting realised capital gains
      const realised =
        gains.stcg.profits - gains.stcg.losses +
        gains.ltcg.profits - gains.ltcg.losses;
      setPreRealisedGains(realised);
    });

    getHoldings().then((data) => setHoldings(data));
  }, []);

  const updateHarvesting = (selected) => {
    if (!baseGains) return;

    let stcgProfits = baseGains.stcg.profits;
    let stcgLosses = baseGains.stcg.losses;
    let ltcgProfits = baseGains.ltcg.profits;
    let ltcgLosses = baseGains.ltcg.losses;

    for (const coin of holdings) {
      if (selected.includes(coin.coin)) {
        if (coin.stcg.gain >= 0) stcgProfits += coin.stcg.gain;
        else stcgLosses += Math.abs(coin.stcg.gain);

        if (coin.ltcg.gain >= 0) ltcgProfits += coin.ltcg.gain;
        else ltcgLosses += Math.abs(coin.ltcg.gain);
      }
    }

    setAfterHarvestingGains({
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    });
  };

  const handleToggle = (coin, all = false) => {
    let updated = [];

    if (coin === "all") {
      updated = all ? holdings.map((h) => h.coin) : [];
    } else {
      if (selectedCoins.includes(coin)) {
        updated = selectedCoins.filter((c) => c !== coin);
      } else {
        updated = [...selectedCoins, coin];
      }
    }

    setSelectedCoins(updated);
    updateHarvesting(updated);
  };

  const renderSavingsMessage = () => {
    if (!afterHarvestingGains) return null;

    const postRealised =
      afterHarvestingGains.stcg.profits - afterHarvestingGains.stcg.losses +
      afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses;

    const savings = preRealisedGains - postRealised;

    if (savings > 0) {
      return (
        <div className="savings-message">
          🎉 You're going to save ₹{savings.toFixed(2)} in taxes!
        </div>
      );
    }

    return null;
  };

  const toggleViewAll = () => {
    setViewAllHoldings(!viewAllHoldings);
  };

  const displayedHoldings = viewAllHoldings ? holdings : holdings.slice(0, 5);

  return (
    <div className="ain-container">
      <Header />
      <div className='main-container'>
        <div className='heading-container'>
          <h1 className='heading'>
            Tax Harvesting{' '}
            <a
              href="#normal"
              className="link"
              data-tooltip-id="how-it-works-tooltip"
              data-tooltip-content="Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. Know More"
            >
              How it works?
            </a>
          </h1>
          <Tooltip id="how-it-works-tooltip" place="bottom" className='tool-tip' />
        </div>

        <details className='important-container'>
          <summary className='important-heading'>
            <CiCircleInfo size={30} className="info" />
            Important Notes & Disclaimers
          </summary>
          <ul className='important-list'>
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </details>

        {/* Capital Gains Cards */}
        {baseGains && afterHarvestingGains && (
          <div className="gains-container">
            <div>
              <PreHarvestingCard title="Pre Harvesting" capitalGains={baseGains} />
            </div>
            <div>
              <AfterHarvestingCard title="After Harvesting" capitalGains={afterHarvestingGains} isBlue savings={preRealisedGains - (
                afterHarvestingGains.stcg.profits - afterHarvestingGains.stcg.losses +
                afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses
              )}/>
              {renderSavingsMessage()}
            </div>
          </div>
        )}

        {holdings.length > 0 && (
          <>
            <HoldingsTable
              holdings={displayedHoldings}
              selectedCoins={selectedCoins}
              onToggle={handleToggle}
              className="holdings-table"
            />
            {holdings.length > 5 && (
              <div className="view-all-container">
                <button className="view-all-button" onClick={toggleViewAll}>
                  {viewAllHoldings ? "View Less" : "View All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
