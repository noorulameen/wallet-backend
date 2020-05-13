let wallet = require('../data/wallet.json');
const helper = require('../helpers/helper');
var filename = '/data/wallet.json';
const fs = require('fs');

module.exports = {
    getWallet:function () {
        return new Promise((resolve, reject) => {
            if (wallet.length === 0) {
                reject({
                    message: 'no posts available',
                    status: 202
                })
            }
            resolve(wallet)
        })
    },
    getSingleWallet:function(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(wallet, id)
            .then(post => resolve(post))
            .catch(err => reject(err))
    })
    },
    insertWallet:function(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(wallet) }
        const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        }
        newPost = { ...id, ...date, ...newPost }
        console.log('dddddd',newPost)
        wallet.push(newPost)

        helper.writeJSONFile(process.cwd()+filename, wallet)
        resolve(newPost)
    })
},

    updateWallet:function(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(wallet, id)
            .then(post => {
                const index = wallet.findIndex(p => p.id == post.id)
                id = { id: post.id }
                const date = {
                    createdAt: post.createdAt,
                    updatedAt: helper.newDate()
                }
                wallet[index] = { ...id, ...date, ...newPost }
                helper.writeJSONFile(process.cwd()+filename, wallet)
                resolve([wallet[index]])
            })
            .catch(err => reject(err))
    })
},
    deleteWallet:function(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(wallet, id)
            .then(() => {
               wallet = wallet.filter(p => parseInt(p.id) !== parseInt(id));
                helper.writeJSONFile(process.cwd()+filename, wallet)
                resolve()
            })
            .catch(err => reject(err))
    })
}


}
