// controllers/bikeController.js

const brands = ['Honda', 'Yamaha', 'Suzuki', 'TVS', 'Royal Enfield'];

const bikeModels = {
  Honda: ['Shine', 'Unicorn', 'SP 125'],
  Yamaha: ['R15', 'FZ', 'MT-15'],
  Suzuki: ['Access', 'Gixxer'],
  TVS: ['Apache', 'Jupiter'],
  'Royal Enfield': ['Classic 350', 'Bullet 350']
};

exports.getBrands = (req, res) => {
  res.json(brands);
};

exports.getModelsByBrand = (req, res) => {
  const brand = req.params.brand;
  const models = bikeModels[brand];

  if (!models) {
    return res.status(404).json({ message: 'Brand not found' });
  }

  res.json(models);
};
