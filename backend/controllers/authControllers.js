const adminModel = require('../models/adminModel');
const { responseReturn } = require('../utilities/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

class authControllers {
    // Admin Login
    admin_login = async (req, res) => {
        const { email, password } = req.body;
        try
        {
            const admin = await adminModel.findOne({ email: email.toLowerCase() }).select('+name +email +password +image +role');
            console.log(admin);

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
                    res.cookie('access_token', token, { expires: expiresIn, httpOnly: true, secure: true });

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

    // Seller Register
    seller_register = async (req, res) => {
        const { email, name, password } = req.body;
    }
    // End of Seller Register

    // Get User
    getUser = async (req, res) => {
        const { role, id } = req;
        try
        {
            if (role === 'admin')
            {
                const user = await adminModel.findOne({ _id: id });
                responseReturn(res, 200, {userInfo: user});
            }
            else
            {
                console.log("Seller Info");
            }
        }
        catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
        
    }

    // End of Get User
}

module.exports = new authControllers();