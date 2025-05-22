import React from "react";

const HoldingsTable = ({ holdings, selectedCoins, onToggle }) => {
    return (
        <div className="holdings-container">
            <table className="holdings-table">
                <thead className="holdings-thead">
                    <tr>
                        <th className="holdings-th">
                            <input
                                type="checkbox"
                                checked={selectedCoins.length === holdings.length}
                                onChange={(e) => onToggle("all", e.target.checked)}
                                className="holdings-checkbox"
                            />
                        </th>
                        <th className="holdings-th">Asset</th>
                        <th className="holdings-th-right">
                            Holdings
                            <div className="holdings-text-xs">Current Market Rate</div>
                        </th>
                        <th className="holdings-th-right">Total Current Value</th>
                        <th className="holdings-th-right">Short-term</th>
                        <th className="holdings-th-right">Long-term</th>
                        <th className="holdings-th-right">Amount to Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((h) => {
                        const isChecked = selectedCoins.includes(h.coin);
                        const stGainClass = h.stcg.gain >= 0 ? "text-green-400" : "text-red-500";
                        const ltGainClass = h.ltcg.gain >= 0 ? "text-green-400" : "text-red-500";
                        const totalCurrentValue = h.totalHolding * h.currentPrice;
                        return (
                            <tr key={h.coin} className={`holdings-tr ${isChecked ? "holdings-tr-checked" : "holdings-tr-hover"}`}>
                                <td className="holdings-td">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => onToggle(h.coin)}
                                        className="holdings-checkbox"
                                    />
                                </td>
                                <td className="holdings-td holdings-flex">
                                    <img
                                        src={h.logo}
                                        alt={h.coinName}
                                        className="holdings-img"
                                    />
                                    <span className="holdings-font-medium">{h.coinName}</span>
                                </td>
                                <td className="holdings-td-right">
                                    <div>{h.totalHolding.toFixed(6)} {h.coin}</div>
                                    <div className="holdings-text-xs">${h.currentPrice.toFixed(2)}/{h.coin}</div>
                                </td>
                                <td className="holdings-td-right">${totalCurrentValue.toFixed(2)}</td>
                                <td className={`holdings-td-right font-semibold ${stGainClass}`}>
                                    <div>{h.stcg.gain >= 0 ? "+" : "-"}${Math.abs(h.stcg.gain).toFixed(2)}</div>
                                    <div className="holdings-text-xs">{h.stcg.balance.toFixed(3)} {h.coin}</div>
                                </td>
                                <td className={`holdings-td-right font-semibold ${ltGainClass}`}>
                                    <div>{h.ltcg.gain >= 0 ? "+" : "-"}${Math.abs(h.ltcg.gain).toFixed(2)}</div>
                                    <div className="holdings-text-xs">{h.ltcg.balance.toFixed(3)} {h.coin}</div>
                                </td>
                                <td className="holdings-td-right">
                                    {isChecked ? `${h.totalHolding.toFixed(6)} ${h.coin}` : "-"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HoldingsTable;
