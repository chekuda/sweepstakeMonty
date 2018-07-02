const Qualified = require('../models/qualified')
const Users = require('../models/users')

const POINTS = {
  gSixteen: 1,
  qFinal: 3,
  semifinal: 5,
  final: 5,
  winner: 5,
  bestPlayer: 5,
  gooldenBoot: 5
}

const updatePoints = (user, data, section) => {
  const points = POINTS[section]

  const totalToSum = user[section].reduce((acc, userGuess) => {
    return data.find(dataRound => userGuess === dataRound) ? acc + points : acc
    }, 0)

  return totalToSum
}

exports.updateQualified = async (req, res) => {
  if(!req.body.year) {
    return res.send({ sucess: false, msg: 'No Right year' })
  }

  let newUpdate, qualifiedSaved, allBets
  let userUpdated = []
  const { year, round, data } = req.body

  try {
    newUpdate = await Qualified.find({ wc: year })
  } catch (err) {
    return res.status(401).send({ msg: 'Game not saved' })
  }

  try {
    if(newUpdate.length !==0) {
      await Qualified.update({ wc: year },{ [round]: data })
    } else {
      qualifiedSaved = await Qualified({ wc: year, [round]: data }).save()
    }
    newUpdate = await Qualified.find({ wc: year })
  } catch (err) {
    return res.status(401).send({ msg: 'Game not saved' })
  }

  try {
    allBets = await Users.find()
  } catch(e) {
    return res.send({ sucess: false, msg: 'No Right year' })
  }

  try {
    await Promise.all(allBets.map(user => {
      const totalToSum = updatePoints(user, data, round)
      userUpdated.push({user: user.user, oldPoints: user.points, updated: (user.points || 0)  + totalToSum  })
      return Users.update(
        { user: user.user },
        {
          points: (user.points || 0) + totalToSum,
          updated: new Date()
        }
      )
    }))
  } catch(e) {
    return res.send({ sucess: false, msg: 'Coundlt update points' })
  }

  if(qualifiedSaved) {
    return res.send({ success: true, msg: userUpdated })
  }
  else {
    try {
      newUpdate = await Qualified.find({ wc: year })
    } catch (err) {
      return res.status(401).send({ msg: 'Game not saved' })
    }

    res.send({ success: true, msg: userUpdated })
  }
}

exports.getQualified = async (req, res) => {
  let qualified = []

  if(!req.body.year) {
    return res.send({ sucess: false, msg: 'No Right year' })
  }

  try {
    qualified = await Qualified.find({ wc: req.body.year })
  } catch (err) {
    return res.status(401).send({ msg: 'Game not saved' })
  }

  res.send({ success: true, msg: qualified[0] || qualified })
}
