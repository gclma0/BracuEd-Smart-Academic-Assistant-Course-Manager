import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course, Enrollment, Profile } from "@prisma/client";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type CourseWithFacultyAndEnrollment = Course & {
  faculty: Pick<Profile, "name">;
  Enrollment: Enrollment[];
};

export default function CourseCard({
  course,
  role,
}: {
  course: CourseWithFacultyAndEnrollment;
  role: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{course.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm mb-2">
            Course code: {course.courseCode.toUpperCase()}
          </div>
          {role === "STUDENT" ? (
            <div className="flex items-center text-sm">
              <User className="mr-1 h-3 w-3" />
              Faculty: {course.faculty.name}
            </div>
          ) : (
            <div className="flex items-center text-sm">
              <User className="mr-1 h-3 w-3" />
              {course.Enrollment.length}{" "}
              {course.Enrollment.length > 1 ? "students" : "student"} enrolled
            </div>
          )}

          <div className="flex items-center text-sm mt-1">
            <Calendar className="mr-1 h-3 w-3" />
            {course.days[0]}-{course.days[1]}
          </div>
          <div className="flex items-center text-sm mt-1">
            <Calendar className="mr-1 h-3 w-3" />
            {course.schedule}
          </div>
          <div className="flex items-center text-sm mt-1">
            <Clock className="mr-1 h-3 w-3" />
            Created: {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {course.description}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`#`} className="w-full">
          <Button variant="outline" className="w-full">
            {role === "FACULTY" ? "Manage Course" : "View Course"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
