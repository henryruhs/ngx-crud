module.exports = config =>
{
	config.set(
	{
		mutator: 'typescript',
		packageManager: 'npm',
		reporters:
		[
			'clear-text',
			'dashboard'
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
			opts: 'mocha.opts'
		},
		mutate:
		[
			'src/**/*.ts'
		]
	});
};
