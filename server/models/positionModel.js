const mongoose = require("mongoose");
const positionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        
          },
          AccessPriority: {
            type: Number,
            required: true,
          default:4,
          },
    }
)
module.exports= mongoose.model("position", positionSchema);
