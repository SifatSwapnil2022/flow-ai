import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma"; // ✅ default import

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    const flowObject = JSON.parse(workflow.flowObject) as unknown; // ✅ no external type needed

    return NextResponse.json({
      success: true,
      data: {
        id: workflow.id,
        name: workflow.name,
        flowObject,
      },
    });
  } catch (error) {
    console.error("[WORKFLOW_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}