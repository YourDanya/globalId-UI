import React, {  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/user/user.slice';
import { selectAuthLoading } from '../../../redux/loading.slice';
import styles from './Navbar.module.sass'
import { connectWalletMetamask, selectCurrentChain, setCurrentChain } from '../../../redux/wallet/wallet.slice';


const Navbar = ({  connectAccount, setCurrentChain, currentChain }) => {
  return <div style={{ textAlign: 'right', paddingRight: '30%', fontSize: '20px' }}>

        {/* CONNECT ACCOUNT */}
        <button onClick={connectAccount}>
          Connect account
        </button>

        {/* GO TO DOCS */}
        <a style={{color: 'black', textDecoration: 'none'}} href='https://icebreaker.gitbook.io/icebreaker/'>Читати пояснення</a>

        {/* SWITCH CHAIN */}
        <button 
          style={{position: 'absolute', top: '20px', right: '20px'}} 
          onClick={() => {
            const nextChainId = (currentChain.id == 137 && 80001) || (currentChain.id == 80001 && 137)
            setCurrentChain(nextChainId)
          }
        }>
          {(currentChain.id == 137 && 'Go to testnet') || (currentChain.id == 80001 && 'Go to mainnet')}
        </button>

   </div>
      
};


const mapStateToProps = state => ({
  currentChain: selectCurrentChain(state),
  
});

const mapDispatchToProps = dispatch => ({
  setCurrentChain: (id) => dispatch(setCurrentChain(id)),
  connectAccount: () => dispatch(connectWalletMetamask())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
