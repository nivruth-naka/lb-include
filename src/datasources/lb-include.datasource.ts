import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {SequelizeDataSource} from '@loopback/sequelize';

const config = {
  name: 'lbInclude',
  connector: 'postgresql',
  host: 'DB1SQLD01',
  port: 5432,
  user: 'user',
  password: 'secret',
  database: 'postgres',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LbIncludeDatasource extends SequelizeDataSource
  implements LifeCycleObserver {
  static dataSourceName = 'lbInclude';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.lbInclude', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
