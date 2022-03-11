import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Producto} from './producto.model';
import {Usuario} from './usuario.model';

@model({settings: {strict: false}})
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;
  @belongsTo(() => Producto, {name: 'idProductofk'})
  idProducto: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}
export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
