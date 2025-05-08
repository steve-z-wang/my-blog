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
  posts.forEach((post) => {
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Transform into structured data for rendering
  const archiveData: YearGroup[] = Object.entries(yearMonthMap).map(
    ([year, months]) => {
      // For each year, create a sorted array of month objects
      const monthsArray: MonthGroup[] = Object.entries(months)
        .map(([month, monthPosts]) => ({
          month,
          posts: monthPosts,
        }))
        .sort(
          (a, b) => monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month)
        );

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
      <Section>
        <h1 className="text-8xl font-bold">Archive</h1>

        <div className="mt-8">
          {sortedArchiveData.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-10">
              <h2 className="text-4xl font-bold flex items-upper">
                {yearGroup.year}
                <span className="ml-1 text-sm font-medium text-muted">
                  {yearGroup.postCount}
                </span>
              </h2>

              {yearGroup.months.map((monthGroup) => (
                <div
                  key={`${yearGroup.year}-${monthGroup.month}`}
                  className="mt-8 ml-8"
                >
                  <h3 className="text-2xl font-medium flex items-upper">
                    {monthGroup.month}
                    <span className="ml-1 text-sm text-muted">
                      {monthGroup.posts.length}
                    </span>
                  </h3>

                  <ul className="mt-8 ml-8 space-y-4">
                    {monthGroup.posts
                      // Sort posts by day (most recent first)
                      .sort(
                        (a, b) =>
                          new Date(b.publishedAt * 1000).getDate() -
                          new Date(a.publishedAt * 1000).getDate()
                      )
                      .map((post) => {
                        const date = new Date(post.publishedAt * 1000);
                        const day = date.getDate();

                        return (
                          <li key={post.postId} className="flex">
                            <span className="text-muted w-16">{day}</span>
                            <Link
                              to={`/posts/${post.postId}`}
                              className="hover:underline"
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
        </div>

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
