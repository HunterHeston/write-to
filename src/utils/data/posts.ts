import { type Post, Visibility } from "@/types/post";

const content = `
# Stub Article Content
This is some stub content for the article.

## Subheading
This is a subheading containing some **bold** text.

### Subsubheading
This is a subsubheading containing some *italic* text.

#### Subsubsubheading
This is a subsubsubheading containing some ~~strikethrough~~ text.

##### Subsubsubsubheading
This is a subsubsubsubheading containing some \`inline code\`.

###### Subsubsubsubsubheading
This is a subsubsubsubsubheading containing some [link text](https://example.com).
    `;

export const fakeUserNames = ["hntrh", "jim", "jane"];

export const fakePostMap: Record<string, Post[]> = {
  hntrh: [
    {
      content: content,
      meta: {
        profileName: "hntrh",
        publishDate: "2021-01-01",
        slug: "my-day-was-this",
        title: "My day was this",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "hntrh",
        publishDate: "2021-01-02",
        slug: "its-never-still",
        title: "It's never still",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "hntrh",
        publishDate: "2021-01-03",
        slug: "gotta-keep-moving",
        title: "Gotta keep moving",
        visibility: Visibility.All,
      },
    },
  ],
  jim: [
    {
      content: content,
      meta: {
        profileName: "jim",
        publishDate: "2021-01-01",
        slug: "my-day-was-this",
        title: "My day was this",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "jim",
        publishDate: "2021-01-02",
        slug: "its-never-still",
        title: "It's never still",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "jim",
        publishDate: "2021-01-03",
        slug: "gotta-keep-moving",
        title: "Gotta keep moving",
        visibility: Visibility.All,
      },
    },
  ],
  jane: [
    {
      content: content,
      meta: {
        profileName: "jane",
        publishDate: "2021-01-01",
        slug: "my-day-was-this",
        title: "My day was this",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "jane",
        publishDate: "2021-01-02",
        slug: "its-never-still",
        title: "It's never still",
        visibility: Visibility.All,
      },
    },
    {
      content: content,
      meta: {
        profileName: "jane",
        publishDate: "2021-01-03",
        slug: "gotta-keep-moving",
        title: "Gotta keep moving",
        visibility: Visibility.All,
      },
    },
  ],
};
