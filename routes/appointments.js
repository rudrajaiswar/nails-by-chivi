const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// POST /api/appointments — Book a new appointment
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, service, date, time, venue, address, notes } = req.body;

    // Basic validation
    if (!name || !phone || !service || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields: name, phone, service, date, time'
      });
    }

    // Check if slot already booked
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please choose a different time.'
      });
    }

    const appointment = new Appointment({
      name,
      phone,
      email,
      service,
      date: new Date(date),
      time,
      venue: venue || 'At Studio',
      address,
      notes
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: `Appointment booked successfully! Tanvi will confirm your booking for ${service} on ${new Date(date).toLocaleDateString('en-IN')} at ${time}.`,
      data: {
        id: appointment._id,
        name: appointment.name,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Appointment booking error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again or call us directly.' });
  }
});

// GET /api/appointments — Get all appointments (admin use)
router.get('/', auth, async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) {
      const d = new Date(date);
      const nextDay = new Date(d);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.date = { $gte: d, $lt: nextDay };
    }

    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH /api/appointments/:id — Update status (admin)
router.patch('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/appointments/slots — Get available time slots for a date
router.get('/slots/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookedSlots = await Appointment.find({
      date: { $gte: date, $lt: nextDay },
      status: { $ne: 'cancelled' }
    }).select('time');

    const allSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
      '5:00 PM', '6:00 PM', '7:00 PM'
    ];

    const bookedTimes = bookedSlots.map(a => a.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({ success: true, date: req.params.date, availableSlots, bookedSlots: bookedTimes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/appointments/client/:phone — Get client's bookings
router.get('/client/:phone', async (req, res) => {
  try {
    const appointments = await Appointment.find({ phone: req.params.phone })
      .sort({ date: -1, time: 1 })
      .select('-__v -updatedAt');
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
