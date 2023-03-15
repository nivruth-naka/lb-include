import {inject} from '@loopback/core';
import {LbIncludeDatasource} from '../datasources';
import {Trans, TransRelations} from '../models';
import {SequelizeCrudRepository} from '@loopback/sequelize';

export class TransRepository extends SequelizeCrudRepository<
  Trans,
  typeof Trans.prototype.id,
  TransRelations
> {
  constructor(
    @inject('datasources.lbInclude') dataSource: LbIncludeDatasource,
  ) {
    super(Trans, dataSource);
  }
}
