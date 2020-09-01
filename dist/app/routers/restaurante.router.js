"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantesRouter = void 0;
const router_1 = require("../common/router");
const restify_errors_1 = require("restify-errors");
const restaurante_model_1 = require("../models/restaurante.model");
class RestauranteRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/restaurantes', (req, resp, next) => {
            restaurante_model_1.Restaurante.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.get('/restaurantes/:id', (req, resp, next) => {
            restaurante_model_1.Restaurante.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        application.post('/restaurantes', (req, resp, next) => {
            let restaurante = new restaurante_model_1.Restaurante(req.body);
            restaurante.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.put('/restaurantes/:id', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            restaurante_model_1.Restaurante.update({ _id: req.params.id }, req.body, options)
                .exec().then(resolve => {
                if (resolve.n) {
                    return restaurante_model_1.Restaurante.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado!');
                }
            }).then(this.render(resp, next))
                .catch(next);
        });
        application.patch('/restaurantes/:id', (req, resp, next) => {
            const options = { runValidators: true, new: true };
            restaurante_model_1.Restaurante.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        application.del('/restaurantes/:id', (req, resp, next) => {
            restaurante_model_1.Restaurante.remove({ _id: req.params.id })
                .exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado!');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.restaurantesRouter = new RestauranteRouter();
