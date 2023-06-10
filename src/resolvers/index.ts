import { UserResolver } from './user.resolver'
import { CountryResolver } from './country.resolver'
import { TournamentResolver } from './tournament.resolver'
export const resolvers = [
  UserResolver,
  CountryResolver,
  TournamentResolver,
] as const