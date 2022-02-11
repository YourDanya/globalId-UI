/* global BigInt */

import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import { confirmAlert } from 'react-confirm-alert';
import { displayPriceFromWei } from '../../utils/convertation-utils/currency.utils';
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { selectDisplayedCurrency, selectPrices } from '../currency/currency.slice';
import { selectUser } from '../user/user.slice';
import { selectIcebreaker } from '../wallet/wallet.slice';
import { claimChallengeFailure, claimChallengeSuccess, createChallenge } from './gameActions.slice';

  function* createChallengeSaga({ payload: { challengerStakeAtRisk, description, inspectorAddress, timeoutAfterMilliseconds, inspectorReward }}) {
    const challengerStakeAtRiskWei = challengerStakeAtRisk * Math.pow(10, 18)
    const inspectorRewardWei = BigInt(inspectorReward * Math.pow(10, 18))
    const timeoutAfterSeconds = Math.floor(timeoutAfterMilliseconds / 1000)

    const icebreaker = yield select(selectIcebreaker)
    const user  = yield select(selectUser)

    yield icebreaker.methods.createChallenge(description, inspectorAddress, timeoutAfterSeconds, inspectorRewardWei).send({ from: user.walletAddress, value: challengerStakeAtRiskWei }).catch(err => console.log(err.message))
  }

  function* claimChallengeFailureSaga({payload}) {
    const icebreaker = yield select(selectIcebreaker)
    const user = yield select(selectUser)
    const challenge = payload

    icebreaker.methods.claimChallengeFailure(challenge.id).send({ from: user.walletAddress })
  }

  function* claimChallengeSuccessSaga({ payload}) {
    const icebreaker = yield select(selectIcebreaker)
    const user = yield select(selectUser)
    const displayedCurrency = yield select(selectDisplayedCurrency) 
    const prices = yield select(selectPrices)
    const maticToDisplayedCurrency = prices.find(price => price.from == 'MATIC' && price.to == displayedCurrency).value

    const challenge = payload
    console.log(challenge);
    if (challenge.inspectorReward > 0) {
      confirmAlert({
        title: `Your friend gives you a reward for participation ${displayPriceFromWei(challenge.inspectorReward, maticToDisplayedCurrency, displayedCurrency)}`,
        message: 'Will you take it? Or give it back',
        buttons: [{
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
  }

export default function* gameActionsSaga() {
  yield takeLatest(createChallenge, createChallengeSaga)
  yield takeLatest(claimChallengeSuccess, claimChallengeSuccessSaga)
  yield takeLatest(claimChallengeFailure, claimChallengeFailureSaga)
}