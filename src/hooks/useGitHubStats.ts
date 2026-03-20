import { useState, useEffect } from 'react';

export interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  calendar: {
    totalContributions: number;
    weeks: {
      contributionDays: {
        contributionCount: number;
        color: string;
      }[];
    }[];
  } | null;
  loading: boolean;
  error: string | null;
}

const GITHUB_GRAPHQL_QUERY = `
query($username: String!) {
  user(login: $username) {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
      totalCount
      nodes {
        stargazerCount
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    stars: 0,
    commits: 0,
    calendar: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchStats() {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      
      if (!token) {
        console.warn('GitHub Stats: VITE_GITHUB_TOKEN is missing in environment.');
        setStats(prev => ({ ...prev, loading: false, error: 'No GitHub token found' }));
        return;
      }

      console.log('GitHub Stats: Attempting fetch for', username);

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GITHUB_GRAPHQL_QUERY,
            variables: { username },
          }),
        });

        const data = await response.json();
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const user = data.data.user;
        const totalStars = user.repositories.nodes.reduce(
          (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount, 
          0
        );

        setStats({
          repos: user.repositories.totalCount,
          stars: totalStars,
          commits: user.contributionsCollection.contributionCalendar.totalContributions,
          calendar: user.contributionsCollection.contributionCalendar,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(prev => ({ 
          ...prev, 
          loading: false, 
          error: err instanceof Error ? err.message : 'An unknown error occurred' 
        }));
      }
    }

    if (username) fetchStats();
  }, [username]);

  return stats;
}
