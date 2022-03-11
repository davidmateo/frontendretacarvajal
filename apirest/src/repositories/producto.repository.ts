import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbCarvajalDataSource} from '../datasources';
import {Producto, ProductoRelations} from '../models';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {
  constructor(
    @inject('datasources.DB_CARVAJAL') dataSource: DbCarvajalDataSource,
  ) {
    super(Producto, dataSource);
  }
}
