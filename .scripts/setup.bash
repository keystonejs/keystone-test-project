DEFAULT_REPO="git@github.com:keystonejs/keystone.git"
if [[ $(ls | grep -c "^keystone$") -eq 0 ]]; then
	git clone "${1-$DEFAULT_REPO}"
fi

rm -rf node_modules/keystone
npm link ./keystone
