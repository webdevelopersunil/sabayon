<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $tagline }}</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">

    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">

        <h2 style="color: #333;">{{ $tagline }}</h2>

        <p>Hello {{ $toUser }},</p>

        <p>
            This is regarding your Sahayog Request.
        </p>

        <hr>

        <h4>📌 Request Details:</h4>

        <p><strong>Request Number:</strong> {{ $data['request_number'] ?? '-' }}</p>
        <p><strong>Name:</strong> {{ $data['name'] ?? '-' }}</p>
        <p><strong>Email:</strong> {{ $data['email'] ?? '-' }}</p>
        <p><strong>Phone:</strong> {{ $data['mobileno'] ?? '-' }}</p>

        @if(!empty($data['remarks']))
            <p><strong>Remarks:</strong> {{ $data['remarks'] }}</p>
        @endif

        <hr>

        <p style="margin-top: 20px;">
            Regards,<br>
            {{ $fromUser }}
        </p>

    </div>

</body>
</html>