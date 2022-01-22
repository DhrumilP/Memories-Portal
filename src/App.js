import React, { useEffect, useState } from 'react';
import './App.css';

// Constants
const WEBSITE_NAME = 'Dhrumil Pandya';
const WEBSITE_LINK = 'https://dhrumilpandya.com/';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

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
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Install phantom! ');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

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
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className='header-container'>
          <p className='header'>🚀 Memories Portal</p>
          <p className='sub-text'>
            View your memories collection in the metaverse 🐼
          </p>
          {!walletAddress && renderNotConnectedContainer()}
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
