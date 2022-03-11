import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbCarvajalDataSource} from '../datasources';
import {Carrito, CarritoRelations} from '../models';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.id,
  CarritoRelations
> {
  constructor(
    @inject('datasources.DB_CARVAJAL') dataSource: DbCarvajalDataSource,
  ) {
    super(Carrito, dataSource);
  }
}
