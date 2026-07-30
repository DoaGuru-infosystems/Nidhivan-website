import { store } from '../store/store';

// Default to localhost if env var is missing during dev
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api';

/**
 * Resolves media URLs. Handles absolute URLs (e.g. Unsplash, blob) and relative backend paths.
 * @param {string} filename 
 * @returns {string}
 */
export const getMediaUrl = (filename) => {
  if (!filename) return '';
  // If it's already a full HTTP/HTTPS URL or Blob, return as is
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('blob:')) {
    return filename;
  }
  // Strip '/api' from BASE_URL to point to the server root for public uploads
  const serverUrl = BASE_URL.replace('/api', '');
  return `${serverUrl}/public/uploads/${filename}`;
};

/**
 * Generic API Call wrapper with fallback logic
 * @param {string} endpoint - The API endpoint (e.g., '/user-data')
 * @param {object} options - Fetch options (method, body, etc.)
 * @param {any} fallbackData - Data to return if the API fails
 * @param {boolean} isMultipart - If true, don't set Content-Type header
 * @returns {Promise<any>}
 */
const apiCall = async (endpoint, options = {}, fallbackData = null) => {
  const token = store.getState().auth.user?.token;
  
  const headers = new Headers();
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  // Only set Content-Type to application/json if it's NOT a multipart request (FormData)
  if (!options.isMultipart && !headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json');
  }

  // Allow custom headers to override
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headers.set(key, value);
    }
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    // 10-second timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);
    fetchOptions.signal = controller.signal;

    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Fallback] Request to ${endpoint} failed:`, error.message);
    if (fallbackData !== null) {
      console.warn(`[API Fallback] Returning dummy data for ${endpoint}`);
      return fallbackData;
    }
    throw error; // If no fallback provided, throw the error (e.g., for login)
  }
};

// ==========================================
// Admin Login
// ==========================================
export const loginAdminApi = async (email, password) => {
  const response = await fetch(`${BASE_URL.replace('/api', '')}/auth/admin/api/Sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const registerAdminApi = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

// ==========================================
// Contact Leads
// ==========================================
import { DUMMY_LEADS } from '../components/Pages/admin/ContactLeadsManagement'; // We will export it

export const fetchContactLeads = () => 
  apiCall('/user-data', { method: 'GET' }, DUMMY_LEADS);

export const deleteContactLead = (id) => 
  apiCall(`/user-data/${id}`, { method: 'DELETE' }, { success: true });

export const submitContactForm = (formData) => 
  apiCall('/contact', { method: 'POST', body: JSON.stringify(formData) }, { success: true });

// ==========================================
// Testimonials
// ==========================================
import { testimonialsDummyData } from '../data/dummy-data/testimonialsDummyData';

export const fetchAllTestimonials = () => 
  apiCall('/testimonials/getAllTestimonials', { method: 'GET' }, testimonialsDummyData);

export const fetchTestimonialById = (id) => 
  apiCall(`/testimonials/getTestimonialById/${id}`, { method: 'GET' }, testimonialsDummyData.find(t => t.id.toString() === id.toString()) || null);

export const createTestimonial = (formData) => 
  apiCall('/testimonials/createTestimonial', { method: 'POST', body: formData, isMultipart: true }, { success: true });

export const updateTestimonial = (id, formData) => 
  apiCall(`/testimonials/updateTestimonial/${id}`, { method: 'PUT', body: formData, isMultipart: true }, { success: true });

export const deleteTestimonial = (id) => 
  apiCall(`/testimonials/deleteTestimonial/${id}`, { method: 'DELETE' }, { success: true });

// ==========================================
// Blogs
// ==========================================
import { blogDummyData } from '../data/dummy-data/blogDummyData';

export const fetchAllBlogsAdmin = () => 
  apiCall('/blogs/allBlogsForAdmin', { method: 'GET' }, blogDummyData);

export const fetchAllBlogsClient = () => 
  apiCall('/blogs/allBlogs', { method: 'GET' }, blogDummyData);

export const fetchBlogBySlug = (slug) => 
  apiCall(`/blogs/${slug}`, { method: 'GET' }, blogDummyData.find(b => b.slug === slug) || null);

export const fetchBlogById = (id) => 
  apiCall(`/blogs/blogGetForEditing/${id}`, { method: 'GET' }, blogDummyData.find(b => b.id.toString() === id.toString()) || null);

export const createBlog = (formData) => 
  apiCall('/blogs/admin-create', { method: 'POST', body: formData, isMultipart: true }, { success: true });

export const updateBlog = (id, formData) => 
  apiCall(`/blogs/adminUpdateBlog/${id}`, { method: 'PUT', body: formData, isMultipart: true }, { success: true });

export const deleteBlog = (id) => 
  apiCall(`/blogs/deleteByAdmin/${id}`, { method: 'DELETE' }, { success: true });

// ==========================================
// Gallery
// ==========================================
import { galleryDummyData } from '../data/dummy-data/galleryDummyData';

export const fetchGalleryCategories = () => 
  apiCall('/features/gallery-categories', { method: 'GET' }, [{ id: 1, title: 'General', thumbnail_image: '' }]);

export const createGalleryCategory = (formData) => 
  apiCall('/features/gallery-categories', { method: 'POST', body: formData, isMultipart: true }, { success: true, insertId: Date.now() });

export const deleteGalleryCategory = (id) =>
  apiCall(`/features/gallery-categories/${id}`, { method: 'DELETE' }, { success: true });

export const fetchImagesByCategory = (categoryId) => 
  apiCall(`/features/gallery-images/category/${categoryId}`, { method: 'GET' }, galleryDummyData);

export const fetchAllGalleryImages = () => 
  apiCall('/features/gallery-images', { method: 'GET' }, galleryDummyData);

export const createGalleryImages = (formData) => 
  apiCall('/features/gallery-images', { method: 'POST', body: formData, isMultipart: true }, { success: true });

export const deleteGalleryImage = (id) => 
  apiCall(`/features/gallery-images/${id}`, { method: 'DELETE' }, { success: true });

// ==========================================
// Projects
// ==========================================
import { projectsDummyData } from '../data/dummy-data/projectsDummyData';

export const fetchAllProjects = () => 
  apiCall('/projects/allProjects', { method: 'GET' }, projectsDummyData);

export const createProject = (formData) => 
  apiCall('/projects/createProject', { method: 'POST', body: formData, isMultipart: true }, { success: true });

export const updateProject = (id, formData) => 
  apiCall(`/projects/adminUpdateProject/${id}`, { method: 'PUT', body: formData, isMultipart: true }, { success: true });

export const deleteProject = (id) => 
  apiCall(`/projects/deleteByAdmin/${id}`, { method: 'DELETE' }, { success: true });

export const fetchProjectById = (id) => 
  apiCall(`/projects/getProject/${id}`, { method: 'GET' }, projectsDummyData.find(p => p.id.toString() === id.toString()) || null);
