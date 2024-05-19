import { expect, test, describe, beforeEach, jest } from '@jest/globals'
import { Output, FileSystem } from './interfaces'
import { mainHandler, Messages } from './index'

describe('Communication Layer Tests | Mock tests:', () => {
    const output: Output & { printMessage: jest.Mock } = {
        printMessage: jest.fn((msg) => msg)
    }
    const fsMock: FileSystem & { fileExist: jest.Mock, readFromFile: jest.Mock } = {
        fileExist: jest.fn(() => false),
        readFromFile: jest.fn(() => Promise.resolve(['init'])),
    }
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Should show How-to-use message if there are no arguments', () => {
        mainHandler(null, null, output, null)
        expect(output.printMessage).toBeCalledTimes(1)
        expect(output.printMessage).toHaveBeenCalledWith(Messages.noInputFile)
    })

    test('If the file does not exist, a message about this should should be displayed', () => {
        mainHandler('input.txt', null, output, fsMock)
        expect(fsMock.fileExist).toBeCalledTimes(1)
        expect(output.printMessage).toBeCalledTimes(1)
        expect(output.printMessage).toHaveReturnedWith(Messages.inputFileDoesNotExist)
    })

    test('If the file contains an incorrect record, a message about this should be displayed', async () => {
        fsMock.fileExist.mockImplementation(() => true)
        fsMock.readFromFile.mockImplementation(() => Promise.reject(new Error('Wrong file format!')))
        await mainHandler('incorrectInput.txt', null, output, fsMock)
        expect(fsMock.readFromFile).toBeCalledTimes(1)
        expect(fsMock.fileExist).toBeCalledTimes(1)
        expect(output.printMessage).toBeCalledTimes(1)
        expect(output.printMessage).toHaveReturnedWith(Messages.wrongFileFormat)
    })

    test('If the field is correct, it returns the final state of the field', async () => {
        fsMock.fileExist.mockImplementation(() => true)
        fsMock.readFromFile.mockImplementation(() => Promise.resolve([
            '..pp....',
            '..pp....',
            '........',
            '........',
            '...#....',
            '...#...#',
            '#..#####'
        ]))
        await mainHandler('test.txt', null, output, fsMock)
        expect(fsMock.readFromFile).toBeCalledTimes(1)
        expect(fsMock.fileExist).toBeCalledTimes(1)
        expect(output.printMessage).toBeCalledTimes(1)
        const finalResult = `........\n........\n..pp....\n..pp....\n...#....\n...#...#\n#..#####`
        expect(output.printMessage).toHaveReturnedWith(finalResult)
    })
    test('If the parameter is specified - printEachGen should output each step of the field change.', async () => {
        fsMock.fileExist.mockImplementation(() => true)
        fsMock.readFromFile.mockImplementation(() => Promise.resolve([
            '..pp....',
            '..pp....',
            '........',
            '........',
            '...#....',
            '...#...#',
            '#..#####'
        ]))
        const first_step = `STEP 0\n..pp....\n..pp....\n........\n........\n...#....\n...#...#\n#..#####\n`
        const second_step = `STEP 1\n........\n..pp....\n..pp....\n........\n...#....\n...#...#\n#..#####\n`
        const third_step = `STEP 2\n........\n........\n..pp....\n..pp....\n...#....\n...#...#\n#..#####\n`

        await mainHandler('test.txt', '-printEachGen', output, fsMock)
        expect(fsMock.readFromFile).toBeCalledTimes(1)
        expect(fsMock.fileExist).toBeCalledTimes(1)
        expect(output.printMessage).toBeCalledTimes(3)
        expect(output.printMessage.mock.results[0].value).toEqual(first_step)
        expect(output.printMessage.mock.results[1].value).toEqual(second_step)
        expect(output.printMessage.mock.results[2].value).toEqual(third_step)
    })
})
