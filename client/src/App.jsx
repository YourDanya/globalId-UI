



/* global BigInt */

import './App.css';
import icebreakerAbi from './icebreakerAbi.json'
import { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from "web3";
import axios from 'axios'
import Modal from '@material-ui/core/Modal';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import CreateChallengeForm from './components/CreateChallengeForm';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import authApi from './api/auth.api';
import { logout } from './redux/user/user.slice';
import userApi from './api/user.api';
import ChangeNameForm from './components/ChangeNameForm';

function App({logout, editUser}) {
  const chains = [
    {
      id: '137',
      chainId: '0x89',
      nativeCurrency: {
        name: 'MATIC token',
        symbol: 'MATIC',
        decimals: 18
      },
      chainName: 'Polygon Mainnet',
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
      name: 'POLYGON MAINNET',
      icebreakerAddress: '0xD00B0A1bC8E13cE848F1e2ff0f6Ff2027610d09c',
      source: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
    },
    {
      id: '80001',
      chainId: '0x13881',
      nativeCurrency: {
        name: 'MATIC token',
        symbol: 'MATIC',
        decimals: 18
      },
      chainName: 'Polygon Testnet',
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      name: 'POLYGON TESTNET (MUMBAI)',
      icebreakerAddress: '0xeECF94Fc94ad65b8f7b1123F3388A9747BC596c7',
      source: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
    }
]
  const [currentChainIndex, setCurrentChainIndex] = useState(0)
  const [user, setUser] = useState({
    challenges: [],
    inspections: [],
    currentAccount: '',
    balance: 0,
    name: ''
  })
  let [icebreaker, setIcebreaker] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false)
  const [showChangeNameModal, setShowChangeNameModal] = useState(false)
  let [maticPriceUSD, setMaticPriceUSD] = useState(0)
  let [maticPriceUAH, setMaticPriceUAH] = useState(0)
  const [currencyIndex, setCurrencyIndex] = useState(parseInt(localStorage.getItem('icebreaker-currency-index')) || 0)
  const currencies = ['MATIC', 'UAH', 'USD']
  const [usernameToSearch, setUsernameToSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  let web3js = new Web3(window.ethereum)

  async function connectAccount() {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    }).catch(err => console.log(JSON.stringify(err)))
    // then(async () => await window.ethereum.request({
    //   method: 'eth_requestAccounts'
    // })).catch(async err => {
    //   //When using mobile
    //   if (err.data.code == 32601) {
    //     return 
    //   }
    // }).catch((err) => alert(JSON.stringify(err)))
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then(res => console.log(JSON.stringify(res))).catch(err => alert(JSON.stringify(err)))
    const account = accounts[0]
    user.currentAccount = account
    setUser({ ...user })
  }



  const updateData = useCallback(
    () => {
      (async () => {
        
        if (!user.currentAccount) return

        maticPriceUSD = (await axios.get('https://api.coinbase.com/v2/prices/MATIC-USD/spot')).data.data.amount
        maticPriceUAH = (await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')).data.find(item => item.ccy == 'USD').sale * maticPriceUSD
        setMaticPriceUAH(maticPriceUAH)
        setMaticPriceUSD(maticPriceUSD)



        const userChallengesIds = await icebreaker.methods.getChallengesByUser(user.currentAccount).call()
        const userInspectionsIds = await icebreaker.methods.getInspectionsByUser(user.currentAccount).call()

        let userChallenges = []
        let userInspections = []

        for (let index in userChallengesIds) {
          const challenge = await icebreaker.methods.getChallengeInfo(userChallengesIds[index]).call()
          challenge.id = userChallengesIds[index]
          userChallenges.push(challenge)
        }

        for (let index in userInspectionsIds) {
          const challenge = await icebreaker.methods.getChallengeInfo(userInspectionsIds[index]).call()
          challenge.id = userInspectionsIds[index]
          userInspections.push(challenge)
        }

        user.balance = await window.ethereum.request({ method: 'eth_getBalance', params: [user.currentAccount, 'latest'] })
        user.balance = Math.trunc((parseInt(user.balance, 16) / Math.pow(10, 18)) * 1000) / 1000
        user.balanceUAH = Math.trunc(maticPriceUAH * user.balance * 100) / 100
        user.balanceUSD = Math.trunc(maticPriceUSD * user.balance * 1000) / 1000

        const allFetchedUsers = await getAllUsers()
        console.log(allFetchedUsers)
        const userInDatabase = allFetchedUsers.find(item => item.web3Address === user.currentAccount)
        user.name = userInDatabase?.name

        setUser({ ...user, challenges: userChallenges, inspections: userInspections })
        setAllUsers(allFetchedUsers)
      })()
    },
    [icebreaker],
  )

  function createChallenge({ challengerStakeAtRisk, description, inspectorAddress, timeoutAfterMilliseconds, inspectorReward }) {
    const challengerStakeAtRiskWei = challengerStakeAtRisk * Math.pow(10, 18)
    const inspectorRewardWei = BigInt(inspectorReward * Math.pow(10, 18))
    console.log(inspectorRewardWei);
    console.log(inspectorReward);
    const timeoutAfterSeconds = Math.floor(timeoutAfterMilliseconds / 1000)
    icebreaker.methods.createChallenge(description, inspectorAddress, timeoutAfterSeconds, inspectorRewardWei).send({ from: user.currentAccount, value: challengerStakeAtRiskWei }).catch(err => console.log(err.message))
  }

  function msToTime(allMilliseconds) {
    let milliseconds = allMilliseconds % 1000
    let allSeconds = Math.trunc(allMilliseconds / 1000)
    let seconds = allSeconds % 60
    let allMinutes = Math.trunc(allSeconds / 60)
    let minutes = allMinutes % 60
    let allHours = Math.trunc(allMinutes / 60)
    let hours = allHours  % 24
    let allDays = Math.trunc(allHours / 24)
    let days = allDays % 30
    let allMonths = Math.trunc(allDays / 30)


    return `${allMonths && allMonths + ' months' || ''} ${days && days + ' days' || ''} ${hours && hours + ' hours' || ''} ${minutes && minutes + ' min' || ''}  ${(allMilliseconds <= 300000 && seconds) && seconds + ' sec' || ''}`
  }



  function changeCurrency() {
    const nextCurrencyIndex = currencyIndex < 2 ? currencyIndex + 1 : 0
    setCurrencyIndex(nextCurrencyIndex)
    localStorage.setItem('icebreaker-currency-index', nextCurrencyIndex)
  }

  function displayPriceFromWei(wei) {
    switch (currencyIndex) {
      case 0: return Math.trunc((wei / Math.pow(10, 18)) * 1000) / 1000 + ' ' + currencies[currencyIndex]
      case 1: return Math.trunc(wei * maticPriceUAH / Math.pow(10, 18) * 100) / 100 + ' ' + currencies[currencyIndex]
      case 2: return Math.trunc(wei * maticPriceUSD / Math.pow(10, 18) * 1000) / 1000 + ' ' + currencies[currencyIndex]
    }
  }

  function displayPriceFromEther(ether) {
    switch (currencyIndex) {
      case 0: return Math.trunc(ether * 1000) / 1000 + ' ' + currencies[currencyIndex]
      case 1: return Math.trunc(ether * maticPriceUAH * 100) / 100 + ' ' + currencies[currencyIndex]
      case 2: return Math.trunc(ether * maticPriceUSD * 1000) / 1000 + ' ' + currencies[currencyIndex]
    }
  }

  async function loginWithWeb3(address) {
    const message = 'Login to icebreaker app with this address'
    const signature = await web3js.eth.personal.sign(message, address)
    const response = await authApi.postSingle('login-with-web3', {message, address, signature})
    console.log(response);
  }

  async function switchChain(chainIndex) {
    setCurrentChainIndex(chainIndex)
  }

  async function changeName(newName) {
    const response = await userApi.postSingle('user-data', {name: newName})
    console.log(response);
    return response
  }

  async function getAllUsers() {
    return await userApi.getSingle('user-data/all-users')
  }

  useEffect(() => {


    if (window.ethereum) window.ethereum.on('accountsChanged', function (accounts) {
      user.currentAccount = accounts[0]
      setUser({ ...user })

      if (accounts.length > 0) loginWithWeb3(user.currentAccount)
      else logout()
    });

  }, [])

  useEffect(() => {
    if (window.ethereum) {
      (async () => {
      let chainId = web3js.utils.toHex(chains[currentChainIndex].id);
      let icebreakerAddress = chains[currentChainIndex].icebreakerAddress

      let currentIcebreaker = new web3js.eth.Contract(icebreakerAbi, icebreakerAddress)
      setIcebreaker(currentIcebreaker)
      console.log('requesting chainib:', chainId);
      try {await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
        if (error.data.originalError.code == 4902 ) {
          const {chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls} = chains[currentChainIndex]
          const params = [{ chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls }]
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params
          }).catch(err => alert(JSON.stringify(err)))
        }
    }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts) {
        user.currentAccount = accounts[0]
        setUser({ ...user })
      }

    })()
  }
    
  }, [currentChainIndex])

  useEffect(() => {
    console.log(icebreaker);
  }, [icebreaker])



  let fetchDataInterval = useRef()

  useEffect(() => {
    console.log('set fetch data interval');
    fetchDataInterval.current && clearInterval(fetchDataInterval.current)
    fetchDataInterval.current = setInterval(updateData, 1000)
  }, [user.currentAccount, icebreaker])

  useEffect(() => {
    console.log(currencyIndex);
  }, [currencyIndex])


  if (!window.ethereum) {
    
    return (() => { alert('No wallet detected. You should install metamask or maybe other wallet'); return <div style={{ textAlign: 'right', paddingRight: '30%', fontSize: '20px' }}>
      <a style={{ color: 'black', textDecoration: 'none' }} href='https://icebreaker.gitbook.io/icebreaker/'>Читати пояснення</a>
    </div>})()
  }
  
  return (
    <div>
      <div style={{ textAlign: 'right', paddingRight: '30%', fontSize: '20px' }}>
        <a style={{color: 'black', textDecoration: 'none'}} href='https://icebreaker.gitbook.io/icebreaker/'>Читати пояснення</a>
        <button style={{position: 'absolute', top: '20px', right: '20px'}} onClick={() => switchChain(+!currentChainIndex)}>{currentChainIndex === 0 ? 'Go to testnet' : 'Go to mainnet'}</button>
      </div>
      <button onClick={connectAccount}>
        Connect account
      </button>

      {
        user.currentAccount
        &&
        <div>
          <hr />
            <div>
              connected as <b>{user.name}</b> {user.currentAccount} 
              <button onClick={() => setShowChangeNameModal(true)}>Change name</button>
              
                  <div style={{display: 'inline-block', marginLeft: '10px'}}>
                    <span>     Search address by username: </span>

                    <input type="text" onChange={(e) => setUsernameToSearch(e.target.value)} />
                    <span>  {web3js.utils.toChecksumAddress(allUsers.find(item => item.name === usernameToSearch)?.web3Address)}</span>
                  </div>
            </div>
          <div>Your balance is {displayPriceFromEther(user.balance)}</div>
          <br />
          <div 
            style={{ 
              textAlign: 'center', 
              position: 'relative'
            }}>
            <button onClick={() => setShowCreateChallengeModal(!showCreateChallengeModal)}>Create your challenge</button>
            
          </div>

          <br />
          <button onClick={changeCurrency}>{currencies[currencyIndex]}</button>
          <hr />
          <div className="table" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            <div style={{ borderRight: '1px black solid', marginRight: '10px' }}>
              Your challenges:
              {
                user.challenges.map((challenge, index) =>
                  <div key={index}>
                    <hr />
                    <p>{challenge.description}</p>
                    {
                      Date.now() <= challenge.timeout * 1000
                        ?
                        <p>expires in {msToTime(challenge.timeout * 1000 - Date.now())}</p>
                        :
                        <p>expired {new Date(challenge.timeout * 1000).toLocaleString()}</p>
                    }
                    <p>You risk: {displayPriceFromWei(challenge.challengerStakeAtRisk)}</p>
                    {web3js.utils.fromWei(challenge.inspectorReward) >= 0.001 && <p>Inspector reward: {displayPriceFromWei(challenge.inspectorReward)}</p>}
                    <p>Inspector: {allUsers.find(item => item.web3Address === challenge.inspector.toLowerCase())?.name} {challenge.inspector}</p>

                    <hr />
                  </div>
                )
              }
            </div>
            <div>
              Your inspections:
              {
                user.inspections.map((challenge, index) =>
                  <div key={index}>
                    <hr />
                    <p>{challenge.description}</p>
                    {
                      Date.now() <= challenge.timeout * 1000
                        ?
                        <p>expires in {msToTime(challenge.timeout * 1000 - Date.now())}</p>
                        :
                        <p>expired {new Date(challenge.timeout * 1000).toLocaleString()}</p>
                    }
                    <p>They risk: {displayPriceFromWei(challenge.challengerStakeAtRisk)}</p>
                    {challenge.inspectorReward && <p>Your reward: {displayPriceFromWei(challenge.inspectorReward)}</p>}

                    <p>challenger: {allUsers.find(item => item.web3Address === challenge.challenger.toLowerCase())?.name} {challenge.challenger}</p>

                    <button onClick={() => {
                      console.log(challenge);
                      if (challenge.inspectorReward > 0) {
                        confirmAlert({
                          title: `Your friend gives you a reward for participation ${displayPriceFromWei(challenge.inspectorReward)}`,
                          message: 'Will you take it? Or give it back',
                          buttons: [
                            {
                              label: 'I take money',
                              onClick: () => icebreaker.methods.claimChallengeSuccess(challenge.id, true).send({ from: user.currentAccount })
                            },
                            {
                              label: 'No, thanks',
                              onClick: () => icebreaker.methods.claimChallengeSuccess(challenge.id, false).send({ from: user.currentAccount })
                            }
                          ]
                        })
                      } else {
                        icebreaker.methods.claimChallengeSuccess(challenge.id, false).send({ from: user.currentAccount })
                      }
                    }}> They succeed (return funds to them)</button>
                    {
                      (Date.now() >= challenge.timeout * 1000) && <button onClick={() => icebreaker.methods.claimChallengeFailure(challenge.id).send({ from: user.currentAccount })}> They failed (you receive all funds)</button>
                    }
                    <hr />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      }


      <Modal
        open={showCreateChallengeModal}
        onClose={() => setShowCreateChallengeModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateChallengeForm user={user} createChallenge={createChallenge} />
      </Modal>
      <Modal
        open={showChangeNameModal}
        onClose={() => setShowChangeNameModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ChangeNameForm user={user} changeName={changeName} />
      </Modal>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

















// const App = ({ getUserData, match }) => {
//   useEffect(() => {
//     getUserData()
//   }, [])
//   return (
//       <section className={styles.container}>
//         <Navbar />
//         <Routes />
//       </section>
//   )
// };

// const mapStateToProps = createStructuredSelector({
// })

// const mapDispatchToProps = (dispatch) => ({
//   getUserData: () => dispatch(getUserData())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App)
