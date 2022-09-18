import React, { useEffect,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Whitelist from './pages/WHITELIST';
import NftCollection from './pages/Nft_collection';
import Footer from './components/Footer'
import './index.css'
import {WalletConnectedProvider,WalletConnectedContext} from './utils/context'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <WalletConnectedProvider>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/whitelist" element={<Whitelist/>}/>
        <Route exact path="/nft-collection" element={<NftCollection/>}/>
      </Routes>
      <Footer/>
      </WalletConnectedProvider>
    </Router>
    
  </React.StrictMode>
);
