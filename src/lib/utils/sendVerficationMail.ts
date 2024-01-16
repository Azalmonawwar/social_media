import nodemailer from 'nodemailer'

export async function sendMail(email:string,name:string ,token:string){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'todaytalks3@gmail.com',
          pass:process.env.PASSWORD,
        },
      });

    const mailOption = {
        from: 'todaytalks3@gmail.com',
        to: email,
        subject: "Thank you for your message",
        html: `
        <h3>Hello ${name}</h3>
        <a href=${`http://localhost:3000/verify?token=${token}`}>Click here to verify your account</a>
    `
    }

    try{
        await transporter.sendMail(mailOption)
        console.log("Email sent")
    }
    catch{
        console.log("Error sending email")
    }
}