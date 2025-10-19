import vectorizeText from 'vectorize-text'

import inside from 'point-in-polygon-hao'

export class VectorText {
  text = ''
  textWidth = 100
  font = 'sans-serif'

  paddingY = 0
  paddingX = 0

  width = 0
  height = 0

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

    if (params.textWidth) {
      this.width = params.textWidth
    }

    if (params.padding) {
      this.paddingX = params.padding
      this.paddingY = params.padding
    }

    this.graph = vectorizeText(this.text, {
      width: this.width,

      textBaseline: 'hanging',
      // size: this.fontSize,
      font: this.font,
    })

    this.parseLines()

    this.parseHeight()

    this.parseWidth()

    this.parsePolyline()

    this.parseParentShape()

    function checkIfTextInsideShape(shape) {
      return this.shapes.every((textShape) => {
        textShape.checkIfShapeInside(shape)
      })
    }
  }

  parseParentShape() {
    this.shapes.forEach((shape1) => {
      this.shapes.forEach((shape2) => {
        const inside = shape1.checkIfShapeInside(shape2)

        if (inside) {
          shape2.parentShape = shape1
        }
      })
    })
  }

  parseLines() {
    this.lines = this.graph.edges.map((edge, index) => {
      const positionStart = this.graph.positions[edge[0]]

      const positionEnd = this.graph.positions[edge[1]]

      return new Line(
        new Point(
          positionStart[0] + this.paddingX,
          positionStart[1] + this.paddingY,
        ),
        new Point(
          positionEnd[0] + this.paddingX,
          positionEnd[1] + this.paddingY,
        ),
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

  parseHeight() {
    let y = 0

    this.lines.forEach((line) => {
      y = Math.max(y, line.start.y)
    })

    this.height = y + this.paddingY
    return this.height
  }

  parseWidth() {
    let x = 0

    this.lines.forEach((line) => {
      x = Math.max(x, line.start.x)
    })

    this.width = x + this.paddingX
    return this.width
  }

  renderSvg() {
    let svg = []

    for (let i = 0; i < this.shapes.length; i += 1) {
      const shape = this.shapes[i]

      const color = shape.parentShape ? '#00FFFF' : '#FFFF00'

      for (let b = 0; b < shape.polyline.length; b += 1) {
        const line = shape.polyline[b]

        svg.push(line.renderSvg({ color }))
      }
    }

    return svg.join('')
  }
}

export class VectorFrame {
  width = null
  height = null
  shapeType = null

  shape = new Shape()

  constructor({ width, height, shapeType }) {
    if (width) {
      this.width = width
    }

    if (height) {
      this.height = height
    }

    if (shapeType) {
      this.shape = shape
    }

    this.renderShape()
  }

  renderShape() {
    const p1 = new Point(0, 0)
    const p2 = new Point(0, this.height)
    const p3 = new Point(this.width, this.height)
    const p4 = new Point(this.width, 0)

    this.shape.addLine(new Line(p1, p2))
    this.shape.addLine(new Line(p2, p3))
    this.shape.addLine(new Line(p3, p4))
    this.shape.addLine(new Line(p4, p1))
  }

  renderSvg() {
    const color = '#00FF00'

    const svg = []

    for (let b = 0; b < this.shape.polyline.length; b += 1) {
      const line = this.shape.polyline[b]

      svg.push(line.renderSvg({ color }))
    }

    return svg.join('')
  }

  parseHeight() {
    return this.shape.getComputedHeight()
  }

  parseWidth() {
    return this.shape.getComputedWidth()
  }
}

export class Rectangle {}

export class Line {
  static counter = 0

  id = null
  shape = null
  start = null
  end = null
  constructor(start, end, shape) {
    Line.counter += 1

    this.id = `line-${Line.counter}`

    if (shape) {
      this.shape = shape
    }
    this.start = start
    this.end = end
  }

  swapStartEnd() {
    const start = this.end

    this.end = this.start
    this.start = start
  }

  addPadding(padding) {
    return new Line(
      this.start.addPadding(padding),
      this.end.addPadding(padding),
      this.shape,
    )
  }
  renderSvg({ color }) {
    return `<line data-part="${this.id}" x1="${this.start.x}" y1="${this.start.y}" x2="${this.end.x}" y2="${this.end.y}" stroke-width="1" stroke="${color}" />`
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

  castRaw() {
    return [this.x, this.y]
  }

  addPadding(padding) {
    return new Point(this.x + padding, this.y + padding)
  }
}

export class Shape {
  polyline = []

  parentShape

  constructor() {}

  addLine(line) {
    line.shape = this

    this.polyline.push(line)
  }

  checkIfShapeInside(shape) {
    return shape.polyline.every((line) => {
      const point = line.start

      return this.checkIfPointInside(point)
    })
  }

  getComputedHeight() {
    const maxY = this.polyline.reduce(
      (max, line) => Math.max(max, line.start.y),
      0,
    )
    const minY = this.polyline.reduce(
      (min, line) => Math.min(min, line.start.y),
      maxY,
    )

    return maxY - minY
  }

  getComputedWidth() {
    const maxX = this.polyline.reduce(
      (max, line) => Math.max(max, line.start.x),
      0,
    )
    const minX = this.polyline.reduce(
      (min, line) => Math.min(min, line.start.x),
      maxX,
    )

    return maxX - minX
  }

  getComputedTop() {
    return this.polyline.reduce(
      (min, line) => Math.min(min, line.start.y),
      1000000000000,
    )
  }

  getComputedLeft() {
    return this.polyline.reduce(
      (min, line) => Math.min(min, line.start.x),
      100000000,
    )
  }

  checkIfShapeOverlap(shape) {
    return (
      shape.polyline.some((line) => {
        const point = line.start

        return this.checkIfPointInside(point)
      }) &&
      shape.polyline.some((line) => {
        const point = line.start

        return !this.checkIfPointInside(point)
      })
    )
  }

  checkIfPointInside(point) {
    const rawPolyline = this.castToRawPolyLine()
    const rawPoint = point.castRaw()

    const res = inside(rawPoint, [rawPolyline])

    return res
  }

  castToRawPolyLine() {
    const rawPoints = this.polyline.map((line) => {
      return line.start.castRaw()
    })

    const firstPoint = this.polyline[0].start.castRaw()

    rawPoints.push(firstPoint)

    return rawPoints
  }
}
