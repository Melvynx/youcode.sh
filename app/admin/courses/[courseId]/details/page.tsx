import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function page() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course details</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Edit</CardTitle>
          </CardHeader>
          <CardContent>Fix</CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
