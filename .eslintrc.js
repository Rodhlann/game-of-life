module.exports = {
    "extends": "airbnb",
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        commonjs: true,
        mocha: true,
    },
    rules: {
        'no-underscore-dangle': 'off',
        'max-len': ['error', 120, 2, {
            ignoreComments: true,
            ignoreTrailingComments: true,
        }],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/forbid-prop-types': 'off',
        // 'require-jsdoc': [2, {
        //     'require': {
        //         'FunctionDeclaration': true,
        //         'MethodDefinition': true,
        //         'ClassDeclaration': true,
        //         'ArrowFunctionExpression': true
        //     }
        // }],
        // 'valid-jsdoc': [2, {
        //     'requireReturn': false,
        //     'requireParamDescription': true,
        //     'requireReturnDescription': true,
        //     'requireReturnType': true
        // }],
    },
    overrides: [{
        files: ['js/**.{js|jsx}'],
        excludedFiles: ['ui-kit/**.*']
    }]
};