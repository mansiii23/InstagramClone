const express = require("express");
const app = express();
const port = 8081;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');



app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let allPosts = [
    {
        id: uuidv4(),
        username: "mansi.kamra",
        photo: "Mansi.jpeg",
        caption: "Happy"
    },
    {
        id: uuidv4(),
        username: "mansi.kamra",
        photo: "Mansi2.jpeg",
        caption: "Mandatory"
    },
    {
        id: uuidv4(),
        username: "mansi.kamra",
        photo: "Mansi3.jpeg",
        caption: "posting after a while"
    },
    {
        id: uuidv4(),
        username: "mansi.kamra",
        photo: "Mansi4.jpeg",
        caption: "cutie"
    },
    {
        id: uuidv4(),
        username: "sarthak.kamra",
        photo: "Sarthak.jpeg",
        caption: "picture credits to one n only @mansi.kamra"
    },
    {
        id: uuidv4(),
        username: "sarthak.kamra",
        photo: "Sarthak2.jpeg",
        caption: "Mom <3"
    },
    {
        id: uuidv4(),
        username: "sarthak.kamra",
        photo: "Sarthak3.jpeg",
        caption: "Family"
    },
    {
        id: uuidv4(),
        username: "sarthak.kamra",
        photo: "Sarthak4.jpeg",
        caption: "Swag"
    },
    {
        id: uuidv4(),
        username: "meetuarora",
        photo: "Mumma.jpeg",
        caption: "grateful"
    },
    {
        id: uuidv4(),
        username: "meetuarora",
        photo: "Mumma2.jpeg",
        caption: "doti"
    },
    {
        id: uuidv4(),
        username: "meetuarora",
        photo: "Mumma3.jpeg",
        caption: "My lovely daughter"
    },
    {
        id: uuidv4(),
        username: "meetuarora",
        photo: "Mumma4.jpeg",
        caption: "Husband <3"
    },
    {
        id: uuidv4(),
        username: "rajesh_kamra",
        photo: "Papa.jpeg",
        caption: "Wifey <3"
    },
    {
        id: uuidv4(),
        username: "rajesh_kamra",
        photo: "Papa2.jpeg",
        caption: "Birthday"
    },
    {
        id: uuidv4(),
        username: "rajesh_kamra",
        photo: "Papa3.jpeg",
        caption: "My children"
    },
    {
        id: uuidv4(),
        username: "rajesh_kamra",
        photo: "Papa4.jpeg",
        caption: "<3"
    }
]

app.get("/getAllPosts", (req, res) => {
    res.render("index.ejs", { posts: allPosts });
})

app.get("/getAllPostsByUsername/:username", (req, res) => {
    let { username } = req.params;
    let filteredPosts = allPosts.filter((p) => username === p.username);
    res.render("profile.ejs", { posts: filteredPosts });
})

app.get("/getPostById/:id", (req, res) => {
    let { id } = req.params;
    let post = allPosts.find((p) => id === p.id);
    let filteredPosts = allPosts.filter((p) => post.username === p.username);
    res.render("showPost.ejs", { posts: filteredPosts, post });
})

app.get("/newPost/:username", (req, res) => {
    let { username } = req.params;
    res.render("newPost.ejs", { username });
})

app.patch("/EditPostById/:id", (req, res) => {
    let { id } = req.params;
    let newCaption = req.body.caption;
    let post = allPosts.find((p) => id === p.id);
    post.caption = newCaption;
    console.log(post);
    res.redirect(`/getPostById/${post.id}`);
})

app.get("/editPost/:id", (req, res) => {
    let { id } = req.params;
    let post = allPosts.find((p) => id === p.id);
    res.render("editPost.ejs", { post });
})

app.post("/createNewPostForUsername/:username", (req, res) => {
    let { username } = req.params;
    // console.log(req.params);
    let { photo, caption } = req.body;
    // console.log(req.body);
    let id = uuidv4();
    allPosts.push({ id, username, photo, caption });
    // console.log(posts);
    res.redirect(`/getAllPostsByUsername/${username}`);
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

