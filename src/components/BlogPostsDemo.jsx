import React from 'react';
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost } from '../hooks/useBlogPosts'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorMessage from './ui/ErrorMessage'

const BlogPostsDemo = () => {
  const { data: blogPosts, isLoading, error, refetch } = useBlogPosts()
  const createBlogPostMutation = useCreateBlogPost()
  const deleteBlogPostMutation = useDeleteBlogPost()

  const handleCreatePost = () => {
    createBlogPostMutation.mutate({
      title: 'New Blog Post',
      content: 'This is a sample blog post created with React Query',
      author: 'Demo User',
      published: false
    })
  }

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteBlogPostMutation.mutate(id)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts Demo</h1>
        <div className="flex gap-2">
          <Button onClick={refetch} variant="outline">
            Refresh
          </Button>
          <Button onClick={handleCreatePost} disabled={createBlogPostMutation.isLoading}>
            {createBlogPostMutation.isLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </div>

      {createBlogPostMutation.isError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error creating post: {createBlogPostMutation.error.message}
        </div>
      )}

      {createBlogPostMutation.isSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Post created successfully!
        </div>
      )}

      <div className="grid gap-4">
        {blogPosts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>By {post.author}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={post.published ? 'default' : 'secondary'}>
                    {post.published ? 'Published' : 'Draft'}
                  </Badge>
                  <Button
                    onClick={() => handleDeletePost(post.id)}
                    variant="destructive"
                    size="sm"
                    disabled={deleteBlogPostMutation.isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}

        {blogPosts?.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No blog posts found.</p>
              <Button onClick={handleCreatePost} className="mt-4">
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default BlogPostsDemo
