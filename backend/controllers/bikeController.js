const brands = [
  'Honda',
  'Yamaha',
  'Suzuki',
  'TVS',
  'Royal Enfield',
  'KTM',
  'Hero',
  'Bajaj',
  'BMW',
  'Ducati'
];

const bikeModels = {
  Honda: ['Shine', 'Unicorn', 'SP 125', 'Hornet 2.0', 'CB 350'],
  Yamaha: ['R15', 'FZ', 'MT-15', 'Fascino', 'Ray ZR'],
  Suzuki: ['Access', 'Gixxer', 'Burgman Street', 'Intruder'],
  TVS: ['Apache', 'Jupiter', 'Ntorq', 'Radeon'],
  'Royal Enfield': ['Classic 350', 'Bullet 350', 'Hunter 350', 'Meteor 350','Interceptor 650','Continental GT 650'],
  KTM: ['Duke 200', 'RC 200', 'Adventure 390', 'Duke 390','RC 390'],
  Hero: ['Splendor Plus', 'Glamour', 'Xtreme 160R', 'HF Deluxe'],
  Bajaj: ['Pulsar 150', 'Pulsar NS200', 'Avenger 220', 'Dominar 400'],
  BMW: ['G 310 R', 'G 310 GS', 'R 1250 GS'],
  Ducati: ['Monster', 'Panigale V4', 'Scrambler', 'Multistrada']
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
