/* To demonstrate the timer control when test */

/* NOTE , must add this line to be sure the timer is FAKE */
jest.useFakeTimers()

let level = 0
const tick = () => {
	setTimeout(() => {
		level++
		console.log('level:',level)
		tick()
	},1000)
}


describe('TestTime',() => {
	it('TestTimer',done => {
		tick()
//		jest.runTimersToTime(1000) //This is both OK
		jest.runOnlyPendingTimers();
		expect(level).toBe(1)
//		jest.runTimersToTime(1000)
		jest.runOnlyPendingTimers();
		expect(level).toBe(2)
//		jest.runTimersToTime(1000)
		jest.runOnlyPendingTimers();
		expect(level).toBe(3)
		jest.clearAllTimers()
		done()
	})
})
