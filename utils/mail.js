const nodemailer = require("nodemailer");
// 创建传输对象
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "1084983891@qq.com",
        pass: "suptqdaacmteibii"
    }
})
const mailOptions = {
    from: "1084983891@qq.com",
    to: "",
    subject: "",
    text: "",
    html: ""
}

function sendMail(userEmail, subject, text, html){
    mailOptions.to = userEmail;
    mailOptions.subject = subject;
    mailOptions.text = text;
    mailOptions.html = html || "";
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                resolve(false)
                return
            }
            resolve(true)
        });
    })
}

module.exports = {
    sendMail
}