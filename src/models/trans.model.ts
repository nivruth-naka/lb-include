import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Main} from './main.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'trans'}, hiddenProperties: ['mainId']}
})
export class Trans extends Entity {
  @property({
    type: 'number',
    required: true,
    hidden: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'segment', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  segment?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'subsegment', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  subsegment?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'cdnratebasis', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  cdnRateBasis?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'usratebasis', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  usRateBasis?: string;

  @belongsTo(() => Main)
  mainId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trans>) {
    super(data);
  }
}

export interface TransRelations {
  // describe navigational properties here
}

export type TransWithRelations = Trans & TransRelations;
