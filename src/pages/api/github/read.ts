import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';

// セッションの型定義
type SessionWithToken = {
	user: {
		name?: string;
		email?: string;
		image?: string;
		id?: string;
		[key: string]: unknown;
	};
	accessToken?: string;
	[key: string]: unknown;
};

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const session = (await getSession(context.request)) as SessionWithToken | null;

	if (!session?.accessToken) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'content-type': 'application/json' },
		});
	}

	try {
		const owner = 'IkumaTadokoro'; // リポジトリのオーナー名
		const repo = 'blog'; // リポジトリ名
		const path = 'src/data/blog'; // 取得したいディレクトリパス

		// GitHubのGraphQL APIエンドポイント
		const endpoint = 'https://api.github.com/graphql';

		// GraphQLクエリ
		const query = `
      query GetRepositoryContent($owner: String!, $repo: String!, $path: String!) {
        repository(owner: $owner, name: $repo) {
          object(expression: $path) {
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    `;

		// GraphQL APIリクエスト
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: {
					owner,
					repo,
					path: `HEAD:${path}`, // パスを正しい形式で渡す
				},
			}),
		});

		const data = await response.json();
		console.log(data.data.repository.object);

		// データが正しく取得できなかった場合のエラーハンドリング
		if (data.errors) {
			console.error('GitHub API Error:', data.errors);
			return new Response(
				JSON.stringify({
					error: 'Failed to fetch data from GitHub API',
					details: data.errors,
				}),
				{
					status: 500,
					headers: { 'content-type': 'application/json' },
				},
			);
		}

		// ディレクトリのエントリー（ファイルやフォルダ）の一覧を取得
		const entries = data.data?.repository?.object?.entries || [];

		// ファイル名の一覧を返す
		const fileNames = entries
			.filter((entry: { type: string }) => entry.type === 'blob') // ファイルのみをフィルタリング
			.map((entry: { name: string }) => entry.name);

		return new Response(
			JSON.stringify({
				files: fileNames,
				count: fileNames.length,
			}),
			{
				status: 200,
				headers: { 'content-type': 'application/json' },
			},
		);
	} catch (error) {
		console.error('Error:', error);
		return new Response(
			JSON.stringify({
				error: 'Internal server error',
				message: error instanceof Error ? error.message : String(error),
			}),
			{
				status: 500,
				headers: { 'content-type': 'application/json' },
			},
		);
	}
};

export const POST: APIRoute = async (context) => {
	const data = await context.request.json();
	const session = await getSession(context.request);

	if (!session) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'content-type': 'application/json' },
		});
	}

	return new Response(
		JSON.stringify({
			message: `Hello, ${data.name || 'world'}!`,
			user: session.user,
		}),
		{
			status: 200,
			headers: { 'content-type': 'application/json' },
		},
	);
};
