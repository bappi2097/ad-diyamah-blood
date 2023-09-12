import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User, { UserType, UserWithID } from "@/models/User"

interface iUserType extends UserType {
  id: string
}

const response = (user: iUserType): UserWithID => ({
  id: user.id,
  name: user.name,
  email: user.email,
})

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const user: iUserType | null = await User.findOne({ _id: params.id })
    if (user) return NextResponse.json({ user: response(user) })
    else return NextResponse.json({ message: "No User Found" }, { status: 400 })
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    )
  }
}
