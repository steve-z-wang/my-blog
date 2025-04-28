import db from '../db';
import type { Post } from '@my-blog/common';

/* ---------- Single Post ---------- */
export function getPost(id: number): Post | undefined {

    const stmt = db.prepare(`
        SELECT
          p.*,
          COALESCE(json_group_array(t.tag_name), '[]') AS tags
        FROM posts AS p
        LEFT JOIN tag_posts tp USING(post_id)
        LEFT JOIN tags t       USING(tag_id)
        WHERE p.post_id = ?
        GROUP BY p.post_id
    `);

    const row = stmt.get(id) as {
        post_id: number;
        publish_at: number;
        title: string;
        content: string;
        tags: string;
    }

    return { 
        ...row, 
        tags: JSON.parse(row.tags) as string[] 
    };
}

/* ---------- Timeline ---------- */
export function listPosts(
    limit = 10,
    offset = 0
): Post[] {
    const rows = db
        .prepare(`
        SELECT
          p.*,
          COALESCE(
            json_group_array(t.tag_name) FILTER (WHERE t.tag_name IS NOT NULL),
            '[]'
          ) AS tags
        FROM posts           AS p
        LEFT JOIN tag_posts  AS tp USING (post_id)
        LEFT JOIN tags       AS t  USING (tag_id)
        GROUP BY p.post_id
        ORDER BY p.publish_at DESC
        LIMIT ? OFFSET ?;
        `)
        .all(limit, offset) as {
            post_id: number;
            publish_at: number;
            title: string;
            content: string;
            tags: string;        // JSON text
        }[];

    // parse the JSON text into string[]
    return rows.map((r) => ({
        ...r,
        tags: JSON.parse(r.tags) as string[],
    }));
}