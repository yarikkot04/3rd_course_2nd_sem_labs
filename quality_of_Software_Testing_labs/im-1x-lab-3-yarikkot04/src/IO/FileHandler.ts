import { FileSystem } from '../../interfaces'
import { CoordObject } from '../../interfaces'

const fs = require('fs') // eslint-disable-line @typescript-eslint/no-var-requires


export class FileHandler implements FileSystem {
    fileExist(pathToFile: string): boolean {
        if (fs.existsSync(pathToFile)) {
            return true
        } else {
            return false
        }
    }
    readFromFile(pathToFile: string): Promise<Error | Array<string>> {
        return new Promise((resolve, reject) => {
            fs.readFile(pathToFile, 'utf-8', async (err: Error, data: string) => {
                if (err) {
                    reject(err)
                } else {
                    const formatedDataArr: Array<string> = data.split('\n').join().split(' ').join().replaceAll(',', ' ').replaceAll('  ', ' ').trim().split(' ')
                    const paramsArr: Array<string> = [formatedDataArr[0], formatedDataArr[1]]
                    const fieldArr: Array<string> = formatedDataArr.slice(2)
                    const paramsCheckStatus = FileHandler.checkCorrectParamsInput(paramsArr)
                    if (!paramsCheckStatus) {
                        return reject('Wrong file format!')
                    }
                    const fieldCheckStatus = FileHandler.checkCorrectFieldsInput(fieldArr, +paramsArr[0], +paramsArr[1])
                    const pointPlacementCheckStatus = FileHandler.checkPointPlacement(fieldArr)
                    if (!fieldCheckStatus) {
                        reject('Wrong file format!')
                    } else if (!pointPlacementCheckStatus) {
                        reject('Wrong file format!')
                    } else {
                        resolve(fieldArr)
                    }
                }
            })
        })
    }
    static checkCorrectParamsInput(paramsArr: Array<string>): boolean {
        for (let i = 0; i < paramsArr.length; i++) {
            if (isNaN(+paramsArr[i]) || paramsArr[i] === '') {
                return false
            }
            if (+paramsArr[i] < 5) {
                return false
            }
        }
        return true
    }
    static checkCorrectFieldsInput(fieldArr: Array<string>, height: number, width: number): boolean {
        if (fieldArr.length !== height) return false
        for (const key of fieldArr) {
            if (key.length != width) {
                return false
            }
        }
        for (let i = 0; i < height; i++) {
            for (let k = 0; k < width; k++) {
                if (!['.', '#', 'p'].includes(fieldArr[i][k])) {
                    return false
                }
            }
        }
        return true
    }

    static checkPointPlacement(fieldArr: Array<string>): boolean {
        const height = fieldArr.length
        const width = fieldArr[0].length

        if (!checkCorrectnessOfNewShape()) {
            return false
        } else if (!checkPlacementOfDroppedShapes()) {
            return false
        } else {
            return true
        }
        function findCoordOfNewShape(): CoordObject[] {
            const p_array: Array<CoordObject> = []
            for (let i = 0; i < height; i++) {
                for (let k = 0; k < width; k++) {
                    if (fieldArr[i][k] === 'p') {
                        p_array.push({ x: i, y: k })
                    }
                }
            }
            return p_array
        }
        function receiveCorrectCoordOfShape(x: number, y: number) {
            const shape_I = [
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
                { x: x + 3, y: y },
            ]
            const shape_L = [
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y },
                { x: x + 2, y: y + 1 },
            ]
            const shape_J = [
                { x: x, y: y },
                { x: x + 1, y: y },
                { x: x + 2, y: y - 1 },
                { x: x + 2, y: y },
            ]
            const shape_O = [
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x + 1, y: y },
                { x: x + 1, y: y + 1 },
            ]
            const shape_T = [
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x, y: y + 2 },
                { x: x + 1, y: y + 1 },
            ]
            const shape_S = [
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x + 1, y: y - 1 },
                { x: x + 1, y: y },
            ]
            const shape_Z = [
                { x: x, y: y },
                { x: x, y: y + 1 },
                { x: x + 1, y: y + 1 },
                { x: x + 1, y: y + 2 },
            ]
            const correctShapesArr = [shape_I, shape_L, shape_J, shape_O, shape_T, shape_S, shape_Z]
            return correctShapesArr
        }
        function checkCorrectnessOfNewShape(): boolean {
            const currentShape = findCoordOfNewShape()
            if (currentShape.length !== 4) return false
            const first_coord_x: number = currentShape[0]['x']
            const first_coord_y: number = currentShape[0]['y']
            const arrayOfPossibleShapes = receiveCorrectCoordOfShape(first_coord_x, first_coord_y)

            for (let i = 0; i < arrayOfPossibleShapes.length; i++) {
                if (compareShape(currentShape, arrayOfPossibleShapes[i])) {
                    return true
                }
            }

            function compareShape(current_shape: Array<CoordObject>, correct_shape: Array<CoordObject>) {
                for (let i = 0; i < current_shape.length; i++) {
                    if (correct_shape[i]['x'] !== current_shape[i]['x'] || correct_shape[i]['y'] !== current_shape[i]['y']) {
                        return false
                    }
                }
                return true
            }

            return false
        }
        function checkPlacementOfDroppedShapes(): boolean {
            interface filledRowObj {
                index: number,
                row: string,
            }
            const filledRow: Array<filledRowObj> = []
            for (let i = 0; i < fieldArr.length; i++) {
                if (fieldArr[i].includes('#')) {
                    filledRow.push({ index: i, row: fieldArr[i] })
                }
            }
            for (let i = 0; i < filledRow.length; i++) {
                if (filledRow[i + 1] && filledRow[i + 1].index !== undefined) {
                    if (filledRow[i].index < (filledRow[i + 1].index - 1)) {
                        return false
                    }
                }
                if (!(filledRow[i].row.includes('.'))) {
                    return false
                }
            }
            const rowsArr = []
            for (let i = 0; i < filledRow.length; i++) {
                rowsArr.push(filledRow[i].row)
            }

            let isExistNeighborArr: Array<number | string> = []
            for (let i = 0; i < rowsArr.length - 1; i++) {
                for (let k = 0; k < rowsArr[i].length; k++) {
                    const neighborResult = verifyNeighborExistence(rowsArr, i, k);
                    isExistNeighborArr.push(neighborResult);
                }
            }
            const blockOfElemArr = isExistNeighborArr.join().replaceAll(',', '').split('|').filter(elem => elem !== '')
            for (let i = 0; i < blockOfElemArr.length; i++) {
                if (blockOfElemArr[i].includes('1') && !blockOfElemArr[i].includes('2')) {
                    return false
                }
            }
            isExistNeighborArr = isExistNeighborArr.filter(elem => elem !== '|')
            if (isExistNeighborArr.includes(0)) return false
            function verifyNeighborExistence(rowsArr: Array<string>, x: number, y: number): string | number {
                try {
                    const lastElemOfExistNeighborArr = isExistNeighborArr.length - 1
                    const lastElementInRow = rowsArr[0].length - 1
                    let neignborsCount: number | string = '|'
                    const neignborsCoord = [
                        { x: x, y: y + 1 },
                        { x: x + 1, y: y },
                        { x: x, y: y - 1 },
                        { x: x - 1, y: y },
                    ]

                    if (rowsArr[x][y] === '#') {
                        if (y === lastElementInRow) {
                            if (rowsArr[neignborsCoord[2].x][neignborsCoord[2].y] === '#') {
                                neignborsCount = 2
                            } else if (rowsArr[neignborsCoord[1].x][neignborsCoord[1].y] === '#') {
                                neignborsCount = 2
                            } else {
                                neignborsCount = 0
                            }
                        } else if (rowsArr[neignborsCoord[1].x][neignborsCoord[1].y] === '#') {
                            neignborsCount = 2
                        } else if (rowsArr[neignborsCoord[0].x][neignborsCoord[0].y] === '#') {
                            neignborsCount = 1
                        } else if (rowsArr[neignborsCoord[2].x][neignborsCoord[2].y] === '#') {
                            if (isExistNeighborArr[lastElemOfExistNeighborArr] === 1) {
                                neignborsCount = 1
                            }
                        } else if (rowsArr[neignborsCoord[3].x][neignborsCoord[3].y] === '#') {
                            if (isExistNeighborArr[lastElemOfExistNeighborArr] === 1) {
                                neignborsCount = 1
                            }
                        } else {
                            neignborsCount = 0
                        }
                    }
                    return neignborsCount
                } catch (e) {
                    return 0
                }
            }
            return true
        }
    }
}