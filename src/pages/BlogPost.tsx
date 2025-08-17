import { Calendar, User, ArrowLeft, Clock, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link, useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  // In a real app, you'd fetch the blog post based on the slug
  const blogPost = {
    id: 'web-development-trends-2024',
    title: 'The Future of Web Development: Top Trends to Watch in 2024',
    excerpt: 'Discover the latest web development trends that will shape the industry, from AI integration to progressive web apps.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Web Development',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
    content: `
      <p>The web development landscape is constantly evolving, driven by technological advancements, changing user expectations, and emerging business needs. As we navigate through 2024, several key trends are reshaping how we build and interact with web applications.</p>

      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the development process. From AI-assisted code completion to automated testing and bug detection, developers are leveraging AI to increase productivity and code quality. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow.</p>

      <h3>Key Benefits:</h3>
      <ul>
        <li>Faster development cycles</li>
        <li>Improved code quality and consistency</li>
        <li>Automated documentation generation</li>
        <li>Intelligent error detection and suggestions</li>
      </ul>

      <h2>2. Progressive Web Apps (PWAs) Evolution</h2>
      <p>Progressive Web Apps continue to bridge the gap between web and native applications. With improved offline capabilities, push notifications, and app-like experiences, PWAs are becoming the preferred choice for businesses looking to provide seamless user experiences across all devices.</p>

      <h2>3. Jamstack Architecture Maturity</h2>
      <p>The Jamstack (JavaScript, APIs, and Markup) architecture has matured significantly, offering developers a modern approach to building fast, secure, and scalable websites. With improved tooling and better integration with headless CMS solutions, Jamstack is becoming mainstream.</p>

      <h2>4. WebAssembly (WASM) Adoption</h2>
      <p>WebAssembly is enabling high-performance applications to run in the browser, opening up possibilities for complex applications like video editing, gaming, and scientific computing to be delivered through web technologies.</p>

      <h2>5. Enhanced Developer Experience (DX)</h2>
      <p>The focus on developer experience continues to drive innovation in tooling, with improvements in build systems, hot module replacement, and development environments that prioritize speed and efficiency.</p>

      <h2>Conclusion</h2>
      <p>As we move forward in 2024, these trends will continue to shape the web development landscape. Staying updated with these developments and understanding their implications will be crucial for developers and businesses looking to build competitive web applications.</p>

      <p>The future of web development is exciting, with technologies that promise to make development more efficient, applications more powerful, and user experiences more engaging than ever before.</p>
    `
  };

  const relatedPosts = [
    {
      id: 'mobile-app-design-principles',
      title: 'Essential Mobile App Design Principles for Better User Experience',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
    },
    {
      id: 'api-integration-guide',
      title: 'Complete Guide to API Integration for Modern Applications',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary text-white px-4 py-2 rounded-full font-medium">
                {blogPost.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
                  {blogPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6 animate-fade-in [animation-delay:200ms]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-in [animation-delay:400ms]">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                </div>
              </header>

              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground animate-fade-in [animation-delay:600ms]"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-card rounded-2xl border border-border animate-fade-in [animation-delay:800ms]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">About {blogPost.author}</h3>
                    <p className="text-muted-foreground">
                      Sarah is a senior web developer with over 8 years of experience in full-stack development. 
                      She specializes in React, Node.js, and cloud architecture, and is passionate about sharing 
                      knowledge with the developer community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Related Posts */}
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in [animation-delay:400ms]">
                  <h3 className="font-bold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-3">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 animate-fade-in [animation-delay:600ms]">
                  <h3 className="font-bold text-foreground mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;