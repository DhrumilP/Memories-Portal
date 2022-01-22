import React, { useEffect } from 'react';
import './App.css';

// Constants
const WEBSITE_NAME = 'Dhrumil Pandya';
const WEBSITE_LINK = 'https://dhrumilpandya.com/';

const App = () => {
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      console.log(solana);

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
        }
      } else {
        alert('Install phantom! ');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className='App'>
      <div className='container'>
        <div className='header-container'>
          <p className='header'>🚀 Memories Portal</p>
          <p className='sub-text'>
            View your memories collection in the metaverse 🐼
          </p>
        </div>
        <div className='footer-container'>
          <a
            className='footer-text'
            href={WEBSITE_LINK}
            target='_blank'
            rel='noreferrer'
          >
            {`built by @${WEBSITE_NAME} with `}
            <span className='emoji'></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
