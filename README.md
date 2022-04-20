# 🎧 Spotify*ish*

> A live WIP version of this project is available [here](https://spotifyish.vercel.app/). Please note this is an early proof of concept prototype with few features and some bugs — most notably refresh tokens currently aren't processed, resulting in users needing to sign out and back in again hourly else they will encounter errors. I'm currently building the full design for this project in Figma [here](https://www.figma.com/file/ue8HWGgcciFw6fqfhmEg08/Spotifyish).

Spotifyish is a simple music app that consumes the Spotify Web API.

## Getting Started

> Ensure both Node/npm are installed (I'm using Node.js v17.3.1 and npm v8.3.0).

Download, clone, or fork this repository, navigate to the route folder in a terminal and enter:

```bash
npm i
```

This will install all dependencies and ensure the app is ready to run.

## Scripts

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Dev

To start the app running in development mode at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Build

To build the application ready for production:

```bash
npm run build
```

### Start

Once built the application is ready to be served at [http://localhost:3000](http://localhost:3000):

```bash
npm run start
```

## Tech Stack

This project was built using:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)