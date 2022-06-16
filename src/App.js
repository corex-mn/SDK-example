import "./App.css";
import {Bitski} from "krypteo";
import Web3 from "web3";
import {useEffect, useState} from "react";

function App() {

  const [result, setResult] = useState();

  useEffect(() => {
    const bitski = new Bitski(
        "6f7ef93b-e42a-45ce-87a7-8dee62bb1fa2",
        `${window.location.origin}/callback/callback.html`,
        [],
    );
    window.bitski = bitski;

    const provider = bitski.getProvider({network: {
        chainId: 3305,
        rpcUrl: "https://node-testnet.corexchain.io"
      }});
    window.web3 = new Web3(provider);
  }, []);

    async function signIn() {
        await window.bitski.signIn();
    }

    async function getAccounts() {
        const accounts = await window.web3.eth.getAccounts();
        console.log(accounts);
    }

    async function sendTx() {
      const accounts = await window.web3.eth.getAccounts();
      window.web3.eth.sendTransaction(
          {
            from: accounts[0],
            to: '0x89995e30DAB8E3F9113e216EEB2f44f6B8eb5730',
            value: window.web3.utils.toWei('1', 'ether'),
            gas: 21000,
            gasPrice: window.web3.utils.toWei('1000', 'gwei'),
          }).then((x) => {
            setResult(x.transactionHash);
            console.log(x);
      }).catch(e => {
        console.log(e);
      })
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => signIn()}>signIn</button>
                <button onClick={() => getAccounts()}>get accounts</button>
                <button onClick={() => sendTx()}>send</button>
              {result && <a href={`https://explorer-testnet.corexchain.io/transactions/${result}`}
                            target='_blank' rel='noopener noreferrer'>{result}</a>}
            </header>
        </div>
    );
}

export default App;
