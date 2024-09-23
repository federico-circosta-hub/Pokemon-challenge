# Contentwise Pokemon Challenge

## Preview
https://fedepokemonchallenge.netlify.app/

## Overview
This is a React web application that integrates with the PokeAPI to display Pokémon data. This README explains how to set up the development environment, build the application, and package it for deployment using Docker.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Docker (for deployment)

## Development Setup
### 1. Clone the repository

```
git clone https://github.com/federico-circosta-hub/Pokemon-challenge.git
cd Pokemon-challenge
```

### 2. Install dependencies
Install the necessary dependencies using npm or yarn:
```
npm install
# or
yarn install
```
It'll install third's parties libraries:
- Material UI
- Redux
- Fast-average-color
- Typescript
- Tailwind
- ...

### 3. Start the development server
To start the development server:
```
npm start
# or
yarn start
```
The application will run on http://localhost:3000. Open this URL in your browser to see the app.

## General app logic
This application reflects what is required by the ‘ContentWise - FE Challenge’ pdf in the project root.

It makes use of the Redux library and therefore uses the browser's local storage to:
- save the pokemon trainer information;
- save your own pokemon team.

It is however possible to reset the information from the app itself.

Calls are made to the pokeapi api [PokeApi](https://pokeapi.co/docs/v2).

<br/>
<br/>

**Please note:** <br/>
this app is designed to be used via PC or laptop, correct responsive viewing on mobile is not supported at the moment.

