const adminModel = require('../models/adminModel');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const { responseReturn } = require('../utilities/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

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
}

module.exports = new authControllers();