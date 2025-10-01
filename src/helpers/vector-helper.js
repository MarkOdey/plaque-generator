import vectorizeText from 'vectorize-text'

export class Vector {
  text = ''
  fontSize = 100
  font = 'sans-serif'

  graph = null

  shapes = []
  lines = []
  get polyline() {
    let lines = []

    this.shapes.forEach((shape) => {
      lines = lines.concat(shape.polyline)
    })

    return lines
  }

  constructor(text, params = {}) {
    this.text = text

    if (params.font) {
      this.font = params.font
    }

    if (params.fontSize) {
      this.fontSize = params.fontSize
    }

    this.graph = vectorizeText(this.text, {
      width: this.text.length * this.fontSize,
      height: this.fontSize,
      textBaseline: 'hanging',
      // size: this.fontSize,
      font: this.font,
    })

    this.parseLines()

    this.parsePolyline()

    console.log(this.shapes)
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

    let shape = new Shape()

    // this.shapes.push(shape)

    const parsedLines = 0

    let index = 0

    if (this.lines.length === 0) {
      return
    }

    const initialLine = this.lines[index]

    let currentLine = initialLine

    // polyline.push(currentLine)

    shape.addLine(currentLine)

    // Find next line

    while (!this.allLinesBelongsToAShape()) {
      let nextLine = null

      this.lines.forEach((line, index) => {
        if (line.shape) {
          return
        }

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
        // polyline.push(nextLine)

        shape.addLine(nextLine)

        nextLine = null
      } else {
        currentLine = this.findLineWithNoShape()

        this.shapes.push(shape)

        shape = new Shape()

        shape.addLine(currentLine)
      }
    }

    this.shapes.push(shape)

    // this.polyline = polyline
  }

  findLineWithNoShape() {
    return this.lines.find((line) => {
      return !line.shape
    })
  }

  allLinesBelongsToAShape() {
    return this.lines.every((line) => {
      return !!line.shape
    })
  }
  parseShapes() {}
}

export class Line {
  shape = null
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

export class Shape {
  polyline = []

  constructor() {}

  addLine(line) {
    line.shape = this

    this.polyline.push(line)
  }
}
