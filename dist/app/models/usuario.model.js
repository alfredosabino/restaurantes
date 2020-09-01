"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const bcrypt = require("bcrypt");
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
});
// Middleware cryptografica de senha
const hashSenha = (obj, next) => {
    bcrypt.hash(obj.senha, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.senha = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const usuario = this;
    if (!this.isModified('senha')) {
        next();
    }
    else {
        hashSenha(usuario.senha, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().senha) {
        next();
    }
    else {
        hashSenha(this.getUpdate(), next);
    }
};
usuarioSchema.pre('save', saveMiddleware);
usuarioSchema.pre('findOneAndUpdate', updateMiddleware);
usuarioSchema.pre('update', updateMiddleware);
exports.Usuario = mongoose.model('Usuario', usuarioSchema);
