// import fs from 'fs'
import { promises as fs } from "fs";
import path from 'path'
import url from 'url'

class Repository {

  constructor(){
    this.initialized = false;
  }

  async init() {
    if(this.initialized) return;

    await this.#loadGames()
    this.initialized = true;
  }

  async #loadGames() {
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
    const dataDir = path.resolve(__dirname, this.DATA_FOLDER)

    const files = (await fs.readdir(dataDir)).filter(fn => fn.endsWith('.json'));

    const data = await Promise.all(files.map( async file => {
        const filePath = path.resolve(dataDir, file)
        let rawdata = await fs.readFile(filePath);
        return JSON.parse(rawdata);
      })
    )

    this.data = data
  }
}

export default Repository;
