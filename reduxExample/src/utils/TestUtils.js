//@flow
import watch from 'redux-watch'

/*
 * just like java sleep , to make sync wait
 * usage : async () =>{
 *     await sleep(1000);
 *     }
 * */
export function sleep(ms :number) {
	  return new Promise(resolve => setTimeout(resolve, ms))
}

/* to disable debug by cose console.log/info
 * */
const originalConsoleInfo = console.info;
const originalConsoleLog = console.log;
export function disableDebug(){
//	//$FlowFixMe
//	console.info = () => {};
//	//$FlowFixMe
//	console.log = () => {};
}

/* to enable debug by open console.log/info
 * */
export function enableDebug(){
//	//$FlowFixMe
//	console.info = originalConsoleInfo;
//	//$FlowFixMe
//	console.log = originalConsoleLog;
}


/*
 * async test aproach  
 * */
export const a = (callback : Function) =>{
	setTimeout(() => {
		try{
			callback();
		}catch(e){
			console.error(e);
		}
	},500);
}

/*
 * listener store , when state changed ,trigger the callback
 * */
export const storeListener = (store : any,callback : Function) => {
	let w = watch(store.getState, '')
	let unsubscribe = store.subscribe(w(() => {
		setTimeout(() => {//because there may be many update of store, so , wait a whil
			try{
				unsubscribe();
				callback();
				//console.log('un subscribe _______________________');
			}catch(e){
				console.error(e);
			}
		},10);
	}));
}

/* the promise way to execute function with store */
export const storeReceiver = (store : any) => {
	return new Promise( (resolve,reject) => {
		let w = watch(store.getState,'');
		let unsubscribe = store.subscribe( w( () => {
			setTimeout(() => {
				unsubscribe();
				resolve();
			},50);
		}));
	});
}

/* the improved Redux store test utility , usage:
		storeDispatch(store,Model.createHashtag(hashtag))
		.then(() => {
			const hashtagCreated = Model.getHashtagByName('test',store.getState())
			logger.log('the created hashtag:',hashtagCreated)
		})
		//finally 
		.then(() => {
			done()
		})
		.catch(e => {
			done.fail(e)
		})
 *
 * */
export const storeDispatch = (store : any ,dispatchCallback : Function) : Promise<any> => {
	store.dispatch(dispatchCallback);
	return new Promise( (resolve,reject) => {
		let w = watch(store.getState,'');
		let unsubscribe = store.subscribe( w( () => {
			setTimeout(() => {
				try{
				unsubscribe()
				resolve()
				}catch(e){
					console.error('catch error in test utils:',e)
				}
			},100);
		}));
	});
}

