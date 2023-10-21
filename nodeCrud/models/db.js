const toConnect = async ()=>{
    if(global.connection && global.connection.state != "disconected"){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const con = mysql.createConnection("mysql://root:password@localhost:3306/crudApp");
    console.log("Successfully Connected");
    global.connection=con;
    return con;
}
const allUsers = async ()=>{
    const con = await toConnect();
    const [rows] = await con.query("SELECT * FROM users");
    return await rows;
}

const userDelete = async (id)=>{
    const con = await toConnect();
    await con.query("DELETE FROM users WHERE id = ?",[id]);
}

const userInsert = async (user)=>{
    const con = await toConnect();
    await con.query("INSERT INTO users (fnome, lname, email) VALUES (?, ?, ?)",[user.fname, user.lname, user.email]);
}

const userUpdate = async (user)=>{
    const con = await toConnect();
    await con.query("UPDATE users SET fnome=?, lname=?, email = ? WHERE id=?",[user.fname, user.lname, user.email, user.id]);
}

const userQuery = async(id)=>{
    const con = await toConnect();
    const [consulting] = await con.query("SELECT * FROM users WHERE id = ?",[id]);
    return await consulting[0];
}

module.exports = {allUsers, userDelete, userInsert, userUpdate, userQuery};
