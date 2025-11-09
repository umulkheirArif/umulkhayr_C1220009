const { MongoClient } = require("mongodb");

async function connectDB() {
    const url = "mongodb://127.0.0.1:27017"; 
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log(" MongoDB Connected Successfully!");
    const db=client.db('unversity');
    const students=db.collection('students');
    //insert one
    const results=await students.insertOne({name:'Hana', age: 19,year:4, department:'Programming'})
    console.log("inserted document with id_",results.insertedId);
    //insert many 
    const insertmany = await students.insertMany([
        
           { name:'salix', age:18, year:1,department:'surgery'},
           { name:'hashim', age:18, year:2,department:'surgery'},
           { name:'harut', age:18, year:3,department:'surgery'},
           { name:'harun', age:18, year:7,department:'surgery'},
           { name:'hilal', age:18, year:8,department:'surgery'},
           {name:'Shuab', age:30,year:1, department:'PHD'},
           {name:'daud', age:30,year:2, department:'PHD'},
           {name:'issa', age:30,year:3, department:'PHD'},
           {name:'harun', age:30,year:3, department:'PHD'},
           {name:'ibrahim', age:30,year:1, department:'PHD'},
           {name:'Umulkhayr', age:20, year:4,department:'networking'}
    ])
    console.log("inserted many count:" ,insertmany.insertedCount)
    //find All 
    const AllStudents=await students.find().toArray();
    console.log("all students ",AllStudents);
    //find with filter
    const PhdStudents=await students.find({department:"PHD"}).toArray();
    console.log("PHD Students",PhdStudents);
    //find specific fields
    const projection=await students
    .find({},{projection:{name:1,department:1, _id:0}}).toArray();
    console.log("names+departments ",projection);
    //update one student
    const updateOne=await students.updateOne(
        {name:"hana"},
        {$set:{year:3} }
    );
    console.log("updated one ",updateOne.modifiedCount);
    //update many students 
    const updateMany=await students.updateMany(
        {year:2},
        {$set:{status:"active"}});
        console.log("updated many: ",updateMany.modifiedCount);
    //delete one 
    const deleteOne= await students.deleteOne(
        {name:'Hana'}
    );
    
    console.log("deleted one: ", deleteOne.deletedCount);
    //deleted many students 
    const deletedMany=await students.deleteMany({department:"surgery"});
    console.log("deleted many: ",deletedMany.deletedCount);
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error);
    } finally {
        await client.close();
    }
}

connectDB();
