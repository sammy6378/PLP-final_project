
import { getAllPatient,getPatient,createNewPatient,deletePatientById,updatePatientN } from './patient.controller'
import { zValidator } from '@hono/zod-validator'

import { Hono } from 'hono'
import { registerPatientSchema } from '../validators'
import { adminRoleAuth, bothAuth } from '../middleware/auth'
import { togglePatientStatus } from './patient.controller'



export const patientRouter = new Hono()

patientRouter.get('/patients',bothAuth,  getAllPatient)
patientRouter.get('/patient/:id', getPatient)
patientRouter.post('/create-patient',zValidator('json', registerPatientSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
 }),createNewPatient)
patientRouter.put('/patient/:id', updatePatientN)
patientRouter.delete('/patient/:id', deletePatientById)
patientRouter.put('/toggle-status', togglePatientStatus)
