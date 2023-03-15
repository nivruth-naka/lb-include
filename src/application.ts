import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {LbIncludeDatasource} from './datasources';
import {MySequence} from './sequence';

export {
  ApplicationConfig
};

export class LbIncludeApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication)),) {
  constructor(options : ApplicationConfig = {}) {
    super(options);

    var dbcert = process.env.DB_CERT;
    let ca = '';
    // console.log('DB_CERT: ', dbcert);
    if (dbcert) { // @ts-ignore
      ca = Buffer.from(dbcert, 'base64');
      // console.log('ca: ', ca);
    }

    this.bind('datasources.config.lbInclude').to({
      name: 'sov_gen_pg',
      connector: 'postgresql',
      url: process.env.DB_CONNECTION_STRING,
      ssl: {
        ca,
        rejectUnauthorized: false
      }
    });
    this.bind('datasources.lbInclude').toClass(LbIncludeDatasource);

    // Set up the custom sequence
    this.sequence(MySequence);

    if (process.env.NODE_ENV !== 'prod') { // Set up default home page
      this.static('/', path.join(__dirname, '../public'));

      // Customize @loopback/rest-explorer configuration here
      this.configure(RestExplorerBindings.COMPONENT).to({path: '/explorer'});
      this.component(RestExplorerComponent);
    }

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: { // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    };
  }
}
