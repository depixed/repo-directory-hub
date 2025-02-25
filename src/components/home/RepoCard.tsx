
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface RepoCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
}

export function RepoCard({ name, description, stars, forks, language }: RepoCardProps) {
  return (
    <Link to={`/repository/${name}`}>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="text-sm">{stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span className="text-sm">{forks}</span>
            </div>
          </div>
          <Badge variant="secondary">{language}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
