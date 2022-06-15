import logo from "./logo.svg";
import "./App.css";
import { Bitski } from "krypteo";
import Web3 from "web3";
import { AuthorizationServiceConfiguration } from "@openid/appauth";

function App() {
    // console.log(window.location.origin);
    const bitski = new Bitski(
        "8a99928d-12eb-41a8-a1df-8a2838fe16d9",
        // "6f1232b1-3742-4ad3-9a6c-03c895a02fed",
        `${window.location.origin}/callback/callback.html`,
        [],
        {
            configuration: new AuthorizationServiceConfiguration({
                authorization_endpoint:
                    "http://192.168.0.190:3232/auth/realms/wallet/protocol/openid-connect/auth",
                revocation_endpoint: "",
                token_endpoint:
                    "http://192.168.0.190:3232/auth/realms/wallet/protocol/openid-connect/token",
                userinfo_endpoint:
                    "http://192.168.0.190:3232/auth/realms/wallet/protocol/openid-connect/userinfo",
            }),
        },
    );

    const provider = bitski.getProvider();
    const web3 = new Web3(provider);

    async function signIn() {
        await bitski.signIn();
    }

    // async function getBlockNumber() {
    //     const network = await web3.eth.getBlockNumber();
    //     console.log(network);
    // }

    async function getAccounts() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }

    // signIn();
    // getBlockNumber();
    // getAccounts();

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => signIn()}>signIn</button>
                <button onClick={() => getAccounts()}>get accounts</button>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
