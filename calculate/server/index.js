const grpc = require("@grpc/grpc-js")
const serviceImpl = require("./service_impl")
const { CalculateServiceService } = require("../proto/calculate_grpc_pb")

const url = "localhost:50051"

function cleanup(server) {
    console.log("cleanup")

    if (server) {
        server.forceShutdown()
    }
}

function main() {
    const server = new grpc.Server()
    const credential = grpc.ServerCredentials.createInsecure()

    process.on("SIGINT", (err) => {
        console.log("caught interrupt signal")
        cleanup(server)
    })
    server.addService(CalculateServiceService, serviceImpl)
    server.bindAsync(url, credential, (err) => {
        if (err) {
            return cleanup(server)
        }
        console.log(`listening on ${url}`)
    })
}

main()
