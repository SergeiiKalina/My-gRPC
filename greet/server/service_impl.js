const pb = require("../proto/greet_pb")

exports.greet = (call, callback) => {
    console.log("Greet was invoked")

    const res = new pb.GreetResponse().setResult(
        `hello ${call.request.getFirstName()}`
    )
    callback(null, res)
}

exports.greetManyTimes = (call, _) => {
    console.log("GreatManyTimes was invoked")

    for (let i = 0; i < 10; i++) {
        const res = new pb.GreetResponse()
        res.setResult(`Hello ${call.request.getFirstName()} - number ${i}`)
        call.write(res)
    }
    call.end()
}

exports.longGreet = (call, callback) => {
    console.log("LongGreet was invoked")
    let greet = ""

    call.on("data", (request) => {
        greet += `Hello ${request.getFirstName()} \n`
    })

    call.on("end", () => {
        const res = new pb.GreetResponse()
        res.setResult(greet)
        callback(null, res)
    })
}

exports.greetEveryone = (call, _) => {
    console.log("GreetEveryone was invoked")

    call.on("data", (req) => {
        const name = req.getFirstName()
        console.log(` recieved request ${name}`)
        const res = new pb.GreetResponse()
        res.setResult(`Hello ${name}`)
        call.write(res)
        console.log(`Sending response ${res}`)
    })

    call.on("end", () => {
        call.end()
    })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

exports.greetWithDeadline = async (call, callback) => {
    console.log("greetWithDeadline was invoked")

    for (let i = 0; i < 3; i++) {
        if (call.cancelled) {
            return console.log("The client canceled the request!")
        }
        await sleep(1000)
    }

    const res = new pb.GreetResponse().setResult(
        `Hello ${call.request.getFirstName()}`
    )
    callback(null, res)
}
