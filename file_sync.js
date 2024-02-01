const path = require('path');
const fs = require('fs');
const logger = require('./utils/logger')('file_sync');

let sourcePath = path.join('.', 'source');
let targetPath = path.join('.', 'target');

async function replaceFile(pathDefault) {
	const sourceDirFilesArray = await fs.promises.readdir(pathDefault);

	sourceDirFilesArray.forEach(file => {
		fs.stat(buildPath(pathDefault, file), (error, stat) => {
			if (error) logger.error(error);

			if (stat.isDirectory()) {
				copyDirectory(pathDefault, targetPath, file);
			}

			if (stat.isFile()) {
				checkСoincidencesAndCopyFile(file, pathDefault);
			}
		})
	});
}

function buildPath(...args) {
	return path.join('.', ...args);
}

async function checkСoincidencesAndCopyFile(file, pathDefault) {
	const targetDirFilesArray = await fs.promises.readdir(targetPath);

	if (!targetDirFilesArray.includes(file)) {
		copyFiles(buildPath(pathDefault, file), buildPath(targetPath, file));
	} else {
		logger.warn(`"${file}" - is already exist in repository`);
	}
}


function copyDirectory(pathDefault, target, file) {
	fs.mkdir(buildPath(targetPath, file), (err) => {
		if (err) {
			logger.error(`The directory "${target}" didn't create or already exist`);
		}
		targetPath = buildPath(target, file);
		replaceFile(buildPath(pathDefault, file));
	})
}

async function copyFiles(pathName, target) {
	const fileData = await fs.promises.readFile(pathName, 'utf8');
	fs.writeFile(target, fileData, (error) => {
		if (error) logger.error("The file didn't write");
	})
	logger.info(`The file from "${buildPath(pathName)}" was copied successfully to "${buildPath(target)}" directory`);
}

module.exports = {
	start: () => replaceFile(sourcePath)
}