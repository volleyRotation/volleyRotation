
class VBTutorialNoLibero {
  NS = 'http://www.w3.org/2000/svg'

  constructor (config, heightScaleFactor, courtScaleFactor) {
    const svgWidth = (typeof config.width === 'number') ? config.width : 900
    this.svg = {
      width: svgWidth,
      height: svgWidth * heightScaleFactor,
      scale: svgWidth * courtScaleFactor
    }
    console.log(`drawing ${this.svg.width} by ${this.svg.height}`)
    this.colours = {
      backgroundColour: (config.colours && typeof config.colours.backgroundColour === 'string') ? config.colours.backgroundColour : '#63b6e0',
      courtColour: (config.colours && typeof config.colours.courtColour === 'string') ? config.colours.courtColour : '#ffb591',
      lineColour: (config.colours && typeof config.colours.lineColour === 'string') ? config.colours.lineColour : 'white',
      playerOutlineColour: (config.colours && typeof config.colours.playerOutlineColour === 'string') ? config.colours.playerOutlineColour : '#f5f5f5',
      playerColour: (config.colours && typeof config.colours.playerColour === 'string') ? config.colours.playerColour : '#efa581',
      playerColourHighlight: (config.colours && typeof config.colours.playerColourHighlight === 'string') ? config.colours.playerColourHighlight : '#66dd66',
      tutorialColour: (config.colours && typeof config.colours.tutorialColour === 'string') ? config.colours.tutorialColour : '#7ec485',
      tutorialFade: (config.colours && typeof config.colours.tutorialFade === 'string') ? config.colours.tutorialFade : '#999999',
    }
    this.svg.svgRoot = document.createElementNS(this.NS, 'svg')
    this.svg.svgRoot.setAttribute('width', this.svg.width)
    this.svg.svgRoot.setAttribute('height', this.svg.height)
    this.svg.snapRoot = Snap(this.svg.svgRoot)
  }

  getSVG () {
    return this.svg.svgRoot
  }
}

class VBTutorialServeReceieveNoLibero extends VBTutorialNoLibero {

  constructor (config) {
    super(config, (16/17), (1/1700))
    this.svg.rotationControlCirleRadius = this.svg.width * (24 / 1700)

    this.colours.rotationControlColour = (config.colours && typeof config.colours.rotationControlColour === 'string') ? config.colours.rotationControlColour : '#ffffff'
    this.colours.rotationControlHighlightColour = (config.colours && typeof config.colours.rotationControlHighlightColour === 'string') ? config.colours.rotationControlHighlightColour : '#dddddd'
    this.colours.rotationControlBackgroundColourA = (config.colours && typeof config.colours.rotationControlBackgroundColourA === 'string') ? config.colours.rotationControlBackgroundColourA : '#65b6df'
    this.colours.rotationControlBackgroundColourB = (config.colours && typeof config.colours.rotationControlBackgroundColourB === 'string') ? config.colours.rotationControlBackgroundColourB : '#4596bf'

    this.text = {
      players: { s: 'Pa', o: 'Po', m2: 'C2', m1: 'C1', h1: 'A1', h2: 'A2'},
      rotationControl: { serving: 'Service', receiving: 'Réception', s1: 'Passeur en 1', s2: 'Passeur en 2', s3: 'Passeur en 3', s4: 'Passeur en 4', s5: 'Passeur en 5', s6: 'Passeur en 6' },
      actionControl: { servingBase: 'Base', serve: 'Service', set: 'Passe', switch: 'Changement', pass: 'Réception', attack: 'Attaque' },
      tutorial: [
        'Tutoriel',
        'Suivant',
        'C\'est un joueur. Cliquer dessus pour le mettre\n en évidence.\n\nA=Attaquant (4), C=Central, Pa=Passeur,\nPo=Pointu',
        'C\'est le terrain avec les 6 joueurs.\nQuand vous cliquez sur les boutons,\nles joueurs vont bouger sur le terrain',
        'Sélection des rotations. Cliquer sur un cercle\npour changer la rotation.\nChaque position est désigné par la position du\npasseur',
        'Lorsque vous avez le service',
        'Lorsque vous êtes en réception',
        'Se déplacer de cercle en cerle vous fait\ntourner comme dans un match',
        'Sélection des phases pendant le point.\nLes joueurs se déplacent alors sur le terrain',
        'Positions des joueurs quand vous avez\nle service',
        'Positions des joueurs quand vous êtes\nen réception',
      ]
    }

    this.tutorialData = [
      {
        boxPosition: {
          left:   450 * this.svg.scale,
          right:  650 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 890 * this.svg.scale,
        },
        textPosition: {
          left:   700 * this.svg.scale,
          right:  1320 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 920 * this.svg.scale,
        },
        text: this.text.tutorial[2],
        nextPosition: {
          left: 1080 * this.svg.scale,
          top:  950 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   112 * this.svg.scale,
          right:  988 * this.svg.scale,
          top:    112 * this.svg.scale,
          bottom: 986 * this.svg.scale,
        },
        textPosition: {
          left:   1050 * this.svg.scale,
          right:  1670 * this.svg.scale,
          top:    400 * this.svg.scale,
          bottom: 600 * this.svg.scale,
        },
        text: this.text.tutorial[3],
        nextPosition: {
          left: 1430 * this.svg.scale,
          top:  650 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1690 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 270 * this.svg.scale,
        },
        text: this.text.tutorial[4],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  300 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1330 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    150 * this.svg.scale,
          bottom: 350 * this.svg.scale,
        },
        text: this.text.tutorial[5],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  400 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1330 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    250 * this.svg.scale,
          bottom: 450 * this.svg.scale,
        },
        text: this.text.tutorial[6],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  500 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    350 * this.svg.scale,
          bottom: 550 * this.svg.scale,
        },
        text: this.text.tutorial[7],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  600 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1570 * this.svg.scale,
        },
        textPosition: {
          left:   90 * this.svg.scale,
          right:  710 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text.tutorial[8],
        nextPosition: {
          left: 760 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1334 * this.svg.scale,
        },
        textPosition: {
          left:   140 * this.svg.scale,
          right:  760 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text.tutorial[9],
        nextPosition: {
          left: 810 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1336 * this.svg.scale,
          bottom: 1570 * this.svg.scale,
        },
        textPosition: {
          left:   190 * this.svg.scale,
          right:  810 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text.tutorial[10],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
    ]

    this.court = new VBHalfCourt({
      width: (11/17) * this.svg.width
    })

    this.svg.snapRoot.append(this.court.getSVG())
    this.court.getSVG().setAttribute('transform', 't100,0')

    this.playerPositions = {
      servingBase: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          m1:  { x: 450, y: 700 }
        },
        2: {
          m1: { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 200, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 700, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 200, y: 100 },
          o:  { x: 450, y: 700 },
          m2:  { x: 200, y: 600 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 200, y: 100 },
          h1: { x: 200, y: 600 },
          m2:  { x: 450, y: 700 }
        },
        5: {
          m2: { x: 700, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 200, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 200, y: 100 },
          s:  { x: 450, y: 700 },
          m1:  { x: 200, y: 600 }
        }
      },
      servingServe: {
        1: {
          s:  { x: 700, y: 940 },
          h1: { x: 580, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 320, y: 100 },
          h2: { x: 200, y: 600 },
          m1:  { x: 450, y: 700 }
        },
        2: {
          m1: { x: 700, y: 940 },
          s:  { x: 580, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 320, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
        },
        3: {
          h2: { x: 700, y: 940 },
          m1: { x: 580, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 320, y: 100 },
          o:  { x: 700, y: 600 },
          m2:  { x: 450, y: 700 }
        },
        4: {
          o:  { x: 700, y: 940 },
          h2: { x: 580, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 320, y: 100 },
          h1: { x: 200, y: 600 },
          m2:  { x: 450, y: 700 }
        },
        5: {
          m2: { x: 700, y: 940 },
          o:  { x: 580, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 320, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
        },
        6: {
          h1: { x: 700, y: 940 },
          m2: { x: 580, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 320, y: 100 },
          s:  { x: 700, y: 600 },
          m1:  { x: 450, y: 700 }
        }
      },
      servingSwitch: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 600 },
          m1:  { x: 450, y: 700 }
        },
        2: {
          m1: { x: 450, y: 700 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 600 },
        },
        3: {
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          o:  { x: 700, y: 600 },
          m2:  { x: 450, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 600 },
          m2:  { x: 450, y: 700 }
        },
        5: {
          m2: { x: 450, y: 700 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 200, y: 600 },
        },
        6: {
          h1: { x: 200, y: 600 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          s:  { x: 700, y: 600 },
          m1:  { x: 450, y: 700 }
        }
      },
      receivingBase: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        2: {
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 200, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
          m1: { x: 700, y: 600 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 700, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 200, y: 100 },
          o:  { x: 450, y: 700 },
          m2: { x: 200, y: 600 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 200, y: 100 },
          h1: { x: 200, y: 600 },
          m2: { x: 450, y: 700 }
        },
        5: {
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 200, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 200, y: 100 },
          s:  { x: 450, y: 700 },
          m1: { x: 200, y: 600 }
        }
      },
      receivingPass: {
        1: {
          s:  { x: 840, y: 700 },
          h1: { x: 700, y: 600 },
          m2: { x: 150, y: 60  },
          o:  { x: 54,  y: 100 },
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        2: {
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 600 },
          m2:  { x: 40, y: 160 },
          o:  { x: 260, y: 840 },
          h2: { x: 450, y: 700 },
          m1: { x: 700, y: 600 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 740, y: 140 },
          s:  { x: 600, y: 100 },
          h1: { x: 200, y: 600 },
          o:  { x: 560, y: 820 },
          m2: { x: 450, y: 700 }
        },
        4: {
          o:  { x: 760, y: 820 },
          h2: { x: 200, y: 600 },
          m1: { x: 140, y: 140 },
          s:  { x: 60, y: 60 },
          h1: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        5: {
          o:  { x: 840, y: 100 },
          h2: { x: 200, y: 600 },
          m1:  { x: 60, y: 60 },
          s:  { x: 350, y: 140 },
          h1: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 140 },
          o:  { x: 560, y: 60 },
          h2: { x: 200, y: 600 },
          s:  { x: 510, y: 170 },
          m1: { x: 450, y: 700 }
        }
      },
      receivingSet: {
        1: {
          s:  { x: 600, y: 100 },
          h1: { x: 900, y: 300 },
          m2: { x: 450, y: 300 },
          o:  { x: 0,   y: 300 },
          h2: { x: 450, y: 600 },
          m1: { x: 400, y: 700 }
        },
        2: {
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          m2:  { x: 450, y: 300 },
          o:  { x: 850, y: 600 },
          h2: { x: 430, y: 600 },
          m1: { x: 700, y: 600 }
        },
        3: {
          h2: { x: 450, y: 600 },
          m1: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          o:  { x: 850, y: 600 },
          m2: { x: 400, y: 700 }
        },
        4: {
          o:  { x: 850, y: 600 },
          h2: { x: 0,   y: 300 },
          m1: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        5: {
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          m1:  { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 600 },
          m2: { x: 700, y: 600 }
        },
        6: {
          h1: { x: 450, y: 600 },
          m2: { x: 450, y: 300 },
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          s:  { x: 600, y: 100 },
          m1: { x: 400, y: 700 }
        }
      },
      receivingAttack: {
        1: {
          s:  { x: 600, y: 100 },
          h1: { x: 800, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 100, y: 100 },
          h2: { x: 450, y: 300 },
          m1: { x: 400, y: 700 }
        },
        2: {
          s:  { x: 600, y: 100 },
          h1: { x: 100, y: 100 },
          m2:  { x: 450, y: 100 },
          o:  { x: 840, y: 300 },
          h2: { x: 440, y: 300 },
          m1: { x: 700, y: 600 }
        },
        3: {
          h2: { x: 450, y: 300 },
          m1: { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 100, y: 100 },
          o:  { x: 840, y: 300 },
          m2: { x: 450, y: 700 }
        },
        4: {
          o:  { x: 840, y: 300 },
          h2: { x: 100, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        5: {
          o:  { x: 800, y: 100 },
          h2: { x: 100, y: 100 },
          m1:  { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 300 },
          m2: { x: 700, y: 600 }
        },
        6: {
          h1: { x: 450, y: 300 },
          m2: { x: 450, y: 100 },
          o:  { x: 800, y: 100 },
          h2: { x: 100, y: 100 },
          s:  { x: 600, y: 100 },
          m1: { x: 400, y: 700 }
        }
      },
      receivingSwitch: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        2: {
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m2:  { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 200, y: 600 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          o:  { x: 700, y: 600 },
          m2: { x: 450, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 600 },
          m2: { x: 450, y: 700 }
        },
        5: {
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m1:  { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 200, y: 600 },
          m2: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 200, y: 600 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          s:  { x: 700, y: 600 },
          m1: { x: 450, y: 700 }
        }
      },
    }
    this.players = {
      s: this.court.addPlayer(this.playerPositions.servingBase[2].s.x, this.playerPositions.servingBase[2].s.y, this.text.players.s),
      h1: this.court.addPlayer(this.playerPositions.servingBase[2].h1.x, this.playerPositions.servingBase[2].h1.y, this.text.players.h1),
      m1: this.court.addPlayer(this.playerPositions.servingBase[2].m1.x, this.playerPositions.servingBase[2].m1.y, this.text.players.m1),
      o: this.court.addPlayer(this.playerPositions.servingBase[2].o.x, this.playerPositions.servingBase[2].o.y, this.text.players.o),
      h2: this.court.addPlayer(this.playerPositions.servingBase[2].h2.x, this.playerPositions.servingBase[2].h2.y, this.text.players.h2),
      m2: this.court.addPlayer(this.playerPositions.servingBase[2].m2.x, this.playerPositions.servingBase[2].m2.y, this.text.players.m2),
    }

    this.state = {
      moving: false,
      setterAt: 2
    }

  }

  draw () {
    if (this.drawn) {
      return
    }
    this.drawn = true
    this.court.draw()
    this.drawRotationControl()
    this.drawActionControl()
    this.drawTutorialButton()
  }

  multilineText (text, lineHeight, style) {
    let textGroup
    text.split('\n').forEach((textChunks, i) => {
      let textLine = this.svg.snapRoot.text(0, 0 + (i * lineHeight * this.svg.scale), textChunks).attr(style)
      if (textGroup) {
        textGroup.add(textLine)
      } else {
        textGroup = this.svg.snapRoot.group(textLine)
      }
    })
    return textGroup
  }

  drawRotationControl () {
    const vOffset1 = 20 * this.svg.scale
    const vOffset2 = 140 * this.svg.scale

    const box1 = this.svg.snapRoot.rect(0, 0 * this.svg.scale, 540 * this.svg.scale, 60 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box2 = this.svg.snapRoot.rect(0, 60 * this.svg.scale, 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box3 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (1 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box4 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (2 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box5 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (3 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box6 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (4 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box7 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (5 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 161 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const backgroundBoxes = this.svg.snapRoot.group(box1, box2, box3, box4, box5, box6, box7)

    const textHeadingS = this.svg.snapRoot.text(80 * this.svg.scale, 40 * this.svg.scale, this.text.rotationControl.serving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textHeadingR = this.svg.snapRoot.text(280 * this.svg.scale, 40 * this.svg.scale, this.text.rotationControl.receiving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    const textLabel2 = this.multilineText(this.text.rotationControl.s2, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale}`)
    const textLabel1 = this.multilineText(this.text.rotationControl.s1, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (1 * (vOffset1 + vOffset2))}`)
    const textLabel6 = this.multilineText(this.text.rotationControl.s6, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (2 * (vOffset1 + vOffset2))}`)
    const textLabel5 = this.multilineText(this.text.rotationControl.s5, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (3 * (vOffset1 + vOffset2))}`)
    const textLabel4 = this.multilineText(this.text.rotationControl.s4, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (4 * (vOffset1 + vOffset2))}`)
    const textLabel3 = this.multilineText(this.text.rotationControl.s3, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (5 * (vOffset1 + vOffset2))}`)
    const rotationLabels = this.svg.snapRoot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6)

    const joinLine1 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
        'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine2 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), 80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine3 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine4 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine5 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine6 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine7 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine8 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine9 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine10 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine11 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLines = this.svg.snapRoot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11)

    const setLineS = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLineR = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLines = this.svg.snapRoot.group(setLineS, setLineR)

    this.controlTwoSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer',
    })
    this.controlTwoRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlOneSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlOneRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlSixSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlSixRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlFiveSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFiveSrv.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlFiveRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlFourSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlFourRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlThreeSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlThreeRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    const controlCircles = this.svg.snapRoot.group(this.controlOneSrv, this.controlTwoSrv, this.controlThreeSrv, this.controlFourSrv, this.controlFiveSrv, this.controlSixSrv,
        this.controlOneRcv, this.controlTwoRcv, this.controlThreeRcv, this.controlFourRcv, this.controlFiveRcv, this.controlSixRcv)

    this.controlTwoRcv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlTwoSrv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneRcv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneSrv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixRcv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixSrv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveRcv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveSrv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourRcv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourSrv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeRcv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeSrv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.rotationControls = this.svg.snapRoot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles)

    this.rotationControls.transform(`t${1150 * this.svg.scale}, ${50 * this.svg.scale}`)
  }

  drawActionControl () {
    const xOffSet = 220
    const actionBox1 = this.svg.snapRoot.rect(0, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox2 = this.svg.snapRoot.rect(xOffSet * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox3 = this.svg.snapRoot.rect((2 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox4 = this.svg.snapRoot.rect((3 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox5 = this.svg.snapRoot.rect((4 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBoxes = this.svg.snapRoot.group(actionBox1, actionBox2, actionBox3, actionBox4, actionBox5)
// 990
// 1240
    const linkBar1 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 230 * this.svg.scale, (1240 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar2 = this.svg.snapRoot.rect(1200 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 150 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar3 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 450 * this.svg.scale, (1440 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar4 = this.svg.snapRoot.rect(1400 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 370 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkLine1 = this.svg.snapRoot.line((xOffSet/2) * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, 250 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine2 = this.svg.snapRoot.line(1220 * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine3 = this.svg.snapRoot.line((xOffSet/2) * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 470 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine4 = this.svg.snapRoot.line(1420 * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 20 * this.svg.scale + this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const links = this.svg.snapRoot.group(linkBar1, linkBar2, linkBar3, linkBar4, linkLine1, linkLine2, linkLine3, linkLine4)

    const textHeadingS = this.svg.snapRoot.text(70 * this.svg.scale, 206 * this.svg.scale, this.text.rotationControl.serving)
    textHeadingS.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const textHeadingR = this.svg.snapRoot.text(80 * this.svg.scale, 416 * this.svg.scale, this.text.rotationControl.receiving)
    textHeadingR.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    this.controlServeBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer'
    })
    this.controlServeServe = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlServeSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlServe = this.svg.snapRoot.group(this.controlServeBase, this.controlServeServe, this.controlServeSwitch)

    this.controlReceiveBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveReceive = this.svg.snapRoot.circle((1.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSet = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveHit = this.svg.snapRoot.circle((3.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlReceive = this.svg.snapRoot.group(this.controlReceiveBase, this.controlReceiveReceive, this.controlReceiveSet, this.controlReceiveHit, this.controlReceiveSwitch)

    const textLabelS1 = this.multilineText(this.text.actionControl.servingBase, 36, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    }).transform(`t${(0.5 * xOffSet) * this.svg.scale},${330 * this.svg.scale}`)
    const textLabelS2 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text.actionControl.serve).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelS3 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text.actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelS = this.svg.snapRoot.group(textLabelS1, textLabelS2, textLabelS3)

    const textLabelR1 = this.multilineText(this.text.actionControl.servingBase, 36, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    }).transform(`t${(0.5 * xOffSet) * this.svg.scale}, ${550 * this.svg.scale}`)
    const textLabelR2 = this.svg.snapRoot.text((1.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text.actionControl.pass).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR3 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text.actionControl.set).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR4 = this.svg.snapRoot.text((3.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text.actionControl.attack).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR5 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text.actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR = this.svg.snapRoot.group(textLabelR1, textLabelR2, textLabelR3, textLabelR4, textLabelR5)

    this.controlServeBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeServe.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeServe); this.move(this.playerPositions.servingServe[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeSwitch); this.move(this.playerPositions.servingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveReceive.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveReceive); this.move(this.playerPositions.receivingPass[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSet.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSet); this.move(this.playerPositions.receivingSet[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveHit.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveHit); this.move(this.playerPositions.receivingAttack[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSwitch); this.move(this.playerPositions.receivingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)}})

    this.actionControls = this.svg.snapRoot.group(actionBoxes, links, headingLabels, controlServe, controlReceive, textLabelS, textLabelR)

    this.actionControls.transform(`t${10 * this.svg.scale}, ${950 * this.svg.scale}`)
  }

  controlSelect (setterPos, serving, action) {
    this.controlTwoRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlTwoSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlOneRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlOneSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlSixRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlSixSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFiveRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFiveSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFourRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFourSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlThreeRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlThreeSrv.attr({fill: this.colours.rotationControlBackgroundColourB})

    let currentControl
    if (setterPos === 1) {
      currentControl = serving ? this.controlOneSrv : this.controlOneRcv
    }
    else if (setterPos === 2) {
      currentControl = serving ? this.controlTwoSrv : this.controlTwoRcv
    }
    else if (setterPos === 3) {
      currentControl = serving ? this.controlThreeSrv : this.controlThreeRcv
    }
    else if (setterPos === 4) {
      currentControl = serving ? this.controlFourSrv : this.controlFourRcv
    }
    else if (setterPos === 5) {
      currentControl = serving ? this.controlFiveSrv : this.controlFiveRcv
    }
    else if (setterPos === 6) {
      currentControl = serving ? this.controlSixSrv : this.controlSixRcv
    }

    currentControl.attr({fill: this.colours.rotationControlColour})
    this.actionSelect(action)
  }

  actionSelect (action) {
    this.controlServeBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeServe.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveReceive.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSet.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveHit.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    action.attr({fill: this.colours.rotationControlColour})
  }

  drawTutorialButton () {
    const tutorialButtonBox = this.svg.snapRoot.rect(1410 * this.svg.scale , 1480 * this.svg.scale, 280 * this.svg.scale, 80 * this.svg.scale)
    tutorialButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const tutorialButtonText = this.svg.snapRoot.text(1550 * this.svg.scale, 1536 * this.svg.scale, this.text.tutorial[0])
    tutorialButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
    })

    this.tutorialButton = this.svg.snapRoot.group(tutorialButtonBox, tutorialButtonText)
    this.tutorialButton.attr({ cursor: 'pointer' })

    this.tutorialButton.click(() => {
      this.drawTutorial(0)
    })
  }

  drawTutorial (index) {
    if (index >= this.tutorialData.length) {
      return
    }

    const p1 = this.svg.snapRoot.path("M0 0 H" + this.svg.width + "V" + this.svg.height + "H0Z " +
      "M" + this.tutorialData[index].boxPosition.right + " " + this.tutorialData[index].boxPosition.top + " " +
      "H" + this.tutorialData[index].boxPosition.left + "V" + this.tutorialData[index].boxPosition.bottom +
      "H" + this.tutorialData[index].boxPosition.right + "Z")

    this.tutorialMask = this.svg.snapRoot.group(p1)
    this.tutorialMask.attr({
      'fill-rule': 'evenodd',
      'fill': this.colours.tutorialFade,
      'fill-opacity': 0.8
    })

    this.tutorialMaskEdge = this.svg.snapRoot.rect(
      this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.top,
      this.tutorialData[index].boxPosition.right - this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.bottom - this.tutorialData[index].boxPosition.top
    )
    this.tutorialMaskEdge.attr({
      stroke: this.colours.tutorialColour,
      fill: 'none'
    })

    const textBox = this.svg.snapRoot.rect(
      this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.top,
      this.tutorialData[index].textPosition.right - this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.bottom - this.tutorialData[index].textPosition.top
    )
    textBox.attr({
      fill: this.colours.tutorialColour
    })

    this.tutorialTextBox = this.svg.snapRoot.group(textBox)

    const textChunks = this.tutorialData[index].text.split('\n')
    for(var i = 0; i < textChunks.length; i++) {
      const textLine = this.svg.snapRoot.text(this.tutorialData[index].textPosition.left + (10 * this.svg.scale),
        this.tutorialData[index].textPosition.top + (42 * this.svg.scale) + (i * 40 * this.svg.scale),
        textChunks[i])
      textLine.attr({
        fill: this.colours.rotationControlColour,
        stroke: this.colours.rotationControlColour,
        strokeWidth: 2  * this.svg.scale,
        'text-anchor': 'left',
        'font-family': 'Verdana',
        'font-size': 32 * this.svg.scale,
        cursor: 'pointer',
      })
      this.tutorialTextBox.add(textLine)
    }

    const nextButtonBox = this.svg.snapRoot.rect(
      this.tutorialData[index].nextPosition.left,
      this.tutorialData[index].nextPosition.top,
      240 * this.svg.scale,
      80 * this.svg.scale
    )
    nextButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const nextButtonText = this.svg.snapRoot.text(this.tutorialData[index].nextPosition.left + 120 * this.svg.scale,
      this.tutorialData[index].nextPosition.top + (56 * this.svg.scale),
      this.text.tutorial[1]
    )
    nextButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
      cursor: 'pointer',
    })

    this.tutorialNextButton = this.svg.snapRoot.group(nextButtonBox, nextButtonText)
    this.tutorialNextButton.attr({ cursor: 'pointer' })

    this.tutorialNextButton.click(() => {
      this.tutorialMask.remove()
      this.tutorialTextBox.remove()
      this.tutorialNextButton.remove()
      this.tutorialMaskEdge.remove()
      this.drawTutorial(index+1)
    })
  }

  move (players, time) {
    this.state.moving = true

    this.players.s.setPosition(players.s.x, players.s.y)
    this.players.o.setPosition(players.o.x, players.o.y)
    this.players.m2.setPosition(players.m2.x, players.m2.y)
    this.players.m1.setPosition(players.m1.x, players.m1.y)
    this.players.h1.setPosition(players.h1.x, players.h1.y)
    this.players.h2.setPosition(players.h2.x, players.h2.y)

    return this.court.draw()
  }
}
