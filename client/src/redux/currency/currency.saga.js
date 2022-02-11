import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import axios from 'axios'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { fetchPrices, setPrices } from './currency.slice'


export function* fetchPricesSaga() {
  const maticToUsd = (yield axios.get('https://api.coinbase.com/v2/prices/MATIC-USD/spot')).data.data.amount
  const maticToUah = (yield axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')).data.find(item => item.ccy == 'USD').sale * maticToUsd
  yield put(setPrices([
    {
      from: 'MATIC',
      to: 'USD',
      value: maticToUsd
    },
    {
      from: 'MATIC',
      to: 'UAH',
      value: maticToUah
    },
  ]))
}


export default function* pricesSaga() {
  yield takeLatest(fetchPrices, fetchPricesSaga)
}