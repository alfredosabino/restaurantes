import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { Restaurante } from './restaurante.model'

class RestaurantesRouter extends ModelRouter<Restaurante> {
    constructor(){
        super(Restaurante)
    }
    
    applyRoutes(application: restify.Server){

        application.get('/restaurantes', this.findAll)
        application.get('/restaurantes/:id', [this.validateId, this.findById])
        application.post('/restaurantes', this.save)
        application.put('/restaurantes/:id', [this.validateId, this.replace])
        application.patch('/restaurantes/:id', [this.validateId, this.update])
        application.del('/restaurantes/:id', [this.validateId, this.delete])

    }
}

export const restaurantesRouter = new RestaurantesRouter()