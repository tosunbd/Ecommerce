const { responseReturn } = require('../../utilities/response');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const categoryModel = require('../../models/categoryModel');
const fs = require('fs-extra');
const path = require('path');

class CategoryControllers {
    // Category Add
    add_category = async (req, res) => {
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        await fs.ensureDir(uploadDir);

        const form = formidable({ multiples: false, uploadDir: uploadDir, keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 400, { error: 'Something went wrong while parsing the form.' });
            }

            let { name } = fields;
            let { image } = files;

            if (!name || !image) {
                console.error('Missing required fields:', { name, image });
                return responseReturn(res, 400, { error: 'Name and image are required fields.' });
            }

            name = name.trim();
            const slug = name.split(' ').join('-');

            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET,
                secure: true
            });

            try {
                const filePath = image.filepath || image.path; // Adjusting to ensure the correct path is used
                console.log('File being uploaded:', filePath);
                const result = await cloudinary.uploader.upload(filePath, { folder: 'Categories' });
                console.log('Upload result:', result);
                const category = new categoryModel({
                    name,
                    image: result.url,
                    slug
                });
                await category.save();
                return responseReturn(res, 201, { category, message: 'Category Added Successfully' });
            } catch (uploadError) {
                console.error('Upload or save error:', uploadError);
                return responseReturn(res, 500, { error: 'Failed to upload image or save category.', details: uploadError.message });
            } finally {
                // Clean up the uploaded file from the server after uploading to Cloudinary
                const filePath = image.filepath || image.path;
                await fs.remove(filePath);
            }
        });
    }
    // End of Category Add

    // Category Get
    get_category = async (req, res) => {
        console.log('this is working.');
        // const { email, password } = req.body;
        // try {
        //     const admin = await adminModel.findOne({ email: email.toLowerCase() }).select('+password');
        //     // console.log(admin);

        //     if (admin) {
        //         const isMatch = await bcrypt.compare(password, admin.password);
        //         if (isMatch) {
        //             const token = await createToken({
        //                 id: admin.id,
        //                 role: admin.role
        //             });

        //             const expiresIn = new Date();
        //             expiresIn.setDate(expiresIn.getDate() + 7);
        //             res.cookie('accessToken', token, { expires: expiresIn, httpOnly: true, secure: true });

        //             responseReturn(res, 200, { token, message: "Login Successful" });
        //         } else {
        //             responseReturn(res, 404, { message: "Invalid Password" });
        //         }
        //     } else {
        //         responseReturn(res, 400, { error: "Email not found" });
        //     }
        // } catch (error) {
        //     responseReturn(res, 500, { error: error.message });
        // }
    }
    // End of Category Get
}

module.exports = new CategoryControllers();
