import { blogDummyData } from '../data/dummy-data/blogDummyData';
import { galleryDummyData } from '../data/dummy-data/galleryDummyData';
import { testimonialsDummyData } from '../data/dummy-data/testimonialsDummyData';
import { projectsDummyData } from '../data/dummy-data/projectsDummyData';

// Generic helper: get data for an entity, seeding from the base file on first load
function getEntityData(storageKey, seedData) {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // corrupted data, fallback to seed
      console.warn(`Corrupted data for ${storageKey}, resetting to seed data.`);
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(seedData));
  return seedData;
}

function saveEntityData(storageKey, data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// Blogs
export function getBlogs() {
  return getEntityData('nidhivan_blogs', blogDummyData);
}
export function saveBlogs(blogs) {
  saveEntityData('nidhivan_blogs', blogs);
}

// Gallery
export function getGalleryItems() {
  return getEntityData('nidhivan_gallery', galleryDummyData);
}
export function saveGalleryItems(gallery) {
  saveEntityData('nidhivan_gallery', gallery);
}

// Testimonials
export function getTestimonials() {
  return getEntityData('nidhivan_testimonials', testimonialsDummyData);
}
export function saveTestimonials(testimonials) {
  saveEntityData('nidhivan_testimonials', testimonials);
}

// Projects
export function getProjects() {
  return getEntityData('nidhivan_projects', projectsDummyData);
}
export function saveProjects(projects) {
  saveEntityData('nidhivan_projects', projects);
}
