"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurante = void 0;
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
const restauranteSchema = new mongoose.Schema({
    razaosocial: {
        type: String,
        required: true
    },
    nomefantasia: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCNPJ,
            message: '{PATH}: CNPJ Invalido ({VALUE})'
        }
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: CPF Invalido ({VALUE})'
        }
    },
    fone: {
        type: String,
        required: true,
        match: /\(\d{2,}\) \d{4,}\-\d{4}/g
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
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
    cidade: {
        type: String
    },
    estado: {
        type: String
    },
    bairro: {
        type: String
    },
    senha: {
        type: String,
        required: true,
        select: false
    }
});
const hashSenha = (obj, next) => {
    bcrypt.hash(obj.senha, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.senha = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const restaurante = this;
    if (!restaurante.isModified('senha')) {
        next();
    }
    else {
        hashSenha(restaurante, next);
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
restauranteSchema.pre('save', saveMiddleware);
restauranteSchema.pre('findOneAndUpdate', updateMiddleware);
restauranteSchema.pre('update', updateMiddleware);
exports.Restaurante = mongoose.model('Restaurante', restauranteSchema);
