import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LbIncludeDatasource} from '../datasources';
import {Trans, TransRelations} from '../models';

export class TransRepository extends DefaultCrudRepository<
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
