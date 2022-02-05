import Repository from "./repository.js";
import { match } from "../lib/utils.js";

const PLAYERS_FOLDER = './players/';

class PlayersRepository extends Repository {

  constructor() {
    super();
    this.DATA_FOLDER = PLAYERS_FOLDER;
  }

  async searchByUsername(username) {
    await this.init();
    return this.data.filter( match('username', username) )[0]
  }

  async player(id) {
    await this.init();
    return this.data.filter( match('id', id) )[0]
  }
}

const players = new PlayersRepository();

export default players;
