const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};

exports.createService = async (req, res) => {
    const service = await Service.create(req.body);
    res.json(service);
};

exports.deleteService = async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
};
