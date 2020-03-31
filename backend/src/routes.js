const express = require('express')

const OngController = require('./controllers/OngController') 
const IncidentController = require('./controllers/IncidentController') 
const ProfileController = require('./controllers/ProfileController') 
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', SessionController.store)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);
routes.get('/ongs/:id', OngController.show);
routes.put('/ongs/:id', OngController.update);
routes.delete('/ongs/:id', OngController.destroy)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.get('/incidents/:id', IncidentController.show);
routes.put('/incidents/:id', IncidentController.update);
routes.delete('/incidents/:id', IncidentController.destroy)

module.exports = routes