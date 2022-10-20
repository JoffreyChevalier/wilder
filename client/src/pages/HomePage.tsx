import Header from '../components/Header';
import Footer from '../components/Footer';
import Wilder from '../components/Wilder';
import { useWildersQuery } from '../graphql/generated/schema';

function HomePage() {
  const { loading: isLoading, data, refetch } = useWildersQuery();
  console.log(data);

  const wildersData = data?.wilders || [];
  return (
    <div>
      <Header />
      {isLoading ? (
        'Chargement...'
      ) : (
        <>
          {/* <AddWilderForm loadWildersData={refetch} /> */}
          <main className='container'>
            <h2>Wildersssss</h2>
            <section className='card-row'>
              {wildersData.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  wilder={wilder}
                  loadWildersData={refetch}
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
