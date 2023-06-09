var User = require("../model/user");
var bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");
const user = require("../model/user");
var jwt = require("../services/jwt");
//routes
function home(req, res) {
  res.status(200).send({
    message: "home",
  });
}

function pruebas(req, res) {
  console.log(req.body);
  res.status(200).send({
    message: "action",
  });
}

function saveUser(req, res) {
  var params = req.body;
  var user = new User();
  if (params.name && params.password && params.email) {
    user.name = params.name;
    user.email = params.email;
    user.role = "ROLE_USER";
    user.image = null;
    //Control if duplicate users exist
    User.find({
      $or: [
        {
          email: user.email.toLowerCase(),
        },
      ],
    }).exec((err, users) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición",
        });
      }
      if (users && users.length >= 1) {
        return res.status(400).send({
          message: "El usuario que intenta registrar ya existe",
        });
      } else {
        //In case no duplicate users it will encrypt the password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(params.password, 10, (err, hash) => {
            user.password = hash;
            user.save((err, userStored) => {
              //o tendrá un error o un usuario guardado
              if (err) {
                return res.status(500).send({
                  message: "Error al guardar el usuario",
                });
              }
              if (userStored) {
                res.status(200).send({
                  message: "User successfully registered",
                  user: userStored,
                });
              } else {
                res.status(403).send({
                  message: "No se ha registrado el usuario",
                });
              }
            });
          });
        });
      }
    });
  } else {
    //without return if just one possible return
    res.status(200).send({
      message: "Rellena todos los campos",
    });
  }
}

function getUsers(req, res) {
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }

  const itemsPerPage = 5;
  const options = {
    page: page,
    limit: itemsPerPage,
    sort: { _id: 1 },
  };

  User.paginate({}, options, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "Error en la petición",
      });
    }
    if (!result) {
      return res.status(404).send({
        message: "No hay usuarios disponibles",
      });
    }
    return res.status(200).send({
      users: result.docs,
      totalPages: result.totalPages,
      currentPage: result.page,
    });
  });
}

function login(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne(
    {
      email: email,
    },
    (err, user) => {
      if (err) {
        return res.status(500).send({
          message: "Error en la peticion de login",
        });
      }
      if (user) {
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            user.password = undefined;
            res.status(200).send({
              token: jwt.createToken(user),
            });
          } else {
            return res.status(404).send({
              message: "El usuario no se ha podido identificar",
            });
          }
        });
      } else {
        return res.status(404).send({
          message: "El usuario no se ha podido identificar",
        });
      }
    }
  );
}

function updateUser(req, res) {
  let userId = req.user.sub;
  let update = req.body;

  delete update.password;
  User.findByIdAndUpdate(
    userId,
    update,
    {
      new: true,
    },
    (error, userUpdated) => {
      if (error) {
        return res.status(500).send({
          message: "Error en la petición",
        });
      }
      if (!userUpdated) {
        return res.status(404).send({
          message: "No se ha podido actualizar el usuario",
        });
      }
      return res.status(200).send({
        user: userUpdated,
      });
    }
  );
}

function deleteUser(req, res) {
  var userId = req.user.sub;
  User.find({
    _id: userId,
  }).remove((err) => {
    if (err) {
      return res.status(500).send({
        message: "Error al borrar el usuario",
      });
    }
    return res.status(200).send({
      message: "Usuario eliminado correctamente",
    });
  });
}

module.exports = {
  home,
  pruebas,
  saveUser,
  getUsers,
  login,
  updateUser,
  deleteUser
};
