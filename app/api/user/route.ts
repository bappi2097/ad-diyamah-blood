import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User, { UserType } from "@/models/User"

export async function POST(req: Request) {
  await dbConnect()
  try {
    const { name, email, password } = (await req.json()) as UserType
    const hashed_password = await hash(password, 12)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed_password,
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    console.log(error)

    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    )
  }
}
