const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ Setup Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This must be the app password (no spaces!)
  },
});

// ✅ Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error.message);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    console.log('📥 Booking request received:', req.body);
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('❌ Booking failed:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update Booking Status + Email
exports.updateStatus = async (req, res) => {
  try {
    const { status, cost, pickupTime, pickupDate } = req.body;

    // ✅ Fetch the full booking
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // ✅ Update fields
    booking.status = status;
    booking.cost = cost;
    booking.pickupTime = pickupTime;
    booking.pickupDate = pickupDate;
    await booking.save();

    // ✅ Send Email if service is completed
    if (['Ready for Delivery', 'Completed'].includes(status)) {
      const mailOptions = {
        from: `"Bike Service" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: 'Your Bike Service is Completed!',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #007BFF;">Bike Service Update</h2>
            <p>Dear ${booking.name || 'Customer'},</p>
            <p>Your bike service has been marked as <strong>${status}</strong>.</p>
            <p><strong>Service:</strong> ${booking.service || 'N/A'}</p>
            <p><strong>Cost:</strong> ₹${cost || 'N/A'}</p>
            <p><strong>Pickup Date:</strong> ${pickupDate || 'N/A'}</p>
            <p><strong>Pickup Time:</strong> ${pickupTime || 'N/A'}</p>
            <br/>
            <p>Thanks for booking with us! 🚴‍♂️</p>
            <hr/>
            <small>This is an automated email. Please do not reply.</small>
          </div>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
      } catch (emailErr) {
        console.error('❌ Email failed to send:', emailErr.message);
      }
    }

    res.status(200).json({ message: 'Booking updated successfully', data: booking });
  } catch (err) {
    console.error('❌ Booking update error:', err.message);
    res.status(500).json({ message: 'Failed to update booking', error: err.message });
  }
};

// ✅ Get All Bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

// ✅ Get Bookings by User ID
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user bookings', error: err.message });
  }
};

// ✅ Update Suggested Services for a Booking
exports.suggestService = async (req, res) => {
  const { suggestedService } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { suggestedService },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Suggested service updated', booking });
  } catch (error) {
    console.error('❌ Failed to update suggested service:', error.message);
    res.status(500).json({ error: 'Failed to update suggested service' });
  }
};

// ✅ Accept Suggested Service and Merge with Original
exports.acceptSuggestedService = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send("Booking not found");

    booking.service = `${booking.service}, ${booking.suggestedService}`;
    booking.suggestedService = '';
    await booking.save();

    res.status(200).json({ message: "Suggested service accepted and merged.", booking });
  } catch (err) {
    console.error("❌ Error accepting suggested service:", err.message);
    res.status(500).send("Server error");
  }
};
