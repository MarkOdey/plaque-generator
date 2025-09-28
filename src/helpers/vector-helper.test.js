import { describe, expect, test, vi } from 'vitest'

import { Line, Point, Vector } from './vector-helper'

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

describe('Vector', () => {
  beforeEach(() => {
    vi.clearAllMocks() // optional: resets mock call counts/implementations
  })

  test('Should instantiate Vector', () => {
    const vector = new Vector('F')

    expect(vector.text).equal('F')
    expect(vector.font).equal('sans-serif')

    expect(vectorizeText).toBeCalled()
    console.log('What')
  })

  test('Parse Vector', () => {
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

    const vector = new Vector('F')

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
  })

  test('Parse More Complex Vector', () => {
    const vector = new Vector('F')

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
