mongoose = require("mongoose");

Schema = mongoose.Schema;

FirmaSchema = Schema({
  // _id: Schema.ObjectId,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  peticion: {
    type: mongoose.Types.ObjectId,
    ref: "Peticion",
    required: true,
  },
  created_at: String,
});
module.exports = mongoose.model("Firma", FirmaSchema);
