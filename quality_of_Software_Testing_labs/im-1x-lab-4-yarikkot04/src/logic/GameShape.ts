import { Shape, CoordObject } from '../../interfaces'

export class GameShape implements Shape<CoordObject>{
    public collisionDetected: boolean = false
    constructor(public coordShape: CoordObject[], public coordLandscape: CoordObject[], public height: number, public width: number) { }
    changeCoord() {
        let deepestPoint: Array<CoordObject> = this.coordShape.filter((elem: CoordObject) => elem.x === this.coordShape[this.coordShape.length - 1].x)
        deepestPoint = deepestPoint.map(e => ({
            ...e
        }))
        for (let i = 0; i < deepestPoint.length; i++) {
            deepestPoint[i].x++
        }
        for (let i = 0; i < deepestPoint.length; i++) {
            for (let k = 0; k < this.coordLandscape.length; k++) {
                if (deepestPoint[i].x === this.coordLandscape[k].x && deepestPoint[i].y === this.coordLandscape[k].y) {
                    this.collisionDetected = true
                    return
                }
                if (deepestPoint[i].x > this.height - 1) {
                    this.collisionDetected = true
                    return
                }
            }
        }
        for (let i = 0; i < this.coordShape.length; i++) {
            this.coordShape[i].x++
        }
    }
    buildNewField(): Array<string> {
        const newField: Array<Array<string>> = []
        for (let i = 0; i < this.height; i++) {
            newField[i] = []
            for (let k = 0; k < this.width; k++) {
                newField[i][k] = '.'
            }
        }
        for (let i = 0; i < this.coordShape.length; i++) {
            newField[this.coordShape[i].x][this.coordShape[i].y] = 'p'
        }
        for (let i = 0; i < this.coordLandscape.length; i++) {
            newField[this.coordLandscape[i].x][this.coordLandscape[i].y] = '#'
        }

        return newField.map(row => row.join('').replaceAll(',', ''))
    }
}