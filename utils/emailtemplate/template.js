// Forgot Password Email Template
let forgot_password_template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        /* General styling (consistent with the original email template) */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0056b3;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 2em;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0056b3;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #003d82;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: #777;
            border-top: 1px solid #ddd;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
                border-radius: 0;
            }
            .header {
                padding: 10px;
                border-radius: 0;
            }
            .header h1 {
                font-size: 1.5em;
            }
            .content {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You recently requested to reset your password for your Apptiv account. Please click the button below to reset it:</p>
            <a href="{{reset_password_url}}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>This link is valid for a limited time.</p>
        </div>
        <div class="footer">
            <p>Copyright © 2024 Apptiv. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

// Registration Success Email Template
let register_success_template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <style>
        /* General styling (consistent with the original email template) */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0056b3;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 2em;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0056b3;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #003d82;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: #777;
            border-top: 1px solid #ddd;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
                border-radius: 0;
            }
            .header {
                padding: 10px;
                border-radius: 0;
            }
            .header h1 {
                font-size: 1.5em;
            }
            .content {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Apptiv!</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with Apptiv! We're thrilled to have you as a new user.</p>
            <p>Get started by exploring our platform and discovering all the amazing features we have to offer.</p>
            <a href="{{app_url}}" class="button">Get Started</a>
        </div>
        <div class="footer">
            <p>Copyright © 2024 Apptiv. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

let organization_reg_otp_template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 15px;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        p {
            font-size: 14px;
            color: #666;
            margin: 10px 0;
        }
        .otp-code {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            letter-spacing: 2px;
            margin: 15px 0;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
        .footer strong {
            color: #333;
        }
    </style>
</head>
<body>
 
    <div class="container">
        <h1>Your OTP Code</h1>
        <p>Use the code below to verify your email.</p>
 
        <div class="otp-code">{{OTP}}</div> <!-- Replace dynamically -->
 
        <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
 
        <p class="footer">If you did not request this, please ignore this email.</p>
 
        <p class="footer"><strong>— Apttiv Team</strong></p>
    </div>
 
</body>
</html>
`;

export { forgot_password_template, register_success_template,organization_reg_otp_template };
