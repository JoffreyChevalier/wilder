import { useEffect, useState } from 'react';

import Wilder from '../components/Wilder';
import { getWilders } from '../services/wilder';
import NewWilderForm from '../components/NewWilderForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
  const [wildersData, setWildersData] = useState([]);
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
                  id={wilder.id}
                  name={wilder.name}
                  bio={wilder.bio}
                  skills={wilder.skills}
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
