import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'
import { IsDate, MaxLength } from 'class-validator'
import { Country } from './country.schema'
import { Types } from 'mongoose'
import { ObjectIdScalar } from '../object-id.scalar'
import { TerrainType } from '../enums/terrain-type'

registerEnumType(TerrainType, {
  name: 'TerrainType',
})
@ObjectType()
export class Tournament extends BaseModel {

    @Prop({ required: true })
    @Field()
      name: string

    @Prop({ type: [String], enum: TerrainType })
    @Field(() => [TerrainType])
     terrain: TerrainType[]

    @Field(() => Date)
    @Prop({ required: true })
      tournamentDate: Date

    @Prop({ required: true })
    @Field()
      financialCommitment: number

    @Prop({ required: true })
    @Field()
      points: number

    @Field(() => Country)
    @Prop({ ref: Country, required: true })
      country: Ref<Country, Types.ObjectId>

}

export const TournamentModel = getModelForClass(Tournament,
  { schemaOptions: { timestamps: true },
  })

  @InputType()
  export class TournamentInput {

      @Field()
      @MaxLength(30)
      name: string

      @IsDate()
      @Field(() => Date)
      tournamentDate: Date

      @Field()
      financialCommitment: number

  }
  
  @InputType()
  export class CreateTournamentInput extends TournamentInput {

    @Field(() => [TerrainType])
    terrain: TerrainType

    @Field()
      points: number

    @Field(() => ObjectIdScalar)
    country:Ref<Country, Types.ObjectId>

  }


  @ObjectType()
  export class PaginatedTournamentResponse extends PaginatedResponse(Tournament){}