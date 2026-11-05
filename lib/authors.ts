/** People who write on the blog. Posts name one with `author:` in their front matter. */
export type Author = {
  name: string
  role: string
  bio: string
  avatar: string
  /** Profiles that identify the author (structured data and the author card) */
  links: { label: string; href: string }[]
}

export const AUTHORS: Record<string, Author> = {
  emilio: {
    name: 'Emilio Sanchez',
    role: 'Founder of Subly',
    bio: 'Emilio has been building Subly since 2021 for founders, freelancers and small teams who want to see where their money goes and decide before it leaves. He writes about the habits and tools that keep recurring costs and cash flow clear.',
    avatar: 'https://avatars.githubusercontent.com/u/29111636?v=4',
    links: [{ label: 'GitHub', href: 'https://github.com/emileond' }],
  },
}

export const getAuthor = (key: string): Author => AUTHORS[key] ?? AUTHORS.emilio
