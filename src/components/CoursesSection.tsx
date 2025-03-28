
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, DollarSign, Rocket, BarChart2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "AI Prompt Engineering Course",
    description: "Master the art of prompt engineering to get the most out of AI tools.",
    icon: <Zap className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: true
  },
  {
    id: 2,
    title: "Start with $0",
    description: "Learn how to bootstrap your business without initial capital.",
    icon: <DollarSign className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: false
  },
  {
    id: 3,
    title: "10 AI Software That Works 20x Faster",
    description: "Discover AI tools that will dramatically increase your productivity.",
    icon: <Rocket className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: false
  },
  {
    id: 4,
    title: "Marketing Course",
    description: "Learn modern marketing strategies to grow your business effectively.",
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: false
  },
  {
    id: 5,
    title: "Vibe Coding Step by Step",
    description: "Learn coding with a focus on creating visually appealing interfaces.",
    icon: <Code className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: false
  }
];

const CoursesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            Free Courses to Accelerate Your Journey
          </h2>
          <p className="text-lg text-white/70">
            Access expert knowledge and proven strategies through these free courses designed
            to help you launch and scale your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className={`bg-accent/30 border-accent hover:border-white/30 transition-all duration-300 card-hover ${
                course.featured ? "relative overflow-hidden" : ""
              }`}
            >
              {course.featured && (
                <div className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  {course.icon}
                </div>
                <CardTitle className="text-xl gradient-text">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/courses/${course.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between group">
                    <span>{course.buttonText}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
