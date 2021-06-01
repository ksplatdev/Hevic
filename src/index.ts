import * as fs from 'fs';

type ValidJson = any[] | LooseObject;

interface dbOptions {
	debug?: boolean;
}

interface LooseObject {
	[key: string]: any;
}

class db {
	readonly path: string;
	private readonly options: dbOptions;

	/**
	 * @description Create a JSON db manager
	 * @param {string} path Path to json file
	 * @param {dbOptions} [options={debug: false}] Misc options
	 */

	constructor(path: string, options?: dbOptions) {
		this.path = path;
		this.options = options || { debug: false };
	}

	/**
	 * @description Overwrites the contents with nothing or a passed value.
	 * @param {ValidJson|string} [value='']
	 * @async
	 * @returns Promise<void>
	 */

	public async overwrite(value?: ValidJson) {
		let a = JSON.stringify(value);
		return a
			? fs.writeFile(
					this.path,
					a,
					(err: NodeJS.ErrnoException | null) => {
						if (err) throw err.message;
						if (this.options.debug) {
							console.log('Overwritten JSON db.');
						}
					}
			  )
			: fs.writeFile(
					this.path,
					'',
					(err: NodeJS.ErrnoException | null) => {
						if (err) throw err.message;
						if (this.options.debug) {
							console.log('Overwritten JSON db.');
						}
					}
			  );
	}

	/**
	 * @description Updates the json db with new values.
	 * @param {ValidJson} newData New/Changed data to be written/updated.
	 * @returns Promise<void>
	 */

	public async update(newData: ValidJson) {
		let a = JSON.stringify(newData);
		return fs.writeFile(
			this.path,
			a,
			(err: NodeJS.ErrnoException | null) => {
				if (err) throw err.message;
				if (this.options.debug) {
					console.log('Updated JSON db.');
				}
			}
		);
	}

	public get data(): ValidJson {
		return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
	}
}

let hevc = {
	db: db,
};

export default hevc;
