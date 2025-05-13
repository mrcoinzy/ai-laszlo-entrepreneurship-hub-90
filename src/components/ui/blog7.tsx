import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import AnimatedSection from "../ui/animated-section";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id?: string;
  created_at: string;
  featured_image_url?: string;
  excerpt?: string;
  published: boolean;
  keywords?: string;
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Post[];
  gridClassName?: string;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Stay updated with our latest insights, tips, and expert knowledge. Discover trends and best practices in modern web development and design.",
  buttonText = "View all articles",
  buttonUrl = "/blog",
  posts = [],
  gridClassName = "grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
}: Blog7Props) => {
  const isMobile = useIsMobile();
  
  return (
    <AnimatedSection className="py-8 sm:py-12 lg:py-24 relative w-full" mobilePadding={isMobile ? "small" : "medium"}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-40"></div>
      </div>

      <div className="w-full max-w-full flex flex-col items-center gap-4 sm:gap-6 lg:gap-12 px-4 sm:px-6">
        <motion.div 
          className="text-center w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-2 sm:mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs sm:text-sm">
            {tagline}
          </Badge>
          <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl lg:text-4xl font-semibold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="mb-4 sm:mb-6 text-white/70 text-sm sm:text-base lg:text-lg px-2 sm:px-0">
            {description}
          </p>
          <Button variant="outline" className="w-auto border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30" asChild>
            <Link to={buttonUrl}>
              <span className="text-sm">{buttonText}</span>
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          className={`w-full max-w-full ${gridClassName}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full w-full"
            >
              <Card className="grid grid-rows-[auto_auto_auto_auto] h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/30 transition-all duration-300">
                {post.featured_image_url && (
                  <div className="w-full overflow-hidden">
                    <Link to={`/blog/${post.id}`} className="transition-opacity duration-200 fade-in hover:opacity-70 block">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        />
                      </AspectRatio>
                    </Link>
                  </div>
                )}
                <div className="px-3 sm:px-4 pt-3 space-y-1">
                  {post.keywords && (
                    <div className="flex flex-wrap gap-1">
                      {post.keywords.split(',').slice(0, isMobile ? 2 : 3).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <CardHeader className="px-3 sm:px-4 py-2">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold hover:text-purple-300 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-white/50">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </p>
                </CardHeader>
                <CardContent className="px-3 sm:px-4 py-1">
                  <p className="text-xs sm:text-sm text-white/70 line-clamp-3">
                    {post.excerpt || post.content.substring(0, isMobile ? 80 : 120)}...
                  </p>
                </CardContent>
                <CardFooter className="px-3 sm:px-4 pt-1 pb-4 mt-auto">
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center text-purple-300 hover:text-purple-200 transition-colors text-xs sm:text-sm group"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export { Blog7 };
