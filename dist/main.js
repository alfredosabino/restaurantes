"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./app/server/server");
const usuario_router_1 = require("./app/routers/usuario.router");
const restaurante_router_1 = require("./app/routers/restaurante.router");
const server = new server_1.Server();
server.bootstrap([
    usuario_router_1.usuariosRouter,
    restaurante_router_1.restaurantesRouter
]).then(server => {
    console.log('Serviço iniciado na porta: ', server.application.address());
}).catch(error => {
    console.log('Falha ao iniciar o serviço!');
    console.log(error);
    process.exit(1);
});
