# GET ME PIZZA

## Getting Started

First create an .env.local file and add the following keys:

```
MORALIS_API_KEY='YOUR_MORALIS_API_KEY'
NEXT_PUBLIC_ALCHEMY_ID='YOUR_ACHEMY_ID'

```

, then run the development server:

```bash
npm run dev
# or
yarn dev
```

---

Get Me Pizza is a social tipping full stack application built during the Moralis x Google Defining Defi Hackathon.

![getmepizza homepage screenshot](https://i.imgur.com/PHTDDlq.png)

## BUILT WITH

Next.js, Firebase, Moralis, Tailwindcss, Wagmi, Rainbowkit

## DEPLOYED CONTRACTS:

Contract can be found at /contract/getmepizza.sol. The contract takes in tips and assigns them to the creator to later withdraw. It also issues an on-chain NFT as receipt to the tipper and stores the tip detail (to, from, memo, date, amount, slices) in a struct so we can display them on our front-end.

### TESTNETS:

POLYGON MUMBAI
0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

BINANCE SMART CHAIN TESTNET
0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

FANTOM TESTNET
0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

## HACKATHON NOTES FOR MORALIS JUDGES:

Moralis functions have all been placed in /pages/libs/moralis.ts as exports/hooks.

Moralis EVM API is used:

1. To upload profile images to IPFS. (/pages/admin.tsx & /pages/enter.tsx)
2. To get memo structs Array for creator from smart contract. (/pages/components/Supporters.tsx)
3. To get withdrawable tip balance for creator from smart contract. (/pages/dashboard.tsx)
