import { Link } from "react-router-dom";
import { Post } from "@my-blog/common";
import { Page, PageTitle, Section } from "../components";
import { renderPostDetails } from "../utils/renderPostDetails";
import { usePosts } from "../context/PostContext";

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

// Month order mapping for constant-time lookups (O(1) instead of indexOf which is O(n))
const MONTH_ORDER: Record<string, number> = {
  December: 0,
  November: 1,
  October: 2,
  September: 3,
  August: 4,
  July: 5,
  June: 6,
  May: 7,
  April: 8,
  March: 9,
  February: 10,
  January: 11,
};

export default function Archive() {
  const { posts, loading } = usePosts();

  // Group posts by year and month (O(n) time complexity)
  const yearMonthMap: Record<string, Record<string, Post[]>> = {};

  // Process each post once - O(n)
  posts?.forEach((post: Post) => {
    const date: Date = new Date(post.publishedAt * 1000);
    const year: string = date.getFullYear().toString();
    const month: string = date.toLocaleString("en-US", { month: "long" });

    // Initialize year and month objects if they don't exist
    yearMonthMap[year] = yearMonthMap[year] || {};
    yearMonthMap[year][month] = yearMonthMap[year][month] || [];

    // Add post to the appropriate group
    yearMonthMap[year][month].push(post);
  });

  // Transform into structured data for rendering
  const archiveData: YearGroup[] = Object.entries(yearMonthMap).map(
    ([year, months]) => {
      // For each year, create a sorted array of month objects
      const monthsArray: MonthGroup[] = Object.entries(months)
        .map(([month, monthPosts]) => ({
          month,
          posts: monthPosts,
        }))
        .sort((a, b) => MONTH_ORDER[a.month] - MONTH_ORDER[b.month]);

      // Count posts in this year
      const postCount = monthsArray.reduce(
        (sum, month) => sum + month.posts.length,
        0
      );

      return {
        year,
        months: monthsArray,
        postCount,
      };
    }
  );

  // Sort years in descending order (newest first)
  const sortedArchiveData = archiveData.sort(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );

  return (
    <Page>
      <PageTitle>Archive</PageTitle>

      {loading ? null : sortedArchiveData.length === 0 ? (
        <Section>
          <p className="text-muted">No posts available in the archive.</p>
        </Section>
      ) : (
        <div className="divide-y divide-accent">
          {/* Year groups */}
          {sortedArchiveData.map((yearGroup) => (
            <Section key={yearGroup.year}>
              <div className="">
                <div className="flex gap-2">
                  <h2 className="text-2xl font-bold items-upper">
                    {yearGroup.year}
                  </h2>
                  <span className="text-sm font-bold text-muted">
                    {yearGroup.postCount}
                  </span>
                </div>

                {/* Month groups */}
                {yearGroup.months.map((monthGroup) => (
                  <div
                    key={`${yearGroup.year}-${monthGroup.month}`}
                    className="flex pt-8"
                  >
                    {/* Month header */}
                    <div className="flex w-32 gap-2">
                      <h3 className="text-xl font-bold items-upper">
                        {monthGroup.month}
                      </h3>
                      <div className="text-sm font-bold text-muted">
                        {monthGroup.posts.length}
                      </div>
                    </div>

                    {/* Post list */}
                    <ul className="space-y-4">
                      {monthGroup.posts
                        .sort(
                          (a, b) =>
                            new Date(b.publishedAt * 1000).getDate() -
                            new Date(a.publishedAt * 1000).getDate()
                        )
                        .map((post) => {
                          return (
                            <li key={post.id}>
                              <Link to={`/posts/${post.slug}`}>
                                <h2 className="text-xl">{post.title}</h2>
                                {renderPostDetails(post)}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          ))}
        </div>
      )}
    </Page>
  );
}
