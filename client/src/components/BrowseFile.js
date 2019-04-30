import React, { Component } from "react";
//import * as fs from "fs-web";
//import copy from "copy-files"
//import fs from 'fs-extra'
import Button from "@material-ui/core/Button";
import copyfiles from "copyfiles";

export default class BrowseFile extends Component {
  state = {
    sourcePath: null,
    destination: null
  };

  getData = () => {};
  onBrowseFile = selected => {
    console.log(selected[0]);
    copyfiles(selected[0], "D:\fileTestdestination", function(err) {
      console.log("ssf");
      if (err) console.error(err);
    });
    // fs.copy('C:\Test', 'D:/fileTest/destination', err => {
    //   if (err) return console.error(err) 
    //   console.log('success!') 
    // })


    // copy({
    //   files: {
    //     'newname.txt': __dirname + 'D:/fileTest/source/source.txt'
    //   },
    //   dest: 'D:\fileTest\destination',
    // }, function (err) {
    //   // All copied!
    // });
    // let file = selected[0];
    // fs.writeFile('D:\fileTest\destination', file)
    // .then(function(){
    //   return fs.readdir('foo');
    // })
    // .then(function(files){
    //   console.log(files) // -> [ {some-file.txt} ]
    // });



    // selected = new ActiveXObject("Scripting.txt");
    // selected.CopyFile ("D:\fileTest\source", "D:\fileTest\destination");




    // fs.copyFileSync('source.txt', 'destination.txt'); 'D:\fileTest\source', 'D:\fileTest\source'
    // console.log('source.txt was copied to destination.txt');


  };
  render() {
    return (
      <div>
        <div>
          <h5>Browse To Target</h5>
          <input
            type="file"
            //directory="" webkitdirectory=""
            onChange={e => this.onBrowseFile(e.target.files)}
          />
        </div>
        <div>
          <h5>Target Name</h5>
          <input type="text" />
        </div>
      </div>
    );
  }
}
