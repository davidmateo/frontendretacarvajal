import {
  Count,
  CountSchema, FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Carrito} from '../models';
import {CarritoRepository} from '../repositories';
export class CarritoController {
  constructor(
    @repository(CarritoRepository)
    public CarritoRepository: CarritoRepository,
  ) { }

  @post('/carritos')
  @response(200, {
    description: 'Carrito model instance',
    content: {'application/json': {schema: getModelSchemaRef(Carrito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {
            title: 'NewCarrito',
            exclude: ['id'],
          }),
        },
      },
    })
    Carrito: Omit<Carrito, 'id'>,
  ): Promise<Carrito> {
    return this.CarritoRepository.create(Carrito);
  }

  @get('/carritos/count')
  @response(200, {
    description: 'Carrito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Carrito) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.CarritoRepository.count(where);
  }

  @get('/micarrito/{usuario}')
  @response(200, {
    description: 'Array of Carrito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Carrito, {includeRelations: true}),
        },
      },
    },
  })
  async find
    (
      @param.path.string('usuario') usuario: string,
  ): Promise<Carrito[]> {
    return this.CarritoRepository.find({include: [{relation: 'idProductofk'}], where: {idUsuario: usuario}});
  }

  @patch('/Carritos')
  @response(200, {
    description: 'Carrito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    Carrito: Carrito,
    @param.where(Carrito) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.CarritoRepository.updateAll(Carrito, where);
  }

  @get('/Carritos/{id}')
  @response(200, {
    description: 'Carrito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Carrito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Carrito, {exclude: 'where'}) filter?: FilterExcludingWhere<Carrito>
  ): Promise<Carrito> {
    return this.CarritoRepository.findById(id, filter);
  }

  @patch('/Carritos/{id}')
  @response(204, {
    description: 'Carrito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    Carrito: Carrito,
  ): Promise<void> {
    await this.CarritoRepository.updateById(id, Carrito);
  }

  @put('/Carritos/{id}')
  @response(204, {
    description: 'Carrito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() Carrito: Carrito,
  ): Promise<void> {
    await this.CarritoRepository.replaceById(id, Carrito);
  }

  @del('/Carritos/{id}')
  @response(204, {
    description: 'Carrito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.CarritoRepository.deleteById(id);
  }
}
