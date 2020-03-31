const cripto = require('crypto')
const db = require('../databases')

module.exports = {

  async index(request, response) {
    const ongs = await db('ongs').select('*')
    return response.json(ongs)
  },

  async show (request, response) {
    const { id } = request.params
    const ongs = await db('ongs').where('id', id).select('*')
    return response.json(ongs)
  },

  async store(request, response) {
    const {name, email, whatsapp, city, uf} = request.body;
    const id = cripto.randomBytes(4).toString('HEX')
  
    await db('ongs').insert({
      id,
      name, 
      email, 
      whatsapp, 
      city, 
      uf
    })
  
    return response.json({id})
  },

  async update(request, response) {
    const {id} = request.params
    const {name, email, whatsapp, city, uf} = request.body
  
    await db('ongs').where('id', id).update({
      name, 
      email, 
      whatsapp, 
      city, 
      uf
    })
  
    return response.json({ id, name, email, whatsapp, city, uf })
  
  },

  async destroy(request, response) {
    const {id} = request.params
    const ongs = await db('ongs').where('id', id).del()
    return response.json(ongs)
  }
}