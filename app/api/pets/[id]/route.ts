import dbConnect from "@/lib/dbConnect"
import Pet from "@/models/Pet"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  await dbConnect()
  try {
    const pet = await Pet.findById(
      context.params.id
    ) /* find all the data in our database */
    if (!pet) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
    return NextResponse.json({ success: true, data: pet })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const body = await request.json()
  await dbConnect()
  try {
    const { id } = context.params

    if (body) {
      const pet = await Pet.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      })
      if (!pet) {
        return NextResponse.json({ success: false }, { status: 400 })
      }
      return NextResponse.json({ success: true, data: pet })
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await dbConnect()
  try {
    const { id } = context.params

    const deletedPet = await Pet.deleteOne({ _id: id })
    console.log(deletedPet)

    if (!deletedPet.deletedCount) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
    return NextResponse.json({ success: true, message: "delete successfully" })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
