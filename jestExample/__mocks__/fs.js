/* To mock the node fs api */

const fs = {
	readFileSync	: () => {
		return 'fake vimrc from manual mock'
	}
}

console.log('the mock fs:',fs)

export default fs
