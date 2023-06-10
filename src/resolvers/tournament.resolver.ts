import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { TournamentService } from '../services/tournament.service'
import { CreateTournamentInput, PaginatedTournamentResponse, Tournament, TournamentInput } from '../schema/tournament.schema'
import { UserRole } from '../enums/user-role'

@Resolver()
export class TournamentResolver {

  constructor(private tournamentService: TournamentService) {
    this.tournamentService = new TournamentService()
  }

  @Query(() => PaginatedTournamentResponse)
  async tournaments(@Args()paginatedInput: PaginationInput):Promise<PaginatedTournamentResponse> {
    return this.tournamentService.getTournaments(paginatedInput)
  }

  @Query(() => Tournament)
  async tournament(@Arg('_id') _id: string):Promise<Tournament> {
    return this.tournamentService.getTournament(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Tournament)
  async createTournament(@Arg('tournament') tournament: CreateTournamentInput):Promise<Tournament> {
    return this.tournamentService.createTournament(tournament)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Tournament)
  async deleteTournament(@Arg('_id') _id: string):Promise<Tournament> {
    return this.tournamentService.deleteTournament(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Tournament)
  async updateTournament(@Arg('_id') _id: string,
                   @Arg('tournament') tournament: TournamentInput):Promise<Tournament> {
    return this.tournamentService.updateTournament(_id, tournament)
  }

}
