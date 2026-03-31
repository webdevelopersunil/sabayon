<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sahayog OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
        
        <h2 style="color: #0056b3; text-align: center; margin-top: 0;">Login to Sahayog</h2>
        
        <p>Hello {{ ucwords($name) }},</p>
        
        <p>You have requested to log in to your Sahayog account. Please use the following 6-digit One-Time Password (OTP) to securely complete your login:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; background-color: #f4f4f4; padding: 15px 30px; border-radius: 6px; letter-spacing: 4px; border: 1px dashed #ccc;">
                {{ $otp }}
            </span>
        </div>
        
        <div style="background-color: #fff3cd; border-left: 4px solid #ffecb5; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404; font-weight: bold;">
                ⚠️ Important: This OTP is valid for exactly 5 minutes.
            </p>
        </div>
        
        <p style="font-size: 14px; color: #666;">If you did not request this OTP, please ignore this email or contact support if you have concerns.</p>
    </div>
</body>
</html>