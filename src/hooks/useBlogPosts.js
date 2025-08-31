import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resourcesService } from '../lib/resourcesService';

export const useBlogPosts = (params = {}) => {
  return useQuery(
    ['blogPosts', params],
    () => resourcesService.getBlogPosts(params),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useBlogPost = (id) => {
  return useQuery(
    ['blogPost', id],
    () => resourcesService.getBlogPost(id),
    {
      enabled: !!id, // Only run query if id exists
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (postData) => resourcesService.createBlogPost(postData),
    {
      onSuccess: () => {
        // Invalidate and refetch blog posts
        queryClient.invalidateQueries(['blogPosts']);
      },
      onError: (error) => {
        console.error('Failed to create blog post:', error);
      }
    }
  );
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updates }) => resourcesService.updateBlogPost(id, updates),
    {
      onSuccess: (data, variables) => {
        // Update the specific blog post in cache
        queryClient.setQueryData(['blogPost', variables.id], data);
        // Invalidate the list to ensure consistency
        queryClient.invalidateQueries(['blogPosts']);
      },
      onError: (error) => {
        console.error('Failed to update blog post:', error);
      }
    }
  );
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => resourcesService.deleteBlogPost(id),
    {
      onSuccess: () => {
        // Invalidate blog posts list
        queryClient.invalidateQueries(['blogPosts']);
      },
      onError: (error) => {
        console.error('Failed to delete blog post:', error);
      }
    }
  );
};
