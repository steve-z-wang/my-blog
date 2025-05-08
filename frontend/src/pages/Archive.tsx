import { Link } from "react-router-dom";
import { Post } from "@my-blog/common";
import { Page, Section } from "../components";

interface ArchiveProps {
  posts: Post[];
}

// Type definitions to make the data structure clearer
interface MonthGroup {
  month: string;
  posts: Post[];
}

interface YearGroup {
  year: string;
  months: MonthGroup[];
  postCount: number;
}

function Archive({ posts }: ArchiveProps) {
  // Group posts by year and month (O(n) time complexity)
  const yearMonthMap: Record<string, Record<string, Post[]>> = {};
  
  // Process each post once - O(n)
  posts.forEach(post => {
    const date = new Date(post.publishedAt * 1000);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("en-US", { month: "long" });
    
    // Initialize year and month objects if they don't exist
    yearMonthMap[year] = yearMonthMap[year] || {};
    yearMonthMap[year][month] = yearMonthMap[year][month] || [];
    
    // Add post to the appropriate group
    yearMonthMap[year][month].push(post);
  });
  
  // Month order for consistent sorting
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Transform into structured data for rendering
  const archiveData: YearGroup[] = Object.entries(yearMonthMap).map(([year, months]) => {
    // For each year, create a sorted array of month objects
    const monthsArray: MonthGroup[] = Object.entries(months)
      .map(([month, monthPosts]) => ({
        month,
        posts: monthPosts
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    
    // Count posts in this year
    const postCount = monthsArray.reduce((sum, month) => sum + month.posts.length, 0);
    
    return {
      year,
      months: monthsArray,
      postCount
    };
  });
  
  // Sort years in descending order (newest first)
  const sortedArchiveData = archiveData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  
  return (
    <Page>
      <Section>
        <h1 className="text-3xl font-bold mb-8">Archive</h1>
        
        {sortedArchiveData.map(yearGroup => (
          <div key={yearGroup.year} className="mb-10">
            <h2 className="text-2xl font-bold flex items-center">
              {yearGroup.year}
              <span className="text-sm ml-2 text-gray-500 font-normal">
                ({yearGroup.postCount})
              </span>
            </h2>

            {yearGroup.months.map(monthGroup => (
              <div key={`${yearGroup.year}-${monthGroup.month}`} className="mt-4 ml-4">
                <h3 className="text-xl font-medium flex items-center">
                  {monthGroup.month}
                  <span className="text-sm ml-2 text-gray-500 font-normal">
                    ({monthGroup.posts.length})
                  </span>
                </h3>
                
                <ul className="ml-4 mt-2 space-y-3">
                  {monthGroup.posts
                    // Sort posts by day (most recent first)
                    .sort((a, b) => new Date(b.publishedAt * 1000).getDate() - 
                                    new Date(a.publishedAt * 1000).getDate())
                    .map(post => {
                      const date = new Date(post.publishedAt * 1000);
                      const day = date.getDate();
                      
                      return (
                        <li key={post.postId} className="flex">
                          <span className="text-gray-500 w-8">{day}</span>
                          <Link 
                            to={`/posts/${post.postId}`}
                            className="text-primary hover:underline"
                          >
                            {post.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        ))}
        
        {sortedArchiveData.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No posts available in the archive.
          </div>
        )}
      </Section>
    </Page>
  );
}

export default Archive;