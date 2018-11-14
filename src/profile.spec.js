const fetch = require('isomorphic-fetch')
const url = path => `http://localhost:3000${path}`

describe('test the Profile function', () => {
    const headline = 'update headline for test'
    let current;
    // it('get the current headline', (done) => {
    //     fetch(url('/login'), {
    //         method: "POST",
    //         body: JSON.stringify({ username: "testUser", password: "key" }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => {
    //             fetch(url('/headline/:testUser'))
    //                 .then(res => {
    //                     return res.json()
    //                 })
    //                 .then(body => {
    //                     current = body.headline
    //                     expect(current).toEqual('after update')
    //                 })
    //         })
    //         .then(done)
    //         .catch(done)
    // });

    // it('update the current headline', (done) => {
    //     fetch(url('/login'), {
    //         method: "POST",
    //         body: JSON.stringify({ username: "testUser", password: "key" }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => {
    //             fetch(url('/headline'), {
    //                 method: "PUT",
    //                 body: JSON.stringify({ headline: headline }),
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })
    //                 .then(res => {
    //                     return res.json()
    //                 })
    //                 .then(body => {
    //                     expect(body.headline).toEqual(headline)
    //                 })
    //         })
    //         .then(done)
    //         .catch(done)
    // });
    // it('check the update headline', (done) => {
    //     fetch(url('/login'), {
    //         method: "POST",
    //         body: JSON.stringify({ username: "testUser", password: "key" }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => {
    //             fetch(url('/headline/:testUser'))
    //                 .then(res => {
    //                     return res.json()
    //                 })
    //                 .then(body => {
    //                     expect(body.headline).toEqual(headline)
    //                 })
    //         })
    //         .then(done)
    //         .catch(done)
    // });

})