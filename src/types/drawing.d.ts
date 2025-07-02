// Types
type DrawingBase = {
    Visible: boolean,
    ZIndex: number,
    Transparency: number,
    Color: Color3,
    Destroy: () => void,
}

type DrawingBaseData = {
    Visible: boolean | undefined,
    ZIndex: number | undefined,
    Transparency: number | undefined,
    Color: Color3 | undefined,
}

type DrawingLine = DrawingBase & {
    Thickness: number,
    From: Vector2,
    To: Vector2,
}

type DrawingLineData = DrawingBaseData & {
    Thickness: number | undefined,
    From: Vector2 | undefined,
    To: Vector2 | undefined,
}

type DrawingText = DrawingBase & {
    Text: string,
    Size: number,
    Center: boolean,
    Outline: boolean,
    OutlineColor: Color3,
    Position: Vector2,
    TextBounds: Vector2,
}

type DrawingTextData = DrawingBaseData & {
    Text: string | undefined,
    Size: number | undefined,
    Center: boolean | undefined,
    Outline: boolean | undefined,
    OutlineColor: Color3 | undefined,
    Position: Vector2 | undefined,
}

type DrawingImage = DrawingBase & {
    Data: string,
    Size: Vector2,
    Position: Vector2,
    Rounding: number,   
}

type DrawingImageData = DrawingBaseData & {
    Data: string | undefined,
    Size: Vector2 | undefined,
    Position: Vector2 | undefined,
    Rounding: number | undefined,
}

type DrawingCircle = DrawingBase & {
    Thickness: number,
    NumSides: number,
    Radius: number,
    Filled: boolean,
    Position: Vector2,
}

type DrawingCircleData = DrawingBaseData & {
    Thickness: number | undefined,
    NumSides: number | undefined,
    Radius: number | undefined,
    Filled: boolean | undefined,
    Position: Vector2 | undefined,
}

type DrawingSquare = DrawingBase & {
    Thickness: number,
    Size: Vector2,
    Position: Vector2,
    Filled: boolean,
}

type DrawingSquareData = DrawingBaseData & {
    Thickness: number | undefined,
    Size: Vector2 | undefined,
    Position: Vector2 | undefined,
    Filled: boolean | undefined,
}

type DrawingQuad = DrawingBase & {
    Thickness: number,
    PointA: Vector2,
    PointB: Vector2,
    PointC: Vector2,
    PointD: Vector2,
    Filled: boolean,
}

type DrawingQuadData = DrawingBaseData & {
    Thickness: number | undefined,
    PointA: Vector2 | undefined,
    PointB: Vector2 | undefined,
    PointC: Vector2 | undefined,
    PointD: Vector2 | undefined,
    Filled: boolean | undefined,
}

type DrawingTriangle = DrawingBase & {
    Thickness: number,
    PointA: Vector2,
    PointB: Vector2,
    PointC: Vector2,
    Filled: boolean,
}

type DrawingTriangleData = DrawingBaseData & {
    Thickness: number | undefined,
    PointA: Vector2 | undefined,
    PointB: Vector2 | undefined,
    PointC: Vector2 | undefined,
    Filled: boolean | undefined,
}

type DrawingFonts = {
    UI: number,
    System: number,
    Plex: number,
    Monospace: number,
}

type DrawingFontsData = {
    UI: number | undefined,
    System: number | undefined,
    Plex: number | undefined,
    Monospace: number | undefined,
}

type DrawingTypes = "Line" | "Text" | "Image" | "Circle" | "Square" | "Quad" | "Triangle"

// Declarations
declare class Drawing {
    constructor(type: DrawingTypes);
}
