import createApiProvider from './createApiProvider';

export default class ApiCore {
	constructor(options) {
		const apiProvider = createApiProvider(options.baseUrl)
			this.getAll = (settings) => {
				return apiProvider.getAll(options.url, settings);
			};
		


			this.getSingle = (id, settings) => {
				return apiProvider.getSingle(options.url, id, settings);
			};
		


			this.post = (model, settings) => {
				return apiProvider.post(options.url, model, settings);
			};
		

			this.postSingle = (id, model, settings) => {
				return apiProvider.postSingle(options.url, id, model, settings);
			};
		

			this.put = (model, settings) => {
				return apiProvider.put(options.url, model, settings);
			};
		


			this.patch = (model, settings) => {
				return apiProvider.patch(options.url, model, settings);
			};
		


			this.remove = (id, settings) => {
				return apiProvider.remove(options.url, id, settings);
			};
		
	}
}