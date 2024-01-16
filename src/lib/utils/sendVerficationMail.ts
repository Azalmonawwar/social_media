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
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Dear User,</p>
        <a href=${`http://localhost:3000/verify?token=${token}`}>Click here to verify your account</a>
        
        <p>Thank you for using our service.</p>
        <div style="padding: 10px; background-color: #d3d3d3; margin-top: 20px;">
          <small>This is an automated email. Please do not reply.</small>
        </div>
      </div>
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