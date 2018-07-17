# SweepStake 2016

Please dont check the quality of the code as I was super rushing on this own project and I dont feel proud of it. A huge refactor will come soon

## Run it
  Run in paralell two terminals for the clientSide and server side
  - npm start at the root
  - npm start in the server folder

* IMPORTANT: 
  - Change package.json environment to env/prod for target the right DB
  - Set the DB urls in .env file within server folder with structure:
    - REMOTE_DB_URL=mongodb://<yourUser>:<yourPasss>@ds****.mlab.com:<port>/sweeptstake
    - LOCAL_DB_URL=mongodb://127.0.0.1:<port>/sweepstake