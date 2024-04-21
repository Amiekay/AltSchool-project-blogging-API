const blogModel = require('../models/blogModel')




 const createPost= async (req, res)=>{
    //   
     try {
         const newPost = req.body;

        // get author name  and authorId
          req.body.author = req.user._id
           
            const calculateReadingTime = (text, wordsPerMinute =225)=>{
              const wordCount = text.split(/\s+/).length;
              const reading_time = Math.ceil( wordCount/ wordsPerMinute);

              return reading_time +  ' ' + 'mins'
            }
          
           newPost.reading_time = (calculateReadingTime(newPost.body))

              const post = await blogModel.create(newPost);
        
        const data = await blogModel.findById(post._id).populate({path: 'author', select: '-password -__v -createdAt -updatedAt'}).select('-__v')
            res.status(201).json({
              message: 'Post created',
              data          })
            
        }

      catch (error) {
        res.status(401).json({
            message: 'an error occured',
            data: error

        })
     }

    
}




const updateAPostToPublished = async(req, res)=>{
  try {

    const postId= req.params.postId
    // const state = req.body.state

  const post = await blogModel.findById(postId)
 
  
  if (!post){ 
    return res.status(404).json({
         message: 'Post not found'
     })
     
  }
  if (post.author._id.toString() !== req.user._id.toString()){
      return res.status(401).json({
     message: 'You are unauthorized to publish'
 })
 }
   
  const state = req.body.state;

  await post.updateOne( {state},{new: true}).populate({path: 'author', select: '-password -__v -createdAt -updatedAt'}).select('-__v')
 
  res.status(200).json({
    message: 'Post published successfully',
    data: post
  })
  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
      error
    })
  }
    
}

const editApost = async (req, res)=>{
  try {

    const postId= req.params.postId
    // const state = req.body.state

  const post = await blogModel.findById(postId)
 
  
  if (!post){ 
    return res.status(404).json({
         message: 'Post not found'
     })
     
  }
  if (post.author.toString() !== req.user._id.toString()){
      return res.status(401).json({
     message: 'You are unauthorized to edit post'
 })
 }
   
  const body = req.body.body;

  await post.updateOne( {body},{new: true}).populate({path: 'author', select: '-password -__v -createdAt -updatedAt'}).select('-__v')
 
  res.status(200).json({
    message: 'Post published successfully',
    data: post
  })
  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
      error
    })
  }
    

}
const getAllPublishedPosts = async (req, res)=>{

try {
  const page = Number(req.query.page)|| 1
  const limit = Number(req.query.limit) || 20
  
  const {author, title, tags} = req.query

  const filter = { state: "published" };
if(author){
  filter.author = author
}
if(title){
  filter.title = title
}
if(tags){
  filter.tags = tags
}

const sort = [];

for (const param in req.query) {
  if (["read_count", "timestamps", "reading_time"].includes(param)) {
    const direction = req.query[param];
    const sort_direction = direction == "asc" ? 1 : -1;
    const row_sort = [param, sort_direction];
    sort.push(row_sort);
  }
}

    const posts = await blogModel.find({})
    .where(filter)
    .populate('author')
    .sort(sort)
    .skip((page - 1) *limit).limit(limit)
    res.status(200).json({
        message: 'Welcome ',
      published_blogs: posts
    })
  
} catch (error) {
  res.status(400).json({
    message: 'Bad Request--- possibly validation failure',
    error
  })
}
  
}


const getMyPosts = async (req, res)=>{

try {
  const page = Number(req.query.page)|| 1
  const limit = Number(req.query.limit) || 20
  const state = req.query.state
  




if (state){
  const posts = await blogModel.find({author: req.user._id}, {state: state})
  .populate('author')
    .skip((page - 1) *limit).limit(limit)
    return res.status(200).json({
      message: 'My posts',
    posts 
  })
}
else{
  const posts = await blogModel.find({author: req.params.userId}).populate('author')
    .skip((page - 1) *limit).limit(limit)
   return  res.status(200).json({
      message: 'My posts',
    posts 
  })

}

  
} catch (error) {
  res.status(400).json({
    message: 'Bad Request--- possibly validation failure',
    error
  })
}
  



}
const getOnePost = async(req, res)=>{

try {

  const postId= req.params.postId

const post = await blogModel.findById(postId)
.where({state: 'published'})
.populate({path: 'author', select: '-password -__v'}).select('-__v')

if (!post){
 return res.status(404).json({
    message: 'Post not found'
})
}

post.read_count += 1;
await post.save()

await post.save();

res.status(200).json({
  message: 'A post',
post })
}
catch (error) {
  
res.status(400).json({
  message: 'Bad Request, --- possibly validation failure',
    error
})
  }

}

const deleteOnePost = async(req, res)=>{

  try {
    
  const postId= req.params.id

 const post = await blogModel.findById(postId)

 
 if (!post){ 
   return res.status(404).json({
        message: 'Post not found'
    })
    
 }
 if (post.author.toString()!== req.user._id.toString()){
  return res.status(401).json({
    message: 'Unauthorized to delete this post'
})
}

 await post.deleteOne()

res.status(204).json({})

  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
    error 
    })
  }
}


module.exports = {
    createPost,
    updateAPostToPublished,
    editApost,
    getAllPublishedPosts,
    getOnePost,
    deleteOnePost,
    getMyPosts
}