const { send } = require('micro')

const operators = {
  mute: {
    id: 'mute',
    name: 'Mute',
    group: 'SAS',
    badgeUrl:
      'https://d1u5p3l4wpay3k.cloudfront.net/rainbowsixsiege_gamepedia/1/11/Mute_Badge.png?version=5731d7b08626fc67d5aa2be61a95e4f8',
  },
}

module.exports = (req, res) => {
  send(res, 200, Object.values(operators))
}
