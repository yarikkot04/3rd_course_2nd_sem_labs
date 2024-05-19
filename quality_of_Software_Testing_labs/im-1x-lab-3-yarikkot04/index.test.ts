import { expect, test, describe, beforeEach } from '@jest/globals'
import { Output, FileSystem } from './interfaces'
import { mainHandler, Messages } from './index'

describe('Communication Layer Tests | Mock tests:', () => {
    let messages: Array<string> = []
    const output: Output = {
        printMessage(msg: string) {
            messages.push(msg)
        }
    }

    beforeEach(() => {
        messages = [];
    });

    test('Should show How-to-use message if there are no arguments', () => {
        mainHandler(null, output, null)
        expect(messages.length).toBe(1)
        expect(messages[0]).toBe(Messages.noInputFile)
    })

    test('If the file does not exist, a message about this should should be displayed', () => {
        const fsMock: FileSystem = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            fileExist(pathToFile: string): boolean {
                return false
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            readFromFile(pathToFile: string): Promise<Array<string> | Error> {
                return null
            }
        }
        mainHandler('input.txt', output, fsMock)
        expect(messages.length).toBe(1)
        expect(messages[0]).toBe(Messages.inputFileDoesNotExist)
    })

    test('If the file contains an incorrect record, a message about this should be displayed', async () => {
        const fsMock: FileSystem = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            fileExist(pathToFile: string): boolean {
                return true
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            readFromFile(pathToFile: string): Promise<Array<string> | Error> {
                return Promise.reject(new Error('Wrong file format!'))
            }
        }
        await mainHandler('incorrectInput.txt', output, fsMock)
        expect(messages.length).toBe(1)
        expect(messages[0]).toBe(Messages.wrongFileFormat)
    })

    test('If the field is correct, it returns the final state of the field', async () => {
        const fsMock: FileSystem = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            fileExist(pathToFile: string): boolean {
                return true
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            readFromFile(pathToFile: string): Promise<Array<string> | Error> {
                return Promise.resolve([
                    '..pp....',
                    '..pp....',
                    '........',
                    '........',
                    '...#....',
                    '...#...#',
                    '#..#####'
                ])
            }
        }
        await mainHandler('test.txt', output, fsMock)
        expect(messages.length).toBe(1)
        const finalResult = `........\n........\n..pp....\n..pp....\n...#....\n...#...#\n#..#####`
        expect(messages[0]).toEqual(finalResult)
    })
})
