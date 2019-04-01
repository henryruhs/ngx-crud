module.exports = config =>
{
	config.set(
	{
		mutator: 'typescript',
		packageManager: 'npm',
		reporters:
		[
			'clear-text',
			'progress'
		],
		testRunner: 'mocha',
		testFramework: 'mocha',
		tsconfigFile: 'tsconfig.json',
		mochaOptions:
		{
			files:
			[
				'tests/**/*.spec.ts'
			],
			opts: 'tests/mocha.opts'
		},
		mutate:
		[
			'src/**/*.ts'
		]
	});
};
