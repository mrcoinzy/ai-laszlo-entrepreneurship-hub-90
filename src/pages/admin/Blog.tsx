import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash, Image, Eye, Book, FileText, Clock } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { setupImagesBucket, uploadImageToBucket } from "@/lib/supabase-storage";

const Blog = () => {
  const { isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState<"posts" | "create">("posts");
  const [bucketChecked, setBucketChecked] = useState(false);
  const [bucketConfirmed, setBucketConfirmed] = useState(false);
  const [keywords, setKeywords] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkImagesBucket = async () => {
      try {
        console.log("Checking if images bucket exists...");
        const exists = await setupImagesBucket();
        setBucketChecked(true);
        
        if (exists) {
          console.log("Images bucket confirmed to be accessible");
          setBucketConfirmed(true);
        } else {
          console.error("Failed to confirm images bucket");
          toast.error("Failed to confirm images bucket. Image uploads may not work.");
        }
      } catch (error) {
        console.error("Error checking images bucket:", error);
        toast.error("Error checking storage bucket");
      }
    };

    if (!bucketChecked) {
      checkImagesBucket();
    }
  }, [bucketChecked]);

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const uploadImage = async (file: File) => {
    try {
      setUploadProgress(0);
      
      const publicUrl = await uploadImageToBucket(file);
      
      setUploadProgress(100);
      return publicUrl;
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const createPostMutation = useMutation({
    mutationFn: async (values: { 
      title: string; 
      content: string; 
      excerpt: string;
      keywords: string;
      imageFile?: File | null;
    }) => {
      try {
        setIsSubmitting(true);
        console.log("Starting blog post creation...");
        
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error(authError?.message || "Not authenticated");
        }

        let featuredImageUrl = null;
        
        if (values.imageFile) {
          try {
            console.log("Uploading featured image...");
            featuredImageUrl = await uploadImage(values.imageFile);
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
            throw new Error(`Image upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
          }
        }

        console.log("Creating blog post in database...");
        console.log("Author ID:", user.id);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([
            {
              title: values.title,
              content: values.content,
              excerpt: values.excerpt || values.content.substring(0, 150) + "...",
              keywords: values.keywords,
              author_id: user.id,
              published: true,
              featured_image_url: featuredImageUrl
            }
          ])
          .select();

        if (error) {
          console.error("Database error:", error);
          throw error;
        }
        
        console.log("Blog post created successfully:", data);
        return data;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success("Blog post created successfully");
      setTitle("");
      setContent("");
      setExcerpt("");
      setSelectedImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      setTab("posts");
      setKeywords("");
    },
    onError: (error: any) => {
      console.error("Blog post creation error:", error);
      toast.error(`Failed to create blog post: ${error.message || 'Unknown error'}`);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Maximum size is 5MB.");
      return;
    }
    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, GIF or WebP image.");
      return;
    }
    
    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please enter content for your post");
      return;
    }
    
    createPostMutation.mutate({ 
      title, 
      content, 
      excerpt,
      keywords,
      imageFile: selectedImage
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const renderPostList = () => {
    if (isLoadingPosts) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      );
    } 
    
    if (posts && posts.length > 0) {
      return (
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
                        <span>{formatDate(post.created_at)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                    >
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
                {post.featured_image_url && (
                  <div className="mt-3">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    return (
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
    );
  };

  const renderCreatePostForm = () => (
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
          placeholder="Brief summary of the post (optional)"
        />
        <p className="text-xs text-muted-foreground">
          If left empty, an excerpt will be generated from the content.
        </p>
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
        <label htmlFor="keywords" className="text-sm font-medium">
          Keywords
        </label>
        <Input
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords separated by commas"
        />
        <p className="text-xs text-muted-foreground">
          Add keywords to help with SEO, separated by commas (e.g., web development, react, typescript)
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center justify-between">
          <span>Featured Image {bucketConfirmed ? "" : "(Storage bucket not verified)"}</span>
          {bucketConfirmed ? (
            <span className="text-xs text-green-500">Storage ready</span>
          ) : (
            <span className="text-xs text-orange-500">Storage not verified</span>
          )}
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
                  setUploadProgress(0);
                }}
              >
                <Trash size={16} />
              </Button>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                  Uploading: {uploadProgress}%
                </div>
              )}
            </div>
          ) : (
            <label htmlFor="imageUpload" className={`cursor-pointer ${!bucketConfirmed ? 'opacity-70' : ''}`}>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 flex flex-col items-center justify-center">
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {bucketConfirmed 
                    ? "Click to upload an image (5MB max, JPG/PNG/GIF/WebP)" 
                    : "Storage not verified - image uploads may not work"
                  }
                </p>
              </div>
              <input 
                id="imageUpload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
                disabled={!bucketConfirmed}
              />
            </label>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="relative"
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Create Post</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
              </span>
            </>
          ) : (
            "Create Post"
          )}
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
  );

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
              {renderPostList()}
            </TabsContent>
            
            <TabsContent value="create">
              {renderCreatePostForm()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Blog;
