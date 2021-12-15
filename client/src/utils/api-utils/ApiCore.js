import createApiProvider from './createApiProvider';

export default class ApiCore {
	constructor(options) {
		const apiProvider = createApiProvider(options.baseUrl)
		if (options.getAll) {
			this.getAll = (settings) => {
				return apiProvider.getAll(options.url, settings);
			};
		}

		if (options.getSingle) {
			this.getSingle = (id, settings) => {
				return apiProvider.getSingle(options.url, id, settings);
			};
		}

		if (options.post) {
			this.post = (model, settings) => {
				return apiProvider.post(options.url, model, settings);
			};
		}

		if (options.postSingle) {
			this.postSingle = (id, model, settings) => {
				return apiProvider.postSingle(options.url, id, model, settings);
			};
		}

		if (options.put) {
			this.put = (model, settings) => {
				return apiProvider.put(options.url, model, settings);
			};
		}

		if (options.patch) {
			this.patch = (model, settings) => {
				return apiProvider.patch(options.url, model, settings);
			};
		}

		if (options.remove) {
			this.remove = (id, settings) => {
				return apiProvider.remove(options.url, id, settings);
			};
		}
	}
}