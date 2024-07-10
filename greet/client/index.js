const grpc = require("@grpc/grpc-js")
const fs = require("fs")

const { GreetServiceClient } = require("../proto/greet_grpc_pb")
const { GreetRequest } = require("../proto/greet_pb")

function doLongGreet(client) {
    console.log("doLongGreet was invoked")

    const names = ["Serhii", "Cate", "Test"]
    const call = client.longGreet((err, res) => {
        if (err) {
            return console.log(err)
        }
        console.log(`LongGreet ${res.getResult()}`)
    })

    names
        .map((name) => {
            return new GreetRequest().setFirstName(name)
        })
        .forEach((req) => call.write(req))

    call.end()
}

function doGreetEveryone(client) {
    console.log("doEveryone was invoked")

    const names = ["Serhii", "Cate", "Test"]

    const call = client.greetEveryone()

    call.on("data", (res) => {
        console.log(`Greet everyone: ${res.getResult()}`)
    })

    call.on("end", () => {
        console.log("Server finished sending data")
    })

    call.on("error", (e) => {
        console.error("Error: ", e)
    })

    names.forEach((name) => {
        const req = new GreetRequest()
        req.setFirstName(name)
        call.write(req)
    })

    call.end()
}

function doGreet(client) {
    console.log("doGreet was invoked")

    const req = new GreetRequest().setFirstName("Clement")

    client.greet(req, (err, res) => {
        if (err) {
            return console.log(err)
        }

        console.log(`Greet ${res.getResult()}`)
    })
}

function doGreetManyTimes(client) {
    console.log("doGreetManyTimes was invoked")
    const req = new GreetRequest().setFirstName("Serhii")
    const call = client.greetManyTimes(req)

    call.on("data", (res) => {
        console.log(`GreetManyTimes :${res.getResult()} `)
    })
}

function doGreetWithDeadline(client, ms) {
    console.log("doGreetWithDeadline was invoked")

    const req = new GreetRequest()
    req.setFirstName("Serhii")
    client.greetWithDeadline(
        req,
        { deadline: new Date(Date.now() + ms) },
        (err, res) => {
            if (err) {
                return console.log(err)
            }
            console.log(`GreetWithDeadline: ${res.getResult()}`)
        }
    )
}

function main() {
    const tls = true
    let creds

    if (tls) {
        const rootCert = fs.readFileSync("./ssl/ca.crt")

        creds = grpc.ChannelCredentials.createSsl(rootCert)
    } else {
        creds = grpc.ChannelCredentials.createInsecure()
    }
    const client = new GreetServiceClient("localhost:50051", creds)
    // doGreetManyTimes(client)
    doGreet(client)
    // doGreetEveryone(client)
    // doLongGreet(client)
    // doGreetWithDeadline(client, 5000)
    // doGreetWithDeadline(client, 1000)
}

main()
