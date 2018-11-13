"use strict"

class View {
    static printErrorData(error) {
        console.log(error.message)
    }

    static printSuccessData(data, param) {
        if (param != null) {
            console.log(`${data}. Total employee : ${param}`)
        } else {
        console.log(data)
        }
    }
}

module.exports = View