"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRouter = void 0;
const router_1 = require("../common/router");
const restify_errors_1 = require("restify-errors");
const usuario_model_1 = require("../models/usuario.model");
class UsuarioRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.senha = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/usuarios', (req, resp, next) => {
            usuario_model_1.Usuario.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.get('/usuarios/:id', (req, resp, next) => {
            usuario_model_1.Usuario.findById(req.params.id)
                .then(this.render(resp, next))
                .catch();
        });
        application.post('/usuarios', (req, resp, next) => {
            let usuario = new usuario_model_1.Usuario(req.body);
            usuario.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.put('/usuarios', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            usuario_model_1.Usuario.update({ _id: req.params.id }, req.body, options)
                .exec().then(resolve => {
                if (resolve.n) {
                    return usuario_model_1.Usuario.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Usuário não encontrado!');
                }
            }).then(this.render(resp, next))
                .catch(next);
        });
        application.patch('/usuarios/:id', (req, resp, next) => {
            const options = { runValidators: true, new: true };
            usuario_model_1.Usuario.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        application.del('/usuarios/:id', (req, resp, next) => {
            usuario_model_1.Usuario.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Usuário não encontrado!');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usuariosRouter = new UsuarioRouter();
