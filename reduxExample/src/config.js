/* The global config */
import React from 'react'
/* Here to change to true or false to switch the Sandbox */
let SANDBOX = false

const CONFIG = {
	SANDBOX,
	/* Using this to replace the connect component , USAGE: const CComponent = CONFIG.SANDBOX_RENDER || connect(...) */
	SANDBOX_RENDER : (name) => {
		if(SANDBOX){
			return () => <div>[{name}]</div>
		}else{
			return undefined
		}
	},
}

console.warn('CONFIG:',CONFIG)
export {CONFIG}
