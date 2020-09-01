import * as mongoose from 'mongoose'
import { environment } from '../common/environment'
import * as bcrypt from 'bcrypt'

export interface Usuario extends mongoose.Document {
    nome: string,
    email: string,
    genero: string,
    fone: string,
    rua: string,
    numero: string,
    complento: string,
    senha: string
}

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 120
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    genero: {
        enum: ['Masculino', 'Feminino']
    },
    fone: {
        type: String,
        required: true,
        match: /\(\d{2,}\) \d{4,}\-\d{4}/g
    },
    rua: {
        type: String
    },
    numero: {
        type: String
    },
    complemento: {
        type: String
    },
    senha: {
        type: String,
        required: true,
        minlength: 8
    }
})

// Middleware cryptografica de senha
const hashSenha = (obj, next) => {
    bcrypt.hash(obj.senha, environment.security.saltRounds)
    .then(hash => {
        obj.senha = hash
        next()
    }).catch(next)
}

const saveMiddleware = function(next) {
    const usuario: Usuario = this
    if(!this.isModified('senha')){
        next()
    } else {
        hashSenha(usuario.senha, next)
    }
}

const updateMiddleware = function(next) {
    if(!this.getUpdate().senha) {
        next()
    } else {
        hashSenha(this.getUpdate(), next)
    }
}

usuarioSchema.pre('save', saveMiddleware)
usuarioSchema.pre('findOneAndUpdate', updateMiddleware)
usuarioSchema.pre('update', updateMiddleware)

export const Usuario = mongoose.model<Usuario>('Usuario', usuarioSchema)