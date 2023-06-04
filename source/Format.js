import SandORM from './SandORM'
import { details } from 'sandhands'

class Format {
  constructor(...args) {
    if (args.length < 1) throw new Error('Expected a format')
    if (args.length > 1) throw new Error('Got too many arguments, expected 1 format')
    this._format = args[0]
    this.connection = SandORM.awaitConnection()
  }
  async save(data) {
    const error = details(data, this._format)
    throw error
  }
  async load(query) {
    const data = null
    const error = details(data, this._format)
  }
}

export default Format
