import { MongoClient } from 'mongodb'

class SandORM {
  constructor() {
    this._connection = null
    this._client = null
    this.waiting = []
  }
  async connect(uri = 'mongodb://localhost:27017/SandORM', clientOptions = {}) {
    if (this._connection) {
      console.warn('DB already connected, recycling the connection')
      return this._connection
    }
    this._connection = new Promise(async (resolve, reject) => {
      try {
        this._client = new MongoClient(uri, clientOptions)
        const output = await this._client.connect()
        resolve(output)
        this.waiting.forEach(([resolve]) => {
          resolve(output)
        })
      } catch (error) {
        await this._client.close()
        this._client = null
        reject(error)
        this.waiting.forEach(([resolve, reject]) => {
          reject(error)
        })
      }
    })
  }
  awaitConnection() {
    return new Promise((resolve, reject) => {
      this._waiting.push([resolve, reject])
    })
  }

  async disconnect() {
    await this._client.close()
    this._connection = null
    this._client = null
  }
}

const globalORM = new SandORM()

export default globalORM
