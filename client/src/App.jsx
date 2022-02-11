



/* global BigInt */

import './App.css';
import { useEffect, useRef, useState } from 'react';
import Web3 from "web3";
import Modal from '@material-ui/core/Modal';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import CreateChallengeForm from './components/CreateChallengeForm';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { loginWithWeb3, logout, selectUser, setWalletAddress } from './redux/user/user.slice';
import ChangeNameForm from './components/ChangeNameForm';
import Navbar from './components/layout/Navbar/Navbar';
import { displayPriceFromEther, displayPriceFromWei } from './utils/convertation-utils/currency.utils';
import { msToDateTime } from './utils/convertation-utils/date.utils';
import { selectAllUsers } from './redux/users/users.slice';
import { changeAccountMetamask, selectIcebreaker, setCurrentChain } from './redux/wallet/wallet.slice';
import { fetchEverything } from './redux/fetch/fetch.slice';
import { selectDisplayedCurrency, selectMaticToDisplayedCurrency, switchDisplayedCurrency } from './redux/currency/currency.slice';

function App({
  user,
  allUsers,
  icebreaker, 
  displayedCurrency, 
  maticToDisplayedCurrency, 
  fetchEverything, 
  changeAccountMetamask,  
  setCurrentChain, 
  switchDisplayedCurrency
}) {

  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false)
  const [showChangeNameModal, setShowChangeNameModal] = useState(false)
  const [usernameToSearch, setUsernameToSearch] = useState('')

  let web3js = new Web3(window.ethereum)

  useEffect(() => {
    if (window.ethereum) window.ethereum.on('accountsChanged', async function (accounts) {
      changeAccountMetamask(accounts[0])
    });
  }, [])

  useEffect(() => {
   setCurrentChain(localStorage.getItem('icebreaker-chain-id') || '137')
  }, [])

  let fetchDataInterval = useRef()

  useEffect(() => {
    console.log('set fetch data interval');
    fetchDataInterval.current && clearInterval(fetchDataInterval.current)
    fetchDataInterval.current = setInterval(fetchEverything, 1000)
  }, [])



  if (!window.ethereum) {
    
    return (() => {
      if (window.confirm('No wallet detected. Go install Metamask at metamask.io')) window.location.href = 'https://metamask.io/' 
        return <div style={{ textAlign: 'right', paddingRight: '30%', fontSize: '20px' }}>
      <a style={{ color: 'black', textDecoration: 'none' }} href='https://icebreaker.gitbook.io/icebreaker/'>Читати пояснення</a>
    </div>})()
  }
  
  return (
    <div>
      <Navbar />

      {
        user.walletAddress
        &&
        <div>
          <hr />
            <div>
              connected as <b>{user.name}</b> {user.walletAddress} 
              <button onClick={() => setShowChangeNameModal(true)}>Change name</button>
              
                  <div style={{display: 'inline-block', marginLeft: '10px'}}>
                    <span>     Search address by username: </span>

                    <input type="text" onChange={(e) => setUsernameToSearch(e.target.value)} />
                    <span>  {web3js.utils.toChecksumAddress(allUsers.find(item => item.name === usernameToSearch)?.walletAddress)}</span>
                  </div>
            </div>
            <div>Your balance is {displayPriceFromEther(user.balance, maticToDisplayedCurrency, displayedCurrency)}</div>
          <br />
          <div 
            style={{ 
              textAlign: 'center', 
              position: 'relative'
            }}>
            <button onClick={() => setShowCreateChallengeModal(!showCreateChallengeModal)}>Create your challenge</button>
            
          </div>

          <br />
          <button onClick={switchDisplayedCurrency}>{displayedCurrency}</button>
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
                        <p>expires in {msToDateTime(challenge.timeout * 1000 - Date.now())}</p>
                        :
                        <p>expired {new Date(challenge.timeout * 1000).toLocaleString()}</p>
                    }
                    <p>You risk: {displayPriceFromWei(challenge.challengerStakeAtRisk, maticToDisplayedCurrency, displayedCurrency)}</p>
                    {web3js.utils.fromWei(challenge.inspectorReward) >= 0.001 && <p>Inspector reward: {displayPriceFromWei(challenge.inspectorReward, maticToDisplayedCurrency, displayedCurrency)}</p>}
                    <p>Inspector: {allUsers.find(item => item.walletAddress === challenge.inspector.toLowerCase())?.name} {challenge.inspector}</p>

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
                        <p>expires in {msToDateTime(challenge.timeout * 1000 - Date.now())}</p>
                        :
                        <p>expired {new Date(challenge.timeout * 1000).toLocaleString()}</p>
                    }
                    <p>They risk: {displayPriceFromWei(challenge.challengerStakeAtRisk, maticToDisplayedCurrency, displayedCurrency)}</p>
                    {challenge.inspectorReward && <p>Your reward: {displayPriceFromWei(challenge.inspectorReward, maticToDisplayedCurrency, displayedCurrency)}</p>}

                    <p>challenger: {allUsers.find(item => item.walletAddress === challenge.challenger.toLowerCase())?.name} {challenge.challenger}</p>

                    <button onClick={() => {
                      if (challenge.inspectorReward > 0) {
                        confirmAlert({
                          title: `Your friend gives you a reward for participation ${displayPriceFromWei(challenge.inspectorReward, maticToDisplayedCurrency, displayedCurrency)}`,
                          message: 'Will you take it? Or give it back',
                          buttons: [
                            {
                              label: 'I take money',
                              onClick: () => icebreaker.methods.claimChallengeSuccess(challenge.id, true).send({ from: user.walletAddress })
                            },
                            {
                              label: 'No, thanks',
                              onClick: () => icebreaker.methods.claimChallengeSuccess(challenge.id, false).send({ from: user.walletAddress })
                            }
                          ]
                        })
                      } else {
                        icebreaker.methods.claimChallengeSuccess(challenge.id, false).send({ from: user.walletAddress })
                      }
                    }}> They succeed (return funds to them)</button>
                    {
                      (Date.now() >= challenge.timeout * 1000) && <button onClick={() => icebreaker.methods.claimChallengeFailure(challenge.id).send({ from: user.walletAddress })}> They failed (you receive all funds)</button>
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
        <CreateChallengeForm  />
      </Modal>
      <Modal
        open={showChangeNameModal}
        onClose={() => setShowChangeNameModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ChangeNameForm  />
      </Modal>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allUsers: selectAllUsers,
  icebreaker: selectIcebreaker,
  displayedCurrency: selectDisplayedCurrency,
  maticToDisplayedCurrency: selectMaticToDisplayedCurrency,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentChain: (id) => dispatch(setCurrentChain(id)),
  fetchEverything: () => dispatch(fetchEverything()),
  switchDisplayedCurrency: () => dispatch(switchDisplayedCurrency()),
  changeAccountMetamask: (address) => dispatch(changeAccountMetamask(address))
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
