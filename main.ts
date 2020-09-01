import { Server } from './app/server/server'
import { usuariosRouter } from './app/usuarios/usuarios.router'
import { restaurantesRouter} from './app/restaurantes/restaurante.router'

const server = new Server()

server.bootstrap(
    [
        usuariosRouter,
        restaurantesRouter
    ]
).then(
    server => {
        console.log('Serviço iniciado na porta: ', server.application.address())
    }
).catch(
    error => {
        console.log('Falha ao iniciar o serviço!')
        console.log(error)
        process.exit(1)
    }
)