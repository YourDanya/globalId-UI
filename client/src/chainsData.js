  const chains = [{
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
      rpcUrls: [ 'https://matic-mumbai.chainstacklabs.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      name: 'POLYGON TESTNET (MUMBAI)',
      icebreakerAddress: '0xeECF94Fc94ad65b8f7b1123F3388A9747BC596c7',
      source: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
    }
  ]

	export default chains