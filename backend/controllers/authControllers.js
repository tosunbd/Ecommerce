const adminModel = require('../models/adminModel');
const { responseReturn } = require('../utilities/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

class authControllers {
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
}

module.exports = new authControllers();