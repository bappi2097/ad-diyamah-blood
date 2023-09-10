import dbConnect from "@/lib/dbConnect"
import Pet, { PetsWithID } from "@/models/Pet"
import { NextResponse } from "next/server"

export async function GET() {
  await dbConnect()
  try {
    const pets: PetsWithID[] = await Pet.find({})
    return NextResponse.json({ success: true, data: pets })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  await dbConnect()
  try {
    const pet = await Pet.create(body)
    return NextResponse.json({ success: true, data: pet }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
