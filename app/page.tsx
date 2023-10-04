import { Typography } from '@/components/ui/Typography';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 items-center mt-4">
      <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
        YouCode
      </h1>
      <Typography variant="lead">
        The interactive learning platform for developers <i>(only)</i>
      </Typography>
      <div className="max-w-4xl m-auto flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Create your own courses</CardTitle>
            <CardDescription>
              Quickly create your courses with interactive video and code editor.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Follow the courses of creator</CardTitle>
            <CardDescription>
              Easily find best courses with the explorer !
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
