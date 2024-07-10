const grpc = require("@grpc/grpc-js")
const fs = require("fs")
const { BlogServiceClient } = require("../proto/blog_grpc_pb")
const { Blog, BlogId } = require("../proto/blog_pb")
const { Empty } = require("google-protobuf/google/protobuf/empty_pb")

function createBlog(client) {
    console.log("create blog was invoked")

    return new Promise((resolve, reject) => {
        const req = new Blog()
            .setAuthorId("Serhii")
            .setTitle("My First Blog")
            .setContent("Content of my first blog")

        client.createBlog(req, (err, res) => {
            if (err) {
                reject(err)
            }

            console.log(`Blog was created ${res}`)
            resolve(res.getId())
        })
    })
}

function readBlog(client, id) {
    console.log("readBlog was invoked")
    return new Promise((resolve, reject) => {
        const req = new BlogId().setId(id)

        client.readBlog(req, (err, res) => {
            if (err) {
                reject(err)
            }
            console.log(`Blog was read ${res}`)
            resolve()
        })
    })
}

function updateBlog(client, id) {
    console.log("updateBlog was invoked")
    return new Promise((resolve, reject) => {
        const req = new Blog()
            .setId(id)
            .setAuthorId("not Serhii")
            .setTitle("my first blog (update)")
            .setContent("content of the first blog, with some information")

        client.updateBlog(req, (err, res) => {
            if (err) {
                reject(err)
            }

            console.log("blog was update")
            resolve()
        })
    })
}

function listBlog(client) {
    console.log("listBlog was invoked")

    return new Promise((resolve, reject) => {
        const req = new Empty()
        const call = client.listBlog(req)

        call.on("data", (res) => {
            console.log(res)
        })

        call.on("error", (err) => {
            reject(err)
        })

        call.on("end", () => {
            resolve()
        })
    })
}

function deleteBlog(client, id) {
    console.log("deleteBlog was invoked")

    return new Promise((resolve, reject) => {
        const req = new BlogId().setId(id)

        client.deleteBlog(req, (err, _) => {
            if (err) {
                reject(err)
            }
            console.log("Blog was deleted")
            resolve()
        })
    })
}

async function main() {
    const tls = true
    let creds

    if (tls) {
        const rootCert = fs.readFileSync("./ssl/ca.crt")

        creds = grpc.ChannelCredentials.createSsl(rootCert)
    } else {
        creds = grpc.ChannelCredentials.createInsecure()
    }
    const client = new BlogServiceClient("localhost:50051", creds)

    const id = await createBlog(client)
    // await readBlog(client, id)
    await updateBlog(client, id)
    await listBlog(client)

    await deleteBlog(client, id)
}

main()
