import mongoose from "mongoose"

export interface Pets extends mongoose.Document {
  name: string
  ownerName: string
  age: number
}

export interface PetsWithID extends Pets {
  id: string
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetSchema = new mongoose.Schema<Pets>({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  ownerName: {
    /* The owner of this pet */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  age: {
    /* Pet's age, if applicable */

    type: Number,
  },
})

PetSchema.virtual("id").get(function () {
  return this._id.toString()
})

PetSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id // Remove '_id' field
    delete ret.__v // Remove '__v' field (if present)
  },
})

export default mongoose.models.Pet || mongoose.model<Pets>("Pet", PetSchema)
