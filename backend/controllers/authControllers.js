class authControllers {
    admin_login = async (req, res) => {
        console.log(req.body);
        // const {email, password} = req.body;
        // const user = await User.findOne({email: email});
        // if (user) { }
    }
}

module.exports = new authControllers();