class View{
    static displayError(input){
        console.log("Error Details: ", input)
    }

    static display(input){
        console.log(input)
    }

    static help(){
        console.log(`Please put a proper command. Here is a list of commands you can use: `
                    )
    }
}

module.exports = View