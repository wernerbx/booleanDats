import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Torre, TorreRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id_torre,
  TorreRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Torre.prototype.id_torre>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Torre, dataSource);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
