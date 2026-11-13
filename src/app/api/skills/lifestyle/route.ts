import { handleSkillsPost, methodNotAllowedResponse } from "@/lib/skills-api/handle-skills-post";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleSkillsPost(request, "lifestyle");
}

export function GET(): Response {
  return methodNotAllowedResponse();
}

export function PUT(): Response {
  return methodNotAllowedResponse();
}

export function PATCH(): Response {
  return methodNotAllowedResponse();
}

export function DELETE(): Response {
  return methodNotAllowedResponse();
}
