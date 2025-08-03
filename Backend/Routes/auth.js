import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Model/User.js';
import { Blog } from '../Model/blogs.js';
import { authenticate } from '../Middleware/authenticate.js';
import dotenv from 'dotenv';


const auth = Router();
dotenv.config()


auth.post('/register',async(req,res)=>{
    try{
        const {Username,PhoneNumber,Email,password}=req.body;
        console.log(Username);

        const existingUser=await User.findOne({username:Username});
        if(existingUser)
          {   
            res.status(400).send("Username Already Exist")
            console.log("Username Alredy EXist");
            return;
            
          }  
                const newPassword=await bcrypt.hash(password,10)
                console.log(newPassword);

                const newUser=new User({
                    username:Username,
                    phonenumber:PhoneNumber,
                    email:Email,
                    password:newPassword,
    
                });
                await newUser.save();
                res.status(201).send('Registerd Successfully') 
                console.log("signed Up")
          
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
 });


 auth.post('/login', async (req, res) => {
    try {
        const { Username, password } = req.body;
        const result = await User.findOne({ username: Username });

        if (!result) {
            return res.status(400).json({ msg: "Enter Valid Username" }); 
        }

        const valid = await bcrypt.compare(password, result.password);
        if (valid) {
            const token = jwt.sign(
                { UserName: result.username,userId:result._id },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.cookie('authTok', token, {
                httpOnly: true,
            });

            return res.status(200).json({ 
                message: "Logged in Successfully",
                userId:result._id
                
            });
        } else {
            return res.status(401).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});


auth.get('/Logout',(req,res)=>{
    res.clearCookie('authTok');
    res.status(200).json({msg:"Successfully Logged Out"})
})
// POST /api/blogs - Create a new blog post
auth.post('/blogs', authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;

        const newBlog = new Blog({
            user: userId,
            title,
            content
        });
        await newBlog.save();

        res.status(201).json({ message: "Blog created", blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// GET /api/blogs - Fetch all blogs
auth.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user', 'username');
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});// GET /api/myblogs - Get blogs of the current user
auth.get('/myblogs', authenticate, async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.userId }).populate('user', 'username');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// GET /api/blogs/:id - Fetch blog by ID
auth.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('user', 'username');
        console.log(blog)
        if (!blog) return res.status(404).json({ message: "Blog post not found" });
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// PUT /api/blogs/:id - Update blog post (author only)
auth.put('/blogs/:id', authenticate, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog post not found" });
        if (blog.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        blog.title = req.body.title;
        blog.content = req.body.content;
        await blog.save();
        res.json({ message: "Blog updated", blog });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// DELETE /api/blogs/:id - Delete blog post (author only)
auth.delete('/blogs/:id', authenticate, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await blog.deleteOne();
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET /api/users/me - Get current user's profile
auth.get('/users/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 export {auth}