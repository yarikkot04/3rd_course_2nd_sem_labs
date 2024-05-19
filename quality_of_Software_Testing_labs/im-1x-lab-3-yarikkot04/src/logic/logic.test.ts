import { expect, test, describe } from '@jest/globals'
import { FileHandler } from '../IO/FileHandler'
import { GameShape } from './GameShape'
import { Shape, CoordObject } from '../../interfaces'
import { Game } from './GameHadler'


describe('Logic Layer Tests', () => {

    describe('class GameHandler:', () => {
        describe('Method startGame: ', () => {
            test('Should get an array of the field and return the correct result | Test 1', () => {
                const startBoard = [
                    '..pp....',
                    '..pp....',
                    '........',
                    '........',
                    '...#....',
                    '...#...#',
                    '#..#####'
                ]

                const correctResult = '........\n........\n..pp....\n..pp....\n...#....\n...#...#\n#..#####'
                const newGame = new Game(startBoard)
                const finalBoard: string = newGame.startGame().toString().replaceAll(',', '\n')
                expect(finalBoard).toBe(correctResult)
            })
            test('Should get an array of the field and return the correct result | Test 2', () => {
                const startBoard = [
                    '...p....',
                    '...p....',
                    '...pp...',
                    '........',
                    '...##...',
                    '####...#',
                    '##.#####'
                ]

                const correctResult = '........\n...p....\n...p....\n...pp...\n...##...\n####...#\n##.#####'
                const newGame = new Game(startBoard)
                const finalBoard: string = newGame.startGame().toString().replaceAll(',', '\n')
                expect(finalBoard).toBe(correctResult)
            })
            test('Should get an array of the field and return the correct result | Test 3', () => {
                const startBoard = [
                    '..ppp...',
                    '...p....',
                    '........',
                    '......#.',
                    '......##',
                    '#.....##',
                    '#....###'
                ]

                const correctResult = '........\n........\n........\n......#.\n......##\n#.ppp.##\n#..p.###'
                const newGame = new Game(startBoard)
                const finalBoard: string = newGame.startGame().toString().replaceAll(',', '\n')
                expect(finalBoard).toBe(correctResult)
            })
        })
        describe('Static method findCoordinatesOfShape: ', () => {
            test('The method gets an array of fields, and determines the coordinates of the figure and landscape | Test 1', () => {
                const board = [
                    '..pp....',
                    '..pp....',
                    '........',
                    '........',
                    '...#....',
                    '...#...#',
                    '#..#####'
                ]
                const height = board.length
                const width = board[0].length
                const expectedCoordOfShape = [{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 3 }]
                const expectedCoordOfLandscape = [
                    { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 7 }, { x: 6, y: 0 },
                    { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 },
                    { x: 6, y: 7 },
                ]
                const [coordOfShape, coordOfLandscape] = Game.findCoordinatesOfShape(board, height, width)
                expect(coordOfShape).toEqual(expectedCoordOfShape)
                expect(coordOfLandscape).toEqual(expectedCoordOfLandscape)
            })
            test('The method gets an array of fields, and determines the coordinates of the figure and landscape | Test 2', () => {
                const board = [
                    '...p....',
                    '...p....',
                    '..pp....',
                    '.....##.',
                    '.....#..',
                    '.###.#.#',
                    '#..#####',
                    '####..##'
                ]
                const expectedCoordOfShape = [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
                const expectedCoordOfLandscape = [
                    { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 4, y: 5 }, { x: 5, y: 1 },
                    { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 7 },
                    { x: 6, y: 0 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 },
                    { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 7, y: 0 }, { x: 7, y: 1 },
                    { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 6 }, { x: 7, y: 7 },
                ]
                const height = board.length
                const width = board[0].length
                const [coordOfShape, coordOfLandscape] = Game.findCoordinatesOfShape(board, height, width)
                expect(coordOfShape).toEqual(expectedCoordOfShape)
                expect(coordOfLandscape).toEqual(expectedCoordOfLandscape)

            })
            test('The method gets an array of fields, and determines the coordinates of the figure and landscape | Test 3', () => {
                const board = [
                    '..p......',
                    '..p......',
                    '..p......',
                    '..p....#.',
                    '......##.',
                    '...#..###',
                    '#..#####.'
                ]
                const height = board.length
                const width = board[0].length
                const expectedCoordOfShape = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }]
                const expectedCoordOfLandscape = [
                    { x: 3, y: 7 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 5, y: 3 },
                    { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 6, y: 0 },
                    { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 },
                    { x: 6, y: 7 },
                ]
                const [coordOfShape, coordOfLandscape] = Game.findCoordinatesOfShape(board, height, width)
                expect(coordOfShape).toEqual(expectedCoordOfShape)
                expect(coordOfLandscape).toEqual(expectedCoordOfLandscape)
            })
        })
    })
    describe('class GameShape:', () => {
        describe('Method changeCoord: ', () => {
            test('The method must change the coordinates of the shape | Test 1', () => {
                const board = [
                    '..p......',
                    '..p......',
                    '..p......',
                    '..p....#.',
                    '......##.',
                    '...#..###',
                    '#..#####.'
                ]
                const height: number = board.length
                const width: number = board[0].length
                const expectedCoordOfShape = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }]
                const [coordOfShape, coordOfLandscape]: CoordObject[][] = Game.findCoordinatesOfShape(board, height, width)
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                shape.changeCoord()
                expect(shape.coordShape).toEqual(expectedCoordOfShape)
            })
            test('The method must change the coordinates of the shape | Test 2', () => {
                const board = [
                    '........',
                    '..pp....',
                    '..pp....',
                    '........',
                    '.#...###',
                    '##.#.#.#',
                    '#..#####',
                    '####..##'
                ]
                const height: number = board.length
                const width: number = board[0].length
                const expectedCoordOfShape = [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 3 }]
                const [coordOfShape, coordOfLandscape]: CoordObject[][] = Game.findCoordinatesOfShape(board, height, width)
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                shape.changeCoord()
                shape.changeCoord()
                expect(shape.coordShape).toEqual(expectedCoordOfShape)
            })
            test('The method must change the coordinates of the shape | Test 3', () => {
                const board = [
                    '...p....',
                    '...p....',
                    '...pp...',
                    '.....##.',
                    '.....#..',
                    '###..#.#',
                    '#....###',
                    '###...##'
                ]
                const height: number = board.length
                const width: number = board[0].length
                const expectedCoordOfShape = [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 6, y: 4 }]
                const [coordOfShape, coordOfLandscape]: CoordObject[][] = Game.findCoordinatesOfShape(board, height, width)
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                shape.changeCoord()
                shape.changeCoord()
                shape.changeCoord()
                shape.changeCoord()
                expect(shape.coordShape).toEqual(expectedCoordOfShape)
            })
        })
        describe('Method buildNewField: ', () => {
            test('The method should return the whole field according to the given coordinates of the figure and landscape | Test 1', () => {
                const height: number = 8
                const width: number = 8
                const expectedBoard = [
                    '........',
                    '........',
                    '..p.....',
                    '..p.....',
                    '..pp....',
                    '###....#',
                    '#....###',
                    '###...#.'
                ]
                const coordOfShape = [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 3 }]
                const coordOfLandscape = [
                    { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 7 },
                    { x: 6, y: 0 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 },
                    { x: 7, y: 0 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 6 },
                ]
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                expect(shape.buildNewField()).toEqual(expectedBoard)
            })
            test('The method should return the whole field according to the given coordinates of the figure and landscape | Test 2', () => {
                const height: number = 7
                const width: number = 8
                const expectedBoard = [
                    '........',
                    '........',
                    '...pp...',
                    '...pp.#.',
                    '......#.',
                    '###...##',
                    '###..###',
                ]
                const coordOfShape = [{ x: 2, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 3, y: 4 }]
                const coordOfLandscape = [
                    { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 0 }, { x: 5, y: 1 },
                    { x: 5, y: 2 }, { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 6, y: 0 },
                    { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 5 }, { x: 6, y: 6 },
                    { x: 6, y: 7 },
                ]
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                expect(shape.buildNewField()).toEqual(expectedBoard)
            })
            test('The method should return the whole field according to the given coordinates of the figure and landscape | Test 3', () => {
                const height: number = 8
                const width: number = 10
                const expectedBoard = [
                    '..........',
                    '..........',
                    '....p.....',
                    '....p.....',
                    '.#..p.....',
                    '.##.p...##',
                    '.###.....#',
                    '.##..#####'
                ]
                const coordOfShape = [{ x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }]
                const coordOfLandscape = [
                    { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 8 },
                    { x: 5, y: 9 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 },
                    { x: 6, y: 9 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 5 },
                    { x: 7, y: 6 }, { x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 },
                ]
                const shape: Shape<CoordObject> = new GameShape(coordOfShape, coordOfLandscape, height, width)
                expect(shape.buildNewField()).toEqual(expectedBoard)
            })
        })
    })

    describe('class FileHandler:', () => {
        describe('Static method checkCorrectParamsInput: ', () => {
            test('The method must return true if parameters are entered correctly, otherwise false | Test 1', () => {
                const paramsArr = ['incorrect_param_1', 'incorrect_param_2']
                expect(FileHandler.checkCorrectParamsInput(paramsArr)).toBe(false)
            })
            test('The method must return true if parameters are entered correctly, otherwise false | Test 2', () => {
                const paramsArr = ['', '',]
                expect(FileHandler.checkCorrectParamsInput(paramsArr)).toBe(false)
            })
            test('The method must return true if parameters are entered correctly, otherwise false | Test 3', () => {
                const paramsArr = ['7', '8']
                expect(FileHandler.checkCorrectParamsInput(paramsArr)).toBe(true)
            })
            test('The method must return true if parameters are entered correctly, otherwise false | Test 4', () => {
                const paramsArr = ['4', '5'] // params must be greater than 4
                expect(FileHandler.checkCorrectParamsInput(paramsArr)).toBe(false)
            })
        })
        describe('Static method checkCorrectFieldsInput: ', () => {
            test('The method should return true if the field dimensions match the specified prameters and contain valid characters, otherwise false | Test 1', () => {
                const height: number = 8
                const width: number = 10
                const field = [
                    '...p....',
                    '...p....',
                    '...p....',
                    '...p....',
                    '#...#.##',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkCorrectFieldsInput(field, height, width)).toBe(false)
            })
            test('The method should return true if the field dimensions match the specified prameters and contain valid characters, otherwise false | Test 2', () => {
                const height: number = 8
                const width: number = 10
                const field = [
                    '...p....',
                    '...p....',
                    '...p....',
                    '...p....',
                    '#...#.##',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkCorrectFieldsInput(field, height, width)).toBe(false)
            })
            test('The method should return true if the field dimensions match the specified prameters and contain valid characters, otherwise false | Test 3', () => {
                const height: number = 6
                const width: number = 8
                const field = [
                    '...p....',
                    '...p....',
                    '..pp....',
                    '........',
                    '#...#.##',
                    '###.#..#',
                ]
                expect(FileHandler.checkCorrectFieldsInput(field, height, width)).toBe(true)
            })
            test('The method should return true if the field dimensions match the specified prameters and contain valid characters, otherwise false | Test 4', () => {
                const height: number = 7
                const width: number = 8
                const field = [
                    '...p....',
                    '...p..*.',
                    '...p..S.',
                    '...p....',
                    '#...#.##',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkCorrectFieldsInput(field, height, width)).toBe(false)
            })
            test('The method should return true if the field dimensions match the specified prameters and contain valid characters, otherwise false | Test 5', () => {
                const height: number = 6
                const width: number = 8
                const field = [
                    '...p...',
                    '...p....',
                    '...p....',
                    '...p....',
                    '#...#.##',
                    '###.#..#',
                ]
                expect(FileHandler.checkCorrectFieldsInput(field, height, width)).toBe(false)
            })
        })
        describe('Static method checkPointPlacement: ', () => {
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 1', () => {
                const field = [
                    '...p....',
                    '...p....',
                    '...p....',
                    '...p....',
                    '#...#.##',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(true)
            })
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 2', () => {
                const field = [
                    '...p....',
                    '...p..#.',
                    '..pp..#.',
                    '........',
                    '#...#..#',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(false)
            })
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 3', () => {
                const field = [
                    '...p....',
                    '.ppp....',
                    '.p.p....',
                    '........',
                    '#...#..#',
                    '###.#..#',
                    '.##.##.#',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(false)
            })
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 4', () => {
                const field = [
                    '...p....',
                    '..ppp...',
                    '.......#',
                    '...#..#.',
                    '..#.#...',
                    '.#...#..',
                    '#.....#.',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(false)
            })
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 5', () => {
                const field = [
                    '........',
                    '..p.p...',
                    '.......p',
                    '..p..p..',
                    '##......',
                    '#....#..',
                    '#...###.',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(false)
            })
            test('The method checks whether the field is correctly placed and the correct shapes are entered | Test 6', () => {
                const field = [
                    '...p....',
                    '..ppp...',
                    '........',
                    '.#.#.#.#',
                    '#.#.#.#.',
                    '.#.#.#.#',
                    '#.#.#.#.',
                ]
                expect(FileHandler.checkPointPlacement(field)).toBe(false)
            })
        })
    })
})

