import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Main} from '../models';
import {MainRepository} from '../repositories';
import {performance} from 'perf_hooks';

export class LbIncludeController {
  constructor(
    @repository(MainRepository)
    protected mainRepository: MainRepository,
  ) { }

  @get('/guides', {
    responses: {
      '200': {
        description: 'Array of Main model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Main, {includeRelations: true})
            }
          }
        }
      }
    }
  })
  async find(
    @param.query.string('locale') locale: string,
    @param.filter(Main) filter?: Filter<Main>,
  ): Promise<Main[]> {
    const r = performance.now();
    // adds `trans` relation to filter, if not passed in request
    let scopeIncluded = null;
    if (filter) {
      if (filter.include) {
        scopeIncluded = filter.include.find(e => e.hasOwnProperty('scope'));
        const transIncluded = filter.include.find(e =>
          e.hasOwnProperty('relation') &&
          new Map(Object.entries(e)).get('relation') == 'trans'
        );
        if (!transIncluded) {
          filter.include.push({
            relation: 'trans'
          });
        }
      } else {
        filter.include = [
          {
            relation: 'trans'
          }
        ];
      }
    } else {
      filter = {
        include: [
          {
            relation: 'trans'
          }
        ]
      };
    }
    const q = performance.now();
    let response = await this.mainRepository.find(filter);
    console.log(`Query took ${performance.now() - q} ms`);
    response = response.map(e => {
      // parses dates, ex: `2021-12-02T00:00:00.000Z` -> `2021-12-02`
      if (e.effectiveDate) {
        e.effectiveDate = new Date(e.effectiveDate).toISOString().split('T')[0];
      }
      if (e.expiryDate) {
        e.expiryDate = new Date(e.expiryDate).toISOString().split('T')[0];
      }
      if (e.trans && locale) {
        // filters `trans` object to only include requested `locale` values
        if (e.trans.segment) {
          e.trans.segment = e.trans.segment.hasOwnProperty(locale) ?
            new Map(Object.entries(e.trans.segment)).get(locale) : null as any;
        }
        if (e.trans.subsegment) {
          e.trans.subsegment = e.trans.subsegment.hasOwnProperty(locale) ?
            new Map(Object.entries(e.trans.subsegment)).get(locale) :
            null as any;
        }
        if (e.trans.cdnRateBasis) {
          e.trans.cdnRateBasis = e.trans.cdnRateBasis.hasOwnProperty(locale) ?
            new Map(Object.entries(e.trans.cdnRateBasis)).get(locale) :
            null as any;
        }
        if (e.trans.usRateBasis) {
          e.trans.usRateBasis = e.trans.usRateBasis.hasOwnProperty(locale) ?
            new Map(Object.entries(e.trans.usRateBasis)).get(locale) :
            null as any;
        }
      }
      return e;
    });
    /** filters response to only include entries with `trans` object,
     * assuming each each entry MUST have a corresponding `trans` object &
     * that's missing because of `scope` passed in the request.
     * this filtering is done here as LoopBack 4 at the time of implementation
     * doesn't support querying nested relational data. **/
    if (scopeIncluded) {
      response = response.reduce((acc, curr) => {
        if (curr.trans) {
          acc.push(curr);
        }
        return acc;
      },
        [] as any[]);
    }
    console.log(`Response took ${performance.now() - r} ms`);
    return response;
  }

}
