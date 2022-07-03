import config from 'config'
import request from 'supertest'
import app from '@App/server'
import { SERVER_STATUS_ENDPOINT } from '@App/constants/endpoint'

describe('Server', () => {
  describe('Server routes Endpoints', () => {
    it('should get status', async () => {
      const res = await request(app).get(SERVER_STATUS_ENDPOINT)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('status')
      expect(res.body.status).toEqual('server is running')
    })
  })

  describe('Server should have config', () => {
    it('Should have debugginglevel defined', () => {
      expect(config.has('loggingLevel')).toBe(true)
    }),

    it('Should have dbUri defined', () => {
      expect(config.has('dbUri')).toBe(true)
    })
  })
})
