import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolWorkbench } from "@/components/tool-workbench";
import { getTool, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool not found" };
  return { title: tool.seoTitle, description: tool.seoDescription, alternates: { canonical: `/tools/${tool.slug}` }, openGraph: { title: tool.seoTitle, description: tool.seoDescription, type: "website" } };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <ToolWorkbench tool={tool} />;
}
