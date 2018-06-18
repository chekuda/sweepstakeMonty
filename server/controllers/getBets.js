const Users = require('../models/users')

exports.getBets = async (req, res) => {

  let doc = ''
  try {
    doc = await Users.find()
  } catch (err) {
    return res.status(401).send('ERROR')
  }
  res.send(doc)
}

exports.saveUser = async (req, res) => {
  try {
    const mewBets = Users({
      user: 'Olu',
      points: 0,
      bets: [
        ['Russia',2,1,'Saudi Arabia'  ],
      ['Egypt',0,1,'Uruguay'  ],
      ['Russia',1,2,'Egypt'  ],
      ['Uruguay',2,0,'Saudi Arabia'  ],
      ['Uruguay',3,0,'Russia'  ],
      ['Saudi Arabia',0,2,'Egypt'  ],
      ['Portugal',2,0,'Spain'  ],
      ['Morocco',1,1,'Iran'  ],
      ['Portugal',2,1,'Morocco'  ],
      ['Iran',0,4,'Spain'  ],
      ['Iran',0,3,'Portugal'  ],
      ['Spain',2,1,'Morocco'  ],
      ['France',3,0,'Australia'  ],
      ['Peru',1,1,'Denmark'  ],
      ['France',2,0,'Peru'  ],
      ['Denmark',1,1,'Australia'  ],
      ['Denmark',0,3,'France'  ],
      ['Australia',1,1,'Peru'  ],
      ['Argentina',2,0,'Iceland'  ],
      ['Croatia',1,2,'Nigeria'  ],
      ['Argentina',2,1,'Croatia'  ],
      ['Nigeria',0,1,'Iceland'  ],
      ['Nigeria',1,1,'Argentina'  ],
      ['Iceland',0,1,'Croatia'  ],
      ['Brazil',3,0,'Switzerland'  ],
      ['Costa Rica',2,2,'Serbia'  ],
      ['Brazil',2,1,'Costa Rica'  ],
      ['Serbia',1,0,'Switzerland'  ],
      ['Serbia',0,3,'Brazil'  ],
      ['Switzerland',2,2,'Costa Rica'  ],
      ['Germany',3,1,'México'  ],
      ['Sweden',2,2,'South Korea'  ],
      ['Germany',3,0,'Sweden'  ],
      ['South Korea',1,1,'México'  ],
      ['South Korea',0,4,'Germany'  ],
      ['México',2,1,'Sweden'  ],
      ['Belgium',4,0,'Panama'  ],
      ['Tunisia',1,2,'England'  ],
      ['Belgium',3,1,'Tunisia'  ],
      ['England',3,0,'Panama'  ],
      ['England',1,1,'Belgium'  ],
      ['Panama',0,2,'Tunisia'  ],
      ['Poland',1,2,'Senegal'  ],
      ['Colombia',1,1,'Japan'  ],
      ['Poland',1,1,'Colombia'  ],
      ['Japan',2,2,'Senegal'  ],
      ['Japan',2,1,'Poland'  ],
      ['Senegal',1,1,'Colombia'  ]
      ]
      })
    newBets = await mewBets.save()
  } catch (err) {
    console.log(err)
    return res.status(401).send('ERROR')
  }
  res.send(newBets)
}