const db = require('../databases')

module.exports = {
  async store(request, response) {

    const {id} = request.body

    const ong = await db('ongs')
      .where('id', id)
      .select('name')
      .first()

    if(!ong) {
      return response.status(400).json({error: "No ONG foud with thr ID"})
    }

    return response.json(ong)
  }
}