const { responseReturn } = require('../../utilities/response');
import { categoryAdd } from './../../../dashboard/src/store/Reducers/categoryReducers';
const formidable = require('formidable');
const { cloudinary } = require('cloudinary').v2;
const categoryModel = require('../../models/categoryModel');

class categoryControllers
{
    // Category Add
    add_category = async (req, res) => {
        // console.log('this is working.');
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            // console.log(fields);
            // console.log(files);
            if (err) {
                responseReturn(res, 404, { err: 'somthing went wrong.' });
            }
            else {
                let {name} = fields;
                let { image } = files;
                name = name.trim();
                const slug = name.split(' ').join('-');

                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                });

                try {
                    const result = await cloudinary.uploader.upload(image.filepath, { folder: 'Categories' });
                    if(result) {
                        const category = new categoryModel({
                            name,
                            image: result.url,
                            slug
                        });
                        await category.save();
                        responseReturn(res, 201, { category, message: 'Category Added Successfully' });
                    }
                    else
                    {
                        responseReturn(res, 404, { err: 'Image upload failed' });
                    }
                }
                catch (err)
                {
                    responseReturn(res, 500, { err: 'Internal Server Error' });
                }

            }
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