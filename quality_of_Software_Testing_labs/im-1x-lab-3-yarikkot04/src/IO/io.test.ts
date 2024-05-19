import { expect, test, describe, beforeEach } from '@jest/globals'
import { FileHandler } from './FileHandler'

describe('IO Layer Tests:', () => {
    describe('class FileHandler:', () => {
        describe('Method fileExist', () => {
            let fileSys
            beforeEach(() => {
                fileSys = new FileHandler()
            })
            test('If the file exists should return true', () => {
                expect(fileSys.fileExist('src/IO/testfiles/input-1.txt')).toBe(true)
            })
            test('If the file doesn`t exists should return false', () => {
                expect(fileSys.fileExist('wrong_name.txt')).toBe(false)
            })
        })
        describe('Method readFromFile', () => {
            let fileSys
            beforeEach(() => {
                fileSys = new FileHandler()
            })

            test('Must read the contents of the file correctly | Test 1', async () => {
                const receivedBoard = await fileSys.readFromFile('src/IO/testfiles/input-1.txt')

                const expectedBoard = [
                    '...pp...',
                    '...pp...',
                    '........',
                    '....##..',
                    '.....#..',
                    '..##.#.#',
                    '#..#####'
                ]
                expect(receivedBoard).toEqual(expectedBoard)
            })
            test('Must read the contents of the file correctly | Test 2', async () => {
                const receivedBoard = await fileSys.readFromFile('src/IO/testfiles/input-2.txt')
                const expectedBoard = [
                    '........',
                    '..ppp...',
                    '...p....',
                    '........',
                    '####....',
                    '#.##...#',
                    '#..#####'
                ]
                expect(receivedBoard).toEqual(expectedBoard)
            })
            test('Must read the contents of the file correctly | Test 3', async () => {
                const receivedBoard = await fileSys.readFromFile('src/IO/testfiles/input-3.txt')
                const expectedBoard = [
                    '...p....',
                    '...p....',
                    '...pp...',
                    '........',
                    '.....#..',
                    '..##.#.#',
                    '#..#####'
                ]
                expect(receivedBoard).toEqual(expectedBoard)
            })
        })
    })
})