import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { Usuario } from './usuarios.model'

class UsuariosRouter extends ModelRouter<Usuario> {
    constructor(){
        super(Usuario)
        this.on('beforeRender', document => {
            document.senha = undefined
        })
    }

    applyRoutes(application: restify.Server){
        application.get('/usuarios', this.findAll)
        application.get('/usuarios/:id', [this.validateId, this.findById])
        application.post('/usuarios', this.save)
        application.put('/usuarios/:id', [this.validateId, this.replace])
        application.patch('/usuarios/:id', [this.validateId, this.update])
        application.del('/usuarios/:id', [this.validateId, this.delete])
    }
}

export const usuariosRouter = new UsuariosRouter()