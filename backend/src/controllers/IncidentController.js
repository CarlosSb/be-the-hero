const db = require('../databases')

module.exports = {
  async index(request, response) {

    const {page = 1} = request.query
    const [count] = await db('incidents').count()

    const incidents = await db('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },

  async store(request, response) {
    const {title, description, value} = request.body;
    const ong_id = request.headers.authorization

    const [id] = await db('incidents').insert({
      title,
      description, 
      value,
      ong_id
    })
  
    return response.json({id})
  },

  async show (request, response) {
    const { id } = request.params
    const incidents = await db('incidents').where('id', id).select('*')
    return response.json(incidents)
  },

  async update(request, response) {
    const {id} = request.params
    const {title, description, value} = request.body;
  
    await db('incidents').where('id', id).update({
      title,
      description, 
      value
    })
  
    return response.json({ id, title, description, value })
  
  },

  async destroy(request, response) {
    const {id} = request.params
    const incidents = await db('incidents').where('id', id).del()
    return response.json(incidents)
  }
}