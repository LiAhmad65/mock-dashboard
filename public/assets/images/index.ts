// Image paths object
// Map image names to their file paths
export const images = {
  // Add your image paths here
  // Example:
  // logo: "/images/logo.png",
  // avatar: "/images/avatar.jpg",
  // banner: "/images/banner.svg",
} as const;

export type ImageName = keyof typeof images;
