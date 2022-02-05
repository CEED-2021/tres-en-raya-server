import Repository from "./repository.js";
import { match } from "../lib/utils.js";

const GAMES_FOLDER = './games/';

class GamesRepository extends Repository {

  constructor() {
    super();
    this.DATA_FOLDER = GAMES_FOLDER;
  }

  async getByPlayerId(playerId){
    await this.init();
    return this.data.filter( match('player', playerId) )
  }

  async game(gameId) {
    await this.init();
    return this.data.filter( match('id', gameId) )[0]
  }
}

const games = new GamesRepository();

export default games;
