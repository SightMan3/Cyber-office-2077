import React, { PureComponent } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import {BlobService} from "azure-storage";
import AzureCloud from "./AzureCloud"

class AzureScreen extends PureComponent{
    
    constructor(props){
        super(props);
        const azure = new AzureCloud();
    }
  render() {
    return (
      <div>
        <div>
          <button className="create-container-button" onClick={this.createContainer}>Create container</button>
          <button className="delete-container-button">Delete container</button>
          <button className="select-button">Select and upload files</button>
          <input className="file-input" type="file" multiple style={{ display: "none" }} />
          <button className="list-button">List files</button>
          <button className="delete-button">Delete selected files</button>
          <p>
            <b>Status:</b>
          </p>
          <p className="status" style={{ height: "160px", width: "593px", overflow: "scroll" }} />
          <p>
            <b>Files:</b>
          </p>
          <select
          className="file-list"
            multiple
            style={{ height: "222px", width: "593px", overflow: "scroll" }}
          />
        </div>
      </div>
    );
  }
}

export default AzureScreen;
