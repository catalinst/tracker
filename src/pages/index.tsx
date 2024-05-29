// @ts-nocheck
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ethPrice, setEthPrice] = useState('');
  const [memePrice, setMemePrice] = useState('');
  const [bidValue, setBidValue] = useState(0);

  useEffect(() => {
    getPrices();
    getBidValue();
  }, []);

  const unpackPrices = (data) => {
    setEthPrice(data[0].price);
    setMemePrice(data[1].price);
  };

  const computeBid = (data) => {
    const value = Number(data.stats.market.topBid.price.amount.decimal);
    setBidValue(value - value * 0.005);
  };

  const getPrices = () => {
    fetch('https://api.binance.com/api/v3/ticker/price?symbols=["MEMEUSDT","ETHUSDT"]')
      .then(res => res.json())
      .then(data => unpackPrices(data));
  };

  const getBidValue = () => {
    fetch('https://api.reservoir.tools/stats/v2?collection=0x769272677fab02575e84945f03eca517acc544cc')
      .then(res => res.json())
      .then(data => computeBid(data));
  };

  const computeMemecoinValue = () =>
    (741187 * memePrice).toFixed(2)

  const computeCaptainzValue = () =>
    (2 * bidValue * ethPrice).toFixed(2)

  const computeTotalValue = () =>
    (Number(computeMemecoinValue()) + Number(computeCaptainzValue())).toFixed(2)

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        Memecoin value: {computeMemecoinValue()}
      </div>
      <div className={styles.description}>
        Captainz value: {computeCaptainzValue()}
      </div>
      <div className={styles.description}>
        Total value: {computeTotalValue()}
      </div>
      <div className={styles.description}>
        Captainz eth value: {(2 * bidValue).toFixed(2)}
      </div>
    </main>
  );
}
