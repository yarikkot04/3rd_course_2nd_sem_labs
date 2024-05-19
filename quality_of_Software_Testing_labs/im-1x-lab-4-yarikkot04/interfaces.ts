export interface Output {
    printMessage(msg: string)
}

export interface FileSystem {
    fileExist(pathToFile: string): boolean
    readFromFile(pathToFile: string): Promise<Array<string> | Error>
}

export interface CoordObject {
    x: number,
    y: number
}

export interface Shape<T> {
    height: number,
    width: number,
    coordShape: T[],
    coordLandscape: T[],
    collisionDetected: boolean
    changeCoord(): void
    buildNewField(): Array<string>
}