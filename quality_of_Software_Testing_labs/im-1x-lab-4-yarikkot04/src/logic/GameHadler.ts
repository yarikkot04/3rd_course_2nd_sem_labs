import { CoordObject, Shape } from '../../interfaces'
import { GameShape } from './GameShape'

export class Game {
    constructor(protected inputField: Array<string>, protected advancedMode: boolean) { }
    startGame(): Array<string> | Array<Array<string>> {
        const height: number = this.inputField.length
        const width: number = this.inputField[0].length
        const [coordOfShape, coordOfLandscape]: CoordObject[][] = Game.findCoordinatesOfShape(this.inputField, height, width)
        const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
        const stepArr: Array<Array<string>> = [this.inputField]
        if (!this.advancedMode) {
            let finalBoard: Array<string> = null
            while (!shape.collisionDetected) {
                shape.changeCoord()
                if (shape.collisionDetected) {
                    finalBoard = shape.buildNewField()
                    break
                }
            }
            return finalBoard
        } else {
            let currentBoard: Array<string> = null
            while (!shape.collisionDetected) {
                shape.changeCoord()
                if (shape.collisionDetected) break
                currentBoard = shape.buildNewField()
                stepArr.push(currentBoard)
            }
            return stepArr
        }

    }

    static findCoordinatesOfShape(field: Array<string>, height: number, width: number): [Array<CoordObject>, Array<CoordObject>] {
        const coordOfShape: Array<CoordObject> = []
        const coordOfLandscape: Array<CoordObject> = []
        for (let i = 0; i < height; i++) {
            for (let k = 0; k < width; k++) {
                if (field[i][k] === 'p') {
                    coordOfShape.push({ x: i, y: k })
                } else if (field[i][k] === '#') {
                    coordOfLandscape.push({ x: i, y: k })
                }
            }
        }
        return [coordOfShape, coordOfLandscape]
    }
}