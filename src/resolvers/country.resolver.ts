import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { CountryService } from '../services/country.service'
import { BaseCountryInput, Country, CreateCountryInput, PaginatedCountryResponse } from '../schema/country.schema'
import { UserRole } from '../enums/user-role'

@Resolver()
export class CountryResolver {

  constructor(private countryService: CountryService) {
    this.countryService = new CountryService()
  }

  @Query(() => PaginatedCountryResponse)
  async countries(@Args()paginatedInput: PaginationInput):Promise<PaginatedCountryResponse> {
    return this.countryService.getCountries(paginatedInput)
  }

  @Query(() => Country)
    async country(@Arg('_id') _id: string):Promise<Country> {
      return this.countryService.getCountry(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Country)
  async createCountry(@Arg('country') country: CreateCountryInput):Promise<Country> {
    return this.countryService.createCountry(country)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Country)
  async deleteCountry(@Arg('_id') _id: string):Promise<Country> {
    return this.countryService.deleteCountry(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Country)
  async updateCountry(@Arg('_id') _id: string,
                   @Arg('country') country: BaseCountryInput):Promise<Country> {
    return this.countryService.updateCountry(_id, country)
  }

}