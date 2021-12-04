import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function mailto(email, text, html) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ucodeF0621@gmail.com', // generated ethereal user
            pass: 'ucodeF0621!!!', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'ucodeF0621@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Verify your profile", // Subject line
        text: text, // plain text body
        html: html, // html body
    });
}
export default mailto