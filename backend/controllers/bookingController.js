const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error.message);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      email,
      bikeBrand,
      bikeName,
      serviceType,
      bookingDate,
      user,
    } = req.body;

    const newBooking = new Booking({
      customerName,
      email,
      bikeBrand,
      bikeName,
      serviceType,
      bookingDate,
      user,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, cost, pickupTime, pickupDate } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    booking.cost = cost;
    booking.pickupTime = pickupTime;
    booking.pickupDate = pickupDate;
    await booking.save();

    if (['Ready for Delivery', 'Completed'].includes(status)) {
      const mailOptions = {
        from: `"Bike Service" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: 'Your Bike Service is Completed!',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #007BFF;">Bike Service Update</h2>
            <p>Dear ${booking.customerName || 'Customer'},</p>
            <p><strong>Service:</strong> ${booking.serviceType?.toString() || 'N/A'}</p>
            <p><strong>Suggested Service:</strong> ${booking.suggestedService || 'N/A'}</p>
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

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.suggestService = async (req, res) => {
  const { suggestedService } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.suggestedService = suggestedService;
    booking.ownerSuggestedService = suggestedService; 

    await booking.save();

    res.status(200).json({ message: 'Suggested service updated', booking });
  } catch (error) {
    console.error('❌ Failed to update suggested service:', error.message);
    res.status(500).json({ error: 'Failed to update suggested service' });
  }
};


exports.acceptSuggestedService = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.suggestedService || booking.suggestedService === 'N/A') {
      return res.status(400).json({ message: 'No suggested service to accept.' });
    }

    booking.serviceType = [booking.serviceType, booking.suggestedService]
      .filter(Boolean)
      .join(', ');

    booking.suggestedServiceAccepted = true;

    await booking.save();

    res.status(200).json({ message: "Suggested service accepted and merged.", booking });
  } catch (error) {
    console.error("❌ Error accepting suggested service:", error.message);
    res.status(500).json({ message: "Failed to accept suggested service" });
  }
};

exports.getBookingsByCustomerEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.find({ email });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings by email' });
  }
};
