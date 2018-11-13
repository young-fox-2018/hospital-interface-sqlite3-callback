class View {
    static displayErr(err) {
        console.log(err);
    }

    static register(data, lastId) {
        console.log(`save data success ${data}. Total employee: ${lastId.total}`);
    }

    static displayLogin(name) {
        console.log(`user ${name} logged in successfully`);
    }

    static addPatient(total) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien: ${total}`);
    }
}

module.exports = View