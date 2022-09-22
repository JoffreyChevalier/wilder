import { useEffect, useState } from 'react';

import { getWilders } from '../services/wilder';
import { IWilder } from '../types/IWilder';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Wilder from '../components/Wilder';
import NewWilderForm from '../components/NewWilderForm';

function HomePage() {
  const [wildersData, setWildersData] = useState<IWilder[]>([]);
  const [isLaoding, setIsLaoding] = useState(false);

  const loadWildersData = async () => {
    setIsLaoding(true);
    try {
      setWildersData(await getWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLaoding(false);
    }
  };

  useEffect(() => {
    loadWildersData();
  }, []);

  return (
    <div>
      <Header />
      {isLaoding ? (
        'Chargement...'
      ) : (
        <>
          <NewWilderForm loadWildersData={loadWildersData} />
          <main className='container'>
            <h2>Wilders</h2>
            <section className='card-row'>
              {wildersData.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  wilder={wilder}
                  loadWildersData={loadWildersData}
                />
              ))}
            </section>
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
