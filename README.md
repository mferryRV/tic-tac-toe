
# Tic-Tac-Toe

This is a simple, mobile-first game of tic-tac-toe built in React with a Koa.js backend.

## Quickstart
Make sure you have **node 24** installed (ideally with a version manager, e.g. [asdf](https://asdf-vm.com/))

Start the client with:
```
cd client
npm i
npm start
```
Start the backend and db with:
```
docker compose up
cd backend
npm i
npm run dev
```

## Deployments
- Linting and tests are run when a PR is raised against the `main` branch
- When a PR is merged to `main`, the client will be deployed to [Github Pages](https://mferryrv.github.io/tic-tac-toe)

## Requirements
### Requirement 1
We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it! 
- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling 
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game 

### Requirement 2
We are bored with the basic game now, can you make it so the board can be scaled to any size? 
- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15 

### Requirement 3
We want to store game results in a database.
- Create a simple backend server
- Use any SQL database to store the results, please structure it in a relational manner and in a way for it to be expanded for future use cases 
- Display simple stats back to the user including number of win and losses for each player
