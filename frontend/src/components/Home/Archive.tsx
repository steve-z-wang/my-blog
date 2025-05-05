import { Post } from '@my-blog/common';

interface ArchiveGroup {
  [year: string]: {
    [month: string]: number;
  };
}

interface DateFilter {
  year: string;
  month: string;
}

interface ArchiveProps {
  posts: Post[];
  selectedDate: DateFilter | null;
  onDateSelect: (filter: DateFilter | null) => void;
}

function Archive({ posts, selectedDate, onDateSelect }: ArchiveProps) {
  // Group posts by year and month
  const archiveGroups = posts.reduce((acc: ArchiveGroup, post) => {
    const date = new Date(post.publishedAt * 1000);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString('en-US', { month: 'long' });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    acc[year][month]++;

    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(archiveGroups)
    .sort((a, b) => parseInt(b) - parseInt(a));

  // Month order for sorting
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthClick = (year: string, month: string) => {
    if (selectedDate?.year === year && selectedDate?.month === month) {
      onDateSelect(null); // Clear filter if clicking the same month
    } else {
      onDateSelect({ year, month });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-semibold">Archives</h3>
        {selectedDate && (
          <button
            onClick={() => onDateSelect(null)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3">
        {sortedYears.map(year => (
          <div key={year}>
            <h4 className="font-medium text-gray-900">{year}</h4>
            <ul className="mt-1 space-y-1">
              {Object.entries(archiveGroups[year])
                .sort((a, b) => monthOrder.indexOf(b[0]) - monthOrder.indexOf(a[0]))
                .map(([month, count]) => {
                  const isSelected = selectedDate?.year === year && selectedDate?.month === month;
                  return (
                    <li 
                      key={`${year}-${month}`} 
                      className={`text-sm pl-4 cursor-pointer hover:text-blue-600 ${
                        isSelected ? 'text-blue-600 font-medium' : 'text-gray-600'
                      }`}
                      onClick={() => handleMonthClick(year, month)}
                    >
                      {month} <span className="text-gray-400 text-xs ml-1">{count}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Archive; 