import { PaginationInput } from '../schema/pagination.schema'

type paginationOptions = {
  model: any
  populate?: string | string[]
  filter?: any
}

export class PaginationService<T> {
  private paginationOptions: paginationOptions

  constructor(paginationOptions: paginationOptions) {
    this.paginationOptions = paginationOptions
  }

  async getPaginatedItems({ page, limit }: PaginationInput) {
    const skip = (page - 1) * limit
    const { model, populate = '', filter = {} } = this.paginationOptions
    let query = model.find(filter).skip(skip).limit(limit)

    if (Array.isArray(populate)) {
      for (const field of populate) {
        query = query.populate(field)
      }
    } else if (typeof populate === 'string') {
      query = query.populate(populate)
    }

    const [items, totalItems] = await Promise.all([
      query.lean(),
      model.countDocuments(filter),
    ])
    const totalPages = Math.ceil(totalItems / limit)

    return {
      page,
      totalPages,
      totalItems,
      items,
    }
  }
}