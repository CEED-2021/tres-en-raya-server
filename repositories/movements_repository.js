import Repository from "./repository.js";

const MOVEMENTS_FOLDER = './movements/';

class MovementsRepository extends Repository {

  constructor() {
    super();
    this.DATA_FOLDER = GAMES_FOLDER;
  }

  async movements() {
    await this.init();
    return this.data
  }
}

const movements = new MovementsRepository();

export default movements;
