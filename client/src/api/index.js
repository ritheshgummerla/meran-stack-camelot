import "isomorphic-fetch";
const findEmail=async ()=> {
    // const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // if(!response){
    //     console.log("Error")
    // }
    // const json = await response.json();
    // //console.log(json)
    return {
        data:[
            "rithesh_123@camelotis.com",
            "pavan_ns@eogresources.com", 
            "masthan_karnati@eogresources.com",
            "suubarao_123@camelotis.com",
            "praveen_123@eogresources.com",
            "ramu@eogresources.com",
            "vil@camelotis.com",
            "arun@eogresources.com", 
            "kiran@eogresources.com",
            "zoe@camelotis.com",
            "elnp@eogresources.com",
            "danny@eogresources.com",
            "sravan@eogresources.com",
            "uday@camelotis.com",
            "barath@eogresources.com", 
            "anandh@eogresources.com",
            "faizal@camelotis.com",
            "guru@eogresources.com",
            "harish@eogresources.com",
            "ian@camelotis.com",
            "jack@eogresources.com", 
            "latham@eogresources.com",
            "mohan@camelotis.com",
            "naveen@eogresources.com",
            "obulesh@eogresources.com",
            "tikku@eogresources.com",
        ]
    }
}

const sendData=async (item)=> {
    const data={
        name:item
    }
    const response = await fetch("/api/items",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    return {
        data:json
    }
}

const onValidate=async (item)=> {
    const response = await fetch("/api/items/validate",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(item)
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    return {
        data:json
    }
}

const ifileApiRequest=async (data)=> {
    const response = await fetch("/api/items/ifileDownload",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    console.log(json)
    return {
        data:json
    }
}


export default {findEmail,sendData,onValidate,ifileApiRequest}