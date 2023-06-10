import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { BaseCountryInput, CountryModel, CreateCountryInput } from '../schema/country.schema'

export class CountryService {
  async getCountries(paginatedInput: PaginationInput) {
    const countryPaginationServices =
        new PaginationService({ model:  CountryModel })
    return countryPaginationServices.getPaginatedItems(paginatedInput)
  }

  async getCountry(_id: string) {
    return CountryModel.findById(_id).lean()
  }

  async createCountry(country: CreateCountryInput) {
    return CountryModel.create(country)
  }

  async deleteCountry(_id: string) {
    return CountryModel.findByIdAndRemove(_id)
  }

  async updateCountry(_id: string, country: BaseCountryInput) {
    return CountryModel.findByIdAndUpdate(_id, country, { new: true })
  }

}