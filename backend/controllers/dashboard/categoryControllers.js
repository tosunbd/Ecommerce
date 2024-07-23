const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');

class categoryControllers
{
    // Category Add
    add_category = async (req, res) => {
        // console.log('this is working.');
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            console.log(fields);
            console.log(files);
        });
    }
    // End of Category Get

    get_category = async (req, res) => {
        console.log('this is working.');
        // const { email, password } = req.body;
        // try
        // {
        //     const admin = await adminModel.findOne({ email: email.toLowerCase() }).select('+password');
        //     // console.log(admin);

        //     if (admin)
        //     {
        //         const isMatch = await bcrypt.compare(password, admin.password);
        //         if (isMatch)
        //         {
        //             const token = await createToken({
        //                 id: admin.id,
        //                 role: admin.role
        //             });

        //             const expiresIn = new Date();
        //             expiresIn.setDate(expiresIn.getDate() + 7);
        //             res.cookie('accessToken', token, { expires: expiresIn, httpOnly: true, secure: true });

        //             responseReturn(res, 200, {token, message: "Login Successful" });
        //         }
        //         else
        //         {
        //             responseReturn(res, 404, { message: "Invalid Password" });
        //         }
        //     }
        //     else
        //     {
        //         responseReturn(res, 400, { error: "Email not found" });
        //     }
        // }
        // catch (error) {
        //     responseReturn(res, 500, { error: error.message });
        // }
    }
    // End of Category Get

}

module.exports = new categoryControllers();