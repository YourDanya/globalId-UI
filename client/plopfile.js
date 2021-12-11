const config = plop => {
  plop.setGenerator('component', {
    description: 'Generate react component',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Give it a name'
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose type of the component',
        choices: [{
            name: 'Arrow Function',
            value: 'arrow-function-component'
          },
          {
            name: 'Class',
            value: 'class-component'
          }
        ]
      }
    ],
    actions: [{
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.jsx',
        templateFile: 'templates/{{type}}/component.jsx.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.module.sass',
        templateFile: 'templates/{{type}}/styles.module.sass.hbs'
      }
    ]
  })

	plop.setGenerator('saga', {
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Give it a name'
			}
		],
		actions: [
			{
				type: 'add',
        path: 'src/redux/{{name}}/{{name}}.saga.js',
        templateFile: 'templates/saga.js.hbs'
			},
			{
			  path: 'src/redux/store.js',
			  pattern: /(\/\/\*\*\* GENERATED IMPORTS GO HERE \*\*\*)/g,
			  template: 'import {{camelCase name}}Reducer  from \'./{{name}}/{{name}}.saga\';\n$1',
			  type: 'modify',
			}, 
			{
			  path: 'src/redux/store.js',
			  pattern: /(\/\/\*\*\* GENERATED REDUCERS GO HERE \*\*\*)/g,
			  template: '{{camelCase name}}: {{camelCase name}}Reducer,\n$1',
			  type: 'modify',
			},
		]
	})
	plop.setGenerator('saga', {
	  prompts: [{
	    type: 'input',
	    name: 'name',
	    message: 'Give it a name'
	  }],
	  actions: [{
	      type: 'add',
	      path: 'src/redux/{{name}}/{{name}}.saga.js',
	      templateFile: 'templates/saga.js.hbs'
	    },
	    {
	      path: 'src/redux/rootSaga.js',
	      pattern: /(\/\/\*\*\* GENERATED IMPORTS GO HERE \*\*\*)/g,
	      template: 'import {{camelCase name}}Saga  from \'./{{name}}/{{name}}.saga\';\n$1',
	      type: 'modify',
	    },
	    {
	      path: 'src/redux/rootSaga.js',
	      pattern: /(\/\/\*\*\* GENERATED SAGAS GO HERE \*\*\*)/g,
	      template: '{{camelCase name}}Saga,\n$1',
	      type: 'modify',
	    },
	  ]
	})
}

export default config