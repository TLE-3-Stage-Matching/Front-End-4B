import { Check, CircleUserRound, Mail, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";

function StudentCard({ student }: {student: any}) {
  return (
    <Card className="h-full">
      <CardContent className="flex items-center gap-2">
        <div className="flex w-full items-center gap-2">
          <div className="h-15 w-15 rounded-full bg-primary">
            <CircleUserRound
              strokeWidth={1.2}
              className="h-full w-full text-creme"
            />
          </div>
          <div className="flex-2">
            <div className="flex gap-1">
              <p className="text-md font-bold">{student.first_name}</p>
              <p className="text-md font-bold">{student.last_name}</p>
            </div>
            <p className="text-sm">{student.email}</p>
          </div>
          <div className="flex flex-2 items-center">
            <p>Stage gevonden:</p>
            {student.student_profile.searching_status ? (
              <Check className="h-6" />
            ) : (
              <X className="h-6" />
            )}
          </div>
          <div className="flex gap-2">
            <Link to={"/"}>
              <Mail strokeWidth={1.5} className={"h-10 w-10"} />
            </Link>
            <Link to={"/"}>
              <CircleUserRound
                strokeWidth={1.5}
                className="h-10 w-10 text-dark-teal"
              />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentCard;
