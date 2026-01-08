import * as readline from 'node:readline';
import { createInterface } from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import { stdin, stdout } from 'node:process';
import path from 'node:path';

async function askText(question: string): Promise<string> {
	const rl = createInterface({ input: stdin, output: stdout });
	const answer = await rl.question(question);
	rl.close();
	return answer;
}

async function askSelect<T extends string>(question: string, options: T[]): Promise<T> {
	return new Promise((resolve) => {
		let selectedIndex = 0;

		const render = () => {
			stdout.write(`\x1b[${options.length}A`);
			options.forEach((option, i) => {
				stdout.write('\x1b[2K');
				const marker = i === selectedIndex ? '\x1b[36m❯\x1b[0m' : ' ';
				const text = i === selectedIndex ? `\x1b[36m${option}\x1b[0m` : option;
				stdout.write(`${marker} ${text}\n`);
			});
		};

		console.log(question);
		options.forEach((option, i) => {
			const marker = i === selectedIndex ? '\x1b[36m❯\x1b[0m' : ' ';
			const text = i === selectedIndex ? `\x1b[36m${option}\x1b[0m` : option;
			console.log(`${marker} ${text}`);
		});

		stdin.setRawMode(true);
		stdin.resume();
		readline.emitKeypressEvents(stdin);

		const onKeypress = (_str: string, key: readline.Key) => {
			if (key.name === 'up' && selectedIndex > 0) {
				selectedIndex--;
				render();
			} else if (key.name === 'down' && selectedIndex < options.length - 1) {
				selectedIndex++;
				render();
			} else if (key.name === 'return') {
				stdin.removeListener('keypress', onKeypress);
				stdin.setRawMode(false);
				stdin.pause();
				resolve(options[selectedIndex]);
			} else if (key.ctrl && key.name === 'c') {
				stdin.setRawMode(false);
				console.log('\n\x1b[33mキャンセルしました\x1b[0m');
				process.exit(0);
			}
		};

		stdin.on('keypress', onKeypress);
	});
}

async function askMultiSelect<T extends string>(
	question: string,
	options: T[],
): Promise<T[]> {
	return new Promise((resolve) => {
		let cursorIndex = 0;
		const selected = new Set<number>();

		const render = () => {
			stdout.write(`\x1b[${options.length}A`);
			options.forEach((option, i) => {
				stdout.write('\x1b[2K');
				const checkbox = selected.has(i) ? '\x1b[32m✓\x1b[0m' : '○';
				const cursor = i === cursorIndex ? '\x1b[36m❯\x1b[0m' : ' ';
				const text = i === cursorIndex ? `\x1b[36m${option}\x1b[0m` : option;
				stdout.write(`${cursor} ${checkbox} ${text}\n`);
			});
		};

		console.log(question);
		console.log('\x1b[90m(スペースで選択、Enterで確定)\x1b[0m');
		options.forEach((option, i) => {
			const checkbox = '○';
			const cursor = i === cursorIndex ? '\x1b[36m❯\x1b[0m' : ' ';
			const text = i === cursorIndex ? `\x1b[36m${option}\x1b[0m` : option;
			console.log(`${cursor} ${checkbox} ${text}`);
		});

		stdin.setRawMode(true);
		stdin.resume();
		readline.emitKeypressEvents(stdin);

		const onKeypress = (_str: string, key: readline.Key) => {
			if (key.name === 'up' && cursorIndex > 0) {
				cursorIndex--;
				render();
			} else if (key.name === 'down' && cursorIndex < options.length - 1) {
				cursorIndex++;
				render();
			} else if (key.name === 'space') {
				if (selected.has(cursorIndex)) {
					selected.delete(cursorIndex);
				} else {
					selected.add(cursorIndex);
				}
				render();
			} else if (key.name === 'return') {
				stdin.removeListener('keypress', onKeypress);
				stdin.setRawMode(false);
				stdin.pause();
				resolve(Array.from(selected).map((i) => options[i]));
			} else if (key.ctrl && key.name === 'c') {
				stdin.setRawMode(false);
				console.log('\n\x1b[33mキャンセルしました\x1b[0m');
				process.exit(0);
			}
		};

		stdin.on('keypress', onKeypress);
	});
}

async function main() {
	console.log('\n\x1b[1m📝 ブログ記事テンプレート作成\x1b[0m\n');

	const title = await askText('タイトルを入力してください: ');
	if (!title.trim()) {
		console.log('\x1b[31mエラー: タイトルは必須です\x1b[0m');
		process.exit(1);
	}

	const description = await askText('説明を入力してください: ');
	if (!description.trim()) {
		console.log('\x1b[31mエラー: 説明は必須です\x1b[0m');
		process.exit(1);
	}
	console.log('');
	const category = await askSelect('カテゴリを選択してください:', [
		'tech',
		'idea',
		'life',
	]);

	console.log('');

	const date = new Date().toISOString().split('T')[0];
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
		.replace(/^-|-$/g, '');
	const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'blog', slug);
	await fs.mkdir(OUTPUT_DIR, { recursive: true });
	const filename = path.join(OUTPUT_DIR, `index.md`);

	const content = `---
title: "${title}"
publishDate: ${date}
category: ${category}
tags: []
draft: true
description: "${description}"
---


${title}
`;

	await fs.writeFile(filename, content, 'utf-8');

	console.log('');
	console.log('\x1b[32m✓ 記事が作成されました！\x1b[0m');
}

main().catch(console.error);
