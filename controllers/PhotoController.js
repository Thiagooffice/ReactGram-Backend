const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//Insert a photo, with an user relatetd to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userNmae: user.name,
  });

  //if photo was created sucessfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

//removve a photo from DB
const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    //check photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tentee novamente mais tarde."],
      });
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).json({
      id: photo._id,
      message: "Foto excluída com sucesso.",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
