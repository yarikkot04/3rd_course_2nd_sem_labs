import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolver.js'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const schemaFilePath = resolve(__dirname, 'schema.graphql')

const typeDefs = readFileSync(schemaFilePath, 'utf-8')

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
