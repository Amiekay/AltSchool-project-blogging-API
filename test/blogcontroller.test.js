const supertest = require('supertest');
const app = require('../test/testApp')
const { connect } = require('./database');
const UserModel = require('../models/userModel');
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
         
    })
    describe('GET/blogs', ()=>{

        it('should return all blogs while not logged in', async () => {
             const response = await supertest(app)
             .get('/blogs')
            //  .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json')
     
             expect(response.status).toEqual(200);
         })
        
    
    })
    describe('GET/blogs', ()=>{

        it('should return all blogs created by the user', async () => {
             const response = await supertest(app)
             .post('/blogs')
             .set('authorization', `Bearer ${token}`)
             .set('content-type', 'application/json')
             .send({title: 'Healthyy Life',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'})




                    const userId = response.body.data.author._id

            
                     const res = await supertest(app)
                     .get(`/blogs/myPosts/${userId}`)
                    .set('authorization', `Bearer ${token}`)

                     
     
             expect(res.status).toEqual(200);
         })
         
    })
    
            describe('GET/blog', ()=>{
                it('should successfuly return a blog', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Healthy living',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare',
                    state: "published"
                 })



                    const postId = response.body.data._id

            
                     const res = await supertest(app)
                     .get(`/blogs/${postId}`)
                     
                     
        
                     expect(res.status).toEqual(200);
            
                    })
            
            
        
                
            })
    

        


    describe('GET/blog', ()=>{
        it('should throw an error- invalid id, post not found', async () => {
            const response = await supertest(app) .post('/blogs')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json')
            .send({title: 'Healthy lifestyle',
            description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
            body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
            tags: 'Healthcare'
         })



            const postId = response.body.data.author._id

    
             const res = await supertest(app)
             .get(`/blogs/${postId}`)
             
             

             expect(res.status).toEqual(404);
    
            })
    
    

        
    })


    describe('GET/blog', ()=>{
        it('should throw an error- blogs are in draft state', async () => {
            const response = await supertest(app) .post('/blogs')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json')
            .send({title: 'Health and  lifestyle',
            description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
            body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
            tags: 'Healthcare'
         })



            const postId = response.body.data._id

    
             const res = await supertest(app)
             .get(`/blogs/${postId}`)
             
             

             expect(res.status).toEqual(404);
    
            })
    
    

        
    })

    describe('PUT/ Update blog', ()=>{
                it('should throw an error - unauthenticated', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Vitality',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .put(`/blogs/${postId}`)
             
                
                     expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
        
            describe('PUT/ Update blog', ()=>{
                it('should not update bolg created by another user', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Great Health and Vitality',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .put(`/blogs/${postId}`)
             .send({state: 'published'})

             
                
             expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
            describe('PUT/ Update blog', ()=>{
                it('should successfully update blog', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Good Health',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                   


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .put(`/blogs/${postId}`)
             .set('authorization', `Bearer ${token}`)

             .send({state: 'published'})

             
                
             expect(res.status).toEqual(200);
                    
                
            
            
                    })
            
            
        
                
            })
            describe('PATCH/ Edit a blog', ()=>{
                it('should throw an error - unauthenticated', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Vitalityy',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .patch(`/blogs/${postId}`)
             .send({body: 'smokers are liable to die young'})

             
                
                     expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
        
            describe('PATCH/ Edit a blog', ()=>{
                it('should not edit a blog  created by another user', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Great Health and Vitalityy',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .patch(`/blogs/${postId}`)
             .send({body: 'smokers are liable to die young'})

             
                
             expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
            describe('PATCH/ Update blog', ()=>{
                it('should successfully update blog', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Good Healthsss',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                   


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .patch(`/blogs/${postId}`)
             .set('authorization', `Bearer ${token}`)

             .send({body: 'smokers are liable to die young'})

             
                
             expect(res.status).toEqual(200);
                    
                
            
            
                    })
            
            
        
                
            })
            describe('DELETE/ Delete a blog', ()=>{
                it('should throw an error - unauthenticated', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Vital',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    


            const postId = response.body.data._id

    
             const res = await supertest(app)
             .delete(`/blogs/${postId}`)
             
                
                     expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
        
            describe('DELETE/ Delete a blog', ()=>{
                it('should not delete blog created by another user', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Good Health and Vitality',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                    



            const postId = response.body.data._id

    
             const res = await supertest(app)
             .delete(`/blogs/${postId}`)
            

             
                
             expect(res.status).toEqual(401);
                    
                
            
            
                    })
            
            
        
                
            })
            describe('DELETE/ Delete blog', ()=>{
                it('should successfully delete a blog', async () => {
                    const response = await supertest(app) .post('/blogs')
                    .set('authorization', `Bearer ${token}`)
                    .set('content-type', 'application/json')
                    .send({title: 'Good Health3',
                    description:'Water is a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
                    body:'Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes throughKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through hhhKeep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rgggg id of wastes through urination, perspiration, and bowel movements.assdffghh ghjj ffg hjjk n njsjhs shjhs ssjj snjjs hsjsj hjsjs hjsjs jjjs hjjs shjjs bsnsjs hwjmsm snsnss shshhs hj sj sjs  sjjsnsj shs sms jsjs js jsn sns js nsn Keep a normal temperature, Lubricate and cushion joints, Protect your spinal cord and other sensitive tissues, Get rid of wastes through.',
                    tags: 'Healthcare'
                 })
                   


            const postId = response.body.data._id

             const res = await supertest(app)
             .delete(`/blogs/${postId}`)
             .set('authorization', `Bearer ${token}`)



             
                
             expect(res.status).toEqual(204);
                    
                
            
            
                    })
            
            
        
                
            })

})  