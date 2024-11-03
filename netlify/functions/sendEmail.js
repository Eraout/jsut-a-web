// netlify/functions/sendEmail.js
const axios = require("axios");

exports.handler = async function(event, context) {
    // Перевіряємо метод запиту
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    // Парсимо дані, отримані з форми
    const formData = JSON.parse(event.body);

    try {
        // Відправляємо запит до EmailJS API, використовуючи змінні середовища
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: process.env.SERVICE_ID,
            template_id: process.env.TEMPLATE_ID,
            user_id: process.env.EMAIL_API_KEY,
            template_params: formData
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send email" })
        };
    }
};