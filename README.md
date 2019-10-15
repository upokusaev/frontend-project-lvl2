[![Build Status](https://travis-ci.com/upokusaev/frontend-project-lvl2.svg?branch=master)](https://travis-ci.com/upokusaev/frontend-project-lvl2) [![Maintainability](https://api.codeclimate.com/v1/badges/64574f7799e36af61dac/maintainability)](https://codeclimate.com/github/upokusaev/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/64574f7799e36af61dac/test_coverage)](https://codeclimate.com/github/upokusaev/frontend-project-lvl2/test_coverage)
[![asciicast](https://asciinema.org/a/2OR3NjrzvF7sAdAD29JiVsMd7.svg)](https://asciinema.org/a/2OR3NjrzvF7sAdAD29JiVsMd7)

## Description
The command line utility compares two configuration files and shows a difference.
The utility supports the following input data formats: json, yaml, ini.
The output report can be generated in one of the following formats: tree (default), plain, json.

## Download

```$ git clone https://github.com/upokusaev/frontend-project-lvl2.git```

## Instalation

Navigate to the project directory and follow the steps below:

1. Install dependencies:

```
$ make install
```
2. Publish the package locally:

```
$ make publish
```
3. Install the package from local storage:

```
$ npm link
```
## Usage
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  Output format (default: "tree")
  -h, --help           output usage information
```

## Examples

### Compare .ini files and show the difference in the tree output format
[![asciicast](https://asciinema.org/a/274493.svg)](https://asciinema.org/a/274493)
### Compare .json files and show the difference in the plain output format
[![asciicast](https://asciinema.org/a/274494.svg)](https://asciinema.org/a/274494)
### Compare .yml files and show the difference in the json output format
[![asciicast](https://asciinema.org/a/274495.svg)](https://asciinema.org/a/274495)