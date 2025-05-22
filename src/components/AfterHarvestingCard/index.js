import '../../styles/cards.css';

const AfterHarvestingCard = ({ capitalGains, savings }) => {
    const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    const totalNet = stcgNet + ltcgNet;

    return (
        <div className="after-harvesting-card">
            <h2 className="after-harvesting-title">After Harvesting</h2>
            <table className="after-harvesting-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Short-term</th>
                        <th>Long-term</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Profits</td>
                        <td>₹{capitalGains.stcg.profits.toFixed(2)}</td>
                        <td>₹{capitalGains.ltcg.profits.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Losses</td>
                        <td>₹{capitalGains.stcg.losses.toFixed(2)}</td>
                        <td>₹{capitalGains.ltcg.losses.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Net Capital Gains</strong></td>
                        <td><strong>₹{stcgNet.toFixed(2)}</strong></td>
                        <td><strong>₹{ltcgNet.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            <div className="after-harvesting-summary">
                Effective Capital Gains: <span className="after-harvesting-total">₹{totalNet.toFixed(2)}</span>
            </div>
            {savings > 0 && (
                <div className="after-harvesting-savings">
                    🎉 You are going to save upto ₹{savings.toFixed(2)}
                </div>
            )}
        </div>
    );
};

export default AfterHarvestingCard;
