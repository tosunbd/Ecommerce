const adminModel = require('../models/adminModel');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const { responseReturn } = require('../utilities/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const path = require('path');


class authControllers {
    // Admin Login
    admin_login = async (req, res) => {
        const { email, password } = req.body;
        try
        {
            const admin = await adminModel.findOne({ email: email.toLowerCase() }).select('+password');
            // console.log(admin);

            if (admin)
            {
                const isMatch = await bcrypt.compare(password, admin.password);
                if (isMatch)
                {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    });

                    const expiresIn = new Date();
                    expiresIn.setDate(expiresIn.getDate() + 7);
                    res.cookie('accessToken', token, { expires: expiresIn, httpOnly: true, secure: true });

                    responseReturn(res, 200, {token, message: "Login Successful" });
                }
                else
                {
                    responseReturn(res, 404, { message: "Invalid Password" });
                }
            }
            else
            {
                responseReturn(res, 400, { error: "Email not found" });
            }
        }
        catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }
    // End of Admin Login

    // Seller Login
    seller_login = async (req, res) => {
        const { email, password } = req.body;
        try
        {
            const seller = await sellerModel.findOne({ email: email.toLowerCase() }).select('+password');
            // console.log(seller);

            if (seller)
            {
                const isMatch = await bcrypt.compare(password, seller.password);
                if (isMatch)
                {
                    const token = await createToken({
                        id: seller.id,
                        role: seller.role
                    });

                    const expiresIn = new Date();
                    expiresIn.setDate(expiresIn.getDate() + 7);
                    res.cookie('accessToken', token, { expires: expiresIn, httpOnly: true, secure: true });

                    responseReturn(res, 200, {token, message: "Login Successful." });
                }
                else
                {
                    responseReturn(res, 404, { message: "Invalid Password." });
                }
            }
            else
            {
                responseReturn(res, 400, { error: "Email not found" });
            }
        }
        catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }
    // End of Seller Login

    // Seller Register
    seller_register = async (req, res) => {
        const { email, name, password } = req.body;
        try {
            const getUser = await sellerModel.findOne({ email });
            if (getUser)
            {
                responseReturn(res, 404, { error: "Email already exists" });
            }
            else
            {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    method: 'Menually',
                    shopInfo: {}
                });
                await sellerCustomerModel.create({
                    myId: seller.id
                });

                const token = await createToken({
                    id: seller.id,
                    role: seller.role
                });

                res.cookie('accessToken', token, { expires: new Date(Date.now() + 7*24*60*60*1000) }); // Expires in 7 days

                responseReturn(res, 201, {token, message: "Successfully Registered." });
            }
        }
        catch
        {
            responseReturn(res, 404, { error: "Email already exists" });
        }
    }
    // End of Seller Register

    // Get User
    getUser = async (req, res) => {
        const { role, id } = req;
        try
        {
            if (role === 'admin')
            {
                const user = await adminModel.findById(id);
                console.log(user);
                responseReturn(res, 200, {userInfo: user});
            }
            else
            {
                const seller = await sellerModel.findById(id);
                console.log(seller);
                responseReturn(res, 200, { userInfo: seller });
            }
        }
        catch (error) {
            responseReturn(res, 500, { error: "Internal Server Error" });
        }
    }
    // End of Get User

    
    // Start of profile_image_upload
    profile_image_upload = async (req, res) => {
        const { id } = req; // Assuming `id` is passed from `authMiddleware`
    
        try {
            // Ensure upload directory exists
            const uploadDir = path.join(__dirname, '..', '..', 'uploads');
            await fs.ensureDir(uploadDir);
    
            const form = formidable({ multiples: false, uploadDir: uploadDir, keepExtensions: true });
    
            form.parse(req, async (err, _, files) => {
                // Check for errors in form parsing
                if (err) {
                    console.error("Form parsing error:", err);
                    return responseReturn(res, 400, { error: 'Form parsing error.' });
                }
    
                let { image } = files;  // Extract the image file from the parsed files
    
                // Check if an image file is uploaded
                if (!image) {
                    return responseReturn(res, 400, { error: 'No image file uploaded.' });
                }
    
                try {
                    // Configure Cloudinary
                    cloudinary.config({
                        cloud_name: process.env.CLOUD_NAME,
                        api_key: process.env.API_KEY,
                        api_secret: process.env.API_SECRET,
                        secure: true
                    });
    
                    // Upload image to Cloudinary
                    const filePath = image.filepath || image.path;
                    const result = await cloudinary.uploader.upload(filePath, { folder: 'profile' });
    
                    if (result) {
                        // Update the seller's profile image in the database
                        await sellerModel.findByIdAndUpdate(id, { image: result.secure_url });
    
                        // Fetch updated user info
                        const userInfo = await sellerModel.findById(id);
    
                        return responseReturn(res, 201, { message: "Profile image uploaded successfully", userInfo });
                    } else {
                        return responseReturn(res, 500, { error: 'Image upload to Cloudinary failed.' });
                    }
                } catch (error) {
                    console.error("Cloudinary upload error:", error);
                    return responseReturn(res, 500, { error: error.message });
                }
            });
        } catch (error) {
            console.error("Server error:", error);
            return responseReturn(res, 500, { error: 'Server error while uploading profile image.' });
        }
    };    
    // End of profile_image_upload


}

module.exports = new authControllers();