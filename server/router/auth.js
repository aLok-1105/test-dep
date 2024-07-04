/** @format */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate');


require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
	res.send('Hello World from auth');
});

//async await
router.post('/register', async (req, res) => {
	const { name, email, work, phone, password, cpassword, profileImg } = req.body;

	if (!name || !email || !work || !phone || !password || !cpassword) {
		return res.status(422).json({ error: 'Invalid' });
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(422).json({ error: 'Email exists!!' });
		} else if (password != cpassword) {
			return res.status(422).json({ error: 'Passwords do not match' });
		} else {
			const user = new User({
				name,
				email,
				work,
				phone,
				password,
				cpassword,
				profileImg
			});

			//hashing in userSchema
			await user.save();

			res.status(201).json({
				message: 'User Successfully Registered',
			});
		}
	} catch (error) {
		res.status(422).send({ error: "Registration Not Successful" });
		console.log(error);
	}
});

//login route

router.post('/login', async (req, res) => {
	

	try {
		let token;
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Please fill the data' });
		}
		const userLogin = await User.findOne({ email: email});

		if(userLogin){
			const isMatch = await bcrypt.compare(password, userLogin.password);

			token = await userLogin.generateAuthToken();
			console.log(token);

			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true
			});

			if (!isMatch) {
				res.status(400).json({ error: 'Invalid Credentials' });
			
			}else{
				res.status(200).json({ message: 'Logged In!!!' });
			}
		}else{
			res.status(400).json({ error: 'Invalid Credentials' });
		}
		
	} catch (error) {
        res.status(400).send({ error: 'Invalid' });
		console.log(error);
	}
});

router.get('/about', authenticate, (req, res) => {
	res.send(req.rootUser);
});


//get user data for contact and home page
router.get('/getData', authenticate, (req, res)=>{
	res.send(req.rootUser);
})

router.post('/contact', authenticate, async (req, res)=>{
	try {
		const {name,  email, phone, message} = req.body;
		if (!name || !email || !phone || !message) {
			return res.status(400).json({ error: 'Please fill the data' });
		}
		const userContact = await User.findOne({_id:req.userId});

		if(userContact){
			const userMessage = await userContact.addMess(name, email, phone, message);

			await userContact.save();

			res.status(201).json({message: "User contact successfully"});
		}
	} catch (error) {
		console.log(error);
	}
})

router.get('/logout', authenticate, (req, res) => {
	res.clearCookie('jwtoken', {path:'/'});
	res.status(200).send("User Logout");
	
});



//promises

// router.post('/register', (req, res)=>{

//     const {name, email, work, phone, password, cpassword} = req.body;

//     if(!name || !email || !work || !phone || !password || !cpassword){
//         return res.status(422).json({error:"Invalid"})
//     }

//     User.findOne({email:email}).then((UserExists)=>{
//         if(UserExists){
//             return res.status(422).json({error:"Email exists!!"})
//         }

//         const user = new User({name, email, work, phone, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message: "User Successfully Registered"});
//         }).catch((err)=>res.status(500).json({error: "Failed to register"}));
//     }).catch((err)=>{console.log(err)})

// })

module.exports = router;
