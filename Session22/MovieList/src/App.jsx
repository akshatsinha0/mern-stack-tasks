
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieList from './components/MovieList/MovieList';
import Slider from './components/Slider/Slider';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import './App.css';
import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <MovieList />
      <Slider />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
