# GIIG Shopify

## Development
```
# ensure you have shopify-cli
# brew install shopify-cli

shopify login
shopify theme serve

npm install
npm run dev
```

## Pushing Updates
```
# ensure you're on a your branch
# git checkout feat/<feature-name>

npm run build

# husky will validate that all current changes are committed or stashed
# so ensure there are no outstanding changes in `git status`

git push
```
