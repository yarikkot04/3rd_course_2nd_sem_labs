import { Output, FileSystem } from './interfaces'
import { Game } from './src/logic/GameHadler'
import { FileHandler } from './src/IO/FileHandler'

export const Messages = {
    noInputFile: 'Please enter a file to read.\nExample: node index.ts input.txt',
    inputFileDoesNotExist: 'A file with this name does not exist!',
    wrongFileFormat: 'Wrong file format!',
}

async function main(): Promise<void> {
    const inputFile: string = process.argv[2] || null
    const inputKey: string = process.argv[3] || null
    const output: Output = {
        printMessage(msg) {
            console.log(msg)
        },
    }
    const fs = new FileHandler()

    mainHandler(inputFile, inputKey, output, fs)
}

main()

export async function mainHandler(inputFile: string, inputParam: string, output: Output, fs: FileSystem) {
    if (!inputFile) {
        output.printMessage(Messages.noInputFile)
        return
    }

    if (!fs.fileExist(inputFile)) {
        output.printMessage(Messages.inputFileDoesNotExist)
        return
    }

    let board: Array<string> | Error
    try {
        board = await fs.readFromFile(inputFile)
    } catch (e) {
        board = null
    }

    if (board === null) {
        output.printMessage(Messages.wrongFileFormat)
        return
    } else {
        if (inputParam) {
            if (Array.isArray(board)) {
                const newGame = new Game(board as Array<string>, true)
                const boardsList = newGame.startGame()
                for(let i = 0; i < boardsList.length; i++) {
                    output.printMessage(`STEP ${i}\n${boardsList[i].toString().replaceAll(',', '\n')}\n`)
                }
            }
        } else {
            if (Array.isArray(board)) {
                const newGame = new Game(board as Array<string>, false)
                const finalBoard: string = newGame.startGame().toString().replaceAll(',', '\n')
                output.printMessage(finalBoard)
            }
        }
    }
}