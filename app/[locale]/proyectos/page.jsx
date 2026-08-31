import { getDict } from "@/lib/i18n";
import { getPublishedProjects } from "@/lib/airtable";
import ProjectGrid from "@/components/ProjectGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const projects = await getPublishedProjects();

  return (
    <div style={{ paddingTop: "var(--space-2xl)" }}>
      <ProjectGrid locale={locale} projects={projects} showFilters heading />
    </div>
  );
}
