
import React from "react";
import { Check, X, Clock, Users, Zap } from "lucide-react";

const ProblemStatement = () => {
  const problems = [
    {
      icon: <X className="h-6 w-6 text-purple-500" />,
      text: "Your website isn't bringing in new clients – it just 'exists' online."
    },
    {
      icon: <Check className="h-6 w-6 text-purple-500 opacity-0" />,
      text: "Your ads don't convert, and you have no clear strategy."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      text: "You don't have time to find a developer, marketer, and copywriter separately."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      text: "Visitors come, but no one books, calls, or buys."
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      text: "You feel behind with AI tools and modern tech."
    }
  ];

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white">
            Do any of these sound <span className="text-[#8A2BE2]">familiar</span>?
          </h2>
          
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-4 bg-zinc-900/50 p-5 rounded-lg border border-zinc-800">
                <div className="mt-1 flex-shrink-0">
                  {problem.icon}
                </div>
                <p className="text-white/90 text-lg">{problem.text}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-12 text-center text-white text-xl font-light">
            It doesn't have to be this way. The solution is <span className="font-medium text-[#8A2BE2]">simpler</span> than you think.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
