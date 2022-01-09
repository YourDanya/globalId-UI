import dotenv from 'dotenv'
import Web3 from 'web3'

dotenv.config({
  path: './src/.env'
})


export async function confirmAddressSignature(req, res, next) {
	const { signature, address, message } = req.body

  const ethNetwork = process.env.INFURA_NODE_URL + process.env.INFURA_PROJECT_ID;
  const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

  const signerAddress = web3.eth.accounts.recover(message, signature).toLowerCase()
	console.log(signerAddress)
	console.log(address)
	if (signerAddress === address) {
		next()
	}	else {
		res.status(400).send('Can`t verify your address. Signature seems wrong')
	}
}