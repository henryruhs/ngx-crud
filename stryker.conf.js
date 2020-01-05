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
		mutate:
		[
			'src/**/*.ts'
		]
	});
};
