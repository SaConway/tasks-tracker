set -e
npm run build
cd dist

git init
git add -A
git commit -m 'deploy'
git checkout -b gh-pages
git push -f https://github.com/SaConway/minimal-productivity-apps.git gh-pages

cd -