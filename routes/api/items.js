const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const ifile = require("../../Ifile.json")
const fs = require('fs-extra');

router.get('/', (req, res)=>{ 
  Item.find()
  .sort({date:-1})
  .then(items => res.json(items)) 
})

router.post('/', (req, res)=>{
  console.log(req.body)
  const newItem = new Item({
    name:req.body.name
  })
  newItem.save().then(item =>res.json(item));
})

router.post('/validate', (req, res)=>{
  let valid=[]
  //console.log(req.body)
  ifile.filter((item)=>{
    req.body.filter((id)=>{
     // console.log(id.id)
      //console.log(item.objectTypeId)
      if(id.id==item.objectTypeId){
        valid.push({id:id.id,status:"valid"})
      }
      if(item.objectTypeId!=id.id){
      }
    })
    })
    res.send({
      data:valid,
      
    })
    
 // console.log(valid)
  // const newItem = new Item({
  //   name:req.body.name
  // })
  // newItem.save().then(item =>res.json(item));
})

router.post('/ifileDownload', (req, res)=>{
  const {validIds,destinationPath}= req.body
  let selectedFiles = []

  ifile.filter((item)=>{
      validIds.filter((id)=>{
           if(item.objectTypeId==id){
                selectedFiles.push(item)
              }
          })
    })
    selectedFiles.filter(item=>{
      item.destinationPath=destinationPath
    })

    selectedFiles.filter(item=>{
      fs.copy(item.sourcePath, item.destinationPath, err => {
        if (err) return console.error(err)
        console.log('success!')
      })
    })

    res.send({
      data:selectedFiles
    })
    
    

    

 // console.log(selectedFiles)
})

router.delete('/:id', (req, res)=>{
  Item.findById(req.params.id).then(item => item.remove().then(()=>res.json({success:true})))
  .catch(err => res.status(404).json({success:false}))
})

module.exports = router;

