import { sum } from '.'
 
test('Ma function sum', ()=>{
    const result = sum(3,7)
    expect(result).toBe(10)
})