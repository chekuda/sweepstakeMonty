const Games = require('../models/games')
const Users = require('../models/users')


const calculatePoints = (bet, game, user) => {
  const betResult = bet[0] - bet[1]
  const gameResult = game[0] - game[1]

  if(bet[0] === game[0] && bet[1] === game[1]) {
    return 2
  } else if(betResult === 0 && gameResult === 0) {
    return 1
  } else if (betResult > 0 && gameResult > 0) {
    return 1
  } else if(betResult < 0 && gameResult < 0) {
    return 1
  }
  return 0
}

exports.results = async (req, res) => {
  let doc = ''
  try {
    doc = await Games.find()
  } catch (err) {
    return res.status(401).send('ERROR')
  }
  res.send({ succes: true, msg: doc })
}

exports.updateResults = async (req, res) => {
  let gameSaved = ''
  let allBets = ''
  let newGame = ''
  let userUpdatedPoints = {}
  let checkifExist = []

  if(!req.body.teams || !req.body.result) {
    return res.send({ sucess: false, msg: 'No Right body' })
  }

  try {
    checkifExist = await Games.find({ teams: req.body.teams })

    if(checkifExist.length > 0) {
      return res.send({ msg: 'Game Already Inserted' })
    }
  } catch (err) {
    return res.status(401).send({ msg: err })
  }

  try {
    newGame = Games({
      teams: req.body.teams,
      result: req.body.result,
      total: [req.body.teams[0],req.body.result[0], req.body.result[1], req.body.teams[1]],
      date: new Date()
    })
    gameSaved = await newGame.save()
  } catch (err) {
    return res.status(401).send({ msg: 'Game not saved' })
  }

  try {
    allBets = await Users.find()
    userUpdatedPoints = allBets.reduce((acc, data) => {
    const userResult = data.bets.find(bet => bet.includes(newGame.teams[0], newGame.teams[1]))

      return acc.concat({
        user: data.user,
        result: userResult,
        points: calculatePoints([userResult[1], userResult[2]], newGame.result, data.user)
      })
    }, [])

  } catch (err) {
    return res.status(401).send({ msg: { gameSaved, err: 'Game saved but user not updated' } })
  }

  try {
    await Promise.all(userUpdatedPoints.map(user =>
      Users.update({ user: user.user }, { $inc: { points: user.points } })
      )
    )

  } catch (err) {
    return res.status(401).send({ msg: { gameSaved, err: 'Game saved but user not updated' } })
  }

  res.send({ sucess: true, msg: userUpdatedPoints })
}
