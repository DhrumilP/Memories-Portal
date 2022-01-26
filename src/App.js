import React, { useEffect, useState } from 'react';
import './App.css';
import { TEST_GIFS } from './dummy_gifs';

// Constants
const WEBSITE_NAME = 'Dhrumil Pandya';
const WEBSITE_LINK = 'https://dhrumilpandya.com/';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

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

  const onInputChange = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input. Try agaain.');
    }
  };

  const renderConnectedContainer = () => (
    <div className='connected-container'>
      <form
        onSubmit={event => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type='text'
          value={inputValue}
          onChange={onInputChange}
          placeholder='Enter gif link!'
        />
        <button type='submit' className='cta-button submit-gif-button'>
          Submit
        </button>
      </form>
      <div className='gif-grid'>
        {gifList.map(gif => (
          <div className='gif-item' key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
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

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className='App'>
      <div className={walletAddress ? 'connected-container' : 'container'}>
        <div className='header-container'>
          <p className='header'>🚀 Memories Portal</p>
          <p className='sub-text'>
            View your memories collection in the metaverse 🐼
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
