import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash, Image, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const Blog = () => {
  const { isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState<"posts" | "create">("posts");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (values: { title: string; content: string; excerpt: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            author_id: userData.user.id,
            published: true
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success("Blog post created successfully");
      setTitle("");
      setContent("");
      setExcerpt("");
      setTab("posts");
    },
    onError: (error) => {
      toast.error("Failed to create blog post: " + error.message);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({ title, content, excerpt });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Blog Management</h1>
            {tab === "posts" && (
              <Button onClick={() => setTab("create")} className="flex items-center gap-2">
                <Plus size={16} />
                <span>New Post</span>
              </Button>
            )}
            {tab === "create" && (
              <Button variant="outline" onClick={() => setTab("posts")} className="flex items-center gap-2">
                <Book size={16} />
                <span>View Posts</span>
              </Button>
            )}
          </div>
          
          <Tabs value={tab} onValueChange={(value) => setTab(value as "posts" | "create")}>
            <TabsList className="mb-6">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText size={16} />
                <span>All Posts</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus size={16} />
                <span>Create Post</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              {posts.length > 0 ? (
                <div className="grid gap-4">
                  {posts.map(post => (
                    <Card key={post.id} className="bg-accent/5">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center gap-2 mt-1 text-xs">
                                <Clock size={14} className="text-muted-foreground" />
                                <span>{formatDate(post.createdAt)}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                  {post.published ? 'Published' : 'Draft'}
                                </span>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-accent/5">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Book className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No blog posts yet</h3>
                    <p className="text-muted-foreground mb-4 text-center">
                      Create your first blog post to share with your audience
                    </p>
                    <Button onClick={() => setTab("create")}>
                      Create Your First Post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="create">
              <Card className="bg-accent/5">
                <CardHeader>
                  <CardTitle>Create New Blog Post</CardTitle>
                  <CardDescription>
                    Create and publish a new blog post to your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="excerpt" className="text-sm font-medium">
                        Excerpt
                      </label>
                      <Input
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief summary of the post"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="content" className="text-sm font-medium">
                        Content
                      </label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog post content here..."
                        rows={10}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="featuredImage" className="text-sm font-medium">
                        Featured Image
                      </label>
                      <div className="mt-1">
                        {previewUrl ? (
                          <div className="relative">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-md" 
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setSelectedImage(null);
                                setPreviewUrl(null);
                              }}
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        ) : (
                          <label htmlFor="imageUpload" className="cursor-pointer">
                            <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 flex flex-col items-center justify-center">
                              <Image className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Click to upload an image</p>
                            </div>
                            <input 
                              id="imageUpload" 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageChange} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Post"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setTab("posts")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Blog;
