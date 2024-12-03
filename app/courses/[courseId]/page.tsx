import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/next-auth";
import { notFound } from "next/navigation";
import { Course } from "./Course";
import { getCourse } from "./course.query";

export default async function CoursePage(props: {
  params: Promise<{
    courseId: string;
  }>;
}) {
  const params = await props.params;
  const session = await getAuthSession();

  const course = await getCourse(params.courseId, session?.user.id);

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Course course={course} />
      </LayoutContent>
    </Layout>
  );
}
