import Team from '../infra/typeorm/entities/Team';
import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';
import IAddPokemonDTO from '../dtos/IAddPokemonDTO';
import IRemovePokemonDTO from '../dtos/IRemovePokemonDTO';

export default interface IPokemonTeamRepository {
	addPokemon(data: IAddPokemonDTO): Promise<PokemonTeam>;
	removePokemon(data: IRemovePokemonDTO): Promise<void>;
    findByTeam(team_id: string): Promise<{pokemons_team: PokemonTeam[], count: number}>
}