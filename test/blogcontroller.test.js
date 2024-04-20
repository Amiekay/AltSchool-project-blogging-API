const supertest = require('supertest');
const app = require('../test/testApp')
const { connect } = require('./database');
const UserModel = require('../models/userModel');
const blogModel = require('../models/blogModel')
// Test suite
describe('Blog Route Tests', () => {
    let token;
    let connection;
    // before hook
    beforeAll(async () => {
        connection = await connect()

        const user = await UserModel.create({
            first_name: "Jerry",
            last_name: "Uke",
            password: "JU1",
            email: "jerry@gmail.com"
        })
      

        // login that user
        const response = await supertest(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: "jerry@gmail.com",
            password: "JU1"
        })

        // store the token in a global object
        token = response.body.token

    })

    afterAll(async () => {
        await connection.cleanup()
        await connection.disconnect()

    })

    // test case
    
    describe('POST/blogs', ()=>{

        it('should create a blog', async () => {
            const response = await supertest(app) .post('/blogs')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json')
            .send({title: 'Healthcares',
            description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
            body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
            tags: 'Healthcare'
         })
        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe('Healthcares')
        
    })

    it('should throw an error if not logged in - unauthenticated', async () => {
        const response = await supertest(app).post('/blogs')
        // .set('authorization', `Bearer ${token}`)
        .set('content-type', 'application/json')
        .send({title: 'GoodLife',
        description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
        body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
        tags: 'Healthcare'
     })
        expect(response.status).toEqual(401);
        expect(response.body).toMatchObject({ message: 'You are not authenticated!' });
    
    })
    

it('should throw an error - title has already been used', async () => {
 const res = await supertest(app).post('/blogs')
    .set('authorization', `Bearer ${token}`)
    .set('content-type', 'application/json')
    .send({title: 'Healthcares',
    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
    tags: 'Healthcare'
 })
    expect(res.status).toEqual(401);
})


it('should throw error for missing required fields- title is required)', async () => {
    const response = await supertest(app)
    .post('/blogs')
    .set('authorization', `Bearer ${token}`)
    .set('content-type', 'application/json')
    .send({
    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
    tags: 'Healthcare'
 })

    expect(response.status).toEqual(401);

})

    })
    
    describe('GET/blogs', ()=>{

        it('should return all blogs while logged in', async () => {
             const response = await supertest(app)
             .get('/blogs')
             .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json')
             
     
             expect(response.status).toEqual(200);
         })
         it('should return all blogs for not logged in users', async () => {
             const response = await supertest(app)
             .get('/blogs')
            //  .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json')
             
     
             expect(response.status).toEqual(200);
         })
    
        
    
    })
    describe('GET/blog', ()=>{
        it('should throw an error- invalid id', async () => {
        const post = await blogModel.create({
    title: 'Health',
    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
    tags: 'Healthcare'
        })
            const postId = post._id
    
             const response = await supertest(app)
             .get(`/blogs/${postId}`)
             .set('content-type', 'application/json') 
             
             

             expect(response.status).toEqual(404);
    
            })
    
            describe('GET/blog', ()=>{
                it('should throw an error because blog state is draft', async () => {
                const post = await blogModel.create({
            title: 'HealthTech',
            description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
            body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
            tags: 'Healthcare'
                })
                    const postId = post._id.toString()
            
                     const response = await supertest(app)
                     .get(`/blogs/${postId}`)
                     .set('content-type', 'application/json') 
                     
                     
        
                     expect(response.status).toEqual(404);
            
                    })
            
            
        
                
            })
    

        
    })
         
    describe('PUT/ Update blog', ()=>{
        it('should throw an error - unauthenticated', async () => {
        const post = await blogModel.create({
    title: 'HealthTechs',
    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
    tags: 'Healthcare'
        })
            const postId = post._id.toString()

             const response = await supertest(app)
             .put(`/blogs/${postId}`)
            //  .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json') 
             .send({state: 'published'})
             
        
             expect(response.status).toEqual(401);
            
        
    
    
            })
    
    

        
    })

    describe('PUT/ Update blog', ()=>{
        it('should throw an error - unauthenticated', async () => {
        const post = await blogModel.create({
    title: 'Healthy Living',
    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
    tags: 'Healthcare'
        })
            const postId = post._id.toString()

             const response = await supertest(app)
             .put(`/blogs/${postId}`)
             .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json') 
             
             console.log(post)
             console.log(response.body)

        
             expect(post.author._id).toEqual(post);
            
        
    
    
            })
    
    

        
    })



         

})

