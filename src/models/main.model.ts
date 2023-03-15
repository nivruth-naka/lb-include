import {Entity, hasOne, model, property} from '@loopback/repository';
import {Trans, TransWithRelations} from '.';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'main'}}
})
export class Main extends Entity {
  @property({
    primaryKey: true,
    type: 'number',
    required: true,
    hidden: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'code', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  code: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'grade', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  grade?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'ebmethod', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  ebMethod?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'cdnper', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  cdnPer?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'usper', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  usPer?: number;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'mandatory', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  mandatory?: boolean;

  @property({
    type: 'date',
    postgresql: {columnName: 'effectivedate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  effectiveDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'expirydate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  expiryDate?: string;

  @hasOne(() => Trans, {keyTo: 'mainId'})
  trans?: Trans;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Main>) {
    super(data);
  }
}

export interface MainRelations {
  // describe navigational properties here
  trans?: TransWithRelations;
}

export type MainWithRelations = Main & MainRelations;
