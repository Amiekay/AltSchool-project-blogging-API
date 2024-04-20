const supertest = require('supertest');
const app = require('./testApp');
const { connect } = require('./database');
const UserModel = require('../models/userModel');

// Test suite
describe('Authentication Tests', () => {
    let connection;
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })


    // Test case
    it('should successfully signup a user', async () => {
        const response = await supertest(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        
        })

        // expectations
        expect(response.status).toEqual(200);
        
    })

    it('should throw an errow for bad request - wrong spelling', async () => {
        const response = await supertest(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            firstname: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        
        })

        // expectations
        expect(response.status).toEqual(400);
        
    })


    it('should throw an errow for missing fields that are required - email', async () => {
        const response = await supertest(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
        
        })

        // expectations
        expect(response.status).toEqual(400);
        
    })
    it('should throw an error when user already exist', async () => {
        await supertest(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        
        })
        const res = await supertest(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        
        })

        // expectations
        expect(res.status).toEqual(409);
        expect(res.body).toMatchObject({message: 'user already created'});

        
    })

    // Test case
    it('should successfully login a user', async () => {
        await UserModel.create({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        });

        const response = await supertest(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: "jerry@gmail.com",
            password: "JU1"
        })

        // expectations
        expect(response.status).toEqual(200);

        
    })

    it('should not successfully login a user, when user does not exist', async () => {
        await UserModel.create({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com",
        });

        const response = await supertest(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: "jerry@example.com",
            password: "JU1"
        })

        // expectations
        expect(response.status).toEqual(401);
        expect(response.body).toMatchObject({
            message: 'Unauthorized, please signup',
        })
    })



it('should not successfully login a user, when user exists but password is incorrect', async () => {
    await UserModel.create({
        first_name: "Jerry",
        last_name: "Uke",
        password: "JU1",
        email: "jerry@gmail.com",
    });

    const response = await supertest(app)
    .post('/login')
    .set('content-type', 'application/json')
    .send({
        email: "jerry@gmail.com",
        password: "JU2222"
    })

    // expectations
    expect(response.status).toEqual(422);
    expect(response.body).toMatchObject({
        message: 'Email or password is not correct',
    })
})

})