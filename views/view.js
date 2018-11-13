class View {
    
    static errDisplay (err) {
        console.log(err)
    }

    static addDisplay (data) {
        console.log(`save data success {username: ${data.username}, password: ${data.password}, role: ${data.position}. Total employee : ${data.id}`)
    }

    static successLogin (data) {
        console.log(`user ${data.username} logged in successfully`)
    }

    static addPatient (data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data}`)
    }

    static logout () {
        console.log(`berhasil logout`)
    }

}

module.exports = View