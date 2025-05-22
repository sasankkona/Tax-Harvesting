import '../../styles/cards.css';

const PreHarvestingCard = ({ capitalGains }) => {
    const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    const totalNet = stcgNet + ltcgNet;

    return (
        <div className="pre-harvesting-card">
            <h2 className="pre-harvesting-title">Pre Harvesting</h2>
            <table className="pre-harvesting-table">
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
            <div className="pre-harvesting-summary">
                Realised Capital Gains: <span className="pre-harvesting-total">₹{totalNet.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default PreHarvestingCard;
