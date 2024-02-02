const path = require('path');
const fs = require('fs');
const logger = require('./utils/logger')('file_sync');

let sourcePath = path.join('.', 'source');
let targetPath = path.join('.', 'target');

async function synchronizeCatalogs(pathDefault) {
	const sourceDirFilesArray = await fs.promises.readdir(pathDefault);

	sourceDirFilesArray.forEach(file => {
		fs.stat(buildPath(pathDefault, file), (error, stat) => {
			if (error) logger.error(error);

			if (stat.isDirectory()) {
				copyDirectory(pathDefault, targetPath, file);
			}

			if (stat.isFile()) {
				checkCoincidencesAndCopyFile(file, pathDefault);
			}
		})
	});
}

function buildPath(...args) {
	return path.join('.', ...args);
}

async function checkCoincidencesAndCopyFile(file, pathDefault) {
	const targetDirFilesArray = await fs.promises.readdir(targetPath);

	if (!targetDirFilesArray.includes(file)) {
		copyFiles(buildPath(pathDefault, file), buildPath(targetPath, file));
	} else {
		logger.warn(`"${file}" - is already exist in repository`);
	}
}


function copyDirectory(pathDefault, target, file) {
	fs.mkdir(buildPath(targetPath, file), (err) => {
		if (err.code === 'EEXIST') {
			logger.warn(`The directory ${target} already exists`);
		} else {
			logger.error(err)
		};

		if (err) {
			logger.error(`The directory "${target}" didn't create or already exist`);
		}
		targetPath = buildPath(target, file);
		synchronizeCatalogs(buildPath(pathDefault, file));
	})
}

async function copyFiles(pathName, target) {
	await fs.promises.copyFile(pathName, target)
		.then(result => logger.info(`The file from "${buildPath(pathName)}" was copied successfully to "${buildPath(target)}" directory`))
		.catch(error => logger.error(error));
}

module.exports = {
	start: () => synchronizeCatalogs(sourcePath)
}