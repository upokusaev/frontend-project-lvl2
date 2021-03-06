install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-run
test:
	npm test
build:
	npm run build
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage
