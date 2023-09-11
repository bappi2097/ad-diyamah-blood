import mongoose from "mongoose"

export interface UserType extends mongoose.Document {
  name: string
  email: string
  password: string
}

export interface UserWithID extends UserType {
  id: string
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: [true, "Please provide name."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    validate: [
      (email: string) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return re.test(email)
      },
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
})

UserSchema.virtual("id").get(function () {
  return this._id.toString()
})

UserSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id // Remove '_id' field
    delete ret.__v // Remove '__v' field (if present)
  },
})

export default mongoose.models.User ||
  mongoose.model<UserType>("User", UserSchema)
