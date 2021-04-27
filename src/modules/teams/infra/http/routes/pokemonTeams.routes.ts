import { Router } from 'express';
import PokemonTeamsController from '../controllers/PokemonTeamsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pokemonTeamsRouter = Router();
const pokemonTeamsController = new PokemonTeamsController();

pokemonTeamsRouter.post('/', ensureAuthenticated, pokemonTeamsController.addPokemon);

pokemonTeamsRouter.get('/:id', ensureAuthenticated, pokemonTeamsController.findByTeam);

pokemonTeamsRouter.delete('/', ensureAuthenticated, pokemonTeamsController.removePokemon);



export default pokemonTeamsRouter;
