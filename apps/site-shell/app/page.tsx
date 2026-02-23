import { HeroSection } from '@/components/HeroSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WorkbenchProjects } from '@/components/WorkbenchProjects';
import { getAllPostsForIndex } from '@/lib/mdx/loader';
import { LatestPosts } from '@/components/LatestPosts';

export default function Home() {
  const latestPosts = getAllPostsForIndex({ limit: 4 });

  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturedProjects />
      <WorkbenchProjects />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
