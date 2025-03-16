// Import dependencies
const express=require("express");
const mongoose=require("mongoose"); 
const twilio=require("twilio");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Twilio Setup
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// Message Schema
const messageSchema = new mongoose.Schema({
    contactName: String,
    phone: String,
    otp: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Route
app.post('/send-otp', async (req, res) => {
    const { contactName, phone } = req.body;
    // console.log(contactName, phone);
    const otp = generateOTP();
    const messageBody = `Hi. Your OTP is: ${otp}`;
    
    try {
        // Send SMS
        const twiliobject=client.verify.v2.services(process.env.TWILIO_SERVICE_KEY)
      .verifications
      .create({to: TWILIO_PHONE, channel: 'sms',body: messageBody})
      .then(verification => console.log(verification.sid));
        if(!twiliobject){
            console.log("Error sending OTP");
            return res.status(500).json({ success: false, message: 'Error sending OTP' });
        }
        
        // Save to DB
        const newMessage = new Message({ contactName, phone, otp });
        await newMessage.save();

        res.status(200).json({ success: true, message: 'OTP sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending OTP', error });
    }
});
// for default route checking 
// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });
// Get Sent Messages
app.get('/sent-messages', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
