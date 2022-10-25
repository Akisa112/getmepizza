import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { useNetwork } from 'wagmi'

export async function upLoadIPFS(content) {    
    const abi = [
        {
        path: "pfp.jpg",
        content: content,
        },
    ];
    
    await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...and any other configuration
    });
    
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi
    });

    return response.result[0].path;
}



export async function getMemos(ethAddress, chosenChain) {

    const abi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            }
        ],
        "name": "getMemos",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GetMePizza.Memo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }];

    const functionName = 'getMemos';
    const address = '0xb4D137536Ae7962eFD6b09905801D8108B43d0D8';
  
    let chain; 
    if (chosenChain === 'MUMBAI') {
        chain = EvmChain.MUMBAI
    }
    ///  ADD IF STATEMENTS HERE FOR EVERY CHAIN SUPPORTED. 

    await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...and any other configuration
    });
    console.log(ethAddress);
    const response = await Moralis.EvmApi.utils.runContractFunction({
        abi,
        functionName,
        address,
        chain,
        params: {_creator: ethAddress}
    });
    
    return(response.result);
}

export async function getEarnings(ethAddress, chosenChain) {
    
    const abi = [{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "creatorsPizzaMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}];

    const functionName = 'creatorsPizzaMoney';
    const address = '0xb4D137536Ae7962eFD6b09905801D8108B43d0D8';
  
    let chain; 
    if (chosenChain === 'MUMBAI') {
        chain = EvmChain.MUMBAI
    }
    ///  ADD IF STATEMENTS HERE FOR EVERY CHAIN SUPPORTED. 

    await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...and any other configuration
    });
    console.log(ethAddress);

    if (ethAddress !== null) {
        const response = await Moralis.EvmApi.utils.runContractFunction({
            abi,
            functionName,
            address,
            chain,
            params: {'': ethAddress}
        });
        
        return(response.result);
    }
    
    return console.log('no eth addy')

}