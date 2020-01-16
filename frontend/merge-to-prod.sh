# A script to replicate Jenkins pipeline locally
# This may be useful if the CD pipeline has been disabled
# Or jenkins infrastructure is not accessible

set -e

# Check Node and NPM versions are OK
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)

if [[ $NODE_VERSION != v12.* ]]
then
    printf 'Requires node version 12.13 or greater\n'
    exit 1
fi

if [[ $NPM_VERSION != 6.* ]]
then
    printf 'Requires npm version 6.13 or greater\n'
    exit 1
fi

# Merge master into production
git pull origin master
git pull origin production
git checkout -f origin/production
git merge --no-ff -X theirs origin/master --no-edit

# Install, test and build (equivalent to Jenkins)
npm ci
echo 'Running linter'
npm run lint
echo 'Running tests'
npm run test
echo 'Running test build'
npm run build

echo 'Tests successful. Merging to production...'
git push origin HEAD:production

echo 'Done'