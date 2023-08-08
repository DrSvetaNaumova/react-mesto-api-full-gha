const Card = require('../models/card');
const NotFoundDataError = require('../errors/NotFoundDataError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getAllCards = async (_req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(201).send({ data: card });
  } catch (err) {
    return next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(new NotFoundDataError('Карточка не существует.'));

    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(new NotFoundDataError('Карточка не существует.'));

    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      new NotFoundDataError('Карточка не существует.'),
    );
    if (String(card.owner) !== String(req.user._id)) {
      throw new ForbiddenError('Нет прав для удаления карточки.');
    }
    await card.deleteOne();
    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};
