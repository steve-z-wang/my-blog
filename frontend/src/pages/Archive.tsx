import { Link } from "react-router-dom";
import { Page, Section } from "../components";
import { usePosts } from "../context/PostContext";
import { renderPostDetails } from "../components/renderPostDetails";

export default function Archive() {
  const { posts, loading } = usePosts();

  if (loading) return <p>Loading...</p>;

  // Group posts by year and month
  const archiveData = posts.reduce((acc, post) => {
    const date = new Date(post.publishedAt * 1000);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {} as Record<number, Record<string, typeof posts>>);

  // Sort years and months
  const sortedArchiveData = Object.entries(archiveData)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, months]) => ({
      year: Number(year),
      months: Object.entries(months)
        .sort(([monthA], [monthB]) => {
          const months = [
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
          return months.indexOf(monthB) - months.indexOf(monthA);
        })
        .map(([month, posts]) => ({
          month,
          posts,
        })),
    }));

  return (
    <Page>
      <Section>
        <h1 className="text-4xl font-bold mb-8">Archive</h1>

        <div className="space-y-12">
          {sortedArchiveData.map((yearGroup) => (
            <div key={yearGroup.year} className="">
              <h2 className="text-2xl font-semibold mb-6">{yearGroup.year}</h2>

              <div className="space-y-8">
                {yearGroup.months.map((monthGroup) => (
                  <div key={monthGroup.month}>
                    <h3 className="text-xl font-medium mb-4">
                      {monthGroup.month}
                    </h3>

                    <div className="pl-4">
                      <ul className="space-y-4">
                        {monthGroup.posts
                          .sort(
                            (a, b) =>
                              new Date(b.publishedAt * 1000).getDate() -
                              new Date(a.publishedAt * 1000).getDate()
                          )
                          .map((post) => {
                            return (
                              <li key={post.postId}>
                                <Link to={`/posts/${post.postId}`}>
                                  <h2 className="text-xl">{post.title}</h2>
                                  {renderPostDetails(post)}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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
