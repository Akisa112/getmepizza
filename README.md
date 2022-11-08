# GET ME PIZZA

Get Me Pizza is a social tipping full stack application built during the Moralis x Google Defining Defi Hackathon and Chainlink hackthon.

https://getme.pizza

Core Features:

- Creatos can create a profile, post blogs & withdraw tips.
- Fans can tip creators in crypto & leave a memo. (The dapp takes 5% of each tip)
- Fans receive a cross chain erc20 coupon for each $1 they tip.

![getmepizza homepage screenshot](https://i.imgur.com/PpbN6hT.png)

## BUILT WITH

React

- Form, Hooks, Drop Image, Hot-Toast, Markdown

Next.js

- Frontend & OG Images API

Firebase

- Database storage

Moralis

- EVM API, IPFS Upload

Tailwindcss

- CSS

Wagmi

- Web3 Interactions

Rainbowkit

- Wallet UI

Current Blockchains

- Polygon, Binance Smart Chain, Fantom

Chainlink

- Gets prices of native tokens and makes sure a slice costs $1 no matter what chain.

DiceBear

- Default Profile Image Generator

## LIVE FEATURES

#### PUBLIC:

- Home page
- About, FAQ, Privacy, Terms
- Explore Page
- Profile pages
- Public/FEED posts
- Tip creators with crypto
- Like posts (if logged in)
- Custom generated meta tag images for profile and blog pages via next13 OG Image Generator for social sharing.

#### ADMIN:

- Create profile
- Dashboard (withdraw & view tip balance)
- Edit profile
- Create posts
- Edit posts

#### FUTURE FEATURES:

- Messaging
- Token gating posts
- NFT Gallary
- Memberships
- Integrations

## DEPLOYED CONTRACTS:

Contract can be found at /contract/getmepizza.sol. The contract takes in tips and assigns them to the creator to later withdraw from the users dashboard. It also issues a multichain token as a coupon to the tipper and stores the tip detail (to, from, memo, date, amount, slices) in a struct so we can display them on our front-end in the users profile page.

### MAINNETS:

Polygon:

- 0xAe634f8A025AAf53cc3AfCf29C4323085b40406F

Binance Smart Chain:

- 0xAe634f8A025AAf53cc3AfCf29C4323085b40406F

Fantom Opera:

- 0xAe634f8A025AAf53cc3AfCf29C4323085b40406F

## HACKATHON NOTES:

The dapp is 100% functional and deployed on Mainnets.

- Moralis functions have all been placed in /pages/libs/moralis.ts as exports/hooks.
- Chainlink is used in the smart contracts found in /contract/getmepizza.sol and called in /pages/components/BuyPizza.tsx using wagmi.
- Multichain has been implemented to make $🍕 points cross-chain found in /contract/getmepizza.sol

Moralis EVM API is used:

1. To upload profile images to IPFS. (/pages/admin.tsx & /pages/enter.tsx)
2. To get memo structs Array for creator from smart contract. (/pages/components/Supporters.tsx)
3. To get withdrawable tip balance for creator from smart contract. (/pages/dashboard.tsx)

## Wanna work on this front-end?

First create an .env.local file and add the following keys:

```
MORALIS_API_KEY='YOUR_MORALIS_API_KEY'
NEXT_PUBLIC_ALCHEMY_ID='YOUR_ACHEMY_ID'
NEXT_PUBLIC_POLY_CONTRACT='0xAe634f8A025AAf53cc3AfCf29C4323085b40406F'

```

, then install dependencies and run the development server:

```bash
npm install
npm run dev

```

---
