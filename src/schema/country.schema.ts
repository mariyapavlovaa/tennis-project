import { Field, InputType, ObjectType } from 'type-graphql'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import { MaxLength } from 'class-validator'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'

@ObjectType()
export class Country extends BaseModel {

    @Prop({ required: true })
    @Field()
      name: string

    @Prop({ required: true })
    @Field()
      capital: string

    @Prop({ required: true })
    @Field()
      officialLanguage: string

    @Prop({ required: true })
    @Field()
      population: number

    @Prop()
    @Field({ nullable:true })
      motto?:string

}

export const CountryModel = getModelForClass(Country,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class BaseCountryInput {

  @Field()
  @MaxLength(100)
   name: string

  @Field()
  @MaxLength(50)
   capital: string

  @Field()
  @MaxLength(30)
   officialLanguage: string

  @Field()
  population: number
  
}

@InputType()
export class CreateCountryInput extends BaseCountryInput {
    @Field({ nullable:true })
    motto?:string
}

@ObjectType()
export class PaginatedCountryResponse extends PaginatedResponse(Country){}
