import * as mongoose from 'mongoose'

export interface MenuItem extends mongoose.Document {
    name: string,
    price: number
}

export interface Restaurante extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
})

export const Restaurante = mongoose.model<Restaurante>('Restaurante', restSchema)