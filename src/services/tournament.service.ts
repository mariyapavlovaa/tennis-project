import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { Types } from 'mongoose'
import { CreateTournamentInput, TournamentInput, TournamentModel } from '../schema/tournament.schema'

export class TournamentService {
  async getTournaments(paginatedInput: PaginationInput) {
    const tournamentPaginationServices =
        new PaginationService(
          {
            model: TournamentModel,
            populate: 'country',
          })
    return tournamentPaginationServices.getPaginatedItems(paginatedInput)
  }

  async getTournament(_id: string) {
    return TournamentModel.findById(_id).populate('country').lean()
  }

  async createTournament(tournament: CreateTournamentInput) {
    const createdTournament = await TournamentModel.create(tournament)
    return createdTournament.populate('country')
  }

  async deleteTournament(_id: string) {
    return TournamentModel.findByIdAndRemove(_id).populate('country')
  }

  async updateTournament(_id: string, tournament: TournamentInput) {
    return TournamentModel.findByIdAndUpdate(_id, tournament, { new: true }).populate('country')
  }

}