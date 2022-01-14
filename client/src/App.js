import './App.css';
import {Routes, Route, Link } from 'react-router-dom';
import CountryCards from './components/CountryCards';
import CountryDetails from './components/CountryDetails';
import ActivCreate from './components/ActivCreate';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <header>
        <Link to ='/api/country'><h1> Home </h1></Link>
      </header>
      <main>
        <Routes>
          <Route path = '/api/country/create' element = {<ActivCreate/>}/>
          <Route path = '/api/country/:id' element = {<CountryDetails/>}/>
          <Route path = '/api/country' element = {<CountryCards/>}/>
          <Route path = '/' element = {<Landing/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
