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

- Creatos can create a profile, post blogs & withdraw tips.
- Fans can tip creators in crypto & leave a memo. (The dapp takes 5% of each tip)
- Fans receive a NFT receipt of each tip as an NFT.

![getmepizza homepage screenshot](https://i.imgur.com/PHTDDlq.png)

## BUILT WITH

React - Form, Hooks, Drop Image, Hot-Toast, Markdown
Next.js - Frontend & OG Images API
Firebase - Database storage
Moralis - EVM API, IPFS Upload
Tailwindcss - CSS
Wagmi - Web3 Interactions
Rainbowkit - Wallet UI
DiceBear - Default Profile Image Generator
Current Blockchains - Polygon, Binance Smart Chain, Fantom
Chainlink - Gets prices of native tokens and makes sure a slice costs $1 no matter what chain.

## FEATURES

#### PUBLIC:

- Home page
- About, FAQ, Privacy, Terms
- Profile pages
- Public posts
- Tip creators with crypto
- Like posts (if logged in)
- Custom generated meta tag images for profile and blog pages via next13 OG Image Generator for social sharing.

#### ADMIN:

- Create profile
- Dashboard (withdraw & view tip balance)
- Edit profile
- Create posts
- Edit posts

## DEPLOYED CONTRACTS:

Contract can be found at /contract/getmepizza.sol. The contract takes in tips and assigns them to the creator to later withdraw from the users dashboard. It also issues an on-chain NFT as receipt to the tipper and stores the tip detail (to, from, memo, date, amount, slices) in a struct so we can display them on our front-end in the users profile page.

### TESTNETS:

Polygon:

- 0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

BINANCE SMART CHAIN TESTNET:

- 0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

FANTOM TESTNET:

- 0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43

## HACKATHON NOTES FOR MORALIS JUDGES:

Built with these tracks in mind:

- Polygon: ReFi, Best UX.
- Binance: Social & Entertainment.
- Fantom: DeFi++.

Moralis functions have all been placed in /pages/libs/moralis.ts as exports/hooks.

Moralis EVM API is used:

1. To upload profile images to IPFS. (/pages/admin.tsx & /pages/enter.tsx)
2. To get memo structs Array for creator from smart contract. (/pages/components/Supporters.tsx)
3. To get withdrawable tip balance for creator from smart contract. (/pages/dashboard.tsx)

![getmepizza page](https://i.imgur.com/fqWIdte.png)

![getmepizza dashboard](https://i.imgur.com/qUmxrPh.png)

![getmepizza admin](https://i.imgur.com/jBZSNgT.png)
