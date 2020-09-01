"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos = void 0;
const mongoose = require("mongoose");
const pedidosSchemas = new mongoose.Schema({});
exports.Pedidos = mongoose.model('Pedidos', pedidosSchemas);
