import createApiProvider from './createApiProvider';

export default class ApiCore {
	constructor(options) {
		const apiProvider = createApiProvider(options.baseUrl)
		if (options.getAll) {
			this.getAll = () => {
				return apiProvider.getAll(options.url);
			};
		}

		if (options.getSingle) {
			this.getSingle = (id) => {
				return apiProvider.getSingle(options.url, id);
			};
		}

		if (options.post) {
			this.post = (model) => {
				return apiProvider.post(options.url, model);
			};
		}

		if (options.postSingle) {
			this.postSingle = (id, model) => {
				return apiProvider.postSingle(options.url, id, model);
			};
		}

		if (options.put) {
			this.put = (model) => {
				return apiProvider.put(options.url, model);
			};
		}

		if (options.patch) {
			this.patch = (model) => {
				return apiProvider.patch(options.url, model);
			};
		}

		if (options.remove) {
			this.remove = (id) => {
				return apiProvider.remove(options.url, id);
			};
		}
	}
}