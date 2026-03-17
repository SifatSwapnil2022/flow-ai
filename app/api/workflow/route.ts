import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const session = await getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const workflows = await prisma.workflow.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: workflows,
    });

  } catch (error) {
    console.error("[GET /workflows]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workflows" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const session = await getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    const workflow = await prisma.workflow.create({
      data: {
        name: name.trim(),
        description: description?.trim() || "",
        userId: user.id,
      },
    });

    return NextResponse.json(
      { success: true, data: workflow },
      { status: 201 }
    );

  } catch (error) {
    console.error("[POST /workflows]", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}