import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {TransRepository} from '.';
import {LbIncludeDatasource} from '../datasources';
import {Main, MainRelations, Trans} from '../models';

export class MainRepository extends DefaultCrudRepository<
  Main,
  typeof Main.prototype.id,
  MainRelations
> {
  public readonly trans: HasOneRepositoryFactory<
    Trans,
    typeof Main.prototype.id
  >;
  constructor(
    @inject('datasources.lbInclude') dataSource: LbIncludeDatasource,
    @repository.getter('TransRepository')
    protected transRepositoryGetter: Getter<TransRepository>,
  ) {
    super(Main, dataSource);
    this.trans = this.createHasOneRepositoryFactoryFor(
      'trans',
      transRepositoryGetter,
    );
    this.registerInclusionResolver('trans', this.trans.inclusionResolver);
  }
}
