import { describe, expect, test, vi } from 'vitest'

import { Line, Point, Shape, VectorText } from './vector-helper'

vi.mock('vectorize-text', () => ({
  default: vi.fn(() => {
    return {
      edges: [
        [0, 1],
        [0, 42],
        [1, 2],
        [2, 3],
        [3, 13],
        [4, 5],
        [4, 8],
        [5, 6],
        [6, 7],
        [7, 9],
        [8, 10],
        [9, 11],
        [10, 12],
        [11, 14],
        [12, 15],
        [13, 25],
        [14, 16],
        [15, 19],
        [16, 24],
        [17, 18],
        [17, 20],
        [18, 21],
        [19, 28],
        [20, 22],
        [21, 23],
        [22, 26],
        [23, 29],
        [24, 32],
        [25, 27],
        [26, 31],
        [27, 28],
        [29, 30],
        [30, 34],
        [31, 33],
        [32, 36],
        [33, 35],
        [34, 37],
        [35, 38],
        [36, 41],
        [37, 40],
        [38, 39],
        [39, 45],
        [40, 46],
        [41, 47],
        [42, 43],
        [43, 44],
        [44, 45],
        [46, 47],
      ],
      positions: [
        [5.297911547911482, 5.297911547911644],
        [8.522727272727273, 3.6092939318744497],
        [105.11363636363636, 3.3437826541273807],
        [108.77525252525253, 4.861111111111104],
        [269.8863636363636, 225.33010049076873],
        [303.9772727272727, 224.10785486443368],
        [349.4318181818182, 226.08024691358025],
        [377.84090909090907, 231.3131313131313],
        [218.75, 236.86560729243666],
        [411.1917494270436, 243.16077441077445],
        [192.03727926749502, 249.135375494071],
        [432.5844796650719, 254.99260355029594],
        [174.7654598308668, 260.2077762923352],
        [108.83588358835877, 264.20454545454544],
        [454.0069815805109, 273.2622491145219],
        [153.4090909090909, 278.4090909090909],
        [467.0756477821695, 288.3769048870206],
        [252.8409090909091, 304.5241143832694],
        [292.6136363636364, 304.5643489527101],
        [124.66692789968644, 312.1500329380763],
        [218.88368983957207, 311.39368444055935],
        [326.70454545454544, 310.49040018505667],
        [191.9500953591862, 322.9316979316979],
        [353.5688920454544, 322.8109137055836],
        [484.8736702127661, 321.02272727272725],
        [105.34164859002165, 332.3863636363636],
        [174.9580320247933, 334.1637529137529],
        [106.71082949308752, 337.038590604027],
        [109.20983086680765, 337.038590604027],
        [368.5449166218397, 336.0051406926407],
        [382.479455572676, 355.1136363636364],
        [146.82687531048185, 362.6437568455639],
        [496.5585186784713, 360.79545454545456],
        [135.46248778103617, 379.564393939394],
        [393.99812074230664, 389.20454545454544],
        [122.8493373634039, 406.25],
        [502.78883540085155, 411.9318181818182],
        [399.60122331494347, 446.02272727272725],
        [111.44049187527455, 451.70454545454544],
        [109.64035964035965, 491.4772727272727],
        [399.8544558889385, 855.1136363636364],
        [503.41986212839305, 855.1136363636364],
        [5.297911547911482, 858.338452088452],
        [8.522727272727273, 860.0270697044891],
        [105.11363636363636, 860.2925809822362],
        [108.77525252525253, 858.7752525252525],
        [401.6317733990149, 859.3694295900178],
        [501.7099310641965, 859.3694295900178],
      ],
    }
  }),
}))

import vectorizeText from 'vectorize-text'

describe('VectorText', () => {
  beforeEach(() => {
    vi.clearAllMocks() // optional: resets mock call counts/implementations
  })

  test('Should instantiate VectorText', () => {
    const vector = new VectorText('F')

    expect(vector.text).equal('F')
    expect(vector.font).equal('sans-serif')

    expect(vectorizeText).toBeCalled()
  })

  test('Parse VectorText', () => {
    vectorizeText.mockReturnValue({
      edges: [
        [0, 1],
        [2, 3],
        [1, 2],
        [3, 0],
      ],
      positions: [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    })

    const vector = new VectorText('F')

    expect(vector.lines.length).equal(4)

    vector.lines.forEach((line) => {
      expect(line.start).toBeInstanceOf(Point)

      expect(line.end).toBeInstanceOf(Point)
    })

    let firstLine = null
    let previousLine = null

    vector.polyline.forEach((line, index) => {
      if (!firstLine) {
        firstLine = line
      } else {
        expect(line.start.equal(previousLine.end)).to.equal(true)
      }

      previousLine = line
    })

    expect(vector.width).to.equal(1)
    expect(vector.height).to.equal(1)
  })

  test('Parse Single Closed Letter', () => {
    const vector = new VectorText('F')

    vector.lines.forEach((line) => {
      expect(line.start).toBeInstanceOf(Point)

      expect(line.end).toBeInstanceOf(Point)
    })

    let firstLine = null
    let previousLine = null

    expect(vector.lines.length).to.equal(vector.polyline.length)

    vector.polyline.forEach((line, index) => {
      if (!firstLine) {
        firstLine = line
      } else {
        expect(line.start.equal(previousLine.end)).to.equal(true)
      }

      previousLine = line
    })

    expect(vector.shapes.length).to.equal(1)
  })

  test('Parse Single Letter With Multiple Shapes', () => {
    vectorizeText.mockReturnValue({
      edges: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 7],
        [6, 8],
        [7, 9],
        [8, 10],
        [9, 11],
        [10, 17],
        [11, 20],
        [12, 13],
        [12, 15],
        [13, 14],
        [14, 16],
        [15, 18],
        [16, 19],
        [17, 24],
        [18, 21],
        [19, 22],
        [20, 26],
        [21, 23],
        [22, 25],
        [23, 27],
        [24, 29],
        [25, 28],
        [26, 31],
        [27, 30],
        [28, 32],
        [29, 34],
        [30, 33],
        [31, 36],
        [32, 37],
        [33, 35],
        [34, 38],
        [35, 39],
        [36, 40],
        [37, 41],
        [38, 42],
        [39, 43],
        [40, 45],
        [41, 44],
        [42, 46],
        [43, 49],
        [44, 47],
        [45, 48],
        [46, 50],
        [47, 51],
        [48, 52],
        [49, 53],
        [50, 55],
        [51, 54],
        [52, 57],
        [53, 58],
        [54, 56],
        [55, 59],
        [56, 61],
        [57, 64],
        [58, 60],
        [59, 63],
        [60, 62],
        [61, 66],
        [62, 65],
        [63, 69],
        [64, 73],
        [65, 67],
        [66, 68],
        [67, 70],
        [68, 72],
        [69, 74],
        [70, 71],
        [71, 72],
        [73, 75],
        [74, 77],
        [75, 76],
        [76, 79],
        [77, 78],
        [78, 80],
        [79, 81],
        [80, 82],
        [81, 83],
        [82, 84],
        [83, 85],
        [84, 85],
      ],
      positions: [
        [221.93877551020407, 3.3925258415052895],
        [288.265306122449, 3.785862170955413],
        [186.22448979591837, 8.311186882615553],
        [323.9795918367347, 8.93231192770363],
        [145.85310868533463, 19.49800020510714],
        [359.6938775510204, 18.52374115475331],
        [121.66405023547877, 30.004859086491876],
        [403.8104752390468, 40.1860744297719],
        [96.42857142857146, 45.433996383363485],
        [424.1382528621204, 55.480964315550835],
        [82.56853037072814, 56.98672911787659],
        [439.4547759932376, 70.74526239067063],
        [216.83673469387756, 74.49220823080996],
        [252.55102040816325, 71.79828453120376],
        [293.3673469387755, 74.82993197278921],
        [196.42857142857142, 79.73723840681299],
        [313.4336208710287, 80.61708095560505],
        [55.448041285479654, 85.99666281606996],
        [172.16748768472905, 90.89755305107117],
        [334.18367346938777, 90.06783229050927],
        [454.9540023263191, 90.82247356774046],
        [157.2542810227539, 101.19502346393092],
        [351.1464930799905, 102.90532879818583],
        [142.13242115027822, 116.55958679768199],
        [34.570330374302245, 120.15076300790595],
        [368.1605074462218, 121.53679653679649],
        [471.233174120712, 119.89795918367346],
        [131.75039246467813, 131.46373414230547],
        [379.14182526943375, 140.30612244897958],
        [23.514851485148448, 145.40816326530611],
        [121.50979794903036, 151.4338494018296],
        [486.54449185215634, 160.71428571428572],
        [389.1117140497819, 165.81632653061223],
        [111.17998601309675, 181.12244897959184],
        [9.384409501505466, 196.42857142857142],
        [105.52446785165681, 206.6326530612245],
        [496.36177590813486, 206.6326530612245],
        [399.41075021557907, 211.73469387755102],
        [4.0944277397479585, 232.14285714285714],
        [100.84214408655032, 242.3469387755102],
        [501.7183039018716, 257.6530612244898],
        [404.0229510334486, 262.7551020408163],
        [1.7006802721088918, 293.3673469387755],
        [99.76212707305142, 323.9795918367347],
        [403.85788867041845, 323.9795918367347],
        [501.60037205230617, 329.0816326530612],
        [3.764041639710705, 349.48979591836735],
        [399.6687680307726, 369.89795918367344],
        [496.5076939866856, 375],
        [105.90922936338721, 380.1020408163265],
        [8.855266244428838, 385.2040816326531],
        [394.8637008760338, 395.4081632653061],
        [486.48088677095194, 420.9183673469388],
        [120.3844940037871, 431.1224489795918],
        [384.14354505847274, 431.1224489795918],
        [24.55201592832255, 440.9340659340658],
        [374.292202430105, 451.53061224489795],
        [475.53393450403416, 450.8983080411651],
        [132.114336417797, 454.72411186696894],
        [35.09539910638805, 465.12919684002645],
        [142.43756713211602, 469.8306405895691],
        [357.7339472374316, 475.08818342151665],
        [157.31292517006807, 485.4928235030275],
        [50.05584323281546, 490.9499514091351],
        [454.51232441028355, 490.2765454007691],
        [171.9596001665973, 495.9548104956268],
        [332.4161807580174, 495.54321728691474],
        [196.42857142857142, 507.454981992797],
        [308.6734693877551, 506.5679793043979],
        [65.38170823885106, 511.1852433281004],
        [211.73469387755102, 511.9225235786221],
        [247.44897959183672, 514.9709518844033],
        [288.265306122449, 511.99175322302835],
        [438.9773895169579, 510.4074238391008],
        [80.40340488527013, 526.6964285714287],
        [423.8460484865086, 525.8843537414965],
        [404.1502565938657, 541.7664514785505],
        [106.05909030278785, 546.7819940476189],
        [125, 557.9297113940944],
        [378.8657770800628, 556.9989534275248],
        [146.07490723562148, 567.1856825631806],
        [354.59183673469386, 567.7179962894247],
        [186.22448979591837, 578.5905911660437],
        [318.87755102040813, 577.6383948074644],
        [216.83673469387756, 583.0863071485577],
        [283.16326530612247, 583.034630282708],
      ],
    })

    const vector = new VectorText('o')

    let firstLine = null
    let previousLine = null

    expect(vector.lines.length).to.equal(vector.polyline.length)

    expect(vector.shapes.length).to.equal(2)

    expect(vectorizeText).toBeCalled()
  })
})

describe('Lines', () => {
  describe('swapStartEnd', () => {
    test('Should swap start from end', () => {
      const point1 = new Point(1, 1)
      const point2 = new Point(0, 0)

      const line = new Line(point1, point2)

      expect(line.start.x).to.equal(1)
      expect(line.start.y).to.equal(1)

      expect(line.end.x).to.equal(0)
      expect(line.end.y).to.equal(0)

      line.swapStartEnd()

      expect(line.start.x).to.equal(0)
      expect(line.start.y).to.equal(0)

      expect(line.end.x).to.equal(1)
      expect(line.end.y).to.equal(1)
    })
  })
})

describe('Point', () => {
  describe('equal', () => {
    test('Equality should pass if they share same position', () => {
      const point1 = new Point(1, 1)
      const point2 = new Point(1, 1)

      expect(point1.equal(point2)).to.equal(true)
    })

    test('Equality should fail if they dont share the same x', () => {
      const point1 = new Point(1, 2)
      const point2 = new Point(1, 1)

      expect(point1.equal(point2)).to.equal(false)
    })

    test('Equality should fail if they dont share the same x', () => {
      const point1 = new Point(1, 1)
      const point2 = new Point(2, 1)

      expect(point1.equal(point2)).to.equal(false)
    })
  })
})

describe('Shape', () => {
  describe('checkIfPointInside', () => {
    test('Should pass if the point is inside', () => {
      const shape = new Shape()

      const p1 = new Point(0, 0)
      const p2 = new Point(0, 3)
      const p3 = new Point(3, 3)
      const p4 = new Point(3, 0)

      shape.addLine(new Line(p1, p2))
      shape.addLine(new Line(p2, p3))
      shape.addLine(new Line(p3, p1))
      shape.addLine(new Line(p4, p2))
      shape.addLine(new Line(p1, p2))

      const point1 = new Point(1.5, 2.5)

      const res = shape.checkIfPointInside(point1)

      expect(res).to.equal(true)
    })
  })

  describe('checkIfShapeInside', () => {
    test('Should pass if shape is inside', () => {
      const shapeInside = new Shape()

      const p1 = new Point(1, 1)
      const p2 = new Point(1, 1.2)
      const p3 = new Point(1.2, 1.2)

      shapeInside.addLine(new Line(p1, p2))
      shapeInside.addLine(new Line(p2, p3))
      shapeInside.addLine(new Line(p3, p1))

      const shapeOutside = new Shape()
      const p4 = new Point(0, 0)
      const p5 = new Point(0, 5)
      const p6 = new Point(5, 5)
      const p7 = new Point(5, 0)

      shapeOutside.addLine(new Line(p4, p5))
      shapeOutside.addLine(new Line(p5, p6))
      shapeOutside.addLine(new Line(p6, p4))
      shapeOutside.addLine(new Line(p7, p5))

      const res = shapeOutside.checkIfShapeInside(shapeInside)

      expect(res).to.equal(true)
    })
  })

  describe('checkIfShapeOverlap', () => {
    test('Should pass if shape is overlapping', () => {
      const shapeInside = new Shape()

      const p1 = new Point(1, 1)
      const p2 = new Point(1, 10)
      const p3 = new Point(10, 1)

      shapeInside.addLine(new Line(p1, p2))
      shapeInside.addLine(new Line(p2, p3))
      shapeInside.addLine(new Line(p3, p1))

      const shapeOutside = new Shape()
      const p4 = new Point(0, 0)
      const p5 = new Point(0, 5)
      const p6 = new Point(5, 5)
      const p7 = new Point(5, 0)

      shapeOutside.addLine(new Line(p4, p5))
      shapeOutside.addLine(new Line(p5, p6))
      shapeOutside.addLine(new Line(p6, p4))
      shapeOutside.addLine(new Line(p7, p5))

      const res = shapeOutside.checkIfShapeOverlap(shapeInside)

      expect(res).to.equal(true)
    })
  })

  describe('getComputedWidth', () => {
    test('Should get computed width', () => {
      const shape = new Shape()
      const p4 = new Point(1, 2)
      const p5 = new Point(1, 5)
      const p6 = new Point(5, 5)
      const p7 = new Point(5, 2)

      shape.addLine(new Line(p4, p5))
      shape.addLine(new Line(p5, p6))
      shape.addLine(new Line(p6, p4))
      shape.addLine(new Line(p7, p5))

      const res = shape.getComputedWidth(shape)

      expect(res).to.equal(4)
    })
  })

  describe('getComputedHeight', () => {
    test('Should get computed height', () => {
      const shape = new Shape()
      const p4 = new Point(1, 2)
      const p5 = new Point(1, 5)
      const p6 = new Point(5, 5)
      const p7 = new Point(5, 2)

      shape.addLine(new Line(p4, p5))
      shape.addLine(new Line(p5, p6))
      shape.addLine(new Line(p6, p4))
      shape.addLine(new Line(p7, p5))

      const res = shape.getComputedHeight(shape)

      expect(res).to.equal(3)
    })
  })
})
