import vectorizeText from 'vectorize-text'

export class Vector {
  text = null
  font = 'sans-serif'
  graph = null

  shapes = []
  lines = []
  polyline = []

  constructor(text, params = {}) {
    this.text = text

    if (params.font) {
      this.font = params.font
    }

    this.graph = vectorizeText(this.text, {
      width: 500,
      textBaseline: 'hanging',
      size: 208,
      font: this.font,
    })

    console.log(this.graph)

    this.parseLines()

    this.parsePolyline()
  }

  parseLines() {
    this.lines = this.graph.edges.map((edge, index) => {
      const positionStart = this.graph.positions[edge[0]]

      const positionEnd = this.graph.positions[edge[1]]

      return new Line(
        new Point(positionStart[0], positionStart[1]),
        new Point(positionEnd[0], positionEnd[1])
      )
    })
  }

  parsePolyline() {
    const polyline = []

    const parsedLines = 0

    let index = 0

    const initialLine = this.lines[index]

    let currentLine = initialLine

    polyline.push(currentLine)

    // Find next line

    while (polyline.length != this.lines.length) {
      let nextLine = null

      this.lines.forEach((line, index) => {
        if (currentLine !== line && currentLine.end.equal(line.end)) {
          line.swapStartEnd()
          nextLine = line
        }

        if (currentLine.end.equal(line.start)) {
          //this is next line;

          nextLine = line
        }
      })

      if (nextLine) {
        currentLine = nextLine
        polyline.push(nextLine)

        nextLine = null
      } else {
        break
      }
    }

    this.polyline = polyline
  }
  parseShapes() {}
}

export class Line {
  start = null
  end = null
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  swapStartEnd() {
    const start = this.end

    this.end = this.start
    this.start = start
  }
}

export class Point {
  x = null
  y = null

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  equal(point) {
    return this.x === point.x && this.y === point.y
  }
}
